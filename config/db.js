require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const initializeDatabase = () => {
  const createUsers = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role ENUM('admin','user') DEFAULT 'user'
    )
  `;

  const createFasilitas = `
    CREATE TABLE IF NOT EXISTS fasilitas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nama_fasilitas VARCHAR(100) NOT NULL,
      deskripsi TEXT,
      harga_per_jam DECIMAL(10,2) DEFAULT NULL,
      foto VARCHAR(255) DEFAULT NULL
    )
  `;

  const createTransaksi = `
    CREATE TABLE IF NOT EXISTS transaksi (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      facility_id INT NOT NULL,
      tanggal DATE NOT NULL,
      jam_mulai TIME NOT NULL,
      jam_selesai TIME NOT NULL,
      status ENUM('pending','approved','rejected') DEFAULT 'pending',
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (facility_id) REFERENCES fasilitas(id)
    )
  `;

  connection.query(createUsers, (err) => {
    if (err) {
      console.error('Gagal membuat tabel users:', err.message);
      return;
    }

    connection.query(createFasilitas, (err2) => {
      if (err2) {
        console.error('Gagal membuat tabel fasilitas:', err2.message);
        return;
      }

      connection.query(createTransaksi, (err3) => {
        if (err3) {
          console.error('Gagal membuat tabel transaksi:', err3.message);
          return;
        }

        connection.query("SELECT COUNT(*) AS count FROM users WHERE role = 'admin'", (err4, rows) => {
          if (err4) {
            console.error('Gagal memeriksa admin:', err4.message);
            return;
          }

          if (rows[0].count === 0) {
            connection.query(
              "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'admin')",
              ['admin', 'admin@example.com', 'admin123'],
              (err5) => {
                if (!err5) {
                  console.log('Admin default dibuat: admin@example.com / admin123');
                }
              }
            );
          }

          connection.query("SELECT COUNT(*) AS count FROM fasilitas", (err6, facilityRows) => {
            if (!err6 && facilityRows[0].count === 0) {
              connection.query(
                "INSERT INTO fasilitas (nama_fasilitas, deskripsi, harga_per_jam, foto) VALUES (?, ?, ?, ?)",
                ['Lapangan Badminton', 'Lantai kayu berkualitas', 50000.00, 'badminton.jpg'],
                () => {}
              );
              connection.query(
                "INSERT INTO fasilitas (nama_fasilitas, deskripsi, harga_per_jam, foto) VALUES (?, ?, ?, ?)",
                ['Lapangan Futsal', 'Rumput sintetis standar', 100000.00, 'futsal.jpg'],
                () => {}
              );
              connection.query(
                "INSERT INTO fasilitas (nama_fasilitas, deskripsi, harga_per_jam, foto) VALUES (?, ?, ?, ?)",
                ['Lapangan Basket', 'Outdoor dengan ring besi', 70000.00, 'basket.jpg'],
                () => {}
              );
            }
          });
        });
      });
    });
  });
};

connection.connect((err) => {
  if (err) {
    console.error('Gagal terhubung ke database:', err.stack);
    return;
  }
  console.log('Terhubung ke database MySQL sebagai id ' + connection.threadId);
  initializeDatabase();
});

module.exports = connection;