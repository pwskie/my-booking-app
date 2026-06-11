const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Route API
router.get('/api/fasilitas', (req, res) => {
    db.query('SELECT * FROM facilities', (err, results) => {
        if (err) {
            console.error("Error query database:", err);
            return res.status(500).json({ error: 'Gagal mengambil data dari database' });
        }
        res.json(results);
    });
});

// Route Utama

router.get('/', (req, res) => {
    db.query('SELECT * FROM facilities', (err, results) => {
        if (err) return res.status(500).send('Database Error');
        // 'index' merujuk pada file views/index.ejs
        // 'fasilitas' adalah nama variabel yang akan kita pakai di EJS
        res.render('index', { fasilitas: results });
    });
});

module.exports = router;