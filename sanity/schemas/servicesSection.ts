import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'servicesSection',
  title: 'Services Section',
  type: 'document',
  groups: [
    { name: 'header', title: 'Section Header', default: true },
    { name: 'items',  title: 'Service Cards' },
  ],
  fields: [
    defineField({ name: 'eyebrow_en',    title: 'Eyebrow (EN)',          type: 'string', group: 'header' }),
    defineField({ name: 'eyebrow_th',    title: 'Eyebrow (TH)',          type: 'string', group: 'header' }),
    defineField({ name: 'titleLine1_en', title: 'Title Line 1 (EN)',     type: 'string', group: 'header' }),
    defineField({ name: 'titleLine1_th', title: 'Title Line 1 (TH)',     type: 'string', group: 'header' }),
    defineField({ name: 'titleLine2_en', title: 'Title Line 2 — italic (EN)', type: 'string', group: 'header' }),
    defineField({ name: 'titleLine2_th', title: 'Title Line 2 — italic (TH)', type: 'string', group: 'header' }),
    defineField({ name: 'intro_en',      title: 'Intro Paragraph (EN)',  type: 'text',   group: 'header' }),
    defineField({ name: 'intro_th',      title: 'Intro Paragraph (TH)',  type: 'text',   group: 'header' }),
    defineField({
      name: 'items',
      title: 'Service Cards',
      type: 'array',
      group: 'items',
      description: 'Exactly 3 service cards.',
      of: [
        {
          type: 'object',
          name: 'serviceItem',
          fields: [
            defineField({ name: 'title_en', title: 'Title (EN)',         type: 'string' }),
            defineField({ name: 'desc_en',  title: 'Description (EN)',   type: 'text' }),
            defineField({ name: 'title_th', title: 'Title (TH)',         type: 'string' }),
            defineField({ name: 'desc_th',  title: 'Description (TH)',   type: 'text' }),
            defineField({
              name: 'image', title: 'Service Image', type: 'image',
              options: { hotspot: true },
              fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
            }),
          ],
          preview: { select: { title: 'title_en', media: 'image' } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Services Section' }) },
})
