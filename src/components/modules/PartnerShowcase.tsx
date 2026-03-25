import type { PartnerShowcaseSection } from '@/types/sanity'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SanityImage } from '@/components/ui/SanityImage'

export function PartnerShowcase({ section }: { section: PartnerShowcaseSection }) {
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
      <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
        {section.partners?.map((partner) => {
          const content = (
            <div className="verksted-card flex flex-col items-center gap-3 border border-navy-100 bg-white p-6 text-center">
              {partner.logo?.asset && (
                <SanityImage
                  image={partner.logo}
                  width={160}
                  height={80}
                  className="h-12 w-auto object-contain"
                />
              )}
              <p className="font-display text-sm font-semibold text-navy-900">
                {partner.name}
              </p>
            </div>
          )

          if (partner.website) {
            return (
              <a
                key={partner._id}
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content}
              </a>
            )
          }

          return <div key={partner._id}>{content}</div>
        })}
      </div>
    </SectionWrapper>
  )
}
