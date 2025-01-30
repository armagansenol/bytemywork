import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'deliverable',
  title: 'Deliverable',
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
        ? title.find((t) => t._key === 'en')?.value || ''
        : ''
      return {
        title: englishTitle,
        media: () => 'D',
      }
    },
  },
})
