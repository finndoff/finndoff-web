import type { TestimonialSection } from '@/types/sanity'
import { SanityImage } from '@/components/ui/SanityImage'

export function Testimonial({ section }: { section: TestimonialSection }) {
  return (
    <section className="py-16 lg:py-24">
      <figure className="mx-auto max-w-3xl px-6 text-center">
        <div className="mx-auto mb-6 h-[3px] w-12 bg-gradient-to-r from-primary-400 to-copper-400 rounded-full" />
        <blockquote>
          <p className="font-display text-xl leading-relaxed text-navy-800 lg:text-2xl">
            &ldquo;{section.quote}&rdquo;
          </p>
        </blockquote>
        <figcaption className="mt-8 flex flex-col items-center gap-4">
          {section.image?.asset && (
            <SanityImage
              image={section.image}
              width={80}
              height={80}
              className="h-16 w-16 rounded-full object-cover ring-2 ring-primary-500/20"
            />
          )}
          <div>
            {section.name && (
              <p className="font-display font-semibold text-navy-900">
                {section.name}
              </p>
            )}
            {(section.role || section.company) && (
              <p className="text-sm text-navy-500">
                {[section.role, section.company].filter(Boolean).join(', ')}
              </p>
            )}
          </div>
        </figcaption>
      </figure>
    </section>
  )
}
