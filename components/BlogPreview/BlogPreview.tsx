import { Link } from '@/i18n/navigation'
import BlogCard from '@/components/BlogCard/BlogCard'
import type { PostCard } from '@/lib/sanity/types'
import styles from './BlogPreview.module.css'

interface Props {
  posts:  PostCard[]
  locale: string
}

export default function BlogPreview({ posts, locale }: Props) {
  const isTh = locale === 'th'

  return (
    <section className={styles.section} id="blog">
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{isTh ? 'บทความล่าสุด' : 'FROM OUR BLOG'}</p>
          <h2 className={styles.title}>
            {isTh ? <>บทความ<em>ท่องเที่ยว</em></> : <>Travel <em>Insights</em></>}
          </h2>
          <p className={styles.subtitle}>
            {isTh
              ? 'เคล็ดลับ คู่มือ และแรงบันดาลใจจากผู้เชี่ยวชาญท้องถิ่นของเรา'
              : 'Tips, destination guides, and stories from our local experts in Laos.'}
          </p>
        </header>

        <div className={styles.grid}>
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>

        <div className={styles.cta}>
          <Link href="/blog" className={styles.ctaBtn}>
            {isTh ? 'ดูบทความทั้งหมด →' : 'VIEW ALL POSTS →'}
          </Link>
        </div>
      </div>
    </section>
  )
}
