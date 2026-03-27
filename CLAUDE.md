# Finndoff Web

Next.js 16 marketing site for Finndoff — **den faglige anbudspartneren** for norske SMB-er i offentlige anbud.

## Stack
- **Framework**: Next.js 16 (App Router) + TypeScript
- **CMS**: Sanity v3 (embedded studio at `/studio`)
- **Styling**: Tailwind 4 with `@theme` CSS variables
- **Deployment**: Vercel (finndoff-web.vercel.app)
- **Language**: Norwegian (lang="no")

## Design System — "Verkstedet"
Visual identity matching the doffin-alerts beta app:
- **Dark navy hero** (#0B2333) with blueprint grid overlay → warm off-white body (#FAFAF7) → dark footer
- **Teal** (#008489) signature accent, **green** (#1DE08E) CTAs, **copper** (#C17F3E) highlights
- **Fonts**: Roboto (body), Work Sans (display), JetBrains Mono (prices/badges/labels)
- **Patterns**: Blueprint grid textures, navy-tinted shadows, 4px left-border accent cards, verksted-card hover animations
- **CSS classes**: `blueprint-grid`, `blueprint-grid-light`, `blueprint-grid-dark`, `verksted-gradient`, `verksted-card`, `glass-dark`, `mono-label`, `mono-price`, `pulse-glow`

## Dev
```bash
npm run dev        # Port 3300
npm run build      # Production build
```

## Key Directories
- `src/app/` — Pages (App Router)
- `src/components/modules/` — 15 Sanity section components rendered by PageBuilder
- `src/components/ui/` — Shared primitives (Button, SectionWrapper, SanityImage, etc.)
- `src/sanity/schemas/` — Documents (9) + Modules (15)
- `docs/research/` — Steg 1-3 research documents

## Architecture
- `PageBuilder.tsx` maps Sanity `section._type` to components, alternates bg (warm-50 / primary-50)
- `SectionWrapper` handles section styling: default, dark (verksted-gradient + blueprint grid), brand
- All content is editable in Sanity Studio — components are presentation-only
- SEO: sitemap, robots, OG images, JSON-LD schemas on all routes
- `Hero.tsx` renders both CTA buttons and search bar when `showSearchBar` is true (not either/or)
- `LayoutShell.tsx` passes `logoDarkUrl` (white logo) to Navigation, `logoDarkUrl` to Footer
- TrustBar logos require `seed-trustbar-logos.ts` after re-seeding homepage (uploads image assets to Sanity)

## Strategic Positioning (v2, March 2026)
Core position: **"Vi hjelper norske bedrifter vinne anbud"** — not just find them.
- **Identity**: Faglig anbudspartner (expert tender partner), NOT a software tool
- **Differentiators**: Competence over technology, branch partnerships (MEF, NESO, Byggmesterforbundet, Arkitektbedriftene), SMB mission
- **AI stance**: AI is the tool, not the product. Competence wins tenders.
- **Competitors**: vs Mercell (expensive monopoly for enterprise) and Cobrief (generic AI autopilot)
- **KPIs**: ~600 SMB customers, ~90% renewal, 4 industry associations, 835 BNOK public procurement market
- **Tagline**: "Menneske + Maskin = Bedre anbudsresultater"
- Source: `finndoff-marketing-agent/docs/Markedsstrategi/finndoff-strategi-v2.html`

## Environment
Copy `.env.example` to `.env.local` and fill in Sanity credentials.
