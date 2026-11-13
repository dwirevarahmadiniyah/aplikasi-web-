import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowLeft, CircleCheck, ChevronRight, Eye } from 'lucide-react'
import { navigate } from '../router.js'
import Chibi from './Chibi.jsx'
import { buddies, motivasi } from '../data/buddies.js'

export function ProgressBar({ value = 0, label, color = 'pink', small = false }) {
  const v = Math.max(0, Math.min(100, Math.round(value)))
  return (
    <div className={`progress ${small ? 'progress--small' : ''}`}>
      {label && (
        <div className="progress__label">
          <span>{label}</span>
          <strong>{v}%</strong>
        </div>
      )}
      <div className="progress__track" role="progressbar" aria-valuenow={v} aria-valuemin="0" aria-valuemax="100" aria-label={label || 'Progres'}>
        <div className={`progress__fill progress__fill--${color}`} style={{ width: `${v}%` }} />
      </div>
    </div>
  )
}

export function PageHeader({ title, subtitle, back, buddy, color = 'pink' }) {
  return (
    <header className={`page-header page-header--${color}`}>
      <div className="page-header__text">
        {back && (
          <button className="back-btn" onClick={() => navigate(back)} aria-label="Kembali">
            <ArrowLeft size={18} /> Kembali
          </button>
        )}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {buddy !== undefined && <Chibi buddy={buddy} size={74} className="page-header__chibi" />}
    </header>
  )
}

export function Bubble({ buddy = 0, children, name = true }) {
  const b = buddies[buddy % buddies.length]
  return (
    <div className="bubble-row">
      <Chibi buddy={buddy} size={62} />
      <div className="bubble">
        {name && <small className="bubble__name">{b.name} berkata:</small>}
        {children}
      </div>
    </div>
  )
}

/** Pesan motivasi acak dari salah satu karakter chibi */
export function Motivasi({ jenis = 'umum' }) {
  const [pick] = useState(() => {
    const list = motivasi[jenis] || motivasi.umum
    return { buddy: Math.floor(Math.random() * buddies.length), pesan: list[Math.floor(Math.random() * list.length)] }
  })
  return <Bubble buddy={pick.buddy}>{pick.pesan}</Bubble>
}

/** Langkah penyelesaian yang ditampilkan satu per satu */
export function StepReveal({ langkah, jawaban }) {
  const [shown, setShown] = useState(0)
  const allShown = shown >= langkah.length
  return (
    <div className="steps">
      <ol className="steps__list">
        {langkah.slice(0, shown).map((l, i) => (
          <li key={i} className="step pop-in">
            <span className="step__num">{i + 1}</span>
            <div>
              <p className="step__text">{l.teks}</p>
              {l.hasil && <p className="math step__result">{l.hasil}</p>}
              {l.alasan && <p className="step__why">💡 {l.alasan}</p>}
            </div>
          </li>
        ))}
      </ol>
      {allShown ? (
        <div className="answer-box pop-in">
          <CircleCheck size={20} />
          <div>
            <small>Jawaban</small>
            <p className="math">{jawaban}</p>
          </div>
        </div>
      ) : (
        <div className="steps__actions">
          <button className="btn btn--primary btn--sm" onClick={() => setShown((s) => s + 1)}>
            {shown === 0 ? 'Mulai Pembahasan' : 'Langkah Berikutnya'} <ChevronRight size={16} />
          </button>
          <button className="btn btn--ghost btn--sm" onClick={() => setShown(langkah.length)}>
            <Eye size={16} /> Tampilkan Semua
          </button>
        </div>
      )}
    </div>
  )
}

export function EmptyState({ buddy = 5, title, text, action }) {
  return (
    <div className="card empty">
      <Chibi buddy={buddy} size={92} />
      <h3>{title}</h3>
      <p>{text}</p>
      {action}
    </div>
  )
}

/** Dialog konfirmasi di dalam halaman (bukan window.confirm) */
export function ConfirmDialog({ open, title, children, confirmLabel = 'Ya', cancelLabel = 'Batal', onConfirm, onCancel, danger = false }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!open) return
    ref.current?.querySelector('button')?.focus()
    const onKey = (e) => e.key === 'Escape' && onCancel?.()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onCancel])
  if (!open) return null
  // Portal ke <body> agar latar gelap menutupi seluruh layar
  // (elemen fixed di dalam .page yang beranimasi transform akan ikut terkurung)
  return createPortal(
    <div className="dialog-backdrop" onClick={onCancel}>
      <div className="dialog card pop-in" role="alertdialog" aria-modal="true" aria-label={title} ref={ref} onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <div className="dialog__body">{children}</div>
        <div className="action-row">
          <button className="btn btn--soft" onClick={onCancel}>{cancelLabel}</button>
          <button className={`btn ${danger ? 'btn--danger' : 'btn--primary'}`} onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>,
    document.body
  )
}
