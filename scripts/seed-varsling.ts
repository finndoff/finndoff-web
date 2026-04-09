import { createClient } from "@sanity/client";
import { config } from "dotenv";
import { randomUUID } from "crypto";

config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
});

const key = () => randomUUID().slice(0, 8);

const portableText = (text: string) => [
  {
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  },
];

const product = {
  _id: "product-varsling",
  _type: "product",
  title: "Varsling",
  slug: { _type: "slug", current: "varsling" },
  subtitle:
    "Finn de rette anbudene — vi gjør jobben for deg, basert på fagkompetanse fra hundrevis av bedrifter.",
  description:
    "Finn de rette anbudene, uten støy. Finndoff Varsling kombinerer CPV-koder, nøkkelord og geografiske filtre med ekspertoppsett — så du bruker tid på å vinne anbud, ikke lete etter dem.",
  icon: "bell",
  price: 829,
  priceLabel: "829 kr/mnd",
  isAddon: false,
  seoTitle: "Anbudsvarsling — Finn de rette anbudene med ekspertoppsett | Finndoff",
  seoDescription:
    "Finn de rette anbudene uten støy. Ekspertoppsett, CPV-koder, nøkkelord og geografiske filtre — vi gjør jobben slik at du kan fokusere på å vinne.",
  sections: [
    // 1. Hero
    {
      _type: "hero",
      _key: key(),
      headline: "Finn de rette anbudene — vi gjør jobben for deg",
      subheadline:
        "Ekspertoppsett basert på fagkompetanse fra hundrevis av bedrifter i din bransje. Ikke selvbetjening — vi konfigurerer alt.",
      primaryCta: {
        text: "Prøv gratis",
        link: "https://app.finndoff.no/register",
      },
      secondaryCta: {
        text: "Book møte med Thomas",
        link: "https://meetings-eu1.hubspot.com/thomas-bangstad/finndoff-kundemote",
      },
      style: "default",
    },

    // 2. FeatureGrid (6 features, 3 columns)
    {
      _type: "featureGrid",
      _key: key(),
      title: "Nøkkelfunksjoner",
      subtitle: "Alt du trenger for å finne de rette anbudene — satt opp av eksperter, ikke deg selv.",
      columns: 3,
      features: [
        {
          _key: key(),
          title: "CPV-koder og nøkkelord",
          description:
            "Søk blant 9 000+ CPV-koder, bruk egne nøkkelord, eller kombiner begge for maksimal treffsikkerhet.",
          icon: "search",
        },
        {
          _key: key(),
          title: "Geografisk filtrering",
          description:
            "Filtrer på kommuner og fylker. Automatisk kommunegjenkjenning sørger for at du ikke går glipp av lokale anbud.",
          icon: "map-pin",
        },
        {
          _key: key(),
          title: "Fleksibel leveranse",
          description:
            "Velg mellom visuell og kompakt layout, samlet eller splittet varsling — tilpasset din arbeidsstil.",
          icon: "layout",
        },
        {
          _key: key(),
          title: "Avanserte filtre",
          description:
            "Sett verdigrenser, velg kunngjøringstyper og sorter resultatene slik du ønsker.",
          icon: "sliders-horizontal",
        },
        {
          _key: key(),
          title: "Flere varslingsprofiler",
          description:
            "Opprett ubegrenset antall profiler — én for lokale anbud, én for nasjonale, én per fagområde.",
          icon: "layers",
        },
        {
          _key: key(),
          title: "Mobilvennlig",
          description:
            "Responsivt design, e-post + portal, og dedikert app for iOS og Android — sjekk anbud overalt.",
          icon: "smartphone",
        },
      ],
    },

    // 3. Timeline (6 steps — onboarding)
    {
      _type: "timeline",
      _key: key(),
      title: "Slik kommer du i gang",
      subtitle:
        "Fra oppstart til optimalisert varsling — din anbudspartner hele veien.",
      steps: [
        {
          _key: key(),
          stepNumber: 1,
          title: "Oppstart",
          description:
            "Dag 1–2: Vi setter opp din bedriftsprofil med CPV-koder, nøkkelord og geografiske filtre basert på dine behov.",
          icon: "rocket",
        },
        {
          _key: key(),
          stepNumber: 2,
          title: "Evaluering",
          description:
            "Dag 3–10: Du mottar varslinger og vurderer relevansen. Merk gjerne treff og bom underveis.",
          icon: "clipboard-check",
        },
        {
          _key: key(),
          stepNumber: 3,
          title: "Evalueringsmøte",
          description:
            "Dag 10: Vi gjennomgår resultatene sammen og justerer profilen din for bedre treffsikkerhet.",
          icon: "video",
        },
        {
          _key: key(),
          stepNumber: 4,
          title: "Finjustering",
          description:
            "Dag 10–20: Nye justeringer testes i praksis. Du gir tilbakemelding, vi optimaliserer.",
          icon: "settings",
        },
        {
          _key: key(),
          stepNumber: 5,
          title: "Beslutningsmøte",
          description:
            "Dag 20: Endelig gjennomgang — du bestemmer om Finndoff er riktig for deg, helt uten forpliktelser.",
          icon: "check-circle",
        },
        {
          _key: key(),
          stepNumber: 6,
          title: "Løpende support",
          description:
            "Løpende: Kontinuerlig optimalisering og support — vi sørger for at varslingene alltid treffer.",
          icon: "headphones",
        },
      ],
    },

    // 4. Testimonial
    {
      _type: "testimonial",
      _key: key(),
      quote:
        "Vi har et bevisst forhold til vår rolle som samfunnsbygger. Finndoff hjelper oss å bruke tiden på det vi er best på – å bygge.",
      name: "Tore Killi",
      role: "Daglig leder",
      company: "Brødrene Killi AS",
    },

    // 5. CtaSection
    {
      _type: "ctaSection",
      _key: key(),
      title: "Klar til å finne de rette anbudene?",
      description:
        "Start med en uforpliktende prøveperiode — vi setter opp alt for deg med ekspertise fra hundrevis av bedrifter.",
      primaryCta: {
        text: "Start gratis prøveperiode",
        link: "https://app.finndoff.no/register",
      },
      secondaryCta: {
        text: "Book møte med Thomas",
        link: "https://meetings-eu1.hubspot.com/thomas-bangstad/finndoff-kundemote",
      },
      style: "brand",
    },
  ],
};

async function seed() {
  console.log("Seeding Varsling product to Sanity...");

  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error(
      "Missing SANITY_API_WRITE_TOKEN in .env.local\n" +
        "Create a write token at sanity.io/manage → API → Tokens"
    );
    process.exit(1);
  }

  try {
    await client.createOrReplace(product);
    console.log(
      "Varsling product created/updated successfully (id: product-varsling)"
    );
  } catch (err) {
    console.error("Failed to seed Varsling:", err);
    process.exit(1);
  }
}

seed();
