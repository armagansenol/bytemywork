import cn from "clsx"

export interface TextBlockProps {
  heading?: string
  content: string
  className?: string
}

export function TextBlock({ heading, content, className }: TextBlockProps) {
  return (
    <div className={cn("grid grid-cols-24 gap-8 py-10", className)}>
      {heading && <h2 className="col-span-9 text-3xl font-bold tracking-wider uppercase">{heading}</h2>}
      <p className="col-span-15 text-gray-300 leading-relaxed tracking-wide uppercase text-sm">{content}</p>
    </div>
  )
}
