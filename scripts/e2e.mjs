// =====================================================================
// Uji otomatis di browser (Microsoft Edge / Google Chrome).
// Jalankan setelah build:  npm run build  lalu  npm run e2e
// Skrip ini menjalankan server preview, membuka aplikasi, lalu
// mengklik & mengisi jawaban seperti siswa sungguhan.
// =====================================================================
import { preview } from 'vite'
import { chromium } from 'playwright-core'
import { latihan } from '../src/data/latihan.js'
import { bankPG, bankUraian } from '../src/data/kuis.js'

const PORT = 4180
const BASE = `http://localhost:${PORT}/`
const KEY = 'dms-progress-v2'

let passed = 0
let failed = 0
const consoleErrors = []
async function test(name, fn) {
  try {
    await fn()
    passed++
    console.log('  ✔', name)
  } catch (e) {
    failed++
    console.error('  ✘', name, '\n     ', e.message.split('\n')[0])
  }
}
const expect = (cond, msg) => {
  if (!cond) throw new Error(msg)
}

const allPG = [...Object.values(latihan).flatMap((l) => l.pg), ...bankPG]
const allUraian = [...Object.values(latihan).flatMap((l) => l.uraian), ...bankUraian]
const findPG = (text) => allPG.find((q) => q.soal === text.trim())
const findUraian = (text) => allUraian.find((q) => q.soal === text.trim())
const jawabanUraian = (q) => (q.tipe === 'manual' ? 'Penjelasan saya untuk soal ini.' : q.tipe === 'angka' ? String(q.nilai) : q.kunci)

async function launch() {
  for (const channel of ['msedge', 'chrome']) {
    try {
      return await chromium.launch({ channel, headless: true })
    } catch {
      /* coba browser berikutnya */
    }
  }
  throw new Error('Microsoft Edge atau Google Chrome tidak ditemukan')
}

const server = await preview({ preview: { port: PORT, strictPort: true }, logLevel: 'silent' })
const browser = await launch()

function watch(page) {
  page.on('console', (m) => m.type() === 'error' && consoleErrors.push(`${page.url()} → ${m.text()}`))
  page.on('pageerror', (e) => consoleErrors.push(`${page.url()} → ${e.message}`))
}
const progress = (page) => page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), KEY)
const go = async (page, hash) => {
  await page.goto(BASE + (hash ? `#${hash}` : ''))
  await page.waitForSelector('main .page')
}

/** Jawab semua soal di halaman latihan dengan benar (atau dengan pola tertentu) */
async function kerjakanLatihan(page, { benar = true } = {}) {
  const cards = page.locator('.card.question')
  const n = await cards.count()
  for (let i = 0; i < n; i++) {
    const card = cards.nth(i)
    const text = await card.locator('.question__text').innerText()
    const pg = findPG(text)
    if (pg) {
      const target = benar ? pg.pilihan[pg.jawaban] : pg.pilihan[(pg.jawaban + 1) % 4]
      await card.locator('.option', { hasText: target }).filter({ has: page.locator(`.option__text:text-is("${target}")`) }).click()
    } else {
      const ur = findUraian(text)
      expect(ur, `Soal tidak ditemukan di data: ${text}`)
      await card.locator('.answer-input').fill(benar ? jawabanUraian(ur) : '999')
    }
  }
}

