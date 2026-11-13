import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

/**
 * Plugin kecil buatan sendiri untuk membuat service worker (sw.js) saat build.
 * Semua file hasil build (JS, CSS, font) dimasukkan ke daftar precache,
 * sehingga aplikasi bisa dibuka OFFLINE setelah dibuka sekali saat online.
 */
function nanaServiceWorker() {
  return {
    name: 'nana-service-worker',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const template = fs.readFileSync(path.resolve('pwa/sw-template.js'), 'utf8')
      const publicFiles = [
        './',
        'index.html',
        'manifest.json',
        'favicon.svg',
        'icons/icon-192.png',
        'icons/icon-512.png',
        'icons/apple-touch-icon.png',
      ]
      const buildFiles = Object.keys(bundle).filter((f) => !f.endsWith('.map'))
      const list = [...new Set([...publicFiles, ...buildFiles])]
      const version = crypto.createHash('md5').update(list.join('|')).digest('hex').slice(0, 10)
      const source = template
        .replace('__PRECACHE_LIST__', JSON.stringify(list, null, 2))
        .replace('__CACHE_VERSION__', version)
      this.emitFile({ type: 'asset', fileName: 'sw.js', source })
    },
  }
}

export default defineConfig({
  // base relatif agar bisa di-hosting di subfolder (misalnya GitHub Pages)
  base: './',
  plugins: [react(), nanaServiceWorker()],
})
