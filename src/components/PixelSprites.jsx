import { useState, useEffect } from 'react'

// ─── Pixel art sprites — FF1/FF2 inspired ───────────────────────────────────
// Each sprite is a 10×12 string grid. Scale = 4 → 40×48px on screen.
// Colors defined in PALETTE. '.' = transparent.

const PALETTE = {
  '.': null,
  // Skin / face
  'S': '#FFCC88', 'D': '#CC8844',
  // Black Mage
  'Y': '#E8A020', 'y': '#A06010',
  'K': '#111122', 'k': '#000008',
  'W': '#F0F0FF', 'w': '#AAAACC',
  'B': '#2048C8', 'b': '#0C2070',
  // Fighter
  'A': '#4472CC', 'a': '#1A3888',
  'R': '#CC2020', 'r': '#881010',
  'G': '#B0B8C8', 'g': '#606878',
  // White Mage
  'O': '#F8F0E0', 'o': '#C8C0A8',
  'P': '#882288', 'p': '#441044',
  // Thief
  'T': '#CC5500', 't': '#883300',
  'L': '#884420', 'l': '#552210',
  // Shared
  'N': '#0A0A0A', 'n': '#222222',
  'C': '#40C8E0', 'c': '#208898', // crystal/cyan
  'Z': '#F8F060',                 // gold/yellow
}

// 10×12 sprites — 2 walk frames each
const SPRITES = {
  blackMage: {
    frames: [
      // Frame 1
      [
        '..YYYYY...',
        '.YYYYYYY..',
        'yYYYYYYYy.',
        '.KKKKKKKK.',
        '..Kw.wKK..',
        '...KKKK...',
        '.bBBBBBb..',
        'bBBBBBBBb.',
        '.bBBBBBb..',
        '..bBBBb...',
        '..kB.Bk...',
        '..NN.NN...',
      ],
      // Frame 2 (legs alternate)
      [
        '..YYYYY...',
        '.YYYYYYY..',
        'yYYYYYYYy.',
        '.KKKKKKKK.',
        '..Kw.wKK..',
        '...KKKK...',
        '.bBBBBBb..',
        'bBBBBBBBb.',
        '.bBBBBBb..',
        '..bBBBb...',
        '..kBBk....',
        '..NN.NN...',
      ],
    ],
    label: 'BLK.MAGE',
    color: '#2048C8',
  },

  fighter: {
    frames: [
      [
        '...SSS....',
        '..DSSSD...',
        '.GGGGGGG..',
        'GAAARAAAG.',
        '.GaAAAAg..',
        '.GAAAAGg..',
        '.GGZZZGG..',
        '..aGGGa...',
        '..A.A.....',
        '.gAAgAg...',
        '.NA.AN....',
        '.NN.NN....',
      ],
      [
        '...SSS....',
        '..DSSSD...',
        '.GGGGGGG..',
        'GAAARAAAG.',
        '.GaAAAAg..',
        '.GAAAAGg..',
        '.GGZZZGG..',
        '..aGGGa...',
        '..A.A.....',
        '.gAg.Ag...',
        '.NA..AN...',
        '.NN..NN...',
      ],
    ],
    label: 'FIGHTER',
    color: '#4472CC',
  },

  whiteMage: {
    frames: [
      [
        '..OOOOO...',
        '.OOSSSOO..',
        '.OOSSSOO..',
        'pPOOOOOPp.',
        '.POOOOPP..',
        '.OOOOOOOO.',
        '.OoOOoOO..',
        '.OOOOOOO..',
        '..OOOOO...',
        '..O.O.....',
        '.pO.Op....',
        '.NN.NN....',
      ],
      [
        '..OOOOO...',
        '.OOSSSOO..',
        '.OOSSSOO..',
        'pPOOOOOPp.',
        '.POOOOPP..',
        '.OOOOOOOO.',
        '.OoOOoOO..',
        '.OOOOOOO..',
        '..OOOOO...',
        '..O.O.....',
        '.pOO.p....',
        '.NNN.N....',
      ],
    ],
    label: 'WHT.MAGE',
    color: '#882288',
  },

  thief: {
    frames: [
      [
        '..DSSSD...',
        '..SSSSS...',
        '.lTTTTTl..',
        'TTTTTTTTT.',
        '.tTTTTTt..',
        '.TTTLTTT..',
        '.TlLLLlT..',
        '..tTTTt...',
        '..T.T.....',
        '.lT.Tl....',
        '.NT.TN....',
        '.NN.NN....',
      ],
      [
        '..DSSSD...',
        '..SSSSS...',
        '.lTTTTTl..',
        'TTTTTTTTT.',
        '.tTTTTTt..',
        '.TTTLTTT..',
        '.TlLLLlT..',
        '..tTTTt...',
        '..T.T.....',
        '.lTT.l....',
        '.NTT.N....',
        '.NNN.N....',
      ],
    ],
    label: 'THIEF',
    color: '#CC5500',
  },
}

