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

// Produktbilde lastet opp via Sanity Studio
const PRODUCT_IMAGE =
  "image-c3e4072535dbbb80adf5f1c6d9ffab621fa3b398-4340x2860-png";

/**
 * =====================================================================
 * ANBUDSHJELP AI — PRODUKTSIDE (post-review, april 2026)
 * =====================================================================
 * Endringer fra forrige versjon (konsolidert UX-review, se
 * docs/ux-review-konsolidert-april-2026.md og workshop-notater):
 *
 *  1. H1 leder med VINN, ikke tid. "Anbudshjelp AI" degradert til label.
 *  2. Ny verdikjede-stripe: Varsling → Innsikt → AI → TendPro → Solver.
 *     Løser samtidig "add-on til hva?"-forvirringen.
 *  3. Ny tekstseksjon "AI alene vinner ikke anbud" (strategi v2).
 *  4. Pipeline utvidet med Bid/no-bid + krav-matching (diff mot Cobrief).
 *  5. Hvem-er-dette-for målrettet mot MEF/entreprenør.
 *  6. 3 testimonial-slots (Tore Killi beholdt + 2 placeholder).
 *  7. Ny tillit-FAQ (datasikkerhet, feilmarginer, forkunnskaper).
 *  8. Pris flyttet ut av hero-stats, inn i egen forklaring.
 *  9. CTA med konkret SLA: "oppsett innen 24 timer".
 * 10. Daniel-portrett: bilde kommer via Sanity Studio (se action-liste).
 *
 *  Søk i filen etter "PLACEHOLDER" og "VERIFISER" før neste deploy.
 * =====================================================================
 */

