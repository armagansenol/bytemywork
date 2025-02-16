import { useTranslations } from "next-intl"

export interface FormTranslations {
  inputs: {
    name: { placeholder: string; error: string }
    email: { placeholder: string; error: string }
    phone: { placeholder: string; error: string }
    budget: {
      label: string
      options: { low: string; medium: string; high: string }
      error: string
    }
    projectDetails: { label: string; error: string }
  }
  submit: {
    sending: string
    default: string
  }
}

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

export interface VideoGridItem {
  playbackId: string
  assetId: string
  filename: string
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

export type TFunction = ReturnType<typeof useTranslations<"contactForm">>
