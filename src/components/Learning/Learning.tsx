import { learningItems } from '../../data/portfolio'
import { useReveal } from '../../hooks/useReveal'
import type { LearningItem } from '../../types/portfolio'
import { SectionHeading } from '../SectionHeading/SectionHeading'
import './Learning.css'

function LearningCard({ item }: { item: LearningItem }) {
  const { ref, revealClassName } = useReveal<HTMLElement>()

  return (
    <article
      ref={ref}
      className={`learning-card${item.accent ? ' learning-card--accent' : ''} ${revealClassName}`}
    >
      <span className="learning-type">{item.eyebrow}</span>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <div className="learning-footer">
        <span>{item.source}</span>
        {item.href ? (
          <a className="learning-link" href={item.href} target="_blank" rel="noopener noreferrer">
            View paper <span aria-hidden="true">↗</span>
          </a>
        ) : <span>{item.detail}</span>}
      </div>
    </article>
  )
}

export function Learning() {
  return (
    <section className="section shell" id="learning" aria-labelledby="learning-title">
      <SectionHeading
        index="05"
        kicker="Education & research"
        id="learning-title"
        lead="Formal AI training backed by published research and hands-on production engineering experience."
      >
        AI foundations, <span className="outline-text">applied.</span>
      </SectionHeading>

      <div className="learning-grid">
        {learningItems.map((item) => <LearningCard item={item} key={item.title} />)}
      </div>
    </section>
  )
}
