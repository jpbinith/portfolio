import { stats } from '../../data/portfolio'
import { useReveal } from '../../hooks/useReveal'
import { SectionHeading } from '../SectionHeading/SectionHeading'
import { StatCounter } from '../StatCounter/StatCounter'
import './About.css'

export function About() {
  const { ref: copyRef, revealClassName: copyRevealClass } = useReveal<HTMLDivElement>()

  return (
    <section className="section shell" id="about" aria-labelledby="about-title">
      <div className="about-grid">
        <div className="about-sticky">
          <SectionHeading index="01" kicker="About" id="about-title">
            Engineering with <span className="outline-text">purpose.</span>
          </SectionHeading>
        </div>

        <div ref={copyRef} className={copyRevealClass}>
          <p className="about-copy">
            I turn complex requirements into reliable software.{' '}
            <span className="muted">
              My work sits at the intersection of AI, backend architecture and user-facing products.
            </span>
          </p>
          <p className="about-detail">
            With 4+ years of experience and a Master of Artificial Intelligence with Distinction from
            RMIT, I’ve delivered production platforms in financial services, e-commerce, manufacturing
            and telecommunications. I care about the entire journey—from a model’s output to the API,
            interface, deployment pipeline and person relying on it.
          </p>

          <div className="stats">
            {stats.map((stat) => <StatCounter key={stat.label} {...stat} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
