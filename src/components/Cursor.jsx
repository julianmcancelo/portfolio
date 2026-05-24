import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [visible, setVisible] = useState(false)
  const [clicking, setClicking] = useState(false)

  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)
  const rx = useSpring(mx, { stiffness: 300, damping: 28 })
  const ry = useSpring(my, { stiffness: 300, damping: 28 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const move = (e) => { mx.set(e.clientX); my.set(e.clientY); setVisible(true) }
    const down = () => setClicking(true)
    const up   = () => setClicking(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup',   up)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup',   up)
    }
  }, [])

  if (!visible) return null

  const s = clicking ? 10 : 16

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
    >
      {/* Crosshair — pixel style */}
      <svg width={s * 2} height={s * 2} viewBox="0 0 32 32" fill="none" style={{ overflow: 'visible' }}>
        {/* Horizontal line */}
        <rect x="0"  y="15" width="12" height="2" fill="#C8FF00" />
        <rect x="20" y="15" width="12" height="2" fill="#C8FF00" />
        {/* Vertical line */}
        <rect x="15" y="0"  width="2" height="12" fill="#C8FF00" />
        <rect x="15" y="20" width="2" height="12" fill="#C8FF00" />
        {/* Center pixel */}
        <rect x="14" y="14" width="4" height="4" fill="#C8FF00" />
      </svg>
    </motion.div>
  )
}
