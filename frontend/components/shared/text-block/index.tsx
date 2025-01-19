import cn from "clsx"

export interface TextBlockProps {
  heading?: string
  content: string
  className?: string
}

export function TextBlock({ heading, content, className }: TextBlockProps) {
  return (
    <div className={cn("grid gap-4 py-6 md:grid-cols-24 md:gap-8 md:py-10", className)}>
      {heading && (
        <h2 className="col-span-full text-2xl font-bold tracking-wider uppercase md:col-span-9 md:text-3xl">
          {heading}
        </h2>
      )}
      <p className="col-span-full text-gray-300 leading-relaxed tracking-wide uppercase text-sm md:col-span-15">
        {content}
      </p>
    </div>
  )
}
