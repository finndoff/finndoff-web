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

// App-screenshot: innsikt-hero.png (904x488, landscape — passer laptop-rammen)
const INNSIKT_HERO_IMAGE = "image-a4853624ba671ef7d88359d0d674e83b18d978a3-904x488-png";

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
    // Endring #1: kvantifiserte stats under CTA
    // Endring #5: app-screenshot i laptop-ramme
    {
      _type: "hero",
      _key: key(),
      headline: "Vi hjelper norske bedrifter vinne anbud",
      subheadline:
        "Ikke bare finne dem. Ikke bare varsle om dem. Vinne dem. Finndoff kombinerer fagkompetanse, teknologi og bransjenettverk slik at små og mellomstore bedrifter kan konkurrere — og slå — de store.",
      showSearchBar: true,
      primaryCta: {
        text: "Prøv gratis — vi setter opp alt",
        link: "https://finndoff.no/signup",
      },
      secondaryCta: {
        text: "Se hvordan det fungerer",
        link: "#slik-fungerer-det",
      },
      stats: [
        { _key: key(), value: "~600", label: "SMB-kunder" },
        { _key: key(), value: "~90 %", label: "fornyelsesrate" },
        { _key: key(), value: "4", label: "bransjeforeninger" },
      ],
      // Endring #5: laptop device frame med app-screenshot
      image: {
        _type: "image",
        asset: { _type: "reference", _ref: INNSIKT_HERO_IMAGE },
        alt: "Finndoff Innsikt — oversikt over anbud og markedsdata",
      },
      deviceFrame: "laptop",
      style: "default",
    },

    // ── 2. TRUST BAR ──────────────────────────────────────────────────────
    {
      _type: "trustBar",
      _key: key(),
      title: "Betrodd av hundrevis av norske bedrifter og bransjeforeninger",
      style: "scrolling",
      logos: [
        "MEF",
        "DHL",
        "JobZone",
        "Vivende",
        "ALV",
        "Arkitektbedriftene",
        "Byggmesterforbundet",
        "Brødrene Dahl",
        "BIRKsport",
        "Dignio",
        "NESO",
        "HD Medical",
        "GP Gruppen",
        "NINA",
        "Medicus",
        "Taraldsvik",
      ].map((name) => ({ _key: key(), name })),
    },

    // ── 3. FEATURE GRID (produkter) ───────────────────────────────────────
    {
      _type: "featureGrid",
      _key: key(),
      title: "Menneske + Maskin = Bedre anbudsresultater",
      subtitle:
        "Vi selger ikke software — vi selger vinnersjanse. Teknologi er verktøyet, kompetanse er produktet.",
      columns: 4,
      features: [
        {
          _key: key(),
          title: "Varsling",
          description:
            "Finn de rette anbudene, uten støy. Vi setter opp søkeprofilen din med ekspertise fra hundrevis av bedrifter i din bransje.",
          icon: "bell",
          link: "/varsling",
        },
        {
          _key: key(),
          title: "Innsikt",
          description:
            "Forstå markedet og kom i posisjon. Se hvem som vinner, analyser konkurrenter og finn muligheter før alle andre.",
          icon: "bar-chart-2",
          link: "/innsikt",
        },
        {
          _key: key(),
          title: "Anbudshjelp AI",
          description:
            "AI som forsterker din kompetanse — les dokumenter, forstå krav og ta bedre bid/no-bid-beslutninger på minutter.",
          icon: "bot",
          link: "/anbudshjelp-ai",
        },
        {
          _key: key(),
          title: "Konsulent",
          description:
            "Erfarne anbudskonsulenter som hjelper deg fra strategi til ferdig tilbud — din partner hele veien.",
          icon: "users",
          link: "/konsulent",
        },
      ],
    },

    // ── 4. MID-PAGE CTA ───────────────────────────────────────────────────
    // Endring #7: CTA mellom featureGrid og timeline
    {
      _type: "ctaSection",
      _key: key(),
      title: "Klar til å vinne flere anbud?",
      description:
        "Med Finndoff på laget leverer du anbudet i tide, og vinnersjansen din er høyere. Start med en gratis prøveperiode.",
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

    // ── 5. TIMELINE ───────────────────────────────────────────────────────
    // Endring #3: reframed — fokus på "vi gjør alt", ikke antall dager
    {
      _type: "timeline",
      _key: key(),
      title: "Vi gjør jobben — du vinner anbud",
      subtitle:
        "I motsetning til selvbetjeningsverktøy og generisk AI setter vi opp alt for deg, basert på fagkompetanse og erfaring fra hundrevis av bedrifter.",
      steps: [
        {
          _key: key(),
          stepNumber: 1,
          title: "Oppstartsmøte",
          description:
            "Vi kartlegger din bedrift og bransje. Du trenger bare 30 minutter — vi tar oss av resten.",
          icon: "calendar",
          duration: "Dag 1",
        },
        {
          _key: key(),
          stepNumber: 2,
          title: "Ekspertoppsett",
          description:
            "Våre spesialister konfigurerer søkeprofilen din. Ingen skjemaer å fylle ut — vi bruker vår erfaring fra 1 000+ bedrifter.",
          icon: "settings",
          duration: "Dag 2–5",
        },
        {
          _key: key(),
          stepNumber: 3,
          title: "Første varsler i innboksen",
          description:
            "Du mottar relevante anbud direkte på e-post. Enkle å lese, med fargekoder og tydelig oppsett.",
          icon: "mail",
          duration: "Dag 5–10",
        },
        {
          _key: key(),
          stepNumber: 4,
          title: "Vi finjusterer for deg",
          description:
            "Gi én tommel opp eller ned på varslene — vi justerer profilen automatisk til du bare får det som er relevant.",
          icon: "sliders",
          duration: "Dag 10–15",
        },
        {
          _key: key(),
          stepNumber: 5,
          title: "Null støy, kun muligheter",
          description:
            "Profilen er kalibrert. Du bruker 30 minutter i uken på anbud i stedet for 4–5 timer med manuelt søk.",
          icon: "check-circle",
          duration: "Dag 20",
        },
      ],
    },

    // ── 6. COMPARISON TABLE ───────────────────────────────────────────────
    // Konkurransekart fra strategi v2
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

    // ── 7. TESTIMONIAL GRID ───────────────────────────────────────────────
    // Endring #2: 3 ekte kundesitatrader
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

    // ── 8. PARTNER SEKSJON ────────────────────────────────────────────────
    // Endring #4: fremhev MEF, Byggmesterforbundet, NESO som offisielle partnere
    {
      _type: "featureGrid",
      _key: key(),
      title: "Ingen konkurrent har vår distribusjon",
      subtitle:
        "MEF, Arkitektbedriftene, Byggmesterforbundet og NESO — fire bransjeforeninger med over 1 000 uaktiverte potensielle kunder. Medlemmer får skreddersydde profiler og rabatt.",
      columns: 3,
      features: [
        {
          _key: key(),
          title: "Maskinentreprenørenes Forbund (MEF)",
          description:
            "Offisiell partner for MEF Nords 334 medlemsbedrifter. Skreddersydde varslingsprofiler for anleggsbransjen, med særlig gunstige betingelser for MEF-medlemmer.",
          icon: "hard-hat",
          link: "/nyheter/partnerskap-med-maskinentreprenorenes-forbund-mef-nord",
        },
        {
          _key: key(),
          title: "Byggmesterforbundet",
          description:
            "Samarbeidsavtale med Byggmesterforbundet sikrer at norske byggmestere aldri går glipp av relevante offentlige oppdrag i sitt distrikt.",
          icon: "building-2",
          link: "/nyheter/samarbeidsavtale-med-byggmesterforbundet",
        },
        {
          _key: key(),
          title: "NESO",
          description:
            "Finndoff er offisiell partner med NESO — Norsk Elektro Serviceforbund. Medlemmer får skreddersydde anbudsvarsler for elektro og tekniske fag til medlemspris.",
          icon: "zap",
          link: "/nyheter/finndoff-inngar-samarbeid-med-neso-skreddersydd-anbudsvarsling-til-medlemspris",
        },
      ],
    },

    // ── 9. TRUST SIGNALER ─────────────────────────────────────────────────
    // Endring #6: GDPR, norsk drift, kryptert, ingen binding
    {
      _type: "featureGrid",
      _key: key(),
      title: "Derfor velger SMB-er Finndoff",
      subtitle: "Allerede validert — ~600 kunder og ~90 % fornyelse beviser etterspørselen.",
      columns: 4,
      features: [
        {
          _key: key(),
          title: "Kompetanse over teknologi",
          description: "Du får ikke bare et verktøy — du får folk som kan anbud. Vi selger vinnersjanse, ikke lisenser.",
          icon: "award",
        },
        {
          _key: key(),
          title: "Politisk medvind",
          description: "Stortinget og regjeringen vil ha flere SMB-er inn i offentlige anbud. Finndoff er svaret.",
          icon: "trending-up",
        },
        {
          _key: key(),
          title: "Norsk og trygt",
          description: "Etablert i 2021. Kontor i Oslo og Narvik. GDPR-sertifisert, kryptert og uten bindingstid.",
          icon: "shield-check",
        },
        {
          _key: key(),
          title: "~90 % fornyelse",
          description: "Nesten alle kundene våre velger å fortsette. Det er den beste kvalitetsgarantien vi kan gi.",
          icon: "heart",
        },
      ],
    },

    // ── 10. SLUTT-CTA ─────────────────────────────────────────────────────
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
        text: "Snakk med oss",
        link: "/om-oss#kontakt",
      },
      style: "brand",
    },

    // ── 11. FAQ ───────────────────────────────────────────────────────────
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
            "Varsling starter på 829 kr/mnd. Du kan legge til Innsikt (+649 kr/mnd) og Anbudshjelp AI (+1 499 kr/mnd) etter behov. Alle pakker inkluderer 2 brukere — ekstra brukere koster 199 kr/mnd."
          ),
        },
        {
          _key: key(),
          question: "Hvordan kommer jeg i gang?",
          answer: portableText(
            "Registrer deg for en gratis prøveperiode. Vi booker et oppstartsmøte der vi kartlegger din bedrift, og setter opp søkeprofilen din med vår ekspertise. Du mottar de første varslene innen få dager."
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
          question: "Kan jeg prøve gratis?",
          answer: portableText(
            "Ja! Vi tilbyr en gratis prøveperiode der vi setter opp en ekspertkonfigurert søkeprofil for din bedrift. Ingen bindingstid, ingen kredittkort — og vi gjør alt oppsettet for deg."
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
          question: "Er Finndoff kun for bygg og anlegg?",
          answer: portableText(
            "Nei — Finndoff brukes av bedrifter i mange bransjer, fra kjøttindustri og helsesektoren til IT og rådgivning. Bygg og anlegg er vårt kjernesegment med sterke bransjeforeningspartnerskap (MEF, NESO, Byggmesterforbundet), men vi hjelper alle som leverer til offentlig sektor."
          ),
        },
      ],
    },
  ],
};

