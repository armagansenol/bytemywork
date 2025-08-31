import s from "./home.module.css"

import { SettingsQueryResult } from "@/sanity.types"
import { sanityFetch } from "@/sanity/lib/client"
import { settingsQuery } from "@/sanity/lib/queries"
import { getTranslations } from "next-intl/server"

import { FixedSlider } from "@/components/fixed-slider"
import { LogoText } from "@/components/shared/icons"
import { ProjectCard } from "@/components/shared/project-card"
import { ScrambleHover } from "@/components/shared/scramble-hover"
import { ScrambleIn } from "@/components/shared/scramble-in"
import { Wrapper } from "@/components/wrapper"
import { ThreeDModelWrapper } from "@/components/3d-models/3d-model-wrapper"

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const [settings, t] = await Promise.all([
    sanityFetch<SettingsQueryResult>({
      query: settingsQuery,
      qParams: { language: locale },
      tags: ["settings"],
    }),
    getTranslations("home"),
  ])

  return (
    <Wrapper className={s.home} theme="dark">
      {/* <div className={cn(s.bgVideo, "-z-[1]")}>
        <Video className="object-cover" primaryVideoUrl="/video/intro-bg.mp4" autoPlay muted loop />
      </div> */}
      {/* <section className="hidden lg:block z-50">
        <div className={s.teeth}>
          <HeroSection />
        </div>
      </section> */}
      <section className="container-section pb-12 lg:pb-24 flex flex-col relative z-50">
        <ThreeDModelWrapper />
        <div className="w-full">
          <LogoText />
        </div>
        <div className="w-full flex flex-col-reverse lg:flex-row gap-12 lg:gap-0 mt-8">
          <p className="text-sm xl:text-base font-light max-w-lg">{t("hero.description")}</p>
          <p className="text-sm lg:text-base xl:text-xl font-light ml-auto">
            <ScrambleIn text={t("hero.tagline")} scrambleSpeed={50} scrambledLetterCount={5} autoStart={true} />
          </p>
        </div>
      </section>
      <section className="relative">
        <FixedSlider />
      </section>
      <section className="container-section grid grid-cols-12 md:grid-cols-24 gap-4 md:gap-8 py-12 lg:py-24 border-b border-dynamic-black">
        <div className="col-span-12 space-y-4">
          <h2 className="text-base font-semibold">{t("capabilities.title")}</h2>
          <p className="text-sm max-w-md font-light">{t("capabilities.description")}</p>
        </div>
        <div className="col-span-12 space-y-1">
          <h3 className="text-2xl md:text-4xl font-bold">
            <ScrambleHover
              text={t("capabilities.services.webDesign")}
              scrambleSpeed={60}
              sequential={true}
              revealDirection="start"
              useOriginalCharsOnly={false}
              characters="abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;':\,./<>?"
            />
          </h3>
          <h3 className="text-2xl md:text-4xl font-bold">
            <ScrambleHover
              text={t("capabilities.services.webDevelopment")}
              scrambleSpeed={60}
              sequential={true}
              revealDirection="start"
              useOriginalCharsOnly={false}
              characters="abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;':\,./<>?"
            />
          </h3>
          <h3 className="text-2xl md:text-4xl font-bold">
            <ScrambleHover
              text={t("capabilities.services.branding")}
              scrambleSpeed={60}
              sequential={true}
              revealDirection="start"
              useOriginalCharsOnly={false}
              characters="abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;':\,./<>?"
            />
          </h3>
          {/* <h3 className="text-2xl md:text-4xl font-bold">
            <ScrambleHover
              text={t("capabilities.services.contentCreation")}
              scrambleSpeed={60}
              sequential={true}
              revealDirection="start"
              useOriginalCharsOnly={false}
              characters="abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;':\,./<>?"
            />
          </h3>
          <h3 className="text-2xl md:text-4xl font-bold">
            <ScrambleHover
              text={t("capabilities.services.motionDesign")}
              scrambleSpeed={60}
              sequential={true}
              revealDirection="start"
              useOriginalCharsOnly={false}
              characters="abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;':\,./<>?"
            />
          </h3> */}
        </div>
      </section>
      <section className="container-section py-12 lg:py-24 space-y-16 lg:space-y-32">
        {settings?.highlightedProjects.map((project, index: number) => (
          <ProjectCard
            key={index}
            projectName={project.projectName}
            heroImage={project.heroImage?.url ?? ""}
            slug={project.slug}
            deliverables={project.deliverables?.map((d) => d.title) as string[]}
          />
        ))}
      </section>
    </Wrapper>
  )
}
