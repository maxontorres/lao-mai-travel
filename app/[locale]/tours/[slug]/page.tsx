import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import TourGallery from '@/components/TourGallery/TourGallery'
import Nav from '@/components/Nav/Nav'
import Footer from '@/components/Footer/Footer'
import styles from './tour.module.css'

type Props = { params: Promise<{ locale: string; slug: string }> }

type Day = { title: string; body: string }

type TourMessage = {
  slug: string
  region: string
  province: string
  name: string
  highlight: string
  duration: string
  departure: string
  intro?: string
  highlights?: string[]
  days: Day[]
  includes: string[]
  excludes: string[]
}

const GALLERY: Record<string, string[]> = {
  'hidden-legacy-houaphanh': [
    '/img/tourpackages/hidden-legacy-houaphanh/caves-entrance.jpg',
    '/img/tourpackages/hidden-legacy-houaphanh/caves-entrance-sunlight.jpg',
    '/img/tourpackages/hidden-legacy-houaphanh/caves-inside-2-people.webp',
    '/img/tourpackages/hidden-legacy-houaphanh/caves-inside.jpeg',
    '/img/tourpackages/hidden-legacy-houaphanh/monument.jpeg',
  ],
  'hidden-tribes-of-northern-phongsaly': [
    '/img/tourpackages/hidden-tribes-of-northern-phongsaly/2-young-women.jpeg',
    '/img/tourpackages/hidden-tribes-of-northern-phongsaly/2-old-women.jpeg',
    '/img/tourpackages/hidden-tribes-of-northern-phongsaly/4-older-women.jpeg',
    '/img/tourpackages/hidden-tribes-of-northern-phongsaly/older-woman-1.jpeg',
    '/img/tourpackages/hidden-tribes-of-northern-phongsaly/older-woman-2.jpeg',
    '/img/tourpackages/hidden-tribes-of-northern-phongsaly/older-woman-3.jpeg',
    '/img/tourpackages/hidden-tribes-of-northern-phongsaly/woman-alone.jpeg',
    '/img/tourpackages/hidden-tribes-of-northern-phongsaly/younger-woman-1.jpeg',
    '/img/tourpackages/hidden-tribes-of-northern-phongsaly/younger-woman-2.jpeg',
  ],
  'oudomxay-akha-hmong-day-tour': [
    '/img/tourpackages/discover-the-hidden-villages-of-oudomxay-akha-&-hmong-day-tour/group-trekking.jpeg',
    '/img/tourpackages/discover-the-hidden-villages-of-oudomxay-akha-&-hmong-day-tour/man-trekking.jpeg',
    '/img/tourpackages/discover-the-hidden-villages-of-oudomxay-akha-&-hmong-day-tour/trekking-road-2-buffaloes.jpeg',
    '/img/tourpackages/discover-the-hidden-villages-of-oudomxay-akha-&-hmong-day-tour/woman-trekking.jpeg',
  ],
  'wild-thrill-trails': [
    '/img/tourpackages/wild-thrill-trails-camping-&-homestay/tourists-with-villager-women.jpeg',
    '/img/tourpackages/wild-thrill-trails-camping-&-homestay/tourists-outside-village-house.jpeg',
    '/img/tourpackages/wild-thrill-trails-camping-&-homestay/tourists-practicing-crossbow-shooting.jpeg',
    '/img/tourpackages/wild-thrill-trails-camping-&-homestay/village-houses.jpeg',
    '/img/tourpackages/wild-thrill-trails-camping-&-homestay/village-house.jpeg',
    '/img/tourpackages/wild-thrill-trails-camping-&-homestay/village-house-2.jpeg',
    '/img/tourpackages/wild-thrill-trails-camping-&-homestay/bed-inside-village-house.jpeg',
  ],
  'bolaven-plateau-homestay': [
    '/img/tourpackages/bolaven-plateau-homestay/bolaven-plateau-landscape.jpg',
    '/img/tourpackages/bolaven-plateau-homestay/couple-waterfall-behind.jpeg',
    '/img/tourpackages/bolaven-plateau-homestay/people-dining-bolaven-plateau.jpeg',
    '/img/tourpackages/bolaven-plateau-homestay/river-waves.jpeg',
    '/img/tourpackages/bolaven-plateau-homestay/view-from-above.jpeg',
  ],
  'vientiane-culinary-cultural': [
    '/img/tourpackages/vientiane-culinary-cultural-experience/restaurant-dish-food-asia-cuisine-soup-990286-pxhere.com.jpg',
    '/img/tourpackages/vientiane-culinary-cultural-experience/lao-art-museum.jpg',
    '/img/tourpackages/vientiane-culinary-cultural-experience/palace-monument-tower-landmark-tourism-place-of-worship-568215-pxhere.com.jpg',
  ],
  'vang-vieng-cycling-karsts': [
    '/img/tourpackages/cycling-the-karsts-lagoons/lagoon.png',
    '/img/tourpackages/cycling-the-karsts-lagoons/building-vacation-travel-tourism-place-of-worship-temple-612026-pxhere.com.jpg',
    '/img/tourpackages/cycling-the-karsts-lagoons/palace-vacation-travel-buddhist-landmark-tourism-1275876-pxhere.com.jpg',
  ],
  'vang-vieng-cave-kayaking': [
    '/img/tourpackages/vang-vieng-cave-kayaking-experience/laos-vang-vieng-river-water-landscape-peace-1663066-pxhere.com.jpg',
    '/img/tourpackages/vang-vieng-cave-kayaking-experience/landscape-sea-water-mountain-cloud-sunset-1191000-pxhere.com.jpg',
    '/img/tourpackages/vang-vieng-cave-kayaking-experience/landscape-sea-water-nature-boat-lake-1338879-pxhere.com.jpg',
    '/img/tourpackages/vang-vieng-cave-kayaking-experience/landscape-tree-water-nature-mountain-cloud-971263-pxhere.com.jpg',
  ],
  'luang-prabang-waterfalls-caves': [
    '/img/tourpackages/luang-prabang-turquoise-falls-sacred-caves-tour/Turquoise-Falls-&-Sacred-Caves-Tour-1.jpeg',
    '/img/tourpackages/luang-prabang-turquoise-falls-sacred-caves-tour/Turquoise-Falls-&-Sacred-Caves-Tour-2.jpg',
    '/img/tourpackages/luang-prabang-turquoise-falls-sacred-caves-tour/Turquoise-Falls-&-Sacred-Caves-Tour-3.jpeg',
    '/img/tourpackages/luang-prabang-turquoise-falls-sacred-caves-tour/Turquoise-Falls-&-Sacred-Caves-Tour-4.jpg',
  ],
  'luang-prabang-cultural-pottery': [
    '/img/tourpackages/luang-prabang-cultural-pottery-experience/Lao-Pottery-House-1.jpeg',
    '/img/tourpackages/luang-prabang-cultural-pottery-experience/Lao-Pottery-House-2.jpeg',
    '/img/tourpackages/luang-prabang-cultural-pottery-experience/Lao-Pottery-House-3.jpeg',
  ],
  
  // Authentic Hmong & Khmu Trek from Luang Prabang 
  'authentic-hmong-khmu-trek': [
    '/img/tourpackages/authentic-hmong-&-khmu-trek-from-luang-prabang/group-photo-trekking.jpeg',
    '/img/tourpackages/authentic-hmong-&-khmu-trek-from-luang-prabang/group-photo-at-village.jfif',
    '/img/tourpackages/authentic-hmong-&-khmu-trek-from-luang-prabang/people-trekking-photo-from-behind.jfif',
    '/img/tourpackages/authentic-hmong-&-khmu-trek-from-luang-prabang/village-photo-no-people.jfif',
  ],
  'luang-prabang-cultural-homestay': [
    '/img/tourpackages/luang-prabang-cultural-exchange-homestay-program/Luang Prabang Cultural Exchange & Homestay Program 4Days 3 Nights (1).jpeg',
    '/img/tourpackages/luang-prabang-cultural-exchange-homestay-program/Luang Prabang Cultural Exchange & Homestay Program 4Days 3 Nights (2).jpeg',
    '/img/tourpackages/luang-prabang-cultural-exchange-homestay-program/Luang Prabang Cultural Exchange & Homestay Program 4Days 3 Nights (3).jpeg',
    '/img/tourpackages/luang-prabang-cultural-exchange-homestay-program/Luang Prabang Cultural Exchange & Homestay Program 4Days 3 Nights (4).jpeg',
    '/img/tourpackages/luang-prabang-cultural-exchange-homestay-program/Luang Prabang Cultural Exchange & Homestay Program 4Days 3 Nights (5).jpeg',
  ],
  'laos-discovery-journey': [
    '/img/tourpackages/vang-vieng-cave-kayaking-experience/laos-vang-vieng-river-water-landscape-peace-1663066-pxhere.com.jpg',
    '/img/tourpackages/discover-the-hidden-villages-of-oudomxay-akha-&-hmong-day-tour/group-trekking.jpeg',
    '/img/tourpackages/luang-prabang-cultural-exchange-homestay-program/Luang Prabang Cultural Exchange & Homestay Program 4Days 3 Nights (1).jpeg',
    '/img/tourpackages/luang-prabang-turquoise-falls-sacred-caves-tour/Turquoise-Falls-&-Sacred-Caves-Tour-1.jpeg',
    '/img/tourpackages/cycling-the-karsts-lagoons/palace-vacation-travel-buddhist-landmark-tourism-1275876-pxhere.com.jpg',
    '/img/tourpackages/vang-vieng-cave-kayaking-experience/landscape-tree-water-nature-mountain-cloud-971263-pxhere.com.jpg',
    '/img/tourpackages/vientiane-culinary-cultural-experience/palace-monument-tower-landmark-tourism-place-of-worship-568215-pxhere.com.jpg',
  ],
  'soul-of-laos': [
    '/img/tourpackages/vientiane-culinary-cultural-experience/palace-monument-tower-landmark-tourism-place-of-worship-568215-pxhere.com.jpg',
    '/img/tourpackages/vientiane-culinary-cultural-experience/restaurant-dish-food-asia-cuisine-soup-990286-pxhere.com.jpg',
    '/img/tourpackages/cycling-the-karsts-lagoons/lagoon.png',
    '/img/tourpackages/vang-vieng-cave-kayaking-experience/landscape-sea-water-mountain-cloud-sunset-1191000-pxhere.com.jpg',
    '/img/tourpackages/luang-prabang-cultural-exchange-homestay-program/Luang Prabang Cultural Exchange & Homestay Program 4Days 3 Nights (2).jpeg',
    '/img/tourpackages/luang-prabang-turquoise-falls-sacred-caves-tour/Turquoise-Falls-&-Sacred-Caves-Tour-2.jpg',
    '/img/tourpackages/cycling-the-karsts-lagoons/building-vacation-travel-tourism-place-of-worship-temple-612026-pxhere.com.jpg',
  ],
}

