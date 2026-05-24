import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const groups = [
  {
    label: 'Mobile',
    color: '#7B61FF',
    skills: ['Flutter', 'Dart', 'Android', 'React Native', 'Expo'],
  },
  {
    label: 'Frontend Web',
    color: '#A78BFA',
    skills: ['TypeScript', 'React', 'Vue', 'Angular', 'HTML / CSS'],
  },
  {
    label: 'Backend',
    color: '#EC4899',
    skills: ['Node.js', 'PHP', 'Java', 'Express', 'Cloud Functions'],
  },
  {
    label: 'Infraestructura & BD',
    color: '#F59E0B',
    skills: ['Firebase', 'Firestore', 'MySQL', 'Google Cloud', 'Linux', 'Vercel'],
  },
  {
    label: 'Seguridad',
    color: '#10B981',
    skills: ['Ciberdefensa', 'Gestión de riesgos IT', 'Análisis de vulnerabilidades'],
  },
  {
    label: 'Herramientas',
    color: '#60A5FA',
    skills: ['Git', 'GitHub', 'Firebase Console', 'Play Console', 'AdMob'],
  },
]

export default function Stack() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="stack" ref={ref} className="py-28 md:py-40">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs text-purple-400 tracking-[0.2em] uppercase mb-3"
        >
          03 — Stack
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-16"
        >
          Con qué trabajo
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {groups.map((g, gi) => (
            <motion.div
              key={g.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + gi * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 rounded-2xl border border-white/5 bg-white/[0.025] hover:border-white/10 transition-colors duration-300"
            >
              {/* Label with color accent */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full" style={{ background: g.color }} />
                <h4 className="font-mono text-xs font-semibold tracking-widest uppercase" style={{ color: g.color }}>
                  {g.label}
                </h4>
              </div>

              {/* Pills */}
              <div className="flex flex-wrap gap-2">
                {g.skills.map((s, si) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.3 + gi * 0.06 + si * 0.04 }}
                    whileHover={{ scale: 1.06, borderColor: g.color }}
                    className="text-sm text-gray-300 px-3 py-1.5 rounded-lg border border-white/8 bg-white/[0.03] transition-colors duration-200"
                  >
                    {s}
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
