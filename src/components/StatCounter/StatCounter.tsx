import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './StatCounter.css'

interface StatCounterProps {
  value: number
  suffix: string
  label: string
}

export function StatCounter({ value, suffix, label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [animatedValue, setAnimatedValue] = useState(0)
  const supportsObserver = 'IntersectionObserver' in window

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (reducedMotion || !supportsObserver) return

    let animationFrame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        observer.disconnect()

        const startedAt = performance.now()
        const animate = (now: number) => {
          const progress = Math.min((now - startedAt) / 1000, 1)
          const eased = 1 - (1 - progress) ** 3
          setAnimatedValue(Math.round(value * eased))
          if (progress < 1) animationFrame = requestAnimationFrame(animate)
        }

        animationFrame = requestAnimationFrame(animate)
      },
      { threshold: .65 },
    )

    observer.observe(element)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(animationFrame)
    }
  }, [reducedMotion, supportsObserver, value])

  const displayValue = reducedMotion || !supportsObserver ? value : animatedValue

  return (
    <div className="stat" ref={ref}>
      <span className="stat-value">{displayValue}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}
