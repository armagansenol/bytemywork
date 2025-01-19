import { ProjectCard } from "@/components/shared/project-card"
import { Wrapper } from "@/components/wrapper"
import { sanityFetch } from "@/lib/sanity/live"
import { getProjectsQuery } from "@/lib/sanity/queries"

export default async function Page() {
  const { data: projects } = await sanityFetch({
    query: getProjectsQuery,
  })

  return (
    <Wrapper theme="dark" headerVariant="withLogo">
      <section className="container-section pt-16">
        <h1 className="text-3xl font-bold leading-snug">
          TRANSFORMING IDEAS INTO BYTES - <br /> EXPLORE OUR WORK!
        </h1>
      </section>
      <section className="container-section py-16">
        <div className="grid grid-cols-1 sm:grid-cols-12 md:grid-cols-24 gap-12 md:gap-8">
          {projects?.map((project, index) => (
            <div className="col-span-1 sm:col-span-6 md:col-span-12" key={index}>
              <ProjectCard
                key={index}
                title={project.projectName ?? ""}
                tags={project.deliverables ?? []}
                description={project.description ?? ""}
                image={project.heroImage?.asset?.url ?? ""}
                slug={project.slug?.current ?? ""}
                layout="vertical"
              />
            </div>
          ))}
        </div>
      </section>
    </Wrapper>
  )
}
