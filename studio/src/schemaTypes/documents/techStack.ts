import {defineField, defineType} from 'sanity'
import {DEFAULT_LANGUAGE} from '../../lib/constants'

export default defineType({
  name: 'techStack',
  title: 'Tech Stack',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'internationalizedArrayString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      const englishTitle = Array.isArray(title)
        ? title.find((t) => t._key === DEFAULT_LANGUAGE)?.value || ''
        : ''
      return {
        title: englishTitle,
        media: () => 'D',
      }
    },
  },
})
