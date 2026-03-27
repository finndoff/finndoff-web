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
  _id: "product-anbudshjelp-ai",
  _type: "product",
  title: "Anbudshjelp AI",
  slug: { _type: "slug", current: "anbudshjelp-ai" },
  subtitle:
    "AI som forsterker din kompetanse — fra dokumentanalyse til prosjektplan på minutter.",
  description:
    "Anbudshjelp AI er verktøyet, ikke produktet. Den analyserer konkurransegrunnlag, sjekker kvalifikasjonskrav og lager en prosjektplan — slik at du kan bruke tiden på det som vinner anbud: faglig kvalitet.",
  icon: "bot",
  price: 1499,
  priceLabel: "+1 499 kr/mnd",
  isAddon: true,
  seoTitle: "Anbudshjelp AI — AI som forsterker din kompetanse | Finndoff",
  seoDescription:
    "AI-analyse av konkurransegrunnlag, kvalifiseringssjekk og prosjektplan — på minutter. AI er verktøyet, din kompetanse er det som vinner.",
  sections: [
    // 1. Hero
    {
      _type: "hero",
      _key: key(),
      headline: "AI som forsterker din kompetanse",
      subheadline:
        "Fra timer til minutter — AI analyserer konkurransegrunnlaget slik at du kan fokusere på det som vinner: faglig kvalitet i tilbudet.",
      primaryCta: {
        text: "Prøv gratis",
        link: "https://app.finndoff.no/register",
      },
      secondaryCta: {
        text: "Book demo med Daniel",
        link: "https://meetings-eu1.hubspot.com/daniel-dalsborg",
      },
      style: "default",
    },

    // 2. ComparisonTable
    {
      _type: "comparisonTable",
      _key: key(),
      title: "AI + fagkompetanse = bedre beslutninger",
      subtitle:
        "AI er verktøyet, ikke produktet. Se hvordan AI-analyse kombinert med din kompetanse gir bedre resultater.",
      columns: [
        { _key: key(), name: "Uten AI", highlighted: false },
        { _key: key(), name: "Med Finndoff AI", highlighted: true },
      ],
      rows: [
        {
          _key: key(),
          feature: "Lese dokumenter",
          values: [
            "Timer med manuell gjennomgang",
            "AI leser og oppsummerer på sekunder",
          ],
        },
        {
          _key: key(),
          feature: "Forstå krav",
          values: [
            "Lett å overse viktige detaljer",
            "Automatisk sjekkliste over alle krav",
          ],
        },
        {
          _key: key(),
          feature: "Kvalifiseringssjekk",
          values: [
            "Usikker på om du kvalifiserer",
            "Umiddelbar sjekk mot kravene",
          ],
        },
        {
          _key: key(),
          feature: "Bid/no-bid",
          values: [
            "Magefølelse og gjetting",
            "Datadrevet anbefaling med begrunnelse",
          ],
        },
        {
          _key: key(),
          feature: "Prosjektplan",
          values: [
            "Starter fra scratch hver gang",
            "AI-generert fremdriftsplan med milepæler",
          ],
        },
        {
          _key: key(),
          feature: "Nedlasting av dokumenter",
          values: [
            "Manuelt fra Doffin/TED",
            "Automatisk nedlasting og organisering",
          ],
        },
        {
          _key: key(),
          feature: "Tidsbruk per anbud",
          values: [
            "3–5 timer på vurdering",
            "15–30 minutter med full oversikt",
          ],
        },
      ],
    },

    // 3. FeatureGrid (6 features, 3 columns)
    {
      _type: "featureGrid",
      _key: key(),
      title: "Seks funksjoner som forsterker din kompetanse",
      subtitle: "AI gjør deg raskere — din fagkunnskap gjør deg til en vinner",
      columns: 3,
      features: [
        {
          _key: key(),
          title: "Automatisk nedlasting",
          description:
            "Alle dokumenter fra konkurransegrunnlaget lastes ned og organiseres automatisk — klar til gjennomgang.",
          icon: "download",
        },
        {
          _key: key(),
          title: "Kvalifiseringssjekk",
          description:
            "AI sjekker automatisk om din bedrift oppfyller kvalifikasjonskravene og gir deg en klar oversikt.",
          icon: "shield-check",
        },
        {
          _key: key(),
          title: "AI-analyse",
          description:
            "Konkurransegrunnlaget analyseres og oppsummeres — du får de viktigste punktene uten å lese alt selv.",
          icon: "brain",
        },
        {
          _key: key(),
          title: "Oppgaveplan",
          description:
            "AI genererer en fremdriftsplan med milepæler og frister tilpasset anbudets krav og tidslinje.",
          icon: "list-checks",
        },
        {
          _key: key(),
          title: "Bid/No-bid (Kommer)",
          description:
            "Datadrevet anbefaling om du bør gi tilbud, basert på kvalifikasjonskrav, konkurranse og din kapasitet.",
          icon: "scale",
        },
        {
          _key: key(),
          title: "Gjenbruk (Kommer)",
          description:
            "Gjenbruk tekst og dokumenter fra tidligere tilbud. AI matcher relevante avsnitt til nye krav.",
          icon: "recycle",
        },
      ],
    },

    // 4. Timeline (5 steps)
    {
      _type: "timeline",
      _key: key(),
      title: "Slik fungerer det",
      subtitle:
        "Fra varsel til ferdig prosjektplan — AI gjør grunnarbeidet slik at du kan fokusere på strategi og faglig kvalitet.",
      steps: [
        {
          _key: key(),
          stepNumber: 1,
          title: "Anbudsvarsel",
          description:
            "Du mottar et relevant anbudsvarsel og åpner anbudet i Finndoff.",
          icon: "bell",
        },
        {
          _key: key(),
          stepNumber: 2,
          title: "Automatisk nedlasting",
          description:
            "Alle dokumenter fra konkurransegrunnlaget lastes ned og organiseres automatisk.",
          icon: "download",
        },
        {
          _key: key(),
          stepNumber: 3,
          title: "Kvalifiseringssjekk",
          description:
            "AI sjekker kvalifikasjonskravene mot din bedriftsprofil og gir deg en klar anbefaling.",
          icon: "shield-check",
        },
        {
          _key: key(),
          stepNumber: 4,
          title: "AI-analyse",
          description:
            "Konkurransegrunnlaget analyseres — du får en oppsummering av krav, tildelingskriterier og viktige frister.",
          icon: "brain",
        },
        {
          _key: key(),
          stepNumber: 5,
          title: "Prosjektplan",
          description:
            "AI genererer en fremdriftsplan med oppgaver, milepæler og frister du kan følge til tilbudsfristen.",
          icon: "list-checks",
        },
      ],
    },

    // 5. TextSection
    {
      _type: "textSection",
      _key: key(),
      title: "Prosjektverktøy for tilbudsarbeidet",
      content: [
        ...portableText(
          "Anbudshjelp AI gir deg ikke bare analyse — den gir deg et komplett prosjektverktøy for tilbudsarbeidet. Fremdriftsplanen inkluderer en tidslinje med milepæler, en anbudstavle for oppgavestyring, og oversikt over alle frister."
        ),
        ...portableText(
          "Du kan dele prosjektet med kolleger, tildele oppgaver og følge fremdriften i sanntid. Alt er koblet til det opprinnelige konkurransegrunnlaget, slik at du alltid har konteksten du trenger."
        ),
      ],
    },

    // 6. Testimonial
    {
      _type: "testimonial",
      _key: key(),
      quote:
        "Vi har et bevisst forhold til vår rolle som samfunnsbygger. Finndoff hjelper oss å bruke tiden på det vi er best på – å bygge.",
      name: "Tore Killi",
      role: "Daglig leder",
      company: "Brødrene Killi AS",
    },

    // 7. FaqAccordion
    {
      _type: "faqAccordion",
      _key: key(),
      title: "Ofte stilte spørsmål om Anbudshjelp AI",
      items: [
        {
          _key: key(),
          question: "Hva er Anbudshjelp AI?",
          answer: portableText(
            "Anbudshjelp AI er et AI-drevet verktøy som automatisk analyserer konkurransegrunnlag, sjekker kvalifikasjonskrav og lager en prosjektplan for tilbudsarbeidet. Det er en tilleggsmodul til Finndoff Varsling."
          ),
        },
        {
          _key: key(),
          question: "Hva koster Anbudshjelp AI?",
          answer: portableText(
            "Anbudshjelp AI koster 1 499 kr/mnd som tillegg til Varsling (829 kr/mnd). Du trenger altså Varsling som grunnpakke for å bruke Anbudshjelp AI."
          ),
        },
        {
          _key: key(),
          question: "Hvilke dokumenter kan AI-en analysere?",
          answer: portableText(
            "AI-en analyserer alle vanlige dokumentformater i konkurransegrunnlag, inkludert PDF, Word og Excel. Den håndterer både norske og engelske dokumenter."
          ),
        },
        {
          _key: key(),
          question: "Hvor lang tid tar en analyse?",
          answer: portableText(
            "En typisk analyse tar 1–3 minutter, avhengig av størrelsen på konkurransegrunnlaget. Sammenlignet med 3–5 timer manuelt arbeid er det en betydelig tidsbesparelse."
          ),
        },
        {
          _key: key(),
          question: "Kan jeg stole på AI-analysen?",
          answer: portableText(
            "AI-analysen er et kraftig hjelpemiddel som gir deg en rask oversikt og sjekkliste. Vi anbefaler alltid å gjøre en endelig gjennomgang selv — AI-en erstatter ikke faglig skjønn, men gjør deg mye raskere."
          ),
        },
        {
          _key: key(),
          question: "Hva er bid/no-bid-funksjonen?",
          answer: portableText(
            "Bid/no-bid er en kommende funksjon som gir deg en datadrevet anbefaling om du bør gi tilbud på et anbud, basert på kvalifikasjonskrav, konkurransesituasjon og din kapasitet."
          ),
        },
      ],
    },

    // 8. CtaSection
    {
      _type: "ctaSection",
      _key: key(),
      title: "Klar til å la AI forsterke din kompetanse?",
      description:
        "Prøv Anbudshjelp AI gratis. Fra timer til minutter på analyse — slik at du kan bruke tiden på det som faktisk vinner anbud.",
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
      "Anbudshjelp AI product created/updated successfully (id: product-anbudshjelp-ai)"
    );
  } catch (err) {
    console.error("Failed to seed Anbudshjelp AI:", err);
    process.exit(1);
  }
}

seed();
