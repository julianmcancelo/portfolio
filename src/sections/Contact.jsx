import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const channels = [
  { tag: 'MAIL', label: 'julianmcancelo@gmail.com', href: 'mailto:julianmcancelo@gmail.com', color: '#C8FF00' },
  { tag: 'IN',   label: 'linkedin.com/in/julianmcancelo', href: 'https://linkedin.com/in/julianmcancelo', color: '#00FFFF' },
  { tag: 'GH',   label: 'github.com/julianmcancelo', href: 'https://github.com/julianmcancelo', color: '#FF00C8' },
]

export default function Contact() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="contacto" ref={ref} className="py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-6">

        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          className="font-pixel text-[8px] text-neon mb-2 tracking-widest glow-neon"
        >LEVEL_04</motion.p>
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
          className="font-mono text-xs text-[#555580] mb-12"
        >// PRESS_START_TO_CONTACT</motion.p>

        {/* Big title */}
        <div className="overflow-hidden mb-4">
          <motion.h2
            initial={{ y: '110%' }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="font-display font-bold tracking-tighter text-white leading-none"
            style={{ fontSize: 'clamp(52px, 10vw, 130px)' }}
          >
            HABLEMOS
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-3 mb-14"
        >
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.div key={i} className="w-2 h-2"
                style={{ background: '#C8FF00' }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.4 }}
              />
            ))}
          </div>
          <span className="font-pixel text-[8px] text-[#555580]">INSERT COIN TO CONTINUE</span>
        </motion.div>

        <div className="flex flex-col gap-3 max-w-lg">
          {channels.map(({ tag, label, href, color }, i) => (
            <motion.a
              key={href}
              href={href}
              target="_blank"
              rel="noopener"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              whileHover={{ x: 8 }}
              className="group flex items-center gap-4 p-5 border transition-all duration-200"
              style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = `${color}40`}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
            >
              <span className="font-pixel text-[8px] px-3 py-2 shrink-0"
                style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>
                {tag}
              </span>
              <span className="font-mono text-sm transition-colors duration-200"
                style={{ color: '#555580' }}
                onMouseEnter={e => e.target.style.color = color}
                onMouseLeave={e => e.target.style.color = '#555580'}
              >
                {label}
              </span>
              <span className="ml-auto font-pixel text-[8px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color }}>
                &gt;&gt;
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
