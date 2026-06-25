require('dotenv').config();
const mysql = require('mysql2');

const config = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'db_booking',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000
};

const pool = mysql.createPool(config);

pool.on('connection', (connection) => {
  console.log('Terhubung ke database MySQL sebagai id ' + connection.threadId);
});

pool.on('error', (err) => {
  console.error('Database pool error:', err.message);
});

function query(sql, params, callback) {
  if (typeof params === 'function') {
    callback = params;
    params = [];
  }

  return pool.query(sql, params, (err, results) => {
    if (err) {
      console.error('Database query error:', err.message);
      if (callback) callback(err, []);
      return;
    }

    if (callback) callback(null, results || []);
  });
}

module.exports = { query };