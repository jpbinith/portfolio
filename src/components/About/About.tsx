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
          <SectionHeading index="01" kicker="Professional profile" id="about-title">
            AI depth. <span className="outline-text">Software breadth.</span>
          </SectionHeading>
        </div>

        <div ref={copyRef} className={copyRevealClass}>
          <p className="about-copy">
            I’m an AI and software engineer who takes products from an unclear problem to reliable
            production software.{' '}
            <span className="muted">
              I combine applied AI with strong backend and full-stack engineering.
            </span>
          </p>
          <p className="about-detail">
            I can design LLM and RAG workflows, build APIs and data integrations, deliver usable
            interfaces, and own cloud deployment. Backed by 4+ years of industry experience and a
            Master of Artificial Intelligence with Distinction from RMIT, I’ve shipped systems across
            financial services, e-commerce, manufacturing and telecommunications.
          </p>

          <div className="stats">
            {stats.map((stat) => <StatCounter key={stat.label} {...stat} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
