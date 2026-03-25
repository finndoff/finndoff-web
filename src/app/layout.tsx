import type { Metadata } from "next";
import { Roboto, Work_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VisualEditingWrapper } from "@/components/VisualEditingWrapper";
import { LayoutShell } from "@/components/LayoutShell";
import { JsonLd } from "@/components/JsonLd";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://finndoff.no";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Finndoff — Finn og vinn offentlige anbud",
    template: "%s | Finndoff",
  },
  description:
    "Finndoff hjelper norske bedrifter med å finne, forstå og vinne offentlige anbud. Anbudsvarsling, innsikt og AI-drevet anbudshjelp.",
  openGraph: {
    type: "website",
    locale: "nb_NO",
    siteName: "Finndoff",
  },
  twitter: {
    card: "summary_large_image",
  },
};

async function getLogoUrls(): Promise<{ logoUrl: string | null; logoDarkUrl: string | null }> {
  const settings = await client.fetch<{ logo?: { asset?: { _ref: string } }; logoDark?: { asset?: { _ref: string } } } | null>(
    `*[_type == "siteSettings"][0]{ logo, logoDark }`,
    {},
    { next: { revalidate: 3600 } }
  );
  return {
    logoUrl: settings?.logo?.asset ? urlFor(settings.logo).height(80).fit("max").url() : null,
    logoDarkUrl: settings?.logoDark?.asset ? urlFor(settings.logoDark).height(80).fit("max").url() : null,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { logoUrl, logoDarkUrl } = await getLogoUrls();
  return (
    <html lang="no">
      <body
        className={`${roboto.variable} ${workSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Finndoff",
            url: siteUrl,
            logo: `${siteUrl}/icon.png`,
            description:
              "Finndoff hjelper norske bedrifter med å finne, forstå og vinne offentlige anbud.",
            sameAs: [
              "https://www.linkedin.com/company/finndoff",
              "https://www.facebook.com/finndoff",
            ],
            address: {
              "@type": "PostalAddress",
              addressCountry: "NO",
            },
          }}
        />
        <LayoutShell logoUrl={logoUrl} logoDarkUrl={logoDarkUrl}>{children}</LayoutShell>
        <VisualEditingWrapper />
        <Analytics />
        <SpeedInsights />
        {process.env.NEXT_PUBLIC_GA4_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA4_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
