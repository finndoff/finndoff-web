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
  _id: "product-konsulent",
  _type: "product",
  title: "Anbudskonsulent",
  slug: { _type: "slug", current: "konsulent" },
  subtitle:
    "Din anbudspartner fra strategi til ferdig tilbud — erfarne fagfolk som hjelper deg vinne.",
  description:
    "Kjernen av anbudspartner-posisjonen. Finndoffs kompetansenettverk kobler deg med erfarne konsulenter som kjenner bransjen og plattformen — folk som kan anbud, ikke bare AI.",
  icon: "users",
  priceLabel: "Etter avtale",
  isAddon: true,
  seoTitle: "Anbudskonsulent — Din partner fra strategi til vinnende tilbud | Finndoff",
  seoDescription:
    "Erfarne anbudskonsulenter som hjelper deg vinne. Strategi, tilbudsskriving og prosessveiledning — kompetanse ingen AI kan erstatte.",
  sections: [
    // 1. Hero
    {
      _type: "hero",
      _key: key(),
      headline: "Din anbudspartner fra strategi til tilbud",
      subheadline:
        "Kunden får ikke bare et verktøy — de får folk som kan anbud. Erfarne konsulenter som hjelper deg vinne, ikke bare levere.",
      primaryCta: {
        text: "Book gratis konsultasjon",
        link: "https://www.tendpro.no/book-et-mote",
      },
      secondaryCta: {
        text: "Kontakt oss",
        link: "/kontakt",
      },
      style: "default",
    },

    // 2. TextSection — intro
    {
      _type: "textSection",
      _key: key(),
      title: "Kompetanse over teknologi",
      content: [
        ...portableText(
          "Vi selger ikke software — vi selger vinnersjanse. Teknologi er verktøyet, men det er kompetanse som vinner anbud. Når du trenger noen som forstår prosessen, kravene og strategien — da trenger du en anbudspartner."
        ),
        ...portableText(
          "Finndoffs kompetansenettverk består av håndplukkede partnere som kjenner bransjen, plattformen og offentlige anskaffelser fra innsiden. De hjelper deg fra første vurdering til ferdig innlevert tilbud — slik at du konkurrerer på faglig kvalitet, ikke bare pris."
        ),
      ],
    },

    // 3. FeatureGrid (2 features, 2 columns) — partnerne
    {
      _type: "featureGrid",
      _key: key(),
      title: "Våre partnere",
      subtitle:
        "Erfarne konsulenter som kjenner plattformen og forstår offentlige anskaffelser.",
      columns: 2,
      features: [
        {
          _key: key(),
          title: "TendPro",
          description:
            "Spesialister på anbudsstrategi, tilbudsskriving, gjennomgang og opplæring. Tilbyr 20 minutters gratis konsultasjon for nye kunder.",
          icon: "award",
        },
        {
          _key: key(),
          title: "Din Anbudshjelp",
          description:
            "Eksperter på tolkning av konkurransegrunnlag, strategisk rådgivning, tilbudsutforming og prosessveiledning fra A til Å.",
          icon: "book-open",
        },
      ],
    },

    // 4. FeatureGrid (3 features, 3 columns) — hvorfor Finndoffs partnere
    {
      _type: "featureGrid",
      _key: key(),
      title: "Hvorfor Finndoffs partnere?",
      subtitle:
        "Ikke hvilke som helst konsulenter — våre partnere er kuratert for kvalitet og kjennskap til plattformen.",
      columns: 3,
      features: [
        {
          _key: key(),
          title: "Kuratert kvalitet",
          description:
            "Vi velger partnere basert på erfaring, kompetanse og dokumenterte resultater innen offentlige anskaffelser.",
          icon: "shield-check",
        },
        {
          _key: key(),
          title: "Kjenner plattformen",
          description:
            "Våre partnere bruker Finndoff daglig og forstår hvordan verktøyene fungerer — de gir råd i kontekst av dine data.",
          icon: "puzzle",
        },
        {
          _key: key(),
          title: "Trygghet og tillit",
          description:
            "Du får en trygg vei inn til profesjonell hjelp, anbefalt av Finndoff — uten risiko og med kvalitetsgaranti.",
          icon: "heart-handshake",
        },
      ],
    },

    // 5. Testimonial
    {
      _type: "testimonial",
      _key: key(),
      quote:
        "Vi har et bevisst forhold til vår rolle som samfunnsbygger. Finndoff hjelper oss å bruke tiden på det vi er best på – å bygge.",
      name: "Tore Killi",
      role: "Daglig leder",
      company: "Brødrene Killi AS",
    },

    // 6. CtaSection
    {
      _type: "ctaSection",
      _key: key(),
      title: "Klar til å vinne ditt neste anbud?",
      description:
        "Book en gratis konsultasjon med TendPro og få en faglig partner på laget — fra strategi til ferdig tilbud.",
      primaryCta: {
        text: "Book gratis konsultasjon",
        link: "https://www.tendpro.no/book-et-mote",
      },
      secondaryCta: {
        text: "Kontakt oss",
        link: "/kontakt",
      },
      style: "brand",
    },
  ],
};

async function seed() {
  console.log("Seeding Konsulent product to Sanity...");

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
      "Konsulent product created/updated successfully (id: product-konsulent)"
    );
  } catch (err) {
    console.error("Failed to seed Konsulent:", err);
    process.exit(1);
  }
}

seed();
