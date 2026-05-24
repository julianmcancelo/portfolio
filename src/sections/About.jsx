import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const skills = [
  { label: 'Flutter / Dart',     pct: 95, color: '#C8FF00' },
  { label: 'Firebase',           pct: 90, color: '#00FFFF' },
  { label: 'Node.js / TS',       pct: 82, color: '#C8FF00' },
  { label: 'React / Vue',        pct: 78, color: '#00FFFF' },
  { label: 'Ciberseguridad',     pct: 60, color: '#FF00C8' },
]

const lore = [
  'Soy de Lanús, Buenos Aires. Terminando Analista de Sistemas y cursando Ciberseguridad en paralelo — porque la seguridad tiene que estar en el diseño, no como parche al final.',
  'Me especialicé en arquitecturas offline-first con Flutter y Firebase. Eso me llevó a construir Bitácora Docente, una app con más de 1.000 usuarios activos que funciona sin internet en el aula.',
  'También construyo sistemas de gestión, backends en Node.js, e-commerce y herramientas internas. Me interesa resolver problemas reales — no demos que se ven bien pero no escalan.',
]

function SkillBar({ label, pct, color, delay }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref}>
      <div className="flex justify-between font-pixel text-[7px] mb-2">
        <span className="text-[#555580]">{label}</span>
        <span style={{ color }}>{pct}%</span>
      </div>
      <div className="xp-bar">
        <motion.div
          className="xp-fill"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)`, boxShadow: `0 0 8px ${color}` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1.4, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export default function About() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="sobre-mi" ref={ref} className="py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="font-pixel text-[8px] text-neon mb-2 tracking-widest glow-neon"
        >
          LEVEL_01
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="font-mono text-xs text-[#555580] mb-14"
        >
          // PLAYER_STATS &amp; LORE
        </motion.p>

        <div className="grid md:grid-cols-[1fr_380px] gap-16 items-start">
          {/* Lore */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-3xl md:text-4xl font-bold leading-tight mb-8 text-white"
            >
              Construyo software que funciona{' '}
              <span style={{ color: '#C8FF00', textShadow: '0 0 20px rgba(200,255,0,0.4)' }}>
                cuando importa.
              </span>
            </motion.h2>

            {lore.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                className="font-mono text-sm leading-relaxed mb-4"
                style={{ color: '#7777AA' }}
              >
                <span style={{ color: '#C8FF00' }}>&gt;</span> {p}
              </motion.p>
            ))}

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
              className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {[
                { val: '1K+', label: 'USUARIOS' },
                { val: '4+',  label: 'AÑOS XP' },
                { val: '30+', label: 'REPOS' },
                { val: '2',   label: 'CARRERAS' },
              ].map(({ val, label }) => (
                <div
                  key={label}
                  className="px-border-dim p-4 text-center"
                  style={{ background: 'rgba(200,255,0,0.03)' }}
                >
                  <div className="font-display text-2xl font-bold" style={{ color: '#C8FF00', textShadow: '0 0 15px rgba(200,255,0,0.5)' }}>
                    {val}
                  </div>
                  <div className="font-pixel text-[7px] text-[#555580] mt-1">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Skill bars */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="px-border-dim p-6"
            style={{ background: 'rgba(200,255,0,0.02)' }}
          >
            <p className="font-pixel text-[8px] text-neon mb-6 tracking-widest">SKILL_TREE</p>
            <div className="flex flex-col gap-5">
              {skills.map((s, i) => (
                <SkillBar key={s.label} {...s} delay={0.6 + i * 0.1} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
