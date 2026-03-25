import Link from 'next/link'
import { Logo } from './Logo'

const productLinks = [
  { label: 'Varsling', href: '/varsling' },
  { label: 'Innsikt', href: '/innsikt' },
  { label: 'Anbudshjelp AI', href: '/anbudshjelp-ai' },
  { label: 'Konsulent', href: '/konsulent' },
  { label: 'Priser', href: '/priser' },
]

const companyLinks = [
  { label: 'Om oss', href: '/om-oss' },
  { label: 'Nyheter', href: '/nyheter' },
  { label: 'Personvern', href: '/personvern' },
  { label: 'Vilkår', href: '/vilkar' },
  { label: 'Kontakt', href: '/om-oss#kontakt' },
]

export function Footer({ logoUrl }: { logoUrl?: string | null }) {
  return (
    <footer className="relative bg-navy-900 text-white overflow-hidden">
      {/* Blueprint grid texture */}
      <div className="blueprint-grid-dark absolute inset-0 pointer-events-none" />

      {/* Teal glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          {/* Brand column */}
          <div className="md:col-span-2">
            <Logo logoUrl={logoUrl} variant="dark" />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-navy-400">
              Menneske + Maskin = Bedre anbudsresultater
            </p>
            <p className="mt-3 font-mono text-xs tracking-wider text-navy-500">
              Finndoff AS &middot; Org. 927 436 442
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="mono-label text-copper-400">
              Produkter
            </h3>
            <ul className="mt-4 space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-400 transition-colors hover:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mono-label text-copper-400">
              Selskap
            </h3>
            <ul className="mt-4 space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-400 transition-colors hover:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Addresses */}
          <div>
            <h3 className="mono-label text-copper-400">
              Kontakt
            </h3>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-sm font-medium text-navy-300">Oslo</p>
                <p className="text-sm text-navy-400">Haakon VIIs gate 6</p>
                <p className="text-sm text-navy-400">0191 Oslo</p>
              </div>
              <div>
                <p className="text-sm font-medium text-navy-300">Narvik</p>
                <p className="text-sm text-navy-400">Teknologiveien 12</p>
                <p className="text-sm text-navy-400">8517 Narvik</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-navy-700/50 pt-8 sm:flex-row">
          <p className="text-sm text-navy-500">
            &copy; {new Date().getFullYear()} Finndoff AS. Alle rettigheter reservert.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/company/finndoff"
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy-500 transition-colors hover:text-primary-400"
              aria-label="Finndoff på LinkedIn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/people/Finndoff/100077230503459/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy-500 transition-colors hover:text-primary-400"
              aria-label="Finndoff på Facebook"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@Finndoff"
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy-500 transition-colors hover:text-primary-400"
              aria-label="Finndoff på YouTube"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
