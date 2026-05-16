import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'destinationsSection',
  title: 'Destinations Section',
  type: 'document',
  groups: [
    { name: 'header',  title: 'Section Header', default: true },
    { name: 'items',   title: 'Destination Cards' },
  ],
  fields: [
    defineField({ name: 'eyebrow_en',    title: 'Eyebrow (EN)',      type: 'string', group: 'header' }),
    defineField({ name: 'eyebrow_th',    title: 'Eyebrow (TH)',      type: 'string', group: 'header' }),
    defineField({ name: 'titleLine1_en', title: 'Title Line 1 (EN)', type: 'string', group: 'header' }),
    defineField({ name: 'titleLine1_th', title: 'Title Line 1 (TH)', type: 'string', group: 'header' }),
    defineField({ name: 'titleLine2_en', title: 'Title Line 2 — italic (EN)', type: 'string', group: 'header' }),
    defineField({ name: 'titleLine2_th', title: 'Title Line 2 — italic (TH)', type: 'string', group: 'header' }),
    defineField({ name: 'desc_en',       title: 'Description (EN)',  type: 'text',   group: 'header' }),
    defineField({ name: 'desc_th',       title: 'Description (TH)',  type: 'text',   group: 'header' }),
    defineField({ name: 'modalCta_en',   title: 'Modal CTA Button (EN)', type: 'string', group: 'header' }),
    defineField({ name: 'modalCta_th',   title: 'Modal CTA Button (TH)', type: 'string', group: 'header' }),
    defineField({
      name: 'items',
      title: 'Destination Cards',
      type: 'array',
      group: 'items',
      description: 'Keep exactly 5 destinations for the grid layout. One should have "Featured" checked — it renders as the large card.',
      of: [
        {
          type: 'object',
          name: 'destinationItem',
          groups: [
            { name: 'en', title: 'English', default: true },
            { name: 'th', title: 'Thai' },
            { name: 'media', title: 'Image' },
          ],
          fields: [
            defineField({ name: 'name_en',        title: 'Name (EN)',         type: 'string', group: 'en' }),
            defineField({ name: 'tag_en',          title: 'Tag / Region (EN)', type: 'string', group: 'en', description: 'e.g. "CAPITAL CITY · TEMPLES · MEKONG"' }),
            defineField({ name: 'description_en',  title: 'Description (EN)', type: 'text',   group: 'en' }),
            defineField({ name: 'name_th',         title: 'Name (TH)',         type: 'string', group: 'th' }),
            defineField({ name: 'tag_th',          title: 'Tag / Region (TH)', type: 'string', group: 'th' }),
            defineField({ name: 'description_th',  title: 'Description (TH)', type: 'text',   group: 'th' }),
            defineField({
              name: 'image', title: 'Destination Image', type: 'image', group: 'media',
              options: { hotspot: true },
              fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
            }),
            defineField({
              name: 'featured', title: 'Featured (large card)', type: 'boolean', group: 'media',
              description: 'Only one destination should be featured at a time.',
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: 'name_en', subtitle: 'tag_en', media: 'image' },
          },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Destinations Section' }) },
})
