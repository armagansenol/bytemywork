"use client"

import s from "./wrapper.module.css"

import type { themeNames } from "@/styles/config.mjs"
import cn from "clsx"
import { usePathname } from "next/navigation"
import Script from "next/script"
import { useEffect, useRef } from "react"

import { Footer } from "@/components/shared/footer"
import { Header } from "@/components/shared/header"
import { View } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import lenis from "lenis"
import { SmoothScroll } from "../smooth-scroll"
import { Leva } from "leva"
import { FormTranslations } from "@/types"
import { ContactForm } from "@/components/shared/form-contact"
import { useTranslations } from "next-intl"

interface WrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: (typeof themeNames)[number]
  webgl?: boolean | object
  headerVariant?: "withLogo" | "withoutLogo"
  withContactForm?: boolean
}

export function Wrapper({
  children,
  theme = "dark",
  className,
  headerVariant,
  withContactForm = true,
  ...props
}: WrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // biome-ignore lint/correctness/useExhaustiveDependencies: we need to trigger on path change
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [pathname, theme])

  const t = useTranslations("contact")
  const formTranslations = t.raw("form") as FormTranslations

  return (
    <div className={s.wrapper} ref={ref}>
      <Header variant={headerVariant} />
      <main className={cn(s.main, className)} {...props}>
        {children}
        <Script id='theme-script'>{`document.documentElement.setAttribute('data-theme', '${theme}');`}</Script>
      </main>
      <Footer />
      {withContactForm && (
        <section className='container-section grid grid-cols-24 gap-0 md:gap-8 pt-12 md:pt-12 pb-28 space-y-10 md:space-y-0'>
          <div className='col-span-24 md:col-span-12 space-y-4'>
            <h1 className='text-3xl font-bold'>{t("title")}</h1>
            <p className='text-xl font-light max-w-xl leading-snug'>
              {t.rich("description", {
                span: (chunks) => <span className='font-semibold'>{chunks}</span>,
                br: () => <br />,
              })}
            </p>
          </div>
          <div className='col-span-24 md:col-span-12'>
            <ContactForm translations={formTranslations} />
          </div>
        </section>
      )}
      {lenis && <SmoothScroll root />}
      <Canvas
        shadows
        eventSource={typeof document !== "undefined" ? document.body : undefined}
        eventPrefix='client'
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1000,
          pointerEvents: "none",
        }}
      >
        <View.Port />
      </Canvas>
      <Leva hidden={process.env.NODE_ENV === "production"} />
    </div>
  )
}
