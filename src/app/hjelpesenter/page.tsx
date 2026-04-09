import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { faqsQuery } from '@/sanity/lib/queries'
import { JsonLd } from '@/components/JsonLd'
import { buildAlternates, portableTextToPlain } from '@/lib/metadata'
import { HjelpesenterPage } from '@/components/HjelpesenterPage'
import type { FaqDocument } from '@/types/sanity'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Hjelpesenter',
  description:
    'Få svar på vanlige spørsmål om Finndoff: søkeprofiler, varslinger, CPV-koder, brukere, abonnement, faktura og mer.',
  alternates: buildAlternates('/hjelpesenter'),
  openGraph: {
    title: 'Hjelpesenter — Finndoff',
    description:
      'Få svar på vanlige spørsmål om Finndoff: søkeprofiler, varslinger, CPV-koder, brukere, abonnement, faktura og mer.',
  },
}

export default async function Hjelpesenter() {
  const faqs = await client.fetch<FaqDocument[]>(faqsQuery)

  return (
    <>
      {faqs.length > 0 && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: portableTextToPlain(faq.answer),
              },
            })),
          }}
        />
      )}
      <HjelpesenterPage faqs={faqs} />
    </>
  )
}
