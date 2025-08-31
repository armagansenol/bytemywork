"use client"

import { UseCanvas, ViewportScrollScene } from "@14islands/r3f-scroll-rig"
import { Environment, OrthographicCamera } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

import { ToothModel } from "@/components/3d-models/tooth-model"
import { LogoText } from "../shared/icons"

interface HeroSectionProps {
  scale: {
    xy: {
      min: () => number
    }
  }
  scrollState: { progress: number }
}

export function HeroSection() {
  const el = useRef<HTMLDivElement>(null)
  return (
    <>
      <div ref={el} className="w-full h-full" style={{ pointerEvents: "auto" }}></div>
      <UseCanvas style={{ pointerEvents: "auto" }}>
        <ViewportScrollScene track={el as React.MutableRefObject<HTMLElement>}>
          {(props) => <Hero {...props} />}
        </ViewportScrollScene>
      </UseCanvas>
    </>
  )
}

function Hero({ scale, scrollState }: HeroSectionProps) {
  const mesh = useRef<THREE.Mesh>(null)
  const lightRef = useRef<THREE.DirectionalLight>(null!)

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = scrollState.progress * Math.PI * 2 * 0.2
    }

    if (lightRef.current) {
      // Rotate light in a circular motion at a higher position
      const time = state.clock.getElapsedTime()
      lightRef.current.position.x = Math.cos(time * 0.5) * 400
      lightRef.current.position.z = Math.sin(time * 0.5) * 400
    }
  })

  return (
    <>
      <div className="flex justify-center md:justify-start">
        <LogoText />
      </div>
      <group scale={scale.xy.min() * 1.25} position={[200, -80, 300]}>
        <mesh ref={mesh}>
          <ToothModel />
        </mesh>
      </group>
      <directionalLight ref={lightRef} position={[200, 400, 300]} intensity={25} color="#22ff00" />
      <OrthographicCamera makeDefault position={[0, 0, 2000]} zoom={1} />
      <Environment preset="studio" environmentIntensity={1} background blur={0.5} />
    </>
  )
}
