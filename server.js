require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const db = require('./config/db');
const session = require('express-session');

// Import routes
const adminRoutes = require('./routes/adminRoutes');
const fasilitasRoutes = require('./routes/fasilitas'); // Rute baru untuk CRUD Fasilitas

// Konfigurasi
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback-secret-sportify-123',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax'
    }
}));

// Middleware session untuk template
app.use((req, res, next) => {
    res.locals.user = req.session.username || null;
    res.locals.role = req.session.role || null;
    res.locals.userId = req.session.userId || null;
    next();
});

// Middleware Proteksi Admin (Hanya admin yang bisa akses rute admin)
const isAdmin = (req, res, next) => {
    if (req.session.role === 'admin') {
        next();
    } else {
        res.status(403).send("Akses Ditolak! Anda bukan admin.");
    }
};

// --- ROUTES ---
app.use('/admin', adminRoutes);
app.use('/admin/fasilitas', isAdmin, fasilitasRoutes); // Rute CRUD Fasilitas (Terproteksi)

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

// --- RUTE AUTH (Login & Register) ---
app.get('/login', (req, res) => res.render('login'));

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, results) => {
        if (err || results.length === 0) return res.send("Login Gagal!");

        req.session.userId = results[0].id;
        req.session.username = results[0].username;
        req.session.role = results[0].role;

        results[0].role === 'admin' ? res.redirect('/admin/dashboard') : res.redirect('/');
    });
});

app.get('/register', (req, res) => res.render('register'));

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const sql = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'user')";
    
    db.query(sql, [username, email, password], (err) => {
        if (err) return res.status(500).send("Gagal registrasi");
        res.redirect('/login');
    });
});

app.get('/logout', (req, res) => req.session.destroy(() => res.redirect('/login')));

// --- RUTE BOOKING & RIWAYAT ---
app.get('/booking/:id', (req, res) => {
    if (!req.session.userId) return res.redirect('/login');
    db.query('SELECT * FROM fasilitas WHERE id = ?', [req.params.id], (err, result) => {
        if (err || result.length === 0) return res.status(404).send("Lapangan tidak ditemukan");
        res.render('booking', { lapangan: result[0] });
    });
});

app.post('/booking/proses', (req, res) => {
    if (!req.session.userId) return res.redirect('/login');
    const { facility_id, tanggal, jam_mulai, jam_selesai } = req.body;
    const sql = "INSERT INTO transaksi (user_id, facility_id, tanggal, jam_mulai, jam_selesai, status) VALUES (?, ?, ?, ?, ?, 'pending')";
    
    db.query(sql, [req.session.userId, facility_id, tanggal, jam_mulai, jam_selesai], (err) => {
        if (err) return res.status(500).send("Gagal booking: " + err.message);
        res.redirect('/riwayat');
    });
});

app.get('/riwayat', (req, res) => {
    if (!req.session.userId) return res.redirect('/login');
    const sql = `SELECT t.*, f.nama_fasilitas FROM transaksi t 
                 JOIN fasilitas f ON t.facility_id = f.id 
                 WHERE t.user_id = ? ORDER BY t.id DESC`;
    
    db.query(sql, [req.session.userId], (err, results) => {
        if (err) {
            console.error('Database error on riwayat page:', err.message);
            return res.render('riwayat', { riwayat: [] });
        }
        res.render('riwayat', { riwayat: results || [] });
    });
});

// --- RUTE JADWAL & INDEX ---
app.get('/jadwal', (req, res) => {
    const sql = `SELECT t.*, f.nama_fasilitas, u.username FROM transaksi t 
                 JOIN fasilitas f ON t.facility_id = f.id 
                 JOIN users u ON t.user_id = u.id 
                 WHERE t.status = 'approved' ORDER BY t.tanggal ASC`;
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database error on jadwal page:', err.message);
            return res.render('jadwal', { jadwal: [] });
        }
        res.render('jadwal', { jadwal: results || [] });
    });
});

app.get('/', (req, res) => {
    db.query('SELECT * FROM fasilitas', (err, results) => {
        if (err) {
            console.error('Database error on home page:', err.message);
            return res.render('index', { fasilitas: [] });
        }
        res.render('index', { fasilitas: results || [] });
    });
});

const PORT = process.env.PORT || 3000;

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err.message);
    res.status(err.status || 500).send('Terjadi kesalahan pada server. Silakan coba lagi nanti.');
});

if (require.main === module) {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;