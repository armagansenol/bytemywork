"use client"

import useSmoothScroll from "@/hooks/use-smooth-scroll"
import { gsap, ScrollTrigger, useGSAP, CustomEase } from "@/lib/gsap"
import { ReactNode } from "react"

gsap.registerPlugin(ScrollTrigger, useGSAP, CustomEase)

type Props = {
  children: ReactNode
}

const SmoothLayout = ({ children }: Props) => {
  useSmoothScroll()
  return <>{children}</>
}

export { SmoothLayout }
