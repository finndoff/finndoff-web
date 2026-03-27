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

const portableTextMulti = (paragraphs: string[]) =>
  paragraphs.map((text) => ({
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  }));

// ── Person documents ──────────────────────────────────────────────

interface PersonDoc {
  _id: string;
  _type: string;
  name: string;
  role: string;
  bio: string;
  email?: string;
  phone?: string;
  linkedIn: string;
  type: string;
}

const persons: PersonDoc[] = [
  // Team
  {
    _id: "person-hjalmar",
    _type: "person",
    name: "Hjalmar Vestby Bøe",
    role: "Daglig leder & Medgründer",
    bio: "Medgründer av Yalmar.com. Leder Finndoffs strategi, produkt og vekst.",
    linkedIn: "https://www.linkedin.com/in/hjalmarvestbyboe/",
    type: "team",
  },
  {
    _id: "person-havard",
    _type: "person",
    name: "Håvard Glattre",
    role: "CTO",
    bio: "Teknologisjef med bakgrunn fra Storebrand og PayEx. Ansvarlig for plattform, arkitektur og integrasjoner.",
    linkedIn: "https://www.linkedin.com/in/havardglattre/",
    type: "team",
  },
  {
    _id: "person-thomas",
    _type: "person",
    name: "Thomas Bangstad",
    role: "Salgssjef",
    bio: "Over 10 års erfaring med B2B-salg, tidligere i EU Supply (nå Mercell). Produkteier for Varsling.",
    email: "thomas@finndoff.no",
    phone: "401 57 631",
    linkedIn: "https://www.linkedin.com/in/thomasbangstad/",
    type: "team",
  },
  {
    _id: "person-daniel",
    _type: "person",
    name: "Daniel Dalsborg",
    role: "Key Account Manager",
    bio: "20+ års erfaring med B2B-salg. Produkteier for Anbudshjelp AI.",
    email: "daniel@finndoff.no",
    phone: "948 17 142",
    linkedIn: "https://www.linkedin.com/in/danieldalsborg/",
    type: "team",
  },
  // Board
  {
    _id: "person-steinar",
    _type: "person",
    name: "Steinar Koffeld",
    role: "Styreleder & Medgründer",
    bio: "CEO i Vivende/Ansatteid. Styreleder i Finndoff siden oppstart.",
    linkedIn: "https://www.linkedin.com/in/steinarkoffeld/",
    type: "board",
  },
  {
    _id: "person-rolf-olav",
    _type: "person",
    name: "Rolf Olav Johannessen",
    role: "Styremedlem",
    bio: "Medeier i Kionor, nå Visma/Mercell. Lang erfaring fra offentlige anskaffelser.",
    linkedIn: "https://www.linkedin.com/in/rolfolavjohannessen/",
    type: "board",
  },
  {
    _id: "person-pal-christian",
    _type: "person",
    name: "Pål Christian Thorsen",
    role: "Styremedlem & Medgründer",
    bio: "Vivende Rebase. Medgründer av Finndoff.",
    linkedIn: "https://www.linkedin.com/in/palchristianthorsen/",
    type: "board",
  },
  {
    _id: "person-sven",
    _type: "person",
    name: "Sven Brænde",
    role: "Styremedlem",
    bio: "Grunnlegger av Mazeppa, bakgrunn fra IBM. Erfaren teknologigründer og investor.",
    linkedIn: "https://www.linkedin.com/in/svenbraende/",
    type: "board",
  },
];

// ── Page document ─────────────────────────────────────────────────

