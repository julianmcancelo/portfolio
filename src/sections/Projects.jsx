import useInView from '../hooks/useInView'

const projects = [
  { name: 'Bitacora Docente', desc: 'Aplicacion educativa offline-first para gestion docente en Argentina.', link: 'https://play.google.com/store/apps/details?id=com.carpetadigital.app' },
  { name: 'Stockar', desc: 'Sistema de inventario multiplataforma con sincronizacion en tiempo real.' },
  { name: 'Grana3D', desc: 'Ecommerce con visualizacion 3D de productos.', link: 'https://github.com/julianmcancelo/grana3d-vite' },
  { name: 'Sistema de Turnos', desc: 'Agenda de turnos con historial y recordatorios.', link: 'https://github.com/julianmcancelo/sistema-turnos' },
]

export default function Projects() {
  const [ref, inView] = useInView()

  return (
    <section id="proyectos" ref={ref} className="section">
      <div className="container">
        <p className={`section-kicker fade-up ${inView ? 'visible' : ''}`}>Proyectos</p>
        <h2 className={`section-title fade-up delay-1 ${inView ? 'visible' : ''}`}>Trabajo reciente.</h2>
        <div style={{ marginTop: 26, display: 'grid', gap: 12 }}>
          {projects.map((project, i) => (
            <article key={project.name} className={`card fade-up delay-${Math.min(i + 2, 6)} ${inView ? 'visible' : ''}`} style={{ padding: 20 }}>
              <h3 style={{ margin: 0, fontSize: 20, letterSpacing: '-0.01em' }}>{project.name}</h3>
              <p style={{ margin: '10px 0 0', color: 'var(--muted)' }}>{project.desc}</p>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ marginTop: 12, display: 'inline-block', color: 'var(--accent)', fontWeight: 600 }}>
                  Ver proyecto
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
