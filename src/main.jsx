import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Font bulat lokal (subset Latin saja agar ringan & bisa offline)
import '@fontsource/nunito/latin-400.css'
import '@fontsource/nunito/latin-600.css'
import '@fontsource/nunito/latin-700.css'
import '@fontsource/nunito/latin-800.css'
import '@fontsource/baloo-2/latin-600.css'
import '@fontsource/baloo-2/latin-800.css'
import './styles.css'
import './styles-v2.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)

// Daftarkan service worker (hanya pada hasil build / produksi)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((err) => console.warn('Service worker gagal didaftarkan:', err))
  })
}
