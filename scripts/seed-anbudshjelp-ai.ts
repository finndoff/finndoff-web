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

// Produktbilde lastet opp via Sanity Studio
const PRODUCT_IMAGE =
  "image-c3e4072535dbbb80adf5f1c6d9ffab621fa3b398-4340x2860-png";

const product = {
  _id: "product-anbudshjelp-ai",
  _type: "product",
  title: "Anbudshjelp AI",
  slug: { _type: "slug", current: "anbudshjelp-ai" },
  subtitle:
    "Les 2000 sider på 15 minutter. Få sjekkliste over alle krav. Vit om du kvalifiserer før du bruker en time.",
  description:
    "Anbudshjelp AI analyserer konkurransegrunnlag, sjekker kvalifikasjonskrav og lager prosjektplan — slik at du kan bruke tiden på det som vinner anbud: faglig kvalitet i tilbudet.",
  icon: "bot",
  price: 1499,
  priceLabel: "+1 499 kr/mnd",
  isAddon: true,
  seoTitle: "Anbudshjelp AI — Les tusenvis av sider på minutter | Finndoff",
  seoDescription:
    "AI-analyse av konkurransegrunnlag, kvalifiseringssjekk og prosjektplan — på minutter i stedet for timer. Tilleggsmodul til Finndoff Varsling.",
  sections: [
    // ── 1. HERO — med screenshot og proof row ────────────────────────────
    {
      _type: "hero",
      _key: key(),
      headline: "Du bygger. Vi leser anbudsdokumentene.",
      subheadline:
        "Anbudshjelp AI leser tusenvis av sider på minutter, sjekker om du kvalifiserer og lager en prosjektplan — slik at du kan bruke tiden på det du er best på.",
      primaryCta: {
        text: "Prøv gratis — vi setter opp alt",
        link: "https://app.finndoff.no/register",
      },
      secondaryCta: {
        text: "Book demo med Daniel",
        link: "https://meetings-eu1.hubspot.com/daniel-dalsborg",
      },
      image: {
        _type: "image",
        asset: { _type: "reference", _ref: PRODUCT_IMAGE },
        alt: "Anbudshjelp AI — go/no-go anbefaling med kvalifiseringssjekk og prosjektplan",
      },
      deviceFrame: "none",
      stats: [
        { _key: key(), value: "15 min", label: "i stedet for 3–5 timer" },
        { _key: key(), value: "2000+", label: "sider analysert automatisk" },
        { _key: key(), value: "1 499,-", label: "kr/mnd som tillegg" },
      ],
      style: "dark",
    },

    // ── 2. HVEM ER DETTE FOR — gjenkjenning for MEF-folk ────────────────
    {
      _type: "featureGrid",
      _key: key(),
      title: "Laget for deg som leverer — ikke for de som sitter på kontoret",
      subtitle:
        "Du har ikke en anbudsavdeling. Du har en daglig leder som jobber 12-timers dager og leser anbudsdokumenter på kvelden. Anbudshjelp AI gjør den jobben for deg.",
      columns: 3,
      features: [
        {
          _key: key(),
          title: "Entreprenører og håndverkere",
          description:
            "Du vinner jobber på kvalitet og erfaring — ikke på å lese 200 sider med kravspesifikasjoner. AI gjør grunnarbeidet, du tar beslutningen.",
          icon: "hard-hat",
        },
        {
          _key: key(),
          title: "Små team, store ambisjoner",
          description:
            "Når hele firmaet er 5–15 folk, har du ikke tid til å bruke en uke på hvert anbud. Med AI er vurderingen klar på en kaffekopp.",
          icon: "users",
        },
        {
          _key: key(),
          title: "Første gang på anbud?",
          description:
            "AI gir deg en sjekkliste over alle krav, forteller deg hva du trenger, og lager en plan du kan følge steg for steg. Du trenger ikke ha gjort dette før.",
          icon: "rocket",
        },
      ],
    },

    // ── 3. SLIK FUNGERER DET — timeline ──────────────────────────────────
    {
      _type: "timeline",
      _key: key(),
      title: "Fra varsel til ferdig plan — på 15 minutter",
      subtitle:
        "AI gjør grunnarbeidet. Du tar beslutningen.",
      steps: [
        {
          _key: key(),
          stepNumber: 1,
          title: "Du får et varsel",
          description:
            "Et relevant anbud dukker opp i innboksen din. Du åpner det i Finndoff.",
          icon: "bell",
        },
        {
          _key: key(),
          stepNumber: 2,
          title: "AI laster ned alt",
          description:
            "Alle dokumenter fra konkurransegrunnlaget lastes ned og organiseres automatisk. Ingen manuell leting.",
          icon: "download",
        },
        {
          _key: key(),
          stepNumber: 3,
          title: "Kvalifiseringssjekk",
          description:
            "AI sjekker kravene mot din bedrift og gir deg en klar anbefaling: kvalifisert eller ikke — med begrunnelse.",
          icon: "shield-check",
        },
        {
          _key: key(),
          stepNumber: 4,
          title: "Oppsummering og analyse",
          description:
            "Du får de viktigste punktene: krav, tildelingskriterier, frister og fallgruver — uten å lese alt selv.",
          icon: "brain",
        },
        {
          _key: key(),
          stepNumber: 5,
          title: "Ferdig prosjektplan",
          description:
            "AI lager en fremdriftsplan med oppgaver, milepæler og frister du kan følge helt til innlevering.",
          icon: "list-checks",
        },
      ],
    },

    // ── 4. FEATURES — 6 funksjoner ──────────────────────────────────────
    {
      _type: "featureGrid",
      _key: key(),
      title: "Alt du trenger for å vurdere og vinne",
      subtitle:
        "Seks funksjoner som sparer deg timer på hvert eneste anbud",
      columns: 3,
      features: [
        {
          _key: key(),
          title: "Automatisk nedlasting",
          description:
            "Alle dokumenter fra konkurransegrunnlaget organiseres og gjøres klare — ingen manuell leting på Doffin.",
          icon: "download",
        },
        {
          _key: key(),
          title: "Kvalifiseringssjekk",
          description:
            "Oppfyller du kravene? AI sjekker og gir deg svar med begrunnelse — før du investerer en eneste time.",
          icon: "shield-check",
        },
        {
          _key: key(),
          title: "AI-analyse av dokumenter",
          description:
            "Tusenvis av sider lest og oppsummert. Du får det som er viktig: krav, kriterier, frister og risiko.",
          icon: "brain",
        },
        {
          _key: key(),
          title: "Prosjektplan med milepæler",
          description:
            "Fra analyse til innlevering — AI lager en fremdriftsplan med oppgaver og frister tilpasset anbudet.",
          icon: "list-checks",
        },
        {
          _key: key(),
          title: "Go/no-go anbefaling",
          description:
            "Datadrevet anbefaling om du bør gi tilbud, basert på krav, konkurranse og din kapasitet.",
          icon: "scale",
        },
        {
          _key: key(),
          title: "Del med teamet",
          description:
            "Del prosjektet med kolleger, tildel oppgaver og følg fremdriften. Alt koblet til konkurransegrunnlaget.",
          icon: "share-2",
        },
      ],
    },

    // ── 5. COMPARISON — uten AI vs med AI ────────────────────────────────
    {
      _type: "comparisonTable",
      _key: key(),
      title: "Tirsdag kveld, klokken 22",
      subtitle:
        "Du sitter med en anbudsfrist om 10 dager og et konkurransegrunnlag på 300 sider. Forskjellen?",
      columns: [
        { _key: key(), name: "Uten AI", highlighted: false },
        { _key: key(), name: "Med Anbudshjelp AI", highlighted: true },
      ],
      rows: [
        {
          _key: key(),
          feature: "Lese dokumentene",
          values: [
            "3–5 timer manuell gjennomgang",
            "15 minutter — AI oppsummerer det viktigste",
          ],
        },
        {
          _key: key(),
          feature: "Forstå alle krav",
          values: [
            "Lett å overse detaljer i 300 sider",
            "Komplett sjekkliste over alle krav",
          ],
        },
        {
          _key: key(),
          feature: "Kvalifiserer vi?",
          values: [
            "Usikker — bruker tid på å finne ut",
            "Svar med begrunnelse på minutter",
          ],
        },
        {
          _key: key(),
          feature: "Bør vi levere tilbud?",
          values: [
            "Magefølelse",
            "Datadrevet anbefaling",
          ],
        },
        {
          _key: key(),
          feature: "Prosjektplan",
          values: [
            "Starter fra scratch",
            "Ferdig plan med milepæler og frister",
          ],
        },
        {
          _key: key(),
          feature: "Kvelden din",
          values: [
            "Dokumentlesing til midnatt",
            "Hjemme til middag",
          ],
        },
      ],
    },

    // ── 6. TESTIMONIAL ───────────────────────────────────────────────────
    {
      _type: "testimonial",
      _key: key(),
      quote:
        "Vi har et bevisst forhold til vår rolle som samfunnsbygger. Finndoff hjelper oss å bruke tiden på det vi er best på – å bygge.",
      name: "Tore Killi",
      role: "Daglig leder",
      company: "Brødrene Killi AS",
    },

    // ── 7. CTA ───────────────────────────────────────────────────────────
    {
      _type: "ctaSection",
      _key: key(),
      title: "Klar til å bruke kveldene på noe annet enn dokumentlesing?",
      description:
        "Prøv Anbudshjelp AI gratis. Vi setter opp alt — du trenger bare 30 minutter.",
      primaryCta: {
        text: "Start gratis prøveperiode",
        link: "https://app.finndoff.no/register",
      },
      secondaryCta: {
        text: "Book demo med Daniel",
        link: "https://meetings-eu1.hubspot.com/daniel-dalsborg",
      },
      style: "brand",
    },
  ],
};

async function seed() {
  console.log("Seeding Anbudshjelp AI product to Sanity...");

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
      "✅ Anbudshjelp AI oppdatert (id: product-anbudshjelp-ai)"
    );
    console.log("\n📋 Seksjoner (7):");
    console.log("   1. Hero (screenshot + proof row: 15min/2000+/1499,-)");
    console.log("   2. Hvem er dette for (3 målgrupper)");
    console.log("   3. Slik fungerer det (5-stegs timeline)");
    console.log("   4. Funksjoner (6 features)");
    console.log("   5. Comparison (uten AI vs med AI)");
    console.log("   6. Testimonial");
    console.log("   7. Slutt-CTA");
  } catch (err) {
    console.error("Failed to seed Anbudshjelp AI:", err);
    process.exit(1);
  }
}

seed();
