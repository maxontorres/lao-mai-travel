import type { Metadata } from 'next'
import Image    from 'next/image'
import { notFound } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import Nav      from '@/components/Nav/Nav'
import Footer   from '@/components/Footer/Footer'
import PortableTextRenderer from '@/components/PortableTextRenderer/PortableTextRenderer'
import { sanityFetch } from '@/lib/sanity/client'
import { client } from '@/lib/sanity/client'
import { blogPostDetailQuery, blogSlugsQuery, siteSettingsQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import type { PostDetail, SiteSettings } from '@/lib/sanity/types'
import { routing } from '@/i18n/routing'
import styles from './post.module.css'

type Props = { params: Promise<{ locale: string; slug: string }> }

export const revalidate = 60

export async function generateStaticParams() {
  try {
    const posts = await client.fetch<{ slug: string }[]>(blogSlugsQuery)
    if (posts?.length) {
      return routing.locales.flatMap((locale) =>
        posts.map(({ slug }) => ({ locale, slug }))
      )
    }
  } catch {
    // No blog posts yet
  }
  return []
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await sanityFetch<PostDetail | null>({
    query: blogPostDetailQuery,
    params: { locale, slug },
    tags: ['post'],
  })
  if (!post) return { title: 'Post Not Found' }

  const ogImage = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).quality(85).url()
    : undefined

  return {
    title:       post.seoTitle       ?? `${post.title} — Lao Mai Travel`,
    description: post.seoDescription ?? post.excerpt ?? '',
    openGraph: {
      title:       post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.excerpt ?? '',
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
    },
    alternates: {
      canonical: `https://laomaitravel.com/${locale}/blog/${slug}`,
      languages: {
        en: `https://laomaitravel.com/en/blog/${slug}`,
        th: `https://laomaitravel.com/th/blog/${slug}`,
      },
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params

  const [post, settings] = await Promise.all([
    sanityFetch<PostDetail | null>({
      query: blogPostDetailQuery,
      params: { locale, slug },
      tags: ['post'],
    }),
    sanityFetch<SiteSettings | null>({
      query: siteSettingsQuery,
      params: { locale },
      tags: ['siteSettings'],
    }),
  ])

  if (!post) notFound()

  const heroImg = post.coverImage
    ? urlFor(post.coverImage).width(1440).height(640).quality(85).url()
    : null

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(locale === 'th' ? 'th-TH' : 'en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : null

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt ?? '',
    ...(heroImg ? { image: heroImg } : {}),
    datePublished: post.publishedAt,
    author: { '@type': 'Organization', name: 'Lao Mai Travel' },
    publisher: {
      '@type': 'Organization',
      name: 'Lao Mai Travel',
      logo: { '@type': 'ImageObject', url: 'https://laomaitravel.com/img/minimal-logo-no-bg.png' },
    },
    mainEntityOfPage: `https://laomaitravel.com/${locale}/blog/${slug}`,
  }

  return (
    <>
      <Nav />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Cover image */}
      {heroImg && (
        <div className={styles.cover}>
          <Image
            src={heroImg}
            alt={post.coverImage?.alt ?? post.title}
            fill
            priority
            className={styles.coverImg}
            sizes="100vw"
          />
          <div className={styles.coverOverlay} />
        </div>
      )}

      <article className={styles.article}>
        <header className={styles.header}>
          <Link href="/blog" className={styles.back}>← Blog</Link>
          {date && <time className={styles.date} dateTime={post.publishedAt}>{date}</time>}
          <h1 className={styles.title}>{post.title}</h1>
          {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
          <div className={styles.divider} />
        </header>

        {post.body?.length ? (
          <PortableTextRenderer value={post.body} />
        ) : (
          <p className={styles.empty}>Content coming soon.</p>
        )}
      </article>

      <Footer siteSettings={settings} />
    </>
  )
}
