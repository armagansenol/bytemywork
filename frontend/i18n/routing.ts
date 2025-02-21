import { createNavigation } from "next-intl/navigation"
import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["tr", "en"],
  defaultLocale: "en",
  localeDetection: false,
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/works": {
      en: "/works",
      tr: "/projeler",
    },
    "/contact": {
      en: "/contact",
      tr: "/iletisim",
    },
  },
})

export type Pathnames = keyof typeof routing.pathnames
export type Locale = (typeof routing.locales)[number]

export const { Link, getPathname, redirect, usePathname, useRouter } = createNavigation(routing)
