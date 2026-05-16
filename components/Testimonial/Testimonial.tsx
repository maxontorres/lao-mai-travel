import Image from 'next/image'
import type { TestimonialData } from '@/lib/sanity/types'
import { urlFor } from '@/lib/sanity/image'
import styles from './Testimonial.module.css'

interface Props { data: TestimonialData }

export default function Testimonial({ data }: Props) {
  const imgSrc = data.authorImage
    ? urlFor(data.authorImage).width(208).height(208).quality(80).url()
    : '/img/testimonials/maximiliano-brito-torres.jpeg'

  return (
    <div className={styles.section}>
      <div className={styles.bgLandscape} />
      <div className={styles.quoteBg}>&ldquo;</div>

      <div className={styles.inner}>
        <div className={styles.divider}><div className={styles.diamond} /></div>
        <div className={styles.stars}>★★★★★</div>
        <p className={styles.text}>&ldquo;{data.quote}&rdquo;</p>
        <div className={styles.authorWrap}>
          <div className={styles.authorImage}>
            <Image
              src={imgSrc}
              alt={data.authorImage?.alt ?? data.author}
              fill
              className={styles.avatar}
              sizes="(max-width: 640px) 88px, 104px"
            />
          </div>
          <div className={styles.author}>{data.author}</div>
        </div>
        <div className={styles.divider}><div className={styles.diamond} /></div>
      </div>
    </div>
  )
}
