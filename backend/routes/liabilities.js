// ─────────────────────────────────────────
//  FinStud — Liabilities Routes
//  GET    /api/liabilities
//  POST   /api/liabilities
//  PATCH  /api/liabilities/:id
//  DELETE /api/liabilities/:id
// ─────────────────────────────────────────
const router = require('express').Router();
const { body, param, validationResult } = require('express-validator');
const db   = require('../config/db');
const auth = require('../middleware/auth');

router.use(auth);

// GET /api/liabilities
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, name, amount, created_at FROM liabilities WHERE user_id = ? ORDER BY amount DESC',
      [req.user.id]
    );
    res.json({ liabilities: rows });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// POST /api/liabilities
router.post('/', [
  body('name').trim().notEmpty().withMessage('Liability name is required'),
  body('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, amount } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO liabilities (user_id, name, amount) VALUES (?, ?, ?)',
      [req.user.id, name, amount]
    );
    res.status(201).json({
      message: 'Liability added.',
      liability: { id: result.insertId, name, amount },
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// PATCH /api/liabilities/:id
router.patch('/:id', [
  param('id').isInt(),
  body('name').optional().trim().notEmpty(),
  body('amount').optional().isFloat({ min: 0 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, amount } = req.body;
  const fields = []; const values = [];
  if (name   !== undefined) { fields.push('name = ?');   values.push(name); }
  if (amount !== undefined) { fields.push('amount = ?'); values.push(amount); }

  if (!fields.length) return res.status(400).json({ error: 'No fields to update.' });

  try {
    const [result] = await db.query(
      `UPDATE liabilities SET ${fields.join(', ')} WHERE id = ? AND user_id = ?`,
      [...values, req.params.id, req.user.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Liability not found.' });
    res.json({ message: 'Liability updated.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// DELETE /api/liabilities/:id
router.delete('/:id', [param('id').isInt()], async (req, res) => {
  try {
    const [result] = await db.query(
      'DELETE FROM liabilities WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Liability not found.' });
    res.json({ message: 'Liability deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
