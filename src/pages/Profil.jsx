import { useEffect, useState } from 'react'
import { Info, Target, GraduationCap, Heart, Download, Smartphone, LogOut, LogIn, School, UserRound, Pencil } from 'lucide-react'
import { PageHeader, ProgressBar } from '../components/ui.jsx'
import Chibi from '../components/Chibi.jsx'
import { buddies } from '../data/buddies.js'
import { pembuat, tentang, tujuanPembelajaran } from '../data/profil.js'
import { useAuth } from '../auth/AuthContext.jsx'
import { useProgress } from '../ProgressContext.jsx'
import { useToast } from '../ToastContext.jsx'
import { hitungProgres } from '../utils/progress.js'
import { toHref } from '../router.js'

/** Lingkaran berisi huruf pertama nama siswa */
export function Avatar({ user, size = 40 }) {
  return (
    <span className="avatar avatar--initial" style={{ width: size, height: size, fontSize: size * 0.42 }} aria-hidden="true">
      {user ? user.nama.trim().charAt(0).toUpperCase() : <UserRound size={size * 0.55} />}
    </span>
  )
}

function useInstallPrompt() {
  const [deferred, setDeferred] = useState(null)
  const [installed, setInstalled] = useState(() => window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true)
  useEffect(() => {
    const onPrompt = (e) => {
      e.preventDefault()
      setDeferred(e)
    }
    const onInstalled = () => setInstalled(true)
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])
  const install = async () => {
    if (!deferred) return
    deferred.prompt()
    await deferred.userChoice
    setDeferred(null)
  }
  return { canInstall: !!deferred, installed, install }
}

export function AccountCard() {
  const { user, signOut } = useAuth()
  const toast = useToast()
  const logout = () => {
    if (signOut()) toast('Kamu sudah keluar.', 'info')
  }
  return (
    <section className="card account-card">
      <Avatar user={user} size={72} />
      <div className="account-card__info">
        {user ? (
          <>
            <h2>{user.nama}</h2>
            <p className="account-card__email"><School size={15} /> Kelas {user.kelas}</p>
          </>
        ) : (
          <>
            <h2>Tamu</h2>
            <p className="hint">Kamu belum masuk. Isi nama dan kelas agar tampil di hasil belajar.</p>
          </>
        )}
      </div>
      <div className="account-card__actions">
        {user ? (
          <>
            <a className="btn btn--soft" href={toHref('/login')}><Pencil size={18} /> Ubah</a>
            <button className="btn btn--soft" onClick={logout}><LogOut size={18} /> Keluar</button>
          </>
        ) : (
          <a className="btn btn--primary" href={toHref('/login')}><LogIn size={18} /> Masuk</a>
        )}
      </div>
    </section>
  )
}

export default function Profil() {
  const { canInstall, installed, install } = useInstallPrompt()
  const { progress } = useProgress()
  const p = hitungProgres(progress)
  const isIOS = /iphone|ipad|ipod/i.test(window.navigator.userAgent)

  return (
    <div className="page">
      <PageHeader title="Profil" subtitle="Akun, progres, dan tentang aplikasi" back="/" buddy={6} color="yellow" />

      <AccountCard />

      <section className="card progress-card">
        <ProgressBar value={p.persen} label="Progres belajar" />
        <p className="hint">
          {p.materiSelesai} dari {p.totalBab} bab dipelajari · {p.latihanSelesai} latihan selesai · kuis dikerjakan {progress.quizHistory.length}×.
          Progres tersimpan di perangkat ini. <a href={toHref('/hasil')}>Lihat detail hasil belajar</a>.
        </p>
      </section>

      <section className="card section">
        <h2 className="section__title"><Info size={20} /> Tentang DREAMIES MATH SQUAD</h2>
        <div className="logo logo--small">
          <span className="logo__dreamies">DREAMIES</span>
          <span className="logo__math">MATH</span>
          <span className="logo__squad">SQUAD</span>
        </div>
        <p><em>7 Chibi Friends Edition · Make Algebra Fun and Easy!</em></p>
        <p>{tentang}</p>
      </section>

      <section className="card section">
        <h2 className="section__title"><Target size={20} /> Tujuan Pembelajaran</h2>
        <ul className="summary">
          {tujuanPembelajaran.map((t, i) => <li key={i}>{t}</li>)}
        </ul>
      </section>

      <section className="card section">
        <h2 className="section__title"><GraduationCap size={20} /> Pembuat Aplikasi</h2>
        <dl className="info-list">
          <div><dt>Nama</dt><dd>{pembuat.nama}</dd></div>
          <div><dt>NIM</dt><dd>{pembuat.nim}</dd></div>
          <div><dt>Kelas</dt><dd>{pembuat.kelas}</dd></div>
          <div><dt>Instansi</dt><dd>{pembuat.instansi}</dd></div>
          <div><dt>Mata Kuliah</dt><dd>{pembuat.mataKuliah}</dd></div>
          <div><dt>Tahun</dt><dd>{pembuat.tahun}</dd></div>
          {pembuat.kontak && <div><dt>Kontak</dt><dd>{pembuat.kontak}</dd></div>}
        </dl>
      </section>

      <section className="card section">
        <h2 className="section__title"><Heart size={20} /> Kenalan dengan 7 Chibi Friends</h2>
        <div className="buddy-grid">
          {buddies.map((b, i) => (
            <div key={b.id} className="buddy-card" style={{ '--c': b.animal === 'cat' || b.animal === 'dog' ? b.dark : b.fur }}>
              <Chibi buddy={b} size={70} delay={i * 0.2} />
              <strong>{b.name}</strong>
              <small>{b.role}</small>
              <em>“{b.quote}”</em>
            </div>
          ))}
        </div>
      </section>

      <section className="card section">
        <h2 className="section__title"><Smartphone size={20} /> Pasang di HP (PWA)</h2>
        {installed ? (
          <p>✅ Aplikasi sudah terpasang di perangkat ini.</p>
        ) : canInstall ? (
          <button className="btn btn--primary" onClick={install}><Download size={18} /> Pasang Aplikasi</button>
        ) : isIOS ? (
          <p>Di iPhone/iPad: buka di <b>Safari</b>, ketuk <b>Bagikan</b>, lalu pilih <b>Tambah ke Layar Utama</b>.</p>
        ) : (
          <p>Di Android: buka di <b>Chrome</b>, ketuk menu <b>⋮</b>, lalu pilih <b>Instal aplikasi</b> atau <b>Tambahkan ke layar utama</b>.</p>
        )}
        <p className="hint">Ini adalah aplikasi web (PWA) yang dipasang lewat browser, bukan aplikasi dari Play Store/App Store.</p>
      </section>

      <p className="footer-note">DREAMIES MATH SQUAD v2.0 · Dibuat dengan 💖 untuk siswa SMP Indonesia</p>
    </div>
  )
}
