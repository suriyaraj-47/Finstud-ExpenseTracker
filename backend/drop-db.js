require('dotenv').config();
const mysql = require('mysql2/promise');

(async () => {
  try {
    const conn = await mysql.createConnection({
      host:     process.env.DB_HOST     || 'localhost',
      port:     parseInt(process.env.DB_PORT) || 3306,
      user:     process.env.DB_USER     || 'root',
      password: process.env.DB_PASSWORD || '',
    });
    console.log('Connected to MySQL to drop DB...');
    await conn.query(`DROP DATABASE IF EXISTS finstud`);
    console.log('Database finstud dropped successfully.');
    await conn.end();
  } catch (err) {
    console.error('Error dropping DB:', err.message);
    process.exit(1);
  }
})();
