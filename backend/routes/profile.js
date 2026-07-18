// ─────────────────────────────────────────
//  FinStud — Financial Profile Routes
//  GET   /api/profile
//  PUT   /api/profile
// ─────────────────────────────────────────
const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const db   = require('../config/db');
const auth = require('../middleware/auth');

// All routes require auth
router.use(auth);

// GET /api/profile
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT age, monthly_income, monthly_expense, monthly_savings FROM financial_profiles WHERE user_id = ?',
      [req.user.id]
    );
    res.json({ profile: rows[0] || { age: null, monthly_income: 0, monthly_expense: 0, monthly_savings: 0 } });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// PUT /api/profile
router.put('/', [
  body('age').optional().isInt({ min: 1, max: 150 }),
  body('monthly_income').optional().isFloat({ min: 0 }),
  body('monthly_expense').optional().isFloat({ min: 0 }),
  body('monthly_savings').optional().isFloat({ min: 0 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { age, monthly_income, monthly_expense, monthly_savings } = req.body;
  try {
    await db.query(
      `INSERT INTO financial_profiles (user_id, age, monthly_income, monthly_expense, monthly_savings)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         age             = COALESCE(VALUES(age), age),
         monthly_income  = COALESCE(VALUES(monthly_income), monthly_income),
         monthly_expense = COALESCE(VALUES(monthly_expense), monthly_expense),
         monthly_savings = COALESCE(VALUES(monthly_savings), monthly_savings)`,
      [req.user.id, age || null, monthly_income || 0, monthly_expense || 0, monthly_savings || 0]
    );
    res.json({ message: 'Financial profile saved.' });
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
