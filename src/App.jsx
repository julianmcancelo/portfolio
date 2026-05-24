import { useEffect, lazy, Suspense } from 'react'
import Lenis from 'lenis'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Stack from './sections/Stack'
import Contact from './sections/Contact'
import Footer from './components/Footer'

const Background = lazy(() => import('./components/Background'))

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf) }
    const id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])

  return (
    <>
      {/* 3D particles background — lazy, non-blocking */}
      <Suspense fallback={null}>
        <Background />
      </Suspense>

      <Cursor />
      <Nav />

      <main>
        <Hero />
        <About />
        <Projects />
        <Stack />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
