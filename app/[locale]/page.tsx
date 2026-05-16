import type { Metadata } from 'next'
import Nav          from '@/components/Nav/Nav'
import Hero         from '@/components/Hero/Hero'
import Destinations from '@/components/Destinations/Destinations'
import TourPackages from '@/components/TourPackages/TourPackages'
import Panorama     from '@/components/Panorama/Panorama'
import About        from '@/components/About/About'
import Services     from '@/components/Services/Services'
import Testimonial  from '@/components/Testimonial/Testimonial'
import BlogPreview  from '@/components/BlogPreview/BlogPreview'
import BookingForm  from '@/components/BookingForm/BookingForm'
import Map          from '@/components/Map/Map'
import Footer       from '@/components/Footer/Footer'
import { sanityFetch } from '@/lib/sanity/client'
import {
  heroQuery,
  tourPackagesSectionQuery,
  tourPackagesListQuery,
  destinationsQuery,
  aboutQuery,
  panoramaQuery,
  servicesQuery,
  testimonialQuery,
  blogPreviewQuery,
  siteSettingsQuery,
} from '@/lib/sanity/queries'
import type {
  HeroData,
  TourPackagesSectionHeader,
  TourCard,
  DestinationsSectionData,
  AboutData,
  PanoramaData,
  ServicesSectionData,
  TestimonialData,
  PostCard,
  SiteSettings,
} from '@/lib/sanity/types'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  const titles: Record<string, string> = {
    en: 'Discover Authentic Laos Tours & Travel Experiences',
    th: 'ค้นพบประสบการณ์ทัวร์และท่องเที่ยวลาวแท้',
  }

  const descriptions: Record<string, string> = {
    en: 'Explore Laos with local experts. Curated tours from Vientiane to Luang Prabang, cultural experiences, adventure travel, and authentic Lao journeys. Book your dream trip today.',
    th: 'สำรวจลาวกับผู้เชี่ยวชาญท้องถิ่น ทัวร์คัดสรรจากเวียงจันทน์ถึงหลวงพระบาง ประสบการณ์วัฒนธรรม และการเดินทางลาวแท้จริง จองทริปในฝันของคุณวันนี้',
  }

  return {
    title:       titles[locale]       ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: `https://laomaitravel.com/${locale}`,
      languages: {
        en: 'https://laomaitravel.com/en',
        th: 'https://laomaitravel.com/th',
      },
    },
  }
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  const p = { locale }

  const [hero, toursHeader, tours, destinations, about, panorama, services, testimonial, blogPosts, settings] =
    await Promise.all([
      sanityFetch<HeroData>({                  query: heroQuery,                  params: p, tags: ['heroSection'] }),
      sanityFetch<TourPackagesSectionHeader>({  query: tourPackagesSectionQuery,   params: p, tags: ['tourPackagesSection'] }),
      sanityFetch<TourCard[]>({                 query: tourPackagesListQuery,      params: p, tags: ['tourPackage'] }),
      sanityFetch<DestinationsSectionData>({    query: destinationsQuery,          params: p, tags: ['destinationsSection'] }),
      sanityFetch<AboutData>({                  query: aboutQuery,                 params: p, tags: ['aboutSection'] }),
      sanityFetch<PanoramaData>({               query: panoramaQuery,              params: p, tags: ['panoramaSection'] }),
      sanityFetch<ServicesSectionData>({        query: servicesQuery,              params: p, tags: ['servicesSection'] }),
      sanityFetch<TestimonialData>({            query: testimonialQuery,           params: p, tags: ['testimonialSection'] }),
      sanityFetch<PostCard[]>({                 query: blogPreviewQuery,           params: p, tags: ['post'] }),
      sanityFetch<SiteSettings>({               query: siteSettingsQuery,          params: p, tags: ['siteSettings'] }),
    ])

  return (
    <>
      <Nav />
      <main itemScope itemType="https://schema.org/WebPage">
        {hero        && <Hero         data={hero} />}
        {destinations && <Destinations data={destinations} />}
        {tours       && toursHeader && <TourPackages header={toursHeader} tours={tours} />}
        {panorama    && <Panorama     data={panorama} />}
        {about       && <About        data={about} />}
        {services    && <Services     data={services} />}
        {testimonial && <Testimonial  data={testimonial} />}
        {blogPosts?.length > 0 && <BlogPreview posts={blogPosts} locale={locale} />}
        <BookingForm />
        <Map siteSettings={settings} />
      </main>
      <Footer siteSettings={settings} />
    </>
  )
}
