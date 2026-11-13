import { useRoute } from './router.js'
import { ProgressProvider } from './ProgressContext.jsx'
import { SessionProvider } from './SessionContext.jsx'
import { ToastProvider } from './ToastContext.jsx'
import { AuthProvider } from './auth/AuthContext.jsx'
import NavBar from './components/NavBar.jsx'
import Home from './pages/Home.jsx'
import { MateriList, MateriDetail } from './pages/Materi.jsx'
import Contoh from './pages/Contoh.jsx'
import { LatihanList, LatihanDetail } from './pages/Latihan.jsx'
import Kuis from './pages/Kuis.jsx'
import Hasil from './pages/Hasil.jsx'
import Profil from './pages/Profil.jsx'
import Login from './pages/Login.jsx'
import { PageHeader } from './components/ui.jsx'

function Page({ parts }) {
  const [section, id] = parts
  switch (section) {
    case undefined:
      return <Home />
    case 'materi':
      return id ? <MateriDetail key={id} id={id} /> : <MateriList />
    case 'contoh':
      return <Contoh key={id || 'bab1'} id={id} />
    case 'latihan':
      return id ? <LatihanDetail key={id} id={id} /> : <LatihanList />
    case 'kuis':
      return <Kuis />
    case 'hasil':
      return <Hasil />
    case 'profil':
      return <Profil />
    case 'login':
      return <Login />
    default:
      return (
        <div className="page">
          <PageHeader title="Halaman tidak ditemukan" subtitle="Ups, halaman ini tidak ada." back="/" buddy={4} />
        </div>
      )
  }
}

export default function App() {
  const { parts } = useRoute()
  return (
    <AuthProvider>
      <ProgressProvider>
        <SessionProvider>
          <ToastProvider>
            <div className="app">
              <NavBar current={parts[0] ?? ''} />
              <main className="main" key={parts.join('-')}>
                <Page parts={parts} />
              </main>
            </div>
          </ToastProvider>
        </SessionProvider>
      </ProgressProvider>
    </AuthProvider>
  )
}
