import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'panoramaSection',
  title: 'Panorama Section',
  type: 'document',
  groups: [
    { name: 'english', title: 'English Content', default: true },
    { name: 'thai',    title: 'Thai Content' },
  ],
  fields: [
    defineField({
      name: 'eyebrow_en', title: 'Eyebrow Text (EN)', type: 'string', group: 'english',
      description: 'Full line shown above the headline. e.g. "ແຜ່ນດິນລ້ານຊ້າງ · THE LAND OF A MILLION ELEPHANTS"',
    }),
    defineField({ name: 'headlineLine1_en', title: 'Headline Part 1 (EN)',   type: 'string', group: 'english' }),
    defineField({ name: 'headlineEm_en',    title: 'Headline Italic Part (EN)', type: 'string', group: 'english' }),
    defineField({ name: 'headlineLine2_en', title: 'Headline Part 2 (EN)',   type: 'string', group: 'english' }),
    defineField({ name: 'eyebrow_th',       title: 'Eyebrow Text (TH)',      type: 'string', group: 'thai' }),
    defineField({ name: 'headlineLine1_th', title: 'Headline Part 1 (TH)',   type: 'string', group: 'thai' }),
    defineField({ name: 'headlineEm_th',    title: 'Headline Italic Part (TH)', type: 'string', group: 'thai' }),
    defineField({ name: 'headlineLine2_th', title: 'Headline Part 2 (TH)',   type: 'string', group: 'thai' }),
  ],
  preview: { prepare: () => ({ title: 'Panorama Section' }) },
})
