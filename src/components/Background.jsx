import { useEffect, useRef } from 'react'

function PixelCanvas() {
  const ref = useRef()

  useEffect(() => {
    const canvas = ref.current
    const ctx    = canvas.getContext('2d')
    let W, H, raf

    const resize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Square pixel stars — 8-bit style
    const stars = Array.from({ length: 120 }, () => ({
      x:     Math.random() * window.innerWidth,
      y:     Math.random() * window.innerHeight,
      size:  [1, 1, 1, 2, 2, 3][Math.floor(Math.random() * 6)], // pixel sizes
      speed: 0.08 + Math.random() * 0.12,
      alpha: 0.3 + Math.random() * 0.7,
      pulse: Math.random() * Math.PI * 2,
      ps:    0.008 + Math.random() * 0.015,
      color: ['#C8FF00','#A78BFA','#C8A96E','#FFFFFF','#00FFFF'][Math.floor(Math.random() * 5)],
    }))

    // Horizontal scrolling retro grid line (perspective floor)
    let gridOffset = 0

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      // ── Pixel starfield ──────────────────────────────────────────
      stars.forEach(s => {
        s.pulse += s.ps
        s.y -= s.speed
        if (s.y < -4) { s.y = H + 4; s.x = Math.random() * W }

        const a = s.alpha * (0.5 + 0.5 * Math.sin(s.pulse))
        ctx.fillStyle = s.color
        ctx.globalAlpha = a
        // Square pixel — no anti-alias
        ctx.fillRect(Math.round(s.x), Math.round(s.y), s.size, s.size)
      })
      ctx.globalAlpha = 1

      // ── Retro perspective grid (horizon at 55%) ──────────────────
      const hy = H * 0.55        // horizon y
      const lines = 18
      const cols  = 14
      gridOffset = (gridOffset + 0.4) % (H * 0.45 / lines)

      ctx.strokeStyle = '#3A1C6E'
      ctx.lineWidth   = 1

      // Horizontal lines — perspective
      for (let i = 0; i <= lines; i++) {
        const t  = (i / lines)
        const yt = hy + (H - hy) * (t * t) + gridOffset * (1 - t)
        if (yt < hy || yt > H + 2) continue
        const alpha = 0.08 + 0.25 * t
        ctx.globalAlpha = alpha
        ctx.beginPath()
        ctx.moveTo(0, yt)
        ctx.lineTo(W, yt)
        ctx.stroke()
      }

      // Vertical lines — fan out from vanishing point
      ctx.globalAlpha = 0.07
      const vx = W / 2
      for (let c = 0; c <= cols; c++) {
        const tx = (c / cols - 0.5) * 2        // -1 to 1
        ctx.beginPath()
        ctx.moveTo(vx + tx * W * 0.15, hy)
        ctx.lineTo(vx + tx * W * 0.65, H + 10)
        ctx.stroke()
      }
      ctx.globalAlpha = 1

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={ref} className="fixed inset-0 z-0 pointer-events-none" />
}

export default function Background() {
  return (
    <>
      {/* Base — deep retro night */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{
        background: 'linear-gradient(180deg, #020210 0%, #06031A 40%, #0D0526 70%, #130833 100%)',
      }} />

      {/* Nebula blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div style={{
          position: 'absolute', top: '-5%', left: '-15%',
          width: '55vw', height: '55vw', borderRadius: '50%', filter: 'blur(70px)',
          background: 'radial-gradient(circle, rgba(80,30,160,0.22) 0%, transparent 65%)',
          animation: 'nb1 20s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '-10%',
          width: '50vw', height: '50vw', borderRadius: '50%', filter: 'blur(80px)',
          background: 'radial-gradient(circle, rgba(20,80,180,0.16) 0%, transparent 65%)',
          animation: 'nb2 25s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', top: '30%', right: '20%',
          width: '30vw', height: '30vw', borderRadius: '50%', filter: 'blur(60px)',
          background: 'radial-gradient(circle, rgba(180,130,50,0.07) 0%, transparent 70%)',
          animation: 'nb3 32s ease-in-out infinite',
        }} />
      </div>

      {/* Pixel canvas — stars + perspective grid */}
      <PixelCanvas />

      {/* Heavy CRT scanlines */}
      <div className="fixed inset-0 z-[9995] pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 1px, transparent 4px)',
      }} />

      {/* RGB pixel aberration fringe — top & bottom */}
      <div className="fixed inset-x-0 top-0 h-32 z-[9994] pointer-events-none" style={{
        background: 'linear-gradient(180deg, rgba(200,255,0,0.03) 0%, transparent 100%)',
      }} />
      <div className="fixed inset-x-0 bottom-0 h-32 z-[9994] pointer-events-none" style={{
        background: 'linear-gradient(0deg, rgba(167,139,250,0.05) 0%, transparent 100%)',
      }} />

      {/* CRT vignette */}
      <div className="fixed inset-0 z-[9993] pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,0.65) 100%)',
      }} />

      <style>{`
        @keyframes nb1 { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(4%,6%) scale(1.06)} 70%{transform:translate(-3%,2%) scale(0.97)} }
        @keyframes nb2 { 0%,100%{transform:translate(0,0) scale(1)} 35%{transform:translate(-5%,-5%) scale(1.08)} 75%{transform:translate(2%,-2%) scale(0.94)} }
        @keyframes nb3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-4%,4%) scale(1.12)} }
      `}</style>
    </>
  )
}
