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

// ─── FAQ data by category ────────────────────────────────────────────────────

const faqData: {
  category: string;
  items: { question: string; answer: string }[];
}[] = [
  // ── 1. KOM I GANG ──────────────────────────────────────────────────────
  {
    category: "kom-i-gang",
    items: [
      {
        question: "Hvordan kommer jeg i gang med Finndoff?",
        answer:
          "Start med å fortelle oss hva bedriften din leverer. Vi setter opp søkeprofilen din basert på dine tjenester, CPV-koder og geografi. De fleste er i gang i løpet av én dag — vi gjør oppsettet for deg.",
      },
      {
        question: "Hvor raskt begynner jeg å få varsler?",
        answer:
          "Så fort søkeprofilen er satt opp, begynner du å motta varsler. For de fleste betyr det første varsel innen 1–2 virkedager, avhengig av aktiviteten i ditt marked.",
      },
      {
        question: "Må jeg registrere betalingskort for å starte prøveperioden?",
        answer:
          "Nei. Vi tilbyr en uforpliktende prøveperiode uten kredittkort. Du bestemmer selv om du vil fortsette etter prøvetiden.",
      },
      {
        question: "Går prøveperioden automatisk over i betalt abonnement?",
        answer:
          "Du får tydelig beskjed før prøveperioden utløper, og du velger selv om du vil fortsette. Vi trekker deg aldri uten at du har bekreftet.",
      },
      {
        question: "Kan dere hjelpe med å sette opp søkeprofilen første gang?",
        answer:
          "Absolutt — det er faktisk slik vi jobber. Ekspertene våre setter opp søkeprofilen basert på erfaring fra hundrevis av bedrifter. Du trenger bare 30 minutter til et oppstartsmøte.",
      },
      {
        question: "Hva trenger dere fra oss for å lage et godt søk?",
        answer:
          "En kort beskrivelse av hva dere leverer, hvilke geografiske områder dere dekker, og gjerne eksempler på anbud dere tidligere har vært interessert i. Vi tar det derfra.",
      },
      {
        question: "Kan vi få en demo før vi bestemmer oss?",
        answer:
          "Ja! Kontakt oss for en uforpliktende gjennomgang. Vi viser deg hvordan tjenesten fungerer og diskuterer hvordan den passer for din bedrift.",
      },
    ],
  },

  // ── 2. VARSLINGER OG TREFF ─────────────────────────────────────────────
  {
    category: "varslinger-og-treff",
    items: [
      {
        question: "Hvorfor får jeg for mange irrelevante varsler?",
        answer:
          "Det skyldes som regel at søket er for bredt. Vanlige årsaker er for generelle søkeord, manglende CPV-koder, eller for stor geografisk dekning. Kontakt oss, så hjelper vi deg med å stramme inn søket.",
      },
      {
        question: "Hvorfor får jeg for få varsler?",
        answer:
          "Søket kan være for smalt. Kanskje du bruker for få synonymer, for få CPV-koder, eller for snevre geografiske filtre. Noen ganger bruker oppdragsgivere andre ord enn du forventer. Vi hjelper deg med å utvide søket.",
      },
      {
        question: "Hvorfor fikk jeg ikke varsel om et konkret anbud?",
        answer:
          "Det kan skyldes at anbudet ble publisert med andre CPV-koder, andre formuleringer eller annen geografi enn søkeprofilen din dekker. Send oss lenken til anbudet, så justerer vi søket slik at lignende treff fanges opp fremover.",
      },
      {
        question: "Hvorfor finner jeg kunngjøringen på Doffin, men fikk ikke varsel?",
        answer:
          "En kunngjøring kan finnes i databasen uten å matche søkekriteriene dine godt nok. Det er ikke nødvendigvis en feil — det handler om at søkeprofilen din bør justeres. Ta kontakt, så ser vi på det sammen.",
      },
      {
        question: "Kan jeg følge flere fagområder samtidig?",
        answer:
          "Ja. Mange bedrifter leverer innen flere områder og trenger varsler på tvers. Vi bygger opp søkeprofilen slik at den dekker alle relevante segmenter uten å bli for bred.",
      },
      {
        question: "Kan jeg få varsler på dynamiske innkjøpsordninger (DPS)?",
        answer:
          "Ja, DPS-kunngjøringer fanges opp av søkeprofilen din. Kontakt oss hvis du opplever at noen typer kunngjøringer ikke dukker opp som forventet.",
      },
      {
        question: "Kan jeg slå av varsler om tildelinger?",
        answer:
          "Kontakt oss, så tilpasser vi varslingsoppsettet ditt. Vi kan justere hvilke kunngjøringstyper du mottar.",
      },
    ],
  },

  // ── 3. CPV-KODER OG SØKEORD ────────────────────────────────────────────
  {
    category: "cpv-koder-og-sokeord",
    items: [
      {
        question: "Hva er CPV-koder, og hvorfor er de viktige?",
        answer:
          "CPV-koder er standardiserte kategorier som brukes i offentlige anskaffelser for å beskrive hva konkurransen gjelder. Riktige CPV-koder i søkeprofilen din øker sjansen betraktelig for å få relevante treff.",
      },
      {
        question: "Bør jeg bruke søkeord eller CPV-koder?",
        answer:
          "Begge deler. Søkeord fanger opp språk og formuleringer, mens CPV-koder fanger opp formell kategorisering. Kombinasjonen gir best treffsikkerhet.",
      },
      {
        question: "Hvordan finner jeg riktige CPV-koder?",
        answer:
          "Start med det dere faktisk leverer, og se på hvilke kunngjøringer som ligner. Eller enda enklere: la oss gjøre det for deg. Vi har satt opp søkeprofiler for hundrevis av bedrifter og vet hvilke koder som fungerer.",
      },
      {
        question: "Kan jeg legge til flere CPV-koder?",
        answer:
          "Ja. Kontakt oss, så oppdaterer vi søkeprofilen din. Vi anbefaler å starte med kjerneområdene og utvide etter hvert som du ser hvilke treff du faktisk får.",
      },
      {
        question: "Kan jeg begrense søket geografisk?",
        answer:
          "Ja. Du kan avgrense til bestemte kommuner, fylker eller regioner. For mange bedrifter gir dette mye mer relevante varsler enn å søke på hele landet.",
      },
      {
        question: "Kan jeg få varsler fra bestemte oppdragsgivere?",
        answer:
          "Ja. Du kan følge spesifikke oppdragsgivere som Statens vegvesen, Bane NOR, kommuner eller andre offentlige innkjøpere. Kombinér gjerne med CPV-koder for enda mer presise treff.",
      },
    ],
  },

  // ── 4. BRUKERE, MOTTAKERE OG TILGANG ──────────────────────────────────
  {
    category: "brukere-og-tilgang",
    items: [
      {
        question: "Hvor mange mottakere kan vi ha?",
        answer:
          "Varsling inkluderer 2 brukere. Du kan legge til flere for 199 kr/mnd per bruker. Kontakt oss for å justere antall mottakere.",
      },
      {
        question: "Hvordan legger vi til flere mottakere?",
        answer:
          "Kontakt oss med navn og e-postadresse for den nye mottakeren, så ordner vi det. Ekstra brukere koster 199 kr/mnd.",
      },
      {
        question: "Kan vi sende varsler til en felles e-postadresse?",
        answer:
          "Ja. Mange bedrifter sender varsler til en felles innboks, for eksempel anbud@ eller firmapost. Ta kontakt, så setter vi det opp.",
      },
      {
        question: "Kan vi bytte mottaker?",
        answer:
          "Ja. Når ansatte slutter eller skifter rolle, oppdaterer vi mottakerlisten. Send oss en e-post med hvem som skal legges til og fjernes.",
      },
      {
        question: "Kan vi se hvilke brukere og mottakere vi har?",
        answer:
          "Ja. Ta kontakt med oss, så gir vi deg en oversikt over hvem som er knyttet til abonnementet deres.",
      },
      {
        question: "Hvordan bytter vi administrator?",
        answer:
          "Send oss en e-post med informasjon om ny og gammel administrator, så oppdaterer vi kontoen.",
      },
    ],
  },

  // ── 5. INNLOGGING OG TEKNISK ───────────────────────────────────────────
  {
    category: "innlogging-og-teknisk",
    items: [
      {
        question: "Jeg får ikke logget inn — hva gjør jeg?",
        answer:
          "Prøv først å tilbakestille passordet via «Glemt passord» på innloggingssiden. Sjekk at du bruker riktig e-postadresse. Fungerer det fortsatt ikke? Kontakt oss, så hjelper vi deg inn.",
      },
      {
        question: "Jeg får ikke e-post for passordtilbakestilling — hva gjør jeg?",
        answer:
          "Sjekk søppelpost-/spam-mappen i e-postklienten din. Sørg for at alerts@finndoff.no er godkjent som avsender. Får du fortsatt ikke e-post, kontakt oss, så sjekker vi om brukeren er aktiv.",
      },
      {
        question: "E-poster fra Finndoff blir blokkert — hva gjør vi?",
        answer:
          "Be IT-avdelingen godkjenne (whiteliste) e-postadressen alerts@finndoff.no i bedriftens e-postsystem. Dette løser problemet i de aller fleste tilfeller.",
      },
      {
        question: "En lenke i varslings-e-posten fungerer ikke — hva gjør jeg?",
        answer:
          "Prøv å kopiere lenken og lime den inn i nettleseren manuelt. Hvis problemet vedvarer, send oss et skjermbilde, så undersøker vi det.",
      },
      {
        question: "Hvilke nettlesere støtter Finndoff?",
        answer:
          "Finndoff fungerer best i oppdaterte versjoner av Google Chrome, Microsoft Edge, Firefox og Safari.",
      },
    ],
  },

  // ── 6. ABONNEMENT, PRØVETID OG OPPSIGELSE ─────────────────────────────
  {
    category: "abonnement-og-oppsigelse",
    items: [
      {
        question: "Hvordan sier jeg opp abonnementet?",
        answer:
          "Send en e-post til support@finndoff.no med kundenummer og ønske om oppsigelse. Du kan også bruke kontaktskjemaet på nettsiden. Du beholder tilgangen ut inneværende periode.",
      },
      {
        question: "Hva er oppsigelsestiden?",
        answer:
          "Det er ingen bindingstid. Du kan si opp når som helst, og abonnementet avsluttes ved slutten av inneværende måned.",
      },
      {
        question: "Får jeg bekreftelse når abonnementet er sagt opp?",
        answer:
          "Ja, du får en skriftlig bekreftelse på e-post når oppsigelsen er registrert.",
      },
      {
        question: "Kan jeg pause abonnementet i stedet for å si opp?",
        answer:
          "Kontakt oss for å diskutere alternativene. Vi finner en løsning som passer din situasjon.",
      },
      {
        question: "Kan vi bytte abonnementstype?",
        answer:
          "Ja. Du kan legge til eller fjerne tilleggsmoduler når som helst. Endringen trer i kraft umiddelbart, og prisen justeres fra neste faktura.",
      },
      {
        question: "Hva skjer etter prøveperioden er over?",
        answer:
          "Du får beskjed i god tid før prøveperioden utløper, og velger selv om du vil fortsette. Ingen automatiske trekk uten din bekreftelse.",
      },
    ],
  },

  // ── 7. FAKTURA OG BETALING ─────────────────────────────────────────────
  {
    category: "faktura-og-betaling",
    items: [
      {
        question: "Jeg har spørsmål om en faktura — hvem kontakter jeg?",
        answer:
          "Send en e-post til support@finndoff.no med fakturanummer og spørsmålet ditt, så hjelper vi deg.",
      },
      {
        question: "Kan vi få faktura i stedet for korttrekk?",
        answer:
          "Ja. Kontakt oss, så setter vi opp fakturering. Vi støtter også EHF for bedriftskunder som trenger det.",
      },
      {
        question: "Kan vi endre fakturamottaker?",
        answer:
          "Ja. Send oss den nye fakturaadressen eller kontaktpersonen, så oppdaterer vi det.",
      },
      {
        question: "Kan vi legge til bestillerreferanse eller prosjektnummer på fakturaen?",
        answer:
          "Ja. Send oss ønsket referanse, så legger vi det inn. Mange større bedrifter trenger dette for intern behandling.",
      },
      {
        question: "Hva gjør jeg hvis fakturaen er feil?",
        answer:
          "Kontakt oss med fakturanummer og en kort beskrivelse av hva som er feil. Vi ordner kreditnota eller korrigering så raskt som mulig.",
      },
    ],
  },

  // ── 8. OM FINNDOFF OG ANDRE LØSNINGER ──────────────────────────────────
  {
    category: "om-finndoff",
    items: [
      {
        question: "Er Finndoff det samme som Doffin?",
        answer:
          "Nei. Doffin er den offentlige kunngjøringsplattformen. Finndoff er en varslingstjeneste som hjelper deg overvåke markedet med skreddersydde søkeprofiler — slik at du slipper å lete manuelt på Doffin.",
      },
      {
        question: "Trenger jeg abonnement hos Mercell for å levere tilbud?",
        answer:
          "Nei. Det er alltid gratis å levere tilbud i konkurransegjennomføringsverktøy som Mercell, EU Supply og andre. Du trenger bare å opprette en gratis brukerkonto der for å levere.",
      },
      {
        question: "Hva er forskjellen på å finne et anbud og å levere et tilbud?",
        answer:
          "Å finne et anbud handler om markedsovervåking og varsling — det er her Finndoff hjelper deg. Å levere et tilbud skjer i oppdragsgivers konkurransesystem. Finndoff varsler deg og leder deg videre til riktig sted.",
      },
      {
        question: "Hvem passer Finndoff for?",
        answer:
          "Finndoff passer for bedrifter som vil jobbe mer systematisk med offentlige anskaffelser. Vi brukes av alt fra små håndverksbedrifter til mellomstore entreprenører, arkitekter, IT-selskaper og rådgivere.",
      },
      {
        question: "Dekker Finndoff anbud fra hele Norge?",
        answer:
          "Ja. Vi dekker kunngjøringer fra hele Norge, og du kan avgrense søket til de geografiske områdene som er relevante for deg.",
      },
      {
        question: "Dekker dere også anbud under nasjonal terskelverdi?",
        answer:
          "Vi dekker kunngjøringer publisert på Doffin og andre tilknyttede plattformer. Kontakt oss for mer detaljer om dekningen for din bransje.",
      },
    ],
  },

  // ── 9. BESTE PRAKSIS ───────────────────────────────────────────────────
  {
    category: "beste-praksis",
    items: [
      {
        question: "Hva er den vanligste feilen nye kunder gjør?",
        answer:
          "Enten for bredt eller for smalt søk. Mange undervurderer også hvor viktig det er å justere profilen etter de første treffene. Bruk de første ukene til å evaluere hva du faktisk får — vi hjelper deg med å finjustere.",
      },
      {
        question: "Hvor ofte bør vi justere søkeprofilen?",
        answer:
          "Evaluer den jevnlig, spesielt i starten. Når du ser hvilke typer varsler som faktisk kommer, blir det mye enklere å forbedre kvaliteten. Etter 2–3 justeringer treffer de fleste veldig godt.",
      },
      {
        question: "Hva gir best effekt på kort sikt?",
        answer:
          "Tre ting: bedre søkeord (tenk som oppdragsgiver), riktigere CPV-koder, og tydeligere geografisk avgrensning. Gjennomgang av irrelevante treff gir også gode ledetråder til forbedring.",
      },
      {
        question: "Hvordan bruker vi Finndoff mest effektivt som team?",
        answer:
          "Sett opp varsler til flere mottakere — for eksempel daglig leder, salgsansvarlig og fagansvarlig. Bruk gjerne en felles e-post i tillegg, slik at ingen muligheter faller mellom stolene.",
      },
      {
        question: "Hvordan går vi fra varsel til faktisk tilbud?",
        answer:
          "Finndoff varsler deg og lenker videre til kunngjøringen. Derfra kan du lese konkurransegrunnlaget og levere tilbud i oppdragsgivers system. Med Anbudshjelp AI kan du analysere dokumentene automatisk, og med Konsulent får du personlig hjelp hele veien.",
      },
    ],
  },
];

// ─── Seed to Sanity ──────────────────────────────────────────────────────────

async function seed() {
  console.log("🔄 Seeding hjelpesenter FAQ documents...\n");

  let total = 0;

  for (const group of faqData) {
    console.log(`  📂 ${group.category} (${group.items.length} spørsmål)`);

    for (let i = 0; i < group.items.length; i++) {
      const item = group.items[i];
      const id = `faq-${group.category}-${String(i + 1).padStart(2, "0")}`;

      await client.createOrReplace({
        _id: id,
        _type: "faq",
        question: item.question,
        answer: portableText(item.answer),
        category: group.category,
        sortOrder: (i + 1) * 10,
      });

      total++;
    }
  }

  console.log(`\n✅ ${total} FAQ-dokumenter seedet til Sanity.`);
  console.log("   Besøk /hjelpesenter for å se resultatet.");
}

seed().catch(console.error);