const SCALE = 4

function PixelChar({ rows, scale = SCALE }) {
  const h = rows.length
  const w = Math.max(...rows.map(r => r.length))
  const rects = []

  rows.forEach((row, y) => {
    row.split('').forEach((ch, x) => {
      const fill = PALETTE[ch]
      if (!fill) return
      rects.push(
        <rect key={`${x}-${y}`} x={x * scale} y={y * scale} width={scale} height={scale} fill={fill} />
      )
    })
  })

  return (
    <svg
      width={w * scale}
      height={h * scale}
      viewBox={`0 0 ${w * scale} ${h * scale}`}
      style={{ imageRendering: 'pixelated', display: 'block', shapeRendering: 'crispEdges' }}
    >
      {rects}
    </svg>
  )
}

// Animated walking character
function WalkingChar({ sprite, delay = 0 }) {
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setFrame(f => (f + 1) % sprite.frames.length), 220)
    return () => clearInterval(id)
  }, [sprite.frames.length])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <PixelChar rows={sprite.frames[frame]} />
      <span style={{
        fontFamily: '"Press Start 2P", monospace',
        fontSize: 5,
        color: sprite.color,
        letterSpacing: 1,
        textShadow: `0 0 8px ${sprite.color}`,
        whiteSpace: 'nowrap',
      }}>
        {sprite.label}
      </span>
    </div>
  )
}

// Party marching across the hero section
export function WalkingParty() {
  return (
    <div style={{ display: 'flex', gap: 28, alignItems: 'flex-end' }}>
      {Object.values(SPRITES).map((sp, i) => (
        <WalkingChar key={sp.label} sprite={sp} delay={i * 80} />
      ))}
    </div>
  )
}

// FF-style crystal decoration
const CRYSTAL = [
  '...CCC....',
  '..CCCCC...',
  '.CCcCCcCC.',
  'CCcCCCcCCC',
  '.CCCcCCCC.',
  '..CCCCCCC.',
  '...cCcCC..',
  '....CCC...',
  '....cCC...',
  '.....C....',
]

export function PixelCrystal({ scale = 3 }) {
  return <PixelChar rows={CRYSTAL} scale={scale} />
}

// HP bar — FF style
export function HPBar({ label = 'HP', value = 100, max = 100 }) {
  const pct = Math.max(0, Math.min(1, value / max))
  const barColor = pct > 0.5 ? '#40E840' : pct > 0.25 ? '#E8E020' : '#E82020'

  return (
    <div style={{ fontFamily: '"Press Start 2P", monospace', fontSize: 7 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, color: '#AAAACC' }}>
        <span>{label}</span>
        <span style={{ color: barColor }}>{value}/{max}</span>
      </div>
      <div style={{
        height: 8,
        background: '#0A0A1A',
        border: '1px solid #333366',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${pct * 100}%`,
          height: '100%',
          background: barColor,
          boxShadow: `0 0 6px ${barColor}`,
          transition: 'width 1.2s ease-out',
        }} />
      </div>
    </div>
  )
}
