import useInView from '../hooks/useInView'

const stats = [
  ['1000+', 'usuarios activos'],
  ['4+', 'anos de experiencia'],
  ['30+', 'repositorios publicados'],
  ['2', 'areas de estudio'],
]

export default function About() {
  const [ref, inView] = useInView()

  return (
    <section id="sobre-mi" ref={ref} className="section">
      <div className="container">
        <p className={`section-kicker fade-up ${inView ? 'visible' : ''}`}>Sobre mi</p>
        <h2 className={`section-title fade-up delay-1 ${inView ? 'visible' : ''}`}>Tecnologia con foco en impacto real.</h2>
        <p className={`fade-up delay-2 ${inView ? 'visible' : ''}`} style={{ maxWidth: 760, color: 'var(--muted)', marginTop: 18 }}>
          Desarrollo apps y plataformas orientadas a uso diario: asistencia, calificaciones, inventario, turnos y
          ecommerce. Priorizo claridad de producto, buen rendimiento y decisiones tecnicas sostenibles.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginTop: 28 }}>
          {stats.map(([value, label], i) => (
            <div key={label} className={`card fade-up delay-${Math.min(i + 2, 6)} ${inView ? 'visible' : ''}`} style={{ padding: 18 }}>
              <strong style={{ display: 'block', fontSize: 26, letterSpacing: '-0.02em' }}>{value}</strong>
              <span style={{ color: 'var(--muted)', fontSize: 14 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
