// =====================================================================
// BANK SOAL KUIS UTAMA (BAB 1 - BAB 8)
// Setiap sesi: 10 pilihan ganda + 5 uraian, diambil acak dari bank ini.
// Soal yang dipakai pada sesi sebelumnya diusahakan tidak muncul lagi.
// =====================================================================
import { P, pg, ekspresi, angka, manual } from './latihan.js'

export const JUMLAH_PG = 10
export const JUMLAH_URAIAN = 5

export const bankPG = [
  // BAB 1
  pg('k1-1', 'Pada bentuk 7p − 2q + 5, konstantanya adalah ...', ['7', '−2', '5', 'p'], 2,
    P('Konstanta = suku tanpa variabel.', ['Suku-sukunya: 7p, −2q, 5.', 'Yang tidak memuat huruf: 5.'], '7 dan −2 adalah koefisien, bukan konstanta.')),
  pg('k1-2', 'Koefisien a pada 9a − 2b + 4 adalah ...', ['9', '−2', '4', 'a'], 0,
    P('Koefisien = angka di depan variabel.', ['Suku yang memuat a: 9a.', 'Angka di depannya: 9.'], 'a adalah variabel; 9 adalah koefisiennya.')),
  pg('k1-3', 'Bentuk aljabar dari "x dikurangi 6, lalu hasilnya dikali 2" adalah ...', ['2x − 6', '2(x − 6)', 'x − 12', '2 − 6x'], 1,
    P('Operasi yang dikerjakan lebih dulu ditulis dalam kurung.', ['x dikurangi 6 → (x − 6).', 'Hasilnya dikali 2 → 2(x − 6).'], '2x − 6 berarti x dikali 2 dulu, urutannya berbeda.')),
  // BAB 2
  pg('k2-1', 'Banyak suku pada 2x² + 5x − 3y + 1 adalah ...', ['2', '3', '4', '5'], 2,
    P('Suku dipisahkan tanda + dan −.', ['Suku: 2x², 5x, −3y, 1.', 'Jumlahnya 4.'], 'Konstanta 1 juga dihitung sebagai suku.')),
  pg('k2-2', 'Suku yang sejenis dengan 5ab adalah ...', ['5a', '3ba', '5b', 'ab²'], 1,
    P('Suku sejenis: variabel dan pangkat sama; ab = ba.', ['5a hanya memuat a.', '5b hanya memuat b.', 'ab² memuat b².', '3ba = 3ab.'], '3ba sejenis dengan 5ab karena ba = ab.')),
  pg('k2-3', 'Bentuk berikut yang merupakan suku tiga (trinomial) adalah ...', ['3x + 2', 'x² − 4x + 1', '5xy', 'a − b + c − 2'], 1,
    P('Trinomial = tepat tiga suku.', ['3x + 2: dua suku.', '5xy: satu suku.', 'a − b + c − 2: empat suku.', 'x² − 4x + 1: tiga suku.'], 'Hanya x² − 4x + 1 yang terdiri dari tiga suku.')),
  // BAB 3
  pg('k3-1', 'Hasil dari 5x + 3x adalah ...', ['8x', '15x', '8x²', '2x'], 0,
    P('ax + bx = (a + b)x', ['5 + 3 = 8', '8x'], 'Pangkat tidak berubah saat dijumlahkan.'), '5x + 3x'),
  pg('k3-2', 'Hasil dari (4a + b) + (2a + 3b) adalah ...', ['6a + 3b', '8ab', '6a + 4b', '6a² + 4b'], 2,
    P('Kelompokkan suku sejenis.', ['4a + b + 2a + 3b', '(4a + 2a) + (b + 3b)', '6a + 4b'], 'b = 1b, jadi 1 + 3 = 4.'), '(4a + b) + (2a + 3b)'),
  pg('k3-3', 'Hasil dari (x² + 2x) + (3x² − 7x) adalah ...', ['4x² − 5x', '4x² + 9x', '3x² − 5x', '4x⁴ − 5x'], 0,
    P('Kelompokkan berdasarkan pangkat.', ['(x² + 3x²) + (2x − 7x)', '4x² − 5x'], 'Menjumlahkan tidak mengubah pangkat, jadi bukan x⁴.'), '(x² + 2x) + (3x² − 7x)'),
  // BAB 4
  pg('k4-1', 'Hasil dari 7a − 4a adalah ...', ['11a', '3', '3a', '28a'], 2,
    P('ax − bx = (a − b)x', ['7 − 4 = 3', '3a'], 'Variabel a tidak hilang.'), '7a − 4a'),
  pg('k4-2', 'Hasil dari (5x − 2) − (2x + 3) adalah ...', ['3x + 1', '3x − 5', '7x + 1', '3x − 1'], 1,
    P('−(b + c) = −b − c', ['5x − 2 − 2x − 3', '(5x − 2x) + (−2 − 3)', '3x − 5'], '+3 di dalam kurung berubah menjadi −3.'), '(5x − 2) − (2x + 3)'),
  pg('k4-3', 'Hasil dari (6m + 1) − (−2m + 4) adalah ...', ['4m − 3', '8m + 5', '8m − 3', '4m + 5'], 2,
    P('Minus di depan kurung mengubah semua tanda.', ['6m + 1 + 2m − 4', '(6m + 2m) + (1 − 4)', '8m − 3'], '−(−2m) = +2m, dan −(+4) = −4.'), '(6m + 1) − (−2m + 4)'),
  // BAB 5
  pg('k5-1', 'Hasil dari 3(x + 2) adalah ...', ['3x + 2', '3x + 6', 'x + 6', '3x + 5'], 1,
    P('a(b + c) = ab + ac', ['3 · x + 3 · 2', '3x + 6'], 'Angka 3 dikalikan ke kedua suku.'), '3(x + 2)'),
  pg('k5-2', 'Hasil dari 4y · 3y adalah ...', ['7y', '12y', '12y²', '7y²'], 2,
    P('Koefisien dikali koefisien; y · y = y².', ['4 · 3 = 12', 'y · y = y²', '12y²'], 'Perkalian, bukan penjumlahan, jadi 4 · 3 = 12.'), '4y · 3y'),
  pg('k5-3', 'Hasil dari 2x(x + 5) adalah ...', ['2x² + 5', '2x² + 10x', 'x² + 10x', '3x² + 5x'], 1,
    P('a(b + c) = ab + ac', ['2x · x + 2x · 5', '2x² + 10x'], '2x juga dikalikan ke angka 5.'), '2x(x + 5)'),
  // BAB 6
  pg('k6-1', 'Hasil dari 15x² : 3x adalah ...', ['5x', '5x²', '12x', '45x³'], 0,
    P('xᵐ : xⁿ = xᵐ⁻ⁿ', ['15 : 3 = 5', 'x² : x = x', '5x'], 'Pangkat dikurangi: 2 − 1 = 1.'), '15x² : 3x'),
  pg('k6-2', 'Hasil dari (10m + 15) : 5 adalah ...', ['2m + 15', '2m + 3', '10m + 3', '5m + 10'], 1,
    P('Setiap suku dibagi.', ['10m : 5 = 2m', '15 : 5 = 3', '2m + 3'], 'Kedua suku harus dibagi 5.'), '(10m + 15) : 5'),
  pg('k6-3', 'Hasil dari 20a²b : 5a adalah ...', ['4a²b', '15ab', '4a', '4ab'], 3,
    P('Bagi koefisien, lalu bagi variabel.', ['20 : 5 = 4', 'a² : a = a', 'b tetap', '4ab'], 'Pembagi tidak memuat b, jadi b tetap ada.'), '20a²b : 5a'),
  // BAB 7
  pg('k7-1', 'Bentuk sederhana dari 2a + 3(a − 1) adalah ...', ['5a − 3', '5a − 1', '2a − 3', '5a + 3'], 0,
    P('Buka kurung, lalu kelompokkan.', ['2a + 3a − 3', '5a − 3'], '3 juga dikalikan ke −1 sehingga menjadi −3.'), '2a + 3(a − 1)'),
  pg('k7-2', 'Bentuk sederhana dari 7x − 2(x + 4) adalah ...', ['5x + 8', '9x − 8', '5x − 8', '5x − 4'], 2,
    P('−2 dikalikan ke setiap suku dalam kurung.', ['7x − 2x − 8', '5x − 8'], '(−2)(+4) = −8.'), '7x − 2(x + 4)'),
  pg('k7-3', 'Bentuk sederhana dari 3(a + 2b) − (a − b) adalah ...', ['2a + 5b', '2a + 7b', '4a + 7b', '2a + 6b'], 1,
    P('Distributif + minus di depan kurung.', ['3a + 6b − a + b', '(3a − a) + (6b + b)', '2a + 7b'], '−(−b) = +b, jadi 6b + b = 7b.'), '3(a + 2b) − (a − b)'),
  // BAB 8
  pg('k8-1', 'Nilai 3x + 4 jika x = 5 adalah ...', ['15', '19', '12', '23'], 1,
    P('Substitusi: ganti x dengan nilainya.', ['3 · 5 + 4', '15 + 4 = 19'], 'Kerjakan perkalian dulu, lalu penjumlahan.'), { ekspr: '3x + 4', nilai: { x: 5 } }),
  pg('k8-2', 'Harga 1 donat d rupiah. Kiki membeli 7 donat dan membayar parkir Rp2.000. Total uang yang dikeluarkan adalah ...', ['7d + 2.000', '7 + 2.000d', '9d', '7d − 2.000'], 0,
    P('Total = banyak × harga + biaya tambahan.', ['7 donat = 7d', 'Tambah parkir → 7d + 2.000'], 'Parkir adalah biaya tambahan, jadi dijumlahkan.')),
  pg('k8-3', 'Sebuah persegi memiliki sisi (x + 2) cm. Kelilingnya adalah ...', ['x + 8', '4x + 2', '4x + 8', '2x + 4'], 2,
    P('K = 4s', ['K = 4(x + 2)', 'K = 4x + 8'], 'Angka 4 dikalikan ke x dan ke 2.'), '4(x + 2)'),
]

