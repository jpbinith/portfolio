import { projects } from '../../data/portfolio'
import { SectionHeading } from '../SectionHeading/SectionHeading'
import { WorkCard } from '../WorkCard/WorkCard'
import './WorkSection.css'

export function WorkSection() {
  return (
    <section className="section shell" id="work" aria-labelledby="work-title">
      <SectionHeading
        index="02"
        kicker="Relevant work"
        id="work-title"
        lead="Evidence of what I would bring to an AI Engineer or Software Engineer role: production AI, backend platforms, distributed systems and operational automation."
      >
        Production work. <span className="outline-text">Real outcomes.</span>
      </SectionHeading>

      <div className="work-list">
        {projects.map((project) => <WorkCard project={project} key={project.index} />)}
      </div>
    </section>
  )
}
