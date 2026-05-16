export interface SanityImageRef {
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
  alt?: string
}

// ── Hero ──────────────────────────────────────────────
export interface HeroData {
  eyebrow:         string
  titleLine1:      string
  titleLine2:      string
  subtitle:        string
  body:            string
  exploreCta:      string
  planCta:         string
  scroll:          string
  backgroundImage: SanityImageRef | null
}

// ── Tour Packages Section Header ──────────────────────
export interface TourPackagesSectionHeader {
  eyebrow:     string
  titlePrefix: string
  titleEm:     string
  intro:       string
}

// ── Destinations ──────────────────────────────────────
export interface DestinationItem {
  name:        string
  tag:         string
  description: string
  image:       SanityImageRef | null
  featured:    boolean
}

export interface DestinationsSectionData {
  eyebrow:    string
  titleLine1: string
  titleLine2: string
  desc:       string
  modalCta:   string
  items:      DestinationItem[]
}

// ── Tour Packages ─────────────────────────────────────
export interface TourCard {
  slug:        string
  region:      string
  province:    string
  name:        string
  highlight:   string
  duration:    string
  coverImage:  SanityImageRef | null
}

export interface TourDay {
  title: string
  body:  string
}

export interface TourDetail extends TourCard {
  departure:   string
  intro:       string | null
  highlights:  string[] | null
  days:        TourDay[]
  includes:    string[]
  excludes:    string[]
  gallery:     (SanityImageRef & { alt?: string })[]
}

// ── About ─────────────────────────────────────────────
export interface AboutFeature {
  icon:  string
  title: string
  desc:  string
}

export interface AboutData {
  eyebrow:    string
  titleLine1: string
  titleLine2: string
  body:       string
  badgeNum:   string
  badgeLabel: string
  image:      SanityImageRef | null
  features:   AboutFeature[]
}

// ── Panorama ──────────────────────────────────────────
export interface PanoramaData {
  eyebrow:       string
  headlineLine1: string
  headlineEm:    string
  headlineLine2: string
}

// ── Services ──────────────────────────────────────────
export interface ServiceItem {
  title: string
  desc:  string
  image: SanityImageRef | null
}

export interface ServicesSectionData {
  eyebrow:    string
  titleLine1: string
  titleLine2: string
  intro:      string
  items:      ServiceItem[]
}

// ── Testimonial ───────────────────────────────────────
export interface TestimonialData {
  quote:       string
  author:      string
  authorImage: SanityImageRef | null
}

// ── Site Settings ─────────────────────────────────────
export interface SiteSettings {
  phone:        string
  phoneTel:     string
  email:        string
  address:      string
  hours:        string
  mapLat:       number | null
  mapLng:       number | null
  facebookUrl:  string | null
  instagramUrl: string | null
  whatsappUrl:  string | null
  tiktokUrl:    string | null
}

// ── Blog ──────────────────────────────────────────────
export interface PostCard {
  slug:        string
  publishedAt: string
  title:       string
  excerpt:     string | null
  coverImage:  SanityImageRef | null
}

export interface PostDetail extends PostCard {
  body:           unknown[] | null
  seoTitle:       string | null
  seoDescription: string | null
}
