"use client"

import { ModelBytemywork } from "@/components/3d-models/bmw"
import { ModelTooth } from "@/components/3d-models/tooth-model"
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
    <>
      <div ref={el} className="Placeholder ScrollScene"></div>
      <UseCanvas>
        <ScrollScene track={el as React.MutableRefObject<HTMLElement>}>
          {(props) => <SpinningBoxWebGL {...props} />}
        </ScrollScene>
      </UseCanvas>
    </>
  )
}

function SpinningBoxWebGL({ scale, scrollState }: SpinningBoxProps) {
  const mesh = useRef<THREE.Mesh>(null)
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y = scrollState.progress * Math.PI * 2 * 0.2
    }
  })

  return (
    <>
      {/* <Text fontSize={140} letterSpacing={-0.025} color="#ffffff">
        BYTEMYWORK
        <Html style={{ color: "#ffffff", fontSize: "3em" }} transform>
          BYTEMYWORK
        </Html>
      </Text> */}
      <ModelBytemywork />
      <group scale={scale.xy.min() * 1.75} position={[200, -80, 300]}>
        <mesh ref={mesh}>
          <ModelTooth />
        </mesh>
      </group>
    </>
  )
}
