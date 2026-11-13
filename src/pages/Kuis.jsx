import { useState } from 'react'
import { Play, ChevronLeft, ChevronRight, RotateCcw, ChartColumn, Flag } from 'lucide-react'
import { bankPG, bankUraian, JUMLAH_PG, JUMLAH_URAIAN } from '../data/kuis.js'
import { buildQuiz } from '../utils/quiz.js'
import { gradePG, gradeUraian, summarize, predikat } from '../utils/grading.js'
import { PageHeader, ProgressBar, ConfirmDialog, Motivasi } from '../components/ui.jsx'
import { PilihanGanda, Uraian, ReviewItem, StatusBadge } from '../components/Question.jsx'
import Chibi, { ChibiParade } from '../components/Chibi.jsx'
import { useProgress } from '../ProgressContext.jsx'
import { useSession } from '../SessionContext.jsx'
import { useToast } from '../ToastContext.jsx'
import { navigate } from '../router.js'

const isAnswered = (item, a) => (item.kind === 'pg' ? a !== null : String(a ?? '').trim() !== '')

export default function Kuis() {
  const { progress, addQuizResult } = useProgress()
  const { kuis, setKuis } = useSession()
  const toast = useToast()
  const [confirm, setConfirm] = useState(false)

  const start = () => {
    const questions = buildQuiz({ bankPG, bankUraian, jumlahPG: JUMLAH_PG, jumlahUraian: JUMLAH_URAIAN, avoidIds: progress.lastQuizIds })
    setKuis({ questions, answers: questions.map((x) => (x.kind === 'pg' ? null : '')), current: 0, phase: 'play' })
    window.scrollTo({ top: 0 })
  }

  /* ------------------------------------------------ Intro */
  if (!kuis) {
    return (
      <div className="page">
        <PageHeader title="Kuis Utama" subtitle="Mencakup Bab 1 sampai Bab 8" back="/" buddy={3} color="lavender" />
        <section className="card quiz-intro">
          <ChibiParade size={56} showName={false} />
          <h2>Siap uji kemampuanmu?</h2>
          <ul className="summary">
            <li><b>{JUMLAH_PG} soal pilihan ganda</b> dan <b>{JUMLAH_URAIAN} soal uraian</b>, diambil acak dari {bankPG.length + bankUraian.length} soal.</li>
            <li>Urutan soal dan pilihan jawaban diacak setiap sesi. Soal sesi sebelumnya diusahakan tidak muncul lagi.</li>
            <li>Kamu boleh pindah ke soal sebelumnya atau selanjutnya, dan mengganti jawaban sebelum mengumpulkan.</li>
            <li>Kunci jawaban dan pembahasan baru ditampilkan setelah kuis dikumpulkan.</li>
            <li>Jika halaman di-refresh, kuis yang sedang berjalan akan dimulai ulang.</li>
          </ul>
          <button className="btn btn--primary btn--lg" onClick={start}><Play size={20} /> Mulai Kuis</button>
        </section>
      </div>
    )
  }

  const { questions, answers, current } = kuis

  /* ------------------------------------------------ Hasil */
  if (kuis.phase === 'done') {
    const r = kuis.ringkasan
    const pr = predikat(r.nilai)
    const uraianIdx = questions.map((x, i) => (x.kind === 'uraian' ? i : -1)).filter((i) => i >= 0)
    return (
      <div className="page">
        <PageHeader title="Hasil Kuis" subtitle="Kuis sudah dikumpulkan" back="/" color="lavender" />
        <section className="card quiz-result pop-in">
          <Chibi buddy={r.nilai >= 75 ? 0 : r.nilai >= 60 ? 2 : 5} size={100} />
          <h2>{pr.label}</h2>
          <div className="score-ring" style={{ '--p': r.nilai }}><span>{r.nilai}</span></div>
          <div className="stats stats--4">
            <div className="stat stat--mint"><strong>{r.benar}</strong><span>Benar</span></div>
            <div className="stat stat--pink"><strong>{r.salah}</strong><span>Salah</span></div>
            <div className="stat stat--blue"><strong>{r.kosong}</strong><span>Belum terisi</span></div>
            <div className="stat stat--lavender"><strong>{r.manual}</strong><span>Diperiksa guru</span></div>
          </div>
          <p>{pr.pesan}</p>
          <p className="hint">
            Nilai akhir = jawaban benar ÷ {r.dinilai} soal yang diperiksa otomatis × 100.
            {r.manual > 0 && ' Soal penjelasan tidak ikut dinilai otomatis.'}
          </p>
          <div className="action-row">
            <button className="btn btn--primary" onClick={start}><RotateCcw size={18} /> Ulangi Kuis</button>
            <button className="btn btn--ghost" onClick={() => navigate('/hasil')}><ChartColumn size={18} /> Lihat Hasil Belajar</button>
          </div>
        </section>

        <section className="card">
          <h2 className="section__title">Hasil Soal Uraian</h2>
          <ul className="essay-status">
            {uraianIdx.map((i) => (
              <li key={i}>
                <span>Soal {i + 1}</span>
                <span className="math essay-status__answer">{String(answers[i] || '').trim() || '—'}</span>
                <StatusBadge status={kuis.results[i].status} />
              </li>
            ))}
          </ul>
        </section>

        <Motivasi jenis={r.nilai >= 70 ? 'bagus' : 'semangat'} />

        <h2 className="section-title">Kunci Jawaban & Pembahasan</h2>
        {questions.map((x, i) => (
          <ReviewItem key={x.q.id} kind={x.kind} q={x.q} nomor={i + 1} total={questions.length} jawaban={answers[i]} hasil={kuis.results[i]} />
        ))}
      </div>
    )
  }

  /* ------------------------------------------------ Sedang mengerjakan */
  const item = questions[current]
  const answeredCount = questions.filter((x, i) => isAnswered(x, answers[i])).length
  const kosong = questions.length - answeredCount
  const setAnswer = (v) => setKuis((k) => ({ ...k, answers: k.answers.map((a, i) => (i === k.current ? v : a)) }))
  const goto = (i) => setKuis((k) => ({ ...k, current: i }))

  const kumpulkan = () => {
    const results = questions.map((x, i) => (x.kind === 'pg' ? gradePG(x.q, answers[i]) : gradeUraian(x.q, answers[i])))
    const ringkasan = summarize(results)
    addQuizResult(ringkasan, questions.map((x) => x.q.id))
    setKuis((k) => ({ ...k, phase: 'done', results, ringkasan }))
    setConfirm(false)
    toast(`Kuis dikumpulkan. Nilai akhir: ${ringkasan.nilai}`)
    window.scrollTo({ top: 0 })
  }

  return (
    <div className="page">
      <PageHeader title="Kuis Utama" subtitle={`Soal ${current + 1} dari ${questions.length}`} back="/" color="lavender" />
      <ProgressBar value={(answeredCount / questions.length) * 100} label={`Terjawab ${answeredCount} dari ${questions.length}`} small color="lavender" />

      <nav className="num-pills" aria-label="Nomor soal">
        {questions.map((x, i) => (
          <button key={x.q.id} type="button" onClick={() => goto(i)} aria-label={`Soal ${i + 1}${isAnswered(x, answers[i]) ? ', sudah dijawab' : ''}`}
            aria-current={i === current ? 'step' : undefined}
            className={`num-pill ${isAnswered(x, answers[i]) ? 'is-answered' : ''} ${i === current ? 'is-active' : ''} ${x.kind === 'uraian' ? 'is-essay' : ''}`}>
            {i + 1}
          </button>
        ))}
      </nav>
      <p className="hint legend"><span className="legend__dot legend__dot--answered" /> sudah dijawab <span className="legend__dot" /> belum <span className="legend__sq" /> uraian</p>

      {item.kind === 'pg' ? (
        <PilihanGanda key={item.q.id} q={item.q} nomor={current + 1} total={questions.length} selected={answers[current]} onSelect={setAnswer} mode="kuis" />
      ) : (
        <Uraian key={item.q.id} q={item.q} nomor={current + 1} total={questions.length} value={answers[current]} onChange={setAnswer} />
      )}

      <div className="pager">
        <button className="btn btn--soft" disabled={current === 0} onClick={() => goto(current - 1)}><ChevronLeft size={18} /> Sebelumnya</button>
        {current < questions.length - 1 ? (
          <button className="btn btn--primary" onClick={() => goto(current + 1)}>Selanjutnya <ChevronRight size={18} /></button>
        ) : (
          <button className="btn btn--primary" onClick={() => setConfirm(true)}><Flag size={18} /> Selesai</button>
        )}
      </div>
      <button className="btn btn--ghost" onClick={() => setConfirm(true)}><Flag size={18} /> Selesai & Kumpulkan Kuis</button>

      <ConfirmDialog open={confirm} title="Akhiri kuis sekarang?" confirmLabel="Ya, kumpulkan" cancelLabel="Kembali ke soal" onConfirm={kumpulkan} onCancel={() => setConfirm(false)}>
        <p>Terjawab <b>{answeredCount}</b> dari {questions.length} soal.</p>
        {kosong > 0 ? <p>Masih ada <b>{kosong}</b> soal yang belum terisi dan akan dihitung belum benar.</p> : <p>Semua soal sudah terisi. 👍</p>}
        <p>Setelah dikumpulkan, jawaban tidak bisa diubah lagi.</p>
      </ConfirmDialog>
    </div>
  )
}
