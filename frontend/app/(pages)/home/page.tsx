import s from "./home.module.css"

import cn from "clsx"

import { LogoText } from "@/components/shared/icons"
import { ProjectCard } from "@/components/shared/project-card"
import { ScrambleHover } from "@/components/shared/scramble-hover"
import { Img } from "@/components/utility/img"
import { Wrapper } from "@/components/wrapper"
import { sanityFetch } from "@/lib/sanity/live"
import { settingsQuery } from "@/lib/sanity/queries"

export default async function Home() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  })

  console.log("settings", settings?.highlightedProjects)

  return (
    <Wrapper theme="dark">
      <div className={cn(s.home)}>
        <section className="px-6 pt-12 pb-24">
          <div className="container flex flex-col">
            <div className="relative">
              <h1 className="text-[8vw] font-bold leading-none tracking-tighter">
                <LogoText />
              </h1>
            </div>
            <p className="text-xl mt-4 ml-auto">WEB DESIGN & DEV AGENCY</p>
            <p className="max-w-xl mt-8">
              WE COMBINE STRATEGY AND CREATIVITY WITH THE POWER OF TECHNOLOGY TO OFFER SOLUTIONS THAT ADAPT TO EVERY
              PLATFORM IN THE DIGITAL SPACE.
            </p>
          </div>
        </section>
        <section className="relative h-[600px] w-full">
          <Img src="/img/placeholder.jpg" alt="Aurora Background" className="object-cover" height={600} width={600} />
          <div className="absolute inset-0 bg-black/20" />
          <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white hover:text-gray-200 transition-colors">
            [ PLAY SHOWREEL ]
          </button>
        </section>
        <section className="px-6 py-24">
          <div className="container grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-base font-semibold mb-4">OUR CAPABILITIES</h2>
              <p className="text-gray-400 max-w-xl font-light">
                WE LOVE BEING A TRUSTED PARTNER IN THE DIGITAL WORLD FOR BRANDS AND STARTUPS. UNDERSTANDING YOUR NEEDS,
                WE&apos;RE THERE WITH SOLUTIONS AT EVERY STEP.
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="text-4xl font-bold">
                <ScrambleHover
                  text={"WEB DESIGN"}
                  scrambleSpeed={100}
                  maxIterations={4}
                  useOriginalCharsOnly={false}
                  className="cursor-pointer"
                  characters="abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;':\,./<>?"
                />
              </h3>
              <h3 className="text-4xl font-bold">WEB DEVELOPMENT</h3>
              <h3 className="text-4xl font-bold">BRANDING</h3>
              <h3 className="text-4xl font-bold">CONTENT CREATION</h3>
              <h3 className="text-4xl font-bold">MOTION DESIGN</h3>
            </div>
          </div>
        </section>
        <section className="py-16">
          <div className="container px-6">
            <div className="space-y-32">
              {settings?.highlightedProjects?.map((project, index) => (
                <ProjectCard
                  key={index}
                  title={project.projectName ?? ""}
                  tags={project.deliverables ?? []}
                  description={project.description ?? ""}
                  image={project.heroImage?.asset?.url ?? ""}
                  slug={project.slug?.current ?? ""}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </Wrapper>
  )
}
