import { materi } from '../data/materi.js'

/**
 * Progres belajar total (dihitung dari data nyata, bukan perkiraan):
 *  - setiap bab yang ditandai selesai dipelajari (8)
 *  - setiap latihan bab yang sudah dikumpulkan (8)
 *  - mengerjakan kuis utama minimal sekali (1)
 */
export function hitungProgres(progress) {
  const materiSelesai = materi.filter((b) => progress.materiDone[b.id]).length
  const latihanSelesai = materi.filter((b) => progress.latihan[b.id]).length
  const kuisSelesai = progress.quizHistory.length > 0 ? 1 : 0
  const total = materi.length * 2 + 1
  return {
    materiSelesai,
    latihanSelesai,
    kuisSelesai,
    totalBab: materi.length,
    persen: Math.round(((materiSelesai + latihanSelesai + kuisSelesai) / total) * 100),
  }
}

export function nilaiTertinggi(progress) {
  return progress.quizHistory.reduce((max, h) => Math.max(max, h.nilai), 0)
}
