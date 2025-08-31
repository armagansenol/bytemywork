import {AsteriskIcon, CogIcon, EmptyIcon, EnvelopeIcon} from '@sanity/icons'
import type {StructureResolver} from 'sanity/structure'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {ContactFormList} from '../components/ContactFormList'
import {LANGUAGES} from '../lib/constants'

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

export const structure: StructureResolver = (S: any, context: any) =>
  S.list()
    .title('Website Content')
    .id('content')
    .items([
      // Projects with language variants
      S.listItem()
        .title('Projects')
        .id('project')
        .child(
          S.list()
            .title('Projects')
            .items([
              // Language-specific project lists with create buttons
              ...LANGUAGES.map((language) =>
                orderableDocumentListDeskItem({
                  type: 'project',
                  title: `Projects (${language.id.toLocaleUpperCase()} ${language.flag})`,
                  icon: AsteriskIcon,
                  filter: '_type == "project" && language == $language',
                  params: {language: language.id},
                  S,
                  context,
                  id: `orderable-project-${language.id}`,
                  createIntent: true,
                }),
              ),
            ]),
        )
        .icon(AsteriskIcon),
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
              S.documentTypeListItem('techStack').title('Tech Stack').icon(EmptyIcon),
            ]),
        )
        .icon(CogIcon),
      S.listItem()
        .title('Contact Form Submissions')
        .child(S.component(ContactFormList).title('Contact Form Submissions'))
        .icon(EnvelopeIcon),
    ])
