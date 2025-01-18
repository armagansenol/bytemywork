import person from './documents/person'
import project from './documents/project'

import blockContent from './objects/blockContent'
import callToAction from './objects/callToAction'
import infoSection from './objects/infoSection'
import link from './objects/link'

import settings from './singletons/settings'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  person,
  // Objects
  blockContent,
  infoSection,
  callToAction,
  link,
  project,
]
