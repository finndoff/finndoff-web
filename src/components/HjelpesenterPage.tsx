'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import {
  Rocket,
  Bell,
  Hash,
  Users,
  KeyRound,
  FileText,
  CreditCard,
  HelpCircle,
  Trophy,
  ChevronDown,
  Search,
} from 'lucide-react'
import { PortableTextRenderer } from '@/components/ui/PortableTextRenderer'
import type { FaqDocument } from '@/types/sanity'

const FAQ_CATEGORIES = [
  { slug: 'kom-i-gang', label: 'Kom i gang', icon: Rocket },
  { slug: 'varslinger-og-treff', label: 'Varslinger og treff', icon: Bell },
  { slug: 'cpv-koder-og-sokeord', label: 'CPV-koder og søkeord', icon: Hash },
  { slug: 'brukere-og-tilgang', label: 'Brukere og tilgang', icon: Users },
  { slug: 'innlogging-og-teknisk', label: 'Innlogging og teknisk', icon: KeyRound },
  { slug: 'abonnement-og-oppsigelse', label: 'Abonnement og oppsigelse', icon: FileText },
  { slug: 'faktura-og-betaling', label: 'Faktura og betaling', icon: CreditCard },
  { slug: 'om-finndoff', label: 'Om Finndoff', icon: HelpCircle },
  { slug: 'beste-praksis', label: 'Beste praksis', icon: Trophy },
]

