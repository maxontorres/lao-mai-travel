import { MetadataRoute } from 'next'

/**
 * SEO-optimized sitemap for Lao Mai Travel
 * 
 * This sitemap includes:
 * - Root & localized homepages (3 entries)
 * - Company profile pages (2 entries)  
 * - All tour package pages (28 entries - 14 tours × 2 locales)
 * - Privacy & Terms pages (4 entries)
 * 
 * Total: 37 URLs
 * 
 * Priority guidelines:
 * - 1.0: Homepage (highest)
 * - 0.9: Tour packages (main content)
 * - 0.7: Company profile
 * - 0.3: Legal pages (privacy, terms)
 * 
 * Note: Keep tour slugs in sync with app/[locale]/tours/[slug]/page.tsx
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://laomaitravel.com'
  const locales = ['en', 'th']
  const currentDate = new Date()

  // Tour slugs - keep in sync with generateStaticParams in app/[locale]/tours/[slug]/page.tsx
  const tourSlugs = [
    'hidden-legacy-houaphanh',
    'hidden-tribes-of-northern-phongsaly',
    'oudomxay-akha-hmong-day-tour',
    'wild-thrill-trails',
    'bolaven-plateau-homestay',
    'vientiane-culinary-cultural',
    'vang-vieng-cycling-karsts',
    'vang-vieng-cave-kayaking',
    'luang-prabang-waterfalls-caves',
    'luang-prabang-cultural-pottery',
    'authentic-hmong-khmu-trek',
    'luang-prabang-cultural-homestay',
    'laos-discovery-journey',
    'soul-of-laos',
  ]

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
    // Company profile pages
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}/company-profile`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    // Tour package pages - high priority for main content
    ...locales.flatMap((locale) =>
      tourSlugs.map((slug) => ({
        url: `${baseUrl}/${locale}/tours/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      }))
    ),
    // Privacy policy pages
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    })),
    // Terms of service pages
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}/terms`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    })),
  ]

  return routes
}
