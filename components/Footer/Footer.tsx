import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import type { SiteSettings } from '@/lib/sanity/types'
import { CONTACT } from '@/lib/contact'
import styles from './Footer.module.css'

interface Props { siteSettings?: SiteSettings | null }

export default function Footer({ siteSettings }: Props) {
  const t = useTranslations('footer')
  const destinations = t.raw('destinations') as string[]
  const tours        = t.raw('tours')        as string[]

  const phone    = siteSettings?.phone    ?? CONTACT.phone
  const phoneTel = siteSettings?.phoneTel ?? CONTACT.phoneTel
  const email    = siteSettings?.email    ?? CONTACT.email

  const socials = [
    { label: 'Facebook',  url: siteSettings?.facebookUrl  ?? null, key: 'fb' },
    { label: 'Instagram', url: siteSettings?.instagramUrl ?? null, key: 'ig' },
    { label: 'WhatsApp',  url: siteSettings?.whatsappUrl  ?? null, key: 'wa' },
    { label: 'TikTok',    url: siteSettings?.tiktokUrl    ?? null, key: 'tk' },
  ]

  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>

        {/* Brand */}
        <div>
          <div className={styles.brandName}>{t('brandName')}</div>
          <span className={styles.brandSub}>{t('brandSub')}</span>
          <p className={styles.desc}>{t('desc')}</p>
          <div className={styles.socials}>
            {socials.map(({ label, url, key }) =>
              url ? (
                <a key={key} href={url} target="_blank" rel="noopener noreferrer" className={styles.social} aria-label={label}>
                  {key}
                </a>
              ) : null
            )}
          </div>
        </div>

        {/* Destinations */}
        <div>
          <div className={styles.colTitle}>{t('destinationsTitle')}</div>
          <ul className={styles.links}>
            {destinations.map((d) => (
              <li key={d}><a href="#destinations" className={styles.link}>{d}</a></li>
            ))}
          </ul>
        </div>

        {/* Tours */}
        <div>
          <div className={styles.colTitle}>{t('toursTitle')}</div>
          <ul className={styles.links}>
            {tours.map((tour) => (
              <li key={tour}><a href="#packages" className={styles.link}>{tour}</a></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className={styles.colTitle}>{t('contactTitle')}</div>
          <div className={styles.contactItem}><span>📍</span><span>{t('address')}</span></div>
          <div className={styles.contactItem}><span>📞</span><a href={`tel:${phoneTel}`}>{phone}</a></div>
          <div className={styles.contactItem}><span>✉</span><a href={`mailto:${email}`}>{email}</a></div>
          <div className={styles.contactItem}><span>🕐</span><span>{t('hours')}</span></div>
        </div>

      </div>

      <div className={styles.bottom}>
        <p>{t('copyright', { year: new Date().getFullYear() })}</p>
        <div className={styles.bottomLinks}>
          <Link href="/blog">{t('blog')}</Link>
          <Link href="/company-profile">{t('companyProfile')}</Link>
          <Link href="/privacy">{t('privacy')}</Link>
          <Link href="/terms">{t('terms')}</Link>
        </div>
      </div>
    </footer>
  )
}
