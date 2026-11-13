// Router sederhana berbasis hash.
// Di dalam kode, halaman ditulis seperti path biasa: '/materi/bab1-1'.
// Di alamat browser, path itu diubah menjadi hash polos: #materi-bab1-1
// (huruf, angka, dan tanda hubung saja) agar aman di hosting statis,
// saat offline (PWA), dan saat dibuka sebagai halaman pratinjau.
import { useEffect, useState } from 'react'

const SECTIONS = ['materi', 'contoh', 'latihan', 'kuis', 'hasil', 'profil', 'login']

/** '/materi/bab1-1' -> 'materi-bab1-1',  '/' -> 'beranda' */
export function toHash(path) {
  const parts = path.split('/').filter(Boolean)
  return parts.length ? parts.join('-') : 'beranda'
}

/** Dipakai pada atribut href: <a href={toHref('/materi')}> */
export function toHref(path) {
  return `#${toHash(path)}`
}

function parse() {
  let raw = window.location.hash.replace(/^#/, '')
  // Dukung juga format lama #/materi/bab1-1
  if (raw.startsWith('/')) raw = raw.split('/').filter(Boolean).join('-')
  if (!raw || raw === 'beranda') return { parts: [] }
  const dash = raw.indexOf('-')
  const section = dash === -1 ? raw : raw.slice(0, dash)
  const id = dash === -1 ? undefined : raw.slice(dash + 1)
  if (!SECTIONS.includes(section)) return { parts: [raw] }
  return { parts: id ? [section, id] : [section] }
}

export function navigate(path) {
  const hash = toHash(path)
  if (window.location.hash === `#${hash}`) return
  window.location.hash = hash
}

export function useRoute() {
  const [route, setRoute] = useState(parse)
  useEffect(() => {
    const onChange = () => {
      setRoute(parse())
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}
