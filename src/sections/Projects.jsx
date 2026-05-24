import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const featured = {
  tag: 'Proyecto principal · 2022–presente',
  name: 'Bitácora Docente',
  desc: [
    'App de gestión docente para Argentina. Reemplaza la carpeta de papel: asistencia, calificaciones, planificación, comunicados y estadísticas — todo en el celular, funcionando sin internet.',
    'Construida en Flutter con Firebase, arquitectura offline-first con Firestore, widgets de pantalla de inicio para Android, notificaciones push, IA integrada para reportes, y sistema de suscripción con AdMob y Google Play Billing.',
  ],
  techs: ['Flutter', 'Dart', 'Firebase', 'Firestore offline', 'Cloud Functions', 'Node.js', 'AdMob'],
  link: 'https://play.google.com/store/apps/details?id=com.carpetadigital.app',
  linkLabel: 'Ver en Play Store ↗',
  stat: '1000+ usuarios',
}

const projects = [
  {
    icon: '🏭',
    name: 'STOCKAR',
    desc: 'Sistema de inventario multiplataforma con sincronización en tiempo real y diseño offline-first.',
    tags: ['TypeScript', 'Node.js', 'MySQL'],
    color: '#7B61FF',
  },
  {
    icon: '🔷',
    name: 'Grana3D',
    desc: 'E-commerce con visualización 3D de productos. Catálogo interactivo, carrito y panel de administración.',
    tags: ['TypeScript', 'Vue', 'Three.js'],
    link: 'https://github.com/julianmcancelo/grana3d-vite',
    color: '#A78BFA',
  },
  {
    icon: '🏛️',
    name: 'Habilitaciones Municipales',
    desc: 'Sistema de gestión para municipios. Expedientes, vencimientos y notificaciones automáticas.',
    tags: ['JavaScript', 'PHP', 'MySQL'],
    color: '#EC4899',
  },
  {
    icon: '📅',
    name: 'Sistema de Turnos',
    desc: 'Gestión de turnos para comercios. Agenda visual, recordatorios e historial de clientes.',
    tags: ['PHP', 'MySQL'],
    link: 'https://github.com/julianmcancelo/sistema-turnos',
    color: '#F59E0B',
  },
  {
    icon: '🗺️',
    name: 'Mapa de Asientos',
    desc: 'Selector interactivo de asientos para eventos con Canvas API y reserva en tiempo real.',
    tags: ['JavaScript', 'Canvas API'],
    link: 'https://github.com/julianmcancelo/mapa-asientos-sigic',
    color: '#10B981',
  },
  {
    icon: '🥗',
    name: 'App Nutricional',
    desc: 'Seguimiento de calorías, planes alimentarios y registro diario con sincronización Firebase.',
    tags: ['Flutter', 'Dart', 'Firebase'],
    link: 'https://github.com/julianmcancelo/nutri',
    color: '#7B61FF',
  },
]

function TiltCard({ children, className }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const ref = useRef()

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5
    setTilt({ x: y * 12, y: -x * 12 })
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      style={{ transformPerspective: '800px', transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
  })
}

export default function Projects() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="proyectos" ref={ref} className="py-28 md:py-40">
      <div className="max-w-6xl mx-auto px-6">
        {/* Label */}
        <motion.p
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="font-mono text-xs text-purple-400 tracking-[0.2em] uppercase mb-3"
        >
          02 — Proyectos
        </motion.p>
        <motion.h2
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0.5}
          className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-16"
        >
          Cosas que construí
        </motion.h2>

        {/* Featured */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}
          className="relative rounded-3xl overflow-hidden mb-12 p-8 md:p-12 border border-white/5"
          style={{ background: 'linear-gradient(135deg, rgba(123,97,255,0.08), rgba(236,72,153,0.04))' }}
        >
          {/* Glow */}
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(123,97,255,0.15), transparent 70%)' }} />

          <div className="grid md:grid-cols-[1fr_auto] gap-10 items-center relative z-10">
            <div>
              <p className="font-mono text-xs text-purple-400 tracking-widest mb-4">{featured.tag}</p>
              <h3 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-5">
                {featured.name}
              </h3>
              {featured.desc.map((p, i) => (
                <p key={i} className="text-gray-400 leading-relaxed mb-3 max-w-xl">{p}</p>
              ))}
              <div className="flex flex-wrap gap-2 mt-6 mb-8">
                {featured.techs.map(t => (
                  <span key={t} className="font-mono text-xs text-purple-300 px-3 py-1 rounded-full border"
                    style={{ borderColor: 'rgba(123,97,255,0.25)', background: 'rgba(123,97,255,0.08)' }}>
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={featured.link}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm"
                style={{ background: 'linear-gradient(135deg, #7B61FF, #A78BFA)' }}
              >
                {featured.linkLabel}
              </a>
            </div>

            {/* Stat badge */}
            <div className="hidden md:flex flex-col items-center justify-center w-40 h-40 rounded-2xl border border-purple-500/20 bg-purple-500/5 shrink-0">
              <span className="font-display text-3xl font-bold gradient-text">1K+</span>
              <span className="text-xs text-gray-500 mt-1 text-center">usuarios activos</span>
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <motion.div
              key={p.name}
              variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={2 + i * 0.15}
            >
              <TiltCard
                className="group h-full flex flex-col p-6 rounded-2xl border border-white/5 bg-white/[0.025] hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-2xl">{p.icon}</span>
                  <div className="flex gap-1.5 flex-wrap justify-end">
                    {p.tags.map(t => (
                      <span key={t} className="font-mono text-[10px] text-gray-500 border border-white/8 px-2 py-0.5 rounded-full bg-white/[0.03]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <h4 className="font-display text-lg font-bold mb-2 group-hover:text-white transition-colors"
                  style={{ color: '#E8E8F4' }}>
                  {p.name}
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{p.desc}</p>

                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener"
                    className="mt-4 text-sm font-mono font-medium transition-colors self-start"
                    style={{ color: p.color }}
                  >
                    GitHub →
                  </a>
                )}

                {/* Bottom glow on hover */}
                <div className="absolute inset-x-0 bottom-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl"
                  style={{ background: `linear-gradient(90deg, transparent, ${p.color}40, transparent)` }} />
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
