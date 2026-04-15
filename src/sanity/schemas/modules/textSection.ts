import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'textSection',
  title: 'Tekstseksjon',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel (valgfri)',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Innhold',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt-tekst', type: 'string' },
            { name: 'caption', title: 'Bildetekst', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'style',
      title: 'Stil',
      type: 'string',
      options: {
        list: [
          { title: 'Standard (lys)', value: 'default' },
          { title: 'Mørk (navy)', value: 'dark' },
          { title: 'Brand (teal)', value: 'brand' },
        ],
      },
      initialValue: 'default',
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title: `Tekst: ${title || 'Uten tittel'}` }
    },
  },
})
