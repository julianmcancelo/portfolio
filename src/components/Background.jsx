import { useEffect, useRef } from 'react'

// Pure CSS/Canvas background — FF-style atmospheric, zero Three.js
// Uses a small 2D canvas for drifting particles only
function Particles() {
  const ref = useRef()

  useEffect(() => {
    const canvas = ref.current
    const ctx    = canvas.getContext('2d')
    let W = window.innerWidth
    let H = window.innerHeight
    let raf

    canvas.width  = W
    canvas.height = H

    const resize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width  = W
      canvas.height = H
    }
    window.addEventListener('resize', resize)

    // ~80 tiny drifting stars — Final Fantasy crystal/star feel
    const stars = Array.from({ length: 80 }, () => ({
      x:     Math.random() * W,
      y:     Math.random() * H,
      r:     0.4 + Math.random() * 1.2,
      a:     Math.random() * Math.PI * 2,
      speed: 0.1 + Math.random() * 0.15,
      alpha: 0.2 + Math.random() * 0.6,
      pulse: Math.random() * Math.PI * 2,
      pspeed: 0.005 + Math.random() * 0.012,
      color: Math.random() > 0.7 ? '#C8A96E' : (Math.random() > 0.5 ? '#A78BFA' : '#E8E8FF'),
    }))

    const draw = (t) => {
      ctx.clearRect(0, 0, W, H)
      stars.forEach(s => {
        s.pulse += s.pspeed
        s.x += Math.cos(s.a) * s.speed * 0.3
        s.y += Math.sin(s.a) * s.speed * 0.15 - 0.08 // slow upward drift
        if (s.y < -4) { s.y = H + 4; s.x = Math.random() * W }
        if (s.x < -4) s.x = W + 4
        if (s.x > W + 4) s.x = -4

        const alpha = s.alpha * (0.6 + 0.4 * Math.sin(s.pulse))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = s.color
        ctx.globalAlpha = alpha
        ctx.fill()

        // Tiny cross sparkle on larger stars
        if (s.r > 1.0) {
          ctx.globalAlpha = alpha * 0.5
          ctx.strokeStyle = s.color
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(s.x - s.r * 3, s.y)
          ctx.lineTo(s.x + s.r * 3, s.y)
          ctx.moveTo(s.x, s.y - s.r * 3)
          ctx.lineTo(s.x, s.y + s.r * 3)
          ctx.stroke()
        }
        ctx.globalAlpha = 1
      })
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.9 }}
    />
  )
}

export default function Background() {
  return (
    <>
      {/* Deep FF atmospheric gradient base */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{
        background: 'linear-gradient(160deg, #07041A 0%, #0D0928 30%, #110833 60%, #0A0620 100%)',
      }} />

      {/* Aurora/nebula blobs — CSS only, no perf cost */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Top-left nebula */}
        <div style={{
          position: 'absolute', top: '-10%', left: '-10%',
          width: '60vw', height: '60vw',
          background: 'radial-gradient(circle, rgba(91,46,183,0.18) 0%, transparent 65%)',
          animation: 'floatA 18s ease-in-out infinite',
          borderRadius: '50%',
          filter: 'blur(40px)',
        }} />
        {/* Bottom-right nebula */}
        <div style={{
          position: 'absolute', bottom: '-15%', right: '-10%',
          width: '55vw', height: '55vw',
          background: 'radial-gradient(circle, rgba(26,100,183,0.14) 0%, transparent 65%)',
          animation: 'floatB 22s ease-in-out infinite',
          borderRadius: '50%',
          filter: 'blur(50px)',
        }} />
        {/* Center subtle gold — FF crystal light */}
        <div style={{
          position: 'absolute', top: '40%', left: '40%',
          width: '40vw', height: '40vw',
          background: 'radial-gradient(circle, rgba(200,169,110,0.05) 0%, transparent 70%)',
          animation: 'floatC 28s ease-in-out infinite',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }} />
      </div>

      <style>{`
        @keyframes floatA {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(3%,5%) scale(1.05); }
          66%      { transform: translate(-2%,3%) scale(0.97); }
        }
        @keyframes floatB {
          0%,100% { transform: translate(0,0) scale(1); }
          40%      { transform: translate(-4%,-6%) scale(1.08); }
          70%      { transform: translate(3%,-3%) scale(0.95); }
        }
        @keyframes floatC {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(-5%,5%) scale(1.1); }
        }
      `}</style>

      {/* 2D canvas particles */}
      <Particles />
    </>
  )
}
