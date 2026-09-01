import { experience } from '../../data/portfolio'
import { useReveal } from '../../hooks/useReveal'
import type { ExperienceItem } from '../../types/portfolio'
import { SectionHeading } from '../SectionHeading/SectionHeading'
import './Experience.css'

function TimelineItem({ item }: { item: ExperienceItem }) {
  const { ref, revealClassName } = useReveal<HTMLElement>()

  return (
    <article ref={ref} className={`timeline-item ${revealClassName}`}>
      <div className="timeline-date">{item.period}</div>
      <div>
        <h3 className="timeline-role">{item.role}</h3>
        <p className="timeline-company">{item.company} · {item.location}</p>
        <p className="timeline-description">{item.description}</p>
      </div>
    </article>
  )
}

export function Experience() {
  const { ref: noteRef, revealClassName: noteRevealClass } = useReveal<HTMLElement>()

  return (
    <section className="section shell" id="experience" aria-labelledby="experience-title">
      <SectionHeading index="03" kicker="Experience" id="experience-title">
        A track record of <span className="outline-text">delivery.</span>
      </SectionHeading>

      <div className="experience-wrap">
        <aside ref={noteRef} className={`experience-note ${noteRevealClass}`}>
          <strong>Where I add value.</strong>
          Teams that need an engineer who can move between AI features, backend architecture and
          product delivery—and turn prototypes into dependable production systems.
        </aside>

        <div className="timeline">
          {experience.map((item) => <TimelineItem item={item} key={`${item.company}-${item.period}`} />)}
        </div>
      </div>
    </section>
  )
}
