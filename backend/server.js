// ═══════════════════════════════════════════════
//   FinStud — Express Server  (Node.js + MySQL)
//   Run: node server.js  OR  npm run dev
// ═══════════════════════════════════════════════
require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');

const app = express();

// ── Middleware ──
app.use(cors({
  origin: [
    'http://localhost:5500',
    'http://127.0.0.1:5500',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:8000',
    'http://127.0.0.1:8000',
  ],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Serve frontend static files ──
// Adjust this path if your frontend folder is elsewhere
app.use(express.static(path.join(__dirname, '..', 'finstud')));

// ── Health check ──
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// ── API Routes ──
app.use('/api/auth',    require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/assets',  require('./routes/assets'));
app.use('/api/liabilities', require('./routes/liabilities'));
app.use('/api/money',   require('./routes/money'));
app.use('/api/goals',   require('./routes/goals'));
app.use('/api/snapshots', require('./routes/snapshots'));
app.use('/api/data',    require('./routes/data'));
app.use('/api/feedbacks', require('./routes/feedbacks'));

// ── 404 for unknown API routes ──
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found.` });
});

// ── Global error handler ──
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error.' });
});

// ── Start ──
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀  FinStud API running on http://localhost:${PORT}`);
  console.log(`📋  Endpoints:`);
  console.log(`    POST   /api/auth/register`);
  console.log(`    POST   /api/auth/login`);
  console.log(`    GET    /api/auth/verify?token=`);
  console.log(`    POST   /api/auth/forgot-password`);
  console.log(`    POST   /api/auth/reset-password`);
  console.log(`    GET    /api/auth/me`);
  console.log(`    POST   /api/auth/change-password`);
  console.log(`    PATCH  /api/auth/update-profile`);
  console.log(`    DELETE /api/auth/delete-account`);
  console.log(`    GET    /api/profile`);
  console.log(`    PUT    /api/profile`);
  console.log(`    GET    /api/assets`);
  console.log(`    POST   /api/assets`);
  console.log(`    PATCH  /api/assets/:id`);
  console.log(`    DELETE /api/assets/:id`);
  console.log(`    GET    /api/money/income`);
  console.log(`    POST   /api/money/income`);
  console.log(`    DELETE /api/money/income/:id`);
  console.log(`    GET    /api/money/expenses`);
  console.log(`    POST   /api/money/expenses`);
  console.log(`    DELETE /api/money/expenses/:id`);
  console.log(`    GET    /api/goals`);
  console.log(`    POST   /api/goals`);
  console.log(`    PATCH  /api/goals/:id`);
  console.log(`    DELETE /api/goals/:id`);
  console.log(`    GET    /api/snapshots`);
  console.log(`    POST   /api/snapshots`);
  console.log(`    GET    /api/data/export`);
  console.log(`    DELETE /api/data/reset`);
  console.log(`    GET    /api/feedbacks`);
  console.log(`    POST   /api/feedbacks`);
});
