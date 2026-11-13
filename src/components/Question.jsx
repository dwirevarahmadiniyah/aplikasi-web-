// Komponen soal: pilihan ganda, uraian, dan pembahasan lengkap.
import { CircleCheck, CircleX, CircleMinus, ClipboardCheck, Lightbulb, ListOrdered, KeyRound } from 'lucide-react'
import { STATUS_LABEL, pedomanOtomatis } from '../utils/grading.js'

const LETTERS = ['A', 'B', 'C', 'D']

export function StatusBadge({ status }) {
  const Icon = status === 'benar' ? CircleCheck : status === 'manual' ? ClipboardCheck : status === 'kosong' ? CircleMinus : CircleX
  return (
    <span className={`status status--${status}`}>
      <Icon size={15} /> {STATUS_LABEL[status]}
    </span>
  )
}

/**
 * mode:
 *  'latihan' -> setelah memilih langsung muncul feedback benar/salah (kunci belum ditampilkan), pilihan terkunci
 *  'kuis'    -> tanpa feedback, jawaban boleh diganti sampai kuis dikumpulkan
 *  'review'  -> setelah dikumpulkan: tampilkan pilihan siswa dan kunci
 */
export function PilihanGanda({ q, nomor, total, selected, onSelect, mode = 'kuis' }) {
  const answered = selected !== null && selected !== undefined
  const locked = mode === 'review' || (mode === 'latihan' && answered)
  return (
    <div className="card question">
      <div className="question__head">
        <span className="chip">Soal {nomor}{total ? ` / ${total}` : ''}</span>
        <span className="chip chip--blue">Pilihan ganda</span>
      </div>
      <p className="question__text">{q.soal}</p>
      <div className="options" role="radiogroup" aria-label={`Pilihan jawaban soal ${nomor}`}>
        {q.pilihan.map((p, i) => {
          let cls = ''
          if (mode === 'review') {
            if (i === q.jawaban) cls = 'option--correct'
            else if (i === selected) cls = 'option--wrong'
            else cls = 'option--dim'
          } else if (mode === 'latihan' && answered && i === selected) {
            cls = selected === q.jawaban ? 'option--correct' : 'option--wrong'
          } else if (i === selected) cls = 'option--selected'
          return (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={i === selected}
              className={`option ${cls}`}
              disabled={locked}
              onClick={() => onSelect?.(i)}
            >
              <span className="option__letter">{LETTERS[i]}</span>
              <span className="math option__text">{p}</span>
            </button>
          )
        })}
      </div>
      {mode === 'latihan' && answered && (
        <div className={`feedback pop-in ${selected === q.jawaban ? 'feedback--correct' : 'feedback--wrong'}`}>
          <strong>{selected === q.jawaban ? '🎉 Benar! Kamu hebat!' : '😅 Belum tepat. Kunci dan pembahasan muncul setelah latihan dikumpulkan.'}</strong>
        </div>
      )}
    </div>
  )
}

export function Uraian({ q, nomor, total, value, onChange, disabled }) {
  const id = `jawaban-${q.id}`
  return (
    <div className="card question">
      <div className="question__head">
        <span className="chip">Soal {nomor}{total ? ` / ${total}` : ''}</span>
        <span className="chip chip--lavender">Uraian</span>
        {q.tipe === 'manual' && <span className="chip chip--peach">Diperiksa guru</span>}
      </div>
      <label className="question__text" htmlFor={id}>
        {q.soal}
      </label>
      {q.tipe === 'manual' ? (
        <textarea id={id} className="answer-input answer-input--long" rows={4} value={value ?? ''} disabled={disabled}
          placeholder="Tulis penjelasanmu di sini..." onChange={(e) => onChange?.(e.target.value)} />
      ) : (
        <>
          <input id={id} className="answer-input math" type="text" inputMode="text" autoComplete="off" autoCapitalize="off" spellCheck="false"
            value={value ?? ''} disabled={disabled} placeholder={q.tipe === 'angka' ? 'Contoh: 12 atau −5' : 'Contoh: 3x + 2y'}
            onChange={(e) => onChange?.(e.target.value)} />
          <small className="hint">
            {q.tipe === 'angka'
              ? 'Tulis hasil akhirnya berupa bilangan. Boleh pakai Rp atau satuan.'
              : 'Tulis bentuk paling sederhana. Pangkat boleh ditulis x^2 atau x².'}
          </small>
        </>
      )}
    </div>
  )
}

function BlokPembahasan({ p }) {
  return (
    <>
      <div className="explain__row">
        <Lightbulb size={16} />
        <div>
          <small>Konsep / rumus</small>
          <p className="math-soft">{p.konsep}</p>
        </div>
      </div>
      <div className="explain__row">
        <ListOrdered size={16} />
        <div>
          <small>Langkah penyelesaian</small>
          <ol className="explain__steps">
            {p.langkah.map((l, i) => (
              <li key={i} className="math-soft">{l}</li>
            ))}
          </ol>
        </div>
      </div>
      <div className="explain__row">
        <CircleCheck size={16} />
        <div>
          <small>Mengapa jawaban ini benar?</small>
          <p>{p.alasan}</p>
        </div>
      </div>
    </>
  )
}

/** Pembahasan lengkap untuk satu soal (ditampilkan SETELAH dikumpulkan) */
export function Pembahasan({ kind, q, jawaban, hasil }) {
  const isPG = kind === 'pg'
  const jawabanSiswa = isPG ? (jawaban === null || jawaban === undefined ? '— (tidak dijawab)' : `${LETTERS[jawaban]}. ${q.pilihan[jawaban]}`) : String(jawaban ?? '').trim() || '— (tidak dijawab)'
  const kunci = isPG ? `${LETTERS[q.jawaban]}. ${q.pilihan[q.jawaban]}` : q.kunci
  const pedoman = !isPG && (q.tipe === 'manual' ? q.rubrik : pedomanOtomatis(q))
  return (
    <div className={`explain explain--${hasil.status}`}>
      <div className="explain__head">
        <strong>Pembahasan</strong>
        <StatusBadge status={hasil.status} />
      </div>
      <p className="explain__soal"><b>Inti soal:</b> {q.soal}</p>
      <div className="explain__grid">
        <div>
          <small>Jawaban kamu</small>
          <p className="math">{jawabanSiswa}</p>
        </div>
        <div>
          <small><KeyRound size={13} /> {isPG ? 'Kunci jawaban' : 'Contoh jawaban benar'}</small>
          <p className="math">{kunci}</p>
        </div>
      </div>
      {hasil.pesan && <p className="explain__note">{hasil.pesan}</p>}
      {hasil.status === 'manual' && (
        <p className="explain__note">Soal ini butuh penjelasan, jadi tidak dinilai otomatis. Bandingkan jawabanmu dengan contoh dan pedoman di bawah, atau minta guru memeriksanya.</p>
      )}
      <BlokPembahasan p={q.pembahasan} />
      {pedoman && (
        <div className="explain__row">
          <ClipboardCheck size={16} />
          <div>
            <small>Pedoman penilaian</small>
            <ul className="explain__rubric">
              {pedoman.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

/** Kartu review: soal (mode review) + pembahasan */
export function ReviewItem({ kind, q, nomor, total, jawaban, hasil }) {
  return (
    <div className="review-item">
      {kind === 'pg' ? (
        <PilihanGanda q={q} nomor={nomor} total={total} selected={jawaban} mode="review" />
      ) : (
        <Uraian q={q} nomor={nomor} total={total} value={jawaban} disabled />
      )}
      <Pembahasan kind={kind} q={q} jawaban={jawaban} hasil={hasil} />
    </div>
  )
}