export function HjelpesenterPage({ faqs }: { faqs: FaqDocument[] }) {
  const [activeCategory, setActiveCategory] = useState(FAQ_CATEGORIES[0].slug)
  const [openItem, setOpenItem] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})
  const scrollingRef = useRef(false)

  // Group FAQs by category
  const grouped = useMemo(() => {
    const map: Record<string, FaqDocument[]> = {}
    for (const cat of FAQ_CATEGORIES) {
      map[cat.slug] = []
    }
    for (const faq of faqs) {
      if (map[faq.category]) {
        map[faq.category].push(faq)
      }
    }
    return map
  }, [faqs])

  // Filter by search
  const filteredGrouped = useMemo(() => {
    if (!search.trim()) return grouped
    const q = search.toLowerCase()
    const result: Record<string, FaqDocument[]> = {}
    for (const [cat, items] of Object.entries(grouped)) {
      const filtered = items.filter((item) => item.question.toLowerCase().includes(q))
      if (filtered.length > 0) result[cat] = filtered
    }
    return result
  }, [grouped, search])

  // Categories with results
  const visibleCategories = FAQ_CATEGORIES.filter((cat) => filteredGrouped[cat.slug]?.length)

  // IntersectionObserver for active section
  useEffect(() => {
    if (search.trim()) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollingRef.current) return
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '-120px 0px -60% 0px', threshold: 0 }
    )

    for (const cat of FAQ_CATEGORIES) {
      const el = sectionRefs.current[cat.slug]
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [search])

  const scrollToCategory = (slug: string) => {
    setActiveCategory(slug)
    scrollingRef.current = true
    const el = sectionRefs.current[slug]
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 120
      window.scrollTo({ top, behavior: 'smooth' })
      setTimeout(() => {
        scrollingRef.current = false
      }, 800)
    }
  }

  return (
    <div className="min-h-screen bg-warm-50">
      {/* Header */}
      <div className="verksted-gradient relative overflow-hidden">
        <div className="blueprint-grid-dark absolute inset-0 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-32 sm:px-6 lg:px-8">
          <p className="mono-label text-copper-400 mb-3">Hjelpesenter</p>
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Hvordan kan vi hjelpe deg?
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-navy-400">
            Finn svar på spørsmål om varsling, søkeprofiler, abonnement og mer.
            Finner du ikke det du leter etter? Ta kontakt med oss.
          </p>

          {/* Search */}
          <div className="relative mt-8 max-w-xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-500" />
            <input
              type="text"
              placeholder="Søk i hjelpesenter..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-navy-800/60 py-3.5 pl-12 pr-4 text-white placeholder-navy-500 backdrop-blur-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      {/* Mobile category pills */}
      <div className="sticky top-[72px] z-30 border-b border-navy-100 bg-warm-50/95 backdrop-blur-sm lg:hidden">
        <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-none">
          {visibleCategories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => scrollToCategory(cat.slug)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === cat.slug
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-navy-600 shadow-sm hover:bg-primary-50 hover:text-primary-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block">
            <nav className="sticky top-[120px]">
              <ul className="space-y-1">
                {visibleCategories.map((cat) => {
                  const Icon = cat.icon
                  const isActive = activeCategory === cat.slug
                  const count = filteredGrouped[cat.slug]?.length || 0
                  return (
                    <li key={cat.slug}>
                      <button
                        type="button"
                        onClick={() => scrollToCategory(cat.slug)}
                        className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-primary-50 text-primary-700 border-l-2 border-primary-500'
                            : 'text-navy-600 hover:bg-navy-50 hover:text-navy-900'
                        }`}
                      >
                        <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-primary-500' : 'text-navy-400'}`} />
                        <span className="flex-1">{cat.label}</span>
                        <span className={`text-xs ${isActive ? 'text-primary-500' : 'text-navy-400'}`}>
                          {count}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </aside>

          {/* FAQ content */}
          <main className="min-w-0">
            {visibleCategories.length === 0 && (
              <div className="rounded-xl border border-navy-100 bg-white p-12 text-center">
                <Search className="mx-auto h-10 w-10 text-navy-300" />
                <p className="mt-4 font-display text-lg font-semibold text-navy-900">
                  Ingen resultater for &ldquo;{search}&rdquo;
                </p>
                <p className="mt-2 text-navy-600">
                  Prøv et annet søkeord, eller{' '}
                  <a href="/om-oss#kontakt" className="text-primary-600 underline hover:text-primary-700">
                    ta kontakt med oss
                  </a>
                  .
                </p>
              </div>
            )}

            {visibleCategories.map((cat) => {
              const Icon = cat.icon
              const items = filteredGrouped[cat.slug] || []
              return (
                <section
                  key={cat.slug}
                  id={cat.slug}
                  ref={(el) => { sectionRefs.current[cat.slug] = el }}
                  className="mb-12 scroll-mt-32"
                >
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 border border-primary-100">
                      <Icon className="h-4.5 w-4.5 text-primary-600" />
                    </div>
                    <h2 className="font-display text-xl font-bold text-navy-900">{cat.label}</h2>
                  </div>

                  <div className="rounded-xl border border-navy-100 bg-white shadow-sm overflow-hidden divide-y divide-navy-100">
                    {items.map((faq) => {
                      const isOpen = openItem === faq._id
                      return (
                        <div key={faq._id}>
                          <button
                            type="button"
                            onClick={() => setOpenItem(isOpen ? null : faq._id)}
                            className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-warm-50"
                          >
                            <span className="font-display text-base font-semibold text-navy-900">
                              {faq.question}
                            </span>
                            <ChevronDown
                              className={`h-4.5 w-4.5 shrink-0 text-navy-400 transition-transform duration-200 ${
                                isOpen ? 'rotate-180 text-primary-500' : ''
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <div className="border-t border-navy-50 bg-warm-50/50 px-6 py-4 text-navy-700">
                              <div className="border-l-2 border-primary-400 pl-4">
                                <PortableTextRenderer value={faq.answer} />
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </section>
              )
            })}

            {/* Contact CTA */}
            <div className="mt-16 rounded-xl verksted-gradient relative overflow-hidden p-8 sm:p-12">
              <div className="blueprint-grid-dark absolute inset-0 pointer-events-none" />
              <div className="relative text-center">
                <h3 className="font-display text-2xl font-bold text-white">
                  Fant du ikke svaret?
                </h3>
                <p className="mt-3 text-navy-400">
                  Kontakt oss, så hjelper vi deg videre.
                </p>
                <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <a
                    href="mailto:support@finndoff.no"
                    className="font-display rounded-lg bg-accent-500 px-6 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-accent-400"
                  >
                    Send oss en e-post
                  </a>
                  <a
                    href="/om-oss#kontakt"
                    className="font-display rounded-lg border border-white/20 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/40"
                  >
                    Kontakt oss
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
