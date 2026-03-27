'use client'

import { usePathname } from 'next/navigation'
import { Navigation } from './Navigation'
import { Footer } from './Footer'

export function LayoutShell({ children, logoUrl, logoDarkUrl }: { children: React.ReactNode; logoUrl?: string | null; logoDarkUrl?: string | null }) {
  const pathname = usePathname()
  const isStudio = pathname.startsWith('/studio')

  if (isStudio) {
    return <>{children}</>
  }

  return (
    <>
      <Navigation logoUrl={logoDarkUrl} />
      <main className="pt-[72px]">{children}</main>
      <Footer logoUrl={logoDarkUrl} />
    </>
  )
}
