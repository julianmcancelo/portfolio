// Pure CSS background — zero JS animation, zero canvas, zero RAF loops
export default function Background() {
  return (
    <>
      {/* Base gradient — FF6/SNES deep night */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{
        background: 'linear-gradient(170deg, #0E0B28 0%, #14103A 35%, #1A1248 65%, #100E30 100%)',
      }} />

      {/* Pixel dot grid — CSS background-image, static, 0 CPU */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle, rgba(200,180,80,0.18) 1px, transparent 1px)`,
        backgroundSize: '28px 28px',
        opacity: 0.5,
      }} />

      {/* Animated nebula — CSS only keyframes, GPU compositor */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div style={{
          position: 'absolute', top: '-20%', left: '-20%',
          width: '70vw', height: '70vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(80,50,180,0.2) 0%, transparent 60%)',
          filter: 'blur(60px)',
          animation: 'nb1 22s ease-in-out infinite',
          willChange: 'transform',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', right: '-15%',
          width: '60vw', height: '60vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(30,90,200,0.15) 0%, transparent 60%)',
          filter: 'blur(70px)',
          animation: 'nb2 28s ease-in-out infinite',
          willChange: 'transform',
        }} />
        <div style={{
          position: 'absolute', top: '35%', right: '10%',
          width: '35vw', height: '35vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,160,40,0.07) 0%, transparent 65%)',
          filter: 'blur(50px)',
          animation: 'nb3 35s ease-in-out infinite',
          willChange: 'transform',
        }} />
      </div>

      {/* Perspective grid lines — CSS, static */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(rgba(100,80,220,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(100,80,220,0.06) 1px, transparent 1px)
        `,
        backgroundSize: '56px 56px',
        maskImage: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.7) 100%)',
        WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.7) 100%)',
      }} />

      {/* Scanlines — CSS only */}
      <div className="fixed inset-0 z-[9995] pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.14) 0px, rgba(0,0,0,0.14) 1px, transparent 1px, transparent 4px)',
      }} />

      {/* Vignette */}
      <div className="fixed inset-0 z-[9994] pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0,0,0,0.6) 100%)',
      }} />

      <style>{`
        @keyframes nb1 {
          0%,100% { transform: translate(0,0) scale(1); }
          40%      { transform: translate(5%,7%) scale(1.06); }
          70%      { transform: translate(-3%,3%) scale(0.96); }
        }
        @keyframes nb2 {
          0%,100% { transform: translate(0,0) scale(1); }
          35%      { transform: translate(-6%,-5%) scale(1.09); }
          75%      { transform: translate(3%,-2%) scale(0.94); }
        }
        @keyframes nb3 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(-4%,5%) scale(1.1); }
        }
      `}</style>
    </>
  )
}
