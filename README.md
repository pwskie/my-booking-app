# my-booking-app

Sportify adalah aplikasi booking lapangan olahraga berbasis web yang memudahkan pengguna untuk melihat fasilitas, melakukan pemesanan, dan memantau riwayat booking. Admin juga dapat mengelola fasilitas serta menyetujui pesanan.

## Fitur Utama
- Autentikasi user dan admin
- Katalog fasilitas dengan harga dan deskripsi
- Proses booking online
- Riwayat booking dengan status pending/approved
- Dashboard admin untuk mengelola fasilitas dan booking
- Jadwal aktif lapangan yang sudah disetujui

## Teknologi yang Digunakan
- Backend: Node.js + Express.js
- Template Engine: EJS
- Database: MySQL
- Session Management: express-session
- Styling: CSS

## Struktur Database
- users: menyimpan akun user dan admin
- fasilitas: menyimpan data lapangan olahraga
- transaksi: menyimpan data booking pengguna

## Kontributor
- Panji: halaman utama, daftar lapangan, booking, dan admin
- Faisal: halaman login dan register
- Chilma: navbar dan footer

## Cara Menjalankan Lokal
1. Install dependency
   ```bash
   npm install
   ```
2. Jalankan aplikasi
   ```bash
   npm run dev
   ```
3. Buka browser ke
   ```text
   http://localhost:3000
   ```
