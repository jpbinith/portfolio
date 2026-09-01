import type {
  ExperienceItem,
  LearningItem,
  Project,
  SkillGroup,
} from '../types/portfolio'

export const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
]

export const marqueeItems = [
  'Python',
  'Java',
  'TypeScript',
  'RAG',
  'Cloud',
  'Distributed systems',
  'Full-stack',
]

export const stats = [
  { value: 4, suffix: '+', label: 'Years building production software' },
  { value: 50, suffix: 'K+', label: 'Daily users served in e-commerce' },
  { value: 10, suffix: 'K+', label: 'Active users on adviser platform' },
  { value: 50, suffix: '%', label: 'Reduction in deployment time' },
]

export const projects: Project[] = [
  {
    index: '01',
    category: 'AI',
    company: 'Triple A Super',
    title: 'Document intelligence',
    description:
      'Designed LLM-powered workflows combining OCR, model inference and automated validation to extract and classify financial information. Extended the capability with RAG, embeddings and enterprise data sources.',
    tags: ['LLMs', 'RAG', 'OCR', 'MongoDB', 'AWS S3'],
    visual: 'documents',
  },
  {
    index: '02',
    category: 'Platform',
    company: 'Triple A Super',
    title: 'Adviser platform',
    description:
      'Delivered and enhanced a financial adviser and fund-management platform serving 10,000+ active users. Built APIs, scheduled jobs and integrations to synchronise financial data, documents and workflows.',
    tags: ['Python', 'Django', 'Vue.js', 'Oracle SQL', 'AWS / OCI'],
    visual: 'dashboard',
  },
  {
    index: '03',
    category: 'Scale',
    company: 'SyscoLabs',
    title: 'High-traffic commerce',
    description:
      'Built distributed, full-stack features for Sysco’s US and Canadian e-commerce platform—serving 50,000+ daily users and millions of backend requests—with personalised rewards, promotions and recommendations.',
    tags: ['Java', 'Spring Boot', 'Node.js', 'React', 'GraphQL', 'AWS'],
    visual: 'commerce',
  },
  {
    index: '04',
    category: 'Automation',
    company: 'FcodeLabs',
    title: 'Production operations',
    description:
      'Designed an enterprise production-management platform for approximately 500 operational users, including serverless services and OCR-based purchase-order and invoice-processing workflows.',
    tags: ['NestJS', 'Angular', 'GraphQL', 'AWS Lambda', 'OCR'],
    visual: 'pipeline',
  },
]

export const experience: ExperienceItem[] = [
  {
    period: 'Mar 2025 — Now',
    role: 'AI Software Engineer',
    company: 'Triple A Super',
    location: 'Melbourne',
    description:
      'Building production LLM, OCR and RAG workflows alongside Python and Django APIs, financial-data integrations and full-stack platform features; owning delivery across Docker, Nginx and CI/CD.',
  },
  {
    period: 'Mar 2023 — Feb 2024',
    role: 'Senior Software Engineer',
    company: 'SyscoLabs',
    location: 'Sri Lanka',
    description:
      'Delivered Java, Spring Boot, Node.js, React and GraphQL features for a high-traffic distributed commerce platform, while mentoring junior engineers across implementation, debugging and code quality.',
  },
  {
    period: 'Sep 2021 — Mar 2023',
    role: 'Software Engineer',
    company: 'FcodeLabs',
    location: 'Sri Lanka',
    description:
      'Built NestJS and GraphQL APIs, Angular interfaces, AWS services and OCR automation for an enterprise production platform, working directly with stakeholders and guiding junior developers.',
  },
  {
    period: 'Feb 2021 — Sep 2021',
    role: 'Software Engineer',
    company: 'Axiata Digital Labs',
    location: 'Sri Lanka',
    description:
      'Developed Java and Spring Boot services, REST APIs and third-party integrations while helping move monolithic telecommunications workflows toward scalable microservices.',
  },
]

export const skillGroups: SkillGroup[] = [
  {
    number: '01',
    category: 'Languages',
    title: 'Core languages',
    skills: ['Python', 'Java', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    number: '02',
    category: 'Backend',
    title: 'Backend engineering',
    skills: [
      'Django',
      'Flask',
      'Spring Boot',
      'Node.js',
      'NestJS',
      'Express',
      '.NET',
      'REST',
      'GraphQL',
      'SOAP',
      'Microservices',
    ],
  },
  {
    number: '03',
    category: 'AI & ML',
    title: 'Applied AI',
    skills: [
      'Generative AI',
      'LLMs',
      'RAG',
      'LangChain',
      'Embeddings',
      'Prompt Engineering',
      'OCR',
      'Model Inference',
      'Evaluation',
    ],
  },
  {
    number: '04',
    category: 'Frontend',
    title: 'Product interfaces',
    skills: ['React', 'Next.js', 'Vue.js', 'Angular', 'HTML', 'CSS'],
  },
  {
    number: '05',
    category: 'Platform',
    title: 'Cloud delivery',
    skills: [
      'AWS',
      'Microsoft Azure',
      'OCI',
      'Docker',
      'Kubernetes',
      'Jenkins',
      'Nginx',
      'CI/CD',
    ],
  },
  {
    number: '06',
    category: 'Data',
    title: 'Data systems',
    skills: [
      'PostgreSQL',
      'Oracle Database',
      'MongoDB',
      'Vector Databases',
      'Distributed Systems',
      'Event-Driven Architecture',
    ],
  },
]

export const learningItems: LearningItem[] = [
  {
    eyebrow: 'Master’s degree · 2024–2025',
    title: 'Artificial Intelligence',
    description:
      'Master of Artificial Intelligence with Distinction from RMIT University, Melbourne.',
    source: 'RMIT University',
    detail: 'Distinction',
    accent: true,
  },
  {
    eyebrow: 'Published research · ICTer 2021',
    title: 'Optimising image pipelines',
    description:
      'A Python and genetic-programming approach for automatically finding an optimal image-processing pipeline.',
    source: 'IEEE Xplore',
    href: 'https://ieeexplore.ieee.org/document/9774817',
  },
]
