import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const reducedMotion = useReducedMotion()
  const [hasIntersected, setHasIntersected] = useState(false)
  const supportsObserver = 'IntersectionObserver' in window

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (reducedMotion || !supportsObserver) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setHasIntersected(true)
        observer.disconnect()
      },
      { threshold: 0.1, rootMargin: '0px 0px -7% 0px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [reducedMotion, supportsObserver])

  const isVisible = reducedMotion || !supportsObserver || hasIntersected
  return { ref, revealClassName: isVisible ? 'reveal is-visible' : 'reveal' }
}
