import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonialSection',
  title: 'Testimonial Section',
  type: 'document',
  groups: [
    { name: 'english', title: 'English Content', default: true },
    { name: 'thai',    title: 'Thai Content' },
    { name: 'author',  title: 'Author' },
  ],
  fields: [
    defineField({ name: 'quote_en', title: 'Quote (EN)', type: 'text', group: 'english' }),
    defineField({ name: 'quote_th', title: 'Quote (TH)', type: 'text', group: 'thai' }),
    defineField({
      name: 'author', title: 'Author Name & Location', type: 'string', group: 'author',
      description: 'e.g. "MAXIMILIANO BRITO TORRES · MEXICO CITY, MEXICO"',
    }),
    defineField({
      name: 'authorImage', title: 'Author Photo', type: 'image', group: 'author',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
    }),
  ],
  preview: { prepare: () => ({ title: 'Testimonial Section' }) },
})
