import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#stack',    label: 'Stack' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(3,3,8,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="font-mono text-lg font-medium text-purple-400 tracking-widest">
          JC<span className="text-pink-400">_</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-[#6B7280] hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contacto"
              className="ml-2 px-5 py-2 rounded-xl text-sm font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-colors"
            >
              Contacto
            </a>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(o => !o)}
          aria-label="Menu"
        >
          <motion.span className="block h-px w-6 bg-white" animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }} />
          <motion.span className="block h-px w-6 bg-white" animate={{ opacity: open ? 0 : 1 }} />
          <motion.span className="block h-px w-6 bg-white" animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden border-t border-white/5"
            style={{ background: 'rgba(3,3,8,0.95)', backdropFilter: 'blur(16px)' }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="flex flex-col px-6 py-4 gap-2">
              {[...links, { href: '#contacto', label: 'Contacto' }].map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-base font-medium text-gray-300 hover:text-white border-b border-white/5 last:border-0"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
