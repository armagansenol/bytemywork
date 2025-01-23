export const IMAGE = /* groq */ `
  ...,
  "altText": asset->altText,
  'height': asset->metadata.dimensions.height,
  'url': asset->url,
  'width': asset->metadata.dimensions.width,
`
