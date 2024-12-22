export interface ProjectIntro {
  projectName: string
  description: string
  companyName: string
  heroImage: {
    src: string
    alt: string
  }
  client: string
  date: string
  deliverables: string[]
  websiteUrl: string
}

export interface ImageGridItem {
  url: string
  width: string
  height: string
}

export interface TextBlockItem {
  heading?: string
  content: string
}

export type ComponentType = "ImageGrid" | "TextBlock"

export interface ContentBlock {
  component: ComponentType
  items: (ImageGridItem | TextBlockItem)[]
}

export interface ProjectDetail extends ProjectIntro {
  slug: string
  body: ContentBlock[]
}

export type CursorType = {
  default: "default"
  view: "view"
}
