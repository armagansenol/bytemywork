import { Link as LocalizedLink } from "@/i18n/routing"
import { useTranslations } from "next-intl"

import { LogoText } from "@/components/shared/icons"
import { ScrambleText } from "@/components/shared/scramble-text"
import { Link } from "@/components/utility/link"

export function Footer() {
  const t = useTranslations("routes")

  return (
    <footer className="container-section pb-16 md:pb-28 z-[100] relative">
      <div className="flex flex-col items-stretch gap-10 lg:gap-6 border-t border-dynamic-black pt-8 md:pt-16">
        <nav className="pb-8 md:pb-16">
          <ul className="flex justify-center md:justify-start space-x-8">
            <li>
              <LocalizedLink href="/works">
                <ScrambleText text={t("works")} />
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink href="/contact">
                <ScrambleText text={t("contact")} />
              </LocalizedLink>
            </li>
          </ul>
        </nav>
        <div className="flex flex-col-reverse items-center md:items-stretch gap-12 md:flex-row md:justify-between">
          <div className="flex flex-col-reverse items-center md:items-start gap-4 md:flex-row md:gap-10 font-light">
            <p>2024, ALL RIGHTS RESERVED</p>
            <p>BASED IN ISTANBUL</p>
          </div>
          <div className="flex flex-col items-center justify-center md:flex-row md:justify-start gap-8 md:gap-8 font-semibold">
            <Link href="https://dribbble.com/bytemywork" className="text-base">
              [ <ScrambleText text={"DRIBBLE"} scrambleSpeed={30} /> ]
            </Link>
            <Link href="https://instagram.com/bytemywork" className="text-base">
              [ <ScrambleText text={"INSTAGRAM"} scrambleSpeed={30} /> ]
            </Link>
          </div>
        </div>
        <div className="flex justify-center md:justify-start">
          <LogoText />
        </div>
      </div>
    </footer>
  )
}
