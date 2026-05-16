import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutSection',
  title: 'About Section',
  type: 'document',
  groups: [
    { name: 'english', title: 'English Content', default: true },
    { name: 'thai',    title: 'Thai Content' },
    { name: 'media',   title: 'Image & Badge' },
    { name: 'features', title: 'Feature Items' },
  ],
  fields: [
    defineField({ name: 'eyebrow_en',    title: 'Eyebrow (EN)',          type: 'string', group: 'english' }),
    defineField({ name: 'titleLine1_en', title: 'Title Line 1 (EN)',     type: 'string', group: 'english' }),
    defineField({ name: 'titleLine2_en', title: 'Title Line 2 — italic (EN)', type: 'string', group: 'english' }),
    defineField({ name: 'body_en',       title: 'Body Text (EN)',        type: 'text',   group: 'english' }),
    defineField({ name: 'eyebrow_th',    title: 'Eyebrow (TH)',          type: 'string', group: 'thai' }),
    defineField({ name: 'titleLine1_th', title: 'Title Line 1 (TH)',     type: 'string', group: 'thai' }),
    defineField({ name: 'titleLine2_th', title: 'Title Line 2 — italic (TH)', type: 'string', group: 'thai' }),
    defineField({ name: 'body_th',       title: 'Body Text (TH)',        type: 'text',   group: 'thai' }),
    defineField({
      name: 'image', title: 'Section Image', type: 'image', group: 'media',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
    }),
    defineField({ name: 'badgeNum',      title: 'Badge Number',          type: 'string', group: 'media', description: 'e.g. "8+"' }),
    defineField({ name: 'badgeLabel_en', title: 'Badge Label (EN)',      type: 'string', group: 'media', description: 'Use \\n for a line break. e.g. "YEARS OF\\nEXCELLENCE"' }),
    defineField({ name: 'badgeLabel_th', title: 'Badge Label (TH)',      type: 'string', group: 'media' }),
    defineField({
      name: 'features',
      title: 'Feature Items',
      type: 'array',
      group: 'features',
      description: 'Exactly 3 feature items with an icon, title, and description.',
      of: [
        {
          type: 'object',
          name: 'feature',
          fields: [
            defineField({ name: 'icon',     title: 'Emoji Icon',      type: 'string', description: 'e.g. 🧭' }),
            defineField({ name: 'title_en', title: 'Title (EN)',       type: 'string' }),
            defineField({ name: 'desc_en',  title: 'Description (EN)', type: 'text' }),
            defineField({ name: 'title_th', title: 'Title (TH)',       type: 'string' }),
            defineField({ name: 'desc_th',  title: 'Description (TH)', type: 'text' }),
          ],
          preview: { select: { title: 'title_en', subtitle: 'icon' } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'About Section' }) },
})
