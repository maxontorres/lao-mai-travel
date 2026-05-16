import type { Metadata } from 'next'
import Nav      from '@/components/Nav/Nav'
import Footer   from '@/components/Footer/Footer'
import BlogCard from '@/components/BlogCard/BlogCard'
import { sanityFetch } from '@/lib/sanity/client'
import { blogListQuery, siteSettingsQuery } from '@/lib/sanity/queries'
import type { PostCard, SiteSettings } from '@/lib/sanity/types'
import styles from './blog.module.css'

export const revalidate = 60

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'th' ? 'บล็อก — Lao Mai Travel' : 'Blog — Lao Mai Travel',
    description: locale === 'th'
      ? 'เคล็ดลับการท่องเที่ยวลาว คู่มือจุดหมายปลายทาง และเรื่องราวจากผู้เชี่ยวชาญท้องถิ่น'
      : 'Laos travel tips, destination guides, and stories from local experts at Lao Mai Travel.',
    alternates: {
      canonical: `https://laomaitravel.com/${locale}/blog`,
      languages: {
        en: 'https://laomaitravel.com/en/blog',
        th: 'https://laomaitravel.com/th/blog',
      },
    },
  }
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params
  const p = { locale }

  const [posts, settings] = await Promise.all([
    sanityFetch<PostCard[]>({ query: blogListQuery, params: p, tags: ['post'] }),
    sanityFetch<SiteSettings | null>({ query: siteSettingsQuery, params: p, tags: ['siteSettings'] }),
  ])

  return (
    <>
      <Nav />
      <main>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>{locale === 'th' ? 'บทความ' : 'INSIGHTS & GUIDES'}</p>
          <h1 className={styles.title}>
            {locale === 'th' ? 'บล็อกท่องเที่ยวลาว' : <>Laos <em>Travel Blog</em></>}
          </h1>
          <p className={styles.subtitle}>
            {locale === 'th'
              ? 'เคล็ดลับ คู่มือ และแรงบันดาลใจจากผู้เชี่ยวชาญท้องถิ่นของเรา'
              : 'Tips, guides, and inspiration from our local experts.'}
          </p>
        </header>

        <section className={styles.section}>
          {!posts?.length ? (
            <p className={styles.empty}>
              {locale === 'th' ? 'ยังไม่มีบทความ กลับมาเร็วๆ นี้!' : 'No posts yet — check back soon!'}
            </p>
          ) : (
            <div className={styles.grid}>
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} locale={locale} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer siteSettings={settings} />
    </>
  )
}
