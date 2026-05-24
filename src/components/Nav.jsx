import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '#sobre-mi', label: 'PLAYER' },
  { href: '#proyectos', label: 'QUESTS' },
  { href: '#stack',    label: 'ITEMS' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[100]"
      style={{
        background: scrolled ? 'rgba(6,6,15,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(200,255,0,0.12)' : '1px solid transparent',
      }}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="font-pixel text-[10px] tracking-wider" style={{ color: '#E8D070', textShadow: '0 0 10px rgba(232,208,112,0.5)' }}>
          JC<span className="blink" style={{ color: '#70B8F0' }}>_</span>
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="font-pixel text-[8px] px-4 py-3 text-[#555580] hover:text-neon transition-colors duration-150 tracking-widest"
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contacto" className="btn-pixel-outline ml-3 text-[8px]">
              CONTACT
            </a>
          </li>
        </ul>

        {/* Hamburger */}
        <button className="md:hidden font-pixel text-[9px] text-neon p-2" onClick={() => setOpen(o => !o)}>
          {open ? '[X]' : '[=]'}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden border-t px-6 py-4 flex flex-col gap-4"
            style={{ background: 'rgba(6,6,15,0.97)', borderColor: 'rgba(200,255,0,0.12)' }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {[...links, { href: '#contacto', label: 'CONTACT' }].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="font-pixel text-[9px] text-[#555580] hover:text-neon py-2 border-b transition-colors"
                style={{ borderColor: 'rgba(200,255,0,0.08)' }}
              >
                &gt; {label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
