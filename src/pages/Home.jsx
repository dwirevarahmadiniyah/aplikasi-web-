import { Rocket, BookOpen, Lightbulb, PencilLine, Gamepad2, ChartColumn, UserRound, Trophy, Sparkles, CircleCheck, LogIn } from 'lucide-react'
import { ChibiParade } from '../components/Chibi.jsx'
import { ProgressBar, Motivasi } from '../components/ui.jsx'
import { useProgress } from '../ProgressContext.jsx'
import { useAuth } from '../auth/AuthContext.jsx'
import { hitungProgres, nilaiTertinggi } from '../utils/progress.js'
import { materi } from '../data/materi.js'
import { navigate, toHref } from '../router.js'

const MENU = [
  { to: '/materi', label: 'Materi', desc: '8 bab bertahap', icon: BookOpen, color: 'pink' },
  { to: '/contoh', label: 'Contoh Soal', desc: 'Jawaban & pembahasan', icon: Lightbulb, color: 'blue' },
  { to: '/latihan', label: 'Latihan', desc: 'PG + uraian tiap bab', icon: PencilLine, color: 'mint' },
  { to: '/kuis', label: 'Kuis', desc: '10 PG + 5 uraian', icon: Gamepad2, color: 'lavender' },
  { to: '/hasil', label: 'Hasil Belajar', desc: 'Nilai & riwayat', icon: ChartColumn, color: 'peach' },
  { to: '/profil', label: 'Profil', desc: 'Akun & tentang aplikasi', icon: UserRound, color: 'yellow' },
]

export default function Home() {
  const { progress } = useProgress()
  const { user } = useAuth()
  const p = hitungProgres(progress)
  const best = nilaiTertinggi(progress)
  const next = materi.find((b) => !progress.materiDone[b.id])
  const namaDepan = user?.nama?.split(' ')[0]

  return (
    <div className="page home">
      <section className="hero">
        <div className="hero__badge">
          <Sparkles size={16} /> 7 Chibi Friends Edition
        </div>
        <div className="logo">
          <span className="logo__dreamies">DREAMIES</span>
          <span className="logo__math">MATH</span>
          <span className="logo__squad">SQUAD</span>
        </div>
        <h1 className="hero__title">{namaDepan ? `Halo, ${namaDepan}! Siap belajar hari ini?` : 'Welcome to DREAMIES MATH SQUAD!'}</h1>
        <p className="hero__tagline">Belajar Bentuk Aljabar bersama tujuh teman chibi 💖</p>
        <ChibiParade size={78} />
        <div className="hero__actions">
          <button className="btn btn--primary btn--lg" onClick={() => navigate(next ? `/materi/${next.id}` : '/kuis')}>
            <Rocket size={20} /> {p.materiSelesai > 0 ? 'Lanjut Belajar' : 'Mulai Belajar'}
          </button>
          <button className="btn btn--ghost btn--lg" onClick={() => navigate('/kuis')}>
            <Gamepad2 size={20} /> Main Kuis
          </button>
        </div>
      </section>

      {!user && (
        <a href={toHref('/login')} className="card login-hint">
          <LogIn size={22} />
          <span><b>Masuk dengan nama dan kelas</b> agar namamu muncul di hasil belajar.</span>
        </a>
      )}

      <section className="card progress-card">
        <div className="progress-card__head">
          <h2>Progres Belajarmu</h2>
          <span className="chip chip--mint"><Trophy size={14} /> Nilai kuis tertinggi: {progress.quizHistory.length ? best : '–'}</span>
        </div>
        <ProgressBar value={p.persen} label="Total progres" />
        <div className="stats">
          <div className="stat stat--pink"><strong>{p.materiSelesai}/{p.totalBab}</strong><span>Bab dipelajari</span></div>
          <div className="stat stat--blue"><strong>{p.latihanSelesai}/{p.totalBab}</strong><span>Latihan selesai</span></div>
          <div className="stat stat--lavender"><strong>{progress.quizHistory.length}×</strong><span>Kuis dikerjakan</span></div>
        </div>
        {next && (
          <p className="hint">
            Selanjutnya: <a href={toHref(`/materi/${next.id}`)}>Bab {next.nomor} · {next.judul}</a>
          </p>
        )}
      </section>

      <Motivasi />

      <section className="card info-card">
        <h2>Apa itu Bentuk Aljabar?</h2>
        <p>
          Bentuk aljabar adalah bentuk matematika yang memakai <b>huruf</b> (variabel) untuk mewakili bilangan yang belum diketahui.
          Misalnya harga satu permen belum diketahui, kita tulis <b>x</b>. Harga 3 permen ditambah plastik Rp500 menjadi:
        </p>
        <p className="info-card__formula math">3x + 500</p>
        <div className="info-card__legend">
          <span><b>3</b> = koefisien</span>
          <span><b>x</b> = variabel</span>
          <span><b>500</b> = konstanta</span>
        </div>
      </section>

      <section>
        <h2 className="section-title">Menu</h2>
        <div className="grid grid--3 menu-grid">
          {MENU.map(({ to, label, desc, icon: Icon, color }) => (
            <a key={to} href={toHref(to)} className={`card menu-item menu-item--${color}`}>
              <span className="menu-item__icon"><Icon size={26} /></span>
              <strong>{label}</strong>
              <small>{desc}</small>
            </a>
          ))}
        </div>
      </section>

      <section>
        <h2 className="section-title">Daftar Bab</h2>
        <div className="grid grid--2">
          {materi.map((bab) => (
            <a key={bab.id} href={toHref(`/materi/${bab.id}`)} className={`card bab-mini bab-mini--${bab.warna}`}>
              <span className="bab-mini__num">
                Bab {bab.nomor} {progress.materiDone[bab.id] && <CircleCheck size={15} className="done-icon" aria-label="selesai" />}
              </span>
              <h3>{bab.judul}</h3>
              <p>{bab.deskripsi}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
