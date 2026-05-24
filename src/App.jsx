import Background from './components/Background'
import Nav from './components/Nav'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Stack from './sections/Stack'
import Contact from './sections/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Background />
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
