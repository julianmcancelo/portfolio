import useInView from '../hooks/useInView'

const channels = [
  { tag: 'MAIL', label: 'julianmcancelo@gmail.com',          href: 'mailto:julianmcancelo@gmail.com',           color: '#E8D070' },
  { tag: 'IN',   label: 'linkedin.com/in/julianmcancelo',    href: 'https://linkedin.com/in/julianmcancelo',    color: '#70B8F0' },
  { tag: 'GH',   label: 'github.com/julianmcancelo',         href: 'https://github.com/julianmcancelo',         color: '#C870E8' },
]

export default function Contact() {
  const [ref, inView] = useInView()

  return (
    <section id="contacto" ref={ref} style={{ padding: '112px 0' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px' }}>

        <p className={`font-pixel text-[8px] glow-gold mb-2 tracking-widest fade-up ${inView ? 'visible' : ''}`} style={{ color: '#E8D070' }}>LEVEL_04</p>
        <p className={`font-mono text-xs mb-12 fade-up delay-1 ${inView ? 'visible' : ''}`} style={{ color: '#6868A0' }}>// PRESS_START_TO_CONTACT</p>

        <div className="overflow-hidden mb-4">
          <h2 className={`font-display font-bold tracking-tighter text-white leading-none fade-up delay-2 ${inView ? 'visible' : ''}`}
            style={{ fontSize: 'clamp(52px, 10vw, 130px)' }}>
            HABLEMOS
          </h2>
        </div>

        <div className={`flex items-center gap-3 mb-14 fade-up delay-3 ${inView ? 'visible' : ''}`}>
          <div className="flex gap-1">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-2 h-2 blink" style={{ background: '#E8D070', animationDelay: `${i * 0.4}s` }} />
            ))}
          </div>
          <span className="font-pixel text-[8px]" style={{ color: '#6868A0' }}>INSERT COIN TO CONTINUE</span>
        </div>

        <div className="flex flex-col gap-3" style={{ maxWidth: 480 }}>
          {channels.map(({ tag, label, href, color }, i) => (
            <a key={href} href={href} target="_blank" rel="noopener"
              className={`group flex items-center gap-4 p-5 border transition-all duration-200 fade-up delay-${i + 4} ${inView ? 'visible' : ''}`}
              style={{ borderColor: 'rgba(104,104,160,0.2)', background: 'rgba(255,255,255,0.02)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = color + '40'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(104,104,160,0.2)'}>

              <span className="font-pixel text-[8px] px-3 py-2 shrink-0"
                style={{ background: color + '15', color, border: `1px solid ${color}30` }}>
                {tag}
              </span>
              <span className="font-mono text-sm" style={{ color: '#6868A0' }}>
                {label}
              </span>
              <span className="ml-auto font-pixel text-[8px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color }}>
                &gt;&gt;
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
