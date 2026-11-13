// =====================================================================
// LATIHAN SETIAP BAB: 3 pilihan ganda + 3 uraian.
//
// Pilihan ganda : jawaban = indeks pilihan benar (0-3).
// Uraian        : tipe 'ekspresi' (diperiksa otomatis, harus paling sederhana)
//                 tipe 'angka'    (diperiksa otomatis, bandingkan dengan `nilai`)
//                 tipe 'manual'   (perlu diperiksa guru memakai `rubrik`)
// Pembahasan    : { konsep, langkah[], alasan }
// Field `cek`   : dipakai tes otomatis untuk membuktikan kunci benar.
// =====================================================================

export const P = (konsep, langkah, alasan) => ({ konsep, langkah, alasan })

export const pg = (id, soal, pilihan, jawaban, pembahasan, cek) => ({ id, soal, pilihan, jawaban, pembahasan, cek })

export const ekspresi = (id, soal, kunci, pembahasan, cek) => ({ id, soal, tipe: 'ekspresi', kunci, pembahasan, cek, format: kunci })

export const angka = (id, soal, kunci, nilai, pembahasan, cek) => ({ id, soal, tipe: 'angka', kunci, nilai, pembahasan, cek, format: String(nilai) })

export const manual = (id, soal, kunci, pembahasan, rubrik) => ({ id, soal, tipe: 'manual', kunci, pembahasan, rubrik })

