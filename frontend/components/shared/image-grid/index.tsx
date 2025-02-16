import cn from "clsx"
import { ImageGridItem, VideoGridItem } from "@/types"
import Image from "next/image"
import MuxVideo from "@/components/mux-player"

export interface ImageGridProps {
  items: (ImageGridItem | VideoGridItem)[]
}

export function ImageGrid({ items }: ImageGridProps) {
  if (!items || items.length === 0) return null
  if (items.length > 3) {
    console.warn("ImageGrid supports maximum of 3 images. Additional images will be ignored.")
  }

  return (
    <div
      className={cn("grid gap-2 sm:gap-4", {
        "grid-cols-1": items.length === 1,
        "grid-cols-1 sm:grid-cols-2": items.length === 2,
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3": items.length === 3,
      })}
    >
      {items.map((item, index) => {
        if ("playbackId" in item) {
          return (
            <div
              key={index}
              className={cn("relative overflow-hidden rounded-lg", {
                "sm:col-span-2 lg:col-span-1": items.length === 3 && index === 0,
              })}
            >
              <MuxVideo playbackId={item.playbackId} title={item.filename} />
            </div>
          )
        }

        return (
          <div
            key={index}
            className={cn("relative overflow-hidden rounded-lg", {
              "sm:col-span-2 lg:col-span-1": items.length === 3 && index === 0,
            })}
          >
            <Image
              src={item.url}
              alt="Project Image"
              width={parseInt(item.width)}
              height={parseInt(item.height)}
              className="object-cover transition-transform duration-500 w-full h-full"
            />
          </div>
        )
      })}
    </div>
  )
}
