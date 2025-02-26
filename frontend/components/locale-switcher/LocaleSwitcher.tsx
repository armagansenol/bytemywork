"use client"

import { Locale, routing, usePathname, useRouter } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import { useLocale } from "next-intl"
import { useParams } from "next/navigation"

export default function LocaleSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const locale = useLocale()

  const handleLocaleChange = (nextLocale: Locale) => {
    // Skip if clicking the current locale
    if (nextLocale === locale) return

    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`
      { pathname, params },
      { locale: nextLocale }
    )
  }

  const getLocaleButtonClasses = (loc: Locale) => {
    const isActive = locale === loc
    return cn(
      "flex items-center justify-center",
      "text-xs xl:text-sm",
      "leading-none font-medium transition duration-100 cursor-pointer",
      "hover:opacity-75",
      isActive && "bg-background text-article-gold opacity-100",
      !isActive && "transparent text-background opacity-30"
    )
  }

  return (
    <div className="flex items-center gap-2 lg:gap-4">
      {routing.locales.map((loc) => (
        <div
          key={loc}
          className={getLocaleButtonClasses(loc)}
          onClick={() => handleLocaleChange(loc)}
          role="button"
          tabIndex={0}
          aria-label={`Switch to ${loc} language`}
        >
          {loc.toUpperCase()}
        </div>
      ))}
    </div>
  )
}
