import { useEffect, useState } from 'react'

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
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(14,11,40,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(8px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(232,208,112,0.1)' : '1px solid transparent',
      transition: 'background 0.3s, border-color 0.3s',
    }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#hero" className="font-pixel text-[10px] tracking-wider glow-gold" style={{ color: '#E8D070' }}>
          JC<span className="blink" style={{ color: '#70B8F0' }}>_</span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {links.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className="font-pixel text-[8px] px-4 py-3 tracking-widest transition-colors"
                style={{ color: '#6868A0' }}
                onMouseEnter={e => e.target.style.color = '#E8D070'}
                onMouseLeave={e => e.target.style.color = '#6868A0'}>
                {label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contacto" className="btn-pixel-out ml-3 text-[8px]">CONTACT</a>
          </li>
        </ul>

        <button className="md:hidden font-pixel text-[9px]" style={{ color: '#E8D070', background: 'none', border: 'none' }}
          onClick={() => setOpen(o => !o)}>
          {open ? '[X]' : '[=]'}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t px-6 py-4 flex flex-col gap-4"
          style={{ background: 'rgba(14,11,40,0.97)', borderColor: 'rgba(232,208,112,0.1)' }}>
          {[...links, { href: '#contacto', label: 'CONTACT' }].map(({ href, label }) => (
            <a key={href} href={href} onClick={() => setOpen(false)}
              className="font-pixel text-[9px] py-2 border-b transition-colors"
              style={{ color: '#6868A0', borderColor: 'rgba(232,208,112,0.08)' }}>
              &gt; {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
