import type { PortableTextBlock } from 'next-sanity'

// Shared types
export interface SanityImage {
  _type?: 'image'
  alt?: string
  caption?: string
  asset?: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
}

export interface CtaLink {
  text?: string
  link?: string
}

export type SectionStyle = 'default' | 'dark' | 'brand'

export type DeviceFrameType = 'none' | 'laptop' | 'desktop' | 'tablet' | 'phone'

// Module types

export interface HeroSection {
  _type: 'hero'
  _key: string
  headline: string
  subheadline?: string
  primaryCta?: CtaLink
  secondaryCta?: CtaLink
  showSearchBar?: boolean
  image?: SanityImage
  deviceFrame?: DeviceFrameType
  stats?: { value: string; label: string }[]
  style?: SectionStyle
}

export interface TestimonialGridSection {
  _type: 'testimonialGrid'
  _key: string
  title?: string
  subtitle?: string
  items?: {
    quote: string
    name?: string
    role?: string
    company?: string
    image?: SanityImage
  }[]
}

export interface FeatureGridSection {
  _type: 'featureGrid'
  _key: string
  title?: string
  subtitle?: string
  style?: SectionStyle
  columns?: 2 | 3 | 4
  features?: {
    _key: string
    title: string
    description?: string
    icon?: string
    link?: string
    variant?: 'default' | 'highlighted' | 'muted'
  }[]
}

export interface PricingTableSection {
  _type: 'pricingTable'
  _key: string
  title?: string
  subtitle?: string
  plans?: {
    _key: string
    name: string
    price?: number
    priceLabel?: string
    description?: string
    isAddon?: boolean
    highlighted?: boolean
    features?: string[]
    ctaText?: string
    ctaLink?: string
  }[]
}

export interface TrustBarSection {
  _type: 'trustBar'
  _key: string
  title?: string
  logos?: {
    _key: string
    name: string
    logo?: SanityImage
    link?: string
  }[]
  style?: 'grid' | 'scrolling'
}

export interface TestimonialSection {
  _type: 'testimonial'
  _key: string
  quote: string
  name?: string
  role?: string
  company?: string
  image?: SanityImage
}

export interface VideoEmbedSection {
  _type: 'videoEmbed'
  _key: string
  title?: string
  videoUrl: string
  thumbnail?: SanityImage
  caption?: string
}

export interface CtaSectionSection {
  _type: 'ctaSection'
  _key: string
  title?: string
  description?: string
  primaryCta?: CtaLink
  secondaryCta?: CtaLink
  style?: SectionStyle
}

export interface FaqAccordionSection {
  _type: 'faqAccordion'
  _key: string
  title?: string
  subtitle?: string
  items?: {
    _key: string
    question: string
    answer: PortableTextBlock[]
  }[]
}

export interface FaqDocument {
  _id: string
  question: string
  answer: PortableTextBlock[]
  category: string
  sortOrder?: number
  product?: { title: string; slug: { current: string } }
}

export interface TimelineSection {
  _type: 'timeline'
  _key: string
  title?: string
  subtitle?: string
  steps?: {
    _key: string
    stepNumber?: number
    title: string
    description?: string
    icon?: string
    duration?: string
  }[]
}

export interface PartnerShowcaseSection {
  _type: 'partnerShowcase'
  _key: string
  title?: string
  subtitle?: string
  partners?: {
    _id: string
    name: string
    slug?: { current: string }
    logo?: SanityImage
    description?: string
    website?: string
  }[]
  style?: 'grid' | 'slider'
}

export interface ComparisonTableSection {
  _type: 'comparisonTable'
  _key: string
  title?: string
  subtitle?: string
  columns?: {
    _key: string
    name: string
    highlighted?: boolean
  }[]
  rows?: {
    _key: string
    feature: string
    values?: string[]
  }[]
}

export interface TextSectionSection {
  _type: 'textSection'
  _key: string
  title?: string
  content?: PortableTextBlock[]
}

export interface PricingCalculatorSection {
  _type: 'pricingCalculator'
  _key: string
  title?: string
  subtitle?: string
}

export interface PersonData {
  _id: string
  name: string
  role?: string
  image?: SanityImage
  bio?: string
  email?: string
  phone?: string
  linkedIn?: string
  type?: 'team' | 'board'
}

export interface TeamGridSection {
  _type: 'teamGrid'
  _key: string
  title?: string
  subtitle?: string
  persons?: PersonData[]
  layout?: 'grid'
}

export interface ContactPersonInline {
  _key: string
  name?: string
  role?: string
  phone?: string
  email?: string
  bookingLink?: string
}

export interface ContactSectionSection {
  _type: 'contactSection'
  _key: string
  title?: string
  subtitle?: string
  email?: string
  phone?: string
  address?: string
  hubspotPortalId?: string
  hubspotFormId?: string
  contactPersons?: ContactPersonInline[]
}

export type Section =
  | HeroSection
  | FeatureGridSection
  | PricingTableSection
  | TrustBarSection
  | TestimonialSection
  | TestimonialGridSection
  | VideoEmbedSection
  | CtaSectionSection
  | FaqAccordionSection
  | TimelineSection
  | PartnerShowcaseSection
  | ComparisonTableSection
  | TextSectionSection
  | PricingCalculatorSection
  | TeamGridSection
  | ContactSectionSection

export interface PageDocument {
  _id: string
  title?: string
  slug?: { current: string }
  seoTitle?: string
  seoDescription?: string
  ogImage?: SanityImage
  sections?: Section[]
}

export interface BlogPostListItem {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  mainImage?: SanityImage
  publishedAt?: string
  category?: string
  author?: {
    name: string
    image?: SanityImage
  }
}

export interface BlogPostDocument {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  body?: PortableTextBlock[]
  mainImage?: SanityImage
  publishedAt?: string
  category?: string
  seoTitle?: string
  seoDescription?: string
  author?: {
    name: string
    role?: string
    image?: SanityImage
  }
}

export interface ProductDocument {
  _id: string
  title?: string
  slug?: { current: string }
  subtitle?: string
  description?: string
  icon?: string
  price?: number
  priceLabel?: string
  isAddon?: boolean
  seoTitle?: string
  seoDescription?: string
  ogImage?: SanityImage
  sections?: Section[]
}

export interface LegalDocument {
  _id: string
  title: { no: string; en: string }
  slug: { current: string }
  body: { no: PortableTextBlock[]; en: PortableTextBlock[] }
  lastUpdated?: string
  seoTitle?: string
  seoDescription?: string
}

export interface SitemapEntry {
  slug: string
  _updatedAt: string
}
