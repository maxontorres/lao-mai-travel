import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { PostCard } from '@/lib/sanity/types'
import { urlFor } from '@/lib/sanity/image'
import styles from './BlogCard.module.css'

interface Props {
  post:   PostCard
  locale: string
}

export default function BlogCard({ post, locale }: Props) {
  const imgSrc = post.coverImage
    ? urlFor(post.coverImage).width(800).height(450).quality(80).url()
    : null

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(locale === 'th' ? 'th-TH' : 'en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : null

  return (
    <article className={styles.card}>
      <Link href={`/blog/${post.slug}`} className={styles.imgLink} tabIndex={-1} aria-hidden>
        <div className={styles.imgWrap}>
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt={post.coverImage?.alt ?? post.title}
              fill
              className={styles.img}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className={styles.imgPlaceholder} />
          )}
        </div>
      </Link>
      <div className={styles.body}>
        {date && <time className={styles.date} dateTime={post.publishedAt}>{date}</time>}
        <h2 className={styles.title}>
          <Link href={`/blog/${post.slug}`} className={styles.titleLink}>{post.title}</Link>
        </h2>
        {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
        <Link href={`/blog/${post.slug}`} className={styles.readMore}>Read more →</Link>
      </div>
    </article>
  )
}
