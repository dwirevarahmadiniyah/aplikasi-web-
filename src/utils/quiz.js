// Logika pengacakan soal (fungsi murni, mudah diuji)

/** Mengacak array tanpa mengubah array aslinya (Fisher-Yates) */
export function shuffle(array, random = Math.random) {
  const a = [...array]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Mengacak urutan pilihan dan menyesuaikan indeks jawaban benar */
export function shuffleOptions(question, random = Math.random) {
  const order = shuffle(question.pilihan.map((_, i) => i), random)
  return {
    ...question,
    pilihan: order.map((i) => question.pilihan[i]),
    jawaban: order.indexOf(question.jawaban),
  }
}

/**
 * Ambil `count` soal acak, utamakan soal yang TIDAK dipakai pada sesi sebelumnya.
 * Jika soal baru tidak cukup, sisanya diambil dari soal lama.
 */
export function pickAvoiding(bank, count, avoidIds = [], random = Math.random) {
  const avoid = new Set(avoidIds)
  const fresh = shuffle(bank.filter((q) => !avoid.has(q.id)), random)
  const old = shuffle(bank.filter((q) => avoid.has(q.id)), random)
  return [...fresh, ...old].slice(0, Math.min(count, bank.length))
}

/**
 * Membuat satu sesi kuis: soal pilihan ganda (pilihan diacak) + soal uraian.
 * Hasil: [{ kind: 'pg' | 'uraian', q }]
 */
export function buildQuiz({ bankPG, bankUraian, jumlahPG, jumlahUraian, avoidIds = [], random = Math.random }) {
  const pg = pickAvoiding(bankPG, jumlahPG, avoidIds, random).map((q) => ({ kind: 'pg', q: shuffleOptions(q, random) }))
  const ur = pickAvoiding(bankUraian, jumlahUraian, avoidIds, random).map((q) => ({ kind: 'uraian', q }))
  return [...pg, ...ur]
}
