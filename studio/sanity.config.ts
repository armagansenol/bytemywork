/**
 * This config is used to configure your Sanity Studio.
 * Learn more: https://www.sanity.io/docs/configuration
 */

import {documentInternationalization} from '@sanity/document-internationalization'
import {AsteriskIcon} from '@sanity/icons'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'
import {muxInput} from 'sanity-plugin-mux-input'
import {structureTool} from 'sanity/structure'
import {LANGUAGES} from './src/lib/constants'
import {schemaTypes} from './src/schemaTypes'
import {structure} from './src/structure'
import {contactFormPlugin} from './src/hooks/contactFormHook'

// Environment variables for project configuration
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-projectID'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

// // URL for preview functionality, defaults to localhost:3000 if not set
// const SANITY_STUDIO_PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

// // Define the home location for the presentation tool
// const homeLocation = {
//   title: 'Home',
//   href: '/',
// } satisfies DocumentLocation

// Improve type safety with a more comprehensive DocumentTypes
// type DocumentTypes = 'project' | 'deliverable' | 'settings'
// type SluggedDocument = {
//   slug?: {current?: string}
//   name?: string
//   title?: string
// }

// Enhanced resolveHref with better type safety and path handling
// function resolveHref(documentType?: DocumentTypes, doc?: SluggedDocument): string | undefined {
//   const slug = doc?.slug?.current
//   if (!slug || !documentType) return undefined

//   const paths = {
//     project: `/projects/${slug}`,
//     deliverable: `/deliverables/${slug}`,
//     settings: '/settings',
//   }

//   return paths[documentType] || undefined
// }

// Main Sanity configuration
export default defineConfig({
  name: 'bytemywork',
  title: 'Byte My Work',
  icon: AsteriskIcon,
  projectId,
  dataset,

  plugins: [
    // Presentation tool configuration for Visual Editing
    documentInternationalization({
      // Required configuration
      supportedLanguages: LANGUAGES,
      schemaTypes: ['project', 'deliverable', 'settings'],
      languageField: 'language',
      weakReferences: true,
    }),
    internationalizedArray({
      languages: LANGUAGES,
      defaultLanguages: [...LANGUAGES.map((lang) => lang.id)],
      fieldTypes: ['string'],
    }),
    muxInput({encoding_tier: 'baseline'}),
    // presentationTool({
    //   previewUrl: {
    //     origin: SANITY_STUDIO_PREVIEW_URL,
    //     preview: '/api/preview',
    //   },
    //   resolve: {
    //     // The Main Document Resolver API provides a method of resolving a main document from a given route or route pattern. https://www.sanity.io/docs/presentation-resolver-api#57720a5678d9
    //     mainDocuments: defineDocuments([
    //       {
    //         route: '/',
    //         filter: '_type == "project" && slug.current == "home"',
    //       },
    //       {
    //         route: '/:slug',
    //         filter: '_type in ["project", "deliverable"] && slug.current == $slug',
    //       },
    //     ]),
    //     // Locations Resolver API allows you to define where data is being used in your application. https://www.sanity.io/docs/presentation-resolver-api#8d8bca7bfcd7
    //     locations: {
    //       settings: defineLocations({
    //         locations: [homeLocation],
    //         message: 'This document is used globally',
    //         tone: 'positive',
    //       }),
    //       // page: defineLocations({
    //       //   select: {
    //       //     name: 'name',
    //       //     slug: 'slug.current',
    //       //   },
    //       //   resolve: (doc) => ({
    //       //     locations: [
    //       //       {
    //       //         title: doc?.name || 'Untitled',
    //       //         href: resolveHref('page', doc || undefined),
    //       //       },
    //       //     ].filter((loc): loc is DocumentLocation => Boolean(loc.href)),
    //       //   }),
    //       // }),
    //       // post: defineLocations({
    //       //   select: {
    //       //     title: 'title',
    //       //     slug: 'slug.current',
    //       //   },
    //       //   resolve: (doc) => ({
    //       //     locations: [
    //       //       {
    //       //         title: doc?.title || 'Untitled',
    //       //         href: resolveHref('post', doc || undefined),
    //       //         children: [{title: 'Preview', href: resolveHref('post', doc || undefined)}],
    //       //       },
    //       //       homeLocation,
    //       //     ].filter((loc): loc is DocumentLocation => Boolean(loc.href)),
    //       //   }),
    //       // }),
    //     },
    //   },
    // }),
    structureTool({
      structure, // Custom studio structure configuration, imported from ./src/structure.ts
    }),
    // Additional plugins for enhanced functionality
    // assist(),
    visionTool(),
    contactFormPlugin(),
  ],

  // Schema configuration, imported from ./src/schemaTypes/index.ts
  schema: {
    types: schemaTypes,
    templates: (prev) =>
      prev.filter((template) => !['project', 'deliverable'].includes(template.id)),
  },
})
