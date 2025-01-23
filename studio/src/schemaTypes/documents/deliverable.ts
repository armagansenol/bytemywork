import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'deliverable',
  title: 'Deliverable',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
