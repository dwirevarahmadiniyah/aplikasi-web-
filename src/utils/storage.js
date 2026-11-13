// Penyimpanan progres di localStorage (aman jika localStorage tidak tersedia).
// Yang disimpan HANYA hasil yang sudah selesai: materi yang ditandai selesai,
// nilai latihan yang sudah dikumpulkan, riwayat kuis, dan daftar soal kuis terakhir.
// Kuis/latihan yang SEDANG dikerjakan tidak disimpan di sini, sehingga ter-reset saat refresh.
export const STORAGE_KEY = 'dms-progress-v2'

export const defaultProgress = () => ({
  materiDone: {}, // { bab1: true }
  latihan: {}, // { bab1: { nilai, benar, salah, kosong, manual, best, date } }
  quizHistory: [], // [{ id, date, nilai, benar, salah, kosong, manual, total, dinilai }] terbaru di depan
  lastQuizIds: [], // id soal pada sesi kuis terakhir (agar sesi berikutnya berbeda)
})

export function loadProgress() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultProgress()
    const data = JSON.parse(raw)
    return { ...defaultProgress(), ...data }
  } catch {
    return defaultProgress()
  }
}

export function saveProgress(progress) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    return true
  } catch {
    return false
  }
}

export function clearProgress() {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* abaikan */
  }
}
