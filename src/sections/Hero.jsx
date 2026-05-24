import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { WalkingParty, PixelCrystal } from '../components/PixelSprites'

const ROLES = ['MOBILE DEV', 'WEB DEV', 'SYS ANALYST', 'FLUTTER ENG']

function useTypewriter(words, speed = 120) {
  const [text, setText] = useState('')
  const [wi, setWi]     = useState(0)
  const [ci, setCi]     = useState(0)
  const [del, setDel]   = useState(false)

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

function useCountdown() {
  const [t, setT] = useState(Date.now())
  useEffect(() => { const id = setInterval(() => setT(Date.now()), 1000); return () => clearInterval(id) }, [])
  const d = new Date(t)
  return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`
}

export default function Hero() {
  const role  = useTypewriter(ROLES)
  const clock = useCountdown()
  const ref   = useRef()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y  = useTransform(scrollYProgress, [0, 1], [0, -100])
  const op = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Gradient bloom */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200,255,0,0.04) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,255,255,0.04) 0%, transparent 70%)' }} />

      <motion.div style={{ y, opacity: op }} className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-24 pb-16">

        {/* HUD top bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center justify-between mb-12 font-mono text-xs text-[#555580] border-b pb-3"
          style={{ borderColor: 'rgba(200,255,0,0.1)' }}
        >
          <span>PLAYER_01 // BUENOS_AIRES_AR</span>
          <span className="font-pixel text-[8px] text-neon">{clock}</span>
          <span className="hidden sm:block">LVL.04 &nbsp;|&nbsp; XP: 1000+</span>
        </motion.div>

        {/* Main title */}
        <div className="mb-2 overflow-hidden">
          <motion.h1
            className="font-display font-bold leading-none tracking-tighter text-white block"
            style={{ fontSize: 'clamp(64px, 12vw, 160px)' }}
            data-text="JULIÁN"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            JULIÁN
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-8">
          <motion.h1
            className="font-display font-bold leading-none tracking-tighter block"
            style={{
              fontSize: 'clamp(64px, 12vw, 160px)',
              WebkitTextStroke: '2px #C8FF00',
              color: 'transparent',
              textShadow: '0 0 40px rgba(200,255,0,0.15)',
            }}
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          >
            CANCELO
          </motion.h1>
        </div>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="font-pixel text-[11px] md:text-[13px] mb-3"
          style={{ color: '#00FFFF' }}
        >
          &gt;&gt; {role}<span className="blink">_</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="font-mono text-xs text-[#555580] mb-12"
        >
          /* Analista de Sistemas · Ciberseguridad · 4+ años */
        </motion.div>

        {/* Pixel stat bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="grid grid-cols-3 gap-4 max-w-md mb-12"
        >
          {[
            { label: 'USERS',  val: '1000+', pct: 100 },
            { label: 'YEARS',  val: '4+',    pct: 65 },
            { label: 'REPOS',  val: '30+',   pct: 80 },
          ].map(({ label, val, pct }) => (
            <div key={label}>
              <div className="flex justify-between font-pixel text-[7px] mb-1.5">
                <span style={{ color: '#555580' }}>{label}</span>
                <span style={{ color: '#C8FF00' }}>{val}</span>
              </div>
              <div className="xp-bar">
                <motion.div
                  className="xp-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ delay: 1.5, duration: 1.4, ease: 'easeOut' }}
                />
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="flex flex-wrap gap-5 items-center"
        >
          <a href="#proyectos" className="btn-pixel">PLAY &gt;</a>
          <a href="#contacto"  className="btn-pixel-outline">INSERT COIN</a>
        </motion.div>

        {/* Walking party */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-14 flex items-end gap-2"
        >
          {/* FF window frame around party */}
          <div style={{
            padding: '12px 20px 10px',
            background: '#06041A',
            border: '3px solid #6858D0',
            boxShadow: '0 0 0 1px #0A0820, 0 0 0 4px #6858D0, inset 0 0 0 1px #0A0820',
            display: 'inline-flex',
            alignItems: 'flex-end',
            gap: 24,
          }}>
            <WalkingParty />
          </div>

          {/* Crystal decoration */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            style={{ opacity: 0.85, marginBottom: 8 }}
          >
            <PixelCrystal scale={4} />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 font-pixel text-[7px] text-[#555580] flex flex-col items-center gap-3"
        >
          <span>SCROLL DOWN</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="w-px h-10"
            style={{ background: 'linear-gradient(to bottom, #C8FF00, transparent)' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
