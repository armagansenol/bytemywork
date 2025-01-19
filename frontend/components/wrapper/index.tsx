"use client"

import s from "./wrapper.module.css"

import cn from "clsx"
import type { LenisOptions } from "lenis"

import { Footer } from "@/components/shared/footer"
import type { themeNames } from "@/styles/config.mjs"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import Header from "../shared/header"
import { SmoothScroll } from "../smooth-scroll"

interface WrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: (typeof themeNames)[number]
  lenis?: LenisOptions
  webgl?: boolean | object
}

export function Wrapper({ children, theme = "dark", className, lenis, ...props }: WrapperProps) {
  const pathname = usePathname()

  // biome-ignore lint/correctness/useExhaustiveDependencies: we need to trigger on path change
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [pathname, theme])

  return (
    <>
      <Header />
      <main className={cn(s.main, className)} {...props}>
        {children}
        <script>{`document.documentElement.setAttribute('data-theme', '${theme}');`}</script>
      </main>
      <Footer />
      {lenis && <SmoothScroll root />}
    </>
  )
}
