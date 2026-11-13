import { CircleCheck, ChevronLeft, ChevronRight, PencilLine, BookMarked, Calculator, ListChecks, Lightbulb, Target, TriangleAlert } from 'lucide-react'
import { materi, cariBab } from '../data/materi.js'
import { PageHeader, ProgressBar, StepReveal, Bubble } from '../components/ui.jsx'
import { useProgress } from '../ProgressContext.jsx'
import { useToast } from '../ToastContext.jsx'
import { hitungProgres } from '../utils/progress.js'
import { navigate, toHref } from '../router.js'

export function MateriList() {
  const { progress } = useProgress()
  const p = hitungProgres(progress)
  return (
    <div className="page">
      <PageHeader title="Materi Bentuk Aljabar" subtitle="8 bab, pelajari dari Bab 1 secara berurutan" back="/" buddy={0} color="pink" />
      <ProgressBar value={(p.materiSelesai / p.totalBab) * 100} label={`Bab selesai dipelajari: ${p.materiSelesai} dari ${p.totalBab}`} />
      <div className="bab-list">
        {materi.map((bab) => {
          const done = !!progress.materiDone[bab.id]
          const lat = progress.latihan[bab.id]
          return (
            <a key={bab.id} href={toHref(`/materi/${bab.id}`)} className={`card bab bab--${bab.warna} bab--link`}>
              <div className="bab__head">
                <span className={`bab__num ${done ? 'is-done' : ''}`}>{done ? <CircleCheck size={22} /> : bab.nomor}</span>
                <div className="bab__info">
                  <h2>Bab {bab.nomor}: {bab.judul}</h2>
                  <p>{bab.deskripsi}</p>
                  <div className="bab__chips">
                    {done ? <span className="chip chip--mint chip--sm">Sudah dipelajari</span> : <span className="chip chip--sm">Belum dipelajari</span>}
                    {lat && <span className="chip chip--blue chip--sm">Latihan: {lat.nilai}</span>}
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

export function MateriDetail({ id }) {
  const { progress, markMateri } = useProgress()
  const toast = useToast()
  const bab = cariBab(id)
  if (!bab) {
    return (
      <div className="page">
        <PageHeader title="Bab tidak ditemukan" back="/materi" />
      </div>
    )
  }
  const idx = materi.indexOf(bab)
  const prev = materi[idx - 1]
  const next = materi[idx + 1]
  const done = !!progress.materiDone[id]

  const tandai = () => {
    if (!done) {
      markMateri(id)
      toast(`Bab ${bab.nomor} ditandai selesai dipelajari 🎉`)
    }
    navigate(`/latihan/${id}`)
  }

  return (
    <div className="page materi-detail">
      <PageHeader title={bab.judul} subtitle={`Bab ${bab.nomor} dari ${materi.length}${done ? ' · ✔ sudah dipelajari' : ''}`} back="/materi" buddy={bab.buddy} color={bab.warna} />
      <ProgressBar value={((idx + 1) / materi.length) * 100} label={`Bab ${bab.nomor} dari ${materi.length}`} small color={bab.warna} />

      <section className="card section section--goal">
        <h2 className="section__title"><Target size={20} /> Tujuan Pembelajaran</h2>
        <p className="hint">Setelah mempelajari bab ini, kamu dapat:</p>
        <ul className="summary">
          {bab.tujuan.map((t, i) => <li key={i}>{t}</li>)}
        </ul>
      </section>

      <section className="card section">
        <h2 className="section__title"><BookMarked size={20} /> Penjelasan Materi</h2>
        <div className="parts">
          {bab.bagian.map((b, i) => (
            <div key={i} className="part">
              <h3>{b.judul}</h3>
              {b.isi.map((t, j) => <p key={j}>{t}</p>)}
            </div>
          ))}
        </div>
      </section>

      <section className="card section section--formula">
        <h2 className="section__title"><Calculator size={20} /> Rumus & Konsep Penting</h2>
        <div className="formulas">
          {bab.rumus.map((r, i) => (
            <div key={i} className="formula">
              <small>{r.nama}</small>
              <p className="math">{r.isi}</p>
              {r.ket && <span>{r.ket}</span>}
            </div>
          ))}
        </div>
      </section>

      {bab.contoh.map((c, i) => (
        <section key={`${id}-${i}`} className="card section">
          <h2 className="section__title"><Lightbulb size={20} /> Contoh Soal {i + 1}</h2>
          <p className="soal math-soft">{c.soal}</p>
          <StepReveal langkah={c.langkah} jawaban={c.jawaban} />
        </section>
      ))}

      {bab.kesalahan && (
        <section className="card section section--warn">
          <h2 className="section__title"><TriangleAlert size={20} /> Kesalahan yang Sering Terjadi</h2>
          <div className="mistakes">
            {bab.kesalahan.map((k, i) => (
              <div key={i} className="mistake">
                <p><span className="mistake__bad">✘ {k.salah}</span></p>
                <p><span className="mistake__good">✔ {k.benar}</span></p>
                <small>{k.alasan}</small>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="card section section--summary">
        <h2 className="section__title"><ListChecks size={20} /> Kesimpulan</h2>
        <ul className="summary">
          {bab.kesimpulan.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
      </section>

      <Bubble buddy={(bab.buddy + 1) % 7}>
        {done ? 'Kamu sudah menyelesaikan bab ini. Keren! Coba latihannya untuk menguji pemahamanmu.' : 'Sudah paham? Tandai selesai, lalu kerjakan latihan bab ini, ya!'}
      </Bubble>

      <div className="action-row">
        <button className="btn btn--primary" onClick={tandai}>
          <PencilLine size={18} /> {done ? 'Latihan Soal Bab Ini' : 'Tandai Selesai & Latihan'}
        </button>
        <a className="btn btn--ghost" href={toHref(`/contoh/${id}`)}>
          <Lightbulb size={18} /> Contoh Soal Bab Ini
        </a>
      </div>

      <div className="pager">
        <button className="btn btn--soft" disabled={!prev} onClick={() => prev && navigate(`/materi/${prev.id}`)}>
          <ChevronLeft size={18} /> Bab Sebelumnya
        </button>
        <button className="btn btn--soft" disabled={!next} onClick={() => next && navigate(`/materi/${next.id}`)}>
          Bab Berikutnya <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
