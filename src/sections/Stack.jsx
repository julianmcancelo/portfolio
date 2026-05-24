import useInView from '../hooks/useInView'

const inventory = [
  { slot: 'A', label: 'MOBILE',     color: '#E8D070', items: ['Flutter', 'Dart', 'Android', 'React Native', 'Expo'] },
  { slot: 'B', label: 'FRONTEND',   color: '#70B8F0', items: ['TypeScript', 'React', 'Vue', 'Angular', 'HTML/CSS'] },
  { slot: 'C', label: 'BACKEND',    color: '#C870E8', items: ['Node.js', 'PHP', 'Java', 'Express', 'Cloud Functions'] },
  { slot: 'D', label: 'INFRA & BD', color: '#E8D070', items: ['Firebase', 'Firestore', 'MySQL', 'GCloud', 'Linux', 'Vercel'] },
  { slot: 'E', label: 'SECURITY',   color: '#C870E8', items: ['Ciberdefensa', 'Riesgos IT', 'Vulnerabilidades'] },
  { slot: 'F', label: 'TOOLS',      color: '#70B8F0', items: ['Git', 'GitHub', 'Firebase Console', 'Play Console', 'AdMob'] },
]

export default function Stack() {
  const [ref, inView] = useInView()

  return (
    <section id="stack" ref={ref} style={{ padding: '112px 0' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px' }}>

        <p className={`font-pixel text-[8px] glow-gold mb-2 tracking-widest fade-up ${inView ? 'visible' : ''}`} style={{ color: '#E8D070' }}>LEVEL_03</p>
        <p className={`font-mono text-xs mb-14 fade-up delay-1 ${inView ? 'visible' : ''}`} style={{ color: '#6868A0' }}>// INVENTORY / EQUIPPED_ITEMS</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {inventory.map((g, gi) => (
            <div key={g.label}
              className={`ff-window p-5 relative fade-up delay-${Math.min(gi + 2, 6)} ${inView ? 'visible' : ''}`}>

              <div className="absolute -top-3 -left-px">
                <span className="font-pixel text-[8px] px-2 py-1 text-black" style={{ background: g.color }}>
                  [{g.slot}]
                </span>
              </div>

              <p className="font-pixel text-[7px] mb-4 mt-2 tracking-widest" style={{ color: g.color }}>
                {g.label}
              </p>

              <div className="flex flex-wrap gap-2">
                {g.items.map(item => (
                  <span key={item}
                    className="font-mono text-xs px-3 py-1.5 border"
                    style={{ borderColor: 'rgba(104,104,160,0.3)', color: '#6868A0', background: 'rgba(0,0,0,0.3)' }}>
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
