// =====================================================================
// Mesin aljabar kecil untuk memeriksa jawaban uraian.
// Bentuk aljabar diubah menjadi polinomial (kumpulan suku), sehingga
// "2(x + 3)" dikenali setara dengan "2x + 6".
//
// Yang didukung: bilangan, variabel satu huruf (a-z), + − × · * : ÷ /,
// pangkat (^2, ², ³), tanda kurung, perkalian tersirat (2x, 3xy, 2(x+1)).
// =====================================================================

const SUPERSCRIPT = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9' }
const UNITS = /(cm|meter|tahun|rupiah|kg|gram|butir|buah|pensil|kelereng|orang)$/
const EPS = 1e-9

/** Merapikan tulisan jawaban siswa agar bisa dibaca mesin */
export function normalize(input) {
  let s = String(input ?? '').toLowerCase().trim()
  if (s.includes('=')) s = s.slice(s.lastIndexOf('=') + 1)
  s = s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, (m) => '^' + [...m].map((c) => SUPERSCRIPT[c]).join(''))
  s = s.replace(/[−–—]/g, '-').replace(/[×·⋅∙]/g, '*').replace(/[:÷]/g, '/')
  s = s.replace(/rp\.?\s*(?=\d)/g, '')
  s = s.replace(/\s+/g, '')
  s = s.replace(UNITS, '')
  s = s.replace(/(\d)\.(?=\d{3}(?!\d))/g, '$1') // pemisah ribuan: 41.000 -> 41000
  s = s.replace(/,/g, '.') // koma desimal
  return s
}

/* ------------------------------------------------------------ Polinomial */
const keyOf = (vars) =>
  Object.keys(vars)
    .filter((v) => vars[v] !== 0)
    .sort()
    .map((v) => (vars[v] === 1 ? v : `${v}^${vars[v]}`))
    .join('*')

export class Poly {
  constructor(terms = new Map()) {
    this.terms = terms // key -> { c: koefisien, v: { x: pangkat } }
  }
  static num(n) {
    const p = new Poly()
    if (Math.abs(n) > EPS) p.terms.set('', { c: n, v: {} })
    return p
  }
  static variable(name) {
    const p = new Poly()
    p.terms.set(name, { c: 1, v: { [name]: 1 } })
    return p
  }
  clone() {
    const t = new Map()
    for (const [k, { c, v }] of this.terms) t.set(k, { c, v: { ...v } })
    return new Poly(t)
  }
  addTerm(c, v) {
    const k = keyOf(v)
    const cur = this.terms.get(k)
    const nc = (cur ? cur.c : 0) + c
    if (Math.abs(nc) < EPS) this.terms.delete(k)
    else this.terms.set(k, { c: nc, v: { ...v } })
  }
  add(other, sign = 1) {
    const r = this.clone()
    for (const { c, v } of other.terms.values()) r.addTerm(sign * c, v)
    return r
  }
  mul(other) {
    const r = new Poly()
    for (const a of this.terms.values())
      for (const b of other.terms.values()) {
        const v = { ...a.v }
        for (const [name, e] of Object.entries(b.v)) v[name] = (v[name] || 0) + e
        r.addTerm(a.c * b.c, v)
      }
    return r
  }
  div(other) {
    if (other.terms.size !== 1) throw new Error('Pembagian hanya dengan satu suku')
    const [{ c: dc, v: dv }] = other.terms.values()
    const r = new Poly()
    for (const { c, v } of this.terms.values()) {
      const nv = { ...v }
      for (const [name, e] of Object.entries(dv)) nv[name] = (nv[name] || 0) - e
      r.addTerm(c / dc, nv)
    }
    return r
  }
  pow(n) {
    if (!Number.isInteger(n) || n < 0 || n > 12) throw new Error('Pangkat tidak didukung')
    let r = Poly.num(1)
    for (let i = 0; i < n; i++) r = r.mul(this)
    return r
  }
  isConstant() {
    return [...this.terms.keys()].every((k) => k === '')
  }
  constantValue() {
    return this.terms.get('')?.c ?? 0
  }
  equals(other) {
    if (this.terms.size !== other.terms.size) return false
    for (const [k, { c }] of this.terms) {
      const o = other.terms.get(k)
      if (!o || Math.abs(o.c - c) > 1e-6) return false
    }
    return true
  }
  evaluate(values) {
    let sum = 0
    for (const { c, v } of this.terms.values()) {
      let t = c
      for (const [name, e] of Object.entries(v)) {
        if (!(name in values)) throw new Error(`Nilai ${name} belum diketahui`)
        t *= values[name] ** e
      }
      sum += t
    }
    return sum
  }
}

