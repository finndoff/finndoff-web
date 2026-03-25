import Link from 'next/link'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-accent-500 text-navy-900 hover:bg-accent-400 font-semibold shadow-[var(--shadow-verksted-sm)] hover:shadow-[var(--shadow-verksted-md)]',
  secondary:
    'bg-primary-500 text-white hover:bg-primary-600 font-semibold shadow-[var(--shadow-verksted-sm)] hover:shadow-[var(--shadow-verksted-md)]',
  outline:
    'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white font-semibold',
  ghost:
    'text-primary-500 underline hover:text-primary-600',
}

export function Button({
  href,
  variant = 'primary',
  children,
  className = '',
}: {
  href?: string
  variant?: Variant
  children: React.ReactNode
  className?: string
}) {
  const base = 'inline-block rounded-lg px-6 py-3 font-display transition-all duration-200'
  const styles = `${base} ${variantStyles[variant]} ${className}`

  if (!href) {
    return <span className={styles}>{children}</span>
  }

  const isInternal = href.startsWith('/') || href.startsWith('#')

  if (isInternal) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} className={styles} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}
