import Image from "next/image"
import Link from "next/link"

interface ProjectCardProps {
  title: string
  tags: string[]
  description: string
  image: string
  slug: string
}

export default function ProjectCard({ title, tags, description, image, slug }: ProjectCardProps) {
  return (
    <div className="group">
      {/* Image Container */}
      <div className="relative aspect-[4/3] mb-6 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium">{title}</h3>

        <div className="flex gap-4">
          {tags.map((tag, index) => (
            <span key={index} className="text-sm text-gray-400">
              {tag}
            </span>
          ))}
        </div>

        <p className="text-gray-400 text-sm max-w-md">{description}</p>

        <Link href={`/work/${slug}`} className="inline-block text-white hover:text-gray-300 transition-colors">
          [ CLICK TO VIEW ]
        </Link>
      </div>
    </div>
  )
}
