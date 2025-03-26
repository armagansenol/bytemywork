"use client"

import s from "./wrapper.module.css"

import type { themeNames } from "@/styles/config.mjs"
import cn from "clsx"
import { usePathname } from "next/navigation"
import Script from "next/script"
import { useEffect } from "react"

import { Footer } from "@/components/shared/footer"
import { Header } from "@/components/shared/header"
import lenis from "lenis"
import { SmoothScroll } from "../smooth-scroll"

interface WrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: (typeof themeNames)[number]
  webgl?: boolean | object
  headerVariant?: "withLogo" | "withoutLogo"
}

export function Wrapper({ children, theme = "dark", className, headerVariant, ...props }: WrapperProps) {
  const pathname = usePathname()

  // biome-ignore lint/correctness/useExhaustiveDependencies: we need to trigger on path change
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [pathname, theme])

  return (
    <div className={s.wrapper}>
      <Header variant={headerVariant} />
      <main className={cn(s.main, className)} {...props}>
        {children}
        <Script id="theme-script">{`document.documentElement.setAttribute('data-theme', '${theme}');`}</Script>
      </main>
      <Footer />
      {lenis && <SmoothScroll root />}
    </div>
  )
}
