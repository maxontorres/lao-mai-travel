import { useTranslations } from 'next-intl'
import type { SiteSettings } from '@/lib/sanity/types'
import { CONTACT } from '@/lib/contact'
import styles from './Map.module.css'

interface Props { siteSettings: SiteSettings | null }

export default function Map({ siteSettings }: Props) {
  const t = useTranslations('map')

  const phone    = siteSettings?.phone    ?? CONTACT.phone
  const phoneTel = siteSettings?.phoneTel ?? CONTACT.phoneTel
  const email    = siteSettings?.email    ?? CONTACT.email
  const address  = siteSettings?.address  ?? t('address')
  const hours    = siteSettings?.hours    ?? t('hours')
  const lat      = siteSettings?.mapLat   ?? 18.029567
  const lng      = siteSettings?.mapLng   ?? 102.513433

  const embedSrc = `https://maps.google.com/maps?q=${lat},${lng}&z=17&output=embed`

  return (
    <section className={styles.section}>

      <div className={styles.info}>
        <div className={styles.eyebrow}>{t('eyebrow')}</div>
        <h2 className={styles.title}>{t('titlePrefix')} <em>{t('titleEm')}</em></h2>
        <div className={styles.details}>
          <div className={styles.item}>
            <span>📍</span>
            <span>{address}</span>
          </div>
          <div className={styles.item}>
            <span>📞</span>
            <a href={`tel:${phoneTel}`}>{phone}</a>
          </div>
          <div className={styles.item}>
            <span>✉</span>
            <a href={`mailto:${email}`}>{email}</a>
          </div>
          <div className={styles.item}>
            <span>🕐</span>
            <span>{hours}</span>
          </div>
        </div>
        <a
          href="https://maps.app.goo.gl/632LB8BxXL5WaVKb9"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.directions}
        >
          {t('directions')}
        </a>
      </div>

      <div className={styles.mapWrap}>
        <iframe
          src={embedSrc}
          title="Lao Mai Travel office location"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className={styles.iframe}
        />
      </div>

    </section>
  )
}
