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
    <Link className="cursor-pointer grid grid-cols-24 gap-8 items-start" href={`/work/${slug}`}>
      <div className="col-span-12 space-y-10">
        <div className="space-y-2">
          <h2 className="text-base font-semibold">{title}</h2>
          <div className="flex gap-4">
            {tags.map((tag, tagIndex) => (
              <span key={tagIndex} className="text-sm text-namara-grey">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <p className="font-light max-w-md">{description}</p>
        <button className="cursor-pointer font-semibold flex items-center gap-2">
          <span className="block"> [ </span>
          <span className="block">
            <ScrambleHover
              text={"CLICK TO VIEW"}
              scrambleSpeed={40}
              sequential={true}
              revealDirection="start"
              useOriginalCharsOnly={false}
              characters="abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;':\,./<>?"
            />
          </span>
          <span className="block"> ] </span>
        </button>
      </div>
      <div className="col-span-12 aspect-w-4 aspect-h-3">
        <Img className="object-cover rounded-lg" src={image} alt={title} width={500} height={500} />
      </div>
    </Link>
  )
}
