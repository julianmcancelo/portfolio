import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const featured = {
  id: 'BOSS',
  name: 'Bitácora Docente',
  tag: 'MAIN QUEST · 2022–PRESENTE',
  desc: [
    'App de gestión docente para Argentina. Reemplaza la carpeta de papel: asistencia, calificaciones, planificación, comunicados y estadísticas — todo en el celular, funcionando sin internet.',
    'Flutter con Firebase, arquitectura offline-first, widgets de pantalla de inicio para Android, notificaciones push, IA integrada para reportes, y sistema de suscripción con AdMob y Google Play Billing.',
  ],
  techs: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'Cloud Functions', 'Node.js', 'AdMob'],
  link: 'https://play.google.com/store/apps/details?id=com.carpetadigital.app',
  stat: '1000+',
  statLabel: 'USERS',
  hp: 100,
}

const quests = [
  { num: '01', name: 'STOCKAR',                  desc: 'Sistema de inventario multiplataforma con sincronización en tiempo real y diseño offline-first.',         tags: ['TypeScript', 'Node.js', 'MySQL'],      color: '#C8FF00' },
  { num: '02', name: 'Grana3D',                  desc: 'E-commerce con visualización 3D de productos. Catálogo interactivo, carrito y panel de administración.', tags: ['TypeScript', 'Vue', 'Three.js'],        color: '#00FFFF', link: 'https://github.com/julianmcancelo/grana3d-vite' },
  { num: '03', name: 'Habilitaciones Municipales', desc: 'Sistema de gestión para municipios. Expedientes, vencimientos y notificaciones automáticas.',             tags: ['JavaScript', 'PHP', 'MySQL'],           color: '#FF00C8' },
  { num: '04', name: 'Sistema de Turnos',         desc: 'Gestión de turnos para comercios. Agenda visual, recordatorios e historial de clientes.',                 tags: ['PHP', 'MySQL'],                        color: '#C8FF00', link: 'https://github.com/julianmcancelo/sistema-turnos' },
  { num: '05', name: 'Mapa de Asientos',          desc: 'Selector interactivo de asientos para eventos con Canvas API y reserva en tiempo real.',                  tags: ['JavaScript', 'Canvas API'],            color: '#00FFFF', link: 'https://github.com/julianmcancelo/mapa-asientos-sigic' },
  { num: '06', name: 'App Nutricional',           desc: 'Seguimiento de calorías, planes alimentarios y registro diario con sincronización Firebase.',             tags: ['Flutter', 'Dart', 'Firebase'],         color: '#BF5FFF', link: 'https://github.com/julianmcancelo/nutri' },
]

function TiltCard({ children, className }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const ref = useRef()
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * 10, y: -((e.clientX - r.left) / r.width - 0.5) * 10 })
  }
  return (
    <motion.div ref={ref} className={className}
      onMouseMove={onMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      style={{ transformPerspective: '800px', transformStyle: 'preserve-3d' }}
    >{children}</motion.div>
  )
}

export default function Projects() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="proyectos" ref={ref} className="py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-6">

        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          className="font-pixel text-[8px] text-neon mb-2 tracking-widest glow-neon"
        >LEVEL_02</motion.p>
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
          className="font-mono text-xs text-[#555580] mb-14"
        >// COMPLETED_QUESTS</motion.p>

        {/* BOSS PROJECT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-10 p-8 md:p-10 relative overflow-hidden"
          style={{ border: '1px solid rgba(200,255,0,0.25)', background: 'rgba(200,255,0,0.03)', boxShadow: '0 0 40px rgba(200,255,0,0.05)' }}
        >
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: '#C8FF00' }} />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: '#C8FF00' }} />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2" style={{ borderColor: '#C8FF00' }} />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: '#C8FF00' }} />

          <div className="grid md:grid-cols-[1fr_180px] gap-10 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-pixel text-[7px] px-2 py-1 text-black" style={{ background: '#C8FF00' }}>
                  {featured.id}
                </span>
                <span className="font-pixel text-[7px] text-[#555580]">{featured.tag}</span>
              </div>

              <h3 className="font-display text-3xl md:text-5xl font-bold text-white mb-5 tracking-tight">
                {featured.name}
              </h3>

              {featured.desc.map((p, i) => (
                <p key={i} className="font-mono text-sm text-[#7777AA] leading-relaxed mb-3">
                  <span style={{ color: '#C8FF00' }}>&gt;</span> {p}
                </p>
              ))}

              <div className="flex flex-wrap gap-2 mt-5 mb-7">
                {featured.techs.map(t => (
                  <span key={t} className="font-pixel text-[7px] px-3 py-1.5 border"
                    style={{ borderColor: 'rgba(200,255,0,0.2)', color: '#C8FF00', background: 'rgba(200,255,0,0.06)' }}>
                    {t}
                  </span>
                ))}
              </div>

              <a href={featured.link} target="_blank" rel="noopener" className="btn-pixel inline-block text-[9px]">
                VER EN PLAY STORE &gt;&gt;
              </a>
            </div>

            {/* HUD stat */}
            <div className="hidden md:block">
              <div className="font-pixel text-[7px] text-[#555580] mb-3">SCORE</div>
              <div className="font-display text-5xl font-bold glow-neon" style={{ color: '#C8FF00' }}>
                {featured.stat}
              </div>
              <div className="font-pixel text-[7px] text-[#555580] mb-5">{featured.statLabel}</div>
              <div className="font-pixel text-[7px] text-[#555580] mb-2">HP</div>
              <div className="xp-bar">
                <motion.div
                  className="xp-fill"
                  initial={{ width: 0 }}
                  animate={inView ? { width: '100%' } : {}}
                  transition={{ delay: 0.8, duration: 1.2 }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Side quests grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quests.map((q, i) => (
            <motion.div
              key={q.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
            >
              <TiltCard className="group h-full flex flex-col p-5 relative overflow-hidden"
                style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>

                {/* Corner accent */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l transition-colors duration-300"
                  style={{ borderColor: q.color + '60' }} />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r transition-colors duration-300"
                  style={{ borderColor: q.color + '60' }} />

                <div className="flex items-center justify-between mb-4">
                  <span className="font-pixel text-[8px]" style={{ color: q.color }}>{q.num}</span>
                  <div className="flex gap-1.5 flex-wrap justify-end">
                    {q.tags.map(t => (
                      <span key={t} className="font-mono text-[9px] px-2 py-0.5 border"
                        style={{ borderColor: 'rgba(255,255,255,0.06)', color: '#555580', background: 'rgba(255,255,255,0.03)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <h4 className="font-display text-base font-bold text-white mb-2">{q.name}</h4>
                <p className="font-mono text-[11px] text-[#555580] leading-relaxed flex-1">{q.desc}</p>

                {q.link && (
                  <a href={q.link} target="_blank" rel="noopener"
                    className="font-pixel text-[7px] mt-4 self-start transition-colors"
                    style={{ color: q.color }}>
                    [SOURCE_CODE] &gt;
                  </a>
                )}
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
