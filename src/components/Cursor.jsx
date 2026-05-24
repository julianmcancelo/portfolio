import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)

  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)

  // Outer ring — slow spring
  const rx = useSpring(mx, { stiffness: 180, damping: 22 })
  const ry = useSpring(my, { stiffness: 180, damping: 22 })

  // Inner dot — snappy
  const dx = useSpring(mx, { stiffness: 800, damping: 40 })
  const dy = useSpring(my, { stiffness: 800, damping: 40 })

  useEffect(() => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches
    if (isMobile) return

    const move = (e) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const over = (e) => {
      if (e.target.closest('a, button, [data-hover]')) setHovering(true)
    }
    const out = (e) => {
      if (e.target.closest('a, button, [data-hover]')) setHovering(false)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    window.addEventListener('mouseout', out)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('mouseout', out)
    }
  }, [visible])

  if (!visible) return null

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border"
        style={{
          x: rx, y: ry,
          translateX: '-50%', translateY: '-50%',
          borderColor: hovering ? 'rgba(167,139,250,0.8)' : 'rgba(123,97,255,0.5)',
          transition: 'width 0.2s, height 0.2s, border-color 0.2s',
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          mixBlendMode: 'difference',
        }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-purple-400"
        style={{
          x: dx, y: dy,
          translateX: '-50%', translateY: '-50%',
          width: hovering ? 6 : 5,
          height: hovering ? 6 : 5,
          transition: 'width 0.2s, height 0.2s',
        }}
      />
    </>
  )
}
