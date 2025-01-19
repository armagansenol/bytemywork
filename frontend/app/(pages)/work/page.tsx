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
      <section className="container pt-16">
        <h1 className="text-3xl font-bold leading-snug">
          TRANSFORMING IDEAS INTO BYTES - <br /> EXPLORE OUR WORK!
        </h1>
      </section>
      <section className="py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-24 gap-8">
            {projects?.map((project, index) => (
              <div className="col-span-12" key={index}>
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
        </div>
      </section>
    </Wrapper>
  )
}
