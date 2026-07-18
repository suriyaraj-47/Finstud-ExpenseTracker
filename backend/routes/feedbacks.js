const express = require('express');
const { body, validationResult } = require('express-validator');
const mysql = require('mysql2/promise');
require('dotenv').config();

const router = express.Router();

// Database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: 'finstud',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Middleware to verify JWT
const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'supersecret');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
}

// POST /api/feedbacks (Submit new feedback)
router.post('/', verifyToken, [
  body('type').notEmpty().withMessage('Type is required'),
  body('message').notEmpty().withMessage('Message is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { type, message } = req.body;
    
    await pool.query(
      'INSERT INTO feedbacks (user_id, type, message) VALUES (?, ?, ?)',
      [req.user.id, type, message]
    );

    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while submitting feedback' });
  }
});

// GET /api/feedbacks (Get user's feedback history)
router.get('/', verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, type, message, created_at FROM feedbacks WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json({ feedbacks: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while fetching feedbacks' });
  }
});

module.exports = router;
