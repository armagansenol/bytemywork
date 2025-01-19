import Link from "next/link"
import { cva, type VariantProps } from "class-variance-authority"
import { ScrambleHover } from "@/components/shared/scramble-hover"
import { Img } from "@/components/utility/img"
import { cn } from "@/lib/utils"

const projectCardVariants = cva("cursor-pointer", {
  variants: {
    layout: {
      horizontal: "grid grid-cols-24 gap-8 items-start",
      vertical: "flex flex-col-reverse gap-10",
    },
  },
  defaultVariants: {
    layout: "horizontal",
  },
})

interface ProjectCardProps extends VariantProps<typeof projectCardVariants> {
  title: string
  tags: string[]
  description: string
  image: string
  slug: string
  layout?: "horizontal" | "vertical"
}

export function ProjectCard({ title, tags, description, image, slug, layout }: ProjectCardProps) {
  return (
    <Link className={cn(projectCardVariants({ layout }), "cursor-pointer")} href={`/work/${slug}`}>
      <div className={cn("flex flex-col gap-10", layout === "vertical" ? "w-full" : "col-span-12")}>
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
        <button className="cursor-pointer font-semibold flex items-center gap-2 mt-auto">
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
      <div className={cn("aspect-w-4 aspect-h-3", layout === "vertical" ? "w-full" : "col-span-12")}>
        <Img className="object-cover rounded-lg" src={image} alt={title} width={500} height={500} />
      </div>
    </Link>
  )
}
