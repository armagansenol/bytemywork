import * as THREE from "three"
import React, { useRef } from "react"
import { MeshTransmissionMaterial, useAnimations, useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"
import { useControls } from "leva"

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

export function ModelBmwTeeth(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>(null)
  const { nodes, materials, animations } = useGLTF("/glb/bmw-teeth.glb") as GLTFResult
  const { actions } = useAnimations(animations, group)

  const materialProps = useControls(
    "Material Properties",
    {
      backside: true,
      backsideThickness: { value: 10, min: 0, max: 10, step: 0.1 },
      samples: { value: 16, min: 1, max: 32, step: 1 },
      thickness: { value: 10, min: 0, max: 10, step: 0.01 },
      anisotropicBlur: { value: 0.5, min: 0, max: 1, step: 0.01 },
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
      {...props}
      dispose={null}
      scale={0.05}
      onPointerEnter={handlePointerDown}
      onPointerLeave={handlePointerUp}
    >
      <group name="Scene" rotation={[0, Math.PI / 2, 0]} position={[0.5, -0.1, -0.1]}>
        <mesh
          name="Dis_Ust"
          castShadow
          receiveShadow
          geometry={nodes.Dis_Ust.geometry}
          material={materials["Dientes_initialShadingGroup.001"]}
          position={[0, 2.464, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <MeshTransmissionMaterial {...materialProps} />
        </mesh>
        <mesh
          name="Dis_Alt"
          castShadow
          receiveShadow
          geometry={nodes.Dis_Alt.geometry}
          material={materials["Dientes_initialShadingGroup.002"]}
          position={[0, -1.615, -0.5]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <MeshTransmissionMaterial {...materialProps} />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload("/bmw-teeth.glb")
