'use client'

import { useEffect, useRef } from 'react'
import type { ContactSectionSection } from '@/types/sanity'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Mail, Phone, MapPin, Calendar } from 'lucide-react'

export function ContactSection({
  section,
}: {
  section: ContactSectionSection
}) {
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!section.hubspotPortalId || !section.hubspotFormId || !formRef.current)
      return

    const portalId = section.hubspotPortalId
    const formId = section.hubspotFormId

    const script = document.createElement('script')
    script.src = 'https://js.hsforms.net/forms/v2.js'
    script.async = true
    script.onload = () => {
      if (window.hbspt && formRef.current) {
        window.hbspt.forms.create({
          portalId,
          formId,
          target: `#hubspot-form-${formId}`,
        })
      }
    }
    document.head.appendChild(script)

    return () => {
      script.remove()
    }
  }, [section.hubspotPortalId, section.hubspotFormId])

  return (
    <SectionWrapper>
      <div id="kontakt">
        {section.title && (
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold lg:text-4xl">
              {section.title}
            </h2>
            {section.subtitle && (
              <p className="mx-auto mt-4 max-w-2xl text-lg text-navy-600">
                {section.subtitle}
              </p>
            )}
          </div>
        )}

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact info */}
          <div>
            <div className="space-y-6">
              {section.email && (
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/10 shrink-0">
                    <Mail className="h-5 w-5 text-primary-500" />
                  </div>
                  <div>
                    <p className="mono-label text-navy-500">E-post</p>
                    <a
                      href={`mailto:${section.email}`}
                      className="text-navy-900 transition-colors hover:text-primary-600"
                    >
                      {section.email}
                    </a>
                  </div>
                </div>
              )}
              {section.phone && (
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/10 shrink-0">
                    <Phone className="h-5 w-5 text-primary-500" />
                  </div>
                  <div>
                    <p className="mono-label text-navy-500">Telefon</p>
                    <a
                      href={`tel:${section.phone.replace(/\s/g, '')}`}
                      className="text-navy-900 transition-colors hover:text-primary-600"
                    >
                      {section.phone}
                    </a>
                  </div>
                </div>
              )}
              {section.address && (
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/10 shrink-0">
                    <MapPin className="h-5 w-5 text-primary-500" />
                  </div>
                  <div>
                    <p className="mono-label text-navy-500">Adresse</p>
                    <p className="whitespace-pre-line text-navy-900">
                      {section.address}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Contact persons */}
            {section.contactPersons && section.contactPersons.length > 0 && (
              <div className="mt-10 space-y-6">
                {section.contactPersons.map((person, i) => (
                  <div
                    key={person._key || i}
                    className="verksted-card border-l-4 border-l-primary-500 border border-navy-100 bg-white p-5"
                  >
                    <p className="font-display font-semibold">{person.name}</p>
                    {person.role && (
                      <p className="mono-label mt-1 text-copper-500">{person.role}</p>
                    )}
                    <div className="mt-3 flex flex-wrap gap-4 text-sm">
                      {person.phone && (
                        <a
                          href={`tel:${person.phone.replace(/\s/g, '')}`}
                          className="text-navy-600 transition-colors hover:text-primary-600"
                        >
                          {person.phone}
                        </a>
                      )}
                      {person.email && (
                        <a
                          href={`mailto:${person.email}`}
                          className="text-navy-600 transition-colors hover:text-primary-600"
                        >
                          {person.email}
                        </a>
                      )}
                    </div>
                    {person.bookingLink && (
                      <a
                        href={person.bookingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary-600 transition-colors hover:text-primary-700"
                      >
                        <Calendar className="h-4 w-4" />
                        Book et møte
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* HubSpot form */}
          {section.hubspotPortalId && section.hubspotFormId && (
            <div className="verksted-card bg-white p-6 lg:p-8">
              <h3 className="mb-4 font-display text-xl font-semibold">
                Send oss en melding
              </h3>
              <div
                ref={formRef}
                id={`hubspot-form-${section.hubspotFormId}`}
              />
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  )
}

// Extend Window for HubSpot
declare global {
  interface Window {
    hbspt: {
      forms: {
        create: (opts: {
          portalId: string
          formId: string
          target: string
        }) => void
      }
    }
  }
}
