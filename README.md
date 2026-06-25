
Sportify - Sistem Booking Lapangan Olahraga
Sportify adalah aplikasi berbasis web yang dirancang untuk memudahkan pengguna dalam memesan lapangan olahraga secara online. Aplikasi ini memungkinkan pengguna untuk memilih lapangan, melakukan booking, serta memantau status pesanan mereka, sementara admin dapat mengelola fasilitas dan menyetujui pesanan yang masuk.

 Fitur Utama
Autentikasi User: Sistem login dan registrasi untuk memisahkan akses pengguna dan admin,yang dibuat oleh faisal
Katalog Fasilitas: Menampilkan daftar lapangan yang tersedia lengkap dengan harga dan deskripsi, yang dibuat oleh chilma
Booking Online: Proses pemesanan lapangan yang terintegrasi langsung ke database.
Riwayat Booking: Pengguna dapat memantau status pesanan (pending/approved).
Dashboard Admin: Admin dapat mengelola daftar lapangan, melihat data user, serta menyetujui atau menolak pesanan yang masuk, yang dibuat oleh panji
Jadwal Aktif: Halaman publik untuk melihat jadwal lapangan yang telah disetujui (status approved).

 Teknologi yang Digunakan
Backend: Node.js dengan framework Express.js
Database: MySQL
Template Engine: EJS (Embedded JavaScript)
Session Management: express-session
Styling: CSS (dapat disesuaikan)

 Struktur Database (Tabel Utama)
users: Menyimpan data akun (username, email, password, role).
fasilitas: Menyimpan data lapangan (nama, harga, foto, deskripsi).
transaksi: Menyimpan data booking (relasi ke users dan fasilitas, tanggal, waktu, dan status booking).
# my-booking-app
Sportify - Sistem Booking Lapangan Olahraga
Sportify adalah aplikasi berbasis web yang dirancang untuk memudahkan pengguna dalam memesan lapangan olahraga secara online. Aplikasi ini memungkinkan pengguna untuk memilih lapangan, melakukan booking, serta memantau status pesanan mereka, sementara admin dapat mengelola fasilitas dan menyetujui pesanan yang masuk.

-Fitur Utama
Autentikasi User: Sistem login dan registrasi untuk memisahkan akses pengguna dan admin.
Katalog Fasilitas: Menampilkan daftar lapangan yang tersedia lengkap dengan harga dan deskripsi.
Booking Online: Proses pemesanan lapangan yang terintegrasi langsung ke database.
Riwayat Booking: Pengguna dapat memantau status pesanan (pending/approved).
Dashboard Admin: Admin dapat mengelola daftar lapangan, melihat data user, serta menyetujui atau menolak pesanan yang masuk.
Jadwal Aktif: Halaman publik untuk melihat jadwal lapangan yang telah disetujui (status approved).

-Teknologi yang Digunakan
Backend: Node.js dengan framework Express.js

Database: MySQL
Template Engine: EJS (Embedded JavaScript)
Session Management: express-session
Styling: CSS (dapat disesuaikan)

-Struktur Database (Tabel Utama)
users: Menyimpan data akun (username, email, password, role).
fasilitas: Menyimpan data lapangan (nama, harga, foto, deskripsi).
transaksi: Menyimpan data booking (relasi ke users dan fasilitas, tanggal, waktu, dan status booking).


role 
panji membuat halaman utama, daftar lapangan, booking dan admin
faisal membuat halaman login dan register
chilma membuat navbar dan footer
