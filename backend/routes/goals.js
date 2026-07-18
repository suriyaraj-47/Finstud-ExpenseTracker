// ─────────────────────────────────────────
//  FinStud — Goals Routes
//  GET    /api/goals
//  POST   /api/goals
//  PATCH  /api/goals/:id
//  DELETE /api/goals/:id
// ─────────────────────────────────────────
const router = require('express').Router();
const { body, param, validationResult } = require('express-validator');
const db   = require('../config/db');
const auth = require('../middleware/auth');

router.use(auth);

// GET /api/goals
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, name, target, target_date, created_at FROM goals WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json({ goals: rows });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// POST /api/goals
router.post('/', [
  body('name').trim().notEmpty().withMessage('Goal name is required'),
  body('target').isFloat({ min: 1 }).withMessage('Target amount must be positive'),
  body('target_date').optional().isISO8601(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, target, target_date } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO goals (user_id, name, target, target_date) VALUES (?, ?, ?, ?)',
      [req.user.id, name, target, target_date || null]
    );
    res.status(201).json({
      message: 'Goal created.',
      goal: { id: result.insertId, name, target, target_date },
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// PATCH /api/goals/:id
router.patch('/:id', [
  param('id').isInt(),
  body('name').optional().trim().notEmpty(),
  body('target').optional().isFloat({ min: 1 }),
  body('target_date').optional().isISO8601(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, target, target_date } = req.body;
  const fields = []; const values = [];
  if (name        !== undefined) { fields.push('name = ?');        values.push(name); }
  if (target      !== undefined) { fields.push('target = ?');      values.push(target); }
  if (target_date !== undefined) { fields.push('target_date = ?'); values.push(target_date); }

  if (!fields.length) return res.status(400).json({ error: 'No fields to update.' });

  try {
    const [result] = await db.query(
      `UPDATE goals SET ${fields.join(', ')} WHERE id = ? AND user_id = ?`,
      [...values, req.params.id, req.user.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Goal not found.' });
    res.json({ message: 'Goal updated.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// DELETE /api/goals/:id
router.delete('/:id', [param('id').isInt()], async (req, res) => {
  try {
    const [result] = await db.query(
      'DELETE FROM goals WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Goal not found.' });
    res.json({ message: 'Goal deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
