"use client"

import s from "./fixed-slider.module.css"

import { ScrollTrigger, gsap, useGSAP } from "@/lib/gsap"
import { useWindowSize } from "@14islands/r3f-scroll-rig"
import cn from "clsx"
import { useRef } from "react"

import { Img } from "@/components/utility/img"

export function FixedSlider() {
  const ref = useRef<HTMLDivElement>(null)
  const menuTL = useRef<gsap.core.Timeline>()
  const { width } = useWindowSize()

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)

      menuTL.current = gsap.timeline({
        paused: true,
      })

      menuTL.current
        .fromTo(
          ".gsap-slide-1",
          { clipPath: "inset(0% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 100% 0% 0%)",
            duration: 1.2,
            ease: "power3.inOut",
          }
        )
        .fromTo(
          ".gsap-slide-2",
          { clipPath: "inset(0% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 100% 0% 0%)",
            duration: 1.2,
            ease: "power3.inOut",
          }
        )

      ScrollTrigger.create({
        animation: menuTL.current,
        trigger: ref.current,
        end: "+=5000px",
        pin: true,
        scrub: 1,
      })
    },
    {
      scope: ref,
      dependencies: [width],
    }
  )

  if (width < 1025) return null

  return (
    <div className="relative w-screen h-screen" ref={ref}>
      <div className={cn(s.frame, s.slide, "gsap-slide-1 z-50")}>
        <Img
          className="w-full h-full object-cover"
          src="/img/s-1.jpg"
          alt="Foggy mountains landscape"
          width={2000}
          height={2000}
          priority={true}
        />
      </div>
      <div className={cn(s.frame, s.slide, "gsap-slide-2 z-40")}>
        <Img
          className="w-full h-full object-cover"
          src="/img/s-2.jpg"
          alt="Modern architecture"
          width={2000}
          height={2000}
          priority={true}
        />
      </div>
      <div className={cn(s.frame, s.slide, "gsap-slide-3 z-30")}>
        <Img
          className="w-full h-full object-cover"
          src="/img/s-3.jpg"
          alt="Coastal landscape"
          width={2000}
          height={2000}
          priority={true}
        />
      </div>
    </div>
  )
}
