import type { HeroData } from '@/lib/sanity/types'
import styles from './Hero.module.css'

interface Props { data: HeroData }

export default function Hero({ data }: Props) {
  return (
    <section className={styles.hero} aria-label="Hero section">
      <div className={styles.heroBg} role="presentation" />

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
