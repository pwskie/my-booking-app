const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Middleware untuk memastikan akses hanya untuk Admin
const isAdmin = (req, res, next) => {
    if (req.session.role === 'admin') {
        next();
    } else {
        res.status(403).send("Akses Ditolak: Anda bukan Admin.");
    }
};

// Dashboard Admin (Diperbarui: Sekarang mengambil dari tabel 'transaksi')
// routes/adminRoutes.js

router.get('/dashboard', isAdmin, (req, res) => {
    const sql = `
        SELECT t.*, u.username, f.nama_fasilitas 
        FROM transaksi t
        LEFT JOIN users u ON t.user_id = u.id
        LEFT JOIN fasilitas f ON t.facility_id = f.id
        ORDER BY t.id DESC
    `;
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error database:", err);
            return res.render('admin/dashboard', {
                user: req.session.username || 'Admin',
                bookings: []
            });
        }
        
        res.render('admin/dashboard', { 
            user: req.session.username || 'Admin',
            bookings: results || []
        });
    });
});

// Update Status Booking (Diperbarui: Sekarang ke tabel 'transaksi')
router.post('/update-status', isAdmin, (req, res) => {
    const { id, status } = req.body;
    // Pastikan ini update tabel transaksi
    db.query("UPDATE transaksi SET status = ? WHERE id = ?", [status, id], (err) => {
        if (err) return res.status(500).send("Update status gagal");
        res.redirect('/admin/dashboard');
    });
});

// Halaman Kelola Lapangan
router.get('/fasilitas', isAdmin, (req, res) => {
    db.query('SELECT * FROM fasilitas', (err, results) => {
        if (err) {
            console.error('Error mengambil fasilitas:', err);
            return res.render('admin/fasilitas', { fasilitas: [] });
        }
        res.render('admin/fasilitas', { fasilitas: results || [] });
    });
});

// Halaman Daftar User
router.get('/users', isAdmin, (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Error mengambil users:', err);
            return res.render('admin/users', { users: [] });
        }
        res.render('admin/users', { users: results || [] });
    });
});

// Halaman Tambah Fasilitas
router.get('/fasilitas/tambah', isAdmin, (req, res) => {
    res.render('admin/tambah_fasilitas');
});

router.post('/fasilitas/tambah', isAdmin, (req, res) => {
    const { nama_fasilitas, harga_per_jam, foto, deskripsi } = req.body;
    const sql = "INSERT INTO fasilitas (nama_fasilitas, harga_per_jam, foto, deskripsi) VALUES (?, ?, ?, ?)";
    
    db.query(sql, [nama_fasilitas, harga_per_jam, foto, deskripsi || ''], (err, result) => {
        if (err) {
            console.error("Error database:", err);
            return res.status(500).send("Gagal menambah data: " + err.message);
        }
        res.redirect('/admin/fasilitas');
    });
});

module.exports = router;