import { useState } from 'react'
import { LogIn, House, UserRound, School } from 'lucide-react'
import { PageHeader } from '../components/ui.jsx'
import { ChibiParade } from '../components/Chibi.jsx'
import { useAuth, BATAS } from '../auth/AuthContext.jsx'
import { useToast } from '../ToastContext.jsx'
import { navigate } from '../router.js'

export default function Login() {
  const { user, signIn } = useAuth()
  // Jika sudah masuk, halaman ini menjadi formulir untuk mengubah data
  const ubah = !!user
  const toast = useToast()
  const [nama, setNama] = useState(user?.nama ?? '')
  const [kelas, setKelas] = useState(user?.kelas ?? '')
  const [error, setError] = useState('')

  const masuk = (e) => {
    e.preventDefault()
    const err = signIn({ nama, kelas })
    if (err) {
      setError(err)
      return
    }
    setError('')
    toast(ubah ? 'Data siswa sudah diperbarui ✨' : `Selamat datang, ${nama.trim().split(/\s+/)[0]}! 🎉`)
    navigate(ubah ? '/profil' : '/')
  }

  return (
    <div className="page">
      <PageHeader title={ubah ? 'Ubah Data' : 'Masuk'} subtitle="Isi nama dan kelasmu" back="/profil" color="pink" />
      <section className="card login-card">
        <ChibiParade size={52} showName={false} />

          <form className="login-form" onSubmit={masuk} noValidate>
            <h2>{ubah ? 'Ubah data siswa' : 'Halo! Ayo kenalan dulu 👋'}</h2>
            <p className="hint">Nama dan kelasmu akan tampil di Beranda, Hasil Belajar, dan Profil.</p>

            <label className="field">
              <span><UserRound size={16} /> Nama lengkap</span>
              <input
                type="text" name="nama" autoComplete="name" maxLength={BATAS.nama}
                placeholder="Contoh: Siti Aisyah" value={nama}
                onChange={(e) => { setNama(e.target.value); setError('') }}
                aria-invalid={!!error && !nama.trim()}
              />
            </label>

            <label className="field">
              <span><School size={16} /> Kelas</span>
              <input
                type="text" name="kelas" autoComplete="off" maxLength={BATAS.kelas}
                placeholder="Contoh: 7A" value={kelas}
                onChange={(e) => { setKelas(e.target.value); setError('') }}
                aria-invalid={!!error && !kelas.trim()}
              />
            </label>

            {error && <p className="form-error" role="alert">{error}</p>}

            <button type="submit" className="btn btn--primary btn--lg"><LogIn size={18} /> {ubah ? 'Simpan' : 'Masuk'}</button>
            {ubah ? (
              <button type="button" className="btn btn--ghost btn--sm" onClick={() => navigate('/profil')}>Batal</button>
            ) : (
              <button type="button" className="btn btn--ghost btn--sm" onClick={() => navigate('/')}><House size={16} /> Lewati, belajar sebagai Tamu</button>
            )}
            <p className="hint">Data hanya disimpan di perangkat ini, tanpa kata sandi.</p>
          </form>
      </section>
    </div>
  )
}
