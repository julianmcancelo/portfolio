import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const ROLES = ['mobile developer', 'web developer', 'systems analyst', 'flutter engineer']

function useTypewriter(words, speed = 110) {
  const [text, setText] = useState('')
  const [wi, setWi] = useState(0)
  const [ci, setCi] = useState(0)
  const [del, setDel] = useState(false)

  useEffect(() => {
    const word = words[wi]
    const id = setTimeout(() => {
      if (!del) {
        setText(word.slice(0, ci + 1))
        if (ci + 1 === word.length) setTimeout(() => setDel(true), 1800)
        else setCi(c => c + 1)
      } else {
        setText(word.slice(0, ci - 1))
        if (ci - 1 === 0) {
          setDel(false)
          setWi(w => (w + 1) % words.length)
          setCi(0)
        } else setCi(c => c - 1)
      }
    }, del ? speed * 0.5 : speed)
    return () => clearTimeout(id)
  }, [ci, del, wi, words, speed])

  return text
}

function ScrambleText({ text, className }) {
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%'
  const [display, setDisplay] = useState(text)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (done) return
    let iter = 0
    const interval = setInterval(() => {
      setDisplay(
        text.split('').map((char, i) => {
          if (char === ' ') return ' '
          if (i < iter) return text[i]
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join('')
      )
      iter += 0.5
      if (iter >= text.length) { setDisplay(text); setDone(true); clearInterval(interval) }
    }, 40)
    return () => clearInterval(interval)
  }, [text])

  return <span className={className}>{display}</span>
}

export default function Hero() {
  const role = useTypewriter(ROLES)
  const ref = useRef()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y   = useTransform(scrollYProgress, [0, 1], [0, -120])
  const op  = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(123,97,255,0.12) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)' }} />

      <motion.div style={{ y, opacity: op }} className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 mb-10 rounded-full border text-sm font-mono font-medium text-purple-300"
          style={{ borderColor: 'rgba(123,97,255,0.25)', background: 'rgba(123,97,255,0.06)' }}
        >
          <span className="w-2 h-2 rounded-full bg-green-400" style={{ boxShadow: '0 0 8px #4ade80', animation: 'pulse 2s infinite' }} />
          Disponible para proyectos · Buenos Aires, AR
        </motion.div>

        {/* Main title */}
        <div className="overflow-hidden">
          <motion.h1
            className="font-display font-bold leading-none tracking-tighter text-white block"
            style={{ fontSize: 'clamp(72px, 13vw, 180px)' }}
            initial={{ y: '105%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            JULIÁN
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            className="font-display font-bold leading-none tracking-tighter block outlined-text"
            style={{ fontSize: 'clamp(72px, 13vw, 180px)' }}
            initial={{ y: '105%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          >
            <ScrambleText text="CANCELO" />
          </motion.h1>
        </div>

        {/* Role typewriter */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mt-8 font-mono text-lg md:text-xl text-gray-400"
        >
          {'>'}{' '}
          <span className="text-purple-400">{role}</span>
          <span className="text-purple-300 animate-pulse">▌</span>
        </motion.p>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-2 text-sm font-mono text-gray-600 tracking-wide"
        >
          Analista de Sistemas · Ciberseguridad · 4+ años construyendo productos reales
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="flex gap-4 mt-10 flex-wrap"
        >
          <a
            href="#proyectos"
            className="group relative px-8 py-4 rounded-xl font-semibold text-white overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #7B61FF, #A78BFA)' }}
          >
            <span className="relative z-10">Ver proyectos →</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, #6B51EF, #7B61FF)' }} />
          </a>
          <a
            href="#contacto"
            className="px-8 py-4 rounded-xl font-semibold text-gray-300 hover:text-white border border-white/10 hover:border-white/25 backdrop-blur-sm transition-all duration-200"
          >
            Hablar conmigo
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-gray-700 uppercase">scroll</span>
          <div className="w-px h-14" style={{ background: 'linear-gradient(to bottom, rgba(123,97,255,0.6), transparent)' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
