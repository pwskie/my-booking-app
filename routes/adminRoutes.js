// File: routes/adminRoutes.js
const express = require('express');
const router = express.Router();

// 1. Impor fungsi isAdmin dari file middleware yang baru dibuat
const { isAdmin } = require('../middleware/auth');

// 2. Gunakan di route admin
// Middleware 'isAdmin' diletakkan di tengah sebagai filter
router.get('/dashboard', isAdmin, (req, res) => {
    res.render('admin/dashboard');
});

module.exports = router;