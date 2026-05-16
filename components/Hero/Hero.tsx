import type { HeroData } from '@/lib/sanity/types'
import { urlFor } from '@/lib/sanity/image'
import styles from './Hero.module.css'

interface Props { data: HeroData }

export default function Hero({ data }: Props) {
  const bgUrl = data.backgroundImage
    ? urlFor(data.backgroundImage).width(1920).quality(85).url()
    : '/img/hero/laos-temple.jpg?w=1920&q=85'

  return (
    <section className={styles.hero} aria-label="Hero section">
      <div
        className={styles.heroBg}
        role="presentation"
        style={{ backgroundImage: `linear-gradient(to right, rgba(10,15,46,0.92) 0%, rgba(10,15,46,0.75) 30%, rgba(10,15,46,0.25) 60%, transparent 100%), url('${bgUrl}')` }}
      />

      <div className={styles.content}>
        <p className={styles.eyebrow}>{data.eyebrow}</p>

        <h1 className={styles.title}>
          {data.titleLine1}<br />
          <em>{data.titleLine2}</em>
        </h1>

        <p className={styles.subtitle}>{data.subtitle}</p>

        <p className={styles.body}>{data.body}</p>

        <nav className={styles.actions} aria-label="Primary actions">
          <a href="#packages" className={styles.btnPrimary}>{data.exploreCta}</a>
          <a href="#contact" className={styles.btnGhost}>{data.planCta}</a>
        </nav>
      </div>

      <div className={styles.scrollIndicator} aria-hidden="true">
        <div className={styles.scrollLine} />
        <span className={styles.scrollLabel}>{data.scroll}</span>
      </div>
    </section>
  )
}
