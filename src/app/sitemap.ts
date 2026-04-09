import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { productSlugsQuery, blogPostSlugsQuery } from '@/sanity/lib/queries'
import type { SitemapEntry } from '@/types/sanity'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://finndoff.no'

  const [products, blogPosts] = await Promise.all([
    client.fetch<SitemapEntry[]>(productSlugsQuery),
    client.fetch<SitemapEntry[]>(blogPostSlugsQuery),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/priser`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/om-oss`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/nyheter`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/hjelpesenter`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/personvern`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${siteUrl}/vilkar`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ]

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${siteUrl}/${p.slug}`,
    lastModified: new Date(p._updatedAt),
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${siteUrl}/nyheter/${p.slug}`,
    lastModified: new Date(p._updatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...productRoutes, ...blogRoutes]
}
