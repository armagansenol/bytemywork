import s from "./home.module.css"

import cn from "clsx"

import { LogoText } from "@/components/shared/icons"
import { ProjectCard } from "@/components/shared/project-card"
import { ScrambleHover } from "@/components/shared/scramble-hover"
import { Img } from "@/components/utility/img"
import { Wrapper } from "@/components/wrapper"
import { sanityFetch } from "@/lib/sanity/live"
import { settingsQuery } from "@/lib/sanity/queries"
import ScrambleIn from "@/components/shared/scramble-in"

export default async function Home() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  })

  console.log("settings", settings?.highlightedProjects)

  return (
    <Wrapper theme="dark">
      <section className="container-section pt-12 pb-24 flex flex-col">
        <div className="relative">
          <h1 className="text-[12vw] md:text-[8vw] font-bold leading-none tracking-tighter">
            <LogoText />
          </h1>
        </div>
        <p className="text-lg md:text-xl font-light mt-4 ml-0 md:ml-auto">
          <ScrambleIn text={"WEB DESIGN & DEV AGENCY"} scrambleSpeed={50} scrambledLetterCount={5} autoStart={true} />
        </p>
        <p className="max-w-lg text-sm md:text-base font-light mt-8">
          WE COMBINE STRATEGY AND CREATIVITY WITH THE POWER OF TECHNOLOGY TO OFFER SOLUTIONS THAT ADAPT TO EVERY
          PLATFORM IN THE DIGITAL SPACE.
        </p>
      </section>
      <section className="relative h-[600px] w-full">
        <Img src="/img/placeholder.jpg" alt="Aurora Background" className="object-cover" height={600} width={600} />
        <div className="absolute inset-0 bg-black/20" />
        <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white hover:text-gray-200 transition-colors">
          [ PLAY SHOWREEL ]
        </button>
      </section>
      <section className="container-section grid grid-cols-12 md:grid-cols-24 gap-4 md:gap-8 py-24">
        <div className="col-span-12 space-y-4">
          <h2 className="text-base font-semibold">OUR CAPABILITIES</h2>
          <p className="text-sm max-w-md font-light">
            WE LOVE BEING A TRUSTED PARTNER IN THE DIGITAL WORLD FOR BRANDS AND STARTUPS. UNDERSTANDING YOUR NEEDS,
            WE&apos;RE THERE WITH SOLUTIONS AT EVERY STEP.
          </p>
        </div>
        <div className="col-span-12 space-y-1">
          <h3 className="text-2xl md:text-4xl font-bold">
            <ScrambleHover
              text={"WEB DESIGN"}
              scrambleSpeed={60}
              sequential={true}
              revealDirection="start"
              useOriginalCharsOnly={false}
              characters="abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;':\,./<>?"
            />
          </h3>
          <h3 className="text-2xl md:text-4xl font-bold">
            <ScrambleHover
              text={"WEB DEVELOPMENT"}
              scrambleSpeed={60}
              sequential={true}
              revealDirection="start"
              useOriginalCharsOnly={false}
              characters="abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;':\,./<>?"
            />
          </h3>
          <h3 className="text-2xl md:text-4xl font-bold">
            <ScrambleHover
              text={"BRANDING"}
              scrambleSpeed={60}
              sequential={true}
              revealDirection="start"
              useOriginalCharsOnly={false}
              characters="abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;':\,./<>?"
            />
          </h3>
          <h3 className="text-2xl md:text-4xl font-bold">
            <ScrambleHover
              text={"CONTENT CREATION"}
              scrambleSpeed={60}
              sequential={true}
              revealDirection="start"
              useOriginalCharsOnly={false}
              characters="abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;':\,./<>?"
            />
          </h3>
          <h3 className="text-2xl md:text-4xl font-bold">
            <ScrambleHover
              text={"MOTION DESIGN"}
              scrambleSpeed={60}
              sequential={true}
              revealDirection="start"
              useOriginalCharsOnly={false}
              characters="abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;':\,./<>?"
            />
          </h3>
        </div>
      </section>
      <section className="container-section py-16 space-y-32">
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
      </section>
    </Wrapper>
  )
}
