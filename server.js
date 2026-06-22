const express = require('express');
const app = express();
const path = require('path');
const db = require('./config/db');

app.set('view engine', 'ejs');
// Tambahkan baris ini untuk memastikan Express tahu letak folder views
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


// TAMBAHKAN DUA BARIS INI
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    db.query('SELECT * FROM fasilitas', (err, results) => {
        if (err) {
            console.error('Query Error:', err);
            return res.status(500).send('Error Query Database');
        }
        res.render('index', { fasilitas: results });
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    // Pastikan tabel 'users' sudah ada di database Anda
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error(err);
            return res.send("Terjadi kesalahan server.");
        }
        
        if (results.length > 0) {
            res.send("Login Berhasil! Selamat datang " + results[0].nama);
        } else {
            res.send("Login Gagal! Email atau Password salah.");
        }
    });
});

// Halaman untuk menampilkan form registrasi
app.get('/register', (req, res) => {
    res.render('register');
});

// Menangani data yang dikirim dari form registrasi
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    
    // Pastikan nama kolom 'username', 'email', 'password', 'role' sesuai dengan DB Anda
    const sql = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'user')";
    
    db.query(sql, [username, email, password], (err, result) => {
        if (err) {
            console.error("Error saat registrasi:", err);
            return res.send("Gagal mendaftar. Periksa koneksi atau input Anda.");
        }
        res.send("Registrasi berhasil! Silakan <a href='/login'>Login di sini</a>");
    });
});

app.listen(3000, () => console.log('Server berjalan di http://localhost:3000'));