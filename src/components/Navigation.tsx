'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Logo } from './Logo'

const navLinks = [
  { label: 'Varsling', href: '/varsling' },
  { label: 'Innsikt', href: '/innsikt' },
  { label: 'Anbudshjelp AI', href: '/anbudshjelp-ai' },
  { label: 'Konsulent', href: '/konsulent' },
  { label: 'Priser', href: '/priser' },
  { label: 'Om oss', href: '/om-oss' },
  { label: 'Nyheter', href: '/nyheter' },
]

export function Navigation({ logoUrl }: { logoUrl?: string | null }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="glass-dark fixed top-0 right-0 left-0 z-50 border-b border-white/10">
      <div className="blueprint-grid absolute inset-0 pointer-events-none" />
      <nav className="relative mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo logoUrl={logoUrl} variant="dark" />

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-navy-300 transition-colors hover:text-primary-400"
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-navy-300 transition-colors hover:bg-white/5 hover:text-primary-400"
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
