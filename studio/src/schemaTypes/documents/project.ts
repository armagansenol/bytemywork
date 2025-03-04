import React from 'react'
import {defineField, defineType} from 'sanity'
import {isUniqueOtherThanLanguage} from '../../lib/utils'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  preview: {
    select: {
      title: 'projectName',
      media: 'heroImage',
    },
  },
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({type: 'project'}),
    defineField({
      name: 'projectName',
      title: 'Project Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'projectName',
        isUnique: isUniqueOtherThanLanguage,
      },
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   name: 'description',
    //   title: 'Description',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'block',
    //       styles: [{title: 'Normal', value: 'normal'}],
    //       marks: {
    //         // Only allow these decorators
    //         decorators: [
    //           {title: 'Strong', value: 'strong'},
    //           {title: 'Emphasis', value: 'em'},
    //           {title: 'Underline', value: 'underline'},
    //         ],
    //       },
    //     },
    //   ],
    // }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'string',
    }),
    defineField({
      name: 'deliverables',
      title: 'Deliverables',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'deliverable'}],
        },
      ],
    }),
    defineField({
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'techStack'}],
        },
      ],
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Website URL',
      type: 'url',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        defineField({
          name: 'mediaGrid',
          title: 'Media Grid',
          type: 'object',
          preview: {
            select: {
              image1: 'items.0.asset',
              image2: 'items.1.asset',
              image3: 'items.2.asset',
              component: 'component',
            },
            prepare({image1, image2, image3, component}) {
              const images = [image1, image2, image3].filter(Boolean)
              return {
                title: component,
                media: images[0],
                imageUrls: images,
                subtitle: `(${images.length} images)`,
              }
            },
          },
          fields: [
            defineField({
              name: 'component',
              title: 'Component',
              type: 'string',
              initialValue: 'MediaGrid',
              readOnly: true,
            }),
            defineField({
              name: 'items',
              title: 'Media',
              type: 'array',
              of: [
                {type: 'image'},
                {
                  title: 'Video',
                  name: 'video',
                  type: 'mux.video',
                },
              ],
              validation: (Rule) => Rule.max(3),
            }),
          ],
        }),
        defineField({
          name: 'textBlock',
          title: 'Text Block',
          type: 'object',
          fields: [
            defineField({
              name: 'component',
              title: 'Component',
              type: 'string',
              initialValue: 'TextBlock',
              readOnly: true,
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [{title: 'Normal', value: 'normal'}],
                  marks: {
                    // Only allow these decorators
                    decorators: [
                      {title: 'Strong', value: 'strong'},
                      {title: 'Emphasis', value: 'em'},
                      {title: 'Underline', value: 'underline'},
                    ],
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              // description: 'description',
              component: 'component',
            },
            prepare({title}) {
              return {
                title: title || 'Text Block',
                // subtitle: description?.substring(0, 50) + (description?.length > 50 ? '...' : ''),
                media: () => React.createElement('span', {style: {fontSize: '1.5em'}}, 'T'),
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
  ],
})
