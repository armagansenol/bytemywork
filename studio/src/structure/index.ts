import {AsteriskIcon, CogIcon, EmptyIcon, EnvelopeIcon} from '@sanity/icons'
import type {StructureResolver} from 'sanity/structure'
import {ContactFormList} from '../components/ContactFormList'

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

const LANGUAGES = [
  {id: 'en', title: 'English', flag: '🇬🇧'},
  {id: 'tr', title: 'Turkish', flag: '🇹🇷'},
]

export const structure: StructureResolver = (S: any) =>
  S.list()
    .title('Website Content')
    .items([
      // Projects with language variants
      S.listItem()
        .title('Projects')
        .id('project')
        .child(
          S.list()
            .title('Projects')
            .items(
              LANGUAGES.map((language) =>
                S.listItem()
                  .title(` Projects (${language.id.toLocaleUpperCase()} ${language.flag})`)
                  .child(
                    S.documentTypeList('project')
                      .title(`Projects (${language.id.toLocaleUpperCase()} ${language.flag})`)
                      .filter('_type == "project" && language == $language')
                      .params({language: language.id}),
                  )
                  .icon(AsteriskIcon),
              ),
            ),
        )
        .icon(AsteriskIcon),
      // Settings Singleton in order to view/edit the one particular document for Settings.  Learn more about Singletons: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
      S.listItem()
        .title('Site Settings')
        .child(
          S.list()
            .title('Site Settings')
            .items([
              S.listItem()
                .title('General Settings')
                .icon(CogIcon)
                .child(S.document().schemaType('settings').documentId('siteSettings')),
              S.documentTypeListItem('deliverable').title('Deliverables').icon(EmptyIcon),
            ]),
        )
        .icon(CogIcon),
      // Add Contact Form Submissions as another top-level item
      S.listItem()
        .title('Contact Form Submissions')
        .child(S.component(ContactFormList).title('Contact Form Submissions'))
        .icon(EnvelopeIcon),
    ])
