const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Di dalam routes/bookingRoutes.js
router.get('/', (req, res) => {
    // Kita kirim pesan teks sederhana, bukan merender ejs
    res.send("JIKA PESAN INI MUNCUL, BERARTI FILE INI SUDAH TERBACA");
});

module.exports = router;