import type { FeatureGridSection } from '@/types/sanity'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { DynamicIcon } from '@/components/ui/DynamicIcon'

const columnClasses: Record<number, string> = {
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
}

export function FeatureGrid({ section }: { section: FeatureGridSection }) {
  const cols = section.columns || 3

  return (
    <SectionWrapper>
      {(section.title || section.subtitle) && (
        <div className="mb-12 text-center">
          {section.title && (
            <h2 className="font-display text-3xl font-bold lg:text-4xl">
              {section.title}
            </h2>
          )}
          {section.subtitle && (
            <p className="mt-4 text-lg text-navy-600">{section.subtitle}</p>
          )}
        </div>
      )}
      <div className={`grid gap-8 ${columnClasses[cols]}`}>
        {section.features?.map((feature) => (
          <div
            key={feature._key}
            className="verksted-card border-l-4 border-l-primary-500 border border-navy-100 bg-white p-6"
          >
            {feature.icon && (
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500/8 text-primary-500">
                <DynamicIcon name={feature.icon} />
              </div>
            )}
            <h3 className="font-display text-lg font-semibold">{feature.title}</h3>
            {feature.description && (
              <p className="mt-2 text-navy-600 leading-relaxed">{feature.description}</p>
            )}
            {feature.link && (
              <a
                href={feature.link}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
              >
                Les mer
                <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
              </a>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
