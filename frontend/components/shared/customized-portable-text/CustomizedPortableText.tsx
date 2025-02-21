import { PortableText, PortableTextBlock, PortableTextComponents } from "@portabletext/react"

export interface CustomizedPortableTextProps {
  content: PortableTextBlock[]
}

export default function CustomizedPortableText(props: CustomizedPortableTextProps) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => <p className="mb-4">{children}</p>,
    },
  }

  return <PortableText value={props.content} components={components} />
}