export async function generateStaticParams() {
  return [
    { slug: 'hidden-legacy-houaphanh' },
    { slug: 'hidden-tribes-of-northern-phongsaly' },
    { slug: 'oudomxay-akha-hmong-day-tour' },
    { slug: 'wild-thrill-trails' },
    { slug: 'bolaven-plateau-homestay' },
    { slug: 'vientiane-culinary-cultural' },
    { slug: 'vang-vieng-cycling-karsts' },
    { slug: 'vang-vieng-cave-kayaking' },
    { slug: 'luang-prabang-waterfalls-caves' },
    { slug: 'luang-prabang-cultural-pottery' },
    { slug: 'authentic-hmong-khmu-trek' },
    { slug: 'luang-prabang-cultural-homestay' },
    { slug: 'laos-discovery-journey' },
    { slug: 'soul-of-laos' },
  ]
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params
  const t = await getTranslations({ locale, namespace: 'packages' })
  const tours = t.raw('tours') as TourMessage[]
  const tour = tours.find((tr) => tr.slug === slug)
  if (!tour) return { title: 'Tour Not Found' }
  return { title: `${tour.name} — Lao Mai Travel` }
}

export default async function TourDetailPage({ params }: Props) {
  const { locale, slug } = await params
  const t = await getTranslations({ locale, namespace: 'packages' })
  const tours = t.raw('tours') as TourMessage[]
  const tour = tours.find((tr) => tr.slug === slug)

  if (!tour) notFound()

  const images = GALLERY[slug] ?? []
  const heroImg = images[0] ?? null

  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <section className={styles.hero}>
        {heroImg && (
          <Image
            src={heroImg}
            alt={tour.name}
            fill
            priority
            className={styles.heroImg}
            sizes="100vw"
          />
        )}
        <div className={styles.heroOverlay} />

        <Link href="/#packages" className={styles.backLink}>
          ← All Tours
        </Link>

        <div className={styles.heroContent}>
          <div className={styles.heroRegion}>
            {tour.region} &mdash; {tour.province}
          </div>
          <h1 className={styles.heroTitle}>{tour.name}</h1>
          <div className={styles.heroDuration}>{tour.duration}</div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      {images.length > 0 && (
        <TourGallery images={images} tourName={tour.name} />
      )}

      {/* ── MAIN CONTENT ── */}
      <div className={styles.content}>

        {/* ── LEFT COLUMN ── */}
        <div className={styles.left}>
          {tour.intro && (
            <p className={styles.tourIntro}>{tour.intro}</p>
          )}

          {tour.highlights && tour.highlights.length > 0 && (
            <ul className={styles.highlights}>
              {tour.highlights.map((h, i) => (
                <li key={i} className={styles.highlightItem}>{h}</li>
              ))}
            </ul>
          )}

          <div className={styles.itineraryLabel}>Itinerary</div>

          <div className={styles.days}>
            {tour.days.map((day, i) => (
              <div key={i} className={styles.day}>
                <div className={styles.dayTitle}>{day.title}</div>
                <p className={styles.dayBody}>{day.body}</p>
              </div>
            ))}
          </div>

          <div className={styles.departure}>
            <span className={styles.departureLabel}>
              {t('departureReturn')}
            </span>
            {tour.departure}
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className={styles.right}>
          <div className={styles.metaBlock}>
            <div className={styles.metaLabel}>{t('priceIncludes')}</div>
            <ul className={styles.metaList}>
              {tour.includes.map((item, i) => (
                <li key={i} className={styles.metaInclude}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={styles.metaBlock}>
            <div className={styles.metaLabel}>{t('priceExcludes')}</div>
            <ul className={styles.metaList}>
              {tour.excludes.map((item, i) => (
                <li key={i} className={styles.metaExclude}>{item}</li>
              ))}
            </ul>
          </div>

          <a
            href={`/${locale}#contact`}
            className={styles.cta}
          >
            {t('enquire')}
          </a>
        </div>

      </div>

      <Footer />
    </>
  )
}
