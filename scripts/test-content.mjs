// Pengujian otomatis DREAMIES MATH SQUAD. Jalankan: npm test
// Memeriksa kelengkapan konten, KEBENARAN MATEMATIS kunci jawaban,
// penilaian otomatis, pengacakan kuis, dan penyimpanan progres.
import assert from 'node:assert/strict'
import { materi } from '../src/data/materi.js'
import { contohSoal } from '../src/data/contohSoal.js'
import { latihan } from '../src/data/latihan.js'
import { bankPG, bankUraian, JUMLAH_PG, JUMLAH_URAIAN } from '../src/data/kuis.js'
import { buddies } from '../src/data/buddies.js'
import { parse, tryParse, equivalent, isSimplified } from '../src/utils/algebra.js'
import { gradePG, gradeUraian, summarize } from '../src/utils/grading.js'
import { shuffle, shuffleOptions, buildQuiz } from '../src/utils/quiz.js'

let passed = 0
let failed = 0
const test = (name, fn) => {
  try {
    fn()
    passed++
    console.log('  ✔', name)
  } catch (e) {
    failed++
    console.error('  ✘', name, '\n     ', e.message)
  }
}

/* -------------------------------------------------- pemeriksa kunci */
function cekEkspresiLawanJawaban(label, cek, jawaban) {
  if (typeof cek === 'string') {
    assert.ok(equivalent(cek, jawaban), `${label}: "${cek}" tidak setara dengan kunci "${jawaban}"`)
  } else {
    const v = parse(cek.ekspr).evaluate(cek.nilai)
    if ('hasil' in cek) assert.equal(v, cek.hasil, `${label}: ${cek.ekspr} = ${v}, bukan ${cek.hasil}`)
    const k = tryParse(jawaban)
    if (k) assert.ok(Math.abs(k.constantValue() - v) < 1e-6 && k.isConstant(), `${label}: kunci ${jawaban} ≠ ${v}`)
  }
}

function cekPG(label, q) {
  assert.ok(q.id, `${label}: tanpa id`)
  assert.equal(q.pilihan.length, 4, `${label}: harus 4 pilihan`)
  assert.equal(new Set(q.pilihan).size, 4, `${label}: pilihan kembar`)
  assert.ok(Number.isInteger(q.jawaban) && q.jawaban >= 0 && q.jawaban < 4, `${label}: indeks jawaban salah`)
  cekPembahasan(label, q.pembahasan)
  if (!q.cek) return
  const target = typeof q.cek === 'string' ? parse(q.cek) : parse(String(parse(q.cek.ekspr).evaluate(q.cek.nilai)))
  q.pilihan.forEach((opt, i) => {
    const p = tryParse(opt)
    const same = !!p && p.equals(target)
    if (i === q.jawaban) assert.ok(same, `${label}: kunci "${opt}" TIDAK sesuai dengan soal`)
    else assert.ok(!same, `${label}: pengecoh "${opt}" ternyata juga benar`)
  })
}

function cekPembahasan(label, p) {
  assert.ok(p && p.konsep && p.langkah?.length && p.alasan, `${label}: pembahasan belum lengkap (konsep/langkah/alasan)`)
}

function cekUraian(label, q) {
  assert.ok(q.id, `${label}: tanpa id`)
  assert.ok(['ekspresi', 'angka', 'manual'].includes(q.tipe), `${label}: tipe tidak dikenal`)
  assert.ok(q.kunci, `${label}: tanpa kunci`)
  cekPembahasan(label, q.pembahasan)
  if (q.tipe === 'manual') {
    assert.ok(q.rubrik?.length, `${label}: soal manual wajib punya pedoman penilaian`)
    return
  }
  if (q.tipe === 'ekspresi') {
    assert.ok(tryParse(q.kunci), `${label}: kunci tidak bisa dibaca mesin`)
    assert.ok(isSimplified(q.kunci), `${label}: kunci "${q.kunci}" belum paling sederhana`)
  }
  if (q.tipe === 'angka') assert.ok(Number.isFinite(q.nilai), `${label}: nilai angka belum diisi`)
  assert.equal(gradeUraian(q, q.kunci).status, 'benar', `${label}: kunci sendiri tidak dinilai benar`)
  if (q.cek) cekEkspresiLawanJawaban(label, q.cek, q.tipe === 'angka' ? String(q.nilai) : q.kunci)
}

