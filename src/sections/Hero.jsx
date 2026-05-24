import { useState, useEffect } from 'react'
import { WalkingParty, PixelCrystal } from '../components/PixelSprites'

const ROLES = ['MOBILE DEV', 'WEB DEV', 'SYS ANALYST', 'FLUTTER ENG']

function useTypewriter(words, speed = 120) {
  const [text, setText] = useState('')
  const [wi, setWi]   = useState(0)
  const [ci, setCi]   = useState(0)
  const [del, setDel] = useState(false)
  useEffect(() => {
    const word = words[wi]
    const id = setTimeout(() => {
      if (!del) {
        setText(word.slice(0, ci + 1))
        if (ci + 1 === word.length) setTimeout(() => setDel(true), 1600)
        else setCi(c => c + 1)
      } else {
        setText(word.slice(0, ci - 1))
        if (ci - 1 === 0) { setDel(false); setWi(w => (w + 1) % words.length); setCi(0) }
        else setCi(c => c - 1)
      }
    }, del ? speed * 0.4 : speed)
    return () => clearTimeout(id)
  }, [ci, del, wi, words, speed])
  return text
}

function useClock() {
  const [t, setT] = useState('')
  useEffect(() => {
    const fmt = () => {
      const d = new Date()
      return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`
    }
    setT(fmt())
    const id = setInterval(() => setT(fmt()), 1000)
    return () => clearInterval(id)
  }, [])
  return t
}

export default function Hero() {
  const role  = useTypewriter(ROLES)
  const clock = useClock()

  const titleStyle = {
    fontFamily: '"Space Grotesk", system-ui, sans-serif',
    fontWeight: 800,
    lineHeight: 1,
    letterSpacing: '-0.04em',
    fontSize: 'clamp(64px, 12vw, 160px)',
    animation: 'slideUp 0.85s cubic-bezier(0.22,1,0.36,1) both',
  }

  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 80 }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px', width: '100%', paddingBottom: 80 }}>

        {/* HUD bar */}
        <div className="font-mono text-xs flex items-center justify-between mb-12 pb-3"
          style={{ borderBottom: '1px solid rgba(232,208,112,0.1)', color: '#6868A0', animation: 'fadeIn 0.6s 0.2s both' }}>
          <span>PLAYER_01 // BUENOS_AIRES_AR</span>
          <span className="font-pixel text-[8px] glow-gold" style={{ color: '#E8D070' }}>{clock}</span>
          <span className="hidden sm:block">LVL.04 | XP: 1000+</span>
        </div>

        {/* Title */}
        <div style={{ overflow: 'hidden' }}>
          <h1 style={{ ...titleStyle, color: '#F0F0FF' }}>JULIÁN</h1>
        </div>
        <div style={{ overflow: 'hidden', marginBottom: 32 }}>
          <h1 style={{
            ...titleStyle,
            animationDelay: '0.1s',
            WebkitTextStroke: '2px #E8D070',
            color: 'transparent',
            textShadow: '0 0 40px rgba(232,208,112,0.12)',
          }}>CANCELO</h1>
        </div>

        {/* Typewriter */}
        <p className="font-pixel text-[11px] md:text-[13px] mb-3" style={{ color: '#70B8F0', animation: 'fadeIn 0.6s 1s both' }}>
          &gt;&gt; {role}<span className="blink">_</span>
        </p>
        <p className="font-mono text-xs mb-10" style={{ color: '#6868A0', animation: 'fadeIn 0.6s 1.1s both' }}>
          /* Analista de Sistemas · Ciberseguridad · 4+ años */
        </p>

        {/* XP bars */}
        <div className="grid grid-cols-3 gap-4 max-w-md mb-10" style={{ animation: 'fadeIn 0.6s 1.2s both' }}>
          {[
            { label: 'USERS', val: '1000+', pct: 100 },
            { label: 'YEARS', val: '4+',    pct: 65 },
            { label: 'REPOS', val: '30+',   pct: 80 },
          ].map(({ label, val, pct }) => (
            <div key={label}>
              <div className="flex justify-between font-pixel text-[7px] mb-1.5" style={{ color: '#6868A0' }}>
                <span>{label}</span><span style={{ color: '#E8D070' }}>{val}</span>
              </div>
              <div className="xp-bar">
                <div className="xp-fill" style={{ width: `${pct}%`, transitionDelay: '1.5s' }} />
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-5 items-center mb-14" style={{ animation: 'fadeIn 0.6s 1.4s both' }}>
          <a href="#proyectos" className="btn-pixel">PLAY &gt;</a>
          <a href="#contacto"  className="btn-pixel-out">INSERT COIN</a>
        </div>

        {/* Walking party */}
        <div style={{ animation: 'fadeIn 0.8s 1.8s both', display: 'flex', alignItems: 'flex-end', gap: 16 }}>
          <div className="ff-window" style={{ padding: '12px 20px 10px', display: 'inline-flex', alignItems: 'flex-end', gap: 24 }}>
            <WalkingParty />
          </div>
          <div className="float" style={{ marginBottom: 8, opacity: 0.85 }}>
            <PixelCrystal scale={4} />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-pixel text-[7px] flex flex-col items-center gap-3"
        style={{ color: '#6868A0', animation: 'fadeIn 1s 2.5s both' }}>
        <span>SCROLL DOWN</span>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, #E8D070, transparent)' }} />
      </div>
    </section>
  )
}
