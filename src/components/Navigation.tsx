'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronDown, Bell, BarChart3, Sparkles, HeartHandshake } from 'lucide-react'
import { Logo } from './Logo'

const productLinks = [
  { label: 'Varsling', href: '/varsling', icon: Bell, desc: 'Skreddersydde anbudsvarsler' },
  { label: 'Innsikt', href: '/innsikt', icon: BarChart3, desc: 'Markedsdata og konkurrentanalyse' },
  { label: 'Anbudshjelp AI', href: '/anbudshjelp-ai', icon: Sparkles, desc: 'AI-drevet dokumentanalyse' },
  { label: 'Konsulent', href: '/konsulent', icon: HeartHandshake, desc: 'Personlig anbudsrådgivning' },
]

const navLinks = [
  { label: 'Priser', href: '/priser' },
  { label: 'Om oss', href: '/om-oss' },
  { label: 'Nyheter', href: '/nyheter' },
  { label: 'Hjelpesenter', href: '/hjelpesenter' },
]

export function Navigation({ logoUrl }: { logoUrl?: string | null }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()

  const isOnProductPage = productLinks.some((p) => pathname === p.href)

  // Close dropdown on route change
  useEffect(() => {
    setProductsOpen(false)
    setMobileOpen(false)
    setMobileProductsOpen(false)
  }, [pathname])

  // Close dropdown on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setProductsOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setProductsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setProductsOpen(false), 150)
  }

  return (
    <header className="glass-dark fixed top-0 right-0 left-0 z-50 border-b border-white/10">
      <div className="blueprint-grid absolute inset-0 pointer-events-none" />
      <nav className="relative mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo logoUrl={logoUrl} variant="dark" />

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {/* Produkter dropdown */}
          <li>
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isOnProductPage || productsOpen
                    ? 'text-primary-400'
                    : 'text-navy-300 hover:text-primary-400'
                }`}
                onClick={() => setProductsOpen(!productsOpen)}
                aria-expanded={productsOpen}
                aria-haspopup="true"
              >
                Produkter
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    productsOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Dropdown panel */}
              {productsOpen && (
                <div
                  className="absolute left-1/2 top-full z-50 mt-2 w-[340px] -translate-x-1/2 rounded-xl border border-white/10 bg-navy-800/95 p-2 shadow-xl backdrop-blur-xl"
                  role="menu"
                >
                  <div className="blueprint-grid absolute inset-0 rounded-xl pointer-events-none opacity-30" />
                  {productLinks.map((product) => {
                    const Icon = product.icon
                    const isActive = pathname === product.href
                    return (
                      <Link
                        key={product.href}
                        href={product.href}
                        role="menuitem"
                        className={`relative flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                          isActive
                            ? 'bg-primary-500/10 text-primary-400'
                            : 'text-navy-300 hover:bg-white/5 hover:text-primary-400'
                        }`}
                      >
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/5">
                          <Icon className="h-4 w-4 text-primary-500" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">{product.label}</div>
                          <div className="text-xs text-navy-500">{product.desc}</div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </li>

          {/* Regular nav links */}
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-primary-400'
                    : 'text-navy-300 hover:text-primary-400'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="https://login.finndoff.no/"
            className="font-display rounded-lg border border-navy-500 px-5 py-2 text-sm font-semibold text-navy-200 transition-colors hover:border-primary-500 hover:text-primary-400"
          >
            Logg inn
          </a>
          <a
            href="https://finndoff.no/signup"
            className="font-display rounded-lg bg-accent-500 px-5 py-2 text-sm font-semibold text-navy-900 transition-colors hover:bg-accent-400 pulse-glow"
          >
            Prøv gratis
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="rounded-md p-2 text-navy-300 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Lukk meny' : 'Åpne meny'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="glass-dark border-t border-white/10 lg:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
            {/* Produkter expandable */}
            <div>
              <button
                type="button"
                className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium transition-colors ${
                  isOnProductPage || mobileProductsOpen
                    ? 'text-primary-400'
                    : 'text-navy-300 hover:bg-white/5 hover:text-primary-400'
                }`}
                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                aria-expanded={mobileProductsOpen}
              >
                Produkter
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    mobileProductsOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {mobileProductsOpen && (
                <div className="ml-3 mt-1 space-y-1 border-l border-white/10 pl-3">
                  {productLinks.map((product) => {
                    const Icon = product.icon
                    return (
                      <Link
                        key={product.href}
                        href={product.href}
                        className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                          pathname === product.href
                            ? 'text-primary-400'
                            : 'text-navy-300 hover:bg-white/5 hover:text-primary-400'
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        <Icon className="h-4 w-4 text-primary-500" />
                        {product.label}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Regular links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block rounded-md px-3 py-2 text-base font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-primary-400'
                    : 'text-navy-300 hover:bg-white/5 hover:text-primary-400'
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex flex-col gap-3 pt-4">
              <a
                href="https://login.finndoff.no/"
                className="font-display rounded-lg border border-navy-500 px-5 py-2.5 text-center text-sm font-semibold text-navy-200 transition-colors hover:border-primary-500 hover:text-primary-400"
              >
                Logg inn
              </a>
              <a
                href="https://finndoff.no/signup"
                className="font-display rounded-lg bg-accent-500 px-5 py-2.5 text-center text-sm font-semibold text-navy-900 transition-colors hover:bg-accent-400"
              >
                Prøv gratis
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
