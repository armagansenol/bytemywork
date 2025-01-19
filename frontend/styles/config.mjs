// Constant declarations
const colors = {
  black: "#000000",
  white: "#ffffff",
  red: "#e30613",
  raven: "#0b0b0b",
  "deep-daigi-white": "#eae6e5",
  "namara-grey": "#7B7B7B",
  "dynamic-black": "#1D1D1D",
}

const themes = {
  light: {
    primary: colors["deep-daigi-white"],
    secondary: colors.raven,
    contrast: colors.red,
  },
  dark: {
    primary: colors.raven,
    secondary: colors["deep-daigi-white"],
    contrast: colors.red,
  },
  red: {
    primary: colors.red,
    secondary: colors.raven,
    contrast: colors["deep-daigi-white"],
  },
}

const breakpoints = {
  dt: 800,
}

const screens = {
  mobile: { width: 375, height: 650 },
  desktop: { width: 1440, height: 816 },
}

/** @type {(keyof typeof themes)[]} */
const themeNames = Object.keys(themes)

const config = {
  themes,
}

export { breakpoints, colors, config, screens, themeNames, themes }
