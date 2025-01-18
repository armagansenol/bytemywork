import Link from "next/link"

import { ScrambleHover } from "@/components/shared/scramble-hover"
import { Img } from "@/components/utility/img"

interface ProjectCardProps {
  title: string
  tags: string[]
  description: string
  image: string
  slug: string
}

export function ProjectCard({ title, tags, description, image, slug }: ProjectCardProps) {
  return (
    <Link className="grid md:grid-cols-2 gap-8 items-start" href={`/work/${slug}`}>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex gap-4">
          {tags.map((tag, tagIndex) => (
            <span key={tagIndex} className="text-sm text-gray-400">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-gray-400 max-w-md">{description}</p>
        <button className="cursor-pointer flex items-center gap-2">
          <span className="block"> [ </span>
          <span className="block">
            <ScrambleHover text="CLICK TO VIEW" />
          </span>
          <span className="block"> ] </span>
        </button>
      </div>
      <div className="relative h-[400px]">
        <Img className="object-cover rounded-lg" src={image} alt={title} width={500} height={500} />
      </div>
    </Link>
  )
}
