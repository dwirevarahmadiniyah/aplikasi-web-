// =====================================================================
// DREAM BUDDIES - 7 boneka chibi hewan berbulu.
// Ilustrasi digambar sendiri dengan SVG (src/components/Chibi.jsx),
// tidak memakai foto atau gambar resmi.
//
// Properti warna:
//   fur    = warna bulu utama (kepala, badan, tangan)
//   light  = warna bulu terang (wajah bawah, perut)
//   dark   = warna corak (loreng, ujung telinga, telapak, kaki)
//   inner  = warna bagian dalam telinga
//   accent = warna simbol matematika di dada
//
// CARA MEMAKAI GAMBAR SENDIRI:
//   1. Simpan gambar (PNG/SVG/WebP) di folder  public/chibi/  , misal public/chibi/eong.png
//   2. Isi properti  image: 'chibi/eong.png'  pada karakter di bawah.
//   Jika `image` diisi, gambar itu dipakai menggantikan ilustrasi SVG.
//   Pastikan kamu punya izin memakai gambar tersebut.
// =====================================================================

/** Pesan motivasi yang diucapkan karakter chibi */
export const motivasi = {
  umum: [
    'Belajar sedikit setiap hari lebih baik daripada banyak sekaligus. Ayo mulai!',
    'Salah itu biasa. Dari kesalahan kita jadi tahu bagian mana yang perlu dipelajari lagi.',
    'Kalau bingung, baca pelan-pelan langkah demi langkah. Kamu pasti bisa!',
    'Aljabar itu seperti teka-teki. Seru kalau kita tahu caranya!',
    'Jangan lupa istirahat sebentar kalau sudah lelah, ya.',
  ],
  bagus: [
    'Keren banget! Usahamu terbayar. Pertahankan, ya!',
    'Wah, hebat! Kamu sudah paham konsepnya.',
    'Mantap! Ayo lanjut ke bab berikutnya.',
  ],
  semangat: [
    'Tidak apa-apa, ini bagian dari belajar. Baca pembahasannya, lalu coba lagi!',
    'Sedikit lagi! Perhatikan tanda + dan − dengan teliti, ya.',
    'Ayo ulangi materinya sebentar, nanti pasti lebih lancar.',
  ],
}

export const buddies = [
  {
    id: 'eong', name: 'Eong', animal: 'tiger', image: null,
    fur: '#FFD66B', light: '#FFF4D6', dark: '#F2A541', inner: '#FFC1A1', accent: '#E8862A',
    expression: 'cheeky', symbol: '+',
    role: 'Si macan pemberani pecinta penjumlahan',
    quote: 'Ayo jumlahkan semangatmu hari ini!',
  },
  {
    id: 'jjun', name: 'Jjun', animal: 'fox', image: null,
    fur: '#F28C4B', light: '#FFF8F0', dark: '#C9652B', inner: '#FFE8D9', accent: '#E0702F',
    expression: 'sparkle', symbol: '−',
    role: 'Si rubah cerdik ahli pengurangan',
    quote: 'Kurangi ragu, tambah percaya diri!',
  },
  {
    id: 'jjed', name: 'Jjed', animal: 'dog', image: null,
    fur: '#FFFAF6', light: '#FFFFFF', dark: '#F7C9D6', inner: '#FFB3C7', accent: '#E0558A',
    expression: 'happy', symbol: '×',
    role: 'Si anjing setia jago perkalian',
    quote: 'Ilmu yang dibagi akan berlipat ganda!',
  },
  {
    id: 'jjopo', name: 'Jjopo', animal: 'bear', image: null,
    fur: '#B97C4E', light: '#F5DEC4', dark: '#8E5A34', inner: '#E8B98C', accent: '#9A5F33',
    expression: 'wink', symbol: '÷',
    role: 'Si beruang hangat ahli pembagian',
    quote: 'Masalah besar? Bagi jadi langkah kecil!',
  },
  {
    id: 'kkyuping', name: 'Kkyuping', animal: 'rabbit', image: null,
    fur: '#FFD3E0', light: '#FFF0F5', dark: '#F7AFC6', inner: '#FF9DBB', accent: '#F2558A',
    expression: 'surprised', symbol: 'x',
    role: 'Si kelinci penasaran pemburu variabel',
    quote: 'Wah, x itu ternyata bisa dicari!',
  },
  {
    id: 'lemyo', name: 'Lemyo', animal: 'cat', image: null,
    fur: '#FFFFFF', light: '#FFFFFF', dark: '#B4B8C7', inner: '#FFD6E2', accent: '#7A7F96',
    expression: 'calm', symbol: '=',
    role: 'Si kucing tenang penjaga keseimbangan',
    quote: 'Pelan-pelan saja, pasti bisa!',
  },
  {
    id: 'bamjji', name: 'Bamjji', animal: 'hamster', image: null,
    fur: '#EDCFA8', light: '#FFF9F0', dark: '#A8714A', inner: '#FFC1D3', accent: '#A8714A',
    expression: 'sparkle', symbol: 'y',
    role: 'Si hamster mungil yang cerdas',
    quote: 'Belajar sambil main itu paling seru!',
  },
]
