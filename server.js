require('dotenv').config();
const express = require('express');
const app = express();
const bookingRoutes = require('./routes/bookingRoutes'); // Mengimpor route

// Middleware
app.use(express.json());

app.use(express.static('public'));

// Menggunakan route yang sudah dibuat
app.use('/', bookingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 

app.set('view engine', 'ejs');
