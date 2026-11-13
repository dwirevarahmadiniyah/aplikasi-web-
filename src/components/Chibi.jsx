// Ilustrasi chibi boneka hewan berbulu berbasis SVG (kepala besar, badan kecil).
// Ganti dengan gambar sendiri lewat properti `image` di src/data/buddies.js
import { buddies } from '../data/buddies.js'

const INK = '#3D2C4A'
const MOUTH = '#E5677F'
const EDGE = { stroke: 'rgba(61,44,74,0.14)', strokeWidth: 1.6 }

/* ---------------------------------------------------------- Telinga (di belakang kepala) */
function Ears({ b }) {
  const { animal, fur, dark, inner } = b
  switch (animal) {
    case 'tiger':
      return (
        <g>
          <circle cx="26" cy="28" r="12" fill={fur} {...EDGE} />
          <circle cx="94" cy="28" r="12" fill={fur} {...EDGE} />
          <circle cx="26" cy="28" r="6" fill={inner} />
          <circle cx="94" cy="28" r="6" fill={inner} />
        </g>
      )
    case 'bear':
      return (
        <g>
          <circle cx="24" cy="30" r="13" fill={fur} {...EDGE} />
          <circle cx="96" cy="30" r="13" fill={fur} {...EDGE} />
          <circle cx="24" cy="30" r="6.5" fill={inner} />
          <circle cx="96" cy="30" r="6.5" fill={inner} />
        </g>
      )
    case 'hamster':
      return (
        <g>
          <circle cx="28" cy="27" r="9" fill={dark} {...EDGE} />
          <circle cx="92" cy="27" r="9" fill={dark} {...EDGE} />
          <circle cx="28" cy="27" r="4.5" fill={inner} />
          <circle cx="92" cy="27" r="4.5" fill={inner} />
        </g>
      )
    case 'fox':
      return (
        <g>
          <path d="M20 48 L16 2 L54 26 Z" fill={fur} {...EDGE} strokeLinejoin="round" />
          <path d="M100 48 L104 2 L66 26 Z" fill={fur} {...EDGE} strokeLinejoin="round" />
          <path d="M25 38 L22 12 L43 27 Z" fill={inner} />
          <path d="M95 38 L98 12 L77 27 Z" fill={inner} />
          <path d="M16 2 L19 18 L27 12 Z M104 2 L101 18 L93 12 Z" fill={dark} />
        </g>
      )
    case 'cat':
      return (
        <g>
          <path d="M22 42 L26 6 L54 26 Z" fill={dark} {...EDGE} strokeLinejoin="round" />
          <path d="M98 42 L94 6 L66 26 Z" fill={dark} {...EDGE} strokeLinejoin="round" />
          <path d="M28 34 L30 15 L46 26 Z" fill={inner} />
          <path d="M92 34 L90 15 L74 26 Z" fill={inner} />
        </g>
      )
    case 'rabbit':
      return (
        <g>
          <ellipse cx="42" cy="0" rx="11" ry="28" transform="rotate(-12 42 0)" fill={fur} {...EDGE} />
          <ellipse cx="78" cy="0" rx="11" ry="28" transform="rotate(12 78 0)" fill={fur} {...EDGE} />
          <ellipse cx="42" cy="2" rx="5" ry="19" transform="rotate(-12 42 2)" fill={inner} />
          <ellipse cx="78" cy="2" rx="5" ry="19" transform="rotate(12 78 2)" fill={inner} />
        </g>
      )
    default:
      return null
  }
}

/* ---------------------------------------------------------- Telinga terkulai anjing (di depan kepala) */
function FloppyEars({ b }) {
  if (b.animal !== 'dog') return null
  return (
    <g fill={b.dark} {...EDGE}>
      <ellipse cx="20" cy="56" rx="11" ry="23" transform="rotate(22 20 56)" />
      <ellipse cx="100" cy="56" rx="11" ry="23" transform="rotate(-22 100 56)" />
    </g>
  )
}