export const latihan = {
  bab1: {
    pg: [
      pg('l1-1', 'Manakah yang merupakan bentuk aljabar?', ['12 + 7', '3x − 5', '15 : 3', '8 × 2'], 1,
        P('Bentuk aljabar selalu memuat variabel (huruf).', ['Periksa setiap pilihan: apakah ada huruf?', '12 + 7, 15 : 3, dan 8 × 2 hanya berisi angka.', '3x − 5 memuat variabel x.'], 'Hanya 3x − 5 yang memuat variabel, jadi hanya itu bentuk aljabar.')),
      pg('l1-2', 'Koefisien y pada 3x − y + 4 adalah ...', ['1', '−1', '3', '4'], 1,
        P('Koefisien adalah angka di depan variabel; tandanya ikut.', ['Suku yang memuat y adalah −y.', '−y sama dengan −1y.'], 'Karena −y = −1y, koefisien y adalah −1.')),
      pg('l1-3', 'Bentuk aljabar dari "suatu bilangan n dikalikan 4, lalu ditambah 3" adalah ...', ['4n + 3', '4 + 3n', 'n + 7', '4(n + 3)'], 0,
        P('"Dikalikan 4" → 4n; "ditambah 3" → + 3.', ['n dikalikan 4 ditulis 4n.', 'Hasilnya ditambah 3 menjadi 4n + 3.'], '4(n + 3) berarti n ditambah 3 dulu, baru dikali 4. Urutannya berbeda dari soal.')),
    ],
    uraian: [
      angka('l1-4', 'Tentukan konstanta dari bentuk aljabar 2a + 5b − 11.', '−11', -11,
        P('Konstanta adalah suku tanpa variabel; tandanya ikut.', ['Pisahkan suku: 2a, 5b, −11.', '2a dan 5b memuat variabel.', 'Suku tanpa variabel: −11.'], 'Tanda minus di depan 11 adalah bagian dari konstanta, jadi konstantanya −11.')),
      angka('l1-5', 'Berapa banyak suku pada bentuk 5p − 2q + r − 8?', '4', 4,
        P('Suku dipisahkan oleh tanda + dan −.', ['Pisahkan: 5p, −2q, r, −8.', 'Hitung: ada 4 bagian.'], 'Konstanta −8 juga dihitung sebagai suku, jadi totalnya 4 suku.')),
      manual('l1-6', 'Jelaskan dengan kata-katamu sendiri perbedaan variabel dan konstanta. Berikan contoh masing-masing dari bentuk 3x + 7.',
        'Variabel adalah huruf yang mewakili bilangan yang belum diketahui, contohnya x. Konstanta adalah suku yang hanya berupa bilangan tanpa variabel, contohnya 7.',
        P('Variabel = huruf pengganti bilangan; konstanta = suku berupa bilangan saja.', ['Pada 3x + 7, huruf x adalah variabel.', 'Angka 3 adalah koefisien (bukan konstanta).', 'Suku 7 tidak memuat huruf, jadi konstanta.'], 'Jawaban benar jika menjelaskan keduanya dengan tepat dan memberi contoh x dan 7.'),
        ['Skor 2: menjelaskan variabel sebagai huruf pengganti bilangan yang belum diketahui.', 'Skor 2: menjelaskan konstanta sebagai suku berupa bilangan saja.', 'Skor 1: memberi contoh yang benar (variabel x, konstanta 7).', 'Skor maksimal 5.']),
    ],
  },

  bab2: {
    pg: [
      pg('l2-1', 'Bentuk 2a + 5 termasuk ...', ['Suku satu', 'Suku dua', 'Suku tiga', 'Suku empat'], 1,
        P('Jenis bentuk aljabar ditentukan oleh banyak suku.', ['Pisahkan suku: 2a dan 5.', 'Ada 2 suku.'], 'Bentuk dengan dua suku disebut suku dua (binomial).')),
      pg('l2-2', 'Pasangan suku sejenis adalah ...', ['3x dan 3y', '2a dan 5a', '4p dan 4p²', '6 dan 6m'], 1,
        P('Suku sejenis: variabel dan pangkat sama.', ['3x dan 3y: variabel berbeda.', '4p dan 4p²: pangkat berbeda.', '6 dan 6m: satu tanpa variabel.', '2a dan 5a: variabel a, pangkat 1.'], 'Hanya 2a dan 5a yang variabel dan pangkatnya sama.')),
      pg('l2-3', 'Suku yang sejenis dengan −4xy adalah ...', ['4x', '−4y', '7yx', 'xy²'], 2,
        P('xy = yx, dan pangkat setiap variabel harus sama.', ['−4xy memuat x¹ dan y¹.', '7yx = 7xy memuat x¹ dan y¹.', 'xy² memuat y², pangkatnya berbeda.'], '7yx sejenis dengan −4xy karena urutan huruf tidak berpengaruh.')),
    ],
    uraian: [
      angka('l2-4', 'Berapa banyak suku pada 4x² − 3x + 7 − 2y?', '4', 4,
        P('Suku dipisahkan tanda + dan −.', ['Pisahkan: 4x², −3x, 7, −2y.', 'Hitung: 4 suku.'], 'Ada empat bagian, jadi banyak sukunya 4 (suku banyak).')),
      ekspresi('l2-5', 'Pada bentuk 3m² + 5m − 2n + 7m, tuliskan suku yang sejenis dengan 5m (selain 5m itu sendiri).', '7m',
        P('Suku sejenis dengan 5m: variabel m berpangkat 1.', ['3m² berpangkat 2 → tidak sejenis.', '−2n variabelnya n → tidak sejenis.', '7m variabel m, pangkat 1 → sejenis.'], 'Satu-satunya suku lain yang sejenis dengan 5m adalah 7m.')),
      manual('l2-6', 'Jelaskan mengapa 2x dan 2x² bukan suku sejenis, padahal koefisiennya sama.',
        '2x dan 2x² bukan suku sejenis karena pangkat variabelnya berbeda: x berpangkat 1, sedangkan x² berpangkat 2. Syarat suku sejenis adalah variabel dan pangkatnya sama; koefisien tidak menentukan.',
        P('Syarat suku sejenis: variabel sama DAN pangkat sama.', ['Variabel kedua suku sama-sama x.', 'Pangkat x pada 2x adalah 1; pada 2x² adalah 2.', 'Karena pangkat berbeda, tidak sejenis.'], 'Koefisien yang sama tidak membuat suku menjadi sejenis.'),
        ['Skor 2: menyebutkan bahwa pangkatnya berbeda (1 dan 2).', 'Skor 2: menyebutkan syarat suku sejenis (variabel dan pangkat sama).', 'Skor 1: menyebutkan bahwa koefisien tidak menentukan sejenis atau tidak.', 'Skor maksimal 5.']),
    ],
  },

  bab3: {
    pg: [
      pg('l3-1', 'Hasil dari 4x + 6x adalah ...', ['10x', '10x²', '24x', '2x'], 0,
        P('ax + bx = (a + b)x', ['4x dan 6x sejenis.', '4 + 6 = 10.'], 'Pangkat tidak berubah saat dijumlahkan, jadi hasilnya 10x, bukan 10x².'),
        '4x + 6x'),
      pg('l3-2', 'Bentuk sederhana dari 3a + 5b + 2a adalah ...', ['10ab', '5a + 5b', '10a', '5a + 5b²'], 1,
        P('Hanya suku sejenis yang dijumlahkan.', ['Suku a: 3a + 2a = 5a.', 'Suku b: 5b tetap.'], '5a dan 5b tidak sejenis, jadi ditulis terpisah: 5a + 5b.'),
        '3a + 5b + 2a'),
      pg('l3-3', 'Hasil dari (2x² + 3x) + (x² − 5x) adalah ...', ['3x² − 2x', '3x² + 8x', '2x² − 2x', 'x² − 2x'], 0,
        P('Kelompokkan berdasarkan variabel dan pangkat.', ['2x² + 3x + x² − 5x', '(2x² + x²) + (3x − 5x)', '3x² − 2x'], '2 + 1 = 3 untuk x² dan 3 − 5 = −2 untuk x.'),
        '(2x² + 3x) + (x² − 5x)'),
    ],
    uraian: [
      ekspresi('l3-4', 'Sederhanakan: 7y + 5y', '12y',
        P('ax + bx = (a + b)x', ['7y dan 5y sejenis.', '7 + 5 = 12.', 'Hasil: 12y.'], 'Koefisien dijumlahkan, variabel y tetap.'), '7y + 5y'),
      ekspresi('l3-5', 'Sederhanakan: (3m + 2n) + (m − 5n)', '4m − 3n',
        P('Hilangkan kurung, lalu kelompokkan suku sejenis.', ['3m + 2n + m − 5n', '(3m + m) + (2n − 5n)', '4m − 3n'], '3 + 1 = 4 (m = 1m) dan 2 − 5 = −3.'), '(3m + 2n) + (m − 5n)'),
      ekspresi('l3-6', 'Sederhanakan: (2a² − a + 4) + (3a² + 5a − 6)', '5a² + 4a − 2',
        P('Kelompokkan a², a, dan konstanta.', ['2a² − a + 4 + 3a² + 5a − 6', '(2a² + 3a²) + (−a + 5a) + (4 − 6)', '5a² + 4a − 2'], '2 + 3 = 5; −1 + 5 = 4; 4 − 6 = −2.'), '(2a² − a + 4) + (3a² + 5a − 6)'),
    ],
  },

  bab4: {
    pg: [
      pg('l4-1', 'Hasil dari 9m − 4m adalah ...', ['5m', '13m', '5', '36m'], 0,
        P('ax − bx = (a − b)x', ['9m dan 4m sejenis.', '9 − 4 = 5.'], 'Variabel m tetap ada, jadi hasilnya 5m (bukan 5).'), '9m − 4m'),
      pg('l4-2', 'Hasil dari (7x + 4) − (3x − 2) adalah ...', ['4x + 2', '4x + 6', '10x + 2', '4x − 6'], 1,
        P('−(b − c) = −b + c', ['7x + 4 − 3x + 2', '(7x − 3x) + (4 + 2)', '4x + 6'], 'Tanda −2 dalam kurung berubah menjadi +2 karena ada minus di depan kurung.'), '(7x + 4) − (3x − 2)'),
      pg('l4-3', 'Kurangkan 2a − 3 dari 5a + 1. Hasilnya adalah ...', ['3a + 4', '3a − 2', '−3a − 4', '7a − 2'], 0,
        P('"Kurangkan A dari B" artinya B − A.', ['(5a + 1) − (2a − 3)', '5a + 1 − 2a + 3', '3a + 4'], 'Yang dikurangi adalah 5a + 1, dan pengurangnya 2a − 3.'), '(5a + 1) − (2a − 3)'),
    ],
    uraian: [
      ekspresi('l4-4', 'Sederhanakan: 8p − 3p', '5p',
        P('ax − bx = (a − b)x', ['8p dan 3p sejenis.', '8 − 3 = 5.', 'Hasil: 5p.'], 'Kurangkan koefisien, variabel tetap.'), '8p − 3p'),
      ekspresi('l4-5', 'Sederhanakan: (6x − 2y) − (2x + 3y)', '4x − 5y',
        P('−(b + c) = −b − c', ['6x − 2y − 2x − 3y', '(6x − 2x) + (−2y − 3y)', '4x − 5y'], '6 − 2 = 4 dan −2 − 3 = −5.'), '(6x − 2y) − (2x + 3y)'),
      ekspresi('l4-6', 'Sederhanakan: (4a² + 3a − 1) − (a² − 2a + 5)', '3a² + 5a − 6',
        P('Minus di depan kurung mengubah semua tanda.', ['4a² + 3a − 1 − a² + 2a − 5', '(4a² − a²) + (3a + 2a) + (−1 − 5)', '3a² + 5a − 6'], '4 − 1 = 3; 3 + 2 = 5; −1 − 5 = −6.'), '(4a² + 3a − 1) − (a² − 2a + 5)'),
    ],
  },

  bab5: {
    pg: [
      pg('l5-1', 'Hasil dari 2(x + 3) adalah ...', ['2x + 3', '2x + 6', 'x + 6', '2x + 5'], 1,
        P('a(b + c) = ab + ac', ['2 · x + 2 · 3', '2x + 6'], 'Angka 2 dikalikan ke kedua suku di dalam kurung.'), '2(x + 3)'),
      pg('l5-2', 'Hasil dari 3x · 4x adalah ...', ['7x', '12x', '12x²', '7x²'], 2,
        P('Koefisien dikali koefisien; x · x = x².', ['3 · 4 = 12', 'x · x = x²', '12x²'], 'Perkalian variabel yang sama menambah pangkat.'), '3x · 4x'),
      pg('l5-3', 'Hasil dari −2(3a − 5) adalah ...', ['−6a − 10', '−6a + 10', '6a − 10', '−6a + 5'], 1,
        P('Distributif + aturan tanda.', ['(−2)(3a) = −6a', '(−2)(−5) = +10', '−6a + 10'], 'Negatif × negatif = positif, jadi suku kedua +10.'), '−2(3a − 5)'),
    ],
    uraian: [
      ekspresi('l5-4', 'Jabarkan: 5(2y − 3)', '10y − 15',
        P('a(b − c) = ab − ac', ['5 · 2y − 5 · 3', '10y − 15'], '5 dikalikan ke kedua suku di dalam kurung.'), '5(2y − 3)'),
      ekspresi('l5-5', 'Hitung: 4a · 3b', '12ab',
        P('Koefisien dikali koefisien, variabel dikali variabel.', ['4 · 3 = 12', 'a · b = ab', '12ab'], 'Variabel berbeda ditulis berdampingan.'), '4a · 3b'),
      ekspresi('l5-6', 'Jabarkan: 3x(x − 4)', '3x² − 12x',
        P('a(b − c) = ab − ac; x · x = x².', ['3x · x − 3x · 4', '3x² − 12x'], '3x · x = 3x² dan 3x · 4 = 12x.'), '3x(x − 4)'),
    ],
  },

  bab6: {
    pg: [
      pg('l6-1', 'Hasil dari 12x : 3 adalah ...', ['4x', '9x', '36x', '4'], 0,
        P('ax : k = (a : k)x', ['12 : 3 = 4', 'Variabel x tetap.'], 'Pembaginya hanya angka, jadi x tidak ikut dibagi.'), '12x : 3'),
      pg('l6-2', 'Hasil dari 10x² : 2x adalah ...', ['5x', '5x²', '8x', '20x³'], 0,
        P('xᵐ : xⁿ = xᵐ⁻ⁿ', ['10 : 2 = 5', 'x² : x = x', '5x'], 'Pangkat dikurangi: 2 − 1 = 1.'), '10x² : 2x'),
      pg('l6-3', 'Hasil dari (8y + 12) : 4 adalah ...', ['2y + 12', '2y + 3', '8y + 3', '4y + 8'], 1,
        P('Setiap suku dibagi.', ['8y : 4 = 2y', '12 : 4 = 3', '2y + 3'], 'Konstanta 12 juga harus dibagi 4.'), '(8y + 12) : 4'),
    ],
    uraian: [
      ekspresi('l6-4', 'Hitung: 15a : 5', '3a',
        P('ax : k = (a : k)x', ['15 : 5 = 3', 'Hasil: 3a'], 'Variabel a tetap.'), '15a : 5'),
      ekspresi('l6-5', 'Hitung: 18x³ : 6x', '3x²',
        P('xᵐ : xⁿ = xᵐ⁻ⁿ', ['18 : 6 = 3', 'x³ : x = x²', '3x²'], 'Pangkat dikurangi: 3 − 1 = 2.'), '18x³ : 6x'),
      ekspresi('l6-6', 'Hitung: (14m² + 21m) : 7m', '2m + 3',
        P('Setiap suku dibagi 7m.', ['14m² : 7m = 2m', '21m : 7m = 3', '2m + 3'], '14 : 7 = 2 dengan m² : m = m; 21 : 7 = 3 dengan m : m = 1.'), '(14m² + 21m) : 7m'),
    ],
  },

  bab7: {
    pg: [
      pg('l7-1', 'Bentuk sederhana dari 6x + 2y − 4x + 3y adalah ...', ['10x + 5y', '2x + 5y', '2x + y', '2x − 5y'], 1,
        P('Kelompokkan suku sejenis; tanda ikut sukunya.', ['(6x − 4x) + (2y + 3y)', '2x + 5y'], '6 − 4 = 2 dan 2 + 3 = 5.'), '6x + 2y − 4x + 3y'),
      pg('l7-2', 'Bentuk sederhana dari 3(a + 2b) + 2(a − b) adalah ...', ['5a + 8b', 'a + 4b', '5a + 6b', '5a + 4b'], 3,
        P('Buka kurung, kelompokkan, hitung.', ['3a + 6b + 2a − 2b', '(3a + 2a) + (6b − 2b)', '5a + 4b'], '2 · (−b) = −2b, sehingga 6b − 2b = 4b.'), '3(a + 2b) + 2(a − b)'),
      pg('l7-3', 'Bentuk sederhana dari 2(3x − 1) − (x − 5) adalah ...', ['5x − 7', '5x − 3', '5x + 3', '7x + 3'], 2,
        P('Distributif + minus di depan kurung.', ['6x − 2 − x + 5', '(6x − x) + (−2 + 5)', '5x + 3'], 'Minus di depan (x − 5) membuat −5 menjadi +5.'), '2(3x − 1) − (x − 5)'),
    ],
    uraian: [
      ekspresi('l7-4', 'Sederhanakan: 5a + 3 − 2a + 4', '3a + 7',
        P('Kelompokkan suku a dan konstanta.', ['(5a − 2a) + (3 + 4)', '3a + 7'], '5 − 2 = 3 dan 3 + 4 = 7.'), '5a + 3 − 2a + 4'),
      ekspresi('l7-5', 'Sederhanakan: 4(x + 2) − 3x', 'x + 8',
        P('Buka kurung, lalu kelompokkan.', ['4x + 8 − 3x', '(4x − 3x) + 8', 'x + 8'], '4 − 3 = 1, dan 1x ditulis x.'), '4(x + 2) − 3x'),
      ekspresi('l7-6', 'Sederhanakan: 2(y − 3) + 3(2y + 1)', '8y − 3',
        P('Buka kedua kurung, lalu kelompokkan.', ['2y − 6 + 6y + 3', '(2y + 6y) + (−6 + 3)', '8y − 3'], '2 + 6 = 8 dan −6 + 3 = −3.'), '2(y − 3) + 3(2y + 1)'),
    ],
  },

  bab8: {
    pg: [
      pg('l8-1', 'Persegi panjang memiliki panjang (x + 4) cm dan lebar x cm. Kelilingnya adalah ...', ['2x + 4', '4x + 8', '4x + 4', 'x² + 4x'], 1,
        P('K = 2(p + l)', ['K = 2((x + 4) + x)', 'K = 2(2x + 4)', 'K = 4x + 8'], 'x² + 4x adalah luas, bukan keliling.'), '2((x + 4) + x)'),
      pg('l8-2', 'Tiket dewasa d rupiah dan tiket anak a rupiah. Satu keluarga membeli 2 tiket dewasa dan 3 tiket anak. Jika d = 20.000 dan a = 10.000, total harganya adalah ...', ['Rp50.000', 'Rp60.000', 'Rp70.000', 'Rp80.000'], 2,
        P('Total = banyak × harga satuan, lalu substitusi.', ['Bentuk aljabar: 2d + 3a', '2 · 20.000 + 3 · 10.000', '40.000 + 30.000 = 70.000'], 'Substitusi nilai d dan a ke 2d + 3a menghasilkan Rp70.000.'),
        { ekspr: '2d + 3a', nilai: { d: 20000, a: 10000 } }),
      pg('l8-3', 'Umur Ayah sama dengan 3 kali umur Rio (r tahun) ditambah 4 tahun. Umur Ayah adalah ...', ['3r + 4', '3 + 4r', '4r − 3', '7r'], 0,
        P('"3 kali r" → 3r; "ditambah 4" → + 4.', ['3 kali umur Rio = 3r.', 'Ditambah 4 → 3r + 4.'], 'Urutan kalimat: kalikan dulu, lalu tambah 4.')),
    ],
    uraian: [
      ekspresi('l8-4', 'Dina punya 5 kotak kelereng, setiap kotak berisi k butir. Ia memberikan 3 butir kepada adiknya. Tuliskan bentuk aljabar sisa kelereng Dina.', '5k − 3',
        P('Banyak kotak × isi, lalu dikurangi yang diberikan.', ['5 kotak × k butir = 5k', 'Diberikan 3 butir → dikurangi 3', '5k − 3'], 'Memberikan berarti kelereng berkurang, jadi dikurangi 3.')),
      angka('l8-5', 'Harga 1 kg jeruk x rupiah. Jika x = 15.000, berapa rupiah harga 3 kg jeruk?', 'Rp45.000', 45000,
        P('Total = banyak × harga satuan.', ['Harga 3 kg = 3x', '3 · 15.000 = 45.000'], 'Substitusi x = 15.000 ke 3x.'),
        { ekspr: '3x', nilai: { x: 15000 }, hasil: 45000 }),
      angka('l8-6', 'Sebuah persegi memiliki panjang sisi (x + 2) cm. Jika x = 5, berapa cm kelilingnya?', '28 cm', 28,
        P('K = 4s', ['K = 4(x + 2) = 4x + 8', 'x = 5: 4 · 5 + 8 = 28'], 'Sisi = 7 cm, dan 4 × 7 = 28 cm.'),
        { ekspr: '4(x + 2)', nilai: { x: 5 }, hasil: 28 }),
    ],
  },
}
