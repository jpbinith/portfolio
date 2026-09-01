import type { ReactNode } from 'react'
import { useReveal } from '../../hooks/useReveal'
import './SectionHeading.css'

interface SectionHeadingProps {
  index: string
  kicker: string
  id: string
  children: ReactNode
  lead?: string
}

export function SectionHeading({ index, kicker, id, children, lead }: SectionHeadingProps) {
  const { ref, revealClassName } = useReveal<HTMLDivElement>()

  return (
    <div ref={ref} className={`section-heading ${revealClassName}`}>
      <p className="section-kicker">{index} · {kicker}</p>
      <h2 className="section-title" id={id}>{children}</h2>
      {lead && <p className="section-lead">{lead}</p>}
    </div>
  )
}
