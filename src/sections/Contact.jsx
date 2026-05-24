import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const links = [
  {
    icon: '✉',
    label: 'julianmcancelo@gmail.com',
    href: 'mailto:julianmcancelo@gmail.com',
    color: '#7B61FF',
  },
  {
    icon: '▲',
    label: 'linkedin.com/in/julianmcancelo',
    href: 'https://linkedin.com/in/julianmcancelo',
    color: '#A78BFA',
  },
  {
    icon: '◎',
    label: 'github.com/julianmcancelo',
    href: 'https://github.com/julianmcancelo',
    color: '#EC4899',
  },
]

export default function Contact() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="contacto" ref={ref} className="py-28 md:py-40">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs text-purple-400 tracking-[0.2em] uppercase mb-3"
        >
          04 — Contacto
        </motion.p>

        <div className="overflow-hidden mb-10">
          <motion.h2
            initial={{ y: '105%' }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="font-display font-bold tracking-tighter"
            style={{ fontSize: 'clamp(56px, 11vw, 140px)', lineHeight: 1 }}
          >
            Hablemos.
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-gray-400 text-lg max-w-lg mb-14 leading-relaxed"
        >
          Si tenés un proyecto en mente, querés mejorar algo que ya existe,
          o simplemente querés charlar sobre tecnología — escribime.
        </motion.p>

        <div className="flex flex-col gap-4 max-w-md">
          {links.map(({ icon, label, href, color }, i) => (
            <motion.a
              key={href}
              href={href}
              target="_blank"
              rel="noopener"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ x: 8 }}
              className="group flex items-center gap-5 p-5 rounded-2xl border border-white/5 bg-white/[0.025] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300"
            >
              <span
                className="w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold shrink-0 transition-colors duration-300"
                style={{ background: `${color}18`, color }}
              >
                {icon}
              </span>
              <span className="font-mono text-sm text-gray-400 group-hover:text-white transition-colors duration-200">
                {label}
              </span>
              <span className="ml-auto text-gray-700 group-hover:text-gray-400 transition-colors duration-200 text-sm">→</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