async function seed() {
  console.log("🌱 Seeder forbedret hjemmeside til Sanity...\n");

  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error("❌ Mangler SANITY_API_WRITE_TOKEN i .env.local");
    process.exit(1);
  }

  try {
    await client.createOrReplace(homepage);
    console.log("✅ Hjemmeside oppdatert (id: page-hjem)");
    console.log("\n📋 Seksjoner seeded:");
    console.log("   1. Hero med stats + laptop-screenshot");
    console.log("   2. TrustBar (16 logoer)");
    console.log("   3. FeatureGrid (4 produkter)");
    console.log("   4. Mid-page CTA (brand-stil)");
    console.log("   5. Timeline (reframed: vi gjør alt for deg)");
    console.log("   6. ComparisonTable (vs Doffin vs manuelt søk)");
    console.log("   7. TestimonialGrid (3 ekte kundesitatrader)");
    console.log("   8. FeatureGrid (partnere: MEF, Byggmesterforbundet, NESO)");
    console.log("   9. FeatureGrid (trust-signaler: GDPR, norsk drift, kryptert, ingen binding)");
    console.log("  10. Slutt-CTA");
    console.log("  11. FAQ (7 spørsmål)");
  } catch (err) {
    console.error("❌ Seed feilet:", err);
    process.exit(1);
  }
}

seed();
