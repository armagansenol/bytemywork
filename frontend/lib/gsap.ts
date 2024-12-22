import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { CustomEase } from "gsap/all"

gsap.defaults({
  duration: 0.4,
  ease: "none",
})

ScrollTrigger.defaults({
  markers: false,
  // markers: process.env.NEXT_PUBLIC_NODE_ENV === "development"
})

export { ScrollTrigger, gsap, useGSAP, CustomEase }
