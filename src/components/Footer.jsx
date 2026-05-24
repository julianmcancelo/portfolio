export default function Footer() {
  return (
    <footer className="relative z-10 py-10 border-t" style={{ borderColor: 'rgba(232,208,112,0.08)' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px' }} className="flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-pixel text-[7px] glow-gold" style={{ color: '#E8D070' }}>JC_</span>
        <p className="font-mono text-xs text-center" style={{ color: '#6868A0' }}>
          JULIAN MANUEL CANCELO · LANUS, BUENOS AIRES · 2026
        </p>
        <span className="font-pixel text-[7px]" style={{ color: '#3A3860' }}>GAME OVER?_</span>
      </div>
    </footer>
  )
}
