'use client'

import { useState } from 'react'
import type { DestinationsSectionData } from '@/lib/sanity/types'
import { urlFor } from '@/lib/sanity/image'
import ImageWithSkeleton from '@/components/ImageWithSkeleton/ImageWithSkeleton'
import DestinationModal from './DestinationModal'
import styles from './Destinations.module.css'

// Fallback images keyed by index (used until images are uploaded to Sanity)
const fallbackImages = [
  'https://images.unsplash.com/photo-1704212685546-3086abc1e6a1?w=900&q=80',
  'https://images.unsplash.com/photo-1737037344843-7f6d4867d648?w=600&q=80',
  'https://images.unsplash.com/photo-1540611025311-01df3cef54b5?w=600&q=80',
  '/img/destinations/bolaven-plateau/bolaven-plateau-trail.jpg',
  '/img/destinations/4000-islands/4000-islands-SI-PHAN-DON.jpg',
]

interface DestinationView {
  name:        string
  tag:         string
  description: string
  img:         string
  featured:    boolean
}

interface Props { data: DestinationsSectionData }

export default function Destinations({ data }: Props) {
  const destinations: DestinationView[] = (data.items ?? []).map((item, i) => ({
    name:        item.name,
    tag:         item.tag,
    description: item.description,
    img: item.image
      ? urlFor(item.image).width(item.featured ? 900 : 600).quality(80).url()
      : fallbackImages[i] ?? '',
    featured: item.featured ?? false,
  }))

  const [selected, setSelected] = useState<DestinationView | null>(null)

  return (
    <section className={styles.section} id="destinations">
      <div className={styles.intro}>
        <div>
          <div className={styles.eyebrow}>{data.eyebrow}</div>
          <h2 className={styles.title}>
            {data.titleLine1}<br /><em>{data.titleLine2}</em>
          </h2>
        </div>
        <p className={styles.desc}>{data.desc}</p>
      </div>

      <div className={styles.grid}>
        {destinations.map((d) => (
          <button
            key={d.name}
            className={`${styles.card} ${d.featured ? styles.cardFeatured : ''}`}
            onClick={() => setSelected(d)}
            aria-label={`Learn more about ${d.name}`}
          >
            <ImageWithSkeleton
              src={d.img}
              alt={d.name}
              fill
              className={styles.cardImg}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className={styles.cardOverlay} />
            <div className={styles.cardContent}>
              <div className={styles.cardName}>{d.name}</div>
              <div className={styles.cardTag}>{d.tag}</div>
            </div>
            <div className={styles.cardArrow}>→</div>
          </button>
        ))}
      </div>

      {selected && (
        <DestinationModal
          destination={selected}
          cta={data.modalCta}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  )
}
