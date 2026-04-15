import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { productQuery } from '@/sanity/lib/queries'
import { PageBuilder } from '@/components/PageBuilder'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import { buildOgImageUrl, buildAlternates, canonical, stripTitleSuffix } from '@/lib/metadata'
import { JsonLd } from '@/components/JsonLd'
import type { ProductDocument } from '@/types/sanity'

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await client.fetch<ProductDocument | null>(productQuery, {
    slug,
  })

  if (!product) return {}

  const title = product.seoTitle ? stripTitleSuffix(product.seoTitle) : product.title
  const description = product.seoDescription || product.description
  const ogImage = buildOgImageUrl(product.ogImage)

  return {
    title,
    description,
    alternates: buildAlternates(`/${slug}`),
    openGraph: {
      title: title || undefined,
      description: description || undefined,
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630 }] }),
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await client.fetch<ProductDocument | null>(productQuery, {
    slug,
  })

  if (!product) notFound()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://finndoff.no'
  const firstSectionIsHero = product.sections?.[0]?._type === 'hero'

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: `Finndoff ${product.title}`,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          ...(product.description && { description: product.description }),
          offers: product.price
            ? {
                '@type': 'Offer',
                price: product.price,
                priceCurrency: 'NOK',
                priceSpecification: {
                  '@type': 'UnitPriceSpecification',
                  price: product.price,
                  priceCurrency: 'NOK',
                  billingDuration: 'P1M',
                },
              }
            : undefined,
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Hjem',
              item: siteUrl,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: product.title,
              item: canonical(`/${slug}`),
            },
          ],
        }}
      />
      {/* Product header — skjules når første seksjon er en hero (som tar over jobben) */}
      {!firstSectionIsHero && (
      <section className="bg-white pb-8 pt-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          {product.icon && (
            <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-primary-50 p-4">
              <DynamicIcon
                name={product.icon}
                className="h-8 w-8 text-primary-600"
              />
            </div>
          )}
          {product.title && (
            <h1 className="font-display text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
              {product.title}
            </h1>
          )}
          {product.subtitle && (
            <p className="mt-4 text-lg text-navy-600">{product.subtitle}</p>
          )}
          {product.priceLabel && (
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent-50 px-4 py-2 text-sm font-medium text-accent-700">
              {product.isAddon && (
                <span className="rounded-full bg-accent-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide">
                  Tillegg
                </span>
              )}
              {product.priceLabel}
            </div>
          )}
        </div>
      </section>
      )}

      {/* Sections from Sanity */}
      <PageBuilder sections={product.sections} />
    </>
  )
}
