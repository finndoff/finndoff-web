# Finndoff Web

Next.js 16 marketing site for Finndoff — **den faglige anbudspartneren** for norske SMB-er i offentlige anbud.

## Stack
- **Framework**: Next.js 16 (App Router) + TypeScript
- **CMS**: Sanity v3 (embedded studio at `/studio`)
- **Styling**: Tailwind 4 with `@theme` CSS variables
- **Deployment**: Vercel (finndoff-web.vercel.app)
- **Language**: Norwegian (lang="no")

## Dev
```bash
npm run dev        # Port 3300
npm run build      # Production build
```

## Working Guidelines
- Always load the `/frontend-design` skill before creating or modifying components, pages, or visual elements
- All UI text must be in Norwegian (lang="no")

## Strategic Positioning
Source: `docs/finndoff-strategi-v2.pdf`

Core position: **"Vi hjelper norske bedrifter vinne anbud"** — not just find them.
- **Identity**: Faglig anbudspartner (expert tender partner), NOT a software tool
- **Differentiators**: Competence over technology, branch partnerships (MEF, NESO, Byggmesterforbundet, Arkitektbedriftene), SMB mission
- **AI stance**: AI is the tool, not the product. Competence wins tenders.
- **Competitors**: vs Mercell (expensive monopoly for enterprise) and Cobrief (generic AI autopilot)
- **Competitive framing**: "De er laget for de store. Vi er laget for deg." (Mercell) / "Vi setter deg ikke på autopilot og glemmer deg." (Cobrief)
- **KPIs**: ~600 SMB customers, ~90% renewal, 4 industry associations, 835 BNOK public procurement market
- **Tagline**: "Menneske + Maskin = Bedre anbudsresultater"

### Pricing (modular model)
- VARSLING 829 kr/mnd (base, required) — "rett under 10k/år"
- INNSIKT +649 kr/mnd (add-on)
- ANBUDSHJELP AI +1.499 kr/mnd (add-on)
- ANBUDSKONSULENT: fra 990,-/mnd (via TendPro/Din Anbudshjelp)
- Extra users: +199 kr/mnd per user beyond 2 included

## Design System — "Verkstedet"
Visual identity matching the doffin-alerts beta app. Source: `docs/2024-01-04 Finndoff Styleguide.pdf`

