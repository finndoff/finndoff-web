import type { TextSectionSection } from '@/types/sanity'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { PortableTextRenderer } from '@/components/ui/PortableTextRenderer'

export function TextSection({ section }: { section: TextSectionSection }) {
  return (
    <SectionWrapper style={section.style}>
      <div className="prose-finndoff mx-auto max-w-3xl text-center">
        {section.title && (
          <h2 className="mb-8 font-display text-3xl font-bold lg:text-4xl">
            {section.title}
          </h2>
        )}
        <PortableTextRenderer value={section.content} />
      </div>
    </SectionWrapper>
  )
}
