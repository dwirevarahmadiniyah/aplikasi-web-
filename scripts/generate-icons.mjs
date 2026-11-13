// Membuat ikon PWA (PNG) tanpa library tambahan.
// Jalankan: npm run icons
// Hasil: public/icons/icon-192.png, icon-512.png, apple-touch-icon.png (180x180)
import fs from 'node:fs'
import zlib from 'node:zlib'
import path from 'node:path'

const OUT = path.resolve('public/icons')
fs.mkdirSync(OUT, { recursive: true })

const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]
const PINK = hex('#FFB5CC'), LAV = hex('#CDB4FF'), SKIN = hex('#FFE8DC'), HAIR = hex('#5B3A29')
const EYE = hex('#3D2C4A'), BLUSH = hex('#FF9DBB'), MOUTH = hex('#E5677F'), WHITE = [255, 255, 255]
const MINT = hex('#A8E6CF'), BLUE = hex('#A7D8FF')

const inEllipse = (x, y, cx, cy, rx, ry) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1
const inStar = (x, y, cx, cy, r) => Math.abs(x - cx) ** (2 / 3) + Math.abs(y - cy) ** (2 / 3) <= r ** (2 / 3)
const inArc = (x, y, cx, cy, r, t) => {
  const d = Math.hypot(x - cx, y - cy)
  return y <= cy + 0.4 && Math.abs(d - r) <= t / 2
}

// Warna untuk satu titik (koordinat 0..100)
function sample(x, y) {
  const t = (x + y) / 200
  let c = PINK.map((p, i) => p + (LAV[i] - p) * t)
  // gelembung dekorasi
  if (inEllipse(x, y, 16, 84, 9, 9)) c = c.map((v, i) => v * 0.7 + MINT[i] * 0.3)
  if (inEllipse(x, y, 86, 16, 8, 8)) c = c.map((v, i) => v * 0.7 + BLUE[i] * 0.3)
  // rambut belakang
  if (inEllipse(x, y, 50, 47, 29, 27)) c = HAIR
  // badan kecil
  if (inEllipse(x, y, 50, 86, 16, 10)) c = hex('#FF8FB1')
  // wajah
  if (inEllipse(x, y, 50, 55, 25, 22)) c = SKIN
  // poni bergelombang
  const fringeY = 40 + 5 * Math.abs(Math.sin(((x - 22) / 56) * Math.PI * 3))
  if (inEllipse(x, y, 50, 47, 29, 27) && y < fringeY) c = HAIR
  // pipi merona
  if (inEllipse(x, y, 35, 64, 4.5, 2.6) || inEllipse(x, y, 65, 64, 4.5, 2.6)) c = BLUSH
  // mata senyum ^ ^
  if (inArc(x, y, 41, 59, 4.2, 1.9) || inArc(x, y, 59, 59, 4.2, 1.9)) c = EYE
  // mulut
  if (y >= 64 && Math.hypot(x - 50, y - 64) <= 4) c = MOUTH
  // bintang
  if (inStar(x, y, 22, 24, 6) || inStar(x, y, 80, 74, 4.5) || inStar(x, y, 84, 34, 3)) c = WHITE
  return c
}

function render(size) {
  const SS = 4 // supersampling agar tepi halus
  const raw = Buffer.alloc((size * 4 + 1) * size)
  for (let py = 0; py < size; py++) {
    raw[py * (size * 4 + 1)] = 0 // filter: none
    for (let px = 0; px < size; px++) {
      let r = 0, g = 0, b = 0
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const x = ((px + (sx + 0.5) / SS) / size) * 100
          const y = ((py + (sy + 0.5) / SS) / size) * 100
          const c = sample(x, y)
          r += c[0]; g += c[1]; b += c[2]
        }
      }
      const n = SS * SS
      const o = py * (size * 4 + 1) + 1 + px * 4
      raw[o] = Math.round(r / n); raw[o + 1] = Math.round(g / n); raw[o + 2] = Math.round(b / n); raw[o + 3] = 255
    }
  }
  return encodePNG(size, size, raw)
}

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  return c >>> 0
})
function crc32(buf) {
  let c = 0xffffffff
  for (const byte of buf) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length)
  const td = Buffer.concat([Buffer.from(type, 'ascii'), data])
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td))
  return Buffer.concat([len, td, crc])
}
function encodePNG(w, h, raw) {
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4)
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

for (const [name, size] of [['icon-192.png', 192], ['icon-512.png', 512], ['apple-touch-icon.png', 180]]) {
  fs.writeFileSync(path.join(OUT, name), render(size))
  console.log('✔ dibuat', name, `${size}x${size}`)
}
