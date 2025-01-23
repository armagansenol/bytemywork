import contactForm from './documents/contactForm'
import project from './documents/project'
import deliverable from './documents/deliverable'

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
  project,
  contactForm,
  deliverable,
  // Objects
  blockContent,
  infoSection,
  callToAction,
  link,
]
