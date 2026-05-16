import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'tourPackage',
  title: 'Tour Package',
  type: 'document',
  groups: [
    { name: 'overview',  title: 'Overview', default: true },
    { name: 'english',   title: 'English Content' },
    { name: 'thai',      title: 'Thai Content' },
    { name: 'itinerary', title: 'Itinerary' },
    { name: 'logistics', title: 'Logistics' },
    { name: 'media',     title: 'Images' },
  ],
  fields: [
    defineField({
      name: 'slug', title: 'Slug (URL)', type: 'slug', group: 'overview',
      options: { source: 'name_en', maxLength: 96 },
      description: 'Used in the URL: /en/tours/[slug]. Changing this breaks existing links — be careful.',
      validation: (R) => R.required(),
    }),
    defineField({ name: 'region',     title: 'Region',          type: 'string', group: 'overview', description: 'e.g. "Northern Laos"' }),
    defineField({ name: 'province',   title: 'Province',        type: 'string', group: 'overview' }),
    defineField({ name: 'duration',   title: 'Duration',        type: 'string', group: 'overview', description: 'e.g. "3 DAYS · 2 NIGHTS"' }),
    defineField({ name: 'departure',  title: 'Departure Point', type: 'string', group: 'overview' }),
    defineField({
      name: 'sortOrder', title: 'Sort Order', type: 'number', group: 'overview',
      description: 'Lower numbers appear first in the tour list on the homepage.',
    }),

    // English
    defineField({ name: 'name_en',       title: 'Tour Name (EN)',         type: 'string', group: 'english', validation: (R) => R.required() }),
    defineField({ name: 'highlight_en',  title: 'Highlight Tagline (EN)', type: 'string', group: 'english', description: 'Short one-liner shown on the tour card.' }),
    defineField({ name: 'intro_en',      title: 'Introduction (EN)',      type: 'text',   group: 'english' }),
    defineField({
      name: 'highlights_en', title: 'Highlight Bullets (EN)', type: 'array', group: 'english',
      of: [{ type: 'string' }],
    }),

    // Thai
    defineField({ name: 'name_th',       title: 'Tour Name (TH)',         type: 'string', group: 'thai' }),
    defineField({ name: 'highlight_th',  title: 'Highlight Tagline (TH)', type: 'string', group: 'thai' }),
    defineField({ name: 'intro_th',      title: 'Introduction (TH)',      type: 'text',   group: 'thai' }),
    defineField({
      name: 'highlights_th', title: 'Highlight Bullets (TH)', type: 'array', group: 'thai',
      of: [{ type: 'string' }],
    }),

    // Itinerary
    defineField({
      name: 'days',
      title: 'Daily Itinerary',
      type: 'array',
      group: 'itinerary',
      of: [
        {
          type: 'object',
          name: 'day',
          fields: [
            defineField({ name: 'title_en', title: 'Day Title (EN)', type: 'string' }),
            defineField({ name: 'body_en',  title: 'Day Description (EN)', type: 'text' }),
            defineField({ name: 'title_th', title: 'Day Title (TH)', type: 'string' }),
            defineField({ name: 'body_th',  title: 'Day Description (TH)', type: 'text' }),
          ],
          preview: { select: { title: 'title_en' } },
        },
      ],
    }),

    // Logistics
    defineField({
      name: 'includes_en', title: 'Price Includes (EN)', type: 'array', group: 'logistics',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'excludes_en', title: 'Price Excludes (EN)', type: 'array', group: 'logistics',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'includes_th', title: 'Price Includes (TH)', type: 'array', group: 'logistics',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'excludes_th', title: 'Price Excludes (TH)', type: 'array', group: 'logistics',
      of: [{ type: 'string' }],
    }),

    // Media
    defineField({
      name: 'coverImage', title: 'Cover Image', type: 'image', group: 'media',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      group: 'media',
      description: 'Additional images shown in the tour gallery slider.',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'name_en', subtitle: 'region', media: 'coverImage' },
  },
  orderings: [
    { title: 'Sort Order', name: 'sortOrderAsc', by: [{ field: 'sortOrder', direction: 'asc' }] },
  ],
})
