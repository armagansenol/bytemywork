"use client"

import { MeshTransmissionMaterial, useAnimations, useGLTF } from "@react-three/drei"
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

export default function ToothModel() {
  const group = useRef<THREE.Group>(null)
  const { nodes, animations } = useGLTF("/glb/tooth.glb") as GLTFResult
  const { actions } = useAnimations(animations, group)

  const materialProps = useControls(
    "Material Properties",
    {
      transmissionSampler: true,
      backside: false,
      samples: { value: 6, min: 1, max: 32, step: 1 },
      resolution: { value: 512, min: 256, max: 2048, step: 256 },
      transmission: { value: 0.95, min: 0, max: 1 },
      metalness: { value: 0.2, min: 0, max: 1 },
      roughness: { value: 0.1, min: 0, max: 1, step: 0.01 },
      thickness: { value: 2.5, min: 0, max: 10, step: 0.01 },
      ior: { value: 1.8, min: 1, max: 5, step: 0.01 },
      chromaticAberration: { value: 0.4, min: 0, max: 1 },
      anisotropy: { value: 0.5, min: 0, max: 1, step: 0.01 },
      distortion: { value: 0.4, min: 0, max: 1, step: 0.01 },
      distortionScale: { value: 0.4, min: 0.01, max: 1, step: 0.01 },
      temporalDistortion: { value: 0.8, min: 0, max: 1, step: 0.01 },
      clearcoat: { value: 1, min: 0, max: 1 },
      attenuationDistance: { value: 1.5, min: 0, max: 10, step: 0.01 },
      attenuationColor: "#ffffff",
      color: "#ffffff",
      bg: "#000000",
    },
    { collapsed: true }
  )

  function handlePointerDown() {
    console.log("handlePointerDown")
    actions["Dis UstAction"]?.reset().setEffectiveTimeScale(10).play()
    actions["Dis AltAction"]?.reset().setEffectiveTimeScale(10).play()
  }

  function handlePointerUp() {
    actions["Dis UstAction"]?.stop()
    actions["Dis AltAction"]?.stop()
  }

  return (
    <group
      ref={group}
      position={[0, -0.75, 0]}
      scale={0.05}
      rotation={[0, Math.PI / 1.6, 0]}
      onPointerEnter={handlePointerDown}
      onPointerLeave={handlePointerUp}
    >
      <group>
        <mesh
          castShadow
          receiveShadow
          name="Dis_Ust"
          geometry={nodes.Dis_Ust.geometry}
          position={[-0.109, 14.822, -5.212]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <MeshTransmissionMaterial {...materialProps} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          name="Dis_Alt"
          geometry={nodes.Dis_Alt.geometry}
          position={[0.169, 9.668, -5.886]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <MeshTransmissionMaterial {...materialProps} />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload("/glb/tooth.glb")
