import { View } from "@react-three/drei"
import { useRef } from "react"
import { Mesh } from "three"

export interface ImageTestDreiProps {}

export function ImageTestDrei(props: ImageTestDreiProps) {
  const ref = useRef<HTMLDivElement>(null)
  const refMesh = useRef<Mesh>(null)

  return (
    <View className="w-screen h-screen" {...props} ref={ref}>
      <mesh ref={refMesh}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="red" />
      </mesh>
    </View>
  )
}