const product = {
  _id: "product-anbudshjelp-ai",
  _type: "product",
  title: "Anbudshjelp AI",
  slug: { _type: "slug", current: "anbudshjelp-ai" },
  // VERIFISER: subtitle brukes i produktlister og som meta-ingress — bør
  // matche det nye vinn-løftet i hero.
  subtitle:
    "Høyere vinnersjanse i offentlige anbud — AI leser dokumentene, konsulent og advokat står klare bak når det trengs.",
  description:
    "Anbudshjelp AI analyserer konkurransegrunnlag, gir bid/no-bid-anbefaling og lager prosjektplan — i et fagmiljø med konsulenter (TendPro) og advokater (Solver) i ryggen.",
  icon: "bot",
  price: 1499,
  priceLabel: "+1 499 kr/mnd",
  isAddon: true,
  seoTitle: "Anbudshjelp AI — Vinn flere offentlige anbud | Finndoff",
  seoDescription:
    "AI-analyse, bid/no-bid og prosjektplan — støttet av anbudskonsulenter og advokater. Bygd for norske SMB-er som vil vinne anbud.",
  sections: [
    // ── 1. HERO — leder med vinn, ikke tid ──────────────────────────────
    {
      _type: "hero",
      _key: key(),
      // VERIFISER i workshop: dette er det viktigste valget på siden.
      // Alternativer diskutert i Slack 09.04 (group DM): se action-liste.
      headline: "Høyere vinnersjanse i hvert anbud du svarer på.",
      subheadline:
        "Anbudshjelp AI leser tusenvis av sider på minutter, gir deg en bid/no-bid-anbefaling og lager prosjektplanen — med konsulent og advokat klare bak når du trenger det.",
      primaryCta: {
        text: "Prøv gratis — oppsett innen 24 timer",
        link: "https://app.finndoff.no/register",
      },
      secondaryCta: {
        text: "Book demo med Daniel",
        link: "https://meetings-eu1.hubspot.com/daniel-dalsborg",
      },
      image: {
        _type: "image",
        asset: { _type: "reference", _ref: PRODUCT_IMAGE },
        alt: "Anbudshjelp AI — bid/no-bid-anbefaling, kvalifiseringssjekk og prosjektplan",
      },
      deviceFrame: "none",
      // Pris fjernet herfra — forklares i egen seksjon under verdikjeden.
      stats: [
        { _key: key(), value: "15 min", label: "lese 2000+ sider" },
        { _key: key(), value: "~600", label: "SMB-er bruker Finndoff" },
        { _key: key(), value: "~90%", label: "fornyer abonnementet" },
      ],
      style: "dark",
    },

    // ── 2. VERDIKJEDE — "slik henger det sammen" ────────────────────────
    // Nytt: synliggjør at Anbudshjelp AI er ett steg i et fagmiljø, ikke
    // et isolert AI-verktøy. Avklarer samtidig at AI er et tillegg til
    // Varsling+Innsikt.
    {
      _type: "timeline",
      _key: key(),
      title: "AI alene vinner ikke anbud. Derfor leverer vi hele fagmiljøet.",
      subtitle:
        "Slik henger tjenestene våre sammen. Du betaler bare for det du faktisk trenger — og kan skru på mer når bedriften vokser.",
      steps: [
        {
          _key: key(),
          stepNumber: 1,
          title: "Varsling",
          description:
            "Du får de relevante anbudene i innboksen. Basert på CPV-koder, geografi og egne søkeord.",
          icon: "bell",
          duration: "Fra 829 kr/mnd",
        },
        {
          _key: key(),
          stepNumber: 2,
          title: "Innsikt",
          description:
            "Markedsdata, historikk og konkurrentanalyse. Hvem vinner hva, til hvilken pris?",
          icon: "bar-chart-3",
          duration: "+649 kr/mnd",
        },
        {
          _key: key(),
          stepNumber: 3,
          title: "Anbudshjelp AI",
          description:
            "AI leser grunnlaget, sjekker kvalifikasjon, gir bid/no-bid og lager prosjektplan. Du tar beslutningen.",
          icon: "bot",
          duration: "+1 499 kr/mnd",
        },
        {
          _key: key(),
          stepNumber: 4,
          title: "Anbudskonsulent",
          description:
            "Erfarne konsulenter fra TendPro hjelper deg skrive og kvalitetssikre det faktiske tilbudet.",
          icon: "briefcase",
          duration: "Fra 990 kr/mnd",
        },
        {
          _key: key(),
          stepNumber: 5,
          title: "Juridisk rådgivning",
          description:
            "Advokatfirmaet Solver gir rådgivning på anskaffelsesrett — fra kvalifikasjonskrav til klage og innsyn.",
          icon: "scale",
          duration: "Etter behov",
        },
      ],
    },

    // ── 3. POSISJONERING — "menneske + maskin" ──────────────────────────
    // Kort tekstseksjon som understreker diff mot Cobrief ("vi setter deg
    // ikke på autopilot") og Mercell ("laget for de store").
    {
      _type: "textSection",
      _key: key(),
      style: "dark",
      title: "Menneske + maskin = bedre anbudsresultater",
      content: [
        {
          _type: "block",
          _key: key(),
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: key(),
              text: "AI er et verktøy. Det er fortsatt fagfolk som vinner anbud. Derfor kombinerer vi norsk AI-teknologi med et fagmiljø av anbudskonsulenter (TendPro) og advokater (Solver). Du får kraften av en anbudsavdeling — uten å måtte ansette en.",
              marks: [],
            },
          ],
        },
      ],
    },

    // ── 4. HVEM ER DETTE FOR — målrettet MEF Nord-kampanje ──────────────
    {
      _type: "featureGrid",
      _key: key(),
      title: "Bygd for norske SMB-er som leverer — ikke de som sitter på kontoret",
      subtitle:
        "Spesielt tilpasset entreprenører og håndverkere i bygg, anlegg og tekniske fag. Samarbeid med MEF, NESO, Byggmesterforbundet og Arkitektbedriftene.",
      columns: 3,
      features: [
        {
          _key: key(),
          title: "Entreprenører og håndverkere",
          description:
            "Du vinner jobber på kvalitet og erfaring — ikke på å lese 200 sider kravspesifikasjon på kvelden. AI gjør grunnarbeidet.",
          icon: "hard-hat",
        },
        {
          _key: key(),
          title: "Små team, store ambisjoner",
          description:
            "Når hele firmaet er 5–15 folk, har du ikke tid til å bruke en uke på hvert anbud. Bid/no-bid er klar på en kaffekopp.",
          icon: "users",
        },
        {
          _key: key(),
          title: "Første gang på anbud?",
          description:
            "AI gir deg sjekkliste, plan og konsulenthjelp på forespørsel. Du trenger ikke ha gjort dette før for å vinne.",
          icon: "rocket",
        },
      ],
    },

    // ── 5. PIPELINE — 5 steg fra varsel til innsendt ────────────────────
    // Viktig: reflekterer den faktiske 5-stegs pipeline i beta-appen
    // (Aktuell → Innsendt). Bid/no-bid og krav-matching er nå synlig.
    {
      _type: "timeline",
      _key: key(),
      title: "Fra varsel til innsendt — 5 steg i samme verktøy",
      subtitle:
        "AI tar det tunge grunnarbeidet. Du tar beslutningene.",
      steps: [
        {
          _key: key(),
          stepNumber: 1,
          title: "Aktuell",
          description:
            "Varselet fanges opp automatisk. AI laster ned hele konkurransegrunnlaget — ingen manuell leting på Doffin.",
          icon: "bell",
        },
        {
          _key: key(),
          stepNumber: 2,
          title: "Kvalifisering",
          description:
            "AI sjekker kravene mot bedriftsprofilen din (hentet fra Brønnøysund), dokumentbiblioteket og referanseprosjektene. Svar med begrunnelse.",
          icon: "shield-check",
        },
        {
          _key: key(),
          stepNumber: 3,
          title: "Bid / no-bid",
          description:
            "Datadrevet anbefaling basert på din egen anbudsstrategi — krav, konkurranse, kapasitet og tildelingskriterier. Du bestemmer terskelen.",
          icon: "scale",
        },
        {
          _key: key(),
          stepNumber: 4,
          title: "Utforming",
          description:
            "AI lager prosjektplan med milepæler og frister. Du skriver tilbudet — alene, med teamet, eller med en anbudskonsulent fra TendPro.",
          icon: "list-checks",
        },
        {
          _key: key(),
          stepNumber: 5,
          title: "Innsendt",
          description:
            "Innleveringen er kvalitetssikret, dokumentbiblioteket er oppdatert og erfaringen er tilgjengelig for neste anbud.",
          icon: "send",
        },
      ],
    },

    // ── 6. FEATURES — 6 kjerneegenskaper ────────────────────────────────
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
          title: "AI-analyse med kravmatching",
          description:
            "Tusenvis av sider lest. Hvert krav matches mot dine egne dokumenter, ressurser og referanseprosjekter.",
          icon: "brain",
        },
        {
          _key: key(),
          title: "Bid/no-bid-anbefaling",
          description:
            "Konfigurerbar anbudsstrategi. AI anbefaler — du bestemmer terskelen for hva dere svarer på.",
          icon: "scale",
        },
        {
          _key: key(),
          title: "Bedriftsprofil fra Brønnøysund",
          description:
            "Finansielle nøkkeltall, attester og selskapsdata hentes automatisk og brukes i kvalifiseringssjekken.",
          icon: "building",
        },
        {
          _key: key(),
          title: "Dokumentbibliotek",
          description:
            "Samle attester, politiattester, CV-er og sertifikater ett sted — med utløpsvarsler før de går ut.",
          icon: "folder",
        },
        {
          _key: key(),
          title: "Referanseprosjekter",
          description:
            "Bygg opp en portefølje av referanser med automatisk PDF-generering tilpasset hvert anbud.",
          icon: "award",
        },
        {
          _key: key(),
          title: "Team og oppgaver",
          description:
            "Tildel roller, del prosjektet med kolleger og følg fremdriften fra varsel til innsendt tilbud.",
          icon: "share-2",
        },
      ],
    },

    // ── 7. COMPARISON — Tirsdag kveld kl 22 ─────────────────────────────
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
            "Komplett sjekkliste matchet mot dine dokumenter",
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
            "Datadrevet bid/no-bid — du setter terskelen",
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
          feature: "Når det blir vanskelig",
          values: [
            "Alene med Google",
            "Anbudskonsulent (TendPro) + advokat (Solver) tilgjengelig",
          ],
        },
      ],
    },

    // ── 8. TESTIMONIALS ─────────────────────────────────────────────────
    // PLACEHOLDER: vi trenger 2 nye cases før lansering. Action-liste
    // beskriver hvem Thomas/Daniel skal kontakte. Tore Killi beholdes
    // foreløpig, men bør byttes ut med MEF Nord-sitat når tilgjengelig.
    {
      _type: "testimonial",
      _key: key(),
      quote:
        "Vi har et bevisst forhold til vår rolle som samfunnsbygger. Finndoff hjelper oss å bruke tiden på det vi er best på – å bygge.",
      name: "Tore Killi",
      role: "Daglig leder",
      company: "Brødrene Killi AS",
    },
    {
      _type: "testimonial",
      _key: key(),
      // PLACEHOLDER — Daniel følger opp Elteragruppen (Even) etter
      // onboarding. Mål: sitat med konkrete tall (timer spart,
      // anbud analysert, kontraktverdier).
      quote:
        "[PLACEHOLDER — Elteragruppen eller annen AI-kunde. Sitat med tall: antall anbud analysert, timer spart, kontrakter vunnet. Kontakt: Daniel.]",
      name: "[Navn mangler]",
      role: "[Rolle mangler]",
      company: "[Bedrift mangler]",
    },
    {
      _type: "testimonial",
      _key: key(),
      // PLACEHOLDER — Thomas følger opp MEF Nord-kunde etter
      // kampanjestart slutt april. Skal helst være entreprenør i
      // bygg/anlegg — matcher målgruppe.
      quote:
        "[PLACEHOLDER — MEF Nord-kunde (entreprenør, bygg/anlegg). Fokus: bid/no-bid-funksjonen og kravmatching. Kontakt: Thomas.]",
      name: "[Navn mangler]",
      role: "[Rolle mangler]",
      company: "[Bedrift mangler — MEF-medlem foretrukket]",
    },

    // ── 9. FAQ — tillit til AI ──────────────────────────────────────────
    // Ny. Adresserer SMB-skepsis (strategi v2: "tillit før hype").
    {
      _type: "faqAccordion",
      _key: key(),
      title: "Spørsmål vi får ofte om AI",
      subtitle:
        "Tillit før hype. Her er de ærlige svarene på det folk lurer på.",
      items: [
        {
          _key: key(),
          question: "Hva skjer med dokumentene våre? Er de trygge?",
          answer: [
            {
              _type: "block",
              _key: key(),
              style: "normal",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: key(),
                  // VERIFISER med Håvard før lansering — bekreft hosting,
                  // databehandleravtale og at data ikke brukes til trening.
                  text: "[VERIFISER med Håvard] Alle dokumenter lagres i EU, er krypterte i ro og transitt, og brukes ikke til å trene modeller. Vi har databehandleravtale med alle kunder.",
                  marks: [],
                },
              ],
            },
          ],
        },
        {
          _key: key(),
          question: "Hva hvis AI-en tar feil?",
          answer: [
            {
              _type: "block",
              _key: key(),
              style: "normal",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: key(),
                  text: "AI er et beslutningsstøtteverktøy — ikke en autopilot. Alle anbefalinger vises med begrunnelse og kilde, slik at du kan overprøve dem. Når noe er uklart, kan du hente inn en anbudskonsulent fra TendPro eller advokat fra Solver.",
                  marks: [],
                },
              ],
            },
          ],
        },
        {
          _key: key(),
          question: "Må vi kunne noe om AI fra før?",
          answer: [
            {
              _type: "block",
              _key: key(),
              style: "normal",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: key(),
                  text: "Nei. Vi setter opp alt for deg innen 24 timer etter registrering: varsling, profil, dokumentbibliotek og AI-strategi. Du får opplæring av en person — ikke en chatbot.",
                  marks: [],
                },
              ],
            },
          ],
        },
        {
          _key: key(),
          question: "Krever Anbudshjelp AI at vi har Varsling og Innsikt?",
          answer: [
            {
              _type: "block",
              _key: key(),
              style: "normal",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: key(),
                  // VERIFISER pakkestruktur med Daniel — Elteragruppen
                  // fikk "Varsling-Innsikt-Anbudshjelp AI" samlet.
                  text: "[VERIFISER pakkestruktur] Anbudshjelp AI er et tillegg til Varsling (829 kr/mnd). Innsikt (+649 kr/mnd) anbefales men er ikke påkrevd. De fleste kundene våre kjøper pakken samlet.",
                  marks: [],
                },
              ],
            },
          ],
        },
        {
          _key: key(),
          question: "Hvor involvert er Finndoff underveis?",
          answer: [
            {
              _type: "block",
              _key: key(),
              style: "normal",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: key(),
                  text: "Vi setter deg ikke på autopilot. Daniel er din faste kontaktperson, og du kan booke møte når du trenger det. Når anbudet krever mer enn AI — konsulent fra TendPro og advokat fra Solver er et klikk unna.",
                  marks: [],
                },
              ],
            },
          ],
        },
      ],
    },

    // ── 10. SLUTT-CTA — med konkret SLA ─────────────────────────────────
    {
      _type: "ctaSection",
      _key: key(),
      title: "Klar til å svare på neste anbud med fagmiljøet i ryggen?",
      description:
        "Registrer deg i dag — vi setter opp alt innen 24 timer. Første 30 dager er gratis.",
      primaryCta: {
        text: "Start gratis prøveperiode",
        link: "https://app.finndoff.no/register",
      },
      secondaryCta: {
        // PLACEHOLDER — Daniel-portrett bør legges inn ved CTA på
        // frontend. Krever endring i CtaSection-komponenten. Se
        // action-listen.
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
    console.log("\n📋 Seksjoner (10):");
    console.log("   1. Hero — 'høyere vinnersjanse' + stats (15min/~600/~90%)");
    console.log("   2. Verdikjede — Varsling→Innsikt→AI→TendPro→Solver");
    console.log("   3. Menneske + maskin (posisjonering)");
    console.log("   4. Hvem er dette for (MEF-målrettet)");
    console.log("   5. 5-stegs pipeline (Aktuell → Innsendt)");
    console.log("   6. Funksjoner (6 features — inkl. bid/no-bid)");
    console.log("   7. Comparison (uten AI vs med AI + fagmiljø)");
    console.log("   8. Testimonials (1 ekte + 2 PLACEHOLDER)");
    console.log("   9. Tillit-FAQ (5 spørsmål — 2 VERIFISER-merket)");
    console.log("  10. Slutt-CTA med 24t SLA");
    console.log(
      "\n⚠️  Søk i seed-filen etter 'PLACEHOLDER' og 'VERIFISER' — se docs/workshop-anbudshjelp-ai-actions.md"
    );
  } catch (err) {
    console.error("Failed to seed Anbudshjelp AI:", err);
    process.exit(1);
  }
}

seed();
