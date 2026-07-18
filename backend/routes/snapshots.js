const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const pool = require('../config/db');

// @route   GET /api/snapshots
// @desc    Get all snapshots for user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const [snapshots] = await pool.query(
      'SELECT * FROM snapshots WHERE user_id = ? ORDER BY entry_date DESC',
      [req.user.id]
    );
    res.json({ snapshots });
  } catch (err) {
    console.error('Error fetching snapshots:', err.message);
    res.status(500).json({ error: 'Server error fetching snapshots' });
  }
});

// @route   POST /api/snapshots
// @desc    Add a new snapshot
// @access  Private
router.post('/', auth, async (req, res) => {
  const { net_worth, assets, liabilities, label, entry_date } = req.body;

  if (net_worth === undefined || assets === undefined || liabilities === undefined || !entry_date) {
    return res.status(400).json({ error: 'Missing required snapshot data' });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO snapshots (user_id, net_worth, assets, liabilities, label, entry_date)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [req.user.id, net_worth, assets, liabilities, label || null, entry_date]
    );

    const [newSnapshot] = await pool.query('SELECT * FROM snapshots WHERE id = ?', [result.insertId]);
    res.status(201).json({ snapshot: newSnapshot[0] });
  } catch (err) {
    console.error('Error adding snapshot:', err.message);
    res.status(500).json({ error: 'Server error saving snapshot' });
  }
});

module.exports = router;
