# Sportify - Sistem Booking Lapangan Olahraga

Sportify adalah aplikasi booking lapangan olahraga berbasis web yang memungkinkan pengguna memesan lapangan, melihat riwayat booking, dan admin mengelola fasilitas serta status booking.

## Fitur utama
- Login dan registrasi user/admin
- Daftar fasilitas/lapangan dengan harga per jam
- Proses booking online
- Riwayat booking pengguna
- Dashboard admin untuk mengelola booking dan fasilitas
- Halaman jadwal yang menampilkan booking approved

## Teknologi
- Node.js + Express.js
- MySQL
- EJS
- express-session

## Persiapan lokal
1. Install dependency:
   ```bash
   npm install
   ```
2. Salin file env contoh:
   ```bash
   copy .env.example .env
   ```
3. Sesuaikan konfigurasi database di .env
4. Jalankan aplikasi:
   ```bash
   npm start
   ```

## Variabel environment
- DB_HOST
- DB_USER
- DB_PASSWORD
- DB_NAME
- SESSION_SECRET
- PORT
- NODE_ENV

## Deployment ke Vercel
1. Push repo ke GitHub
2. Buka Vercel, import project
3. Set environment variables sesuai nilai database Anda
4. Deploy

## Struktur database utama
- users
- fasilitas
- transaksi

## Kontributor
- Panji: halaman utama, daftar lapangan, booking, admin
- Faisal: login dan register
- Chilma: navbar dan footer
