import type { TestimonialGridSection } from '@/types/sanity'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SanityImage } from '@/components/ui/SanityImage'

export function TestimonialGrid({ section }: { section: TestimonialGridSection }) {
  if (!section.items?.length) return null

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
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {section.items.map((item, i) => (
          <figure
            key={i}
            className="verksted-card flex flex-col border-l-4 border-l-primary-500 border border-navy-100 bg-white p-8"
          >
            <div className="mb-4 font-display text-4xl leading-none text-primary-300 select-none">
              &ldquo;
            </div>
            <blockquote className="flex-1">
              <p className="text-navy-700 leading-relaxed">{item.quote}</p>
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-4 border-t border-navy-100 pt-6">
              {item.image?.asset ? (
                <SanityImage
                  image={item.image}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover shrink-0 ring-2 ring-primary-500/20"
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shrink-0">
                  <span className="font-display font-bold text-white text-lg">
                    {item.name?.[0] ?? '?'}
                  </span>
                </div>
              )}
              <div>
                {item.name && (
                  <p className="font-display font-semibold text-navy-900 text-sm">
                    {item.name}
                  </p>
                )}
                {(item.role || item.company) && (
                  <p className="text-xs text-navy-500">
                    {[item.role, item.company].filter(Boolean).join(', ')}
                  </p>
                )}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </SectionWrapper>
  )
}
