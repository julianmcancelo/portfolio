import useInView from '../hooks/useInView'

const groups = [
  { title: 'Mobile', items: ['Flutter', 'Dart', 'React Native'] },
  { title: 'Frontend', items: ['React', 'TypeScript', 'Angular'] },
  { title: 'Backend', items: ['Node.js', 'Express', 'PHP'] },
  { title: 'Datos e Infra', items: ['Firebase', 'Firestore', 'MySQL', 'Vercel'] },
]

export default function Stack() {
  const [ref, inView] = useInView()

  return (
    <section id="stack" ref={ref} className="section">
      <div className="container">
        <p className={`section-kicker fade-up ${inView ? 'visible' : ''}`}>Stack</p>
        <h2 className={`section-title fade-up delay-1 ${inView ? 'visible' : ''}`}>Tecnologias principales.</h2>
        <div className="grid sm:grid-cols-2 gap-4" style={{ marginTop: 24 }}>
          {groups.map((group, i) => (
            <div key={group.title} className={`card fade-up delay-${Math.min(i + 2, 6)} ${inView ? 'visible' : ''}`} style={{ padding: 18 }}>
              <h3 style={{ margin: 0, fontSize: 16 }}>{group.title}</h3>
              <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {group.items.map((item) => (
                  <span key={item} style={{ border: '1px solid var(--line)', borderRadius: 999, padding: '5px 11px', fontSize: 13, color: 'var(--muted)' }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
