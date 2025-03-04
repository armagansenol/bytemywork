"use client"

import s from "./fixed-slider.module.css"

import { ScrollTrigger, gsap, useGSAP } from "@/lib/gsap"
import cn from "clsx"
import { useRef } from "react"

import { Img } from "@/components/utility/img"

export function FixedSlider() {
  const ref = useRef<HTMLDivElement>(null)
  const menuTL = useRef<gsap.core.Timeline>()

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
        .fromTo(
          ".gsap-slide-3",
          { clipPath: "inset(0% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 100% 0% 0%)",
            duration: 1.2,
            ease: "power3.inOut",
          }
        )
        .fromTo(
          ".gsap-slide-4",
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
    }
  )

  return (
    <div className="relative w-screen h-screen" ref={ref}>
      <div className={cn(s.frame, "gsap-slide-1 absolute top-8 left-8 right-8 bottom-8 z-50")}>
        <Img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05"
          alt="Foggy mountains landscape"
          width={2000}
          height={2000}
        />
      </div>
      <div className={cn(s.frame, "gsap-slide-2 absolute top-8 left-8 right-8 bottom-8 z-40")}>
        <Img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2"
          alt="Modern architecture"
          width={2000}
          height={2000}
        />
      </div>
      <div className={cn(s.frame, "gsap-slide-3 absolute top-8 left-8 right-8 bottom-8 z-30")}>
        <Img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e"
          alt="Coastal landscape"
          width={2000}
          height={2000}
        />
      </div>
      <div className={cn("absolute top-8 left-8 right-8 bottom-8 z-20")}>
        <Img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000"
          alt="City skyline"
          width={2000}
          height={2000}
        />
      </div>
    </div>
  )
}
