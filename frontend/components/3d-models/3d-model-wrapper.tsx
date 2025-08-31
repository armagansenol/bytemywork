"use client"

import { View, OrthographicCamera } from "@react-three/drei"
import { ToothModel } from "./tooth-model"
import { useLenis } from "lenis/react"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

function ScrollAnimatedGroup() {
  const lenis = useLenis()
  const group = useRef<THREE.Group>(null)

  useFrame(() => {
    if (lenis && group.current) {
      group.current.rotation.y = Number(lenis.scroll.toFixed(2)) / 5000
    }
  })

  return (
    <group scale={[5, 5, 5]} position={[0, 0, 0]} ref={group}>
      <ToothModel />
    </group>
  )
}

export function ThreeDModelWrapper() {
  return (
    <View className="hidden xl:block fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] z-[150] pointer-events-auto">
      <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={200} />
      <ambientLight intensity={10.8} />
      <directionalLight position={[3, 3, 3]} intensity={20} />
      <ScrollAnimatedGroup />
    </View>
  )
}
