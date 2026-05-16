import type { StructureResolver } from 'sanity/structure'

const SINGLETONS = [
  'siteSettings',
  'heroSection',
  'tourPackagesSection',
  'destinationsSection',
  'aboutSection',
  'panoramaSection',
  'servicesSection',
  'testimonialSection',
]

const SINGLETON_LABELS: Record<string, string> = {
  siteSettings: 'Site Settings',
  heroSection: 'Hero Section',
  tourPackagesSection: 'Tour Packages Section',
  destinationsSection: 'Destinations Section',
  aboutSection: 'About Section',
  panoramaSection: 'Panorama Section',
  servicesSection: 'Services Section',
  testimonialSection: 'Testimonial Section',
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem().title('Tour Packages').child(S.documentTypeList('tourPackage').title('Tour Packages')),
      S.listItem().title('Blog Posts').child(S.documentTypeList('post').title('Blog Posts')),
      S.divider(),
      ...SINGLETONS.map((type) =>
        S.listItem()
          .title(SINGLETON_LABELS[type] ?? type)
          .id(type)
          .child(
            S.document()
              .schemaType(type)
              .documentId(type)
              .title(SINGLETON_LABELS[type] ?? type),
          ),
      ),
    ])
