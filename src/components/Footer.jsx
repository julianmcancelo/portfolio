export default function Footer() {
  return (
    <footer className="relative z-10 py-10 border-t" style={{ borderColor: 'rgba(200,255,0,0.08)' }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-pixel text-[7px] text-neon glow-neon">JC_</span>
        <p className="font-mono text-xs text-center" style={{ color: '#555580' }}>
          JULIAN MANUEL CANCELO · LANUS, BUENOS AIRES · 2026
        </p>
        <span className="font-pixel text-[7px]" style={{ color: '#333355' }}>GAME OVER?_</span>
      </div>
    </footer>
  )
}
