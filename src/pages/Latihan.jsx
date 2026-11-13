import { useState } from 'react'
import { RotateCcw, ChevronRight, CircleCheck, BookOpen, Send } from 'lucide-react'
import { materi, cariBab } from '../data/materi.js'
import { latihan as dataLatihan } from '../data/latihan.js'
import { PageHeader, ProgressBar, ConfirmDialog, Motivasi } from '../components/ui.jsx'
import { PilihanGanda, Uraian, ReviewItem } from '../components/Question.jsx'
import { useProgress } from '../ProgressContext.jsx'
import { useSession } from '../SessionContext.jsx'
import { useToast } from '../ToastContext.jsx'
import { gradePG, gradeUraian, summarize } from '../utils/grading.js'
import { navigate, toHref } from '../router.js'

export function LatihanList() {
  const { progress } = useProgress()
  return (
    <div className="page">
      <PageHeader title="Latihan Soal" subtitle="Setiap bab: 3 pilihan ganda + 3 uraian" back="/" buddy={2} color="mint" />
      <div className="bab-list">
        {materi.map((bab) => {
          const r = progress.latihan[bab.id]
          return (
            <a key={bab.id} href={toHref(`/latihan/${bab.id}`)} className={`card bab bab--${bab.warna} bab--link`}>
              <div className="bab__head">
                <span className={`bab__num ${r ? 'is-done' : ''}`}>{r ? <CircleCheck size={22} /> : bab.nomor}</span>
                <div className="bab__info">
                  <h2>Bab {bab.nomor}: {bab.judul}</h2>
                  <div className="bab__chips">
                    {r ? (
                      <>
                        <span className="chip chip--mint chip--sm">Nilai terakhir: {r.nilai}</span>
                        <span className="chip chip--blue chip--sm">Terbaik: {r.best}</span>
                      </>
                    ) : (
                      <span className="chip chip--sm">Belum dikerjakan</span>
                    )}
                  </div>
                </div>
                <ChevronRight size={20} className="sub-link__arrow" />
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}

const kosong = () => ({ pg: [null, null, null], uraian: ['', '', ''], submitted: false })

export function LatihanDetail({ id }) {
  const bab = cariBab(id)
  const soal = dataLatihan[id]
  const { saveLatihan } = useProgress()
  const { latihan: sesi, setLatihan } = useSession()
  const toast = useToast()
  const [confirm, setConfirm] = useState(false)

  if (!bab || !soal) {
    return (
      <div className="page">
        <PageHeader title="Latihan tidak ditemukan" back="/latihan" />
      </div>
    )
  }

  const s = sesi[id] ?? kosong()
  const update = (fn) => setLatihan(id, (prev) => fn(prev ?? kosong()))
  const total = soal.pg.length + soal.uraian.length
  const terjawab = s.pg.filter((a) => a !== null).length + s.uraian.filter((a) => a.trim()).length
  const next = materi[materi.indexOf(bab) + 1]

  const kumpulkan = () => {
    const results = [...soal.pg.map((q, i) => gradePG(q, s.pg[i])), ...soal.uraian.map((q, i) => gradeUraian(q, s.uraian[i]))]
    const ringkasan = summarize(results)
    saveLatihan(id, ringkasan)
    update((prev) => ({ ...prev, submitted: true, results, ringkasan }))
    setConfirm(false)
    toast(`Latihan Bab ${bab.nomor} dikumpulkan. Nilai: ${ringkasan.nilai}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const ulangi = () => {
    setLatihan(id, null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (s.submitted) {
    const r = s.ringkasan
    return (
      <div className="page">
        <PageHeader title={`Hasil Latihan Bab ${bab.nomor}`} subtitle={bab.judul} back="/latihan" color="mint" />
        <section className="card quiz-result pop-in">
          <h2>Nilai Latihan</h2>
          <div className="score-ring" style={{ '--p': r.nilai }}><span>{r.nilai}</span></div>
          <div className="stats stats--4">
            <div className="stat stat--mint"><strong>{r.benar}</strong><span>Benar</span></div>
            <div className="stat stat--pink"><strong>{r.salah}</strong><span>Salah</span></div>
            <div className="stat stat--blue"><strong>{r.kosong}</strong><span>Tidak dijawab</span></div>
            <div className="stat stat--lavender"><strong>{r.manual}</strong><span>Diperiksa guru</span></div>
          </div>
          <p className="hint">
            Nilai dihitung dari {r.dinilai} soal yang dapat diperiksa otomatis.
            {r.manual > 0 && ` ${r.manual} soal penjelasan tidak dinilai otomatis — bandingkan dengan pedoman penilaian di bawah.`}
          </p>
          <div className="action-row">
            <button className="btn btn--soft" onClick={ulangi}><RotateCcw size={18} /> Ulangi Latihan</button>
            <a className="btn btn--ghost" href={toHref(`/materi/${id}`)}><BookOpen size={18} /> Kembali ke Materi</a>
            {next ? (
              <button className="btn btn--primary" onClick={() => navigate(`/latihan/${next.id}`)}>Latihan Bab {next.nomor} <ChevronRight size={18} /></button>
            ) : (
              <button className="btn btn--primary" onClick={() => navigate('/kuis')}>Lanjut ke Kuis <ChevronRight size={18} /></button>
            )}
          </div>
        </section>
        <Motivasi jenis={r.nilai >= 70 ? 'bagus' : 'semangat'} />
        <h2 className="section-title">Kunci Jawaban & Pembahasan</h2>
        {soal.pg.map((q, i) => (
          <ReviewItem key={q.id} kind="pg" q={q} nomor={i + 1} total={total} jawaban={s.pg[i]} hasil={s.results[i]} />
        ))}
        {soal.uraian.map((q, i) => (
          <ReviewItem key={q.id} kind="uraian" q={q} nomor={soal.pg.length + i + 1} total={total} jawaban={s.uraian[i]} hasil={s.results[soal.pg.length + i]} />
        ))}
      </div>
    )
  }

  return (
    <div className="page">
      <PageHeader title={`Latihan Bab ${bab.nomor}`} subtitle={bab.judul} back="/latihan" buddy={bab.buddy} color="mint" />
      <ProgressBar value={(terjawab / total) * 100} label={`Dijawab ${terjawab} dari ${total}`} small color="mint" />
      <p className="hint">Pilihan ganda langsung diberi tanda benar/salah. Kunci jawaban dan pembahasan lengkap muncul setelah latihan dikumpulkan.</p>

      <h2 className="section-title">A. Pilihan Ganda</h2>
      {soal.pg.map((q, i) => (
        <PilihanGanda key={q.id} q={q} nomor={i + 1} total={total} selected={s.pg[i]} mode="latihan"
          onSelect={(c) => update((prev) => ({ ...prev, pg: prev.pg.map((v, j) => (j === i ? c : v)) }))} />
      ))}

      <h2 className="section-title">B. Uraian</h2>
      {soal.uraian.map((q, i) => (
        <Uraian key={q.id} q={q} nomor={soal.pg.length + i + 1} total={total} value={s.uraian[i]}
          onChange={(v) => update((prev) => ({ ...prev, uraian: prev.uraian.map((x, j) => (j === i ? v : x)) }))} />
      ))}

      <button className="btn btn--primary btn--lg" onClick={() => (terjawab < total ? setConfirm(true) : kumpulkan())}>
        <Send size={18} /> Kumpulkan Latihan
      </button>

      <ConfirmDialog open={confirm} title="Kumpulkan latihan?" confirmLabel="Ya, kumpulkan" cancelLabel="Kembali mengerjakan" onConfirm={kumpulkan} onCancel={() => setConfirm(false)}>
        <p>Masih ada <b>{total - terjawab}</b> soal yang belum dijawab. Soal kosong akan dihitung belum benar.</p>
      </ConfirmDialog>
    </div>
  )
}