/* -------------------------------------------------- MATERI */
console.log('\n📚 Materi (8 bab)')
test('ada 8 bab dengan id unik', () => {
  assert.equal(materi.length, 8)
  assert.equal(new Set(materi.map((b) => b.id)).size, 8)
})
test('setiap bab lengkap: tujuan, penjelasan, rumus, contoh+langkah, kesimpulan', () => {
  for (const b of materi) {
    assert.ok(b.tujuan?.length >= 2, `${b.id} tujuan`)
    assert.ok(b.bagian?.length >= 2 && b.bagian.every((x) => x.isi.length), `${b.id} penjelasan`)
    assert.ok(b.rumus?.length, `${b.id} rumus`)
    assert.ok(b.contoh?.length >= 2 && b.contoh.every((c) => c.langkah.length && c.jawaban), `${b.id} contoh`)
    assert.ok(b.kesimpulan?.length, `${b.id} kesimpulan`)
  }
})
test('BAB 3 memuat kesalahan yang sering terjadi', () => assert.ok(materi[2].kesalahan?.length))
test('kunci contoh di materi benar secara matematis', () => {
  for (const b of materi) b.contoh.forEach((c, i) => c.cek && cekEkspresiLawanJawaban(`${b.id} contoh ${i + 1}`, c.cek.soal ?? c.cek, c.cek.jawaban ?? c.cek.hasil + ''))
})

/* -------------------------------------------------- CONTOH SOAL */
console.log('\n💡 Contoh soal')
test('setiap bab punya ≥ 3 contoh dengan tingkat berbeda', () => {
  for (const b of materi) {
    const list = contohSoal[b.id]
    assert.ok(list?.length >= 3, b.id)
    assert.ok(new Set(list.map((c) => c.tingkat)).size >= 3, `${b.id} tingkat kesulitan`)
    list.forEach((c) => assert.ok(c.soal && c.jawaban && c.konsep && c.langkah.length, `${b.id} contoh belum lengkap`))
  }
})
test('kunci contoh soal benar secara matematis', () => {
  for (const b of materi)
    contohSoal[b.id].forEach((c, i) => {
      if (!c.cek) return
      if (c.cek.soal) cekEkspresiLawanJawaban(`${b.id} contoh ${i + 1}`, c.cek.soal, c.cek.jawaban)
      else cekEkspresiLawanJawaban(`${b.id} contoh ${i + 1}`, c.cek, String(c.cek.hasil))
    })
})

/* -------------------------------------------------- LATIHAN */
console.log('\n✏️  Latihan')
test('setiap bab: tepat 3 pilihan ganda + 3 uraian', () => {
  for (const b of materi) {
    assert.equal(latihan[b.id]?.pg.length, 3, `${b.id} pg`)
    assert.equal(latihan[b.id]?.uraian.length, 3, `${b.id} uraian`)
  }
})
test('pilihan ganda latihan valid & kunci terbukti benar', () => {
  for (const b of materi) latihan[b.id].pg.forEach((q) => cekPG(q.id, q))
})
test('uraian latihan valid & kunci terbukti benar', () => {
  for (const b of materi) latihan[b.id].uraian.forEach((q) => cekUraian(q.id, q))
})

/* -------------------------------------------------- KUIS */
console.log('\n🎮 Kuis')
test('bank soal lebih besar dari jumlah soal per sesi', () => {
  assert.ok(bankPG.length >= JUMLAH_PG * 2, 'bank PG')
  assert.ok(bankUraian.length >= JUMLAH_URAIAN * 2, 'bank uraian')
})
test('bank kuis mencakup BAB 1 sampai BAB 8', () => {
  const bab = new Set(bankPG.map((q) => q.id.slice(1, 2)))
  for (let i = 1; i <= 8; i++) assert.ok(bab.has(String(i)), `bab ${i}`)
})
test('pilihan ganda kuis valid & kunci terbukti benar', () => bankPG.forEach((q) => cekPG(q.id, q)))
test('uraian kuis valid & kunci terbukti benar', () => bankUraian.forEach((q) => cekUraian(q.id, q)))
test('semua id soal unik', () => {
  const ids = [...bankPG, ...bankUraian, ...Object.values(latihan).flatMap((l) => [...l.pg, ...l.uraian])].map((q) => q.id)
  assert.equal(new Set(ids).size, ids.length)
})
test('shuffle tidak menghilangkan elemen', () => assert.deepEqual([...shuffle([1, 2, 3, 4, 5])].sort(), [1, 2, 3, 4, 5]))
test('pengacakan pilihan tetap menunjuk jawaban yang sama', () => {
  for (let k = 0; k < 300; k++) {
    const q = bankPG[k % bankPG.length]
    const s = shuffleOptions(q)
    assert.equal(s.pilihan[s.jawaban], q.pilihan[q.jawaban])
  }
})
test('satu sesi: 10 PG + 5 uraian, tanpa soal kembar', () => {
  for (let k = 0; k < 50; k++) {
    const quiz = buildQuiz({ bankPG, bankUraian, jumlahPG: JUMLAH_PG, jumlahUraian: JUMLAH_URAIAN })
    assert.equal(quiz.filter((x) => x.kind === 'pg').length, 10)
    assert.equal(quiz.filter((x) => x.kind === 'uraian').length, 5)
    assert.equal(new Set(quiz.map((x) => x.q.id)).size, 15)
  }
})
test('sesi berikutnya tidak mengulang kumpulan soal yang sama', () => {
  for (let k = 0; k < 50; k++) {
    const a = buildQuiz({ bankPG, bankUraian, jumlahPG: JUMLAH_PG, jumlahUraian: JUMLAH_URAIAN })
    const b = buildQuiz({ bankPG, bankUraian, jumlahPG: JUMLAH_PG, jumlahUraian: JUMLAH_URAIAN, avoidIds: a.map((x) => x.q.id) })
    const overlap = b.filter((x) => a.some((y) => y.q.id === x.q.id))
    assert.equal(overlap.length, 0)
  }
})

