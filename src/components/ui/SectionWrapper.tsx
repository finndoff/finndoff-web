import type { SectionStyle } from '@/types/sanity'

interface SectionWrapperProps {
  children: React.ReactNode
  style?: SectionStyle
  className?: string
}

const styleMap: Record<string, string> = {
  default: 'text-navy-900',
  dark: 'verksted-gradient blueprint-grid-dark text-white',
  brand: 'bg-primary-500 text-white',
}

export function SectionWrapper({ children, style = 'default', className = '' }: SectionWrapperProps) {
  const base = styleMap[style] ?? styleMap.default

  return (
    <section className={`relative py-16 lg:py-24 ${base} ${className}`}>
      {style === 'dark' && (
        <div className="absolute top-0 right-0 w-[300px] h-[300px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,132,137,0.12) 0%, transparent 70%)' }} />
      )}
      <div className="relative mx-auto max-w-7xl px-6">{children}</div>
    </section>
  )
}
