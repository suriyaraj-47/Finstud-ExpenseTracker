// ─────────────────────────────────────────
//  FinStud — Data Management Routes
//  GET    /api/data/export       → download all user data as JSON
//  DELETE /api/data/reset        → delete assets, income, expenses, goals only
// ─────────────────────────────────────────
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const db   = require('../config/db');
const auth = require('../middleware/auth');

router.use(auth);

// GET /api/data/export
router.get('/export', async (req, res) => {
  try {
    const [[profile]] = await db.query('SELECT * FROM financial_profiles WHERE user_id = ?', [req.user.id]);
    const [assets]    = await db.query('SELECT * FROM assets    WHERE user_id = ?', [req.user.id]);
    const [income]    = await db.query('SELECT * FROM income    WHERE user_id = ?', [req.user.id]);
    const [expenses]  = await db.query('SELECT * FROM expenses  WHERE user_id = ?', [req.user.id]);
    const [goals]     = await db.query('SELECT * FROM goals     WHERE user_id = ?', [req.user.id]);

    res.setHeader('Content-Disposition', 'attachment; filename="finstud-export.json"');
    res.json({
      exported_at: new Date().toISOString(),
      user:        { id: req.user.id, name: req.user.name, email: req.user.email },
      profile,
      assets,
      income,
      expenses,
      goals,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// DELETE /api/data/reset  — requires password confirmation
router.delete('/reset', [body('password').notEmpty()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const [rows] = await db.query('SELECT password_hash FROM users WHERE id = ?', [req.user.id]);
    if (!rows.length) return res.status(404).json({ error: 'User not found.' });

    const valid = await bcrypt.compare(req.body.password, rows[0].password_hash);
    if (!valid) return res.status(401).json({ error: 'Incorrect password.' });

    // Delete only financial data — keep user account and profile
    await db.query('DELETE FROM assets   WHERE user_id = ?', [req.user.id]);
    await db.query('DELETE FROM income   WHERE user_id = ?', [req.user.id]);
    await db.query('DELETE FROM expenses WHERE user_id = ?', [req.user.id]);
    await db.query('DELETE FROM goals    WHERE user_id = ?', [req.user.id]);

    res.json({ message: 'All financial data has been reset.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
