"use client"

import { GlobalCanvas, SmoothScrollbar } from "@14islands/r3f-scroll-rig"
import { Environment, Stats } from "@react-three/drei"
import { Bloom, EffectComposer } from "@react-three/postprocessing"

export function R3fScrollRig() {
  return (
    <>
      <GlobalCanvas
        // disable the scrollscene render loop as the EffectComposer will render to the screen
        globalRender={false}
        style={{ pointerEvents: "none" }}
        // Add performance options
        dpr={[1, 2]} // Limit pixel ratio
        frameloop="demand" // Only render when needed
      >
        {/* <EffectComposer enableNormalPass={false} multisampling={8}>
          <Bloom mipmapBlur levels={7} intensity={1} luminanceThreshold={0} />
        </EffectComposer> */}
        <Environment preset="studio" />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <EffectComposer multisampling={0}>
          {/* <TiltShift2 blur={0.2} /> */}
          <Bloom mipmapBlur luminanceThreshold={1} intensity={0.3} kernelSize={2} />
        </EffectComposer>
        <Stats />
      </GlobalCanvas>
      <SmoothScrollbar />
    </>
  )
}
