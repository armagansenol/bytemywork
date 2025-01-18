import Footer from "@/components/shared/footer"
import Header from "@/components/shared/header"
import { Img } from "@/components/utility/img"
import { sanityFetch } from "@/lib/sanity/live"
import { getProjectsQuery } from "@/lib/sanity/queries"
import Link from "next/link"

export default async function Page() {
  const { data: projects } = await sanityFetch({
    query: getProjectsQuery,
  })

  console.log("projects", projects)

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <section className="py-8 bg-black">
        <div className="container mx-auto px-6">
          <div className="mb-16 space-y-4">
            <h2 className="text-3xl font-bold">TRANSFORMING IDEAS INTO BYTES -</h2>
            <p className="text-3xl font-bold">EXPLORE OUR WORK!</p>
          </div>
          <div className="grid md:grid-cols-2 gap-16">
            {projects.map((project, index) => (
              <Link key={index} className="flex flex-col items-start" href={`/work/${project.slug?.current}`}>
                <div className={`relative w-full h-[500px]`}>
                  <Img
                    src={project.heroImage?.asset?.url as string}
                    alt={project.heroImage?.alt as string}
                    width={1000}
                    height={1000}
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">{project.projectName}</h2>
                  <div className="flex gap-4">
                    {project.deliverables?.map((tag, tagIndex) => (
                      <span key={tagIndex} className="text-sm text-gray-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-400 max-w-md">{project.description}</p>
                  <button className="text-white hover:text-gray-300 transition-colors">[ CLICK TO VIEW ]</button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
