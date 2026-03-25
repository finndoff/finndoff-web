'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { PortableTextRenderer } from '@/components/ui/PortableTextRenderer'
import type { FaqAccordionSection } from '@/types/sanity'

export function FaqAccordion({ section }: { section: FaqAccordionSection }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-6">
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
        <div className="divide-y divide-navy-100">
          {section.items?.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div key={item._key} className="group">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-primary-600"
                >
                  <span className="font-display text-lg font-semibold text-navy-900 group-hover:text-primary-600 transition-colors">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-navy-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-primary-500' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="pb-5 pl-0 text-navy-700 border-l-2 border-primary-400 ml-0 pl-4">
                    <PortableTextRenderer value={item.answer} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
