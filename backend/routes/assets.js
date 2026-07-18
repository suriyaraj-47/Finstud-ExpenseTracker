// ─────────────────────────────────────────
//  FinStud — Assets Routes
//  GET    /api/assets
//  POST   /api/assets
//  PATCH  /api/assets/:id
//  DELETE /api/assets/:id
// ─────────────────────────────────────────
const router = require('express').Router();
const { body, param, validationResult } = require('express-validator');
const db   = require('../config/db');
const auth = require('../middleware/auth');

router.use(auth);

// GET /api/assets
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, name, asset_type, value, created_at FROM assets WHERE user_id = ? ORDER BY value DESC',
      [req.user.id]
    );
    res.json({ assets: rows });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// POST /api/assets
router.post('/', [
  body('name').trim().notEmpty().withMessage('Asset name is required'),
  body('asset_type').trim().notEmpty().withMessage('Asset type is required'),
  body('value').isFloat({ min: 0 }).withMessage('Value must be a positive number'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, asset_type, value } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO assets (user_id, name, asset_type, value) VALUES (?, ?, ?, ?)',
      [req.user.id, name, asset_type, value]
    );
    res.status(201).json({
      message: 'Asset added.',
      asset: { id: result.insertId, name, asset_type, value },
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// PATCH /api/assets/:id
router.patch('/:id', [
  param('id').isInt(),
  body('name').optional().trim().notEmpty(),
  body('asset_type').optional().trim().notEmpty(),
  body('value').optional().isFloat({ min: 0 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, asset_type, value } = req.body;
  const fields = []; const values = [];
  if (name       !== undefined) { fields.push('name = ?');       values.push(name); }
  if (asset_type !== undefined) { fields.push('asset_type = ?'); values.push(asset_type); }
  if (value      !== undefined) { fields.push('value = ?');      values.push(value); }

  if (!fields.length) return res.status(400).json({ error: 'No fields to update.' });

  try {
    const [result] = await db.query(
      `UPDATE assets SET ${fields.join(', ')} WHERE id = ? AND user_id = ?`,
      [...values, req.params.id, req.user.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Asset not found.' });
    res.json({ message: 'Asset updated.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// DELETE /api/assets/:id
router.delete('/:id', [param('id').isInt()], async (req, res) => {
  try {
    const [result] = await db.query(
      'DELETE FROM assets WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Asset not found.' });
    res.json({ message: 'Asset deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
