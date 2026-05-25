import { useEffect, useState } from 'react'

const links = [
  { href: '#sobre-mi', label: 'Sobre mi' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#stack', label: 'Stack' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        inset: '0 0 auto 0',
        zIndex: 30,
        borderBottom: `1px solid ${scrolled ? 'var(--line)' : 'transparent'}`,
        background: scrolled ? 'rgba(247,247,245,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
      }}
    >
      <div className="container" style={{ height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#hero" style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: 22 }}>
          Julian Cancelo
        </a>
        <ul style={{ display: 'flex', gap: 22, margin: 0, padding: 0, listStyle: 'none', fontSize: 14, color: 'var(--muted)' }}>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
