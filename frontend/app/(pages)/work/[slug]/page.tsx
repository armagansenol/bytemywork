import Footer from "@/components/shared/footer"
import Header from "@/components/shared/header"
import { ImageGrid } from "@/components/shared/image-grid"
import { Img } from "@/components/utility/img"
import { sanityFetch } from "@/lib/sanity/live"
import { getProjectQuery } from "@/lib/sanity/queries"
import Link from "next/link"

type Props = {
  params: Promise<{ slug: string }>
}

type ImageGridBlock = {
  component: "ImageGrid"
  items?: Array<{
    url: string | null
    width: number | null
    height: number | null
    alt: string | null
  }>
}

type TextBlock = {
  component: "TextBlock"
  title: string
  description: string
}

type Block = ImageGridBlock | TextBlock

export default async function Page(props: Props) {
  const params = await props.params
  const [{ data: project }] = await Promise.all([sanityFetch({ query: getProjectQuery, params })])

  console.log(
    "project",
    project?.body?.map((block) => block)
  )

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="container mx-auto px-6 py-12 space-y-10">
        <section>
          <Link href="/work" className="inline-block mb-16 hover:text-gray-300 transition-colors">
            [ BACK TO WORKS ]
          </Link>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-7xl font-bold leading-none tracking-tighter">{project?.projectName}</h1>
              <p className="text-lg text-gray-300 max-w-xl">
                {project?.description} - {project?.companyName}
              </p>
            </div>
            <div className="relative">
              <Img
                src={project?.heroImage?.url as string}
                alt={project?.heroImage?.alt as string}
                width={project?.heroImage?.width as number}
                height={project?.heroImage?.height as number}
                className="w-full object-cover rounded-lg"
              />
              <Link href="/" className="absolute bottom-4 right-4 hover:text-gray-300 transition-colors">
                [ START A PROJECT ]
              </Link>
            </div>
          </div>
          <div className="grid md:grid-cols-4 gap-8 mt-24 pt-12">
            <div>
              <h2 className="text-lg font-medium mb-4">CLIENT</h2>
              <p className="text-gray-400">{project?.client}</p>
            </div>
            <div>
              <h2 className="text-lg font-medium mb-4">DATE</h2>
              <p className="text-gray-400">{project?.date}</p>
            </div>
            <div>
              <h2 className="text-lg font-medium mb-4">DELIVERABLES</h2>
              {Array.isArray(project?.deliverables) && project.deliverables.length > 0 ? (
                <ul className="space-y-2 text-gray-400">
                  {project.deliverables.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No deliverables specified</p>
              )}
            </div>
            <div className="text-right">
              <Link href={project?.websiteUrl as string} className="inline-block hover:text-gray-300 transition-colors">
                [ VISIT WEBSITE ]
              </Link>
            </div>
          </div>
        </section>
        <section className="container mx-auto">
          <div className="space-y-12">
            {((project?.body || []) as Block[]).map((block: Block, index) => {
              if (block.component === "ImageGrid") {
                const gridItems =
                  block.items?.map((item) => ({
                    url: item.url || "",
                    width: String(item.width || 0),
                    height: String(item.height || 0),
                    alt: item.alt || "",
                  })) || []
                return (
                  <div key={index}>
                    <ImageGrid items={gridItems} />
                  </div>
                )
              }
              if (block.component === "TextBlock") {
                return (
                  <div key={index} className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6">{block.title}</h2>
                    <div className="whitespace-pre-wrap text-gray-300">{block.description}</div>
                  </div>
                )
              }
              return null
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
