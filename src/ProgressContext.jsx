import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { loadProgress, saveProgress, defaultProgress, clearProgress } from './utils/storage.js'

const ProgressContext = createContext(null)

/** Progres yang SUDAH selesai (disimpan di localStorage, tetap ada setelah refresh) */
export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(loadProgress)

  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  const markMateri = useCallback((babId) => {
    setProgress((p) => ({ ...p, materiDone: { ...p.materiDone, [babId]: true } }))
  }, [])

  const saveLatihan = useCallback((babId, ringkasan) => {
    setProgress((p) => {
      const prev = p.latihan[babId]
      const best = Math.max(prev?.best ?? 0, ringkasan.nilai)
      return { ...p, latihan: { ...p.latihan, [babId]: { ...ringkasan, best, date: new Date().toISOString() } } }
    })
  }, [])

  const addQuizResult = useCallback((ringkasan, questionIds) => {
    const entry = { id: Date.now(), date: new Date().toISOString(), ...ringkasan }
    setProgress((p) => ({ ...p, quizHistory: [entry, ...p.quizHistory].slice(0, 30), lastQuizIds: questionIds }))
    return entry
  }, [])

  const resetAll = useCallback(() => {
    clearProgress()
    setProgress(defaultProgress())
  }, [])

  return (
    <ProgressContext.Provider value={{ progress, markMateri, saveLatihan, addQuizResult, resetAll }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  return useContext(ProgressContext)
}
