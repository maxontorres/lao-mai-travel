import Image from 'next/image'
import type { ServicesSectionData } from '@/lib/sanity/types'
import { urlFor } from '@/lib/sanity/image'
import styles from './Services.module.css'

const fallbackImages = [
  { src: '/img/services/accommodation.jpg',  alt: 'Accommodation in Laos' },
  { src: '/img/services/ticketing.jpeg',     alt: 'Ticketing services' },
  { src: '/img/services/transportation.jpeg', alt: 'Transportation in Laos' },
]

interface Props { data: ServicesSectionData }

export default function Services({ data }: Props) {
  return (
    <section className={styles.section} id="services">
      <div className={styles.inner}>

        <div className={styles.header}>
          <div className={styles.eyebrow}>{data.eyebrow}</div>
          <h2 className={styles.title}>
            {data.titleLine1} <em>{data.titleLine2}</em>
          </h2>
          <p className={styles.intro}>{data.intro}</p>
        </div>

        <ul className={styles.grid}>
          {data.items?.map((item, i) => {
            const fb = fallbackImages[i]
            const imgSrc = item.image
              ? urlFor(item.image).width(800).quality(80).url()
              : fb?.src ?? ''
            const imgAlt = item.image?.alt ?? fb?.alt ?? item.title

            return (
              <li key={item.title} className={styles.card}>
                <div className={styles.imgWrap}>
                  {imgSrc && (
                    <Image
                      src={imgSrc}
                      alt={imgAlt}
                      fill
                      className={styles.img}
                      sizes="(max-width: 860px) 90vw, 33vw"
                    />
                  )}
                  <div className={styles.imgOverlay} />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.desc}</p>
                  <div className={styles.cardRule} />
                </div>
              </li>
            )
          })}
        </ul>

      </div>
    </section>
  )
}
