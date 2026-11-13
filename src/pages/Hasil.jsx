import { useState } from 'react'
import { RotateCcw, Trophy, Clock, Trash2, CircleCheck, Circle, BookOpen, PencilLine, Gamepad2 } from 'lucide-react'
import { PageHeader, EmptyState, ProgressBar, ConfirmDialog } from '../components/ui.jsx'
import { Avatar } from './Profil.jsx'
import { useProgress } from '../ProgressContext.jsx'
import { useAuth } from '../auth/AuthContext.jsx'
import { useToast } from '../ToastContext.jsx'
import { materi } from '../data/materi.js'
import { nilaiTertinggi, hitungProgres } from '../utils/progress.js'
import { navigate, toHref } from '../router.js'

export const formatTanggal = (iso) => {
  try {
    return new Date(iso).toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  } catch {
    return iso
  }
}

export default function Hasil() {
  const { progress, resetAll } = useProgress()
  const { user } = useAuth()
  const toast = useToast()
  const [confirm, setConfirm] = useState(false)
  const history = progress.quizHistory
  const last = history[0]
  const best = nilaiTertinggi(progress)
  const p = hitungProgres(progress)

  return (
    <div className="page">
      <PageHeader title="Hasil Belajar" subtitle="Semua angka di sini berasal dari kegiatan yang benar-benar kamu selesaikan" back="/" buddy={4} color="peach" />

      <section className="card student-card">
        <Avatar user={user} size={56} />
        <div>
          <small>Nama siswa</small>
          <h2>{user ? user.nama : 'Tamu'}</h2>
          {user ? <p className="hint">Kelas {user.kelas}</p> : <p className="hint">Belum masuk. <a href={toHref('/login')}>Isi nama dan kelas</a> agar namamu tampil.</p>}
        </div>
      </section>

      <section className="card progress-card">
        <ProgressBar value={p.persen} label="Progres belajar keseluruhan" />
        <div className="stats">
          <div className="stat stat--pink"><strong>{p.materiSelesai}/{p.totalBab}</strong><span>Bab dipelajari</span></div>
          <div className="stat stat--blue"><strong>{p.latihanSelesai}/{p.totalBab}</strong><span>Latihan selesai</span></div>
          <div className="stat stat--lavender"><strong>{history.length}×</strong><span>Kuis dikerjakan</span></div>
        </div>
      </section>

      <section className="card">
        <h2 className="section__title"><BookOpen size={20} /> Materi & Nilai Latihan</h2>
        <div className="table-wrap">
          <table className="result-table">
            <thead>
              <tr><th>Bab</th><th>Materi</th><th>Nilai latihan</th><th>Terbaik</th></tr>
            </thead>
            <tbody>
              {materi.map((b) => {
                const lat = progress.latihan[b.id]
                return (
                  <tr key={b.id}>
                    <td><a href={toHref(`/materi/${b.id}`)}>{b.nomor}. {b.judul}</a></td>
                    <td>{progress.materiDone[b.id] ? <span className="ok"><CircleCheck size={16} /> Selesai</span> : <span className="muted"><Circle size={16} /> Belum</span>}</td>
                    <td className="num">{lat ? lat.nilai : <a href={toHref(`/latihan/${b.id}`)} className="muted">Belum</a>}</td>
                    <td className="num">{lat ? lat.best : '–'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="hint">Nilai latihan dihitung dari soal yang diperiksa otomatis. Soal penjelasan diperiksa guru.</p>
      </section>

      {!last ? (
        <EmptyState
          title="Belum ada nilai kuis"
          text="Kerjakan kuis utama untuk melihat nilai dan riwayatmu di sini."
          action={<button className="btn btn--primary" onClick={() => navigate('/kuis')}><Gamepad2 size={18} /> Mulai Kuis</button>}
        />
      ) : (
        <>
          <section className="card quiz-result">
            <span className="chip chip--lavender">Kuis terakhir · {formatTanggal(last.date)}</span>
            <div className="score-ring" style={{ '--p': last.nilai }}><span>{last.nilai}</span></div>
            <div className="stats stats--4">
              <div className="stat stat--mint"><strong>{last.benar}</strong><span>Benar</span></div>
              <div className="stat stat--pink"><strong>{last.salah}</strong><span>Salah</span></div>
              <div className="stat stat--blue"><strong>{last.kosong}</strong><span>Belum terisi</span></div>
              <div className="stat stat--lavender"><strong>{last.manual}</strong><span>Diperiksa guru</span></div>
            </div>
            <div className="best"><Trophy size={22} /> Nilai kuis tertinggi: <strong>{best}</strong></div>
            <button className="btn btn--primary btn--lg" onClick={() => navigate('/kuis')}><RotateCcw size={18} /> Ulangi Kuis</button>
          </section>

          <section className="card">
            <h2 className="section__title"><Clock size={20} /> Riwayat Nilai Kuis</h2>
            <ul className="history">
              {history.map((h, i) => (
                <li key={h.id} className={h.nilai === best ? 'is-best' : ''}>
                  <span className="history__no">#{history.length - i}</span>
                  <div className="history__info">
                    <strong>{formatTanggal(h.date)}</strong>
                    <small>Benar {h.benar} · Salah {h.salah} · Kosong {h.kosong}</small>
                  </div>
                  <span className="history__score">{h.nilai}</span>
                  {h.nilai === best && <Trophy size={16} className="history__trophy" aria-label="tertinggi" />}
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      <div className="action-row">
        <a className="btn btn--ghost" href={toHref('/latihan')}><PencilLine size={18} /> Ke Latihan</a>
        <button className="btn btn--danger-soft" onClick={() => setConfirm(true)}><Trash2 size={16} /> Reset Semua Progres</button>
      </div>

      <ConfirmDialog open={confirm} danger title="Hapus semua progres?" confirmLabel="Ya, hapus semua" onCancel={() => setConfirm(false)}
        onConfirm={() => { resetAll(); setConfirm(false); toast('Semua progres sudah dihapus.', 'info') }}>
        <p>Materi yang ditandai selesai, nilai latihan, dan riwayat kuis di perangkat ini akan dihapus. Akun Google-mu tidak terpengaruh.</p>
      </ConfirmDialog>
    </div>
  )
}
