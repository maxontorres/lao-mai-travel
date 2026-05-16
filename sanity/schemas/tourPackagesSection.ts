import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'tourPackagesSection',
  title: 'Tour Packages Section Header',
  type: 'document',
  groups: [
    { name: 'english', title: 'English Content', default: true },
    { name: 'thai',    title: 'Thai Content' },
  ],
  fields: [
    defineField({ name: 'eyebrow_en',     title: 'Eyebrow Text (EN)',         type: 'string', group: 'english' }),
    defineField({ name: 'titlePrefix_en', title: 'Title Prefix (EN)',         type: 'string', group: 'english', description: 'e.g. "Our"' }),
    defineField({ name: 'titleEm_en',     title: 'Title Emphasis (EN)',       type: 'string', group: 'english', description: 'Italic part of the title, e.g. "Tour Packages"' }),
    defineField({ name: 'intro_en',       title: 'Intro Paragraph (EN)',      type: 'text',   group: 'english' }),
    defineField({ name: 'eyebrow_th',     title: 'Eyebrow Text (TH)',         type: 'string', group: 'thai' }),
    defineField({ name: 'titlePrefix_th', title: 'Title Prefix (TH)',         type: 'string', group: 'thai' }),
    defineField({ name: 'titleEm_th',     title: 'Title Emphasis (TH)',       type: 'string', group: 'thai' }),
    defineField({ name: 'intro_th',       title: 'Intro Paragraph (TH)',      type: 'text',   group: 'thai' }),
  ],
  preview: { prepare: () => ({ title: 'Tour Packages Section Header' }) },
})
