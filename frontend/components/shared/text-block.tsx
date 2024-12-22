import { TextBlockItem } from "@/types"

export interface TextBlockProps {
  items: TextBlockItem[]
  className?: string
}

export function TextBlock({ items, className }: TextBlockProps) {
  return (
    <div className={className}>
      {items.map((item, index) => (
        <div key={index} className="space-y-4">
          {item.heading && <h2 className="text-2xl font-bold tracking-tight">{item.heading}</h2>}
          <p className="text-gray-300 leading-relaxed">{item.content}</p>
        </div>
      ))}
    </div>
  )
}
