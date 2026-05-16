import Image from 'next/image'
import type { AboutData } from '@/lib/sanity/types'
import { urlFor } from '@/lib/sanity/image'
import styles from './About.module.css'

interface Props { data: AboutData }

export default function About({ data }: Props) {
  const imgSrc = data.image
    ? urlFor(data.image).width(700).quality(80).url()
    : 'https://images.unsplash.com/photo-1723622688505-3efc54d4dbae?w=700&q=80'

  return (
    <section className={styles.section} id="about">
      <div className={styles.bgLandscape} />

      <div className={styles.inner}>
        {/* Images */}
        <div className={styles.imgWrap}>
          <div className={styles.imgMain}>
            <Image
              src={imgSrc}
              alt={data.image?.alt ?? 'Laos temple'}
              fill
              className={styles.img}
              sizes="40vw"
            />
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeNum}>{data.badgeNum}</span>
            <span className={styles.badgeLabel}>
              {data.badgeLabel?.split('\n').map((line, i) => (
                <span key={i}>{i > 0 && <br />}{line}</span>
              ))}
            </span>
          </div>
        </div>

        {/* Text */}
        <div className={styles.text}>
          <div className={styles.eyebrow}>{data.eyebrow}</div>
          <div className={styles.titleWrap}>
            <h2 className={styles.title}>
              {data.titleLine1}<br /><em>{data.titleLine2}</em>
            </h2>
          </div>
          <p className={styles.body}>{data.body}</p>
          <ul className={styles.features}>
            {data.features?.map((f) => (
              <li key={f.title} className={styles.feature}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <div>
                  <div className={styles.featureTitle}>{f.title}</div>
                  <p className={styles.featureDesc}>{f.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
