import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contactForm',
  type: 'document',
  title: 'Contact Form Submissions',
  icon: () => '📬',
  description: 'Submissions from the website contact form',
  readOnly: true,
  validation: (Rule) =>
    Rule.custom(async (document, context) => {
      // Query for documents with the same email
      const {getClient} = context
      const client = getClient({apiVersion: '2023-01-01'})

      const query = `count(*[_type == "contactForm" && email == $email && _id != $currentId])`
      const params = {
        email: document?.email,
        currentId: document?._id,
      }

      const count = await client.fetch(query, params)

      if (count >= 2) {
        return 'This email has already submitted 2 times'
      }

      return true
    }),
  fields: [
    defineField({
      name: 'submittedAt',
      type: 'datetime',
      title: 'Submitted At',
      initialValue: new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email',
      readOnly: true,
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      type: 'string',
      title: 'Phone',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'budget',
      type: 'string',
      title: 'Budget',
      readOnly: true,
      options: {
        list: [
          {title: '< 100.000₺', value: '<100000'},
          {title: '100.000₺ - 200.000₺', value: '100000-200000'},
          {title: '> 200.000₺', value: '>200000'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'projectDetails',
      type: 'text',
      title: 'Project Details',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      date: 'submittedAt',
    },
    prepare({title, subtitle, date}) {
      const formattedDate = date
        ? new Date(date).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })
        : 'No date'
      return {
        title: title || 'Unnamed Submission',
        subtitle: `${formattedDate} - ${subtitle}`,
      }
    },
  },
})
