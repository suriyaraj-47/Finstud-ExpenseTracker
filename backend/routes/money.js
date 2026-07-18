// ─────────────────────────────────────────
//  FinStud — Income & Expenses Routes
//  GET    /api/money/income
//  POST   /api/money/income
//  DELETE /api/money/income/:id
//  GET    /api/money/expenses
//  POST   /api/money/expenses
//  DELETE /api/money/expenses/:id
// ─────────────────────────────────────────
const router = require('express').Router();
const { body, param, query, validationResult } = require('express-validator');
const db   = require('../config/db');
const auth = require('../middleware/auth');

router.use(auth);

// ── Shared helper ──
function entryValidators() {
  return [
    body('name').trim().notEmpty().withMessage('Description is required'),
    body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be positive'),
    body('category').optional().trim(),
    body('entry_date').isISO8601().withMessage('Valid date required (YYYY-MM-DD)'),
  ];
}

// ══════════════════════════════
//  INCOME
// ══════════════════════════════

// GET /api/money/income?month=3&year=2026
router.get('/income', [
  query('month').optional().isInt({ min: 1, max: 12 }),
  query('year').optional().isInt({ min: 2000 }),
], async (req, res) => {
  try {
    let sql = 'SELECT id, name, amount, category, entry_date FROM income WHERE user_id = ?';
    const params = [req.user.id];

    if (req.query.month && req.query.year) {
      sql += ' AND MONTH(entry_date) = ? AND YEAR(entry_date) = ?';
      params.push(req.query.month, req.query.year);
    }
    sql += ' ORDER BY entry_date DESC';

    const [rows] = await db.query(sql, params);
    res.json({ income: rows });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// POST /api/money/income
router.post('/income', entryValidators(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, amount, category, entry_date } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO income (user_id, name, amount, category, entry_date) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, name, amount, category || 'Other', entry_date]
    );
    res.status(201).json({
      message: 'Income added.',
      entry: { id: result.insertId, name, amount, category, entry_date },
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// POST /api/money/income/bulk
router.post('/income/bulk', async (req, res) => {
  const { entries } = req.body;
  if (!entries || !Array.isArray(entries) || entries.length === 0) {
    return res.status(400).json({ error: 'No entries provided.' });
  }
  
  for (let i = 0; i < entries.length; i++) {
    const e = entries[i];
    if (!e.name || typeof e.amount === 'undefined' || !e.entry_date) {
      return res.status(400).json({ error: `Row ${i+1} is missing required fields.` });
    }
  }

  const values = entries.map(e => [
    req.user.id, e.name, e.amount, e.category || 'Other', e.entry_date
  ]);

  try {
    const [result] = await db.query(
      'INSERT INTO income (user_id, name, amount, category, entry_date) VALUES ?',
      [values]
    );
    res.status(201).json({ message: `${result.affectedRows} entries added.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error saving bulk entries.' });
  }
});

// DELETE /api/money/income/:id
router.delete('/income/:id', [param('id').isInt()], async (req, res) => {
  try {
    const [result] = await db.query(
      'DELETE FROM income WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Entry not found.' });
    res.json({ message: 'Income entry deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// ══════════════════════════════
//  EXPENSES
// ══════════════════════════════

// GET /api/money/expenses?month=3&year=2026
router.get('/expenses', [
  query('month').optional().isInt({ min: 1, max: 12 }),
  query('year').optional().isInt({ min: 2000 }),
], async (req, res) => {
  try {
    let sql = 'SELECT id, name, amount, category, entry_date FROM expenses WHERE user_id = ?';
    const params = [req.user.id];

    if (req.query.month && req.query.year) {
      sql += ' AND MONTH(entry_date) = ? AND YEAR(entry_date) = ?';
      params.push(req.query.month, req.query.year);
    }
    sql += ' ORDER BY entry_date DESC';

    const [rows] = await db.query(sql, params);
    res.json({ expenses: rows });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// POST /api/money/expenses
router.post('/expenses', entryValidators(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, amount, category, entry_date } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO expenses (user_id, name, amount, category, entry_date) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, name, amount, category || 'Other', entry_date]
    );
    res.status(201).json({
      message: 'Expense added.',
      entry: { id: result.insertId, name, amount, category, entry_date },
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// POST /api/money/expenses/bulk
router.post('/expenses/bulk', async (req, res) => {
  const { entries } = req.body;
  if (!entries || !Array.isArray(entries) || entries.length === 0) {
    return res.status(400).json({ error: 'No entries provided.' });
  }
  
  for (let i = 0; i < entries.length; i++) {
    const e = entries[i];
    if (!e.name || typeof e.amount === 'undefined' || !e.entry_date) {
      return res.status(400).json({ error: `Row ${i+1} is missing required fields.` });
    }
  }

  const values = entries.map(e => [
    req.user.id, e.name, e.amount, e.category || 'Other', e.entry_date
  ]);

  try {
    const [result] = await db.query(
      'INSERT INTO expenses (user_id, name, amount, category, entry_date) VALUES ?',
      [values]
    );
    res.status(201).json({ message: `${result.affectedRows} entries added.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error saving bulk entries.' });
  }
});

// DELETE /api/money/expenses/:id
router.delete('/expenses/:id', [param('id').isInt()], async (req, res) => {
  try {
    const [result] = await db.query(
      'DELETE FROM expenses WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Entry not found.' });
    res.json({ message: 'Expense entry deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
