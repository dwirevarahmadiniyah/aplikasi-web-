// Penilaian jawaban pilihan ganda dan uraian.
import { tryParse, isSimplified } from './algebra.js'

/**
 * Status jawaban:
 *  benar   -> dihitung benar
 *  salah   -> dihitung salah
 *  setara  -> hasilnya setara tetapi belum paling sederhana (dihitung salah)
 *  format  -> tulisan tidak dikenali mesin (dihitung salah, siswa diminta mengikuti format)
 *  kosong  -> belum dijawab (dihitung salah, dilaporkan terpisah)
 *  manual  -> perlu diperiksa guru dengan pedoman penilaian (TIDAK masuk nilai otomatis)
 */
export const STATUS_LABEL = {
  benar: 'Benar',
  salah: 'Salah',
  setara: 'Belum paling sederhana',
  format: 'Format tidak dikenali',
  kosong: 'Belum dijawab',
  manual: 'Perlu diperiksa guru',
}

export function gradePG(question, selected) {
  if (selected === null || selected === undefined) return { status: 'kosong' }
  return { status: selected === question.jawaban ? 'benar' : 'salah' }
}

export function gradeUraian(question, answer) {
  const text = String(answer ?? '').trim()
  if (question.tipe === 'manual') return { status: text ? 'manual' : 'kosong', manual: true }
  if (!text) return { status: 'kosong' }
  const student = tryParse(text)
  if (!student) {
    return { status: 'format', pesan: `Tulis jawaban seperti contoh: ${question.format || question.kunci}` }
  }
  if (question.tipe === 'angka') {
    if (!student.isConstant()) return { status: 'salah', pesan: 'Jawaban yang diminta berupa bilangan.' }
    return { status: Math.abs(student.constantValue() - question.nilai) < 1e-6 ? 'benar' : 'salah' }
  }
  // tipe 'ekspresi'
  const key = tryParse(question.kunci)
  if (!key) return { status: 'manual', manual: true }
  if (!student.equals(key)) return { status: 'salah' }
  if (!isSimplified(text)) {
    return { status: 'setara', pesan: 'Hasilmu setara dengan kunci, tetapi belum ditulis dalam bentuk paling sederhana.' }
  }
  return { status: 'benar' }
}

/**
 * Ringkasan nilai dari daftar hasil penilaian.
 * Soal "manual" tidak ikut dinilai otomatis.
 */
export function summarize(results) {
  const total = results.length
  const otomatis = results.filter((r) => !r.manual)
  const dinilai = otomatis.length
  const benar = otomatis.filter((r) => r.status === 'benar').length
  const salah = otomatis.filter((r) => r.status !== 'benar' && r.status !== 'kosong').length
  // "kosong" = semua soal yang tidak dijawab (termasuk soal penjelasan yang kosong)
  const kosong = results.filter((r) => r.status === 'kosong').length
  // "manual" = soal penjelasan yang SUDAH dijawab dan menunggu pemeriksaan guru
  const manual = results.filter((r) => r.status === 'manual').length
  const nilai = dinilai === 0 ? 0 : Math.round((benar / dinilai) * 100)
  return { total, dinilai, benar, salah, kosong, manual, nilai }
}

/** Pedoman penilaian bawaan untuk soal uraian yang diperiksa otomatis */
export function pedomanOtomatis(question) {
  if (question.tipe === 'angka') {
    return [`Benar jika hasil akhirnya ${question.kunci}.`, 'Satuan (Rp, cm, tahun) boleh ditulis atau tidak.']
  }
  return [
    `Benar jika hasil akhir setara dengan ${question.kunci} dan sudah ditulis paling sederhana.`,
    'Urutan suku boleh berbeda, misalnya 4y + 2x sama dengan 2x + 4y.',
    'Jika hasilnya setara tetapi masih ada suku sejenis atau tanda kurung, jawaban dianggap belum selesai.',
  ]
}

export function predikat(score) {
  if (score >= 90) return { label: 'Luar Biasa!', pesan: 'Kamu sudah sangat menguasai bentuk aljabar. Pertahankan!' }
  if (score >= 75) return { label: 'Hebat!', pesan: 'Pemahamanmu sudah bagus. Sedikit lagi menuju sempurna!' }
  if (score >= 60) return { label: 'Bagus!', pesan: 'Kamu sudah di jalur yang benar. Pelajari lagi pembahasan soal yang masih salah.' }
  return { label: 'Ayo Semangat!', pesan: 'Jangan menyerah! Baca lagi materinya, lalu coba sekali lagi.' }
}
