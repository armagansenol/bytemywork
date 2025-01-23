import {CogIcon, EnvelopeIcon} from '@sanity/icons'
import type {StructureResolver} from 'sanity/structure'
import {ContactFormList} from '../components/ContactFormList'

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

export const structure: StructureResolver = (S: any) =>
  S.list()
    .title('Website Content')
    .items([
      S.documentTypeListItem('project').title('Projects'),
      // Settings Singleton in order to view/edit the one particular document for Settings.  Learn more about Singletons: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
      S.listItem()
        .title('Site Settings')
        .child(
          S.list()
            .title('Site Settings')
            .items([
              S.listItem()
                .title('General Settings')
                .child(S.document().schemaType('settings').documentId('siteSettings')),
              S.documentTypeListItem('deliverable').title('Deliverables'),
            ]),
        )
        .icon(CogIcon),
      // Add Contact Form Submissions as another top-level item
      S.listItem()
        .title('Contact Form Submissions')
        .child(S.component(ContactFormList).title('Contact Form Submissions'))
        .icon(EnvelopeIcon),
    ])
