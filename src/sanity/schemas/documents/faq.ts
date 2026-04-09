import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Spørsmål',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Svar',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Kom i gang', value: 'kom-i-gang' },
          { title: 'Varslinger og treff', value: 'varslinger-og-treff' },
          { title: 'CPV-koder og søkeord', value: 'cpv-koder-og-sokeord' },
          { title: 'Brukere, mottakere og tilgang', value: 'brukere-og-tilgang' },
          { title: 'Innlogging og tekniske spørsmål', value: 'innlogging-og-teknisk' },
          { title: 'Abonnement, prøvetid og oppsigelse', value: 'abonnement-og-oppsigelse' },
          { title: 'Faktura og betaling', value: 'faktura-og-betaling' },
          { title: 'Om Finndoff og andre løsninger', value: 'om-finndoff' },
          { title: 'Beste praksis', value: 'beste-praksis' },
        ],
      },
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sortering',
      type: 'number',
      description: 'Lavere tall vises først innen kategorien',
      initialValue: 0,
    }),
    defineField({
      name: 'product',
      title: 'Tilknyttet produkt',
      type: 'reference',
      to: [{ type: 'product' }],
    }),
  ],
  orderings: [
    {
      title: 'Kategori + sortering',
      name: 'categorySortOrder',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'sortOrder', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: { title: 'question', category: 'category' },
    prepare({ title, category }) {
      return { title, subtitle: category }
    },
  },
})
