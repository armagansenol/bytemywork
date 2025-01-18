// Constant declarations
const colors = {
  black: "#000000",
  white: "#ffffff",
  red: "#e30613",
  raven: "#0b0b0b",
  deepDaigiWhite: "#eae6e5",
}

const themes = {
  light: {
    primary: colors.deepDaigiWhite,
    secondary: colors.raven,
    contrast: colors.red,
  },
  dark: {
    primary: colors.raven,
    secondary: colors.deepDaigiWhite,
    contrast: colors.red,
  },
  red: {
    primary: colors.red,
    secondary: colors.raven,
    contrast: colors.deepDaigiWhite,
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
  columns: {
    mobile: 4,
    desktop: 8,
  },
  gaps: {
    mobile: 4,
    desktop: 4,
  },
  margins: {
    mobile: 4,
    desktop: 4,
  },
}

export { breakpoints, colors, config, screens, themeNames, themes }