/* ------------------------------------------------------------ Parser */
function tokenize(s) {
  const tokens = []
  let i = 0
  while (i < s.length) {
    const ch = s[i]
    if (/\d/.test(ch)) {
      let j = i
      while (j < s.length && /[\d.]/.test(s[j])) j++
      const num = Number(s.slice(i, j))
      if (Number.isNaN(num)) throw new Error('Angka tidak valid')
      tokens.push({ t: 'num', v: num })
      i = j
    } else if (/[a-z]/.test(ch)) {
      tokens.push({ t: 'var', v: ch })
      i++
    } else if ('+-*/^()'.includes(ch)) {
      tokens.push({ t: ch })
      i++
    } else {
      throw new Error(`Karakter "${ch}" tidak dikenali`)
    }
  }
  return tokens
}

export function parse(input) {
  const s = normalize(input)
  if (!s) throw new Error('Jawaban kosong')
  const tokens = tokenize(s)
  let pos = 0
  const peek = () => tokens[pos]
  const take = (t) => {
    if (peek()?.t !== t) throw new Error(`Diharapkan "${t}"`)
    return tokens[pos++]
  }

  // expr := term (('+' | '-') term)*
  function expr() {
    let left = term()
    while (peek() && (peek().t === '+' || peek().t === '-')) {
      const op = tokens[pos++].t
      left = left.add(term(), op === '+' ? 1 : -1)
    }
    return left
  }
  // term := implicit (('*' | '/') implicit)*
  // perkalian tersirat (2x, 3(x+1)) diikat lebih kuat: 8x² : 2x = (8x²) : (2x)
  function term() {
    let left = implicit()
    while (peek() && (peek().t === '*' || peek().t === '/')) {
      const op = tokens[pos++].t
      const right = implicit()
      left = op === '*' ? left.mul(right) : left.div(right)
    }
    return left
  }
  function implicit() {
    let left = unary()
    while (peek() && (peek().t === 'num' || peek().t === 'var' || peek().t === '(')) left = left.mul(power())
    return left
  }
  function unary() {
    if (peek()?.t === '-') {
      pos++
      return unary().mul(Poly.num(-1))
    }
    if (peek()?.t === '+') {
      pos++
      return unary()
    }
    return power()
  }
  function power() {
    let base = primary()
    while (peek()?.t === '^') {
      pos++
      const neg = peek()?.t === '-' ? (pos++, -1) : 1
      const e = take('num').v * neg
      base = base.pow(e)
    }
    return base
  }
  function primary() {
    const tk = peek()
    if (!tk) throw new Error('Jawaban terpotong')
    if (tk.t === 'num') {
      pos++
      return Poly.num(tk.v)
    }
    if (tk.t === 'var') {
      pos++
      return Poly.variable(tk.v)
    }
    if (tk.t === '(') {
      pos++
      const inner = expr()
      take(')')
      return inner
    }
    throw new Error('Susunan jawaban tidak dikenali')
  }

  const result = expr()
  if (pos !== tokens.length) throw new Error('Susunan jawaban tidak dikenali')
  return result
}

/** Coba parse, kembalikan null jika gagal */
export function tryParse(input) {
  try {
    return parse(input)
  } catch {
    return null
  }
}

export function equivalent(a, b) {
  const pa = typeof a === 'string' ? tryParse(a) : a
  const pb = typeof b === 'string' ? tryParse(b) : b
  return !!pa && !!pb && pa.equals(pb)
}

/**
 * Apakah tulisan sudah dalam bentuk paling sederhana?
 * Syarat: tanpa kurung/kali/bagi, setiap suku berbentuk [angka][variabel berpangkat],
 * huruf tidak berulang dalam satu suku, dan tidak ada suku sejenis yang belum digabung.
 */
export function isSimplified(input) {
  const s = normalize(input)
  if (!s || /[()*/]/.test(s)) return false
  const terms = s.match(/[+-]?[^+-]+/g)
  if (!terms) return false
  const seen = new Set()
  for (const raw of terms) {
    const t = raw.replace(/^[+-]/, '')
    if (!/^(\d+(\.\d+)?)?([a-z](\^\d+)?)*$/.test(t) || t === '') return false
    const letters = t.replace(/[^a-z]/g, '')
    if (new Set(letters).size !== letters.length) return false
    const p = tryParse(raw)
    if (!p) return false
    if (p.terms.size === 0) return terms.length === 1 // "0" boleh jika satu-satunya suku
    const key = [...p.terms.keys()][0]
    if (seen.has(key)) return false
    seen.add(key)
  }
  return true
}
