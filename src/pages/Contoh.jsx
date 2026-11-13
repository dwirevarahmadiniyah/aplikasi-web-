import { useState } from 'react'
import { ChevronLeft, ChevronRight, Eye, EyeOff, KeyRound, ListOrdered, BookOpen, PencilLine } from 'lucide-react'
import { contohSoal } from '../data/contohSoal.js'
import { materi, cariBab } from '../data/materi.js'
import { PageHeader } from '../components/ui.jsx'
import { navigate, toHref } from '../router.js'

function ContohCard({ c, nomor }) {
  const [jawab, setJawab] = useState(false)
  const [bahas, setBahas] = useState(false)
  const tingkatCls = c.tingkat === 'Mudah' ? 'mint' : c.tingkat === 'Sedang' ? 'blue' : 'lavender'
  return (
    <section className="card section contoh-card">
      <div className="question__head">
        <span className="chip">Contoh {nomor}</span>
        <span className={`chip chip--${tingkatCls}`}>{c.tingkat}</span>
      </div>
      <p className="soal soal--big math-soft">{c.soal}</p>
      <div className="steps__actions">
        <button className="btn btn--soft btn--sm" aria-expanded={jawab} onClick={() => setJawab((v) => !v)}>
          {jawab ? <EyeOff size={16} /> : <KeyRound size={16} />} {jawab ? 'Sembunyikan Jawaban' : 'Lihat Jawaban'}
        </button>
        <button className="btn btn--primary btn--sm" aria-expanded={bahas} onClick={() => setBahas((v) => !v)}>
          {bahas ? <EyeOff size={16} /> : <Eye size={16} />} {bahas ? 'Sembunyikan Pembahasan' : 'Lihat Pembahasan'}
        </button>
      </div>
      {jawab && (
        <div className="answer-box pop-in">
          <KeyRound size={20} />
          <div>
            <small>Jawaban</small>
            <p className="math">{c.jawaban}</p>
          </div>
        </div>
      )}
      {bahas && (
        <div className="explain explain--plain pop-in">
          <p className="explain__soal"><b>Inti soal:</b> {c.soal}</p>
          <div className="explain__row">
            <BookOpen size={16} />
            <div>
              <small>Konsep / rumus yang dipakai</small>
              <p className="math-soft">{c.konsep}</p>
            </div>
          </div>
          <div className="explain__row">
            <ListOrdered size={16} />
            <div>
              <small>Langkah penyelesaian</small>
              <ol className="steps__list">
                {c.langkah.map((l, i) => (
                  <li key={i} className="step">
                    <span className="step__num">{i + 1}</span>
                    <div>
                      <p className="step__text math-soft">{l.teks}</p>
                      <p className="step__why">💡 {l.alasan}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="answer-box">
            <KeyRound size={20} />
            <div>
              <small>Jadi, jawabannya</small>
              <p className="math">{c.jawaban}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default function Contoh({ id }) {
  const bab = cariBab(id) || materi[0]
  const idx = materi.indexOf(bab)
  const list = contohSoal[bab.id] || []
  const prev = materi[idx - 1]
  const next = materi[idx + 1]

  return (
    <div className="page">
      <PageHeader title="Contoh Soal" subtitle="Coba kerjakan dulu, lalu cek jawaban dan pembahasannya" back="/" buddy={1} color="blue" />

      <nav className="num-pills" aria-label="Pilih bab">
        {materi.map((b) => (
          <a key={b.id} href={toHref(`/contoh/${b.id}`)} className={`num-pill num-pill--wide ${b.id === bab.id ? 'is-active' : ''}`} aria-current={b.id === bab.id ? 'page' : undefined}>
            Bab {b.nomor}
          </a>
        ))}
      </nav>

      <div className="card bab-banner">
        <span className="chip chip--blue">Bab {bab.nomor}</span>
        <h2>{bab.judul}</h2>
        <p className="hint">{list.length} contoh soal, dari mudah sampai sulit.</p>
      </div>

      {list.map((c, i) => (
        <ContohCard key={`${bab.id}-${i}`} c={c} nomor={i + 1} />
      ))}

      <div className="action-row">
        <a className="btn btn--ghost" href={toHref(`/materi/${bab.id}`)}><BookOpen size={18} /> Baca Materi Bab {bab.nomor}</a>
        <a className="btn btn--primary" href={toHref(`/latihan/${bab.id}`)}><PencilLine size={18} /> Latihan Bab {bab.nomor}</a>
      </div>

      <div className="pager">
        <button className="btn btn--soft" disabled={!prev} onClick={() => prev && navigate(`/contoh/${prev.id}`)}>
          <ChevronLeft size={18} /> Bab Sebelumnya
        </button>
        <button className="btn btn--soft" disabled={!next} onClick={() => next && navigate(`/contoh/${next.id}`)}>
          Bab Berikutnya <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
