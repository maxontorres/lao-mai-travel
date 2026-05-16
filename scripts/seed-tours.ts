/**
 * One-time seed script: imports all 14 tours from messages/en.json + messages/th.json into Sanity.
 *
 * Prerequisites:
 *   1. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in .env.local
 *   2. Create a Sanity "Editor" or "Administrator" token and set SANITY_WRITE_TOKEN=<token>
 *   3. Run: npx tsx scripts/seed-tours.ts
 *
 * This script is safe to run multiple times — it uses createOrReplace() keyed on slug.
 */

import { config } from 'dotenv'
config({ path: '.env.local' })
import { createClient } from '@sanity/client'
import enMessages from '../messages/en.json'
import thMessages from '../messages/th.json'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET    ?? 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_MIGRATION_TOKEN,
})

type TourMessage = {
  slug: string
  region: string
  province: string
  name: string
  highlight: string
  duration: string
  departure: string
  intro?: string
  highlights?: string[]
  days: Array<{ title: string; body: string }>
  includes: string[]
  excludes: string[]
}

async function main() {
  const enTours = (enMessages as Record<string, unknown>).packages as { tours: TourMessage[] }
  const thTours = (thMessages as Record<string, unknown>).packages as { tours: TourMessage[] }

  const enList = enTours.tours
  const thList = thTours.tours

  console.log(`Seeding ${enList.length} tours...`)

  for (let i = 0; i < enList.length; i++) {
    const en = enList[i]
    const th = thList[i]

    if (!en?.slug) {
      console.warn(`Skipping index ${i} — no slug`)
      continue
    }

    const doc = {
      _type: 'tourPackage',
      _id:   `tourPackage-${en.slug}`,

      slug:      { _type: 'slug', current: en.slug },
      region:    en.region,
      province:  en.province,
      duration:  en.duration,
      departure: en.departure,
      sortOrder: i + 1,

      // English
      name_en:       en.name,
      highlight_en:  en.highlight,
      intro_en:      en.intro ?? null,
      highlights_en: en.highlights ?? [],
      days: en.days?.map((d, di) => ({
        _type: 'day',
        _key:  `day-${di}`,
        title_en: d.title,
        body_en:  d.body,
        title_th: th?.days?.[di]?.title ?? d.title,
        body_th:  th?.days?.[di]?.body  ?? d.body,
      })) ?? [],
      includes_en: en.includes ?? [],
      excludes_en: en.excludes ?? [],

      // Thai
      name_th:       th?.name       ?? en.name,
      highlight_th:  th?.highlight  ?? en.highlight,
      intro_th:      th?.intro      ?? null,
      highlights_th: th?.highlights ?? [],
      includes_th:   th?.includes   ?? en.includes ?? [],
      excludes_th:   th?.excludes   ?? en.excludes ?? [],
    }

    try {
      await client.createOrReplace(doc)
      console.log(`  ✓ ${en.slug}`)
    } catch (err) {
      console.error(`  ✗ ${en.slug}:`, err)
    }
  }

  console.log('Done!')
}

main()
