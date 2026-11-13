// Notifikasi sederhana (muncul sebentar di bagian bawah layar)
import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { CircleCheck, Info, TriangleAlert } from 'lucide-react'

const ToastContext = createContext(() => {})

const ICONS = { sukses: CircleCheck, info: Info, peringatan: TriangleAlert }

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const idRef = useRef(0)

  const toast = useCallback((pesan, jenis = 'sukses') => {
    const id = ++idRef.current
    setToasts((t) => [...t.slice(-2), { id, pesan, jenis }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200)
  }, [])

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="toasts" role="status" aria-live="polite">
        {toasts.map(({ id, pesan, jenis }) => {
          const Icon = ICONS[jenis] || Info
          return (
            <div key={id} className={`toast toast--${jenis}`}>
              <Icon size={18} /> <span>{pesan}</span>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
