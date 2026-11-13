// Mengambil screenshot halaman utama untuk pemeriksaan tampilan.
// Pakai: npm run build  lalu  node scripts/screenshots.mjs <folder-output>
import { preview } from 'vite'
import { chromium } from 'playwright-core'
import fs from 'node:fs'
import path from 'node:path'

const out = path.resolve(process.argv[2] || 'screenshots')
fs.mkdirSync(out, { recursive: true })
const server = await preview({ preview: { port: 4181, strictPort: true }, logLevel: 'silent' })
const browser = await chromium.launch({ channel: 'msedge', headless: true }).catch(() => chromium.launch({ channel: 'chrome', headless: true }))
const BASE = 'http://localhost:4181/'

async function shoot(ctxOpts, name, hash, action) {
  const ctx = await browser.newContext(ctxOpts)
  const page = await ctx.newPage()
  await page.goto(BASE + '#' + hash)
  await page.waitForSelector('main .page')
  if (action) await action(page)
  await page.waitForTimeout(500)
  await page.screenshot({ path: path.join(out, name + '.png'), fullPage: !!ctxOpts.full })
  await ctx.close()
}

const phone = { viewport: { width: 375, height: 812 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true }
const laptop = { viewport: { width: 1280, height: 860 } }
try {
  await shoot(phone, 'm-home', 'beranda')
  await shoot(phone, 'm-materi', 'materi-bab3', (p) => p.mouse.wheel(0, 1900))
  await shoot(phone, 'm-latihan', 'latihan-bab5', async (p) => {
    await p.locator('.option').nth(1).click()
    await p.locator('.option').nth(4).click()
    await p.locator('.answer-input').first().fill('10y − 15')
    await p.mouse.wheel(0, 300)
  })
  await shoot(phone, 'm-kuis', 'kuis', (p) => p.getByRole('button', { name: 'Mulai Kuis' }).click())
  await shoot(phone, 'm-review', 'latihan-bab7', async (p) => {
    await p.locator('.option').nth(1).click()
    await p.locator('.answer-input').first().fill('3a+7')
    await p.locator('.answer-input').nth(1).fill('4(x+2)-3x')
    await p.getByRole('button', { name: 'Kumpulkan Latihan' }).click()
    await p.getByRole('button', { name: 'Ya, kumpulkan' }).click()
    await p.waitForSelector('.score-ring')
    await p.locator('.review-item').nth(4).scrollIntoViewIfNeeded()
  })
  await shoot(phone, 'm-contoh', 'contoh-bab5', async (p) => {
    await p.locator('.contoh-card').nth(2).getByRole('button', { name: 'Lihat Pembahasan' }).click()
    await p.locator('.contoh-card').nth(2).scrollIntoViewIfNeeded()
  })
  await shoot(laptop, 'd-kuis-confirm', 'kuis', async (p) => {
    await p.getByRole('button', { name: 'Mulai Kuis' }).click()
    await p.locator('.option').first().click()
    await p.getByRole('button', { name: 'Selesai & Kumpulkan Kuis' }).click()
  })
  await shoot(laptop, 'd-login', 'login')
  await shoot(laptop, 'd-hasil', 'hasil')
  console.log('Screenshot tersimpan di', out)
} finally {
  await browser.close()
  await server.close()
}
