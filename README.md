# my-booking-app
Poin Penting untuk Pengerjaan Backend
1. Koneksi & Struktur Database

Export/Import Database: Teman Anda perlu menjalankan skema tabel (SQL) agar database-nya sama dengan milik Anda.

Koneksi: Memastikan config/db.js terhubung dengan benar ke database MySQL lokal di komputernya.

2. Integrasi Data ke Halaman (Dynamic Content)

Data Fetching: Saat ini, data lapangan mungkin masih hardcoded. Teman Anda harus mengubahnya agar mengambil data dari tabel fasilitas menggunakan query SQL.

Route Setup: Memastikan halaman / (Home) menampilkan data dari database secara dinamis.

3. Sistem Keamanan & Autentikasi

Login & Registrasi: Membuat sistem user agar orang bisa memiliki akun.

Session Management: Menggunakan library seperti express-session agar website bisa "mengingat" user yang sedang login.

Middleware: Membuat script pengecekan (middleware) agar halaman /booking hanya bisa diakses oleh user yang sudah login (jika belum, arahkan ke /login).

4. Logika Booking (Inti Aplikasi)

Form Booking: Membuat form untuk memilih tanggal dan jam.

Validasi Jadwal: Logika untuk mengecek apakah lapangan sudah dipesan orang lain di jam tersebut (mencegah double booking).

Penyimpanan Transaksi: Menyimpan data pesanan ke dalam tabel bookings setelah user menekan tombol "Bayar/Booking".

5. Halaman Profil/Jadwal User

Riwayat Booking: User harus bisa melihat lapangan apa saja yang sudah mereka pesan
