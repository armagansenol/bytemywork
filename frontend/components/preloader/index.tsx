"use client"

import {
  Cloud,
  Clouds,
  Environment,
  Float,
  Html,
  MeshWobbleMaterial,
  MotionPathControls,
  OrbitControls,
  useMotion,
  useProgress,
  useTexture,
} from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

import { DotScreen, EffectComposer, HueSaturation, TiltShift2 } from "@react-three/postprocessing"
import { useControls } from "leva"
import { forwardRef, Suspense, useRef } from "react"

export function Preloader() {
  return (
    <>
      <Canvas
        dpr={1}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 500,
        }}
      >
        <Suspense fallback={<Loader />}>
          <color attach="background" args={["black"]} />
          <SkyContent />
          <EffectComposer multisampling={4}>
            <HueSaturation saturation={-1} />
            <TiltShift2 blur={0.5} />
            <DotScreen scale={2} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </>
  )
}

function Loop({ factor = 0.2 }) {
  const motion = useMotion()
  useFrame((state, delta) => (motion.current += Math.min(0.1, delta) * factor))
  return null
}

export const Circle = ({ centerX = 0, centerY = 0, radius = 5 }) => {
  return [
    [
      new THREE.Vector3(centerX + radius, centerY, 0),
      new THREE.Vector3(centerX + radius, centerY, radius),
      new THREE.Vector3(centerX - radius, centerY, radius),
      new THREE.Vector3(centerX - radius, centerY, 0),
    ],
    [
      new THREE.Vector3(centerX - radius, centerY, 0),
      new THREE.Vector3(centerX - radius, centerY, -radius),
      new THREE.Vector3(centerX + radius, centerY, -radius),
      new THREE.Vector3(centerX + radius, centerY, 0),
    ],
  ].map(([v0, v1, v2, v3], index) => <primitive key={index} object={new THREE.CubicBezierCurve3(v0, v1, v2, v3)} />)
}

function SkyContent() {
  const poi = useRef<THREE.Mesh>(null) as React.MutableRefObject<THREE.Mesh>
  const { attachCamera, debug } = useControls({
    attachCamera: true,
    debug: false,
  })
  const Curve = Circle
  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {!attachCamera && <OrbitControls />}
      <MotionPathControls focus={poi} debug={debug} damping={0.2} focusDamping={0.15}>
        <Curve />
        <Loop factor={0.01} />
      </MotionPathControls>
      <Float floatIntensity={20} rotationIntensity={20} speed={2}>
        <StickerBmw position={[1, 0, 1]} scale={2} ref={poi} />
      </Float>
      <Clouds>
        <Cloud
          concentrate="random"
          seed={1}
          segments={100}
          bounds={20}
          volume={20}
          growth={10}
          opacity={0.15}
          position={[0, 0, -10]}
          speed={0.1}
        />
      </Clouds>
      <Environment preset="city" background blur={0.5} />
    </>
  )
}

export function Sky() {
  return (
    <>
      <color attach="background" args={["black"]} />
      <SkyContent />
    </>
  )
}

type StickerBmwProps = {
  position?: [number, number, number]
  scale?: [number, number, number] | number
  rotation?: [number, number, number]
}

const StickerBmw = forwardRef<THREE.Mesh, StickerBmwProps>((props, ref) => {
  const [smiley, invert] = useTexture(["/img/bmw.png", "/img/bmw.png"])
  return (
    <mesh ref={ref} {...props}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <MeshWobbleMaterial
        factor={2}
        speed={0.1}
        depthTest={false}
        transparent
        map={smiley}
        map-flipY={false}
        roughness={10000}
        roughnessMap={invert}
        roughnessMap-flipY={false}
        map-anisotropy={0}
        metalness={0}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
})

StickerBmw.displayName = "StickerBmw"

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress()
  return (
    <Html className="w-screen h-screen bg-black" center>
      {progress} % loaded
    </Html>
  )
}
