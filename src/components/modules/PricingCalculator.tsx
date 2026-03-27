'use client'

import { useState } from 'react'
import type { PricingCalculatorSection } from '@/types/sanity'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Button } from '@/components/ui/Button'
import { Check, Minus, Plus, ExternalLink } from 'lucide-react'

interface Module {
  name: string
  price: number
  priceLabel: string
  description: string
  features: string[]
  alwaysIncluded?: boolean
  isAddon?: boolean
}

const modules: Module[] = [
  {
    name: 'Varsling',
    price: 829,
    priceLabel: '829 kr/mnd',
    description: 'Grunnpakken — finn de rette anbudene med ekspertoppsett.',
    alwaysIncluded: true,
    features: [
      'Daglige anbudsvarsler tilpasset din bedrift',
      'Ekspertoppsett av søkeprofil',
      'Doffin + TED-overvåking',
      'E-post- og app-varsler',
      '2 brukere inkludert',
    ],
  },
  {
    name: 'Innsikt',
    price: 649,
    priceLabel: '+649 kr/mnd',
    description: 'Forstå markedet og kom i posisjon før konkurransen.',
    isAddon: true,
    features: [
      'Markedsanalyse og trender',
      'Konkurrentoversikt',
      'Historiske data og statistikk',
      'Eksport av rapporter',
    ],
  },
  {
    name: 'Anbudshjelp AI',
    price: 1499,
    priceLabel: '+1 499 kr/mnd',
    description: 'AI-analyse, kvalifiseringssjekk og prosjektplan.',
    isAddon: true,
    features: [
      'Automatisk nedlasting av dokumenter',
      'AI-analyse og oppsummering',
      'Kvalifiseringssjekk',
      'Prosjektplan med milepæler',
      'Bid/no-bid-anbefaling (kommer)',
    ],
  },
]

const EXTRA_USER_PRICE = 199

export function PricingCalculator({
  section,
}: {
  section: PricingCalculatorSection
}) {
  const [selectedAddons, setSelectedAddons] = useState<Record<string, boolean>>({
    Innsikt: false,
    'Anbudshjelp AI': false,
  })
  const [extraUsers, setExtraUsers] = useState(0)

  const toggleAddon = (name: string) => {
    setSelectedAddons((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  const total =
    modules[0].price +
    modules
      .filter((m) => m.isAddon && selectedAddons[m.name])
      .reduce((sum, m) => sum + m.price, 0) +
    extraUsers * EXTRA_USER_PRICE

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

      <div className="mx-auto max-w-5xl">
        {/* Module cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {modules.map((mod) => {
            const isActive = mod.alwaysIncluded || selectedAddons[mod.name]
            return (
              <div
                key={mod.name}
                className={`verksted-card relative flex flex-col border-2 p-6 transition-colors ${
                  isActive
                    ? 'border-primary-500 bg-primary-50/30'
                    : 'border-navy-100 bg-white'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-xl font-bold">
                        {mod.name}
                      </h3>
                      {mod.isAddon && (
                        <span className="mono-label rounded bg-primary-500/10 px-2.5 py-1 text-primary-600">
                          Tillegg
                        </span>
                      )}
                      {mod.alwaysIncluded && (
                        <span className="mono-label rounded bg-accent-500/10 px-2.5 py-1 text-accent-700">
                          Inkludert
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-navy-600">
                      {mod.description}
                    </p>
                  </div>
                  {mod.isAddon && (
                    <button
                      type="button"
                      onClick={() => toggleAddon(mod.name)}
                      className={`relative mt-1 h-6 w-11 shrink-0 rounded-full transition-colors ${
                        selectedAddons[mod.name]
                          ? 'bg-accent-500'
                          : 'bg-navy-200'
                      }`}
                      aria-label={`${selectedAddons[mod.name] ? 'Fjern' : 'Legg til'} ${mod.name}`}
                    >
                      <span
                        className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                          selectedAddons[mod.name]
                            ? 'translate-x-5'
                            : 'translate-x-0'
                        }`}
                      />
                    </button>
                  )}
                </div>

                {/* Price */}
                <p className="mt-4">
                  <span className="mono-price text-2xl text-navy-900">{mod.priceLabel}</span>
                </p>

                {/* Features */}
                <ul className="mt-4 flex-1 space-y-2">
                  {mod.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}

          {/* Konsulent card */}
          <div className="verksted-card relative flex flex-col border-2 border-navy-100 bg-white p-6">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-display text-xl font-bold">
                  Anbudskonsulent
                </h3>
                <span className="mono-label rounded bg-copper-500/10 px-2.5 py-1 text-copper-600">
                  Rådgivning
                </span>
              </div>
              <p className="mt-1 text-sm text-navy-600">
                Erfarne anbudskonsulenter som hjelper deg vinne — fra strategi
                til ferdig tilbud.
              </p>
              <p className="mt-4">
                <span className="mono-price text-xl text-navy-900">Etter avtale</span>
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" />
                  <span>Gjennomgang av konkurransegrunnlag</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" />
                  <span>Hjelp med tilbudsskrivning</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" />
                  <span>Strategisk rådgivning</span>
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <Button
                href="/konsulent"
                variant="outline"
                className="w-full text-center"
              >
                Les mer
                <ExternalLink className="ml-2 inline h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Extra users */}
        <div className="mt-8 verksted-card border-2 border-navy-100 bg-white p-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <h3 className="font-display text-lg font-bold">
                Ekstra brukere
              </h3>
              <p className="text-sm text-navy-600">
                2 brukere er inkludert i Varsling. Legg til flere for{' '}
                <span className="font-mono font-semibold">199 kr/mnd</span> per bruker.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setExtraUsers((u) => Math.max(0, u - 1))}
                disabled={extraUsers === 0}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-navy-200 text-navy-600 transition-colors hover:border-primary-500 hover:text-primary-500 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Fjern bruker"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center mono-price text-xl">
                {extraUsers}
              </span>
              <button
                type="button"
                onClick={() => setExtraUsers((u) => u + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-navy-200 text-navy-600 transition-colors hover:border-primary-500 hover:text-primary-500"
                aria-label="Legg til bruker"
              >
                <Plus className="h-4 w-4" />
              </button>
              {extraUsers > 0 && (
                <span className="ml-2 text-sm font-mono text-navy-500">
                  +{extraUsers * EXTRA_USER_PRICE} kr/mnd
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Total + CTA */}
        <div className="relative mt-8 overflow-hidden rounded-2xl bg-navy-900 p-8 text-center">
          <div className="blueprint-grid-dark absolute inset-0 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(0,132,137,0.15) 0%, transparent 70%)' }} />
          <div className="relative">
            <p className="mono-label text-navy-400">Din månedspris</p>
            <p className="mt-3">
              <span className="mono-price text-5xl text-primary-400">
                {total.toLocaleString('nb-NO')}
              </span>
              <span className="ml-2 text-xl text-navy-400">kr/mnd</span>
            </p>
            <p className="mt-2 text-sm text-navy-500 font-mono">eks. mva</p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                href="https://app.finndoff.no/register"
                variant="primary"
                className="w-full sm:w-auto pulse-glow"
              >
                Start gratis prøveperiode
              </Button>
              <Button
                href="https://meetings-eu1.hubspot.com/daniel-dalsborg"
                variant="ghost"
                className="text-navy-300 hover:text-white"
              >
                Book demo med Daniel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