const page = {
  _id: "page-om-oss",
  _type: "page",
  title: "Om oss",
  slug: { _type: "slug", current: "om-oss" },
  seoTitle: "Om oss — Den faglige anbudspartneren | Finndoff",
  seoDescription:
    "Vi gjør det mulig for norske bedrifter å vinne offentlige anbud. Møt teamet bak Finndoff — kompetanse, teknologi og bransjenettverk.",
  sections: [
    // 1. Hero
    {
      _type: "hero",
      _key: key(),
      headline: "Vi gjør det mulig for norske bedrifter å vinne anbud",
      subheadline:
        "Ikke bare finne dem. Ikke bare varsle om dem. Vinne dem. Menneske + maskin — kompetanse, teknologi og bransjenettverk på ett sted.",
      primaryCta: {
        text: "Prøv gratis",
        link: "https://app.finndoff.no/register",
      },
      secondaryCta: {
        text: "Se priser",
        link: "/priser",
      },
      style: "default",
    },

    // 2. TextSection — intro/sitat
    {
      _type: "textSection",
      _key: key(),
      title: "Vår misjon",
      content: portableTextMulti([
        "Vi gjør det mulig for norske bedrifter å vinne offentlige anbud. Ikke bare finne dem — vinne dem.",
        "I et marked delt mellom en dyr gigant og rene AI-utfordrere tar Finndoff posisjonen som den faglige anbudspartneren. Vi selger vinnersjanse, ikke lisenser. AI er verktøyet, ikke produktet. Tillit før hype.",
        "Med ~600 SMB-kunder og ~90 % fornyelsesrate har vi bevist at det fungerer. Og med fire bransjeforeningspartnerskap (MEF, Byggmesterforbundet, NESO, Arkitektbedriftene) har vi en distribusjon ingen konkurrent kan kopiere.",
      ]),
    },

    // 3. TeamGrid — team
    {
      _type: "teamGrid",
      _key: key(),
      title: "Teamet",
      subtitle:
        "Menneskene bak Finndoff — med erfaring fra offentlige anskaffelser, teknologi og B2B-salg.",
      persons: persons
        .filter((p) => p.type === "team")
        .map((p) => ({ _type: "reference", _ref: p._id, _key: key() })),
      layout: "grid",
    },

    // 4. TeamGrid — styre
    {
      _type: "teamGrid",
      _key: key(),
      title: "Styret",
      subtitle:
        "Et erfarent styre med bakgrunn fra teknologi, offentlige anskaffelser og gründermiljøet.",
      persons: persons
        .filter((p) => p.type === "board")
        .map((p) => ({ _type: "reference", _ref: p._id, _key: key() })),
      layout: "grid",
    },

    // 5. TextSection — vår historie
    {
      _type: "textSection",
      _key: key(),
      title: "Vår historie",
      content: portableTextMulti([
        "Finndoff ble til under pandemien i 2021, da et team fra Vivende bestemte seg for å løse et problem de hadde sett på nært hold: offentlige anbud var utilgjengelige for de bedriftene som trengte dem mest.",
        "Det startet ikke fordi det var lønnsomt, men fordi det var riktig. Norge har Nordens laveste SMB-deltakelse i offentlige anbud. Stortinget og regjeringen vil endre dette — og Finndoff er svaret.",
        "Fra enkel anbudsovervåking har vi vokst til en komplett anbudspartner — med AI-analyse, ekspertrådgivning og et nettverk av bransjeorganisasjoner som ingen konkurrent kan matche.",
        "Vi konkurrerer ikke på pris — vi konkurrerer på utfall. Våre ~600 kunder betaler ikke for varsler. De investerer i vinnersjanse.",
      ]),
    },

    // 6. ContactSection
    {
      _type: "contactSection",
      _key: key(),
      title: "Ta kontakt",
      subtitle:
        "Har du spørsmål om Finndoff, eller vil du vite mer om hvordan vi kan hjelpe din bedrift? Vi hører gjerne fra deg.",
      email: "post@finndoff.no",
      phone: "948 17 142",
      address: "Finndoff AS\nOslo, Norge\nOrg. 927 436 442",
      hubspotPortalId: "25684435",
      hubspotFormId: "f3757a5b-5206-45c8-a4c2-0b27f46f0d9e",
      contactPersons: [
        {
          _key: key(),
          name: "Daniel Dalsborg",
          role: "Key Account Manager",
          phone: "948 17 142",
          email: "daniel@finndoff.no",
          bookingLink:
            "https://meetings-eu1.hubspot.com/daniel-dalsborg",
        },
        {
          _key: key(),
          name: "Thomas Bangstad",
          role: "Salgssjef",
          phone: "401 57 631",
          email: "thomas@finndoff.no",
        },
      ],
    },

    // 7. CtaSection
    {
      _type: "ctaSection",
      _key: key(),
      title: "Klar til å få Finndoff på laget?",
      description:
        "Prøv gratis og opplev forskjellen med en faglig anbudspartner — kompetanse, teknologi og bransjenettverk i ryggen.",
      primaryCta: {
        text: "Start gratis prøveperiode",
        link: "https://app.finndoff.no/register",
      },
      secondaryCta: {
        text: "Book demo",
        link: "https://meetings-eu1.hubspot.com/daniel-dalsborg",
      },
      style: "brand",
    },
  ],
};

async function seed() {
  console.log("Seeding om-oss page to Sanity...");

  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error(
      "Missing SANITY_API_WRITE_TOKEN in .env.local\n" +
        "Create a write token at sanity.io/manage → API → Tokens"
    );
    process.exit(1);
  }

  try {
    // Seed persons first
    for (const person of persons) {
      await client.createOrReplace(person);
      console.log(`  ✓ Person: ${person.name} (${person._id})`);
    }

    // Seed page
    await client.createOrReplace(page);
    console.log(
      `  ✓ Page: Om oss (page-om-oss)`
    );

    console.log(
      `\nDone! ${persons.length} persons + 1 page seeded successfully.`
    );
  } catch (err) {
    console.error("Failed to seed om-oss:", err);
    process.exit(1);
  }
}

seed();
