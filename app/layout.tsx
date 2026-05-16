import type { Metadata } from 'next'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import ProgressBar from '@/components/ProgressBar/ProgressBar'
import PWARegister from '@/components/PWARegister/PWARegister'
import { CONTACT } from '@/lib/contact'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://laomaitravel.com'),
  title: {
    default: 'Lao Mai Travel – Your Trusted Local Travel Partner Laos',
    template: '%s | Lao Mai Travel'
  },
  description:
    'Authentic Laos travel experiences crafted by local experts. Day tours, weekend escapes, and grand Laos journeys from Vientiane.',
  keywords: [
    'Laos travel',
    'Vientiane tours',
    'Laos tour packages',
    'local Laos guide',
    'authentic Laos experiences',
    'Luang Prabang tours',
    'Laos adventure tours',
    'Southeast Asia travel',
    'Laos cultural tours',
    'Mekong River tours',
    'Laos travel agency',
    'Laos tourism',
    'Vientiane travel guide',
    'Laos vacation packages',
    'Laos eco tours'
  ],
  authors: [{ name: 'Lao Mai Travel' }],
  creator: 'Lao Mai Travel',
  publisher: 'Lao Mai Travel',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: 'travel',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['th_TH'],
    url: 'https://laomaitravel.com',
    siteName: 'Lao Mai Travel',
    title: 'Lao Mai Travel – Your Trusted Local Travel Partner Laos',
    description:
      'Authentic Laos travel experiences crafted by local experts. Day tours, weekend escapes, and grand Laos journeys from Vientiane.',
    images: [
      {
        url: '/img/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Lao Mai Travel - Discover the Soul of Laos',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lao Mai Travel – Your Trusted Local Travel Partner Laos',
    description:
      'Authentic Laos travel experiences crafted by local experts. Day tours, weekend escapes, and grand Laos journeys from Vientiane.',
    images: ['/img/og-image.png'],
    creator: '@laomaitravel',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
  }),
  alternates: {
    canonical: 'https://laomaitravel.com',
    languages: {
      'en': 'https://laomaitravel.com/en',
      'th': 'https://laomaitravel.com/th',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': 'https://laomaitravel.com/#organization',
    name: 'Lao Mai Travel',
    description: 'Your Trusted Local Travel Partner in Laos - Authentic travel experiences crafted by local experts',
    url: 'https://laomaitravel.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://laomaitravel.com/img/logo.jpeg',
      width: 250,
      height: 60
    },
    image: {
      '@type': 'ImageObject',
      url: 'https://laomaitravel.com/img/og-image.png',
      width: 1200,
      height: 630
    },
    telephone: CONTACT.phoneTel,
    email: 'info@laomaitravel.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Vientiane',
      addressCountry: 'LA'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '17.9757',
      longitude: '102.6331'
    },
    sameAs: [
      'https://www.facebook.com/laomaitravel',
      'https://www.instagram.com/laomaitravel',
      'https://www.tripadvisor.com/laomaitravel'
    ],
    priceRange: '$$',
    areaServed: {
      '@type': 'Country',
      name: 'Laos'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Travel Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'TouristTrip',
            name: 'Day Tours',
            description: 'Curated day trips around Vientiane and Laos',
            touristType: 'Cultural Travelers'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'TouristTrip',
            name: 'Weekend Escapes',
            description: 'Multi-day weekend tours exploring Laos',
            touristType: 'Adventure Seekers'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'TouristTrip',
            name: 'Grand Laos Journeys',
            description: 'Extended tours covering major destinations in Laos',
            touristType: 'Experience Travelers'
          }
        }
      ]
    }
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://laomaitravel.com/#website',
    url: 'https://laomaitravel.com',
    name: 'Lao Mai Travel',
    description: 'Authentic Laos travel experiences crafted by local experts',
    publisher: {
      '@id': 'https://laomaitravel.com/#organization'
    },
    inLanguage: ['en', 'th']
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://laomaitravel.com'
      }
    ]
  }

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <script defer src="https://cloud.umami.is/script.js" data-website-id="f14224ec-d341-4d1a-8d3b-19a1fa847e25" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;600&family=Montserrat:wght@300;400;500&family=Sarabun:ital,wght@0,200;0,300;0,400;1,200;1,300&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#c9a84c" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="geo.region" content="LA" />
        <meta name="geo.placename" content="Vientiane" />
        <meta name="geo.position" content="17.9757;102.6331" />
        <meta name="ICBM" content="17.9757, 102.6331" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </head>
      <body>
        <ProgressBar />
        {children}
        <PWARegister />
        <Analytics />
        <SpeedInsights />
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="f14224ec-d341-4d1a-8d3b-19a1fa847e25"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
