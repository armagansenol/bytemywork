import { cn } from "@/lib/utils"
import { ImageGridItem } from "@/types"
import Image from "next/image"

export interface ImageGridProps {
  items: ImageGridItem[]
}

export function ImageGrid({ items }: ImageGridProps) {
  if (!items || items.length === 0) return null
  if (items.length > 3) {
    console.warn("ImageGrid supports maximum of 3 images. Additional images will be ignored.")
  }

  return (
    <div
      className={cn("grid gap-4", {
        "grid-cols-1": items.length === 1,
        "grid-cols-2": items.length === 2,
        "grid-cols-2 md:grid-cols-3": items.length === 3,
      })}
    >
      {items.slice(0, 3).map((image, index) => (
        <div
          key={index}
          className={cn("relative aspect-[4/3] overflow-hidden rounded-lg", {
            "col-span-2 md:col-span-1": items.length === 3 && index === 0,
          })}
        >
          <Image
            src={image.url}
            alt="Project Image"
            width={parseInt(image.width)}
            height={parseInt(image.height)}
            className="object-cover transition-transform duration-500 hover:scale-105 w-full h-full"
          />
        </div>
      ))}
    </div>
  )
}
