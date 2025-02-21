"use client"

import { Float, MeshTransmissionMaterial, PresentationControls, useAnimations, useGLTF } from "@react-three/drei"
import { extend } from "@react-three/fiber"
import { useControls } from "leva"
import { useRef } from "react"
import * as THREE from "three"
import { GLTF } from "three-stdlib"

extend({ MeshTransmissionMaterial })

type GLTFResult = GLTF & {
  nodes: {
    Dis_Ust: THREE.Mesh
    Dis_Alt: THREE.Mesh
  }
  materials: {
    ["Dientes_initialShadingGroup.001"]: THREE.MeshPhysicalMaterial
    ["Dientes_initialShadingGroup.002"]: THREE.MeshPhysicalMaterial
  }
}

export function ToothModel() {
  const group = useRef<THREE.Group>(null)
  const { nodes, animations } = useGLTF("/glb/tooth.glb") as GLTFResult
  const { actions } = useAnimations(animations, group)

  const materialProps = useControls(
    "Material Properties",
    {
      backside: true,
      backsideResolution: { value: 512, min: 64, max: 1024, step: 64 },
      thickness: { value: 0.3, min: 0, max: 10, step: 0.01 },
      transmission: { value: 1, min: 0, max: 1, step: 0.01 },
      anisotropy: { value: 0.5, min: 0, max: 1, step: 0.01 },
      distortion: { value: 5, min: 0, max: 10, step: 0.1 },
      distortionScale: { value: 1.5, min: 0, max: 5, step: 0.1 },
      temporalDistortion: { value: 0.1, min: 0, max: 1, step: 0.01 },
      metalness: { value: 0.7, min: 0, max: 1, step: 0.01 },
      chromaticAberration: { value: 1, min: 0, max: 1, step: 0.01 },
      resolution: { value: 1024, min: 64, max: 1024, step: 64 },
    },
    { collapsed: true }
  )

  function handlePointerDown() {
    actions["Dis UstAction"]?.reset().setEffectiveTimeScale(15).play()
    actions["Dis AltAction"]?.reset().setEffectiveTimeScale(15).play()
  }

  function handlePointerUp() {
    actions["Dis UstAction"]?.fadeOut(0.5)
    actions["Dis AltAction"]?.fadeOut(0.5)
  }

  return (
    <group ref={group} onPointerEnter={handlePointerDown} onPointerLeave={handlePointerUp}>
      <Float speed={0.5} floatingRange={[-0.01, 0.01]}>
        <PresentationControls
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, 0, 0]}
          polar={[0, 0]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <group position={[0, -0.3, 0]} scale={0.02} rotation={[0, Math.PI / -3.2, 0]}>
            <mesh
              castShadow
              receiveShadow
              name="Dis_Ust"
              geometry={nodes.Dis_Ust.geometry}
              position={[-0.109, 14.822, -2.212]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <MeshTransmissionMaterial {...materialProps} />
            </mesh>
            <mesh
              castShadow
              receiveShadow
              name="Dis_Alt"
              geometry={nodes.Dis_Alt.geometry}
              position={[0.169, 9.668, -2.886]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <MeshTransmissionMaterial {...materialProps} />
            </mesh>
          </group>
        </PresentationControls>
      </Float>
    </group>
  )
}

useGLTF.preload("/glb/tooth.glb")
