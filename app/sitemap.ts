import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity/client'
import { tourSlugsQuery, blogSlugsQuery } from '@/lib/sanity/queries'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://laomaitravel.com'
  const locales = ['en', 'th']
  const currentDate = new Date()

  // Fetch slugs from Sanity (fall back to empty arrays if not yet configured)
  const [tourSlugs, blogSlugs] = await Promise.all([
    client.fetch<{ slug: string }[]>(tourSlugsQuery).catch(() => [] as { slug: string }[]),
    client.fetch<{ slug: string; publishedAt: string }[]>(blogSlugsQuery).catch(() => [] as { slug: string; publishedAt: string }[]),
  ])

  const alternates = {
    languages: {
      en: `${baseUrl}/en`,
      th: `${baseUrl}/th`,
    },
  }

  const routes: MetadataRoute.Sitemap = [
    // Root homepage
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates,
    },
    // Localized homepages
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
      alternates,
    })),
    // Blog index pages
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.6,
    })),
    // Blog posts
    ...locales.flatMap((locale) =>
      blogSlugs.map(({ slug, publishedAt }) => ({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified: publishedAt ? new Date(publishedAt) : currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))
    ),
    // Tour package pages
    ...locales.flatMap((locale) =>
      tourSlugs.map(({ slug }) => ({
        url: `${baseUrl}/${locale}/tours/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      }))
    ),
    // Company profile pages
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}/company-profile`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    // Legal pages
    ...locales.flatMap((locale) => [
      { url: `${baseUrl}/${locale}/privacy`, lastModified: currentDate, changeFrequency: 'monthly' as const, priority: 0.3 },
      { url: `${baseUrl}/${locale}/terms`,   lastModified: currentDate, changeFrequency: 'monthly' as const, priority: 0.3 },
    ]),
  ]

  return routes
}
