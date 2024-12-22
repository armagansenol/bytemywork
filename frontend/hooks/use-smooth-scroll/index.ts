import { useLenisStore } from "@/lib/store/lenis"
import Lenis from "lenis"
import { useEffect, useRef } from "react"

const useSmoothScroll = () => {
  const { lenis, setLenis } = useLenisStore()
  const reqIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (!lenis) return

    const animate = (time: DOMHighResTimeStamp) => {
      lenis.raf(time)
      reqIdRef.current = requestAnimationFrame(animate)
    }
    reqIdRef.current = requestAnimationFrame(animate)

    return () => {
      if (reqIdRef.current) {
        cancelAnimationFrame(reqIdRef.current)
      }
    }
  }, [lenis])

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    })

    lenisInstance.scrollTo(0, { immediate: true })
    setLenis(lenisInstance)

    return () => {
      lenisInstance.destroy()
      setLenis(null)
    }
  }, [setLenis])
}

export default useSmoothScroll
