import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { num: 1000, suffix: '+', label: 'Usuarios activos en Bitácora Docente' },
  { num: 4,   suffix: '+', label: 'Años desarrollando apps y sistemas' },
  { num: 30,  suffix: '+', label: 'Repositorios públicos en GitHub' },
  { num: 2,   suffix: '',  label: 'Carreras universitarias en curso' },
]

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef()
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1600
    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(ease * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target])

  return (
    <span ref={ref} className="font-display text-4xl md:text-5xl font-bold gradient-text">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }
  })
}

export default function About() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="sobre-mi" ref={ref} className="py-28 md:py-40">
      <div className="max-w-6xl mx-auto px-6">
        {/* Label */}
        <motion.p
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="font-mono text-xs text-purple-400 tracking-[0.2em] uppercase mb-6"
        >
          01 — Sobre mí
        </motion.p>

        <div className="grid md:grid-cols-[1fr_340px] gap-16 md:gap-24 items-start">
          {/* Text */}
          <div>
            <motion.h2
              variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0.5}
              className="font-display text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-8"
            >
              Construyo software que funciona
              <br />
              <span className="gradient-text">cuando importa.</span>
            </motion.h2>

            {[
              'Soy de Lanús, Buenos Aires. Terminando mi carrera como Analista de Sistemas y cursando Ciberseguridad en paralelo — porque siempre creí que la seguridad tiene que estar en el diseño, no como parche al final.',
              'Me especialicé en desarrollo mobile con Flutter y en arquitecturas que aguantan offline, se sincronizan solas y no fallan cuando el docente está en el aula sin señal. Ese problema concreto me llevó a construir Bitácora Docente, una app con más de 1.000 usuarios activos en Argentina.',
              'También construyo sistemas de gestión, backends en Node.js y TypeScript, e-commerce, y herramientas internas. Lo que más me interesa es resolver problemas reales — no demos que se ven bien pero no escalan.',
            ].map((p, i) => (
              <motion.p
                key={i}
                variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1 + i * 0.3}
                className="text-gray-400 leading-relaxed mb-4 text-base md:text-lg"
              >
                {p}
              </motion.p>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ num, suffix, label }, i) => (
              <motion.div
                key={label}
                variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1 + i * 0.15}
                className="p-5 rounded-2xl border border-white/5 flex flex-col gap-2"
                style={{ background: 'rgba(255,255,255,0.025)' }}
                whileHover={{ borderColor: 'rgba(123,97,255,0.25)', background: 'rgba(255,255,255,0.04)' }}
                transition={{ duration: 0.2 }}
              >
                <Counter target={num} suffix={suffix} />
                <span className="text-xs text-gray-500 leading-snug">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
