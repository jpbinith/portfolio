import { useEffect } from 'react'
import { About } from './components/About/About'
import { Contact } from './components/Contact/Contact'
import { Experience } from './components/Experience/Experience'
import { F1DrivingIntro } from './components/F1DrivingIntro/F1DrivingIntro'
import { Header } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'
import { Learning } from './components/Learning/Learning'
import { Marquee } from './components/Marquee/Marquee'
import { ScrollEffects } from './components/ScrollEffects/ScrollEffects'
import { Skills } from './components/Skills/Skills'
import { WorkSection } from './components/WorkSection/WorkSection'
import './App.css'

function App() {
  useEffect(() => {
    const sectionId = window.location.hash.slice(1)
    if (!sectionId) return

    const animationFrame = requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView()
    })

    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <F1DrivingIntro />
      <ScrollEffects />
      <Header />

      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <WorkSection />
        <Experience />
        <Skills />
        <Learning />
        <Contact />
      </main>
    </>
  )
}

export default App
