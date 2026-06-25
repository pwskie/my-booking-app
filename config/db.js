require('dotenv').config(); // Pastikan dotenv sudah terinstal
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error('Gagal terhubung ke database:', err.stack);
    return;
  }
  console.log('Terhubung ke database MySQL sebagai id ' + connection.threadId);
});

// INI BAGIAN PALING PENTING:
module.exports = connection;