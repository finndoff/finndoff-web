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

// App-screenshot: Anbudshjelp AI go/no-go beslutningsskjerm
const HERO_IMAGE = "image-d7bfc69cdb19d8fd3f31cdb85639a20711534841-4340x2860-png";

const homepage = {
  _id: "page-hjem",
  _type: "page",
  title: "Hjem",
  slug: { _type: "slug", current: "hjem" },
  seoTitle: "Finndoff — Vi hjelper norske bedrifter vinne anbud",
  seoDescription:
    "Finndoff er den faglige anbudspartneren for norske SMB-er. Kompetanse, teknologi og bransjenettverk — slik at du kan konkurrere med de store og vinne.",
  sections: [

    // ── 1. HERO ───────────────────────────────────────────────────────────
    // Stitch S2-inspirert: fokusert hero uten søkefelt, stort screenshot
    {
      _type: "hero",
      _key: key(),
      headline: "Vinn flere anbud med Finndoff på laget",
      subheadline:
        "Finndoff kombinerer anbudskompetanse, AI og bransjedata slik at små og mellomstore bedrifter finner de rette anbudene, prioriterer smartere og leverer bedre tilbud.",
      showSearchBar: false,
      primaryCta: {
        text: "Prøv gratis — vi setter opp alt",
        link: "https://finndoff.no/signup",
      },
      secondaryCta: {
        text: "Se hvordan det fungerer",
        link: "#slik-fungerer-det",
      },
      stats: [
        { _key: key(), value: "835 mrd.", label: "kr i offentlige anbud årlig" },
        { _key: key(), value: "1 500+", label: "bedrifter satt opp av eksperter" },
        { _key: key(), value: "~90 %", label: "velger å fortsette" },
      ],
      image: {
        _type: "image",
        asset: { _type: "reference", _ref: HERO_IMAGE },
        alt: "Anbudshjelp AI — go/no-go anbefaling basert på bedriftens data og historikk",
      },
      deviceFrame: "none",
      style: "default",
    },

    // ── 2. TRUST BAR — rett etter hero (S7) ──────────────────────────────
    // Bransjeforeninger først, deretter kunder
    {
      _type: "trustBar",
      _key: key(),
      title: "Stolt samarbeidspartner med norske bransjeforeninger og bedrifter",
      style: "scrolling",
      logos: [
        "MEF",
        "Byggmesterforbundet",
        "NESO",
        "Arkitektbedriftene",
        "Brødrene Dahl",
        "Vivende",
        "ALV",
        "DHL",
        "BIRKsport",
        "Dignio",
        "HD Medical",
        "GP Gruppen",
        "NINA",
        "Taraldsvik",
        "JobZone",
        "Medicus",
      ].map((name) => ({ _key: key(), name })),
    },

    // ── 3. MENNESKE + MASKIN (S2) ────────────────────────────────────────
    // Mørk seksjon som bryter opp de lyse — visualiserer hybrid-modellen
    {
      _type: "featureGrid",
      _key: key(),
      style: "dark",
      title: "Menneske + Maskin = Bedre anbudsresultater",
      subtitle:
        "Vi selger ikke software — vi selger vinnersjanse. Teknologi er verktøyet, kompetanse er produktet.",
      columns: 3,
      features: [
        {
          _key: key(),
          title: "Vi setter opp varslingen for deg",
          description:
            "Ekspertene våre konfigurerer søkeprofilen din basert på erfaring fra hundrevis av bedrifter. Du slipper støy og får kun relevante anbud — fra dag én.",
          icon: "bell",
        },
        {
          _key: key(),
          title: "Vi hjelper deg prioritere riktig",
          description:
            "Forstå oppdragsgiver, konkurrenter og marked før du bestemmer deg. AI og markedsinnsikt gir deg forspranget du trenger.",
          icon: "target",
        },
        {
          _key: key(),
          title: "Vi forsterker teamet ditt når det trengs",
          description:
            "Bruk AI til dokumentanalyse og prosjektplan på minutter. Eller koble på erfarne anbudskonsulenter når tilbudet skal vinnes.",
          icon: "users",
        },
      ],
    },

    // ── 4. PRODUKTER 2x2 (S3) ────────────────────────────────────────────
    // Visuelt differensierte produktkort — Anbudshjelp AI fremhevet som flaggskip
    {
      _type: "featureGrid",
      _key: key(),
      title: "Våre verktøy",
      subtitle: "Alt du trenger for en effektiv anbudsprosess — fra varsling til ferdig tilbud.",
      columns: 2,
      features: [
        {
          _key: key(),
          title: "Varsling",
          description:
            "Motta skreddersydde e-poster med kun relevante anbud. Ingen støy, bare muligheter. Ekspertoppsett av søkeprofil inkludert.",
          icon: "bell",
          link: "/varsling",
          variant: "default",
        },
        {
          _key: key(),
          title: "Innsikt",
          description:
            "Se hvem konkurrentene dine vinner mot, og til hvilken pris. Overvåk rammeavtaler, innkjøpsplaner og oppdragsgivere.",
          icon: "bar-chart-2",
          link: "/innsikt",
          variant: "default",
        },
        {
          _key: key(),
          title: "Anbudshjelp AI",
          description:
            "AI som forsterker din kompetanse — les tusenvis av sider med anbudsdokumenter på sekunder, få kvalifiseringssjekk og prosjektplan på minutter.",
          icon: "bot",
          link: "/anbudshjelp-ai",
          variant: "highlighted",
        },
        {
          _key: key(),
          title: "Konsulent",
          description:
            "Få personlig hjelp av erfarne anbudskonsulenter. Fra strategi til ferdig tilbud — din partner hele veien. Fra 990,-/mnd.",
          icon: "users",
          link: "/konsulent",
          variant: "muted",
        },
      ],
    },

    // ── 5. COMPARISON TABLE ──────────────────────────────────────────────
    {
      _type: "comparisonTable",
      _key: key(),
      title: "Hvorfor Finndoff vinner",
      subtitle:
        "I et marked delt mellom en dyr gigant og rene AI-utfordrere tar Finndoff posisjonen som den faglige anbudspartneren.",
      columns: [
        { _key: key(), name: "Finndoff", highlighted: true },
        { _key: key(), name: "Mercell", highlighted: false },
        { _key: key(), name: "Cobrief", highlighted: false },
      ],
      rows: [
        { _key: key(), feature: "Posisjon", values: ["Faglig anbudspartner", "Infrastruktur-monopolet", "AI-autopiloten"] },
        { _key: key(), feature: "Ekspertoppsett av søkeprofil", values: ["true", "false", "false"] },
        { _key: key(), feature: "Bransjepartnerskaper (MEF, NESO m.fl.)", values: ["true", "false", "false"] },
        { _key: key(), feature: "Anbudskonsulenter", values: ["true", "false", "Kun AI"] },
        { _key: key(), feature: "AI-analyse av dokumenter", values: ["true", "Begrenset", "true"] },
        { _key: key(), feature: "Markedsinnsikt", values: ["true", "true", "Tillegg"] },
        { _key: key(), feature: "Pris fra", values: ["829 kr/mnd", "1 000+ kr/mnd", "Gratis (begrenset)"] },
        { _key: key(), feature: "Bygget for", values: ["Norske SMB-er", "Enterprise", "Alle med AI"] },
      ],
    },

    // ── 6. TESTIMONIALS ──────────────────────────────────────────────────
    {
      _type: "testimonialGrid",
      _key: key(),
      title: "Hva kundene våre sier",
      subtitle: "Hundrevis av norske bedrifter stoler på Finndoff som sin anbudspartner.",
      items: [
        {
          _key: key(),
          quote:
            "Vi har et bevisst forhold til vår rolle som samfunnsbygger. Finndoff hjelper oss å bruke tiden på det vi er best på – å bygge.",
          name: "Tore Killi",
          role: "Daglig leder",
          company: "Brødrene Killi AS",
        },
        {
          _key: key(),
          quote:
            "Vi liker Finndoff anbudsvarsling fordi det er en rimelig tjeneste med god presisjon. Vi vet at det er mennesker med høy kompetanse om offentlige anskaffelser og teknologi som står bak. Vi har maksimal tid til å gjøre tilbud ferdig i god tid før fristen.",
          name: "Kenneth Kuraas",
          role: "Markedssjef",
          company: "Kuraas AS",
        },
        {
          _key: key(),
          quote:
            "I denne bransjen er folk ofte praktisk anlagt — vi har ikke alltid tid til å sette oss inn i kompliserte systemer. Finndoff sine e-poster er enkle å lese, med fargekoder og tydelig oppsett. Dere har vært veldig imøtekommende hele veien.",
          name: "Jo Leander Paulsen",
          role: "Ingeniør",
          company: "Nesna Maskinstasjon",
        },
      ],
    },

    // ── 7. FAQ ───────────────────────────────────────────────────────────
    // Oppdatert med mer bransjespesifikke spørsmål
    {
      _type: "faqAccordion",
      _key: key(),
      title: "Ofte stilte spørsmål",
      items: [
        {
          _key: key(),
          question: "Hva er Finndoff?",
          answer: portableText(
            "Finndoff er den faglige anbudspartneren for norske SMB-er. Vi kombinerer fagkompetanse, AI-teknologi og bransjenettverk for å hjelpe deg vinne offentlige anbud — ikke bare finne dem."
          ),
        },
        {
          _key: key(),
          question: "Hva koster det?",
          answer: portableText(
            "Varsling starter på 829 kr/mnd — rett under 10 000 kr/år. Du kan legge til Innsikt (+649 kr/mnd) og Anbudshjelp AI (+1 499 kr/mnd) etter behov. Ingen bindingstid. Alle pakker inkluderer 2 brukere."
          ),
        },
        {
          _key: key(),
          question: "Trenger jeg å sette opp noe selv?",
          answer: portableText(
            "Nei. I motsetning til selvbetjeningsverktøy og generisk AI setter våre eksperter opp alt for deg. Vi konfigurerer søkeprofilen basert på erfaring fra hundrevis av bedrifter i din bransje. Du trenger bare 30 minutter til et oppstartsmøte."
          ),
        },
        {
          _key: key(),
          question: "Hva gjør Finndoff annerledes enn Mercell og Cobrief?",
          answer: portableText(
            "Mercell er den dyre giganten laget for enterprise. Cobrief er en AI-autopilot uten faglig dybde. Finndoff er den faglige anbudspartneren — vi kombinerer ekspertoppsett, AI-verktøy, anbudskonsulenter og bransjeforeningspartnerskap. Ingen andre har denne kombinasjonen."
          ),
        },
        {
          _key: key(),
          question: "Hva om vi aldri har levert anbud før?",
          answer: portableText(
            "Da er du i godt selskap — mange av kundene våre starter nettopp der. Vi hjelper deg fra første steg: setter opp varsling tilpasset din bransje, og ved behov kobler vi deg med erfarne anbudskonsulenter som hjelper med alt fra kvalifisering til ferdig tilbud."
          ),
        },
        {
          _key: key(),
          question: "Kan jeg prøve gratis?",
          answer: portableText(
            "Ja! Vi tilbyr en gratis prøveperiode der vi setter opp en ekspertkonfigurert søkeprofil for din bedrift. Ingen bindingstid, ingen kredittkort — og vi gjør alt oppsettet for deg."
          ),
        },
        {
          _key: key(),
          question: "Er Finndoff kun for bygg og anlegg?",
          answer: portableText(
            "Nei — Finndoff brukes av bedrifter i mange bransjer, fra kjøttindustri og helsesektoren til IT og rådgivning. Bygg og anlegg er vårt kjernesegment med sterke bransjeforeningspartnerskap (MEF, NESO, Byggmesterforbundet), men vi hjelper alle som leverer til offentlig sektor."
          ),
        },
      ],
    },

    // ── 8. SLUTT-CTA ────────────────────────────────────────────────────
    {
      _type: "ctaSection",
      _key: key(),
      title: "Klar til å vinne ditt neste anbud?",
      description:
        "Med Finndoff på laget har du kompetanse, teknologi og bransjenettverk i ryggen. Start med en gratis prøveperiode.",
      primaryCta: {
        text: "Prøv gratis — vi setter opp alt",
        link: "https://finndoff.no/signup",
      },
      secondaryCta: {
        text: "Se priser",
        link: "/priser",
      },
      style: "brand",
    },
  ],
};

async function seed() {
  console.log("🌱 Seeder omstrukturert hjemmeside til Sanity...\n");

  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error("❌ Mangler SANITY_API_WRITE_TOKEN i .env.local");
    process.exit(1);
  }

  try {
    await client.createOrReplace(homepage);
    console.log("✅ Hjemmeside oppdatert (id: page-hjem)");
    console.log("\n📋 Seksjoner (8 — omstrukturert april 2026):");
    console.log("   1. Hero (uten søkefelt, med stats + screenshot)");
    console.log("   2. TrustBar (bransjeforeninger først, 16 logoer)");
    console.log("   3. Menneske + Maskin (3-kolonne: varsling, prioritering, team)");
    console.log("   4. Produkter 2x2 (Varsling, Innsikt, AI, Konsulent)");
    console.log("   5. ComparisonTable (vs Mercell vs Cobrief)");
    console.log("   6. Testimonials (3 kundesitatrader)");
    console.log("   7. FAQ (7 spørsmål)");
    console.log("   8. Slutt-CTA");
    console.log("\n⚠️  Husk å kjøre seed-trustbar-logos.ts etterpå!");
  } catch (err) {
    console.error("❌ Seed feilet:", err);
    process.exit(1);
  }
}

seed();
