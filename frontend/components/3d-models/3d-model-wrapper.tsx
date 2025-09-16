"use client"

import { PostProcessing } from "@/components/dithering-shader/post-processing"
import { Environment, OrthographicCamera, View } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useLenis } from "lenis/react"
import { useRef } from "react"
import { useMedia } from "react-use"
import * as THREE from "three"
import { ToothModel } from "./tooth-model"

function ScrollAnimatedGroup() {
  const scale = 4.5
  const lenis = useLenis()
  const group = useRef<THREE.Group>(null)

  useFrame(() => {
    if (lenis && group.current) {
      group.current.rotation.y = Number(lenis.scroll.toFixed(2)) / 5000
    }
  })

  return (
    <group scale={[scale, scale, scale]} position={[0.5, 0.1, 0]} ref={group}>
      <ToothModel />
    </group>
  )
}

export function ThreeDModelWrapper() {
  const isTabletUp = useMedia("(min-width: 1200px)", false)

  if (!isTabletUp) return null

  return (
    <View className='block w-full h-full pointer-events-auto'>
      <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={200} />
      <ambientLight intensity={10.8} />
      <directionalLight position={[3, 3, 3]} intensity={20} />
      <hemisphereLight color={0xffffff} groundColor={0x444444} intensity={0.6} />
      <Environment preset='studio' background={false} environmentIntensity={1.5} />
      <ScrollAnimatedGroup />
      <PostProcessing />
    </View>
  )
}
