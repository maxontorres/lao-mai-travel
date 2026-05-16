'use client'

import Image from 'next/image'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { urlFor } from '@/lib/sanity/image'
import styles from './PortableTextRenderer.module.css'

const components: PortableTextComponents = {
  block: {
    normal:     ({ children }) => <p className={styles.p}>{children}</p>,
    h2:         ({ children }) => <h2 className={styles.h2}>{children}</h2>,
    h3:         ({ children }) => <h3 className={styles.h3}>{children}</h3>,
    h4:         ({ children }) => <h4 className={styles.h4}>{children}</h4>,
    blockquote: ({ children }) => <blockquote className={styles.blockquote}>{children}</blockquote>,
  },
  list: {
    bullet:   ({ children }) => <ul className={styles.ul}>{children}</ul>,
    number:   ({ children }) => <ol className={styles.ol}>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className={styles.li}>{children}</li>,
    number: ({ children }) => <li className={styles.li}>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em:     ({ children }) => <em>{children}</em>,
    code:   ({ children }) => <code className={styles.inlineCode}>{children}</code>,
    link: ({ value, children }) => {
      const isExternal = value?.href?.startsWith('http')
      return (
        <a
          href={value?.href}
          className={styles.link}
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      const src = urlFor(value).width(1200).quality(85).url()
      return (
        <figure className={styles.figure}>
          <div className={styles.figureImg}>
            <Image
              src={src}
              alt={value.alt ?? ''}
              fill
              className={styles.img}
              sizes="(max-width: 860px) 100vw, 860px"
            />
          </div>
          {value.caption && (
            <figcaption className={styles.caption}>{value.caption}</figcaption>
          )}
        </figure>
      )
    },
  },
}

interface Props { value: unknown[] }

export default function PortableTextRenderer({ value }: Props) {
  return (
    <div className={styles.root}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <PortableText value={value as any} components={components} />
    </div>
  )
}
