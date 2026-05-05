import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import styles from './TourPackages.module.css'

type TourMessage = {
  slug: string
  region: string
  province: string
  name: string
  highlight: string
  duration: string
}

// The Tour Package Cards
const tourAssets: Record<string, string> = {
  'hidden-legacy-houaphanh':
    '/img/tourpackages/hidden-legacy-houaphanh/caves-entrance.jpg',
  'hidden-tribes-of-northern-phongsaly':
    '/img/tourpackages/hidden-tribes-of-northern-phongsaly/2-young-women.jpeg',
  'oudomxay-akha-hmong-day-tour':
    '/img/tourpackages/discover-the-hidden-villages-of-oudomxay-akha-&-hmong-day-tour/group-trekking.jpeg',
  'wild-thrill-trails':
    '/img/tourpackages/wild-thrill-trails-camping-&-homestay/tourists-with-villager-women.jpeg',
  'bolaven-plateau-homestay':
    '/img/tourpackages/bolaven-plateau-homestay/couple-waterfall-behind.jpeg',
  'vientiane-culinary-cultural':
    '/img/tourpackages/vientiane-culinary-cultural-experience/restaurant-dish-food-asia-cuisine-soup-990286-pxhere.com.jpg',
  'vang-vieng-cycling-karsts':
    '/img/tourpackages/cycling-the-karsts-lagoons/lagoon.png',
  'vang-vieng-cave-kayaking':
    '/img/tourpackages/vang-vieng-cave-kayaking-experience/laos-vang-vieng-river-water-landscape-peace-1663066-pxhere.com.jpg',
  'luang-prabang-waterfalls-caves':
    '/img/tourpackages/luang-prabang-turquoise-falls-sacred-caves-tour/Turquoise-Falls-&-Sacred-Caves-Tour-1.jpeg',
  'luang-prabang-cultural-pottery':
    '/img/tourpackages/luang-prabang-cultural-pottery-experience/Lao-Pottery-House-1.jpeg',

  // Authentic Hmong & Khmu Trek from Luang Prabang
  'authentic-hmong-khmu-trek':
    '/img/tourpackages/authentic-hmong-&-khmu-trek-from-luang-prabang/group-photo-trekking.jpeg',
  'luang-prabang-cultural-homestay':
    '/img/tourpackages/luang-prabang-cultural-exchange-homestay-program/Luang Prabang Cultural Exchange & Homestay Program 4Days 3 Nights (1).jpeg',
  'laos-discovery-journey':
    '/img/hero/laos-temple.jpg',
  'soul-of-laos':
    '/img/tourpackages/soul-of-laos/vientiane-capital.jpg',
}

export default function TourPackages() {
  const t = useTranslations('packages')
  const tours = t.raw('tours') as TourMessage[]

  return (
    <section className={styles.section} id="packages">
      <div className={styles.header}>
        <div>
          <div className={styles.eyebrow}>{t('eyebrow')}</div>
          <h2 className={styles.title}>
            {t('titlePrefix')} <em>{t('titleEm')}</em>
          </h2>
        </div>
        <p className={styles.intro}>{t('intro')}</p>
      </div>

      <div className={styles.grid}>
        {tours.map((tour) => {
          const coverImg = tourAssets[tour.slug] ?? ''
          return (
            <Link
              key={tour.slug}
              href={'/tours/' + tour.slug}
              className={styles.card}
            >
              <div className={styles.imgWrap}>
                {coverImg && (
                  <Image
                    src={coverImg}
                    alt={tour.name}
                    fill
                    className={styles.cardImg}
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                  />
                )}
                <div className={styles.imgOverlay} />
              </div>

              <div className={styles.cardBody}>
                <span className={styles.region}>
                  {tour.region} &mdash; {tour.province}
                </span>
                <span className={styles.name}>{tour.name}</span>
                <span className={styles.highlight}>{tour.highlight}</span>
                <div className={styles.cardFooter}>
                  <span className={styles.duration}>{tour.duration}</span>
                  <span className={styles.exploreLabel}>Explore Tour →</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
