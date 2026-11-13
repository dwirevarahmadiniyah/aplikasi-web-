# 🌸 DREAMIES MATH SQUAD — 7 Chibi Friends Edition

Website pembelajaran **Bentuk Aljabar** untuk siswa SMP. Dibuat dengan React + Vite, bisa dipasang di HP sebagai aplikasi web (PWA), dan bisa dipakai **offline** setelah pernah dibuka.

## ✨ Fitur
- **8 bab materi**: setiap bab berisi tujuan, penjelasan, rumus, contoh soal langkah demi langkah, kesalahan umum, dan kesimpulan.
- **Contoh soal per bab** (Mudah, Sedang, Sulit) dengan tombol *Lihat Jawaban* dan *Lihat Pembahasan*.
- **Latihan per bab**: 3 pilihan ganda + 3 uraian, dengan penilaian otomatis, rekap nilai, dan pembahasan lengkap.
- **Kuis utama**: 10 pilihan ganda + 5 uraian, diambil acak dari 36 soal. Soal pada sesi sebelumnya diusahakan tidak muncul lagi.
- **Kunci jawaban dan pembahasan** untuk semua soal (konsep, langkah, alasan, dan pedoman penilaian), ditampilkan **setelah** dikumpulkan.
- **Masuk dengan Nama dan Kelas**: tanpa kata sandi dan tanpa server. Data disimpan di perangkat dan bisa diubah atau dihapus (Keluar) dari halaman Profil.
- **Hasil belajar dan progres**: materi selesai, nilai latihan, dan riwayat kuis, tersimpan di localStorage.
- **Refresh me-reset** kuis atau latihan yang sedang berjalan, tanpa menghapus data siswa maupun nilai yang sudah tersimpan.
- 7 karakter chibi orisinal: Eong, Jjun, Jjed, Jjopo, Kkyuping, Lemyo, dan Bamjji.

## ▶️ Cara Menjalankan (Windows + VS Code)
Buka terminal di VS Code (**Terminal → New Terminal**):

```bash
npm install        # sekali saja
npm run dev        # buka http://localhost:5173
```

Tekan `Ctrl + C` untuk berhenti.

| Perintah | Fungsi |
|---|---|
| `npm test` | Memeriksa konten, **kebenaran matematis semua kunci jawaban**, penilaian, dan penyimpanan |
| `npm run build` | Membuat versi siap online di folder `dist/` |
| `npm run e2e` | Uji otomatis di browser Edge/Chrome (jalankan `npm run build` dulu) |
| `npm run check` | Menjalankan ketiganya sekaligus |
| `npm run preview` | Mencoba hasil build (PWA & offline aktif) |
| `npm run icons` | Membuat ulang ikon aplikasi |

## 📱 Mencoba di HP
- **Satu Wi-Fi dengan laptop:** jalankan `npm run dev`, lalu buka alamat **Network:** yang muncul di terminal.
- **Pasang sebagai aplikasi (PWA):** butuh HTTPS. Jalankan `npm run build`, unggah folder `dist` ke https://app.netlify.com/drop, lalu buka linknya di HP.
  - Android (Chrome): menu ⋮ → *Instal aplikasi*
  - iPhone (Safari): Bagikan → *Tambah ke Layar Utama*

Ini adalah aplikasi web (PWA), **bukan** APK atau aplikasi iOS dari toko aplikasi.

## 🗂️ Struktur Proyek
```
src/
  data/          materi.js (8 bab), contohSoal.js, latihan.js, kuis.js, buddies.js, profil.js
  pages/         Home, Materi, Contoh, Latihan, Kuis, Hasil, Profil, Login
  components/    Chibi (ilustrasi SVG), Question (soal & pembahasan), NavBar, ui
  auth/          AuthContext.jsx   ← login nama & kelas (localStorage)
  utils/         algebra.js (pemeriksa jawaban aljabar), grading.js, quiz.js, storage.js, progress.js
  ProgressContext.jsx   progres tersimpan (localStorage)
  SessionContext.jsx    kuis/latihan yang sedang berjalan (hilang saat refresh)
public/          manifest.json, ikon, favicon
pwa/             template service worker
scripts/         tes konten, uji browser, screenshot, pembuat ikon
```

## 🧮 Cara soal uraian dinilai
- **Bentuk aljabar** (misalnya `2x + 4y`): jawaban dihitung sebagai polinomial. Urutan suku boleh berbeda, tetapi harus **paling sederhana**. Contohnya, `2(x + 3)` untuk kunci `2x + 6` diberi status *belum paling sederhana*.
- **Bilangan**: boleh ditulis dengan `Rp`, titik ribuan, atau satuan (`cm`, `tahun`).
- **Soal penjelasan**: **tidak** dinilai otomatis. Ditampilkan pedoman penilaian untuk diperiksa guru.

## ✏️ Mengubah Isi
- Data pembuat aplikasi: `src/data/profil.js`
- Materi dan soal: file di `src/data/` (jalankan `npm test` setelah mengubah soal untuk memastikan kuncinya benar)
- Gambar karakter sendiri: lihat petunjuk di `src/data/buddies.js`