### Color palette
- **Dark navy hero** (#0B2333) with blueprint grid overlay → warm off-white body (#FAFAF7) → dark footer
- **Teal** (#008489) signature accent — unique in market, all competitors use blue/purple/gray
- **Green** (#1DE08E) for CTAs
- **Copper** (#C17F3E) for highlights, section headers, roles
- **Lime** (#B2EE51) support only — bad contrast, never in UI elements

### Typography
- **Roboto** (body text, regular + semibold)
- **Work Sans** (display/headings, semibold + bold)
- **JetBrains Mono** (prices, badges, labels — `mono-label`, `mono-price`)

### Icons — Lucide React
Use `lucide-react` via `DynamicIcon.tsx` (static lookup of 60+ icons). Do NOT use Noun Project or other icon sources — Lucide covers all needs and is already integrated.

When adding new icons to seed scripts, always verify the icon name exists in `src/components/ui/DynamicIcon.tsx` iconMap. If not, add the import and mapping.

### Illustrations — Freepik
Styleguide prescribes Freepik flat vector illustrations: playful line style, big hands, teal/green clothing, data/search motifs. Use as accent elements on product pages and hero sections. Never as substitute for product screenshots — real screenshots are always preferred for credibility.

### CSS utilities
- **Patterns**: `blueprint-grid`, `blueprint-grid-light`, `blueprint-grid-dark`
- **Cards**: `verksted-card` (16px radius + hover translateY(-2px) + shadow transition)
- **Surfaces**: `verksted-gradient`, `glass-dark`
- **Labels**: `mono-label` (10px uppercase, 600wt, 1px tracking), `mono-price` (bold, -0.5px tracking)
- **Effects**: `pulse-glow`, `teal-glow`, `border-accent-left`

## Architecture

### Content pipeline
All page content lives in Sanity and is seeded via TypeScript scripts:
```bash
npx tsx scripts/seed-homepage.ts      # Seeds homepage sections
npx tsx scripts/seed-varsling.ts      # Seeds Varsling product page
npx tsx scripts/seed-trustbar-logos.ts # Uploads logo images (run AFTER homepage seed)
# etc.
```
**Important**: After re-seeding homepage, must also run `seed-trustbar-logos.ts` — homepage seed overwrites trustBar with name-only entries (no images).

### Component structure
- `PageBuilder.tsx` maps Sanity `section._type` → component, renders `sections[]`, wraps in alternating bg (warm-50 / primary-50)
- `SectionWrapper` handles section styling: `default` (transparent), `dark` (verksted-gradient + blueprint grid), `brand` (teal)
- **Module components** (`src/components/modules/`): Hero, CtaSection, FeatureGrid, PricingTable, PricingCalculator, TrustBar, Testimonial, FaqAccordion, VideoEmbed, Timeline, PartnerShowcase, ComparisonTable, TextSection, TeamGrid, ContactSection
- **UI primitives** (`src/components/ui/`): Button, SectionWrapper, SanityImage, PortableTextRenderer, DynamicIcon, DeviceFrame
- **Layout**: Navigation (dark glass-dark header with Produkter dropdown), Footer (navy-900), LayoutShell (wraps with Nav + Footer, hides on `/studio`)
- **Standalone pages**: `HjelpesenterPage.tsx` (client, category sidebar + accordions + search)

### Sanity schemas
- **Documents** (9): page, blogPost, product, person, partner, faq, customerCase, siteSettings, legalDocument
- **Modules** (15): hero, featureGrid, pricingTable, pricingCalculator, trustBar, testimonial, videoEmbed, ctaSection, faqAccordion, timeline, partnerShowcase, comparisonTable, textSection, teamGrid, contactSection

### Navigation structure
```
Produkter ▾ | Priser | Om oss | Nyheter | Hjelpesenter
```
- "Produkter" dropdown: Varsling, Innsikt, Anbudshjelp AI, Konsulent (with icons + descriptions)
- Desktop: hover dropdown, mobile: tap-to-expand
- Hjelpesenter is a standalone page (`/hjelpesenter`) with 53 FAQ documents in 9 categories

### FAQ architecture
- **Homepage**: Embedded `faqAccordion` module (9 prospect-focused SEO questions) — seeded via `seed-homepage.ts`
- **Hjelpesenter** (`/hjelpesenter`): Standalone `faq` documents in Sanity, fetched via `faqsQuery`, rendered by `HjelpesenterPage.tsx`
- **Product pages**: No FAQ sections (removed — all FAQ content lives in hjelpesenter or homepage)
- **Categories** (9): kom-i-gang, varslinger-og-treff, cpv-koder-og-sokeord, brukere-og-tilgang, innlogging-og-teknisk, abonnement-og-oppsigelse, faktura-og-betaling, om-finndoff, beste-praksis
- Seed script: `npx tsx scripts/seed-hjelpesenter-faq.ts`

### Key behaviors
- `Hero.tsx` renders both CTA buttons and search bar when `showSearchBar` is true (not either/or)
- `LayoutShell.tsx` passes `logoDarkUrl` (white logo) to Navigation and Footer
- Button component auto-detects internal/external links
- DynamicIcon returns `null` for unmapped icon names (no error, just invisible)
- Never name competitors (Mercell, Cobrief) negatively on public pages — neutral mentions OK

## Current Work — UX Improvements (April 2026)
Full action plan: `docs/ux-review-konsolidert-april-2026.md`
Design reference: `docs/Google Stitch designforslag 2 april 2026.rtf` (HTML prototype, open via browser)

### Top priorities (consensus from 5 sources)
1. ~~**Product screenshots** on all pages~~ — hero done (go/no-go AI screenshot)
2. ~~**Stronger hero** with larger screenshot + proof row directly below~~ — done
3. **Customer cases** with real names, companies, and numbers
4. ~~**Fewer homepage sections** (~8 instead of ~12)~~ — done (11→7)
5. **Diversify testimonials** — stop reusing same Tore Killi quote everywhere
6. ~~**Comparison table removed**~~ — competitive framing is internal only
7. ~~**FAQ restructured**~~ — hjelpesenter (53 docs) + prospect FAQ (9 on homepage) + removed from product pages
8. ~~**Navigation restructured**~~ — Produkter dropdown + Hjelpesenter link
9. ~~**Anbudshjelp AI page overhauled**~~ — MEF Nord-rettet, screenshot, proof row, "hvem er dette for"

### Stitch-inspired changes to adopt (in Verkstedet style)
- S1: Tighter page flow: Hero → Proof Row → Hybrid Model → Products → Comparison → Case → Pricing → FAQ → CTA
- S2: "Menneske + Maskin" visual section (split: AI card left + human advisor quote right)
- S3: Product cards 2x2 with visual differentiation — Anbudshjelp AI highlighted in teal/dark as premium
- S4: Customer case section with concrete numbers (contract value, hours saved)
- S5: Three-tier pricing labels above calculator (Start å vinne / Vinn smartere / Full støtte)
- S6: Consultant avatars with overlapping circles + visible price
- S7: Proof Row (partner logos) immediately after hero

## Key Documents
| Document | Path | Purpose |
|----------|------|---------|
| Strategy v2 | `docs/finndoff-strategi-v2.pdf` | Market position, competitive framing, pricing rationale |
| Styleguide | `docs/2024-01-04 Finndoff Styleguide.pdf` | Colors, fonts, logos, illustration style (Freepik) |
| UX Review (consolidated) | `docs/ux-review-konsolidert-april-2026.md` | Prioritized action list from 5 reviews |
| Stitch prototype | `docs/Google Stitch designforslag 2 april 2026.rtf` | HTML design alternative (extract and open in browser) |
| Research steg 1-3 | `docs/research/steg1-3*.md` | Competitor analysis, architecture recommendations |
| UX review sources | `docs/ux review april *.docx` | Individual reviews from Claude Chat, ChatGPT, Gemini |

## Environment
Copy `.env.example` to `.env.local` and fill in Sanity credentials.

## Related Projects
- **doffin-alerts** (`../doffin-alerts`): Beta app — source of Verkstedet theme (MUI 7). Use for product screenshots.
- **finndoff-marketing-agent** (`../finndoff-marketing-agent`): AI content engine with strategy docs in `docs/Markedsstrategi/`
