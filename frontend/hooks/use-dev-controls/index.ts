import { useControls, folder } from "leva"
import { useMemo } from "react"

type ControlValue = {
  value: unknown
  min?: number
  max?: number
  step?: number
  label?: string
}

type FolderConfig = {
  folder: (config: Record<string, unknown>) => Record<string, unknown>
}

type ControlConfig = ControlValue | FolderConfig | Record<string, unknown>

/**
 * A conditional wrapper around useControls that only runs in development
 * In production, returns the default values without creating Leva controls
 */
export function useDevControls<T extends Record<string, ControlConfig>>(
  name: string,
  controls: T,
  defaultValues?: Record<string, unknown>
): Record<string, unknown> {
  const isDevelopment = process.env.NODE_ENV === "development"

  const productionDefaults = useMemo(() => {
    if (isDevelopment) return {}

    // In production, return default values extracted from controls config
    const defaults: Record<string, unknown> = {}

    const extractDefaults = (obj: Record<string, unknown>, target: Record<string, unknown>) => {
      for (const [key, value] of Object.entries(obj)) {
        if (value && typeof value === "object") {
          if ("value" in value) {
            // This is a control config object
            target[key] = (value as ControlValue).value
          } else if ("folder" in value && typeof (value as FolderConfig).folder === "function") {
            // This is a folder, extract from its contents
            const folderContents = (value as FolderConfig).folder({})
            extractDefaults(folderContents, target)
          } else {
            // This might be a nested object, recurse
            extractDefaults(value as Record<string, unknown>, target)
          }
        }
      }
    }

    extractDefaults(controls, defaults)

    // Override with any provided default values
    if (defaultValues) {
      Object.assign(defaults, defaultValues)
    }

    return defaults
  }, [isDevelopment, controls, defaultValues])

  // Always call the hook, but conditionally use it
  const levaControls = useControls(name, isDevelopment ? controls : {})

  return isDevelopment ? (levaControls as Record<string, unknown>) : productionDefaults
}

// Re-export folder for convenience
export { folder }
