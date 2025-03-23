"use client"

import {
  styles,
  UseCanvas,
  useImageAsTexture,
  useScrollRig,
  ViewportScrollScene,
  ViewportScrollSceneChildProps,
} from "@14islands/r3f-scroll-rig"
import "@14islands/r3f-scroll-rig/css"
import { Box } from "@react-three/drei"
import { extend, useFrame } from "@react-three/fiber"
import Image from "next/image"
import { Suspense, useRef } from "react"
import { Mesh } from "three"
import { BarrelDistortionMaterial, BarrelDistortionMaterialType } from "./barrel-distortion-material"

extend({ BarrelDistortionMaterial })

const image1 = "/img/s-1.jpg"
const image2 = "/img/s-2.jpg"
const image3 = "/img/s-3.jpg"

interface ScaleProps {
  xy: {
    min: () => number
  }
}

function LoadingIndicator({ scale }: { scale: ScaleProps }) {
  const box = useRef<Mesh>(null)
  useFrame((_, delta) => {
    if (box.current) {
      box.current.rotation.x = box.current.rotation.y += delta * Math.PI
    }
  })
  return (
    <Box ref={box} scale={scale.xy.min() * 0.25}>
      <meshNormalMaterial />
    </Box>
  )
}

interface WebGLImageProps extends ViewportScrollSceneChildProps {
  imgRef: React.RefObject<HTMLImageElement>
}

function WebGLImage({ imgRef, ...props }: WebGLImageProps) {
  const texture = useImageAsTexture(imgRef)
  const materialRef = useRef<BarrelDistortionMaterialType>(null)

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.scrollProgress = props.scrollState.progress * -1
      materialRef.current.scrollVelocity = props.scrollState.progress * -1 // Scale down velocity for better effect
    }
  })

  return (
    <mesh {...props}>
      <planeGeometry args={[1, 1, 64, 64]} />
      <barrelDistortionMaterial
        ref={materialRef}
        transparent
        map={texture}
        strength={0.6} // Reduced strength for better balance with velocity effect
        gridSize={12} // Keep same grid size
        lineWidth={0.015} // Keep same line width
        wobbleSpeed={10.5} // Keep same wobble speed
        wobbleStrength={0.05} // Reduced base wobble (will be amplified by velocity)
        scrollProgress={0} // Initial value, will be updated in useFrame
        scrollVelocity={0} // Initial value, will be updated in useFrame
      />
    </mesh>
  )
}

function useTrackableRef<T extends HTMLElement>() {
  return useRef<T>(null) as unknown as React.MutableRefObject<HTMLElement>
}

function ExampleComponent({ src, loading = "eager" }: { src: string; loading?: "eager" | "lazy" }) {
  const el = useTrackableRef<HTMLDivElement>()
  const img = useRef<HTMLImageElement>(null)
  const { hasSmoothScrollbar } = useScrollRig()

  return (
    <>
      <div
        ref={el as React.RefObject<HTMLDivElement>}
        className="Placeholder ScrollScene"
        style={{
          minHeight: "80vh", // Make each example component taller for better scroll effect
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          className={styles.hiddenWhenSmooth}
          ref={img}
          loading={loading}
          src={src}
          alt="This will be loaded as a texture"
          width={1000}
          height={1000}
        />
      </div>
      {hasSmoothScrollbar && (
        <UseCanvas>
          <ViewportScrollScene track={el} debug={false}>
            {(props) => (
              <Suspense fallback={<LoadingIndicator {...props} />}>
                <WebGLImage imgRef={img} {...props} />
              </Suspense>
            )}
          </ViewportScrollScene>
        </UseCanvas>
      )}
    </>
  )
}

export function ImageTest() {
  //   const [isTouch, setTouch] = useState(false)

  //   useEffect(() => {
  //     const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.maxTouchPoints > 0
  //     setTouch(isTouch)
  //   }, [])

  const ref = useRef<HTMLDivElement>(null)

  //   useGSAP(
  //     () => {
  //       gsap.registerPlugin(ScrollTrigger)

  //       ScrollTrigger.create({
  //         trigger: ref.current,
  //         end: "+=5000px",
  //         pin: true,
  //         scrub: 1,
  //         markers: true,
  //       })
  //     },
  //     {
  //       scope: ref,
  //       dependencies: [isTouch],
  //     }
  //   )

  return (
    <div className="relative" ref={ref}>
      <div>
        <ExampleComponent src={image1} />
      </div>
      <div>
        <ExampleComponent src={image2} />
      </div>
      <div>
        <ExampleComponent src={image3} loading="lazy" />
      </div>
    </div>
  )
}
