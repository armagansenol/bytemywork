import s from "./project-detail.module.css"

import { Link as LocalizedLink } from "@/i18n/routing"
import { PortableTextBlock } from "@portabletext/react"
import cn from "clsx"
import { getTranslations } from "next-intl/server"

import { MediaGrid } from "@/components/shared/image-grid"
import { ScrambleIn } from "@/components/shared/scramble-in"
import { ScrambleText } from "@/components/shared/scramble-text"
import { TextBlock } from "@/components/shared/text-block"
import { Img } from "@/components/utility/img"
import { Link } from "@/components/utility/link"
import { Wrapper } from "@/components/wrapper"
import { removeHttps } from "@/lib/utils"
import { GetProjectQueryResult } from "@/sanity.types"
import { sanityFetch } from "@/sanity/lib/client"
import { getProjectQuery } from "@/sanity/lib/queries"
import { MediaGridItem, VideoGridItem } from "@/types"

type Props = {
  params: Promise<{ slug: string; locale: string }>
}

type MediaGridBlock = {
  component: "MediaGrid"
  items?: Array<MediaGridItem | VideoGridItem>
}

type TextBlock = {
  component: "TextBlock"
  title: string
  description: PortableTextBlock[]
}

type Block = MediaGridBlock | TextBlock

export default async function Page(props: Props) {
  const params = await props.params
  const project = await sanityFetch<GetProjectQueryResult>({
    query: getProjectQuery,
    qParams: { ...params, language: params.locale },
    tags: ["project"],
  })
  const t = await getTranslations("projectDetail")

  return (
    <Wrapper className="space-y-32" theme="dark" headerVariant="withLogo">
      <section className="container-section">
        <div className="grid grid-cols-12 lg:grid-cols-24 gap-4 lg:gap-8 pt-8">
          <div className="col-span-12 lg:col-span-9 space-y-12 lg:space-y-24">
            <LocalizedLink className="text-sm text-namara-grey" href="/works">
              [ <ScrambleText text={t("backToWorks")} scrambleSpeed={50} /> ]
            </LocalizedLink>
            <div className="space-y-4 lg:space-y-12">
              <h1 className="text-3xl sm:text-5xl md:text-4xl font-normal leading-none tracking-tighter">
                <ScrambleIn
                  text={`${project?.projectName}`}
                  scrambleSpeed={50}
                  scrambledLetterCount={5}
                  autoStart={true}
                />
              </h1>
              {/* <div className="text-base lg:text-lg font-light">
                <CustomizedPortableText content={project?.description as PortableTextBlock[]} />
              </div> */}
              <div className="grid grid-cols-12 lg:grid-cols-24 gap-y-6">
                {project?.client && (
                  <div className="col-span-12 lg:col-span-12 space-y-2 border-b border-namara-grey/30 pb-6">
                    <h2 className="text-md font-medium">{t("clientLabel")}</h2>
                    <p className="text-sm font-light text-namara-grey">{project?.client}</p>
                  </div>
                )}
                {project?.date && (
                  <div className="col-span-12 lg:col-span-12 space-y-2 border-b border-namara-grey/30 pb-6">
                    <h2 className="text-md font-medium">{t("dateLabel")}</h2>
                    <p className="text-sm font-light text-namara-grey">{project?.date}</p>
                  </div>
                )}
                {Array.isArray(project?.deliverables) && project.deliverables.length > 0 && (
                  <div className="col-span-12 lg:col-span-24 space-y-2 border-b border-namara-grey/30 pb-6">
                    <h2 className="text-md font-medium">{t("deliverablesLabel")}</h2>
                    <ul className="space-y-2 text-sm font-light text-namara-grey">
                      {project.deliverables.map((item, index) => (
                        <li key={index}>{item.title}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {Array.isArray(project?.techStack) && project.techStack.length > 0 && (
                  <div className="col-span-12 lg:col-span-24 space-y-2 border-b border-namara-grey/30 pb-6">
                    <h2 className="text-md font-medium">{t("techStackLabel")}</h2>
                    <ul className="text-sm font-light text-namara-grey flex flex-wrap gap-2">
                      {project.techStack.map((item, index) => (
                        <li key={index}>
                          {item.title}
                          {index < (project.techStack?.length || 0) - 1 ? ", " : ""}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {project?.websiteUrl && (
                  <div className="col-span-12 lg:col-span-24 space-y-2">
                    <h2 className="text-md font-medium">{t("visitWebsite")}</h2>
                    <Link
                      href={project?.websiteUrl as string}
                      className="inline-block text-sm font-light text-namara-grey hover:text-gray-300 transition-colors"
                    >
                      {removeHttps(project?.websiteUrl as string)}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={cn(s.heroImage, "col-span-12 lg:col-span-15 relative")}>
            <div className="relative aspect-w-4 aspect-h-3">
              <Img
                src={project?.heroImage?.url as string}
                alt="Project Cover Image"
                width={project?.heroImage?.width as number}
                height={project?.heroImage?.height as number}
                className="object-cover"
                priority
              />
            </div>
            {/* <LocalizedLink href="/contact" className="absolute bottom-4 right-4">
              [ {t("startProject")} ]
            </LocalizedLink> */}
          </div>
        </div>
      </section>
      <section className="container-section pb-16 lg:pb-28">
        <div className="space-y-4">
          {((project?.body || []) as Block[]).map((block: Block, index) => {
            if (block.component === "MediaGrid") {
              const gridItems =
                block.items
                  ?.map((item) => {
                    if ("playbackId" in item) {
                      return {
                        playbackId: item.playbackId,
                        assetId: item.assetId,
                        filename: item.filename,
                      }
                    }
                    return {
                      url: item.url,
                      width: String(item.width),
                      height: String(item.height),
                    }
                  })
                  .filter(Boolean) || []
              return (
                <div key={index}>
                  <MediaGrid items={gridItems} />
                </div>
              )
            }
            if (block.component === "TextBlock") {
              return <TextBlock key={index} heading={block.title} content={block.description} />
            }
            return null
          })}
        </div>
      </section>
    </Wrapper>
  )
}
