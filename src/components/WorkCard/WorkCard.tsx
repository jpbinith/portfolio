import { useReveal } from '../../hooks/useReveal'
import type { Project } from '../../types/portfolio'
import { WorkVisual } from '../WorkVisual/WorkVisual'
import './WorkCard.css'

interface WorkCardProps {
  project: Project
}

export function WorkCard({ project }: WorkCardProps) {
  const { ref, revealClassName } = useReveal<HTMLElement>()

  return (
    <article ref={ref} className={`work-card ${revealClassName}`}>
      <div className="work-content">
        <div className="work-meta">
          <span className="work-index">{project.index} / {project.category}</span>
          <span>{project.company}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tags">
          {project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
        </div>
      </div>
      <WorkVisual type={project.visual} />
    </article>
  )
}
