import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET    ?? 'production',
  apiVersion: '2025-01-01',
  useCdn: true,
  token: process.env.SANITY_API_READ_TOKEN,
})

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query:   string
  params?: Record<string, unknown>
  tags?:   string[]
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      revalidate: 60,
      tags,
    },
  })
}
