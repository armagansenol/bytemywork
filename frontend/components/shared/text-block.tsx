export interface TextBlockProps {
  heading?: string
  content: string
  className?: string
}

export function TextBlock({ heading, content, className }: TextBlockProps) {
  return (
    <div className={className}>
      <div className="space-y-6">
        {heading && <h2 className="text-2xl font-bold tracking-wider uppercase">{heading}</h2>}
        <p className="text-gray-300 leading-relaxed tracking-wide uppercase text-sm">{content}</p>
      </div>
    </div>
  )
}
