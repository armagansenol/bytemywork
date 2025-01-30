"use client"

import { GlobalCanvas, SmoothScrollbar } from "@14islands/r3f-scroll-rig"
import { useRef } from "react"

export function R3fScrollRig({ children }: { children: React.ReactNode }) {
  const eventSource = useRef<HTMLDivElement>(null)

  return (
    <div ref={eventSource}>
      <GlobalCanvas
        eventSource={eventSource as React.MutableRefObject<HTMLElement>}
        eventPrefix="client"
        globalRender={true}
        style={{ pointerEvents: "none" }}
        dpr={[1, 2]}
        // performance={{ min: 0.5 }}
        // gl={{
        //   powerPreference: "high-performance",
        //   antialias: false, // Disable antialiasing
        //   stencil: false,
        //   depth: false,
        // }}
      >
        {/* <EffectComposer enableNormalPass={false} multisampling={8}>
          <Bloom mipmapBlur luminanceThreshold={1} intensity={0.05} />
          <BrightnessContrast brightness={0} contrast={0.1} />
          <HueSaturation hue={0} saturation={-0.25} />
          <Vignette eskil={false} offset={0.1} darkness={1} />
          <WaterEffect factor={0.5} />
        </EffectComposer> */}

        {/* <Stats /> */}
        {/* <OrbitControls /> */}
      </GlobalCanvas>
      <SmoothScrollbar>
        {(bind) => (
          <div className="flex flex-1 flex-col" {...bind}>
            {children}
          </div>
        )}
      </SmoothScrollbar>
    </div>
  )
}
