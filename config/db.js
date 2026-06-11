const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // sesuaikan jika ada password
  database: 'db_booking'
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