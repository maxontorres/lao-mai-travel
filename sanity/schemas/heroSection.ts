import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  groups: [
    { name: 'english', title: 'English Content', default: true },
    { name: 'thai',    title: 'Thai Content' },
  ],
  fields: [
    defineField({ name: 'eyebrow_en',    title: 'Eyebrow Text (EN)',                   type: 'string', group: 'english' }),
    defineField({ name: 'titleLine1_en', title: 'Title Line 1 (EN)',                   type: 'string', group: 'english' }),
    defineField({ name: 'titleLine2_en', title: 'Title Line 2 — italic (EN)',          type: 'string', group: 'english' }),
    defineField({ name: 'subtitle_en',   title: 'Subtitle (EN)',                       type: 'string', group: 'english' }),
    defineField({ name: 'body_en',       title: 'Body Text (EN)',                      type: 'text',   group: 'english', description: '1–2 sentences below the subtitle' }),
    defineField({ name: 'exploreCta_en', title: '"Explore Tours" Button Label (EN)',   type: 'string', group: 'english' }),
    defineField({ name: 'planCta_en',    title: '"Plan Your Trip" Button Label (EN)',  type: 'string', group: 'english' }),
    defineField({ name: 'scroll_en',     title: 'Scroll Indicator Label (EN)',         type: 'string', group: 'english' }),
    defineField({ name: 'eyebrow_th',    title: 'Eyebrow Text (TH)',                   type: 'string', group: 'thai' }),
    defineField({ name: 'titleLine1_th', title: 'Title Line 1 (TH)',                   type: 'string', group: 'thai' }),
    defineField({ name: 'titleLine2_th', title: 'Title Line 2 — italic (TH)',          type: 'string', group: 'thai' }),
    defineField({ name: 'subtitle_th',   title: 'Subtitle (TH)',                       type: 'string', group: 'thai' }),
    defineField({ name: 'body_th',       title: 'Body Text (TH)',                      type: 'text',   group: 'thai' }),
    defineField({ name: 'exploreCta_th', title: '"Explore Tours" Button Label (TH)',   type: 'string', group: 'thai' }),
    defineField({ name: 'planCta_th',    title: '"Plan Your Trip" Button Label (TH)',  type: 'string', group: 'thai' }),
    defineField({ name: 'scroll_th',     title: 'Scroll Indicator Label (TH)',         type: 'string', group: 'thai' }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Full-screen hero background. Recommended: landscape, min 1920×1080px.',
    }),
  ],
  preview: { prepare: () => ({ title: 'Hero Section' }) },
})
