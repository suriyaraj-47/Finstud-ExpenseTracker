// ─────────────────────────────────────────
//  FinStud — Auth Routes
//  POST /api/auth/register
//  POST /api/auth/login
//  GET  /api/auth/verify?token=
//  POST /api/auth/forgot-password
//  POST /api/auth/reset-password
//  GET  /api/auth/me         (protected)
//  POST /api/auth/resend-verification (protected)
// ─────────────────────────────────────────
const router  = require('express').Router();
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const crypto  = require('crypto');
const { body, validationResult } = require('express-validator');
const db      = require('../config/db');
const auth    = require('../middleware/auth');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../config/mailer');
const { OAuth2Client } = require('google-auth-library');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ── Helper: sign JWT ──
function signToken(user) {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

// ────────────────────────────────────────────────
//  POST /api/auth/register
// ────────────────────────────────────────────────
router.post('/register', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, password } = req.body;

  try {
    // Check if email already exists
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 12);

    // Generate email verification token
    const verify_token = crypto.randomBytes(32).toString('hex');

    // Insert user
    const [result] = await db.query(
      'INSERT INTO users (name, email, password_hash, verify_token) VALUES (?, ?, ?, ?)',
      [name, email, password_hash, verify_token]
    );

    const userId = result.insertId;

    // Create empty financial profile row
    await db.query(
      'INSERT INTO financial_profiles (user_id) VALUES (?)',
      [userId]
    );

    // Send verification email (non-blocking — don't fail registration if email fails)
    try {
      await sendVerificationEmail(email, name, verify_token);
    } catch (emailErr) {
      console.warn('⚠️  Verification email failed to send:', emailErr.message);
    }

    // Sign JWT
    const token = signToken({ id: userId, name, email });

    res.status(201).json({
      message: 'Account created. Please check your email to verify your account.',
      token,
      user: { id: userId, name, email, is_verified: false },
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

// ────────────────────────────────────────────────
//  POST /api/auth/google
// ────────────────────────────────────────────────
router.post('/google', async (req, res) => {
  const { credential } = req.body;
  if (!credential) return res.status(400).json({ error: 'Token is required.' });

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Check if user exists by google_id or email
    const [existing] = await db.query(
      'SELECT id, name, email, google_id, is_verified FROM users WHERE google_id = ? OR email = ?',
      [googleId, email]
    );

    let user;

    if (existing.length > 0) {
      user = existing[0];
      // If user exists but is logging in via Google for the first time
      // we link the google_id and mark as verified
      if (!user.google_id) {
        await db.query(
          'UPDATE users SET google_id = ?, profile_pic = ?, is_verified = 1 WHERE id = ?',
          [googleId, picture, user.id]
        );
      }
    } else {
      // Create new user
      const [result] = await db.query(
        'INSERT INTO users (name, email, google_id, profile_pic, is_verified) VALUES (?, ?, ?, ?, 1)',
        [name, email, googleId, picture]
      );
      const userId = result.insertId;
      await db.query('INSERT INTO financial_profiles (user_id) VALUES (?)', [userId]);

      user = { id: userId, name, email, is_verified: 1 };
    }

    const token = signToken(user);

    res.json({
      token,
      user: {
        id:          user.id,
        name:        user.name,
        email:       user.email,
        profile_pic: picture,
        is_verified: true,
      },
    });
  } catch (err) {
    console.error('Google Auth Error:', err);
    res.status(401).json({ error: 'Google authentication failed.' });
  }
});

// ────────────────────────────────────────────────
//  POST /api/auth/login
// ────────────────────────────────────────────────
router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    const [rows] = await db.query(
      'SELECT id, name, email, password_hash, is_verified FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = signToken(user);

    res.json({
      token,
      user: {
        id:          user.id,
        name:        user.name,
        email:       user.email,
        is_verified: user.is_verified === 1,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

// ────────────────────────────────────────────────
//  GET /api/auth/verify?token=xxx
// ────────────────────────────────────────────────
router.get('/verify', async (req, res) => {
  const { token } = req.query;
  if (!token) return res.status(400).json({ error: 'Token is required.' });

  try {
    const [rows] = await db.query(
      'SELECT id FROM users WHERE verify_token = ?',
      [token]
    );
    if (rows.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired verification link.' });
    }

    await db.query(
      'UPDATE users SET is_verified = 1, verify_token = NULL WHERE id = ?',
      [rows[0].id]
    );

    res.json({ message: 'Email verified successfully! You can now sign in.' });
  } catch (err) {
    console.error('Verify error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// ────────────────────────────────────────────────
//  POST /api/auth/resend-verification   (protected)
// ────────────────────────────────────────────────
router.post('/resend-verification', auth, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT name, email, is_verified FROM users WHERE id = ?',
      [req.user.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'User not found.' });
    const user = rows[0];
    if (user.is_verified) return res.status(400).json({ error: 'Email already verified.' });

    const verify_token = crypto.randomBytes(32).toString('hex');
    await db.query('UPDATE users SET verify_token = ? WHERE id = ?', [verify_token, req.user.id]);
    await sendVerificationEmail(user.email, user.name, verify_token);

    res.json({ message: 'Verification email resent.' });
  } catch (err) {
    console.error('Resend error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// ────────────────────────────────────────────────
//  POST /api/auth/forgot-password
// ────────────────────────────────────────────────
router.post('/forgot-password', [
  body('email').isEmail().normalizeEmail(),
], async (req, res) => {
  const { email } = req.body;
  try {
    const [rows] = await db.query('SELECT id, name FROM users WHERE email = ?', [email]);
    // Always respond OK so we don't leak whether an email exists
    if (!rows.length) return res.json({ message: 'If that email exists, a reset link was sent.' });

    const reset_token   = crypto.randomBytes(32).toString('hex');
    const reset_expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await db.query(
      'UPDATE users SET reset_token = ?, reset_expires = ? WHERE id = ?',
      [reset_token, reset_expires, rows[0].id]
    );

    await sendPasswordResetEmail(email, rows[0].name, reset_token);
    res.json({ message: 'If that email exists, a reset link was sent.' });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// ────────────────────────────────────────────────
//  POST /api/auth/reset-password
// ────────────────────────────────────────────────
router.post('/reset-password', [
  body('token').notEmpty(),
  body('password').isLength({ min: 8 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { token, password } = req.body;
  try {
    const [rows] = await db.query(
      'SELECT id FROM users WHERE reset_token = ? AND reset_expires > NOW()',
      [token]
    );
    if (!rows.length) return res.status(400).json({ error: 'Invalid or expired reset link.' });

    const password_hash = await bcrypt.hash(password, 12);
    await db.query(
      'UPDATE users SET password_hash = ?, reset_token = NULL, reset_expires = NULL WHERE id = ?',
      [password_hash, rows[0].id]
    );

    res.json({ message: 'Password reset successfully. You can now sign in.' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// ────────────────────────────────────────────────
//  GET /api/auth/me   (protected)
// ────────────────────────────────────────────────
router.get('/me', auth, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, name, email, is_verified, created_at FROM users WHERE id = ?',
      [req.user.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'User not found.' });
    res.json({ user: rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// ────────────────────────────────────────────────
//  PATCH /api/auth/update-profile   (protected)
// ────────────────────────────────────────────────
router.patch('/update-profile', auth, [
  body('name').trim().notEmpty().withMessage('Name is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    await db.query('UPDATE users SET name = ? WHERE id = ?', [req.body.name, req.user.id]);
    res.json({ message: 'Profile updated.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// ────────────────────────────────────────────────
//  POST /api/auth/change-password   (protected)
// ────────────────────────────────────────────────
router.post('/change-password', auth, [
  body('currentPassword').notEmpty(),
  body('newPassword').isLength({ min: 8 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { currentPassword, newPassword } = req.body;
  try {
    const [rows] = await db.query('SELECT password_hash FROM users WHERE id = ?', [req.user.id]);
    if (!rows.length) return res.status(404).json({ error: 'User not found.' });

    const valid = await bcrypt.compare(currentPassword, rows[0].password_hash);
    if (!valid) return res.status(401).json({ error: 'Current password is incorrect.' });

    const newHash = await bcrypt.hash(newPassword, 12);
    await db.query('UPDATE users SET password_hash = ? WHERE id = ?', [newHash, req.user.id]);

    res.json({ message: 'Password changed successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// ────────────────────────────────────────────────
//  DELETE /api/auth/delete-account   (protected)
// ────────────────────────────────────────────────
router.delete('/delete-account', auth, [
  body('password').notEmpty(),
], async (req, res) => {
  try {
    const [rows] = await db.query('SELECT password_hash FROM users WHERE id = ?', [req.user.id]);
    if (!rows.length) return res.status(404).json({ error: 'User not found.' });

    const valid = await bcrypt.compare(req.body.password, rows[0].password_hash);
    if (!valid) return res.status(401).json({ error: 'Incorrect password.' });

    // Cascade delete via FK constraints handles all related data
    await db.query('DELETE FROM users WHERE id = ?', [req.user.id]);
    res.json({ message: 'Account deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
