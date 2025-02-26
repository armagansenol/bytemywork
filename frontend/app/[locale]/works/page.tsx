import { ProjectCard } from "@/components/shared/project-card"
import { Wrapper } from "@/components/wrapper"
import { GetProjectsQueryResult } from "@/sanity.types"
import { sanityFetch } from "@/sanity/lib/client"
import { getProjectsQuery } from "@/sanity/lib/queries"
import { getTranslations } from "next-intl/server"

export default async function WorksPage({ params: { locale } }: { params: { locale: string } }) {
  const [projects, t] = await Promise.all([
    sanityFetch<GetProjectsQueryResult>({
      query: getProjectsQuery,
      qParams: { language: locale },
      tags: ["project"],
    }),
    getTranslations("works"),
  ])

  return (
    <Wrapper theme="dark" headerVariant="withLogo">
      <section className="container-section pt-8 lg:pt-16">
        <h1 className="text-3xl font-bold leading-snug">{t.rich("title", { br: () => <br /> })}</h1>
      </section>
      <section className="container-section py-16">
        <div className="grid grid-cols-1 sm:grid-cols-12 md:grid-cols-24 gap-y-16 lg:gap-y-24 gap-x-4 lg:gap-x-8">
          {projects?.map((project, index: number) => (
            <div className="col-span-1 sm:col-span-6 md:col-span-12" key={index}>
              <ProjectCard
                key={index}
                projectName={project.projectName}
                heroImage={project.heroImage?.url ?? ""}
                slug={project.slug}
                deliverables={project.deliverables?.map((d) => d.title) as string[]}
                layout="vertical"
              />
            </div>
          ))}
        </div>
      </section>
    </Wrapper>
  )
}
