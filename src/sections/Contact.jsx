import useInView from '../hooks/useInView'

const channels = [
  { label: 'Email', value: 'julianmcancelo@gmail.com', href: 'mailto:julianmcancelo@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/julianmcancelo', href: 'https://linkedin.com/in/julianmcancelo' },
  { label: 'GitHub', value: 'github.com/julianmcancelo', href: 'https://github.com/julianmcancelo' },
]

export default function Contact() {
  const [ref, inView] = useInView()

  return (
    <section id="contacto" ref={ref} className="section">
      <div className="container">
        <p className={`section-kicker fade-up ${inView ? 'visible' : ''}`}>Contacto</p>
        <h2 className={`section-title fade-up delay-1 ${inView ? 'visible' : ''}`}>Hablemos de tu proximo proyecto.</h2>
        <div style={{ marginTop: 24, display: 'grid', gap: 10, maxWidth: 720 }}>
          {channels.map((channel, i) => (
            <a
              key={channel.href}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`card fade-up delay-${Math.min(i + 2, 6)} ${inView ? 'visible' : ''}`}
              style={{ padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <span style={{ fontWeight: 700 }}>{channel.label}</span>
              <span style={{ color: 'var(--muted)' }}>{channel.value}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
