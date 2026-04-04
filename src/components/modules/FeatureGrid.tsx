import type { FeatureGridSection } from '@/types/sanity'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { DynamicIcon } from '@/components/ui/DynamicIcon'

const columnClasses: Record<number, string> = {
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
}

function FeatureCard({
  feature,
  darkSection,
}: {
  feature: NonNullable<FeatureGridSection['features']>[number]
  darkSection?: boolean
}) {
  const isHighlighted = feature.variant === 'highlighted'
  const isMuted = feature.variant === 'muted'

  // In dark sections, default cards get a translucent style
  const cardClass = isHighlighted
    ? 'verksted-card bg-navy-900 text-white p-8 relative overflow-hidden'
    : darkSection
      ? 'verksted-card bg-white/10 backdrop-blur-sm border border-white/10 p-6'
      : isMuted
        ? 'verksted-card border border-navy-100 bg-warm-100 p-6'
        : 'verksted-card border-l-4 border-l-primary-500 border border-navy-100 bg-white p-6'

  const iconWrapClass = isHighlighted
    ? 'mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-400/20 text-primary-300'
    : darkSection
      ? 'mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-400/20 text-primary-300'
      : 'mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500/8 text-primary-500'

  const titleClass = isHighlighted || darkSection
    ? 'font-display text-lg font-semibold text-white'
    : 'font-display text-lg font-semibold'

  const descClass = isHighlighted || darkSection
    ? 'mt-2 text-navy-200 leading-relaxed'
    : 'mt-2 text-navy-600 leading-relaxed'

  const linkClass = isHighlighted || darkSection
    ? 'mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-300 hover:text-primary-200 transition-colors'
    : 'mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors'

  return (
    <div className={cardClass}>
      {isHighlighted && (
        <>
          <div className="absolute inset-0 blueprint-grid-dark opacity-40" />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute top-3 right-4 z-10">
            <span className="mono-label bg-accent-500/20 text-accent-400 px-2 py-0.5 rounded text-[10px]">
              FLAGGSKIP
            </span>
          </div>
        </>
      )}
      <div className="relative z-10">
        {feature.icon && (
          <div className={iconWrapClass}>
            <DynamicIcon name={feature.icon} />
          </div>
        )}
        <h3 className={titleClass}>{feature.title}</h3>
        {feature.description && (
          <p className={descClass}>{feature.description}</p>
        )}
        {feature.link && (
          <a
            href={feature.link}
            className={linkClass}
          >
            Les mer
            <span>&rarr;</span>
          </a>
        )}
      </div>
    </div>
  )
}

export function FeatureGrid({ section }: { section: FeatureGridSection }) {
  const cols = section.columns || 3
  const isDark = section.style === 'dark'

  return (
    <SectionWrapper style={section.style}>
      {(section.title || section.subtitle) && (
        <div className="mb-12 text-center">
          {section.title && (
            <h2 className={`font-display text-3xl font-bold lg:text-4xl ${isDark ? 'text-white' : ''}`}>
              {section.title}
            </h2>
          )}
          {section.subtitle && (
            <p className={`mt-4 text-lg ${isDark ? 'text-navy-300' : 'text-navy-600'}`}>
              {section.subtitle}
            </p>
          )}
        </div>
      )}
      <div className={`grid gap-8 ${columnClasses[cols]}`}>
        {section.features?.map((feature) => (
          <FeatureCard key={feature._key} feature={feature} darkSection={isDark} />
        ))}
      </div>
    </SectionWrapper>
  )
}
