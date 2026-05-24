import useInView from '../hooks/useInView'

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
}

const quests = [
  { num: '01', name: 'STOCKAR',                   desc: 'Sistema de inventario multiplataforma con sincronización en tiempo real y diseño offline-first.',         tags: ['TypeScript', 'Node.js', 'MySQL'],      color: '#E8D070' },
  { num: '02', name: 'Grana3D',                   desc: 'E-commerce con visualización 3D de productos. Catálogo interactivo, carrito y panel de administración.', tags: ['TypeScript', 'Vue', 'Three.js'],        color: '#70B8F0', link: 'https://github.com/julianmcancelo/grana3d-vite' },
  { num: '03', name: 'Habilitaciones Municipales', desc: 'Sistema de gestión para municipios. Expedientes, vencimientos y notificaciones automáticas.',             tags: ['JavaScript', 'PHP', 'MySQL'],           color: '#C870E8' },
  { num: '04', name: 'Sistema de Turnos',          desc: 'Gestión de turnos para comercios. Agenda visual, recordatorios e historial de clientes.',                 tags: ['PHP', 'MySQL'],                        color: '#E8D070', link: 'https://github.com/julianmcancelo/sistema-turnos' },
  { num: '05', name: 'Mapa de Asientos',           desc: 'Selector interactivo de asientos para eventos con Canvas API y reserva en tiempo real.',                  tags: ['JavaScript', 'Canvas API'],            color: '#70B8F0', link: 'https://github.com/julianmcancelo/mapa-asientos-sigic' },
  { num: '06', name: 'App Nutricional',            desc: 'Seguimiento de calorías, planes alimentarios y registro diario con sincronización Firebase.',             tags: ['Flutter', 'Dart', 'Firebase'],         color: '#C870E8', link: 'https://github.com/julianmcancelo/nutri' },
]

export default function Projects() {
  const [ref, inView] = useInView()

  return (
    <section id="proyectos" ref={ref} style={{ padding: '112px 0' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px' }}>

        <p className={`font-pixel text-[8px] glow-gold mb-2 tracking-widest fade-up ${inView ? 'visible' : ''}`} style={{ color: '#E8D070' }}>LEVEL_02</p>
        <p className={`font-mono text-xs mb-14 fade-up delay-1 ${inView ? 'visible' : ''}`} style={{ color: '#6868A0' }}>// COMPLETED_QUESTS</p>

        {/* BOSS PROJECT */}
        <div className={`mb-10 p-8 md:p-10 relative overflow-hidden fade-up delay-2 ${inView ? 'visible' : ''}`}
          style={{ border: '1px solid rgba(232,208,112,0.25)', background: 'rgba(232,208,112,0.03)', boxShadow: '0 0 40px rgba(232,208,112,0.05)' }}>

          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: '#E8D070' }} />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: '#E8D070' }} />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2" style={{ borderColor: '#E8D070' }} />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: '#E8D070' }} />

          <div className="grid md:grid-cols-[1fr_180px] gap-10 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-pixel text-[7px] px-2 py-1 text-black" style={{ background: '#E8D070' }}>
                  {featured.id}
                </span>
                <span className="font-pixel text-[7px]" style={{ color: '#6868A0' }}>{featured.tag}</span>
              </div>

              <h3 className="font-display text-3xl md:text-5xl font-bold text-white mb-5 tracking-tight">
                {featured.name}
              </h3>

              {featured.desc.map((p, i) => (
                <p key={i} className="font-mono text-sm leading-relaxed mb-3" style={{ color: '#6868A0' }}>
                  <span style={{ color: '#E8D070' }}>&gt;</span> {p}
                </p>
              ))}

              <div className="flex flex-wrap gap-2 mt-5 mb-7">
                {featured.techs.map(t => (
                  <span key={t} className="font-pixel text-[7px] px-3 py-1.5 border"
                    style={{ borderColor: 'rgba(232,208,112,0.2)', color: '#E8D070', background: 'rgba(232,208,112,0.06)' }}>
                    {t}
                  </span>
                ))}
              </div>

              <a href={featured.link} target="_blank" rel="noopener" className="btn-pixel inline-block text-[9px]">
                VER EN PLAY STORE &gt;&gt;
              </a>
            </div>

            <div className="hidden md:block">
              <div className="font-pixel text-[7px] mb-3" style={{ color: '#6868A0' }}>SCORE</div>
              <div className="font-display text-5xl font-bold glow-gold" style={{ color: '#E8D070' }}>
                {featured.stat}
              </div>
              <div className="font-pixel text-[7px] mb-5" style={{ color: '#6868A0' }}>{featured.statLabel}</div>
              <div className="font-pixel text-[7px] mb-2" style={{ color: '#6868A0' }}>HP</div>
              <div className="xp-bar">
                <div className="xp-fill" style={{ width: inView ? '100%' : '0%', transitionDelay: '0.6s' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Side quests grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quests.map((q, i) => (
            <div key={q.name} className={`ff-window p-5 relative overflow-hidden fade-up delay-${Math.min(i + 3, 6)} ${inView ? 'visible' : ''}`}>
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{ borderColor: q.color + '60' }} />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: q.color + '60' }} />

              <div className="flex items-center justify-between mb-4">
                <span className="font-pixel text-[8px]" style={{ color: q.color }}>{q.num}</span>
                <div className="flex gap-1.5 flex-wrap justify-end">
                  {q.tags.map(t => (
                    <span key={t} className="font-mono text-[9px] px-2 py-0.5 border"
                      style={{ borderColor: 'rgba(104,104,160,0.3)', color: '#6868A0', background: 'rgba(0,0,0,0.3)' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <h4 className="font-display text-base font-bold text-white mb-2">{q.name}</h4>
              <p className="font-mono text-[11px] leading-relaxed" style={{ color: '#6868A0' }}>{q.desc}</p>

              {q.link && (
                <a href={q.link} target="_blank" rel="noopener"
                  className="font-pixel text-[7px] mt-4 inline-block transition-colors"
                  style={{ color: q.color }}>
                  [SOURCE_CODE] &gt;
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
