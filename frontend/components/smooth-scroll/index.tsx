"use client"

import "lenis/dist/lenis.css"

import { gsap } from "@/lib/gsap"
import { useFrame } from "@darkroom.engineering/hamo"
import { LenisRef, ReactLenis } from "lenis/react"
import { useEffect, useRef } from "react"

export function SmoothScroll({ root }: { root: boolean }) {
  const lenisRef = useRef<LenisRef>(null)

  useFrame((time: number) => {
    if (!lenisRef.current) return
    lenisRef.current.lenis?.raf(time)
  }, 0)

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
    gsap.ticker.add(update)
    return () => gsap.ticker.remove(update)
  }, [])

  return (
    <ReactLenis
      ref={lenisRef}
      root={root}
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        autoRaf: false,
      }}
    />
  )
}
