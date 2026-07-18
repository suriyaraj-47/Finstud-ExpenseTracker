// ─────────────────────────────────────────
//  FinStud — JWT Auth Middleware
// ─────────────────────────────────────────
const jwt = require('jsonwebtoken');

module.exports = function authMiddleware(req, res, next) {
  // Accept token from Authorization: Bearer <token> header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, name, email, iat, exp }
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Session expired. Please sign in again.' });
    }
    return res.status(401).json({ error: 'Invalid token.' });
  }
};
