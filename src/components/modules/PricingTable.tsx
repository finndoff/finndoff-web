import type { PricingTableSection } from '@/types/sanity'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Button } from '@/components/ui/Button'
import { Check } from 'lucide-react'

export function PricingTable({ section }: { section: PricingTableSection }) {
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
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {section.plans?.map((plan) => (
          <div
            key={plan._key}
            className={`verksted-card relative flex flex-col border-2 bg-white p-8 ${
              plan.highlighted
                ? 'border-copper-500 shadow-[var(--shadow-verksted-lg)]'
                : 'border-navy-100'
            }`}
          >
            {plan.highlighted && (
              <div className="absolute -top-px left-8 right-8 h-[3px] bg-gradient-to-r from-copper-400 via-copper-500 to-copper-400" />
            )}
            {plan.isAddon && (
              <span className="mono-label mb-4 inline-block w-fit rounded bg-primary-500/10 px-3 py-1 text-primary-600">
                Tillegg
              </span>
            )}
            <h3 className="font-display text-xl font-bold">{plan.name}</h3>
            <div className="mt-4">
              {plan.price != null ? (
                <p>
                  <span className="mono-price text-3xl text-navy-900">{plan.price}</span>
                  <span className="ml-1 text-sm text-navy-500">kr/mnd</span>
                </p>
              ) : plan.priceLabel ? (
                <p className="font-display text-xl font-semibold text-primary-500">
                  {plan.priceLabel}
                </p>
              ) : null}
            </div>
            {plan.description && (
              <p className="mt-3 text-sm text-navy-600 leading-relaxed">{plan.description}</p>
            )}
            {plan.features && plan.features.length > 0 && (
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
            {plan.ctaText && (
              <div className="mt-8">
                <Button
                  href={plan.ctaLink}
                  variant={plan.highlighted ? 'primary' : 'outline'}
                  className="w-full text-center"
                >
                  {plan.ctaText}
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
