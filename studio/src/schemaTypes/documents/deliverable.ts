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
      // Get the first available title value from the internationalized array
      const firstTitle = Array.isArray(title) ? title[0]?.value : ''
      return {
        title: firstTitle,
        media: () => 'D',
      }
    },
  },
})
