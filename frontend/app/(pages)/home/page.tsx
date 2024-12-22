import Footer from "@/components/shared/footer"
import Header from "@/components/shared/header"
import { LogoText } from "@/components/shared/icons"
import { sanityFetch } from "@/sanity/lib/live"
import { settingsQuery } from "@/sanity/lib/queries"
import Image from "next/image"
import Link from "next/link"

export default async function Home() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  })

  console.log("settings", settings?.highlightedProjects)

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <section className="px-6 pt-12 pb-24">
        <div className="container flex flex-col">
          <div className="relative">
            <h1 className="text-[8vw] font-bold leading-none tracking-tighter">
              <LogoText />
            </h1>
          </div>
          <p className="text-xl mt-4 ml-auto">WEB DESIGN & DEV AGENCY</p>
          <p className="max-w-xl mt-8 text-gray-400">
            WE COMBINE STRATEGY AND CREATIVITY WITH THE POWER OF TECHNOLOGY TO OFFER SOLUTIONS THAT ADAPT TO EVERY
            PLATFORM IN THE DIGITAL SPACE.
          </p>
        </div>
      </section>
      <section className="relative h-[600px] w-full">
        <Image src="/img/placeholder.jpg" alt="Aurora Background" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/20" />
        <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white hover:text-gray-200 transition-colors">
          [ PLAY SHOWREEL ]
        </button>
      </section>
      <section className="px-6 py-24 bg-black">
        <div className="container grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold mb-8">OUR CAPABILITIES</h2>
            <p className="text-gray-400 max-w-xl">
              WE LOVE BEING A TRUSTED PARTNER IN THE DIGITAL WORLD FOR BRANDS AND STARTUPS. UNDERSTANDING YOUR NEEDS,
              WE&apos;RE THERE WITH SOLUTIONS AT EVERY STEP.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-3xl font-bold">WEB DESIGN</h3>
            <h3 className="text-3xl font-bold">WEB DEVELOPMENT</h3>
            <h3 className="text-3xl font-bold">BRANDING</h3>
            <h3 className="text-3xl font-bold">CONTENT CREATION</h3>
            <h3 className="text-3xl font-bold">MOTION DESIGN</h3>
          </div>
        </div>
      </section>
      <section className="bg-black text-white py-16">
        <div className="container px-6">
          <div className="space-y-32">
            {settings?.highlightedProjects?.map((project, index) => (
              <Link
                key={index}
                className="grid md:grid-cols-2 gap-8 items-start"
                href={`/work/${project.slug?.current}`}
              >
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
                <div className={`relative h-[400px] ${index % 2 === 0 ? "md:order-last" : ""}`}>
                  <Image
                    className="object-cover rounded-lg"
                    src={project.heroImage?.asset?.url as string}
                    alt={project.heroImage?.alt as string}
                    fill
                  />
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
