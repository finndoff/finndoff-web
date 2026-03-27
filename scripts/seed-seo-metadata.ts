import { createClient } from "@sanity/client";
import { config } from "dotenv";

config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
});

// ─── Pages (type: "page") ───────────────────────────────────────────

const pageMetadata: Record<string, { seoTitle: string; seoDescription: string }> = {
  "page-hjem": {
    seoTitle: "Finndoff — Vi hjelper norske bedrifter vinne anbud",
    seoDescription:
      "Den faglige anbudspartneren for norske SMB-er. Kompetanse, teknologi og bransjenettverk — slik at du kan konkurrere med de store og vinne.",
  },
  "page-priser": {
    seoTitle: "Priser — Invester i vinnersjanse fra 829 kr/mnd",
    seoDescription:
      "Fra 829 kr/mnd — rett under 10 000 kr/år. Bygg din anbudspakke med varsling, innsikt, AI-analyse og konsulent. Ingen bindingstid.",
  },
  "page-om-oss": {
    seoTitle: "Om oss — Den faglige anbudspartneren | Finndoff",
    seoDescription:
      "Vi gjør det mulig for norske bedrifter å vinne offentlige anbud. Kompetanse, teknologi og bransjenettverk — møt teamet bak Finndoff.",
  },
};

// ─── Products (type: "product") ─────────────────────────────────────

const productMetadata: Record<string, { seoTitle: string; seoDescription: string }> = {
  "product-varsling": {
    seoTitle: "Anbudsvarsling — Finn de rette anbudene med ekspertoppsett",
    seoDescription:
      "Finn de rette anbudene uten støy. Ekspertoppsett basert på CPV-koder, nøkkelord og geografi — vi gjør jobben slik at du kan fokusere på å vinne.",
  },
  "product-innsikt": {
    seoTitle: "Innsikt — Forstå markedet og kom i posisjon",
    seoDescription:
      "Kom i posisjon før konkurransen starter. Overvåk rammeavtaler, innkjøpsplaner og konkurrenter — strategisk forsprang fra 649 kr/mnd.",
  },
  "product-anbudshjelp-ai": {
    seoTitle: "Anbudshjelp AI — AI som forsterker din kompetanse",
    seoDescription:
      "AI-analyse av konkurransegrunnlag, kvalifiseringssjekk og prosjektplan — på minutter. AI er verktøyet, din kompetanse er det som vinner.",
  },
  "product-konsulent": {
    seoTitle: "Anbudskonsulent — Din partner fra strategi til vinnende tilbud",
    seoDescription:
      "Erfarne anbudskonsulenter som hjelper deg vinne. Strategi, tilbudsskriving og prosessveiledning — kompetanse ingen AI kan erstatte.",
  },
};

// ─── Blog posts (type: "blogPost") ─────────────────────────────────

const blogMetadata: Record<string, { seoTitle: string; seoDescription: string }> = {
  "blog-komme-i-gang-anbud": {
    seoTitle: "Slik vinner du ditt første offentlige anbud",
    seoDescription:
      "Alt du trenger å vite for å finne og vinne offentlige anbud. Steg-for-steg guide fra Finndoffs anbudseksperter.",
  },
  "blog-5-tips-varsling": {
    seoTitle: "5 tips for å vinne flere anbud med riktig varsling",
    seoDescription:
      "Lær hvordan ekspertoppsett av anbudsvarsler gir deg de rette anbudene. Praktiske tips fra Finndoffs fagfolk.",
  },
  "blog-lansering-anbudshjelp-ai": {
    seoTitle: "Anbudshjelp AI — AI som forsterker din kompetanse",
    seoDescription:
      "Finndoff lanserer AI-drevet anbudsanalyse. AI er verktøyet — din fagkompetanse er det som vinner.",
  },
};

// ─── Run ────────────────────────────────────────────────────────────

async function seed() {
  console.log("Seeding SEO metadata (seoTitle + seoDescription)...\n");

  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error("Missing SANITY_API_WRITE_TOKEN in .env.local");
    process.exit(1);
  }

  const allEntries = [
    ...Object.entries(pageMetadata),
    ...Object.entries(productMetadata),
    ...Object.entries(blogMetadata),
  ];

  for (const [docId, { seoTitle, seoDescription }] of allEntries) {
    try {
      const doc = await client.getDocument(docId);
      if (!doc) {
        console.log(`  ⚠ ${docId} — not found, skipping`);
        continue;
      }

      await client
        .patch(docId)
        .set({ seoTitle, seoDescription })
        .commit();

      const titleLen = seoTitle.length;
      const descLen = seoDescription.length;
      console.log(
        `  ✓ ${docId} — title: ${titleLen} chars, desc: ${descLen} chars`
      );
    } catch (err: any) {
      console.error(`  ✗ ${docId}: ${err.message}`);
    }
  }

  console.log("\nDone! All SEO metadata seeded.");
  console.log(
    "\nNext steps:\n" +
      "  1. Review & tweak in Sanity Studio (under 'SEO' on each document)\n" +
      "  2. Upload OG-bilder (1200×630 px) per side + defaultOgImage i siteSettings\n" +
      "  3. Set NEXT_PUBLIC_SITE_URL=https://finndoff.no in Vercel env vars\n"
  );
}

seed();
