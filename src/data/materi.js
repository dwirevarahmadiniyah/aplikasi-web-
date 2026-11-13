// =====================================================================
// MATERI BENTUK ALJABAR - DREAMIES MATH SQUAD (8 BAB)
// Setiap bab: tujuan, bagian penjelasan, rumus, contoh (langkah + alasan),
// kesalahan yang sering terjadi (opsional), dan kesimpulan.
// Tanda minus memakai "−" agar rapi saat ditampilkan.
// Field `cek` pada contoh dipakai tes otomatis untuk memastikan jawaban benar.
// =====================================================================

export const materi = [
  // ------------------------------------------------------------- BAB 1
  {
    id: 'bab1',
    nomor: 1,
    judul: 'Pengenalan Bentuk Aljabar',
    deskripsi: 'Kenalan dengan variabel, koefisien, konstanta, dan suku.',
    warna: 'pink',
    buddy: 0,
    tujuan: [
      'Menjelaskan pengertian bentuk aljabar.',
      'Menyebutkan variabel, koefisien, konstanta, dan suku pada suatu bentuk aljabar.',
      'Menuliskan situasi sehari-hari ke dalam bentuk aljabar sederhana.',
    ],
    bagian: [
      {
        judul: 'Apa itu bentuk aljabar?',
        isi: [
          'Bentuk aljabar adalah bentuk matematika yang memuat huruf untuk mewakili bilangan yang belum diketahui nilainya.',
          'Contoh bentuk aljabar: 2x + 3, 5a, dan 4p − q + 7. Ketiganya memuat huruf.',
          'Bentuk 7 + 5 bukan bentuk aljabar karena hanya berisi angka.',
          'Perkalian angka dan huruf ditulis berdampingan tanpa tanda kali: 3 × x ditulis 3x.',
        ],
      },
      {
        judul: 'Variabel',
        isi: [
          'Variabel adalah huruf pengganti bilangan yang belum diketahui atau bisa berubah-ubah, misalnya x, y, a, atau n.',
          'Pada 5x + 2y − 7, variabelnya adalah x dan y.',
          'Huruf yang sama dihitung sebagai satu variabel. Pada 3a + 2a, variabelnya hanya a.',
        ],
      },
      {
        judul: 'Koefisien',
        isi: [
          'Koefisien adalah bilangan yang berada di depan variabel dan dikalikan dengan variabel itu.',
          'Pada 4x, koefisiennya 4. Pada x, koefisiennya 1 karena x = 1x.',
          'Tanda di depan suku ikut menjadi bagian koefisien. Pada 3a − 5b, koefisien b adalah −5. Pada −y, koefisiennya −1.',
        ],
      },
      {
        judul: 'Konstanta',
        isi: [
          'Konstanta adalah suku yang hanya berupa bilangan, tanpa variabel. Nilainya tetap.',
          'Pada 2a + 5b − 9, konstantanya −9 (tanda minus ikut).',
          'Tidak semua bentuk aljabar punya konstanta. Contoh: 3x + 2y tidak memiliki konstanta.',
        ],
      },
      {
        judul: 'Suku',
        isi: [
          'Suku adalah bagian bentuk aljabar yang dipisahkan oleh tanda + atau −.',
          'Pada 3x² − 2x + 5y − 4 ada empat suku: 3x², −2x, 5y, dan −4.',
          'Tanda + atau − selalu ikut dengan suku yang ada di belakangnya.',
        ],
      },
      {
        judul: 'Aljabar dalam kehidupan sehari-hari',
        isi: [
          'Jika harga 1 buku b rupiah dan 1 pensil p rupiah, harga 3 buku dan 2 pensil ditulis 3b + 2p.',
          'Jika umur Adik a tahun dan Kakak 5 tahun lebih tua, umur Kakak ditulis a + 5.',
          'Kata kunci: "lebih dari / ditambah" → +, "kurang dari / dikurangi" → −, "kali / lipat" → ×, "dibagi" → :.',
          'Hati-hati: "5 kurang dari x" ditulis x − 5, bukan 5 − x.',
        ],
      },
    ],
    rumus: [
      { nama: 'Bentuk aljabar sederhana', isi: 'ax + b', ket: 'a = koefisien, x = variabel, b = konstanta' },
      { nama: 'Penulisan perkalian', isi: '3 × x = 3x', ket: 'Tanda kali antara angka dan huruf tidak ditulis.' },
      { nama: 'Koefisien tersembunyi', isi: 'x = 1x   dan   −y = −1y' },
    ],
    contoh: [
      {
        soal: 'Tentukan variabel, koefisien, konstanta, dan banyak suku dari 5x − 3y + 7.',
        langkah: [
          { teks: 'Pisahkan suku berdasarkan tanda + dan −.', hasil: '5x,  −3y,  +7', alasan: 'Tanda ikut dengan suku di belakangnya.' },
          { teks: 'Cari hurufnya.', hasil: 'Variabel: x dan y', alasan: 'Variabel selalu berupa huruf.' },
          { teks: 'Cari angka di depan setiap variabel.', hasil: 'Koefisien x = 5, koefisien y = −3', alasan: 'Tanda minus di depan 3y ikut menjadi bagian koefisien.' },
          { teks: 'Cari suku tanpa huruf.', hasil: 'Konstanta = 7', alasan: 'Suku 7 tidak memuat variabel.' },
          { teks: 'Hitung banyak suku.', hasil: '3 suku', alasan: 'Ada tiga bagian yang dipisahkan tanda + dan −.' },
        ],
        jawaban: 'Variabel x dan y; koefisien x = 5, koefisien y = −3; konstanta 7; terdiri dari 3 suku.',
      },
      {
        soal: 'Harga satu cokelat x rupiah. Rani membeli 4 cokelat dan membayar kantong plastik Rp1.000. Tuliskan bentuk aljabar total belanjanya, lalu hitung jika x = 5.000.',
        langkah: [
          { teks: 'Tentukan variabel.', hasil: 'harga 1 cokelat = x', alasan: 'Harga cokelat belum diketahui.' },
          { teks: 'Hitung harga 4 cokelat.', hasil: '4 × x = 4x', alasan: 'Harga satuan dikali banyak barang.' },
          { teks: 'Tambahkan harga plastik.', hasil: '4x + 1.000', alasan: 'Plastik adalah biaya tambahan.' },
          { teks: 'Substitusi x = 5.000.', hasil: '4 × 5.000 + 1.000 = 20.000 + 1.000 = 21.000', alasan: 'Kerjakan perkalian dulu, baru penjumlahan.' },
        ],
        jawaban: 'Bentuk aljabar: 4x + 1.000. Total belanja = Rp21.000',
        cek: { ekspr: '4x + 1000', nilai: { x: 5000 }, hasil: 21000 },
      },
    ],
    kesimpulan: [
      'Bentuk aljabar memuat variabel (huruf) yang mewakili bilangan.',
      'Koefisien adalah angka di depan variabel; tandanya ikut dihitung.',
      'Konstanta adalah suku tanpa variabel.',
      'Suku dipisahkan oleh tanda + atau −.',
    ],
  },

  // ------------------------------------------------------------- BAB 2
  {
    id: 'bab2',
    nomor: 2,
    judul: 'Unsur-Unsur Bentuk Aljabar',
    deskripsi: 'Suku satu, suku dua, suku tiga, suku sejenis dan tidak sejenis.',
    warna: 'blue',
    buddy: 1,
    tujuan: [
      'Membedakan suku tunggal, suku dua (binomial), dan suku tiga (trinomial).',
      'Membedakan suku sejenis dan suku tidak sejenis.',
      'Mengidentifikasi unsur-unsur bentuk aljabar secara runtut.',
    ],
    bagian: [
      {
        judul: 'Suku tunggal (monomial)',
        isi: [
          'Bentuk aljabar yang hanya terdiri dari satu suku disebut suku tunggal atau suku satu.',
          'Contoh: 5x, −3ab, 7y², dan 12.',
        ],
      },
      {
        judul: 'Suku dua (binomial)',
        isi: [
          'Bentuk aljabar yang terdiri dari dua suku disebut suku dua atau binomial.',
          'Contoh: 2x + 3, a − b, dan 4p² − 9.',
        ],
      },
      {
        judul: 'Suku tiga (trinomial)',
        isi: [
          'Bentuk aljabar yang terdiri dari tiga suku disebut suku tiga atau trinomial.',
          'Contoh: x² + 2x − 1 dan 3a − 2b + 5.',
          'Bentuk dengan lebih dari tiga suku disebut suku banyak (polinomial).',
        ],
      },
      {
        judul: 'Suku sejenis',
        isi: [
          'Suku sejenis adalah suku yang variabel dan pangkatnya sama persis. Koefisiennya boleh berbeda.',
          'Contoh suku sejenis: 3x dan 7x; 2a² dan −5a²; 4xy dan −yx (karena xy = yx).',
        ],
      },
      {
        judul: 'Suku tidak sejenis',
        isi: [
          'Suku tidak sejenis adalah suku yang variabelnya berbeda atau pangkatnya berbeda.',
          'Contoh: 3x dan 3y (variabel berbeda); 2x dan 2x² (pangkat berbeda); 5 dan 5m (satu konstanta, satu memuat variabel).',
        ],
      },
      {
        judul: 'Cara mengidentifikasi unsur-unsur aljabar',
        isi: [
          'Langkah 1: Pisahkan setiap suku berdasarkan tanda + dan −.',
          'Langkah 2: Untuk setiap suku, catat koefisien, variabel, dan pangkatnya.',
          'Langkah 3: Kelompokkan suku yang variabel dan pangkatnya sama (suku sejenis).',
          'Langkah 4: Hitung banyak suku untuk menentukan jenisnya (satu, dua, tiga, atau banyak).',
        ],
      },
    ],
    rumus: [
      { nama: 'Suku satu', isi: '5x' },
      { nama: 'Suku dua', isi: '2x + 3' },
      { nama: 'Suku tiga', isi: 'x² + 2x − 1' },
      { nama: 'Syarat suku sejenis', isi: 'variabel sama  &  pangkat sama', ket: 'contoh: 3x dan 7x' },
    ],
    contoh: [
      {
        soal: 'Tentukan banyak suku dan jenis bentuk aljabar 3x² − 2x + 5.',
        langkah: [
          { teks: 'Pisahkan suku.', hasil: '3x²,  −2x,  5', alasan: 'Tanda + dan − memisahkan suku.' },
          { teks: 'Hitung banyak suku.', hasil: '3 suku', alasan: 'Ada tiga bagian.' },
          { teks: 'Tentukan jenisnya.', hasil: 'Suku tiga (trinomial)', alasan: 'Bentuk dengan tiga suku disebut trinomial.' },
        ],
        jawaban: '3 suku, termasuk suku tiga (trinomial).',
      },
      {
        soal: 'Kelompokkan suku sejenis dari: 5x, 3y, −2x, x², 4y.',
        langkah: [
          { teks: 'Cari suku dengan variabel x berpangkat 1.', hasil: '5x dan −2x', alasan: 'Variabel dan pangkatnya sama.' },
          { teks: 'Cari suku dengan variabel y.', hasil: '3y dan 4y', alasan: 'Keduanya y berpangkat 1.' },
          { teks: 'Periksa x².', hasil: 'x² tidak punya pasangan', alasan: 'Pangkatnya 2, berbeda dengan 5x dan −2x.' },
        ],
        jawaban: '{5x, −2x} dan {3y, 4y}; suku x² berdiri sendiri.',
      },
    ],
    kesalahan: [
      { salah: '2x dan 2x² dianggap sejenis', benar: '2x dan 2x² tidak sejenis', alasan: 'Pangkat x berbeda (1 dan 2).' },
      { salah: 'Konstanta tidak dihitung sebagai suku', benar: 'Konstanta juga suku', alasan: 'Pada 2a + 5 ada dua suku: 2a dan 5.' },
    ],
    kesimpulan: [
      'Jenis bentuk aljabar ditentukan oleh banyak sukunya.',
      'Suku sejenis memiliki variabel dan pangkat yang sama.',
      'Koefisien tidak memengaruhi sejenis atau tidaknya suatu suku.',
    ],
  },

  // ------------------------------------------------------------- BAB 3
  {
    id: 'bab3',
    nomor: 3,
    judul: 'Penjumlahan Bentuk Aljabar',
    deskripsi: 'Menjumlahkan suku-suku sejenis dengan benar.',
    warna: 'mint',
    buddy: 2,
    tujuan: [
      'Menjelaskan aturan penjumlahan bentuk aljabar.',
      'Mengelompokkan suku sejenis sebelum menjumlahkan.',
      'Menghindari kesalahan umum dalam penjumlahan aljabar.',
    ],
    bagian: [
      {
        judul: 'Aturan penjumlahan',
        isi: [
          'Penjumlahan hanya bisa dilakukan pada suku-suku sejenis.',
          'Caranya: jumlahkan koefisiennya, sedangkan variabel dan pangkatnya tetap.',
          'Ibarat buah: 3 apel + 2 apel = 5 apel, tetapi 3 apel + 2 jeruk tetap 3 apel + 2 jeruk.',
        ],
      },
      {
        judul: 'Mengelompokkan suku sejenis',
        isi: [
          'Untuk bentuk yang panjang, kumpulkan dulu suku-suku sejenis. Urutan suku boleh ditukar asalkan tandanya ikut.',
          'Tanda + di depan kurung tidak mengubah tanda di dalam kurung: (2x + 3y) + (4x − y) = 2x + 3y + 4x − y.',
        ],
      },
    ],
    rumus: [
      { nama: 'Penjumlahan suku sejenis', isi: 'ax + bx = (a + b)x' },
      { nama: 'Contoh', isi: '3x + 2x = 5x' },
      { nama: 'Suku tidak sejenis', isi: '3x + 2y  (tetap)', ket: 'Tidak bisa disederhanakan lagi.' },
    ],
    contoh: [
      {
        soal: 'Sederhanakan 3x + 2x.',
        langkah: [
          { teks: 'Periksa apakah sukunya sejenis.', hasil: '3x dan 2x sama-sama memuat x', alasan: 'Variabel dan pangkatnya sama.' },
          { teks: 'Jumlahkan koefisiennya.', hasil: '3 + 2 = 5', alasan: 'Yang dijumlahkan hanya angkanya.' },
          { teks: 'Tulis kembali variabelnya.', hasil: '5x', alasan: 'Variabel tidak berubah.' },
        ],
        jawaban: '3x + 2x = 5x',
        cek: { soal: '3x + 2x', jawaban: '5x' },
      },
      {
        soal: 'Sederhanakan (2x + 3y) + (4x − y).',
        langkah: [
          { teks: 'Hilangkan tanda kurung.', hasil: '2x + 3y + 4x − y', alasan: 'Tanda + di depan kurung tidak mengubah tanda di dalamnya.' },
          { teks: 'Kelompokkan suku sejenis.', hasil: '(2x + 4x) + (3y − y)', alasan: 'Suku x dengan suku x, suku y dengan suku y.' },
          { teks: 'Hitung tiap kelompok.', hasil: '6x + 2y', alasan: '2 + 4 = 6 dan 3 − 1 = 2 (y = 1y).' },
        ],
        jawaban: '6x + 2y',
        cek: { soal: '(2x + 3y) + (4x − y)', jawaban: '6x + 2y' },
      },
      {
        soal: 'Sederhanakan (3a² + 2a − 1) + (a² − 5a + 4).',
        langkah: [
          { teks: 'Hilangkan tanda kurung.', hasil: '3a² + 2a − 1 + a² − 5a + 4', alasan: 'Tanda + di depan kurung tidak mengubah tanda.' },
          { teks: 'Kelompokkan suku sejenis.', hasil: '(3a² + a²) + (2a − 5a) + (−1 + 4)', alasan: 'a² dengan a², a dengan a, konstanta dengan konstanta.' },
          { teks: 'Hitung tiap kelompok.', hasil: '4a² − 3a + 3', alasan: '3 + 1 = 4; 2 − 5 = −3; −1 + 4 = 3.' },
        ],
        jawaban: '4a² − 3a + 3',
        cek: { soal: '(3a² + 2a − 1) + (a² − 5a + 4)', jawaban: '4a² − 3a + 3' },
      },
    ],
    kesalahan: [
      { salah: '2x + 3y = 5xy', benar: '2x + 3y (tetap)', alasan: '2x dan 3y tidak sejenis, jadi tidak bisa dijumlahkan.' },
      { salah: 'x + x = x²', benar: 'x + x = 2x', alasan: 'Menjumlahkan berarti menambah koefisien (1 + 1 = 2), bukan mengubah pangkat.' },
      { salah: '3x + x = 3x', benar: '3x + x = 4x', alasan: 'x artinya 1x, jadi 3 + 1 = 4.' },
    ],
    kesimpulan: [
      'Hanya suku sejenis yang bisa dijumlahkan.',
      'Jumlahkan koefisien; variabel dan pangkat tetap.',
      'Suku tidak sejenis ditulis terpisah.',
    ],
  },

  // ------------------------------------------------------------- BAB 4
  {
    id: 'bab4',
    nomor: 4,
    judul: 'Pengurangan Bentuk Aljabar',
    deskripsi: 'Mengurangkan suku sejenis dan memahami tanda.',
    warna: 'lavender',
    buddy: 3,
    tujuan: [
      'Menjelaskan aturan pengurangan bentuk aljabar.',
      'Memahami perubahan tanda ketika ada minus di depan kurung.',
      'Mengurangkan bentuk aljabar dengan tepat.',
    ],
    bagian: [
      {
        judul: 'Aturan pengurangan',
        isi: [
          'Pengurangan juga hanya bisa dilakukan pada suku sejenis. Kurangkan koefisiennya, variabelnya tetap.',
          'Contoh: 5a − 2a = 3a karena 5 − 2 = 3.',
        ],
      },
      {
        judul: 'Memahami tanda positif dan negatif',
        isi: [
          'Jika ada tanda minus di depan kurung, SEMUA tanda di dalam kurung berubah: + menjadi −, dan − menjadi +.',
          '−(b + c) = −b − c   dan   −(b − c) = −b + c.',
          'Mengurangi bilangan negatif sama dengan menambah: a − (−b) = a + b.',
        ],
      },
      {
        judul: 'Mengurangi suku sejenis',
        isi: [
          'Langkah 1: Buka kurung dan ubah tandanya jika ada minus di depan kurung.',
          'Langkah 2: Kumpulkan suku-suku sejenis.',
          'Langkah 3: Hitung koefisien setiap kelompok.',
        ],
      },
    ],
    rumus: [
      { nama: 'Pengurangan suku sejenis', isi: 'ax − bx = (a − b)x' },
      { nama: 'Minus di depan kurung', isi: '−(b + c) = −b − c' },
      { nama: 'Minus di depan kurung', isi: '−(b − c) = −b + c' },
    ],
    contoh: [
      {
        soal: 'Sederhanakan 5a − 2a.',
        langkah: [
          { teks: 'Periksa suku sejenis.', hasil: '5a dan 2a sama-sama memuat a', alasan: 'Variabelnya sama.' },
          { teks: 'Kurangkan koefisiennya.', hasil: '5 − 2 = 3', alasan: 'Yang dikurangkan hanya koefisien.' },
          { teks: 'Tulis hasilnya.', hasil: '3a', alasan: 'Variabel a tetap.' },
        ],
        jawaban: '5a − 2a = 3a',
        cek: { soal: '5a − 2a', jawaban: '3a' },
      },
      {
        soal: 'Sederhanakan (7x + 4) − (3x − 2).',
        langkah: [
          { teks: 'Buka kurung kedua.', hasil: '7x + 4 − 3x + 2', alasan: 'Minus mengubah +3x menjadi −3x dan −2 menjadi +2.' },
          { teks: 'Kumpulkan suku sejenis.', hasil: '(7x − 3x) + (4 + 2)', alasan: 'Suku x dengan suku x, konstanta dengan konstanta.' },
          { teks: 'Hitung.', hasil: '4x + 6', alasan: '7 − 3 = 4 dan 4 + 2 = 6.' },
        ],
        jawaban: '4x + 6',
        cek: { soal: '(7x + 4) − (3x − 2)', jawaban: '4x + 6' },
      },
      {
        soal: 'Sederhanakan (5p² − 3p + 2) − (2p² + p − 6).',
        langkah: [
          { teks: 'Buka kurung kedua dan ubah tandanya.', hasil: '5p² − 3p + 2 − 2p² − p + 6', alasan: '+2p² → −2p², +p → −p, −6 → +6.' },
          { teks: 'Kumpulkan suku sejenis.', hasil: '(5p² − 2p²) + (−3p − p) + (2 + 6)', alasan: 'Kelompokkan berdasarkan variabel dan pangkat.' },
          { teks: 'Hitung.', hasil: '3p² − 4p + 8', alasan: '5 − 2 = 3; −3 − 1 = −4; 2 + 6 = 8.' },
        ],
        jawaban: '3p² − 4p + 8',
        cek: { soal: '(5p² − 3p + 2) − (2p² + p − 6)', jawaban: '3p² − 4p + 8' },
      },
    ],
    kesalahan: [
      { salah: '(7x + 4) − (3x − 2) = 4x + 2', benar: '= 4x + 6', alasan: 'Tanda −2 di dalam kurung harus berubah menjadi +2.' },
      { salah: '5a − 2a = 3', benar: '5a − 2a = 3a', alasan: 'Variabel tidak hilang saat dikurangkan.' },
    ],
    kesimpulan: [
      'Kurangkan koefisien suku sejenis; variabel tetap.',
      'Minus di depan kurung mengubah SEMUA tanda di dalam kurung.',
      'Kumpulkan suku sejenis sebelum menghitung.',
    ],
  },

  // ------------------------------------------------------------- BAB 5
  {
    id: 'bab5',
    nomor: 5,
    judul: 'Perkalian Bentuk Aljabar',
    deskripsi: 'Mengalikan koefisien, variabel, dan memakai sifat distributif.',
    warna: 'pink',
    buddy: 4,
    tujuan: [
      'Mengalikan koefisien dengan koefisien dan variabel dengan variabel.',
      'Menggunakan sifat distributif untuk menjabarkan bentuk berkurung.',
      'Mengalikan bentuk aljabar sederhana dengan memperhatikan tanda.',
    ],
    bagian: [
      {
        judul: 'Perkalian koefisien dan variabel',
        isi: [
          'Kalikan koefisien dengan koefisien, lalu variabel dengan variabel.',
          'Contoh: 3x · 4y = 12xy dan 2a · 5a = 10a².',
          'Variabel sama yang dikalikan, pangkatnya dijumlahkan: x · x = x², x² · x = x³.',
        ],
      },
      {
        judul: 'Sifat distributif',
        isi: [
          'Bilangan atau suku di luar kurung dikalikan ke SETIAP suku di dalam kurung.',
          'a(b + c) = ab + ac   dan   a(b − c) = ab − ac.',
          'Contoh: 2(x + 3) = 2x + 6, dan 2x(x + 5) = 2x² + 10x.',
        ],
      },
      {
        judul: 'Aturan tanda',
        isi: [
          'Positif × positif = positif; negatif × negatif = positif; positif × negatif = negatif.',
          'Contoh: −2(3a − 5) = −6a + 10, karena (−2)(−5) = +10.',
        ],
      },
      {
        judul: 'Perkalian dua bentuk berkurung (pengayaan)',
        isi: [
          'Untuk (a + b)(c + d), kalikan setiap suku pada kurung pertama dengan setiap suku pada kurung kedua.',
          '(x + 2)(x + 3) = x · x + x · 3 + 2 · x + 2 · 3 = x² + 3x + 2x + 6 = x² + 5x + 6.',
        ],
      },
    ],
    rumus: [
      { nama: 'Koefisien × koefisien', isi: 'ax · by = (a · b)xy' },
      { nama: 'Pangkat variabel sama', isi: 'xᵐ · xⁿ = xᵐ⁺ⁿ', ket: 'contoh: x² · x = x³' },
      { nama: 'Sifat distributif', isi: 'a(b + c) = ab + ac' },
      { nama: 'Dua kurung', isi: '(a + b)(c + d) = ac + ad + bc + bd' },
    ],
    contoh: [
      {
        soal: 'Jabarkan 2(x + 3).',
        langkah: [
          { teks: 'Kalikan 2 ke setiap suku dalam kurung.', hasil: '2 · x + 2 · 3', alasan: 'Sifat distributif.' },
          { teks: 'Hitung setiap perkalian.', hasil: '2x + 6', alasan: '2 · x = 2x dan 2 · 3 = 6.' },
          { teks: 'Periksa apakah bisa disederhanakan.', hasil: '2x + 6 (selesai)', alasan: '2x dan 6 tidak sejenis.' },
        ],
        jawaban: '2(x + 3) = 2x + 6',
        cek: { soal: '2(x + 3)', jawaban: '2x + 6' },
      },
      {
        soal: 'Jabarkan −2(3a − 5).',
        langkah: [
          { teks: 'Kalikan −2 ke setiap suku.', hasil: '(−2)(3a) + (−2)(−5)', alasan: 'Tanda −2 ikut dikalikan.' },
          { teks: 'Hitung perkalian pertama.', hasil: '−6a', alasan: 'Negatif × positif = negatif.' },
          { teks: 'Hitung perkalian kedua.', hasil: '+10', alasan: 'Negatif × negatif = positif.' },
        ],
        jawaban: '−2(3a − 5) = −6a + 10',
        cek: { soal: '−2(3a − 5)', jawaban: '−6a + 10' },
      },
      {
        soal: 'Jabarkan 2x(x + 5).',
        langkah: [
          { teks: 'Kalikan 2x ke setiap suku.', hasil: '2x · x + 2x · 5', alasan: 'Sifat distributif.' },
          { teks: 'Hitung 2x · x.', hasil: '2x²', alasan: 'x · x = x².' },
          { teks: 'Hitung 2x · 5.', hasil: '10x', alasan: '2 · 5 = 10, variabel x tetap.' },
        ],
        jawaban: '2x(x + 5) = 2x² + 10x',
        cek: { soal: '2x(x + 5)', jawaban: '2x² + 10x' },
      },
    ],
    kesalahan: [
      { salah: '2(x + 3) = 2x + 3', benar: '2(x + 3) = 2x + 6', alasan: 'Angka 2 harus dikalikan ke SEMUA suku dalam kurung.' },
      { salah: '3x · 4x = 12x', benar: '3x · 4x = 12x²', alasan: 'x · x = x², pangkatnya bertambah.' },
    ],
    kesimpulan: [
      'Kalikan koefisien dengan koefisien, variabel dengan variabel.',
      'Variabel sama yang dikalikan: pangkatnya dijumlahkan.',
      'Sifat distributif: kalikan ke setiap suku dalam kurung.',
      'Perhatikan aturan tanda.',
    ],
  },

  // ------------------------------------------------------------- BAB 6
  {
    id: 'bab6',
    nomor: 6,
    judul: 'Pembagian Bentuk Aljabar',
    deskripsi: 'Membagi koefisien dan variabel berpangkat sederhana.',
    warna: 'blue',
    buddy: 5,
    tujuan: [
      'Menjelaskan aturan pembagian bentuk aljabar.',
      'Membagi koefisien dengan koefisien.',
      'Membagi variabel berpangkat sederhana.',
    ],
    bagian: [
      {
        judul: 'Aturan pembagian',
        isi: [
          'Bagi koefisien dengan koefisien, lalu variabel dengan variabel.',
          'Jika pembaginya hanya angka, variabel tidak berubah: 6x : 2 = 3x.',
          'Pembagian dengan variabel berlaku jika variabel tersebut tidak bernilai nol.',
        ],
      },
      {
        judul: 'Pembagian koefisien',
        isi: [
          '12x : 4 = 3x karena 12 : 4 = 3.',
          '−10a : 5 = −2a karena −10 : 5 = −2.',
        ],
      },
      {
        judul: 'Pembagian variabel dengan pangkat sederhana',
        isi: [
          'Variabel sama yang dibagi, pangkatnya dikurangkan: x² : x = x, x³ : x = x², dan x : x = 1.',
          'Alasannya: x³ = x · x · x. Jika dibagi x, satu x hilang sehingga tersisa x · x = x².',
          'Contoh: 12a³b : 4ab = 3a², karena 12 : 4 = 3, a³ : a = a², dan b : b = 1.',
        ],
      },
      {
        judul: 'Membagi bentuk dalam kurung',
        isi: [
          'Setiap suku di dalam kurung dibagi dengan pembagi yang sama.',
          '(6x + 9) : 3 = 6x : 3 + 9 : 3 = 2x + 3.',
        ],
      },
    ],
    rumus: [
      { nama: 'Suku : bilangan', isi: 'ax : k = (a : k)x' },
      { nama: 'Pangkat variabel sama', isi: 'xᵐ : xⁿ = xᵐ⁻ⁿ', ket: 'contoh: x³ : x = x²' },
      { nama: 'Bentuk dalam kurung', isi: '(ax + b) : k = (a : k)x + (b : k)' },
    ],
    contoh: [
      {
        soal: 'Hitung 8x² : 2x.',
        langkah: [
          { teks: 'Bagi koefisiennya.', hasil: '8 : 2 = 4', alasan: 'Koefisien dibagi koefisien.' },
          { teks: 'Bagi variabelnya.', hasil: 'x² : x = x', alasan: 'x² = x · x, dibagi x tersisa x.' },
          { teks: 'Gabungkan.', hasil: '4x', alasan: 'Koefisien ditulis di depan variabel.' },
        ],
        jawaban: '8x² : 2x = 4x',
        cek: { soal: '8x² : 2x', jawaban: '4x' },
      },
      {
        soal: 'Hitung 12a³b : 4ab.',
        langkah: [
          { teks: 'Bagi koefisiennya.', hasil: '12 : 4 = 3', alasan: 'Koefisien dibagi koefisien.' },
          { teks: 'Bagi variabel a.', hasil: 'a³ : a = a²', alasan: 'Pangkat dikurangi: 3 − 1 = 2.' },
          { teks: 'Bagi variabel b.', hasil: 'b : b = 1', alasan: 'Bilangan (selain nol) dibagi dirinya sendiri = 1.' },
        ],
        jawaban: '12a³b : 4ab = 3a²',
        cek: { soal: '12a³b : 4ab', jawaban: '3a²' },
      },
      {
        soal: 'Hitung (10x² − 15x) : 5x.',
        langkah: [
          { teks: 'Bagi setiap suku dengan 5x.', hasil: '10x² : 5x − 15x : 5x', alasan: 'Semua suku dalam kurung dibagi.' },
          { teks: 'Hitung suku pertama.', hasil: '10x² : 5x = 2x', alasan: '10 : 5 = 2 dan x² : x = x.' },
          { teks: 'Hitung suku kedua.', hasil: '15x : 5x = 3', alasan: '15 : 5 = 3 dan x : x = 1.' },
        ],
        jawaban: '(10x² − 15x) : 5x = 2x − 3',
        cek: { soal: '(10x² − 15x) : 5x', jawaban: '2x − 3' },
      },
    ],
    kesalahan: [
      { salah: '(6x + 9) : 3 = 2x + 9', benar: '= 2x + 3', alasan: 'Konstanta 9 juga harus dibagi 3.' },
      { salah: 'x² : x = 1', benar: 'x² : x = x', alasan: 'x² = x · x, dibagi x masih tersisa satu x.' },
    ],
    kesimpulan: [
      'Bagi koefisien dengan koefisien, variabel dengan variabel.',
      'Variabel sama yang dibagi: pangkatnya dikurangkan.',
      'Bentuk dalam kurung: setiap suku dibagi.',
    ],
  },

  // ------------------------------------------------------------- BAB 7
  {
    id: 'bab7',
    nomor: 7,
    judul: 'Menyederhanakan Bentuk Aljabar',
    deskripsi: 'Mengelompokkan suku sejenis dan operasi campuran.',
    warna: 'mint',
    buddy: 6,
    tujuan: [
      'Mengelompokkan suku sejenis dalam bentuk aljabar yang panjang.',
      'Menyederhanakan bentuk aljabar sampai tidak ada suku sejenis lagi.',
      'Menyelesaikan operasi campuran sederhana dengan urutan yang benar.',
    ],
    bagian: [
      {
        judul: 'Apa artinya "menyederhanakan"?',
        isi: [
          'Menyederhanakan berarti menulis bentuk aljabar sependek mungkin tanpa mengubah nilainya.',
          'Bentuk dianggap paling sederhana jika tidak ada lagi tanda kurung dan tidak ada suku sejenis yang belum digabung.',
        ],
      },
      {
        judul: 'Mengelompokkan suku sejenis',
        isi: [
          'Beri tanda pada suku-suku sejenis, misalnya dengan warna atau garis bawah yang sama.',
          'Pindahkan suku sejenis agar berdekatan. Tanda + atau − harus ikut pindah bersama sukunya.',
          'Contoh: 4x + 3y − 2x + y = (4x − 2x) + (3y + y) = 2x + 4y.',
        ],
      },
      {
        judul: 'Operasi campuran sederhana',
        isi: [
          'Urutan pengerjaan: (1) buka kurung dengan sifat distributif, (2) kumpulkan suku sejenis, (3) jumlahkan atau kurangkan.',
          'Contoh: 3(a + 2b) + 2(a − b) = 3a + 6b + 2a − 2b = 5a + 4b.',
          'Hati-hati dengan minus di depan kurung: −(x − 5) = −x + 5.',
        ],
      },
    ],
    rumus: [
      { nama: 'Urutan pengerjaan', isi: 'kurung → kelompokkan → hitung' },
      { nama: 'Distributif', isi: 'a(b + c) = ab + ac' },
      { nama: 'Minus di depan kurung', isi: '−(b − c) = −b + c' },
    ],
    contoh: [
      {
        soal: 'Sederhanakan 4x + 3y − 2x + y.',
        langkah: [
          { teks: 'Tandai suku sejenis.', hasil: 'suku x: 4x, −2x   |   suku y: 3y, y', alasan: 'Kelompokkan berdasarkan variabel.' },
          { teks: 'Kumpulkan suku sejenis.', hasil: '(4x − 2x) + (3y + y)', alasan: 'Tanda ikut pindah bersama sukunya.' },
          { teks: 'Hitung.', hasil: '2x + 4y', alasan: '4 − 2 = 2 dan 3 + 1 = 4 (y = 1y).' },
        ],
        jawaban: '4x + 3y − 2x + y = 2x + 4y',
        cek: { soal: '4x + 3y − 2x + y', jawaban: '2x + 4y' },
      },
      {
        soal: 'Sederhanakan 3(a + 2b) + 2(a − b).',
        langkah: [
          { teks: 'Buka kurung pertama.', hasil: '3a + 6b', alasan: '3 · a = 3a, 3 · 2b = 6b.' },
          { teks: 'Buka kurung kedua.', hasil: '2a − 2b', alasan: '2 · a = 2a, 2 · (−b) = −2b.' },
          { teks: 'Gabungkan dan kelompokkan.', hasil: '(3a + 2a) + (6b − 2b)', alasan: 'Suku a dengan a, suku b dengan b.' },
          { teks: 'Hitung.', hasil: '5a + 4b', alasan: '3 + 2 = 5 dan 6 − 2 = 4.' },
        ],
        jawaban: '5a + 4b',
        cek: { soal: '3(a + 2b) + 2(a − b)', jawaban: '5a + 4b' },
      },
      {
        soal: 'Sederhanakan 2(3x − 1) − (x − 5).',
        langkah: [
          { teks: 'Buka kurung pertama.', hasil: '6x − 2', alasan: '2 · 3x = 6x dan 2 · (−1) = −2.' },
          { teks: 'Buka kurung kedua (ada minus di depannya).', hasil: '−x + 5', alasan: 'Minus mengubah x menjadi −x dan −5 menjadi +5.' },
          { teks: 'Kumpulkan suku sejenis.', hasil: '(6x − x) + (−2 + 5)', alasan: 'Suku x dengan x, konstanta dengan konstanta.' },
          { teks: 'Hitung.', hasil: '5x + 3', alasan: '6 − 1 = 5 dan −2 + 5 = 3.' },
        ],
        jawaban: '5x + 3',
        cek: { soal: '2(3x − 1) − (x − 5)', jawaban: '5x + 3' },
      },
    ],
    kesalahan: [
      { salah: '2(3x − 1) − (x − 5) = 5x − 7', benar: '= 5x + 3', alasan: 'Tanda −5 di dalam kurung kedua harus menjadi +5.' },
      { salah: 'Memindahkan suku tanpa tandanya', benar: 'Tanda selalu ikut sukunya', alasan: 'Pada 4x + 3y − 2x, suku yang dipindah adalah −2x, bukan 2x.' },
    ],
    kesimpulan: [
      'Bentuk paling sederhana: tanpa kurung dan tanpa suku sejenis yang tersisa.',
      'Urutan: buka kurung, kelompokkan suku sejenis, lalu hitung.',
      'Tanda + atau − selalu ikut dengan sukunya.',
    ],
  },

  // ------------------------------------------------------------- BAB 8
  {
    id: 'bab8',
    nomor: 8,
    judul: 'Penerapan dalam Kehidupan Sehari-hari',
    deskripsi: 'Soal cerita: jual beli, umur, panjang, dan luas.',
    warna: 'lavender',
    buddy: 0,
    tujuan: [
      'Mengubah soal cerita menjadi bentuk aljabar.',
      'Menyelesaikan masalah jual beli, umur, serta panjang dan luas dengan bentuk aljabar.',
      'Menghitung nilai bentuk aljabar dengan substitusi.',
    ],
    bagian: [
      {
        judul: 'Langkah menyelesaikan soal cerita',
        isi: [
          'Langkah 1: Baca soal dengan teliti. Apa yang diketahui dan apa yang ditanya?',
          'Langkah 2: Misalkan hal yang belum diketahui dengan variabel.',
          'Langkah 3: Susun bentuk aljabar dari kalimat soal, lalu sederhanakan.',
          'Langkah 4: Jika nilai variabel diketahui, substitusikan dan tulis jawaban lengkap dengan satuannya.',
        ],
      },
      {
        judul: 'Kegiatan jual beli',
        isi: [
          'Total harga = banyak barang × harga satuan.',
          'Contoh: harga 1 buku b rupiah. Harga 3 buku = 3b. Jika membeli 3 buku dan 2 pulpen (p rupiah), totalnya 3b + 2p.',
          'Kembalian = uang yang dibayar − total harga.',
        ],
      },
      {
        judul: 'Menghitung umur',
        isi: [
          'Jika umur Rio r tahun, maka umur Rio 5 tahun lagi adalah r + 5, dan 3 tahun lalu adalah r − 3.',
          '"Kakak 3 tahun lebih tua" berarti umur Kakak = r + 3. "Ayah 4 kali umur Rio" berarti umur Ayah = 4r.',
        ],
      },
      {
        judul: 'Menghitung panjang dan luas',
        isi: [
          'Keliling persegi panjang K = 2(p + l), luas L = p × l.',
          'Keliling persegi K = 4s, luas L = s × s.',
          'Jika panjang dan lebar berupa bentuk aljabar, gunakan sifat distributif untuk menjabarkan.',
        ],
      },
      {
        judul: 'Penerapan lain di kehidupan nyata',
        isi: [
          'Tabungan: Nana punya Rp20.000 dan menabung t rupiah setiap minggu. Setelah 6 minggu, tabungannya 20.000 + 6t.',
          'Pulsa atau kuota, ongkos kirim per kilogram, dan tiket masuk per orang juga bisa ditulis dengan bentuk aljabar.',
        ],
      },
    ],
    rumus: [
      { nama: 'Total harga', isi: 'banyak barang × harga satuan' },
      { nama: 'Keliling persegi panjang', isi: 'K = 2(p + l)' },
      { nama: 'Luas persegi panjang', isi: 'L = p × l' },
      { nama: 'Keliling persegi', isi: 'K = 4s' },
    ],
    contoh: [
      {
        soal: 'Harga 1 buku b rupiah dan 1 pulpen p rupiah. Ani membeli 3 buku dan 2 pulpen, Budi membeli 2 buku dan 5 pulpen. Tentukan total belanja mereka, lalu hitung jika b = 4.000 dan p = 3.000.',
        langkah: [
          { teks: 'Tulis belanja masing-masing.', hasil: 'Ani: 3b + 2p,  Budi: 2b + 5p', alasan: 'Banyak barang × harga satuan.' },
          { teks: 'Jumlahkan.', hasil: '(3b + 2p) + (2b + 5p) = 5b + 7p', alasan: '3b + 2b = 5b dan 2p + 5p = 7p.' },
          { teks: 'Substitusi.', hasil: '5 · 4.000 + 7 · 3.000 = 20.000 + 21.000 = 41.000', alasan: 'Ganti b = 4.000 dan p = 3.000.' },
        ],
        jawaban: 'Total = 5b + 7p = Rp41.000',
        cek: { ekspr: '(3b + 2p) + (2b + 5p)', nilai: { b: 4000, p: 3000 }, hasil: 41000 },
      },
      {
        soal: 'Umur Rio r tahun. Umur Kakak 3 tahun lebih tua dari Rio, dan umur Ayah 4 kali umur Rio. Tentukan jumlah umur mereka bertiga, lalu hitung jika r = 10.',
        langkah: [
          { teks: 'Tulis umur masing-masing.', hasil: 'Rio: r,  Kakak: r + 3,  Ayah: 4r', alasan: '"Lebih tua 3" = tambah 3; "4 kali" = dikali 4.' },
          { teks: 'Jumlahkan dan sederhanakan.', hasil: 'r + (r + 3) + 4r = 6r + 3', alasan: 'r + r + 4r = 6r; konstanta 3 tetap.' },
          { teks: 'Substitusi r = 10.', hasil: '6 · 10 + 3 = 63', alasan: 'Ganti r dengan 10.' },
        ],
        jawaban: 'Jumlah umur = 6r + 3 = 63 tahun',
        cek: { ekspr: 'r + (r + 3) + 4r', nilai: { r: 10 }, hasil: 63 },
      },
      {
        soal: 'Sebuah persegi panjang memiliki panjang (x + 5) cm dan lebar x cm. Tentukan keliling dan luasnya, lalu hitung jika x = 3.',
        langkah: [
          { teks: 'Keliling.', hasil: 'K = 2((x + 5) + x) = 2(2x + 5) = 4x + 10', alasan: 'K = 2(p + l), lalu distributif.' },
          { teks: 'Luas.', hasil: 'L = x(x + 5) = x² + 5x', alasan: 'L = p × l, lalu distributif.' },
          { teks: 'Substitusi x = 3.', hasil: 'K = 4 · 3 + 10 = 22;   L = 9 + 15 = 24', alasan: 'Ganti x dengan 3.' },
        ],
        jawaban: 'K = (4x + 10) cm = 22 cm;  L = (x² + 5x) cm² = 24 cm²',
        cek: { ekspr: 'x(x + 5)', nilai: { x: 3 }, hasil: 24 },
      },
    ],
    kesalahan: [
      { salah: '"5 kurang dari x" ditulis 5 − x', benar: 'x − 5', alasan: 'Yang dikurangi adalah x, dikurangi 5.' },
      { salah: 'Jawaban tanpa satuan', benar: 'Tulis satuannya (Rp, cm, tahun)', alasan: 'Satuan menunjukkan arti jawaban.' },
    ],
    kesimpulan: [
      'Ubah kalimat menjadi bentuk aljabar dengan memisalkan variabel.',
      'Sederhanakan, lalu substitusi nilai variabel untuk jawaban akhir.',
      'Selalu tulis satuan pada jawaban soal cerita.',
    ],
  },
]

export const cariBab = (id) => materi.find((b) => b.id === id)
