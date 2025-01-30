import {CogIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Settings schema Singleton.  Singletons are single documents that are displayed not in a collection, handy for things like site settings and other global configurations.
 * Learn more: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
 */

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'highlightedProjects',
      title: 'Highlighted Projects',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'projectReference',
          title: 'Project',
          type: 'reference',
          to: [{type: 'project'}],
        }),
      ],
      validation: (Rule) => Rule.required().min(1).error('At least one project must be selected'),
    }),
    defineField({
      // should match 'languageField' plugin configuration setting, if customized
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    // defineField({
    //   name: 'title',
    //   description: 'This field is the title of your blog.',
    //   title: 'Title',
    //   type: 'string',
    //   initialValue: demo.title,
    //   validation: (rule) => rule.required(),
    // }),
    // defineField({
    //   name: 'description',
    //   description: 'Used both for the <meta> description tag for SEO, and the blog subheader.',
    //   title: 'Description',
    //   type: 'array',
    //   initialValue: demo.description,
    //   of: [
    //     // Define a minified block content field for the description. https://www.sanity.io/docs/block-content
    //     defineArrayMember({
    //       type: 'block',
    //       options: {},
    //       styles: [],
    //       lists: [],
    //       marks: {
    //         decorators: [],
    //         annotations: [
    //           defineField({
    //             type: 'object',
    //             name: 'link',
    //             fields: [
    //               {
    //                 type: 'string',
    //                 name: 'href',
    //                 title: 'URL',
    //                 validation: (rule) => rule.required(),
    //               },
    //             ],
    //           }),
    //         ],
    //       },
    //     }),
    //   ],
    // }),
    // defineField({
    //   name: 'ogImage',
    //   title: 'Open Graph Image',
    //   type: 'image',
    //   description: 'Displayed on social cards and search engine results.',
    //   options: {
    //     hotspot: true,
    //     aiAssist: {
    //       imageDescriptionField: 'alt',
    //     },
    //   },
    //   fields: [
    //     defineField({
    //       name: 'alt',
    //       description: 'Important for accessibility and SEO.',
    //       title: 'Alternative text',
    //       type: 'string',
    //       validation: (rule) => {
    //         return rule.custom((alt, context) => {
    //           if ((context.document?.ogImage as any)?.asset?._ref && !alt) {
    //             return 'Required'
    //           }
    //           return true
    //         })
    //       },
    //     }),
    //     defineField({
    //       name: 'metadataBase',
    //       type: 'url',
    //       description: (
    //         <a
    //           href="https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase"
    //           rel="noreferrer noopener"
    //         >
    //           More information
    //         </a>
    //       ),
    //     }),
    //   ],
    // }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Settings',
      }
    },
  },
})
