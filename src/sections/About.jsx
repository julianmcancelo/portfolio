import { useEffect, useRef } from 'react'
import useInView from '../hooks/useInView'

const skills = [
  { label: 'Flutter / Dart', pct: 95, color: '#E8D070' },
  { label: 'Firebase',       pct: 90, color: '#70B8F0' },
  { label: 'Node.js / TS',   pct: 82, color: '#E8D070' },
  { label: 'React / Vue',    pct: 78, color: '#70B8F0' },
  { label: 'Ciberseguridad', pct: 60, color: '#C870E8' },
]

const lore = [
  'Soy de Lanús, Buenos Aires. Terminando Analista de Sistemas y cursando Ciberseguridad en paralelo — porque la seguridad tiene que estar en el diseño, no como parche al final.',
  'Me especialicé en arquitecturas offline-first con Flutter y Firebase. Eso me llevó a construir Bitácora Docente, una app con más de 1.000 usuarios activos que funciona sin internet en el aula.',
  'También construyo sistemas de gestión, backends en Node.js, e-commerce y herramientas internas. Me interesa resolver problemas reales — no demos que se ven bien pero no escalan.',
]

function SkillBar({ label, pct, color, visible }) {
  return (
    <div>
      <div className="flex justify-between font-pixel text-[7px] mb-2" style={{ color: '#6868A0' }}>
        <span>{label}</span>
        <span style={{ color }}>{pct}%</span>
      </div>
      <div className="xp-bar">
        <div className="xp-fill" style={{
          width: visible ? `${pct}%` : '0%',
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          boxShadow: `0 0 8px ${color}`,
        }} />
      </div>
    </div>
  )
}

export default function About() {
  const [ref, inView] = useInView()

  return (
    <section id="sobre-mi" ref={ref} style={{ padding: '112px 0' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px' }}>
        <p className={`font-pixel text-[8px] glow-gold mb-2 tracking-widest fade-up ${inView ? 'visible' : ''}`} style={{ color: '#E8D070' }}>LEVEL_01</p>
        <p className={`font-mono text-xs mb-14 fade-up delay-1 ${inView ? 'visible' : ''}`} style={{ color: '#6868A0' }}>// PLAYER_STATS &amp; LORE</p>

        <div className="grid md:grid-cols-[1fr_360px] gap-16 items-start">
          <div>
            <h2 className={`font-display text-3xl md:text-4xl font-bold leading-tight mb-8 fade-up delay-2 ${inView ? 'visible' : ''}`}>
              Construyo software que funciona{' '}
              <span style={{ color: '#E8D070', textShadow: '0 0 20px rgba(232,208,112,0.35)' }}>cuando importa.</span>
            </h2>

            {lore.map((p, i) => (
              <p key={i} className={`font-mono text-sm leading-relaxed mb-4 fade-up delay-${i + 3} ${inView ? 'visible' : ''}`} style={{ color: '#6868A0' }}>
                <span style={{ color: '#E8D070' }}>&gt;</span> {p}
              </p>
            ))}

            <div className={`mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 fade-up delay-6 ${inView ? 'visible' : ''}`}>
              {[['1K+','USUARIOS'],['4+','AÑOS XP'],['30+','REPOS'],['2','CARRERAS']].map(([v, l]) => (
                <div key={l} className="ff-window p-4 text-center">
                  <div className="font-display text-2xl font-bold glow-gold" style={{ color: '#E8D070' }}>{v}</div>
                  <div className="font-pixel text-[7px] mt-1" style={{ color: '#6868A0' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={`ff-window p-6 fade-up delay-3 ${inView ? 'visible' : ''}`}>
            <p className="font-pixel text-[8px] glow-gold mb-6 tracking-widest" style={{ color: '#E8D070' }}>SKILL_TREE</p>
            <div className="flex flex-col gap-5">
              {skills.map(s => <SkillBar key={s.label} {...s} visible={inView} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
