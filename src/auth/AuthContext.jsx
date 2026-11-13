import { createContext, useCallback, useContext, useState } from 'react'

// =====================================================================
// LOGIN SEDERHANA: siswa mengisi Nama dan Kelas.
// Data disimpan di localStorage perangkat ini (tanpa server, tanpa password),
// sehingga tetap ada setelah refresh dan hilang saat siswa menekan "Keluar".
// =====================================================================
const KEY = 'dms-siswa-v1'
const AuthContext = createContext(null)

export const BATAS = { nama: 40, kelas: 20 }

const rapikan = (s) => String(s ?? '').replace(/\s+/g, ' ').trim()

/** Mengembalikan pesan kesalahan, atau '' jika data valid */
export function validasiSiswa({ nama, kelas }) {
  const n = rapikan(nama)
  const k = rapikan(kelas)
  if (!n) return 'Nama belum diisi.'
  if (n.length < 2) return 'Nama terlalu pendek.'
  if (n.length > BATAS.nama) return `Nama maksimal ${BATAS.nama} huruf.`
  if (!/\p{L}/u.test(n)) return 'Nama harus berisi huruf.'
  if (!k) return 'Kelas belum diisi.'
  if (k.length > BATAS.kelas) return `Kelas maksimal ${BATAS.kelas} karakter.`
  return ''
}

function bacaSiswa() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    return validasiSiswa(data) ? null : { nama: rapikan(data.nama), kelas: rapikan(data.kelas) }
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(bacaSiswa)

  /** Menyimpan nama & kelas. Mengembalikan pesan kesalahan, atau '' jika berhasil. */
  const signIn = useCallback(({ nama, kelas }) => {
    const err = validasiSiswa({ nama, kelas })
    if (err) return err
    const data = { nama: rapikan(nama), kelas: rapikan(kelas) }
    try {
      localStorage.setItem(KEY, JSON.stringify(data))
    } catch {
      // Penyimpanan diblokir (mis. mode privat): tetap masuk untuk sesi ini saja
    }
    setUser(data)
    return ''
  }, [])

  const signOut = useCallback(() => {
    try {
      localStorage.removeItem(KEY)
    } catch {
      /* abaikan */
    }
    setUser(null)
    return true
  }, [])

  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
