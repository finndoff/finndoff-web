import type { HeroSection } from '@/types/sanity'
import { Button } from '@/components/ui/Button'
import { SanityImage } from '@/components/ui/SanityImage'
import { DeviceFrame } from '@/components/ui/DeviceFrame'
import { HeroSearchBar } from './HeroSearchBar'

export function Hero({ section }: { section: HeroSection }) {
  const isDark = section.style === 'dark'
  const isBrand = section.style === 'brand'
  const isDefault = !isDark && !isBrand

  return (
    <section className={`relative overflow-hidden py-16 lg:py-24 ${
      isDark
        ? 'verksted-gradient text-white'
        : isBrand
          ? 'bg-primary-500 text-white'
          : 'bg-navy-900 text-white'
    }`}>
      {/* Blueprint grid overlay */}
      <div className="blueprint-grid-dark absolute inset-0 pointer-events-none" />

      {/* Teal radial glow — top right */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] pointer-events-none opacity-60" style={{ background: 'radial-gradient(circle, rgba(0,132,137,0.18) 0%, transparent 70%)' }} />

      {/* Secondary glow — bottom left */}
      <div className="absolute -bottom-48 -left-48 w-[400px] h-[400px] pointer-events-none opacity-40" style={{ background: 'radial-gradient(circle, rgba(29,224,142,0.1) 0%, transparent 70%)' }} />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            {/* Monospace overline */}
            {section.stats && section.stats.length > 0 && (
              <p className="mono-label mb-4 text-primary-400">Offentlige anbud</p>
            )}

            <h1 className="font-display text-4xl font-bold leading-tight lg:text-5xl xl:text-6xl">
              {section.headline}
            </h1>
            {section.subheadline && (
              <p className="mt-6 text-lg leading-relaxed text-navy-300 lg:text-xl">
                {section.subheadline}
              </p>
            )}
            {(section.primaryCta?.text || section.secondaryCta?.text) && (
              <div className="mt-8 flex flex-wrap gap-4">
                {section.primaryCta?.text && (
                  <Button href={section.primaryCta.link} variant="primary" className="pulse-glow">
                    {section.primaryCta.text}
                  </Button>
                )}
                {section.secondaryCta?.text && (
                  <Button
                    href={section.secondaryCta.link}
                    variant="outline"
                    className="border-navy-500 text-navy-200 hover:border-primary-500 hover:bg-primary-500/10 hover:text-white"
                  >
                    {section.secondaryCta.text}
                  </Button>
                )}
              </div>
            )}
            {section.showSearchBar && <HeroSearchBar />}
            {section.stats && section.stats.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-8 border-t border-white/10 pt-8">
                {section.stats.map((stat, i) => (
                  <div key={i}>
                    <p className="mono-price text-3xl text-primary-400">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-sm text-navy-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          {section.image?.asset && (
            <div className="relative">
              {/* Glow behind device frame */}
              <div className="absolute inset-0 -m-4 rounded-3xl opacity-50" style={{ background: 'radial-gradient(ellipse at center, rgba(0,132,137,0.15) 0%, transparent 70%)' }} />
              <div className="relative">
                <DeviceFrame type={section.deviceFrame} style="dark">
                  <SanityImage
                    image={section.image}
                    width={800}
                    height={600}
                    className="h-full w-full object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </DeviceFrame>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
