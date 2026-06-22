// File: middleware/auth.js

function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.role === 'admin') {
        return next(); // Lanjut ke halaman admin
    }
    res.redirect('/login'); // Bukan admin? Tendang ke login
}

module.exports = { isAdmin };