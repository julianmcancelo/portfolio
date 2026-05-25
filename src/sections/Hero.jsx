export default function Hero() {
  return (
    <section id="hero" className="section">
      <div className="container">
        <p className="section-kicker">Portfolio 2026</p>
        <h1
          style={{
            margin: 0,
            fontFamily: 'Fraunces, serif',
            fontSize: 'clamp(2.4rem, 8vw, 5.2rem)',
            lineHeight: 1.04,
            letterSpacing: '-0.03em',
            maxWidth: 860,
          }}
        >
          Diseno y construyo productos digitales claros, utiles y listos para escalar.
        </h1>
        <p style={{ margin: '22px 0 0', maxWidth: 700, color: 'var(--muted)', fontSize: '1.06rem' }}>
          Soy Julian Cancelo, desarrollador mobile y web en Buenos Aires. Enfoque en Flutter, React y sistemas
          reales para educacion y gestion.
        </p>
      </div>
    </section>
  )
}
