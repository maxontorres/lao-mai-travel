import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  groups: [
    { name: 'meta',    title: 'Publishing & SEO', default: true },
    { name: 'english', title: 'English Content' },
    { name: 'thai',    title: 'Thai Content' },
  ],
  fields: [
    defineField({
      name: 'slug', title: 'Slug', type: 'slug', group: 'meta',
      options: { source: 'title_en', maxLength: 96 },
      description: 'Shared across both language URLs: /en/blog/[slug] and /th/blog/[slug]',
      validation: (R) => R.required(),
    }),
    defineField({ name: 'publishedAt', title: 'Published Date', type: 'datetime', group: 'meta' }),
    defineField({
      name: 'coverImage', title: 'Cover Image', type: 'image', group: 'meta',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
    }),

    // English
    defineField({
      name: 'title_en', title: 'Title (EN)', type: 'string', group: 'english',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'excerpt_en', title: 'Excerpt (EN)', type: 'text', group: 'english',
      description: 'Short summary shown on the blog card and used as SEO description (150–160 chars).',
    }),
    defineField({
      name: 'body_en',
      title: 'Body (EN)',
      type: 'array',
      group: 'english',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt',     title: 'Alt Text', type: 'string' }),
            defineField({ name: 'caption', title: 'Caption',  type: 'string' }),
          ],
        },
      ],
    }),
    defineField({ name: 'seoTitle_en',       title: 'SEO Title (EN)',       type: 'string', group: 'english', description: 'Overrides the post title in <title> tag. Keep under 60 characters.' }),
    defineField({ name: 'seoDescription_en', title: 'SEO Description (EN)', type: 'text',   group: 'english', description: '150–160 characters for the Google search snippet.' }),

    // Thai
    defineField({ name: 'title_th',           title: 'Title (TH)',            type: 'string', group: 'thai' }),
    defineField({ name: 'excerpt_th',         title: 'Excerpt (TH)',          type: 'text',   group: 'thai' }),
    defineField({
      name: 'body_th',
      title: 'Body (TH)',
      type: 'array',
      group: 'thai',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt',     title: 'Alt Text', type: 'string' }),
            defineField({ name: 'caption', title: 'Caption',  type: 'string' }),
          ],
        },
      ],
    }),
    defineField({ name: 'seoTitle_th',       title: 'SEO Title (TH)',       type: 'string', group: 'thai' }),
    defineField({ name: 'seoDescription_th', title: 'SEO Description (TH)', type: 'text',   group: 'thai' }),
  ],
  preview: {
    select: { title: 'title_en', subtitle: 'publishedAt', media: 'coverImage' },
    prepare({ title, subtitle, media }) {
      return {
        title: title ?? 'Untitled Post',
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : 'Unpublished',
        media,
      }
    },
  },
  orderings: [
    { title: 'Newest First', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
})