/* ---------------------------------------------------------- Corak bulu wajah */
function FaceFur({ b }) {
  const stripe = { stroke: b.dark, strokeWidth: 3.2, strokeLinecap: 'round', fill: 'none' }
  switch (b.animal) {
    case 'tiger':
      return (
        <g>
          <ellipse cx="60" cy="80" rx="20" ry="13" fill={b.light} />
          <path d="M60 28 L60 37 M51 30 L53 37 M69 30 L67 37" {...stripe} />
          <path d="M18 58 L27 60 M18 66 L26 66 M102 58 L93 60 M102 66 L94 66" {...stripe} />
        </g>
      )
    case 'fox':
    case 'hamster':
      return <path d="M17 66 Q38 58 60 74 Q82 58 103 66 Q100 96 60 98 Q20 96 17 66 Z" fill={b.light} />
    case 'cat':
      return (
        <g>
          <path d="M20 50 Q24 22 60 22 Q96 22 100 50 Q84 40 70 44 Q60 36 50 44 Q36 40 20 50 Z" fill={b.dark} />
          <path d="M22 74 L34 76 M22 81 L34 79 M98 74 L86 76 M98 81 L86 79" stroke="#B4B8C7" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      )
    case 'bear':
      return <ellipse cx="60" cy="80" rx="15" ry="10.5" fill={b.light} />
    case 'rabbit':
      return <ellipse cx="60" cy="80" rx="13" ry="9" fill={b.light} />
    case 'dog':
      return <ellipse cx="48" cy="34" rx="8" ry="5" fill={b.dark} opacity="0.55" />
    default:
      return null
  }
}

function Nose({ animal }) {
  const pink = animal === 'rabbit' || animal === 'cat' || animal === 'hamster'
  const big = animal === 'bear' || animal === 'dog'
  return <ellipse cx="60" cy="75" rx={big ? 3.4 : 2.6} ry={big ? 2.5 : 2} fill={pink ? '#F58BA6' : INK} />
}

/* ---------------------------------------------------------- Ekspresi */
function Face({ expression }) {
  const stroke = { stroke: INK, strokeWidth: 3.2, strokeLinecap: 'round', fill: 'none' }
  const bigEye = (cx) => (
    <g key={cx}>
      <ellipse cx={cx} cy="66" rx="5" ry="6.5" fill={INK} />
      <circle cx={cx + 2} cy="63" r="2" fill="#fff" />
      <circle cx={cx - 1.5} cy="68.5" r="1" fill="#fff" />
    </g>
  )
  switch (expression) {
    case 'sparkle':
      return (
        <g>
          {bigEye(45)}{bigEye(75)}
          <path d="M55 81 Q57.5 84 60 81 Q62.5 84 65 81" {...stroke} strokeWidth="2.2" />
        </g>
      )
    case 'wink':
      return (
        <g>
          {bigEye(45)}
          <path d="M69 66 Q75 60 81 66" {...stroke} />
          <path d="M54 80 Q60 87 66 80 Z" fill={MOUTH} />
        </g>
      )
    case 'surprised':
      return (
        <g>
          <circle cx="45" cy="66" r="4.5" fill={INK} />
          <circle cx="75" cy="66" r="4.5" fill={INK} />
          <circle cx="46.5" cy="64.5" r="1.5" fill="#fff" />
          <circle cx="76.5" cy="64.5" r="1.5" fill="#fff" />
          <ellipse cx="60" cy="84" rx="3.5" ry="4.5" fill={MOUTH} />
        </g>
      )
    case 'calm':
      return (
        <g>
          <path d="M40 65 Q45 70 50 65" {...stroke} />
          <path d="M70 65 Q75 70 80 65" {...stroke} />
          <path d="M53 80 Q56.5 84 60 80 Q63.5 84 67 80" {...stroke} strokeWidth="2.2" />
        </g>
      )
    case 'cheeky':
      return (
        <g>
          <path d="M39 62 L50 65 M81 62 L70 65" {...stroke} strokeWidth="2.4" />
          <circle cx="45" cy="69" r="3.6" fill={INK} />
          <circle cx="75" cy="69" r="3.6" fill={INK} />
          <circle cx="46.2" cy="67.8" r="1.2" fill="#fff" />
          <circle cx="76.2" cy="67.8" r="1.2" fill="#fff" />
          <path d="M53 80 Q60 88 67 80 Z" fill={MOUTH} />
          <path d="M55.5 80.5 L57 84 L58.5 80.5 Z M61.5 80.5 L63 84 L64.5 80.5 Z" fill="#fff" />
        </g>
      )
    case 'happy':
    default:
      return (
        <g>
          <path d="M39 67 Q45 59 51 67" {...stroke} />
          <path d="M69 67 Q75 59 81 67" {...stroke} />
          <path d="M53 80 Q60 88 67 80 Z" fill={MOUTH} />
        </g>
      )
  }
}

