import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

// Maps Sanity document types to their Next.js cache tags
const TAG_MAP: Record<string, string[]> = {
  tourPackage:         ['tourPackage'],
  post:                ['post'],
  siteSettings:        ['siteSettings'],
  heroSection:         ['heroSection'],
  tourPackagesSection: ['tourPackagesSection'],
  destinationsSection: ['destinationsSection'],
  aboutSection:        ['aboutSection'],
  panoramaSection:     ['panoramaSection'],
  servicesSection:     ['servicesSection'],
  testimonialSection:  ['testimonialSection'],
}

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATION_SECRET

  // Validate shared secret (simple header check — upgrade to HMAC if needed)
  if (secret) {
    const authHeader = req.headers.get('authorization')
    if (authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  let body: { _type?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { _type } = body
  if (!_type) {
    return NextResponse.json({ error: 'Missing _type in body' }, { status: 400 })
  }

  const tags = TAG_MAP[_type] ?? []
  tags.forEach((tag) => revalidateTag(tag, {}))

  return NextResponse.json({ revalidated: true, type: _type, tags })
}
