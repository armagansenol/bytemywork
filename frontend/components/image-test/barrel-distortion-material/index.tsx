import { shaderMaterial } from "@react-three/drei"
import { ShaderMaterial, Texture } from "three"

export type BarrelDistortionMaterialType = ShaderMaterial & {
  time: number
  strength: number
  map: Texture | null
  gridSize: number
  lineWidth: number
  wobbleSpeed: number
  wobbleStrength: number
  scrollProgress: number
  scrollVelocity: number
}

export const BarrelDistortionMaterial = shaderMaterial(
  {
    map: null as Texture | null,
    time: 0,
    strength: 0.5,
    gridSize: 10.0,
    lineWidth: 0.02,
    wobbleSpeed: 1.0,
    wobbleStrength: 0.1,
    scrollProgress: 0.0,
    scrollVelocity: 0.0,
  },
  // Vertex shader
  `
      uniform float strength;
      uniform float time;
      uniform float wobbleSpeed;
      uniform float wobbleStrength;
      uniform float scrollProgress;
      uniform float scrollVelocity;
      varying vec2 vUv;
      
      void main() {
        vUv = uv;
        
        // Get the position and convert to normalized space (-1 to 1)
        vec3 pos = position;
        vec2 normalizedXY = pos.xy;
        
        // Calculate distance from center for distortion
        float dist = length(normalizedXY);
        
        // Use scroll velocity to influence wobble strength and frequency
        // Clamp velocity effect to avoid extreme distortion
        float velocityFactor = clamp(abs(scrollVelocity) * 2.0, 0.0, 5.0);
        float dynamicWobbleStrength = wobbleStrength * (1.0 + velocityFactor * 2.0);
        
        // Wobble frequency increases with velocity
        float wobbleFrequency = 5.0 + velocityFactor * 3.0;
        
        // Add time-based wobble effect and scroll influenced distortion
        float scrollFactor = 1.0 + scrollProgress * 1.5; // Amplify scroll influence
        float wobble = sin(time * wobbleSpeed + dist * wobbleFrequency) * dynamicWobbleStrength * dist;
        
        // Apply more dramatic distortion when scrolling fast
        float velocityDistortion = sin(dist * 10.0) * velocityFactor * 0.05;
        
        // Apply pincushion distortion (negative factor creates inward effect)
        // This is the opposite of barrel distortion
        float distortionFactor = 1.0 - (strength * scrollFactor + wobble + velocityDistortion) * dist * dist;
        pos.xy = normalizedXY * distortionFactor;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
  // Fragment shader
  `
      uniform sampler2D map;
      uniform float time;
      uniform float strength;
      uniform float gridSize;
      uniform float lineWidth;
      uniform float scrollProgress;
      uniform float scrollVelocity;
      varying vec2 vUv;
      
      float drawGrid(vec2 uv, float size, float width) {
        vec2 grid = fract(uv * size);
        vec2 smoothGrid = smoothstep(width, 0.0, grid) + smoothstep(1.0 - width, 1.0, grid);
        return clamp(smoothGrid.x + smoothGrid.y, 0.0, 1.0);
      }
      
      void main() {
        // Apply texture with original UVs (no need to distort UVs as geometry is already distorted)
        vec4 color = texture2D(map, vUv);
        
        // Apply grid with intensity influenced by scroll velocity
        float velocityIntensity = clamp(abs(scrollVelocity) * 3.0, 0.0, 1.0);
        float gridIntensity = 0.7 + velocityIntensity * 0.3; // Grid gets brighter with faster scrolling
        float grid = drawGrid(vUv, gridSize, lineWidth);
        
        // Blend the grid with the image texture
        gl_FragColor = mix(color, vec4(1.0, 1.0, 1.0, 1.0), grid * min(gridIntensity, 1.0));
      }
    `
)

declare module "@react-three/fiber" {
  interface ThreeElements {
    barrelDistortionMaterial: React.ComponentProps<"shaderMaterial"> & {
      time?: number
      strength?: number
      map?: Texture | null
      gridSize?: number
      lineWidth?: number
      wobbleSpeed?: number
      wobbleStrength?: number
      scrollProgress?: number
      scrollVelocity?: number
    }
  }
}
