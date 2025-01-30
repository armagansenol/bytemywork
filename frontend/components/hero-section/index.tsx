"use client"

import { UseCanvas, ViewportScrollScene } from "@14islands/r3f-scroll-rig"
import { Environment, OrthographicCamera } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

import { ModelBytemywork } from "@/components/3d-models/bmw"
import { ToothModel } from "@/components/3d-models/tooth-model"

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

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y = scrollState.progress * Math.PI * 2 * 0.2
    }
  })

  return (
    <>
      <ModelBytemywork />
      <group scale={scale.xy.min() * 1.25} position={[200, -80, 300]}>
        <mesh ref={mesh}>
          <ToothModel />
        </mesh>
      </group>
      <OrthographicCamera makeDefault position={[0, 0, 2000]} zoom={1} />
      <Environment preset="studio" environmentIntensity={5} />
    </>
  )
}
