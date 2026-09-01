import { skillGroups } from '../../data/portfolio'
import { useReveal } from '../../hooks/useReveal'
import type { SkillGroup as SkillGroupData } from '../../types/portfolio'
import { SectionHeading } from '../SectionHeading/SectionHeading'
import './Skills.css'

function SkillGroup({ group }: { group: SkillGroupData }) {
  return (
    <article className="skill-group">
      <span className="skill-number">{group.number} / {group.category}</span>
      <h3>{group.title}</h3>
      <p className="skill-list">{group.skills.join(' · ')}</p>
    </article>
  )
}

export function Skills() {
  const { ref, revealClassName } = useReveal<HTMLDivElement>()

  return (
    <section className="section shell" id="skills" aria-labelledby="skills-title">
      <SectionHeading index="04" kicker="Capabilities" id="skills-title">
        The engineering <span className="outline-text">toolkit.</span>
      </SectionHeading>

      <div ref={ref} className={`skills-panel ${revealClassName}`}>
        {skillGroups.map((group) => <SkillGroup group={group} key={group.number} />)}
      </div>
    </section>
  )
}
