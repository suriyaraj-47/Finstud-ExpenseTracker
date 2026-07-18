// Temporary setup script — applies config/schema.sql to MySQL
require('dotenv').config();
const mysql = require('mysql2/promise');
const fs    = require('fs');
const path  = require('path');

(async () => {
  const sql = fs.readFileSync(path.join(__dirname, 'config', 'schema.sql'), 'utf8');
  // Split on semicolons, filter blanks/comments
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  const conn = await mysql.createConnection({
    host:     process.env.DB_HOST     || 'localhost',
    port:     parseInt(process.env.DB_PORT) || 3306,
    user:     process.env.DB_USER     || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true,
  });

  console.log('Connected to MySQL...');
  for (const stmt of statements) {
    try {
      await conn.query(stmt);
      console.log('OK:', stmt.slice(0, 60).replace(/\n/g, ' '));
    } catch (e) {
      console.error('ERR:', e.message, '\n  STMT:', stmt.slice(0, 80));
    }
  }
  await conn.end();
  console.log('\n✅  Schema applied successfully!');
})();