/* -------------------------------------------------- PENILAIAN */
console.log('\n🧮 Penilaian otomatis')
const qEks = { tipe: 'ekspresi', kunci: '2x + 6' }
test('jawaban setara & sederhana → benar (urutan bebas)', () => {
  assert.equal(gradeUraian(qEks, '6 + 2x').status, 'benar')
  assert.equal(gradeUraian(qEks, '2x+6').status, 'benar')
})
test('jawaban setara tapi belum sederhana → tidak dihitung benar', () => assert.equal(gradeUraian(qEks, '2(x + 3)').status, 'setara'))
test('jawaban salah → salah', () => assert.equal(gradeUraian(qEks, '2x + 3').status, 'salah'))
test('tulisan tidak dikenali → format', () => assert.equal(gradeUraian(qEks, 'dua x tambah enam?').status, 'format'))
test('kosong → kosong', () => assert.equal(gradeUraian(qEks, '  ').status, 'kosong'))
test('angka dengan Rp dan titik ribuan dikenali', () => {
  const q = { tipe: 'angka', kunci: 'Rp45.000', nilai: 45000 }
  assert.equal(gradeUraian(q, 'Rp45.000').status, 'benar')
  assert.equal(gradeUraian(q, '45000').status, 'benar')
  assert.equal(gradeUraian(q, '4500').status, 'salah')
})
test('soal manual TIDAK dinilai otomatis', () => {
  const q = { tipe: 'manual', kunci: '...' }
  const r = gradeUraian(q, 'penjelasan saya')
  assert.equal(r.status, 'manual')
  const s = summarize([{ status: 'benar' }, { status: 'salah' }, r])
  assert.deepEqual(s, { total: 3, dinilai: 2, benar: 1, salah: 1, kosong: 0, manual: 1, nilai: 50 })
})
test('soal penjelasan yang kosong dihitung "kosong", tetap tidak masuk nilai', () => {
  const s = summarize([{ status: 'benar' }, gradeUraian({ tipe: 'manual', kunci: '...' }, '')])
  assert.deepEqual(s, { total: 2, dinilai: 1, benar: 1, salah: 0, kosong: 1, manual: 0, nilai: 100 })
})
test('rekap nilai: benar, salah, kosong', () => {
  const s = summarize([gradePG({ jawaban: 1 }, 1), gradePG({ jawaban: 1 }, 2), gradePG({ jawaban: 1 }, null), { status: 'benar' }])
  assert.deepEqual(s, { total: 4, dinilai: 4, benar: 2, salah: 1, kosong: 1, manual: 0, nilai: 50 })
})

/* -------------------------------------------------- PENYIMPANAN */
console.log('\n💾 localStorage')
{
  const store = {}
  globalThis.window = {
    localStorage: {
      getItem: (k) => (k in store ? store[k] : null),
      setItem: (k, v) => (store[k] = String(v)),
      removeItem: (k) => delete store[k],
    },
  }
  const { loadProgress, saveProgress, clearProgress, STORAGE_KEY } = await import('../src/utils/storage.js')
  const { hitungProgres, nilaiTertinggi } = await import('../src/utils/progress.js')
  test('progres awal kosong (0%)', () => assert.equal(hitungProgres(loadProgress()).persen, 0))
  test('data tersimpan dan terbaca kembali', () => {
    const p = loadProgress()
    p.materiDone.bab1 = true
    p.latihan.bab1 = { nilai: 80 }
    p.quizHistory.unshift({ nilai: 80 }, { nilai: 60 })
    saveProgress(p)
    const back = loadProgress()
    assert.equal(back.materiDone.bab1, true)
    assert.equal(nilaiTertinggi(back), 80)
    assert.equal(hitungProgres(back).persen, Math.round((3 / 17) * 100))
  })
  test('reset menghapus progres', () => {
    clearProgress()
    assert.equal(loadProgress().quizHistory.length, 0)
  })
  test('data rusak tidak membuat aplikasi error', () => {
    store[STORAGE_KEY] = '{rusak'
    assert.deepEqual(loadProgress().quizHistory, [])
  })
}

console.log('\n🧸 Karakter')
test('ada 7 karakter chibi', () => assert.equal(buddies.length, 7))

console.log(`\n${failed ? `❌ ${failed} tes gagal` : '✅ Semua tes lulus'} (${passed} lulus)\n`)
if (failed) process.exitCode = 1