try {
  /* =============================================== LAPTOP */
  console.log('\n💻 Laptop (1280×800)')
  const desk = await browser.newContext({ viewport: { width: 1280, height: 800 } })
  const page = await desk.newPage()
  watch(page)

  await test('Beranda tampil: judul, logo, 7 chibi, tombol utama', async () => {
    await go(page, '')
    expect((await page.title()).includes('DREAMIES MATH SQUAD'), 'judul tab')
    expect(await page.locator('.logo__dreamies').isVisible(), 'logo')
    expect((await page.locator('svg[aria-label^="Boneka chibi"]').count()) >= 7, 'chibi')
    for (const t of ['Mulai Belajar', 'Main Kuis']) expect(await page.getByRole('button', { name: t }).isVisible(), t)
    for (const t of ['Materi', 'Contoh Soal', 'Latihan', 'Kuis', 'Profil']) expect(await page.locator('.menu-item', { hasText: t }).first().isVisible(), `menu ${t}`)
  })

  await test('Navigasi atas membuka semua halaman', async () => {
    const tujuan = { Materi: 'Materi Bentuk Aljabar', Contoh: 'Contoh Soal', Latihan: 'Latihan Soal', Kuis: 'Kuis Utama', Hasil: 'Hasil Belajar', Profil: 'Profil', Beranda: 'Welcome' }
    for (const [link, h1] of Object.entries(tujuan)) {
      await page.locator('.topbar__link', { hasText: link }).click()
      await page.waitForFunction((t) => document.querySelector('main h1')?.textContent.includes(t), h1)
    }
  })

  await test('Tombol Kembali berfungsi', async () => {
    await go(page, 'materi-bab2')
    await page.getByRole('button', { name: 'Kembali' }).click()
    await page.waitForFunction(() => location.hash === '#materi')
  })

  await test('Semua 8 bab materi bisa dibuka dan lengkap', async () => {
    for (let i = 1; i <= 8; i++) {
      await go(page, `materi-bab${i}`)
      const body = await page.locator('main').innerText()
      for (const t of ['Tujuan Pembelajaran', 'Penjelasan Materi', 'Rumus & Konsep Penting', 'Contoh Soal 1', 'Kesimpulan']) expect(body.includes(t), `bab${i}: ${t}`)
      expect(await page.getByRole('button', { name: /Latihan/ }).first().isVisible(), `bab${i}: tombol latihan`)
    }
  })

  await test('Langkah contoh di materi muncul satu per satu', async () => {
    await go(page, 'materi-bab3')
    const sec = page.locator('section', { hasText: 'Contoh Soal 1' })
    await sec.getByRole('button', { name: 'Mulai Pembahasan' }).click()
    expect((await sec.locator('.step').count()) === 1, 'langkah 1')
    await sec.getByRole('button', { name: 'Tampilkan Semua' }).click()
    expect(await sec.locator('.answer-box').isVisible(), 'jawaban akhir')
  })

  await test('Tandai bab selesai → tersimpan & menuju latihan', async () => {
    await go(page, 'materi-bab1')
    await page.getByRole('button', { name: 'Tandai Selesai & Latihan' }).click()
    await page.waitForFunction(() => location.hash === '#latihan-bab1')
    expect((await progress(page)).materiDone.bab1 === true, 'materiDone.bab1')
    await go(page, 'materi')
    expect(await page.locator('.bab--link').first().locator('.bab__num.is-done').isVisible(), 'penanda bab selesai')
  })

  await test('Contoh soal: Lihat Jawaban & Lihat Pembahasan', async () => {
    await go(page, 'contoh-bab3')
    const card = page.locator('.contoh-card').first()
    expect(!(await card.locator('.answer-box').isVisible()), 'jawaban tidak langsung terlihat')
    await card.getByRole('button', { name: 'Lihat Jawaban' }).click()
    expect((await card.locator('.answer-box').first().innerText()).includes('5x'), 'jawaban 5x')
    await card.getByRole('button', { name: 'Lihat Pembahasan' }).click()
    expect((await card.innerText()).toLowerCase().includes('langkah penyelesaian'), 'pembahasan')
    expect((await page.locator('.contoh-card').count()) >= 3, '≥3 contoh')
  })

  await test('Contoh soal tersedia untuk 8 bab', async () => {
    for (let i = 1; i <= 8; i++) {
      await go(page, `contoh-bab${i}`)
      expect((await page.locator('.contoh-card').count()) >= 3, `bab${i}`)
    }
  })

  await test('Latihan Bab 3 dijawab benar semua → nilai 100 & tersimpan', async () => {
    await go(page, 'latihan-bab3')
    expect((await page.locator('.option').count()) === 12, '3 PG × 4 pilihan')
    expect((await page.locator('.answer-input').count()) === 3, '3 uraian')
    await kerjakanLatihan(page)
    expect((await page.locator('.feedback--correct').count()) === 3, 'feedback benar setelah menjawab PG')
    expect((await page.locator('.explain').count()) === 0, 'kunci belum tampil sebelum dikumpulkan')
    await page.getByRole('button', { name: 'Kumpulkan Latihan' }).click()
    await page.waitForSelector('.score-ring')
    expect((await page.locator('.score-ring').innerText()).trim() === '100', 'nilai 100')
    expect((await page.locator('.explain').count()) === 6, 'pembahasan 6 soal')
    expect((await progress(page)).latihan.bab3.nilai === 100, 'tersimpan')
    for (const t of ['Ulangi Latihan', 'Kembali ke Materi']) expect(await page.getByText(t).first().isVisible(), t)
  })

  await test('Latihan Bab 1 kosong → konfirmasi, soal manual tidak dinilai otomatis', async () => {
    await go(page, 'latihan-bab1')
    await page.getByRole('button', { name: 'Kumpulkan Latihan' }).click()
    expect(await page.getByRole('alertdialog').isVisible(), 'dialog konfirmasi')
    await page.getByRole('button', { name: 'Ya, kumpulkan' }).click()
    await page.waitForSelector('.score-ring')
    const r = (await progress(page)).latihan.bab1
    // 6 soal kosong; soal penjelasan (1) tidak masuk nilai otomatis → dinilai 5
    expect(r.nilai === 0 && r.kosong === 6 && r.salah === 0 && r.manual === 0 && r.dinilai === 5, `rekap ${JSON.stringify(r)}`)
  })

  await test('Jawaban uraian setara tapi belum sederhana tidak dihitung benar', async () => {
    await go(page, 'latihan-bab5')
    await page.locator('.answer-input').nth(0).fill('5(2y − 3)')
    await page.getByRole('button', { name: 'Kumpulkan Latihan' }).click()
    await page.getByRole('button', { name: 'Ya, kumpulkan' }).click()
    await page.waitForSelector('.score-ring')
    expect((await page.locator('.status--setara').count()) === 1, 'status "belum paling sederhana"')
  })

  await test('Latihan: pindah halaman tetap tersimpan, REFRESH me-reset', async () => {
    await go(page, 'latihan-bab4')
    await page.locator('.option').first().click()
    await page.locator('.answer-input').first().fill('5p')
    await page.locator('.topbar__link', { hasText: 'Beranda' }).click()
    await page.waitForFunction(() => location.hash === '#beranda')
    await page.goBack()
    await page.waitForSelector('.answer-input')
    expect((await page.locator('.answer-input').first().inputValue()) === '5p', 'jawaban bertahan saat pindah halaman')
    await page.reload()
    await page.waitForSelector('.answer-input')
    expect((await page.locator('.answer-input').first().inputValue()) === '', 'uraian kosong setelah refresh')
    expect((await page.locator('.feedback').count()) === 0, 'PG kosong setelah refresh')
  })

  let idsSesi1 = []
  await test('Kuis: 10 PG + 5 uraian, tanpa kunci saat berlangsung, nilai 100 jika benar semua', async () => {
    await go(page, 'kuis')
    await page.getByRole('button', { name: 'Mulai Kuis' }).click()
    expect((await page.locator('.num-pills .num-pill').count()) === 15, '15 nomor soal')
    let pg = 0
    let ur = 0
    for (let i = 0; i < 15; i++) {
      const card = page.locator('.card.question')
      const text = await card.locator('.question__text').innerText()
      const q = findPG(text)
      if (q) {
        pg++
        idsSesi1.push(q.id)
        const target = q.pilihan[q.jawaban]
        await card.locator('.option').filter({ has: page.locator(`.option__text:text-is("${target}")`) }).click()
      } else {
        const u = findUraian(text)
        expect(u, `soal kuis tidak dikenal: ${text}`)
        ur++
        idsSesi1.push(u.id)
        await card.locator('.answer-input').fill(jawabanUraian(u))
      }
      expect((await page.locator('.feedback, .explain, .option--correct, .option--wrong').count()) === 0, 'tidak ada kunci/feedback saat kuis')
      if (i < 14) await page.getByRole('button', { name: 'Selanjutnya' }).click()
    }
    expect(pg === 10 && ur === 5, `komposisi ${pg} PG + ${ur} uraian`)
    expect(new Set(idsSesi1).size === 15, 'tidak ada soal kembar')
    await page.getByRole('button', { name: 'Sebelumnya' }).click()
    await page.getByRole('button', { name: 'Selanjutnya' }).click()
    await page.getByRole('button', { name: 'Selesai', exact: true }).click()
    expect(await page.getByRole('alertdialog').isVisible(), 'konfirmasi sebelum selesai')
    await page.getByRole('button', { name: 'Ya, kumpulkan' }).click()
    await page.waitForSelector('.score-ring')
    expect((await page.locator('.score-ring').innerText()).trim() === '100', 'nilai 100')
    expect((await page.locator('.explain').count()) === 15, 'pembahasan 15 soal')
    const p = await progress(page)
    expect(p.quizHistory.length === 1 && p.quizHistory[0].nilai === 100, 'riwayat tersimpan')
    expect(p.lastQuizIds.length === 15, 'id soal terakhir tersimpan')
  })

  await test('Ulangi kuis: kumpulan soal berbeda dari sesi sebelumnya', async () => {
    await page.getByRole('button', { name: 'Ulangi Kuis' }).click()
    const ids = []
    for (let i = 0; i < 15; i++) {
      const text = await page.locator('.card.question .question__text').innerText()
      ids.push((findPG(text) || findUraian(text)).id)
      if (i < 14) await page.getByRole('button', { name: 'Selanjutnya' }).click()
    }
    const overlap = ids.filter((id) => idsSesi1.includes(id))
    expect(overlap.length === 0, `soal berulang: ${overlap.join(', ')}`)
  })

  await test('Kuis: refresh di tengah kuis → kuis dimulai ulang, riwayat tetap ada', async () => {
    await page.getByRole('button', { name: 'Sebelumnya' }).click()
    await page.reload()
    await page.waitForSelector('main .page')
    expect(await page.getByRole('button', { name: 'Mulai Kuis' }).isVisible(), 'kembali ke layar awal kuis')
    expect((await progress(page)).quizHistory.length === 1, 'riwayat tidak hilang')
  })

  await test('Halaman Hasil menampilkan data nyata', async () => {
    await go(page, 'hasil')
    const t = await page.locator('main').innerText()
    expect(t.includes('Tamu'), 'nama siswa (tamu)')
    expect((await page.locator('.result-table tbody tr').count()) === 8, '8 bab')
    expect((await page.locator('.history li').count()) === 1, 'riwayat 1')
  })

  await test('Profil sebagai tamu: kartu akun, progres, data pembuat', async () => {
    await go(page, 'profil')
    const t = await page.locator('main').innerText()
    for (const s of ['Tamu', 'Progres belajar', 'Dwi Reva Rahmadiniyah', '2225250070']) expect(t.includes(s), s)
  })

  await test('Login nama & kelas: validasi, masuk, tetap ada setelah refresh, ubah, keluar', async () => {
    await go(page, 'login')
    await page.getByRole('button', { name: 'Masuk', exact: true }).click()
    expect(await page.getByText('Nama belum diisi.').isVisible(), 'validasi nama')
    await page.getByLabel('Nama lengkap').fill('  Siti   Aisyah ')
    await page.getByRole('button', { name: 'Masuk', exact: true }).click()
    expect(await page.getByText('Kelas belum diisi.').isVisible(), 'validasi kelas')
    await page.getByLabel('Kelas').fill('7A')
    await page.getByRole('button', { name: 'Masuk', exact: true }).click()
    await page.waitForFunction(() => location.hash === '' || location.hash === '#beranda')
    expect((await page.locator('.hero__title').innerText()).includes('Halo, Siti!'), 'sapaan di beranda')
    await page.reload()
    await go(page, 'hasil')
    let t = await page.locator('main').innerText()
    expect(t.includes('Siti Aisyah') && t.includes('Kelas 7A'), 'nama & kelas di Hasil setelah refresh')
    await go(page, 'profil')
    await page.getByRole('link', { name: 'Ubah' }).click()
    await page.getByLabel('Kelas').fill('8B')
    await page.getByRole('button', { name: 'Simpan' }).click()
    await go(page, 'profil')
    t = await page.locator('main').innerText()
    expect(t.includes('Kelas 8B'), 'kelas berubah')
    await page.getByRole('button', { name: 'Keluar' }).click()
    t = await page.locator('main').innerText()
    expect(t.includes('Tamu'), 'kembali menjadi tamu')
  })

  await test('Reset progres memakai konfirmasi di halaman', async () => {
    await go(page, 'hasil')
    await page.getByRole('button', { name: 'Reset Semua Progres' }).click()
    await page.getByRole('button', { name: 'Ya, hapus semua' }).click()
    const p = await progress(page)
    expect(p.quizHistory.length === 0 && Object.keys(p.materiDone).length === 0, 'progres terhapus')
  })
  await desk.close()

  /* =============================================== HP */
  console.log('\n📱 HP (375×812) & tablet (768×1024)')
  for (const vp of [{ width: 375, height: 812, name: 'HP' }, { width: 768, height: 1024, name: 'Tablet' }]) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: vp.name === 'HP', hasTouch: true, deviceScaleFactor: 2 })
    const mp = await ctx.newPage()
    watch(mp)
    await test(`${vp.name}: tidak ada halaman yang melebar ke samping`, async () => {
      const routes = ['beranda', 'materi', 'materi-bab5', 'contoh-bab8', 'latihan', 'latihan-bab8', 'kuis', 'hasil', 'profil', 'login']
      for (const r of routes) {
        await go(mp, r)
        const over = await mp.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
        expect(over <= 0, `#${r} melebar ${over}px`)
      }
    })
    if (vp.name === 'HP') {
      await test('HP: navigasi bawah tampil dengan 7 menu dan tombol cukup besar', async () => {
        await go(mp, 'beranda')
        expect(await mp.locator('.bottomnav').isVisible(), 'navigasi bawah')
        expect((await mp.locator('.bottomnav__link').count()) === 7, '7 menu')
        const box = await mp.locator('.bottomnav__link').first().boundingBox()
        expect(box.height >= 44, `tinggi tombol ${box.height}px`)
      })
      await test('HP: kuis bisa dikerjakan dan dialog konfirmasi muat di layar', async () => {
        await go(mp, 'kuis')
        await mp.getByRole('button', { name: 'Mulai Kuis' }).click()
        await mp.locator('.option').first().click()
        await mp.getByRole('button', { name: 'Selesai & Kumpulkan Kuis' }).click()
        const box = await mp.getByRole('alertdialog').boundingBox()
        expect(box.x >= 0 && box.x + box.width <= 375, 'dialog muat')
        await mp.getByRole('button', { name: 'Kembali ke soal' }).click()
      })
    }
    await ctx.close()
  }

  /* =============================================== PWA */
  console.log('\n📲 PWA')
  const pctx = await browser.newContext()
  const pp = await pctx.newPage()
  await test('manifest, ikon, dan service worker tersedia', async () => {
    await go(pp, '')
    const m = await (await pp.request.get(BASE + 'manifest.json')).json()
    expect(m.display === 'standalone', 'display standalone')
    expect(m.icons.some((i) => i.sizes === '192x192') && m.icons.some((i) => i.sizes === '512x512'), 'ikon 192 & 512')
    for (const f of ['icons/icon-192.png', 'icons/icon-512.png', 'sw.js']) expect((await pp.request.get(BASE + f)).ok(), f)
    await pp.waitForFunction(() => navigator.serviceWorker?.controller || navigator.serviceWorker?.ready, null, { timeout: 10000 })
    const active = await pp.evaluate(async () => !!(await navigator.serviceWorker.ready).active)
    expect(active, 'service worker aktif')
  })
  await test('Mode offline: aplikasi tetap terbuka setelah pernah dibuka', async () => {
    await pp.reload()
    await pp.waitForFunction(() => navigator.serviceWorker.controller)
    await pctx.setOffline(true)
    await pp.goto(BASE + '#materi-bab6')
    await pp.waitForSelector('main h1', { timeout: 8000 })
    expect((await pp.locator('main h1').innerText()).includes('Pembagian'), 'materi tampil offline')
    await pctx.setOffline(false)
  })
  await pctx.close()

  console.log('\n🖥️  Console')
  await test('tidak ada error di console browser', async () => {
    expect(consoleErrors.length === 0, `${consoleErrors.length} error:\n${consoleErrors.slice(0, 5).join('\n')}`)
  })
} finally {
  await browser.close()
  await server.close()
}

console.log(`\n${failed ? `❌ ${failed} uji gagal` : '✅ Semua uji browser lulus'} (${passed} lulus)\n`)
if (failed) process.exitCode = 1
