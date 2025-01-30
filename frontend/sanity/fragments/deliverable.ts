export const DELIVERABLE = /* groq */ `
  _id,
  "title": title[_key == $language][0].value
`