/**
 * <Chibi buddy={0} size={100} />
 * `buddy` boleh berupa indeks (0-6), id ('eong'), atau objek karakter.
 */
export default function Chibi({ buddy = 0, size = 100, float = true, delay = 0, className = '', showName = false }) {
  const b =
    typeof buddy === 'object' ? buddy : typeof buddy === 'number' ? buddies[buddy % buddies.length] : buddies.find((x) => x.id === buddy) || buddies[0]
  const height = Math.round(size * 1.33)
  const cheek = b.animal === 'hamster' ? { rx: 8, ry: 5 } : { rx: 6, ry: 3.5 }

  const art = b.image ? (
    <img src={b.image} alt={b.name} width={size} height={height} style={{ objectFit: 'contain' }} />
  ) : (
    <svg viewBox="-10 -34 140 186" width={size} height={height} role="img" aria-label={`Boneka chibi ${b.name}`}>
      <ellipse cx="60" cy="146" rx="27" ry="4" fill="rgba(61,44,74,0.10)" />
      {/* kaki */}
      <ellipse cx="48" cy="138" rx="10" ry="6.5" fill={b.fur} {...EDGE} />
      <ellipse cx="72" cy="138" rx="10" ry="6.5" fill={b.fur} {...EDGE} />
      <ellipse cx="48" cy="139" rx="5" ry="3" fill={b.dark} opacity="0.6" />
      <ellipse cx="72" cy="139" rx="5" ry="3" fill={b.dark} opacity="0.6" />
      {/* badan */}
      <path d="M38 96 Q30 134 44 138 L76 138 Q90 134 82 96 Z" fill={b.fur} {...EDGE} />
      <ellipse cx="60" cy="121" rx="15" ry="14" fill={b.light} />
      {b.animal === 'tiger' && <path d="M38 108 L45 110 M82 108 L75 110 M37 118 L43 119 M83 118 L77 119" stroke={b.dark} strokeWidth="3" strokeLinecap="round" />}
      {/* tangan */}
      <ellipse cx="34" cy="113" rx="7.5" ry="11" transform="rotate(30 34 113)" fill={b.fur} {...EDGE} />
      <ellipse cx="86" cy="113" rx="7.5" ry="11" transform="rotate(-30 86 113)" fill={b.fur} {...EDGE} />
      <circle cx="29" cy="121" r="4" fill={b.dark} opacity="0.55" />
      <circle cx="91" cy="121" r="4" fill={b.dark} opacity="0.55" />
      {/* lencana simbol matematika */}
      <circle cx="60" cy="122" r="8.5" fill="#fff" {...EDGE} />
      <text x="60" y="122.5" textAnchor="middle" dominantBaseline="central" fontSize="13" fontWeight="800" fill={b.accent} fontFamily="Baloo 2, Nunito, sans-serif">
        {b.symbol}
      </text>
      {/* kepala */}
      <Ears b={b} />
      <ellipse cx="60" cy="62" rx="45" ry="38" fill={b.fur} {...EDGE} />
      <FaceFur b={b} />
      <FloppyEars b={b} />
      <path d="M32 34 Q44 26 58 25" stroke="#fff" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.45" />
      {/* pipi */}
      <ellipse cx="36" cy="78" rx={cheek.rx} ry={cheek.ry} fill="#FFB3C7" opacity="0.85" />
      <ellipse cx="84" cy="78" rx={cheek.rx} ry={cheek.ry} fill="#FFB3C7" opacity="0.85" />
      <Face expression={b.expression} />
      <Nose animal={b.animal} />
    </svg>
  )

  return (
    <figure className={`chibi ${float ? 'chibi--float' : ''} ${className}`} style={{ animationDelay: `${delay}s` }}>
      {art}
      {showName && (
        <figcaption className="chibi__name" style={{ background: `color-mix(in srgb, ${b.fur} 55%, #fff)` }}>
          {b.name}
        </figcaption>
      )}
    </figure>
  )
}

export function ChibiParade({ size = 72, showName = true }) {
  return (
    <div className="chibi-parade">
      {buddies.map((b, i) => (
        <Chibi key={b.id} buddy={b} size={size} delay={i * 0.25} showName={showName} />
      ))}
    </div>
  )
}
