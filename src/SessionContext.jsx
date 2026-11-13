// =====================================================================
// SESSION STATE: aktivitas belajar yang SEDANG berlangsung.
// Disimpan hanya di memori (React state), TIDAK di localStorage/sessionStorage.
//  - Pindah halaman di dalam aplikasi  -> tetap ada (bisa dilanjutkan)
//  - Refresh / tutup halaman           -> hilang (kuis & latihan di-reset)
// Data siswa (nama & kelas) tidak terpengaruh karena disimpan terpisah di localStorage.
// =====================================================================
import { createContext, useCallback, useContext, useState } from 'react'

const SessionContext = createContext(null)

export function SessionProvider({ children }) {
  const [kuis, setKuis] = useState(null) // { questions, answers, current, phase, results, ringkasan }
  const [latihan, setLatihanMap] = useState({}) // { bab1: { pg: [], uraian: [], submitted, results, ringkasan } }

  const setLatihan = useCallback((babId, updater) => {
    setLatihanMap((m) => {
      const next = typeof updater === 'function' ? updater(m[babId]) : updater
      const copy = { ...m }
      if (next === null) delete copy[babId]
      else copy[babId] = next
      return copy
    })
  }, [])

  return <SessionContext.Provider value={{ kuis, setKuis, latihan, setLatihan }}>{children}</SessionContext.Provider>
}

export function useSession() {
  return useContext(SessionContext)
}
