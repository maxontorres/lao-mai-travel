'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname, Link } from '@/i18n/navigation'
import styles from './Nav.module.css'

export default function Nav() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('nav-open', mobileOpen)
    return () => document.body.classList.remove('nav-open')
  }, [mobileOpen])

  const navLinks = [
    { label: t('destinations'),    href: '#destinations' },
    { label: t('tours'),           href: '#packages' },
    { label: t('services'),        href: '#services' },
    { label: t('about'),           href: '#about' },
    { label: t('contact'),         href: '#contact' },
    { label: t('companyProfile'),  href: '/company-profile' },
    { label: t('blog'),            href: '/blog' },
  ]

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <>
      {mobileOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
      <nav className={`${styles.nav} ${mobileOpen ? styles.navOpen : ''}`} aria-label="Main navigation">
        <Link href="/" className={styles.logo} aria-label="Lao Mai Travel homepage">
          <Image
            src="/img/minimal-logo-no-bg.png"
            alt="Lao Mai Travel logo"
            width={40}
            height={40}
            priority
          />
          <span className={styles.logoText}>{t('logoText')}</span>
          {/* <span className={styles.logoSub}>{t('logoSub')}</span> */}
        </Link>

        {/* Mobile Nav: hamburger toggle button (shown on small screens) */}
        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={mobileOpen ? styles.hamburgerOpen : ''}></span>
          <span className={mobileOpen ? styles.hamburgerOpen : ''}></span>
          <span className={mobileOpen ? styles.hamburgerOpen : ''}></span>
        </button>

        {/* Desktop Nav: primary links (becomes slide-out menu content on mobile) */}
        <ul className={`${styles.links} ${mobileOpen ? styles.linksOpen : ''}`}>
          {navLinks.map((l) => (
            <li key={l.label}>
              {l.href.startsWith('#') ? (
                <a
                  href={`/${locale}${l.href}`}
                  className={styles.link}
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </a>
              ) : (
                <Link href={l.href} className={styles.link} onClick={() => setMobileOpen(false)}>
                  {l.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop Nav: language switcher + CTA (also shown in mobile menu when open) */}
        <div className={`${styles.right} ${mobileOpen ? styles.rightOpen : ''}`}>
          <div className={styles.langSwitcher}>
            {(['en', 'th'] as const).map((lang) => (
              <button
                key={lang}
                className={`${styles.langBtn} ${locale === lang ? styles.langBtnActive : ''}`}
                onClick={() => switchLocale(lang)}
              >
                {lang === 'en' ? 'EN' : 'ไทย'}
              </button>
            ))}
          </div>
          <Link href="/#contact" className={styles.cta} onClick={() => setMobileOpen(false)}>{t('bookNow')}</Link>
        </div>
      </nav>
    </>
  )
}
