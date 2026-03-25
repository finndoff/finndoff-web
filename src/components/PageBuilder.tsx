import type { Section } from '@/types/sanity'
import { Hero } from './modules/Hero'
import { CtaSection } from './modules/CtaSection'
import { FeatureGrid } from './modules/FeatureGrid'
import { PricingTable } from './modules/PricingTable'
import { TrustBar } from './modules/TrustBar'
import { Testimonial } from './modules/Testimonial'
import { TestimonialGrid } from './modules/TestimonialGrid'
import { FaqAccordion } from './modules/FaqAccordion'
import { VideoEmbed } from './modules/VideoEmbed'
import { Timeline } from './modules/Timeline'
import { PartnerShowcase } from './modules/PartnerShowcase'
import { ComparisonTable } from './modules/ComparisonTable'
import { TextSection } from './modules/TextSection'
import { PricingCalculator } from './modules/PricingCalculator'
import { TeamGrid } from './modules/TeamGrid'
import { ContactSection } from './modules/ContactSection'

const componentMap: Record<string, React.ComponentType<{ section: any }>> = {
  hero: Hero,
  ctaSection: CtaSection,
  featureGrid: FeatureGrid,
  pricingTable: PricingTable,
  trustBar: TrustBar,
  testimonial: Testimonial,
  testimonialGrid: TestimonialGrid,
  faqAccordion: FaqAccordion,
  videoEmbed: VideoEmbed,
  timeline: Timeline,
  partnerShowcase: PartnerShowcase,
  comparisonTable: ComparisonTable,
  textSection: TextSection,
  pricingCalculator: PricingCalculator,
  teamGrid: TeamGrid,
  contactSection: ContactSection,
}

export function PageBuilder({ sections }: { sections?: Section[] }) {
  if (!sections?.length) return null

  return (
    <>
      {sections.map((section, index) => {
        const Component = componentMap[section._type]
        if (!Component) return null
        const hasExplicitStyle =
          'style' in section && section.style && section.style !== 'default'
        const bgClass = hasExplicitStyle
          ? ''
          : index % 2 === 1
            ? 'bg-primary-50/50 blueprint-grid-light'
            : 'bg-warm-50'
        return (
          <div key={section._key} className={bgClass}>
            <Component section={section} />
          </div>
        )
      })}
    </>
  )
}
