import Image from 'next/image'
import type { TrustBarSection } from '@/types/sanity'
import { urlFor } from '@/sanity/lib/image'

export function TrustBar({ section }: { section: TrustBarSection }) {
  const isScrolling = section.style === 'scrolling'

  return (
    <section className="relative bg-warm-50 py-12 overflow-hidden">
      <div className="blueprint-grid-light absolute inset-0 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6">
        {section.title && (
          <p className="mono-label mb-8 text-center text-navy-500">
            <TrustBarTitle title={section.title} />
          </p>
        )}
        {isScrolling ? (
          <div className="overflow-hidden">
            <div className="animate-scroll flex gap-12">
              {/* Double logos for seamless loop */}
              {[...(section.logos || []), ...(section.logos || [])].map(
                (logo, i) => (
                  <LogoItem key={`${logo._key}-${i}`} logo={logo} />
                ),
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {section.logos?.map((logo) => (
              <LogoItem key={logo._key} logo={logo} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function TrustBarTitle({ title }: { title: string }) {
  const idx = title.toLowerCase().lastIndexOf(' av ')
  if (idx === -1) return <>{title}</>
  const before = title.slice(0, idx + 4)
  const after = title.slice(idx + 4)
  return (
    <>
      {before}
      <span className="text-copper-500">{after}</span>
    </>
  )
}

function LogoItem({
  logo,
}: {
  logo: NonNullable<TrustBarSection['logos']>[number]
}) {
  if (!logo.logo?.asset) return null

  const img = (
    <Image
      src={urlFor(logo.logo).height(80).fit('max').url()}
      alt={logo.name || ''}
      width={160}
      height={40}
      className="h-10 w-auto shrink-0 object-contain opacity-60 saturate-[0.2] transition-all hover:opacity-100 hover:saturate-100"
      unoptimized
    />
  )

  if (logo.link) {
    return (
      <a href={logo.link} target="_blank" rel="noopener noreferrer" title={logo.name} className="shrink-0">
        {img}
      </a>
    )
  }

  return <div title={logo.name} className="shrink-0">{img}</div>
}
