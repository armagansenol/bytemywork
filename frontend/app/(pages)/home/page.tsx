import s from "./home.module.css"

import { ProjectCard } from "@/components/shared/project-card"
import { ScrambleHover } from "@/components/shared/scramble-hover"
import { ScrambleIn } from "@/components/shared/scramble-in"
import { SpinningBoxSection } from "@/components/shared/teeth"
import { Img } from "@/components/utility/img"
import { Wrapper } from "@/components/wrapper"
import { sanityFetch } from "@/sanity/lib/live"
import { settingsQuery } from "@/sanity/lib/queries"

export default async function Home() {
  const [{ data: settings }] = await Promise.all([
    sanityFetch({
      query: settingsQuery,
    }),
  ])

  return (
    <Wrapper className={s.home} theme="dark">
      <section className="container-section pt-12 pb-24 flex flex-col relative">
        <div className="relative flex justify-center items-center">
          {/* <h1 className="text-[12vw] md:text-[8vw] font-bold leading-none tracking-tighter">
            <LogoText />
          </h1> */}
          <div className={s.teeth}>
            <SpinningBoxSection />
          </div>
        </div>
        <p className="text-lg md:text-xl font-light -mt-20 ml-0 md:ml-auto ">
          <ScrambleIn text={"WEB DESIGN & DEV AGENCY"} scrambleSpeed={50} scrambledLetterCount={5} autoStart={true} />
        </p>
        <p className="max-w-lg text-sm md:text-base font-light mt-8">
          WE COMBINE STRATEGY AND CREATIVITY WITH THE POWER OF TECHNOLOGY TO OFFER SOLUTIONS THAT ADAPT TO EVERY
          PLATFORM IN THE DIGITAL SPACE.
        </p>
      </section>
      {/* <section className="container-section relative hidden lg:flex items-center justify-center ">
        <div className={s.teeth}>
          <SpinningBoxSection />
        </div>
      </section> */}
      <section className="relative h-[600px] w-full">
        <Img src="/img/placeholder.jpg" alt="Aurora Background" className="object-cover" height={600} width={600} />
        <div className="absolute inset-0 bg-black/20" />
        <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white hover:text-gray-200 transition-colors">
          [ PLAY SHOWREEL ]
        </button>
      </section>
      <section className="container-section grid grid-cols-12 md:grid-cols-24 gap-4 md:gap-8 py-24 border-b border-dynamic-black">
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
      <section className="container-section py-24 space-y-32">
        {settings?.highlightedProjects.map((project, index: number) => (
          <ProjectCard
            key={index}
            projectName={project.projectName}
            description={project.description}
            heroImage={project.heroImage?.url ?? ""}
            slug={project.slug}
            deliverables={project.deliverables?.map((d) => d.title) ?? []}
          />
        ))}
      </section>
    </Wrapper>
  )
}
