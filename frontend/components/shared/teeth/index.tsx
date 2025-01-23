"use client"

import ToothModel from "@/components/tooth-model"
import { ScrollScene, UseCanvas } from "@14islands/r3f-scroll-rig"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

interface SpinningBoxProps {
  scale: {
    xy: {
      min: () => number
    }
  }
  scrollState: { progress: number }
}

export function SpinningBoxSection() {
  const el = useRef<HTMLDivElement>(null)
  return (
    <section>
      <div ref={el} className="Placeholder ScrollScene"></div>
      <UseCanvas>
        <ScrollScene track={el as React.MutableRefObject<HTMLElement>}>
          {(props) => <SpinningBoxWebGL {...props} />}
        </ScrollScene>
      </UseCanvas>
    </section>
  )
}

function SpinningBoxWebGL({ scale, scrollState }: SpinningBoxProps) {
  const mesh = useRef<THREE.Mesh>(null)
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y = scrollState.progress * Math.PI * 2
    }
  })

  return (
    <group scale={scale.xy.min() * 0.75}>
      <mesh ref={mesh}>
        <ToothModel />
      </mesh>
    </group>
  )
}
