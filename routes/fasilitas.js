const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Middleware untuk memastikan hanya admin yang bisa akses
const isAdmin = (req, res, next) => {
    if (req.session.role === 'admin') next();
    else res.status(403).send("Akses Ditolak");
};

// 1. Read: Tampilkan daftar
router.get('/', isAdmin, (req, res) => {
    db.query('SELECT * FROM fasilitas', (err, results) => {
        res.render('fasilitas', { fasilitas: results });
    });
});

// 2. Create: Halaman tambah & Proses
router.get('/tambah', isAdmin, (req, res) => res.render('tambah_fasilitas'));

router.post('/tambah', isAdmin, (req, res) => {
    const { nama_fasilitas, harga_per_jam } = req.body;
    db.query('INSERT INTO fasilitas (nama_fasilitas, harga_per_jam) VALUES (?, ?)', [nama_fasilitas, harga_per_jam], () => {
        res.redirect('/admin/fasilitas');
    });
});

// 3. Update: Halaman edit & Proses
router.get('/edit/:id', isAdmin, (req, res) => {
    db.query('SELECT * FROM fasilitas WHERE id = ?', [req.params.id], (err, results) => {
        res.render('edit_fasilitas', { f: results[0] });
    });
});

router.post('/update/:id', isAdmin, (req, res) => {
    const { nama_fasilitas, harga_per_jam } = req.body;
    db.query('UPDATE fasilitas SET nama_fasilitas = ?, harga_per_jam = ? WHERE id = ?', [nama_fasilitas, harga_per_jam, req.params.id], () => {
        res.redirect('/admin/fasilitas');
    });
});

// 4. Delete: Proses hapus
router.get('/hapus/:id', isAdmin, (req, res) => {
    db.query('DELETE FROM fasilitas WHERE id = ?', [req.params.id], () => {
        res.redirect('/admin/fasilitas');
    });
});

module.exports = router;