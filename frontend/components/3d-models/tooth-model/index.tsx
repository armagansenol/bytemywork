"use client"

import { Float, PresentationControls, useAnimations, useGLTF } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from "three"
import { GLTF } from "three-stdlib"
import { useDevControls } from "@/hooks/use-dev-controls"

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

  // Metallic silver material with development controls (hidden in production)
  const silverMaterialProps = useDevControls("Silver Material", {
    color: { value: "#c0c0c0", label: "Color" },
    metalness: { value: 1, min: 0, max: 1, step: 0.01, label: "Metalness" },
    roughness: { value: 0.25, min: 0, max: 1, step: 0.01, label: "Roughness" },
    clearcoat: { value: 0.8, min: 0, max: 1, step: 0.01, label: "Clearcoat" },
    clearcoatRoughness: { value: 0.2, min: 0, max: 1, step: 0.01, label: "Clearcoat Roughness" },
    transmission: { value: 0, min: 0, max: 1, step: 0.01, label: "Transmission" },
    envMapIntensity: { value: 1.25, min: 0, max: 3, step: 0.01, label: "Env Map Intensity" },
    reflectivity: { value: 1, min: 0, max: 1, step: 0.01, label: "Reflectivity" },
    // anisotropy: { value: 0.5, min: 0, max: 1, step: 0.01, label: "Anisotropy" },
    // distortion: { value: 5, min: 0, max: 10, step: 0.01, label: "Distortion" },
    // distortionScale: { value: 1.5, min: 0, max: 3, step: 0.01, label: "Distortion Scale" },
    // temporalDistortion: { value: 0.1, min: 0, max: 0.5, step: 0.01, label: "Temporal Distortion" },
  })

  // Convert color string to THREE.Color with type assertions
  const materialProps = {
    color: new THREE.Color(silverMaterialProps.color as string),
    metalness: silverMaterialProps.metalness as number,
    roughness: silverMaterialProps.roughness as number,
    clearcoat: silverMaterialProps.clearcoat as number,
    clearcoatRoughness: silverMaterialProps.clearcoatRoughness as number,
    transmission: silverMaterialProps.transmission as number,
    envMapIntensity: silverMaterialProps.envMapIntensity as number,
    reflectivity: silverMaterialProps.reflectivity as number,
  }

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
      <Float speed={0.3} floatingRange={[-0.05, 0.05]}>
        <PresentationControls
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI, Math.PI]}
        >
          <group position={[0, -0.3, 0]} scale={0.02} rotation={[0, Math.PI / -5.2, 0]}>
            <mesh
              castShadow
              receiveShadow
              name='Dis_Ust'
              geometry={nodes.Dis_Ust.geometry}
              position={[-0.109, 14.822, -2.212]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <meshPhysicalMaterial key='ust-material' attach='material' {...materialProps} />
            </mesh>
            <mesh
              castShadow
              receiveShadow
              name='Dis_Alt'
              geometry={nodes.Dis_Alt.geometry}
              position={[0.169, 9.668, -2.886]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <meshPhysicalMaterial key='alt-material' attach='material' {...materialProps} />
            </mesh>
          </group>
        </PresentationControls>
      </Float>
    </group>
  )
}

if (typeof window !== "undefined" && window.matchMedia("(min-width: 1200px)").matches) {
  useGLTF.preload("/glb/tooth.glb")
}
