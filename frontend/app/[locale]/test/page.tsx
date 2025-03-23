"use client"

import { gsap, ScrollTrigger } from "@/lib/gsap"
import { Environment, OrbitControls, OrthographicCamera, View } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { ReactNode, useRef } from "react"
import * as THREE from "three"

import { ModelBytemywork } from "@/components/3d-models/bmw"
import { ToothModel } from "@/components/3d-models/tooth-model"
import { Wrapper } from "@/components/wrapper"

export default function Test() {
  return (
    <Wrapper>
      <ToothSection />
      <Scene />
    </Wrapper>
  )
}

interface SceneProps {
  children?: ReactNode
}

function Scene({ children }: SceneProps) {
  return (
    <Canvas
      dpr={1}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
      }}
      eventSource={document.body}
    >
      <View.Port />
      {children}
    </Canvas>
  )
}

interface CommonProps {
  color?: string
}

function Common({ color }: CommonProps) {
  return (
    <>
      {color && <color attach="background" args={[color]} />}
      <ambientLight intensity={0.5} />
      <pointLight position={[20, 30, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="blue" />
      <Environment preset="studio" />
      <OrthographicCamera makeDefault position={[0, 0, 1000]} />
      <OrbitControls enabled={false} />
    </>
  )
}

function ToothSection() {
  const teethRef = useRef<THREE.Group>(null)
  const ref = useRef<HTMLDivElement>(null)

  return (
    <View className="w-screen h-screen" ref={ref}>
      <Common />
      <ModelBytemywork />
      <ToothAnimation teethRef={teethRef} containerRef={ref} />
      <ToothModel ref={teethRef} />
    </View>
  )
}

interface ToothAnimationProps {
  teethRef: React.RefObject<THREE.Group>
  containerRef: React.RefObject<HTMLDivElement>
}

function ToothAnimation({ teethRef, containerRef }: ToothAnimationProps) {
  const animationSetup = useRef(false)

  useFrame(() => {
    if (teethRef.current && !animationSetup.current) {
      animationSetup.current = true

      gsap.registerPlugin(ScrollTrigger)

      const timeline = gsap.timeline({ paused: true }).to(teethRef.current.rotation, {
        y: Math.PI / 2,
        duration: 1,
      })

      ScrollTrigger.create({
        animation: timeline,
        trigger: containerRef.current,
        markers: true,
        scrub: true,
      })
    }
  })

  return null
}
