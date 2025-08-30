export type LocalizedString = Record<string, string> // e.g., { en: 'Title', tr: 'Başlık' }

export interface CMSImage {
  url: string
  width?: number
  height?: number
  alt?: string
}

export interface Deliverable {
  id: string
  title: string
}

export interface ProjectSummary {
  id: string
  projectName: string
  slug: string
  heroImage?: CMSImage
  deliverables?: Deliverable[]
}

export interface ProjectDetail extends ProjectSummary {
  client?: string
  date?: string
  techStack?: { id: string; title: string }[]
  websiteUrl?: string
  body?: unknown // leave flexible; map Portable Text/blocks later
  translations?: Array<{ language: string; slug?: string; projectName?: string }>
}

export interface Settings {
  highlightedProjects: ProjectSummary[]
  translations?: Array<{ language: string }>
}

export interface ContactFormInput {
  name: string
  email: string
  message: string
}
