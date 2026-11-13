/* DREAMIES MATH SQUAD Service Worker
 * File ini dibuat otomatis saat `npm run build` dari pwa/sw-template.js.
 * Strategi caching:
 *  - Install  : simpan (precache) semua file aplikasi.
 *  - Halaman  : network-first, jika offline pakai index.html dari cache.
 *  - File lain: cache-first, jika belum ada ambil dari internet lalu simpan.
 */
const CACHE_NAME = 'nanamath-__CACHE_VERSION__'
const PRECACHE = __PRECACHE_LIST__

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(
        PRECACHE.map((url) =>
          cache.add(new Request(url, { cache: 'reload' })).catch(() => null)
        )
      )
    ).then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith('nanamath-') && key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return
  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  // Navigasi halaman: coba internet dulu, kalau gagal pakai cache
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put('index.html', copy))
          return response
        })
        .catch(() =>
          caches.match('index.html').then((res) => res || caches.match('./'))
        )
    )
    return
  }

  // Aset (JS, CSS, gambar, font): cache dulu
  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ||
        fetch(request).then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy))
          }
          return response
        })
    )
  )
})
