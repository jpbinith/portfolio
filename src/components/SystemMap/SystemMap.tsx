import type { PointerEvent } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useReveal } from '../../hooks/useReveal'
import './SystemMap.css'

const nodes = [
  { label: 'AI / RAG', className: 'map-node--ai' },
  { label: 'APIs', className: 'map-node--api' },
  { label: 'Cloud', className: 'map-node--cloud' },
  { label: 'Data', className: 'map-node--data' },
  { label: 'Full-stack', className: 'map-node--ui' },
]

export function SystemMap() {
  const { ref, revealClassName } = useReveal<HTMLDivElement>()
  const reducedMotion = useReducedMotion()

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || !window.matchMedia('(pointer: fine)').matches) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - .5
    const y = (event.clientY - rect.top) / rect.height - .5
    event.currentTarget.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`
  }

  const resetTilt = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.transform = ''
  }

  return (
    <div
      ref={ref}
      className={`system-map ${revealClassName}`}
      role="img"
      aria-label="Interactive visual showing Binith’s connected engineering disciplines"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <div className="orbit" />
      <div className="orbit orbit--two" />
      <div className="core"><span>BJ//</span></div>
      {nodes.map(({ label, className }) => (
        <div className={`map-node ${className}`} key={label}>{label}</div>
      ))}
    </div>
  )
}
