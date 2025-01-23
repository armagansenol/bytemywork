import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import Link from "next/link"

import { ScrambleText } from "@/components/shared/scramble-text"
import { Img } from "@/components/utility/img"

const projectCardVariants = cva("cursor-pointer", {
  variants: {
    layout: {
      horizontal: "grid grid-cols-12 lg:grid-cols-24 gap-4 lg:gap-8 items-start",
      vertical: "flex flex-col-reverse gap-6 lg:gap-10",
    },
  },
  defaultVariants: {
    layout: "horizontal",
  },
})

interface ProjectCardProps extends VariantProps<typeof projectCardVariants> {
  layout?: "horizontal" | "vertical"
  projectName: string
  deliverables?: string[]
  description: string
  heroImage: string
  slug: string
}

export function ProjectCard({
  projectName,
  deliverables,
  description,
  heroImage: image,
  slug,
  layout,
}: ProjectCardProps) {
  return (
    <Link className={cn(projectCardVariants({ layout }), "cursor-pointer")} href={`/work/${slug}`}>
      <div className={cn(layout === "vertical" ? "w-full" : "col-span-12", "lg:order-1 order-2 space-y-10")}>
        <div className="space-y-2">
          <h2 className="text-sm lg:text-base font-semibold">{projectName}</h2>
          <div className="flex flex-wrap gap-2 lg:gap-4">
            {deliverables?.map((deliverable, deliverableIndex) => (
              <span key={deliverableIndex} className="text-xs lg:text-sm text-namara-grey">
                {deliverable}
              </span>
            ))}
          </div>
        </div>
        <p className="text-sm lg:text-base font-light max-w-md">{description}</p>
        <button className="cursor-pointer font-semibold flex items-center gap-2 mt-auto text-sm lg:text-base">
          <span className="block"> [ </span>
          <span className="block">
            <ScrambleText text={"CLICK TO VIEW"} scrambleSpeed={30} />
          </span>
          <span className="block"> ] </span>
        </button>
      </div>
      <div
        className={cn("aspect-w-4 aspect-h-3", layout === "vertical" ? "w-full" : "col-span-12", "lg:order-2 order-1")}
      >
        <Img className="object-cover rounded-lg" src={image} alt="Project Cover Image" width={500} height={500} />
      </div>
    </Link>
  )
}
