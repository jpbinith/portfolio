export type Theme = 'dark' | 'light'

export type ProjectVisual = 'documents' | 'dashboard' | 'commerce' | 'pipeline'

export interface Project {
  index: string
  category: string
  company: string
  title: string
  description: string
  tags: string[]
  visual: ProjectVisual
}

export interface ExperienceItem {
  period: string
  role: string
  company: string
  location: string
  description: string
}

export interface SkillGroup {
  number: string
  category: string
  title: string
  skills: string[]
}

export interface LearningItem {
  eyebrow: string
  title: string
  description: string
  source: string
  detail?: string
  href?: string
  accent?: boolean
}
