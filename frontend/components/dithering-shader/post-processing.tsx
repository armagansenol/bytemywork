"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { EffectComposer, RenderPass, BloomEffect, EffectPass } from "postprocessing"
import { useDevControls, folder } from "@/hooks/use-dev-controls"

import { DitheringEffect } from "./DitheringEffect"

/**
 * Component that manages all post-processing effects
 * Configures and applies various effects to the rendered scene
 */
export const PostProcessing = () => {
  // References
  const composerRef = useRef<EffectComposer | null>(null)

  const [scene, setScene] = useState<THREE.Scene | null>(null)
  const [camera, setCamera] = useState<THREE.Camera | null>(null)

  // Effect controls (hidden in production)
  const bloom1Controls = useDevControls("Bloom 1", {
    "Bloom 1": folder({
      bloom1Enabled: { value: true, label: "Enable Bloom 1 (Pre-Dithering)" },
      bloom1Threshold: { value: 0.01, min: 0, max: 2, step: 0.01, label: "Threshold" },
      bloom1Intensity: { value: 0.01, min: 0, max: 50, step: 0.1, label: "Intensity" },
      bloom1Radius: { value: 0.7, min: 0, max: 1, step: 0.1, label: "Radius" },
    }),
  })

  const ditheringControls = useDevControls("Dithering", {
    Dithering: folder({
      ditheringGridSize: { value: 2, min: 1, max: 20, step: 1, label: "Effect Resolution" },
      pixelSizeRatio: { value: 1, min: 1, max: 10, step: 1, label: "Pixelation Strength" },
      grayscaleOnly: { value: true, label: "Grayscale Only" },
    }),
  })

  const bloom2Controls = useDevControls("Bloom 2", {
    "Bloom 2": folder({
      bloom2Enabled: { value: false, label: "Enable Bloom 2 (Post-Dithering)" },
      bloom2Threshold: { value: 0.0, min: 0, max: 2, step: 0.01, label: "Threshold" },
      bloom2Intensity: { value: 0.42, min: 0, max: 2, step: 0.01, label: "Intensity" },
      bloom2Radius: { value: 0.75, min: 0, max: 1, step: 0.01, label: "Radius" },
      bloom2Smoothing: { value: 0.22, min: 0, max: 1, step: 0.01, label: "Smoothing" },
    }),
  })

  // Extract values with type assertions
  const bloom1Enabled = bloom1Controls.bloom1Enabled as boolean
  const bloom1Threshold = bloom1Controls.bloom1Threshold as number
  const bloom1Intensity = bloom1Controls.bloom1Intensity as number
  const bloom1Radius = bloom1Controls.bloom1Radius as number

  const ditheringGridSize = ditheringControls.ditheringGridSize as number
  const pixelSizeRatio = ditheringControls.pixelSizeRatio as number
  const grayscaleOnly = ditheringControls.grayscaleOnly as boolean

  const bloom2Enabled = bloom2Controls.bloom2Enabled as boolean
  const bloom2Threshold = bloom2Controls.bloom2Threshold as number
  const bloom2Intensity = bloom2Controls.bloom2Intensity as number
  const bloom2Radius = bloom2Controls.bloom2Radius as number
  const bloom2Smoothing = bloom2Controls.bloom2Smoothing as number

  // Memoized resize handler (fallback for window resizes)
  const handleResize = useCallback(() => {
    // Size will be synced to renderer size in the frame loop as well
    if (composerRef.current) {
      // no-op placeholder to keep listener; sizing is handled per-frame
    }
  }, [])

  // Handle window resize
  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [handleResize])

  // Configure post-processing effects
  useEffect(() => {
    if (!scene || !camera || !composerRef.current) return

    const composer = composerRef.current
    composer.removeAllPasses()

    // Add required passes in order
    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    if (bloom1Enabled) {
      composer.addPass(
        new EffectPass(
          camera,
          new BloomEffect({
            luminanceThreshold: bloom1Threshold,
            intensity: bloom1Intensity,
            radius: bloom1Radius,
            mipmapBlur: true,
          })
        )
      )
    }

    // Dithering effect - always active
    composer.addPass(
      new EffectPass(
        camera,
        new DitheringEffect({
          gridSize: ditheringGridSize,
          pixelSizeRatio,
          grayscaleOnly,
        })
      )
    )

    if (bloom2Enabled) {
      composer.addPass(
        new EffectPass(
          camera,
          new BloomEffect({
            luminanceThreshold: bloom2Threshold,
            intensity: bloom2Intensity,
            luminanceSmoothing: bloom2Smoothing,
            radius: bloom2Radius,
          })
        )
      )
    }
  }, [
    scene,
    camera,
    bloom1Enabled,
    bloom1Threshold,
    bloom1Intensity,
    bloom1Radius,
    bloom2Enabled,
    bloom2Threshold,
    bloom2Intensity,
    bloom2Radius,
    bloom2Smoothing,
    ditheringGridSize,
    pixelSizeRatio,
    grayscaleOnly,
  ])

  // Handle rendering
  useFrame(({ gl, scene: currentScene, camera: currentCamera }) => {
    // Initialize composer if not yet created
    if (!composerRef.current) {
      composerRef.current = new EffectComposer(gl)
      // Initial sizing to renderer size
      const size = gl.getSize(new THREE.Vector2())
      composerRef.current.setSize(size.x, size.y)
    }

    // Update scene and camera references if changed
    if (scene !== currentScene) setScene(currentScene)
    if (camera !== currentCamera) setCamera(currentCamera)

    // Keep composer size in sync with renderer
    if (composerRef.current) {
      const size = gl.getSize(new THREE.Vector2())
      composerRef.current.setSize(size.x, size.y)
    }

    // Render the composer last, over the already rendered views
    gl.autoClear = false
    gl.clearDepth()
    composerRef.current?.render()
  }, 1000)

  return null
}
