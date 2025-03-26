import s from "./header.module.css"

import { Link as LocalizedLink } from "@/i18n/routing"
import { Link as ViewTransitionLink } from "next-view-transitions"

import { cva, type VariantProps } from "class-variance-authority"
import cn from "clsx"

import { LocaleSwitcher } from "@/components/locale-switcher"
import { Logo } from "@/components/shared/icons"
import { ScrambleText } from "@/components/shared/scramble-text"
import { useTranslations } from "next-intl"

const headerVariants = cva("container-section relative flex items-center justify-between", {
  variants: {
    variant: {
      withLogo: "",
      withoutLogo: "justify-end",
    },
  },
  defaultVariants: {
    variant: "withLogo",
  },
})

interface HeaderProps extends VariantProps<typeof headerVariants> {
  variant?: "withLogo" | "withoutLogo"
}

export function Header({ variant }: HeaderProps) {
  const t = useTranslations("routes")

  return (
    <header className={cn(s.header, headerVariants({ variant }))}>
      {/* Mobile-first approach with responsive nav */}
      <nav className="order-2 md:order-1">
        <ul className="flex gap-4 md:gap-8 text-xs md:text-base">
          <li>
            {/* <LocalizedLink href="/works">
              <ScrambleText text={t("works")} />
            </LocalizedLink> */}
            <ViewTransitionLink href="/works" prefetch={true}>
              <ScrambleText text={t("works")} />
            </ViewTransitionLink>
          </li>
          <li>
            <LocalizedLink href="/contact" prefetch={true}>
              <ScrambleText text={t("contact")} />
            </LocalizedLink>
          </li>
        </ul>
      </nav>
      {variant === "withLogo" && (
        <LocalizedLink href="/" className={cn(s.logo, "order-1 md:order-2 w-8 md:w-auto")}>
          <Logo />
        </LocalizedLink>
      )}
      <div className="order-3">
        <LocaleSwitcher />
      </div>
    </header>
  )
}
