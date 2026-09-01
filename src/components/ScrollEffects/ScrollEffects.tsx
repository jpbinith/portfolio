import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './ScrollEffects.css'

export function ScrollEffects() {
  const progressRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const progress = progressRef.current
    if (!progress) return

    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 0
      progress.style.transform = `scaleX(${ratio})`
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  useEffect(() => {
    const spotlight = spotlightRef.current
    const finePointer = window.matchMedia('(pointer: fine)').matches
    if (!spotlight || reducedMotion || !finePointer) return

    const updateSpotlight = (event: PointerEvent) => {
      spotlight.style.transform = `translate(${event.clientX - 304}px, ${event.clientY - 304}px)`
    }

    window.addEventListener('pointermove', updateSpotlight, { passive: true })
    return () => window.removeEventListener('pointermove', updateSpotlight)
  }, [reducedMotion])

  return (
    <>
      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />
      <div ref={spotlightRef} className="spotlight" aria-hidden="true" />
    </>
  )
}
