import { House, BookOpen, Lightbulb, PencilLine, Gamepad2, ChartColumn, UserRound, LogIn } from 'lucide-react'
import { toHref } from '../router.js'
import { useAuth } from '../auth/AuthContext.jsx'
import { Avatar } from '../pages/Profil.jsx'

export const NAV_ITEMS = [
  { to: '/', label: 'Beranda', icon: House, match: '' },
  { to: '/materi', label: 'Materi', icon: BookOpen, match: 'materi' },
  { to: '/contoh', label: 'Contoh', icon: Lightbulb, match: 'contoh' },
  { to: '/latihan', label: 'Latihan', icon: PencilLine, match: 'latihan' },
  { to: '/kuis', label: 'Kuis', icon: Gamepad2, match: 'kuis' },
  { to: '/hasil', label: 'Hasil', icon: ChartColumn, match: 'hasil' },
  { to: '/profil', label: 'Profil', icon: UserRound, match: 'profil' },
]

export default function NavBar({ current }) {
  const { user } = useAuth()
  const active = (match) => current === match || (match === 'profil' && current === 'login')
  return (
    <>
      {/* Navigasi atas (tablet & laptop) */}
      <header className="topbar">
        <a href={toHref('/')} className="brand">
          <img src="./favicon.svg" alt="" width="36" height="36" />
          <span>
            DREAMIES <b>MATH</b> <i>SQUAD</i>
          </span>
        </a>
        <nav className="topbar__nav" aria-label="Navigasi utama">
          {NAV_ITEMS.map(({ to, label, icon: Icon, match }) => (
            <a key={to} href={toHref(to)} className={`topbar__link ${active(match) ? 'is-active' : ''}`} aria-current={active(match) ? 'page' : undefined}>
              <Icon size={18} /> {label}
            </a>
          ))}
          {user ? (
            <a href={toHref('/profil')} className="topbar__account" title={user.nama} aria-label={`Profil ${user.nama}`}>
              <Avatar user={user} size={32} />
            </a>
          ) : (
            <a href={toHref('/login')} className="topbar__link topbar__login"><LogIn size={18} /> Masuk</a>
          )}
        </nav>
      </header>

      {/* Navigasi bawah (HP) */}
      <nav className="bottomnav" aria-label="Navigasi bawah">
        {NAV_ITEMS.map(({ to, label, icon: Icon, match }) => (
          <a key={to} href={toHref(to)} className={`bottomnav__link ${active(match) ? 'is-active' : ''}`} aria-current={active(match) ? 'page' : undefined}>
            <span className="bottomnav__icon">
              {match === 'profil' && user ? <Avatar user={user} size={22} /> : <Icon size={20} />}
            </span>
            <span className="bottomnav__label">{label}</span>
          </a>
        ))}
      </nav>
    </>
  )
}
