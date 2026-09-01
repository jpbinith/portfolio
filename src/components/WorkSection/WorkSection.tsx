import { projects } from '../../data/portfolio'
import { SectionHeading } from '../SectionHeading/SectionHeading'
import { WorkCard } from '../WorkCard/WorkCard'
import './WorkSection.css'

export function WorkSection() {
  return (
    <section className="section shell" id="work" aria-labelledby="work-title">
      <SectionHeading
        index="02"
        kicker="Selected work"
        id="work-title"
        lead="A selection of production challenges spanning intelligent document processing, financial platforms, commerce and operational automation."
      >
        Systems built to <span className="outline-text">perform.</span>
      </SectionHeading>

      <div className="work-list">
        {projects.map((project) => <WorkCard project={project} key={project.index} />)}
      </div>
    </section>
  )
}