export const bankUraian = [
  angka('u1', 'Tentukan koefisien q pada bentuk 8p − 5q + 2.', '−5', -5,
    P('Koefisien = angka di depan variabel; tandanya ikut.', ['Suku yang memuat q: −5q.', 'Angka di depan q: −5.'], 'Tanda minus di depan 5q ikut menjadi koefisien.')),
  angka('u2', 'Berapa banyak suku pada bentuk 6a² − a + 3b − 9 + c?', '5', 5,
    P('Suku dipisahkan tanda + dan −.', ['Suku: 6a², −a, 3b, −9, c.', 'Jumlahnya 5.'], 'Setiap bagian yang dipisahkan tanda dihitung satu suku.')),
  ekspresi('u3', 'Sederhanakan: (5x + 2y) + (3x − 6y)', '8x − 4y',
    P('Kelompokkan suku sejenis.', ['5x + 2y + 3x − 6y', '(5x + 3x) + (2y − 6y)', '8x − 4y'], '5 + 3 = 8 dan 2 − 6 = −4.'), '(5x + 2y) + (3x − 6y)'),
  ekspresi('u4', 'Sederhanakan: 4m² + 3m − m² + 2m', '3m² + 5m',
    P('Kelompokkan berdasarkan pangkat.', ['(4m² − m²) + (3m + 2m)', '3m² + 5m'], '4 − 1 = 3 untuk m², 3 + 2 = 5 untuk m.'), '4m² + 3m − m² + 2m'),
  ekspresi('u5', 'Sederhanakan: (9a − 4) − (5a − 7)', '4a + 3',
    P('−(b − c) = −b + c', ['9a − 4 − 5a + 7', '(9a − 5a) + (−4 + 7)', '4a + 3'], '−(−7) = +7, sehingga −4 + 7 = 3.'), '(9a − 4) − (5a − 7)'),
  ekspresi('u6', 'Jabarkan: −2(4x − 5)', '−8x + 10',
    P('Distributif + aturan tanda.', ['(−2)(4x) + (−2)(−5)', '−8x + 10'], 'Negatif × negatif = positif.'), '−2(4x − 5)'),
  ekspresi('u7', 'Jabarkan: (x + 1)(x + 4)', 'x² + 5x + 4',
    P('(a + b)(c + d) = ac + ad + bc + bd', ['x · x + x · 4 + 1 · x + 1 · 4', 'x² + 4x + x + 4', 'x² + 5x + 4'], 'Gabungkan suku sejenis 4x + x = 5x.'), '(x + 1)(x + 4)'),
  ekspresi('u8', 'Hitung: (12x² − 8x) : 4x', '3x − 2',
    P('Setiap suku dibagi 4x.', ['12x² : 4x = 3x', '8x : 4x = 2', '3x − 2'], '12 : 4 = 3 dengan x² : x = x; 8 : 4 = 2 dengan x : x = 1.'), '(12x² − 8x) : 4x'),
  ekspresi('u9', 'Sederhanakan: 3(2y + 1) − 2(y − 4)', '4y + 11',
    P('Buka kurung, lalu kelompokkan.', ['6y + 3 − 2y + 8', '(6y − 2y) + (3 + 8)', '4y + 11'], '(−2)(−4) = +8.'), '3(2y + 1) − 2(y − 4)'),
  angka('u10', 'Tentukan nilai 2x² − 3x + 1 jika x = 3.', '10', 10,
    P('Substitusi, lalu hitung pangkat → kali → tambah/kurang.', ['2(3)² − 3(3) + 1', '2 · 9 − 9 + 1', '18 − 9 + 1 = 10'], 'Pangkat dihitung lebih dulu: 3² = 9.'),
    { ekspr: '2x² − 3x + 1', nilai: { x: 3 }, hasil: 10 }),
  angka('u11', 'Harga 1 buku b rupiah dan 1 pulpen p rupiah. Ani membeli 3 buku dan 2 pulpen. Jika b = 4.000 dan p = 2.500, berapa rupiah Ani harus membayar?', 'Rp17.000', 17000,
    P('Total = 3b + 2p, lalu substitusi.', ['3 · 4.000 + 2 · 2.500', '12.000 + 5.000 = 17.000'], 'Bentuk aljabar 3b + 2p diganti nilainya.'),
    { ekspr: '3b + 2p', nilai: { b: 4000, p: 2500 }, hasil: 17000 }),
  manual('u12', 'Buatlah sebuah soal cerita sederhana yang dapat ditulis sebagai bentuk aljabar 3x + 5. Jelaskan apa arti x dalam soal ceritamu.',
    'Contoh: "Harga 1 pensil x rupiah. Budi membeli 3 pensil dan membayar ongkos plastik Rp5. Total uang yang dikeluarkan Budi adalah 3x + 5." Di sini x adalah harga 1 pensil.',
    P('3x berarti 3 kali suatu nilai; + 5 berarti tambahan tetap sebesar 5.', ['Tentukan arti x (misalnya harga satuan, umur, atau panjang).', 'Buat cerita dengan "3 buah / 3 kali" untuk 3x.', 'Tambahkan nilai tetap 5 untuk + 5.'], 'Soal cerita benar jika kalimatnya menghasilkan tepat 3x + 5 dan arti x dijelaskan.'),
    ['Skor 2: cerita memuat "3 kali" sesuatu yang diwakili x (menghasilkan 3x).', 'Skor 1: cerita memuat tambahan tetap 5 (menghasilkan + 5).', 'Skor 2: arti x dijelaskan dengan jelas.', 'Skor maksimal 5.']),
]
