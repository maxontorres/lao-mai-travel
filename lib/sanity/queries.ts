// All GROQ queries. Each uses $locale ("en" or "th") to select the correct language field.
// Pattern: select($locale == "th" => field_th, field_en)

const imageFields = `{ asset, hotspot, crop, alt }`

export const heroQuery = `
  *[_type == "heroSection"][0] {
    "eyebrow":    select($locale == "th" => eyebrow_th,    eyebrow_en),
    "titleLine1": select($locale == "th" => titleLine1_th, titleLine1_en),
    "titleLine2": select($locale == "th" => titleLine2_th, titleLine2_en),
    "subtitle":   select($locale == "th" => subtitle_th,   subtitle_en),
    "body":       select($locale == "th" => body_th,       body_en),
    "exploreCta": select($locale == "th" => exploreCta_th, exploreCta_en),
    "planCta":    select($locale == "th" => planCta_th,    planCta_en),
    "scroll":     select($locale == "th" => scroll_th,     scroll_en),
  }
`

export const tourPackagesSectionQuery = `
  *[_type == "tourPackagesSection"][0] {
    "eyebrow":     select($locale == "th" => eyebrow_th,     eyebrow_en),
    "titlePrefix": select($locale == "th" => titlePrefix_th, titlePrefix_en),
    "titleEm":     select($locale == "th" => titleEm_th,     titleEm_en),
    "intro":       select($locale == "th" => intro_th,       intro_en),
  }
`

export const destinationsQuery = `
  *[_type == "destinationsSection"][0] {
    "eyebrow":    select($locale == "th" => eyebrow_th,    eyebrow_en),
    "titleLine1": select($locale == "th" => titleLine1_th, titleLine1_en),
    "titleLine2": select($locale == "th" => titleLine2_th, titleLine2_en),
    "desc":       select($locale == "th" => desc_th,       desc_en),
    "modalCta":   select($locale == "th" => modalCta_th,   modalCta_en),
    "items": items[] {
      "name":        select($locale == "th" => name_th,        name_en),
      "tag":         select($locale == "th" => tag_th,         tag_en),
      "description": select($locale == "th" => description_th, description_en),
      "image": image ${imageFields},
      featured,
    }
  }
`

export const tourPackagesListQuery = `
  *[_type == "tourPackage"] | order(sortOrder asc) {
    "slug":       slug.current,
    region,
    province,
    "name":       select($locale == "th" => name_th,      name_en),
    "highlight":  select($locale == "th" => highlight_th, highlight_en),
    duration,
    "coverImage": coverImage { asset, hotspot, crop },
  }
`

export const tourPackageDetailQuery = `
  *[_type == "tourPackage" && slug.current == $slug][0] {
    "slug":       slug.current,
    region,
    province,
    "name":       select($locale == "th" => name_th,       name_en),
    "highlight":  select($locale == "th" => highlight_th,  highlight_en),
    duration,
    departure,
    "intro":      select($locale == "th" => intro_th,      intro_en),
    "highlights": select($locale == "th" => highlights_th, highlights_en),
    "days": days[] {
      "title": select($locale == "th" => title_th, title_en),
      "body":  select($locale == "th" => body_th,  body_en),
    },
    "includes":   select($locale == "th" => includes_th,   includes_en),
    "excludes":   select($locale == "th" => excludes_th,   excludes_en),
    "coverImage": coverImage { asset, hotspot, crop },
    "gallery":    gallery[] { asset, hotspot, crop, alt },
  }
`

export const aboutQuery = `
  *[_type == "aboutSection"][0] {
    "eyebrow":    select($locale == "th" => eyebrow_th,    eyebrow_en),
    "titleLine1": select($locale == "th" => titleLine1_th, titleLine1_en),
    "titleLine2": select($locale == "th" => titleLine2_th, titleLine2_en),
    "body":       select($locale == "th" => body_th,       body_en),
    badgeNum,
    "badgeLabel": select($locale == "th" => badgeLabel_th, badgeLabel_en),
    "image": image ${imageFields},
    "features": features[] {
      icon,
      "title": select($locale == "th" => title_th, title_en),
      "desc":  select($locale == "th" => desc_th,  desc_en),
    }
  }
`

export const panoramaQuery = `
  *[_type == "panoramaSection"][0] {
    "eyebrow":       select($locale == "th" => eyebrow_th,       eyebrow_en),
    "headlineLine1": select($locale == "th" => headlineLine1_th, headlineLine1_en),
    "headlineEm":    select($locale == "th" => headlineEm_th,    headlineEm_en),
    "headlineLine2": select($locale == "th" => headlineLine2_th, headlineLine2_en),
  }
`

export const servicesQuery = `
  *[_type == "servicesSection"][0] {
    "eyebrow":    select($locale == "th" => eyebrow_th,    eyebrow_en),
    "titleLine1": select($locale == "th" => titleLine1_th, titleLine1_en),
    "titleLine2": select($locale == "th" => titleLine2_th, titleLine2_en),
    "intro":      select($locale == "th" => intro_th,      intro_en),
    "items": items[] {
      "title": select($locale == "th" => title_th, title_en),
      "desc":  select($locale == "th" => desc_th,  desc_en),
      "image": image ${imageFields},
    }
  }
`

export const testimonialQuery = `
  *[_type == "testimonialSection"][0] {
    "quote":       select($locale == "th" => quote_th, quote_en),
    author,
    "authorImage": authorImage ${imageFields},
  }
`

export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    phone,
    phoneTel,
    email,
    "address": select($locale == "th" => address_th, address_en),
    "hours":   select($locale == "th" => hours_th,   hours_en),
    mapLat,
    mapLng,
    facebookUrl,
    instagramUrl,
    whatsappUrl,
    tiktokUrl,
  }
`

export const blogListQuery = `
  *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
    "slug":       slug.current,
    publishedAt,
    "title":      select($locale == "th" => title_th,   title_en),
    "excerpt":    select($locale == "th" => excerpt_th, excerpt_en),
    "coverImage": coverImage ${imageFields},
  }
`

export const blogPostDetailQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    "slug":           slug.current,
    publishedAt,
    "title":          select($locale == "th" => title_th,          title_en),
    "excerpt":        select($locale == "th" => excerpt_th,        excerpt_en),
    "body":           select($locale == "th" => body_th,           body_en),
    "seoTitle":       select($locale == "th" => seoTitle_th,       seoTitle_en),
    "seoDescription": select($locale == "th" => seoDescription_th, seoDescription_en),
    "coverImage":     coverImage ${imageFields},
  }
`

export const blogPreviewQuery = `
  *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) [0...3] {
    "slug":       slug.current,
    publishedAt,
    "title":      select($locale == "th" => title_th,   title_en),
    "excerpt":    select($locale == "th" => excerpt_th, excerpt_en),
    "coverImage": coverImage ${imageFields},
  }
`

// For generateStaticParams
export const tourSlugsQuery = `*[_type == "tourPackage"] { "slug": slug.current }`
export const blogSlugsQuery = `*[_type == "post" && defined(publishedAt)] { "slug": slug.current, publishedAt }`
