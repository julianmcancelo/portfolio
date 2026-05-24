import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const inventory = [
  { slot: 'A', label: 'MOBILE',      color: '#C8FF00', items: ['Flutter', 'Dart', 'Android', 'React Native', 'Expo'] },
  { slot: 'B', label: 'FRONTEND',    color: '#00FFFF', items: ['TypeScript', 'React', 'Vue', 'Angular', 'HTML/CSS'] },
  { slot: 'C', label: 'BACKEND',     color: '#FF00C8', items: ['Node.js', 'PHP', 'Java', 'Express', 'Cloud Functions'] },
  { slot: 'D', label: 'INFRA & BD',  color: '#C8FF00', items: ['Firebase', 'Firestore', 'MySQL', 'GCloud', 'Linux', 'Vercel'] },
  { slot: 'E', label: 'SECURITY',    color: '#BF5FFF', items: ['Ciberdefensa', 'Riesgos IT', 'Vulnerabilidades'] },
  { slot: 'F', label: 'TOOLS',       color: '#00FFFF', items: ['Git', 'GitHub', 'Firebase Console', 'Play Console', 'AdMob'] },
]

export default function Stack() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="stack" ref={ref} className="py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-6">

        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          className="font-pixel text-[8px] text-neon mb-2 tracking-widest glow-neon"
        >LEVEL_03</motion.p>
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
          className="font-mono text-xs text-[#555580] mb-14"
        >// INVENTORY / EQUIPPED_ITEMS</motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {inventory.map((g, gi) => (
            <motion.div
              key={g.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + gi * 0.07 }}
              className="p-5 relative group"
              style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
              whileHover={{ borderColor: `${g.color}30`, background: `${g.color}05` }}
            >
              {/* Slot badge */}
              <div className="absolute -top-3 -left-px">
                <span className="font-pixel text-[8px] px-2 py-1 text-black" style={{ background: g.color }}>
                  [{g.slot}]
                </span>
              </div>

              <p className="font-pixel text-[7px] mb-4 mt-2 tracking-widest" style={{ color: g.color }}>
                {g.label}
              </p>

              <div className="flex flex-wrap gap-2">
                {g.items.map((item, ii) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.3 + gi * 0.06 + ii * 0.04 }}
                    className="font-mono text-xs px-3 py-1.5 border transition-all duration-200"
                    style={{ borderColor: 'rgba(255,255,255,0.08)', color: '#7777AA', background: 'rgba(0,0,0,0.3)' }}
                    whileHover={{ color: g.color, borderColor: `${g.color}50`, background: `${g.color}08` }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
