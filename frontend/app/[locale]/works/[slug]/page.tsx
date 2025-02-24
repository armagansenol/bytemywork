import s from "./project-detail.module.css"

import { Link as LocalizedLink } from "@/i18n/routing"
import { PortableTextBlock } from "@portabletext/react"
import cn from "clsx"
import { getTranslations } from "next-intl/server"

import { CustomizedPortableText } from "@/components/shared/customized-portable-text"
import { MediaGrid } from "@/components/shared/image-grid"
import { ScrambleIn } from "@/components/shared/scramble-in"
import { ScrambleText } from "@/components/shared/scramble-text"
import { TextBlock } from "@/components/shared/text-block"
import { Img } from "@/components/utility/img"
import { Link } from "@/components/utility/link"
import { Wrapper } from "@/components/wrapper"
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
    <Wrapper theme="dark" headerVariant="withLogo">
      <section className="container-section">
        <div className="grid grid-cols-12 lg:grid-cols-24 gap-4 lg:gap-8 pt-8">
          <div className="col-span-12 lg:col-span-9 space-y-12 lg:space-y-24">
            <LocalizedLink className="text-sm text-namara-grey" href="/works">
              [ <ScrambleText text={t("backToWorks")} scrambleSpeed={50} /> ]
            </LocalizedLink>
            <div className="space-y-4 lg:space-y-8">
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-normal leading-none tracking-tighter">
                <ScrambleIn
                  text={`${project?.projectName}`}
                  scrambleSpeed={50}
                  scrambledLetterCount={5}
                  autoStart={true}
                />
              </h1>
              <div className="text-base lg:text-lg font-light">
                <CustomizedPortableText content={project?.description as PortableTextBlock[]} />
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
            <LocalizedLink href="/contact" className="absolute bottom-4 right-4">
              [ {t("startProject")} ]
            </LocalizedLink>
          </div>
        </div>
        <div className="grid grid-cols-12 lg:grid-cols-24 gap-4 lg:gap-8 py-10 lg:py-20">
          <div className="col-span-12 lg:col-span-15 lg:col-start-10 flex flex-col sm:flex-row justify-between space-y-6 sm:space-y-0">
            <div className="space-y-2">
              <h2 className="text-md font-medium">{t("clientLabel")}</h2>
              <p className="text-sm font-light text-namara-grey">{project?.client}</p>
            </div>
            <div className="space-y-2">
              <h2 className="text-md font-medium">{t("dateLabel")}</h2>
              <p className="text-sm font-light text-namara-grey">{project?.date}</p>
            </div>
            <div className="space-y-2">
              <h2 className="text-md font-medium">{t("deliverablesLabel")}</h2>
              {Array.isArray(project?.deliverables) && project.deliverables.length > 0 && (
                <ul className="space-y-2 text-sm font-light text-namara-grey">
                  {project.deliverables.map((item, index) => (
                    <li key={index}>{item.title}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="space-y-2">
              <Link href={project?.websiteUrl as string} className="inline-block hover:text-gray-300 transition-colors">
                [ {t("visitWebsite")} ]
              </Link>
            </div>
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
