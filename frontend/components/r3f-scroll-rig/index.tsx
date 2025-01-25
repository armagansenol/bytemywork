"use client"

import { GlobalCanvas, SmoothScrollbar } from "@14islands/r3f-scroll-rig"
import { Environment, OrthographicCamera, Stats } from "@react-three/drei"
import { Bloom, BrightnessContrast, EffectComposer, HueSaturation } from "@react-three/postprocessing"
import { useRef } from "react"

export function R3fScrollRig() {
  const eventSource = useRef<HTMLDivElement>(null)

  return (
    <div ref={eventSource}>
      <GlobalCanvas
        eventSource={eventSource as React.MutableRefObject<HTMLElement>}
        eventPrefix="client"
        // disable the scrollscene render loop as the EffectComposer will render to the screen
        globalRender={false}
        style={{ pointerEvents: "none" }}
        dpr={[1, 2]} // Limit pixel ratio
        // performance={{ min: 0.5 }}
        // gl={{
        //   powerPreference: "high-performance",
        //   antialias: false, // Disable antialiasing
        //   stencil: false,
        //   depth: false,
        // }}
      >
        {/* 
          <Environment preset="studio" />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <EffectComposer multisampling={0}>
          <Bloom mipmapBlur luminanceThreshold={1} intensity={0.3} kernelSize={2} />
          </EffectComposer>
          */}

        <Stats />

        {/* <OrbitControls /> */}

        <EffectComposer enableNormalPass={false} multisampling={8}>
          <Bloom mipmapBlur luminanceThreshold={1} intensity={0.1} />
          <BrightnessContrast brightness={0} contrast={0.1} />
          <HueSaturation hue={0} saturation={-0.25} />
          {/* <Vignette eskil={false} offset={0.1} darkness={1} /> */}
          {/* <WaterEffect factor={0.5} /> */}
        </EffectComposer>

        <OrthographicCamera makeDefault position={[0, 0, 2000]} zoom={1} />
        <Environment preset="studio" environmentIntensity={0.5} />
      </GlobalCanvas>
      <SmoothScrollbar />
    </div>
  )
}
