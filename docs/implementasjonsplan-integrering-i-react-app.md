---
Dato: 2026-04-16
Forfattere: Hjalmar Bøe, Håvard Glattre, Claude Code
Status: Utkast for implementasjonsplan
Målgruppe: Håvard (CTO), Claude Code i VS Code
Relaterte dokumenter:
  - docs/research/steg3-ex-post-anbefalinger.md (opprinnelig plan)
  - docs/ux-review-konsolidert-april-2026.md
  - docs/finndoff-strategi-v2.pdf
  - /Users/hjalmarboe/Utvikling/doffin-alerts/Frontend/doffin-alerts/CLAUDE.md
---

# Implementasjonsplan — integrering av ny finndoff.no i doffin-alerts-appen

## 1. Bakgrunn og motivasjon — hvorfor vi gjør dette i det hele tatt

Dagens `finndoff.no` er en React-webapp (CRA) som viser alt markedsinnhold via **iframes** mot `market.finndoff.no` (WIX). Konsekvensen er tredelt og alle tre er direkte forretningsproblemer:

1. **Markedsinnholdet er praktisk talt usynlig for søkemotorer og LLM-er.** Innholdet ligger inne i en iframe fra et annet domene (`market.finndoff.no`), bygd av et tungt JS-rammeverk (WIX). Google Bot indekserer det delvis og med forsinkelse. LLM-crawlere (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) henter rå HTML og ser ingenting som helst. I en verden der mer og mer leverandør-evaluering skjer gjennom ChatGPT-søk og Perplexity-spørsmål, er dette en eksistensiell SEO-situasjon.
2. **Redaktørflyten er splittet** mellom WIX (markedsinnhold) og React-appen (UI-tekster, produkt). Ingen av produktlederne eller markedsfolkene kan oppdatere én ting uten å navigere to ulike systemer. Publisering av en blogg krever WIX, endring av en pristekst krever deploy av React-appen.
3. **WIX-stacken gir dårlig Core Web Vitals** og begrenser oss i metadata, strukturert data, canonical URLs, sitemap-generering, og per-side OG-bilder. Selv om vi vil, kan vi ikke gjøre siden proff SEO-teknisk.

Det opprinnelige prosjektet (kickoff februar 2026, scaffoldet i `finndoff-web`-repoet) har levert en komplett Next.js 16 + Sanity + Tailwind-side med alle markedssidene ferdig strukturert og innhold seeded. **Planen var å deploye den separat på Vercel og slå på DNS-cutover slik at den nye siden overtok `finndoff.no`, mens eksisterende React-app flyttet til `app.finndoff.no`.**

Vi går nå bort fra den planen. I stedet integrerer vi markedssidene direkte inn i eksisterende app (doffin-alerts repo), og appen migreres samtidig fra CRA til Next.js. Hele stacken hostes på Azure Static Web Apps (eller Container Apps hvis SWA begrenser oss). `market.finndoff.no` slås av.

## 2. Kjernebeslutningen — alt annet er konsekvenser

**Markedsinnhold må serveres som ferdig HTML fra serveren (SSR eller SSG). Ikke CSR.**

Dette er den eneste strategiske beslutningen i hele planen. Alt annet — Next.js-migrering, Azure-hosting, monorepo-layout, MUI-cache-provider, Auth0-bytte, rekkefølge på faser — er **implementasjonsdetaljer som bare eksisterer fordi vi har tatt den ene beslutningen.** De handler om tid, risiko og innsats, ikke om SEO-utfallet.

Grunner til at SSR er uforhandlet:

- **LLM-crawlere indekserer kun HTML.** De eksekverer ikke JavaScript. I et CSR-SPA ser GPTBot `<div id="root"></div>` — tomt. Det betyr at Finndoff ikke finnes i LLM-svar om norske anbudstjenester. Gitt at B2B-prospects i stadig større grad spør ChatGPT/Perplexity før de googler, er dette en varig konkurranseulempe.
- **Google indekserer JS, men med tilgangsstraff.** Rendering-køen er opptil 2 uker lang. Konkurrenter med statisk HTML ranker raskere og stabilere på samme keywords.
- **Core Web Vitals** er 2–4× bedre med SSR på sammenlignbart innhold. LCP og CLS er ranking-signaler.
- **JSON-LD, canonical URLs, per-side OG-bilder, hreflang** krever HTML ved response-tid. Client-side-injection teller ikke for søk eller deling.

**Konklusjonen er binær.** "Litt SSR" finnes ikke for et SPA. Enten er markedssidene server-rendret, eller så har vi ikke løst det opprinnelige problemet — vi har bare flyttet det fra WIX-iframe til React-bundle.

### Sekundære tekniske avveininger

Alt under er innsats/risiko-spørsmål, ikke SEO-spørsmål. De endrer hvor raskt og hvor trygt vi kommer til mål, ikke om vi kommer dit.

| Valg | Innsats | Hva hvis vi velger "feil" |
|---|---|---|
| Azure SWA → Container Apps | 1–3 dagers re-deploy | Ingen SEO-tap |
| Parallell vs. big-bang migrering | Uker med dobbel vedlikehold vs. mørk periode | Ingen SEO-tap |
| MUI-re-impl vs. Tailwind-i-CRA | Uker komponent-arbeid | Ingen SEO-tap |
| Auth0-pakkebytte | Noen dager + testing | Brekker innlogging midlertidig, ikke SEO |
| 301-redirect-completeness | Timer | Noe tapt ranking på eksisterende URL-er hvis mangelfullt |

## 3. Valgt arkitektur

### Teknisk oppsett

- **Rammeverk:** Next.js 16, App Router. Samme major-versjon som finndoff-web-scaffoldet, så moduler kan portes med minimal friksjon.
- **Styling:** MUI 7 + Emotion (som i dag i appen). Tailwind-klasser fra finndoff-web re-implementeres som MUI `sx`-props eller theme-extensions. JetBrains Mono beholdes; Roboto + Work Sans legges til via `next/font`.
- **Auth:** `@auth0/nextjs-auth0` (erstatter `@auth0/auth0-react`). Tokens håndteres server-side; app-ruter kan lese session både server- og client-side.
- **CMS:** Sanity, prosjekt-ID `tuwrtxu5` uendret. Studio flyttes fra `finndoff-web`-repo til doffin-alerts og eksponeres på `/studio`.
- **Host:** Azure Static Web Apps (Standard plan) som utgangspunkt. Container Apps / App Service med Docker (`next build` + `output: 'standalone'`) som fallback hvis SWA sliter med SSR-funksjonalitet eller bundle-limits.
- **Repo-layout:** Parallell Next.js-app i samme repo (`apps/web/` ved siden av eksisterende `Frontend/doffin-alerts/`). Legacy CRA fryses for bugfixes, ny app overtar rute for rute.

### URL-struktur (flat, markedsinnhold på toppen)

Markedsruter (Server Components — SSR):
```
/                          hjem
/varsling                  produkt
/innsikt                   produkt
/anbudshjelp-ai            produkt
/konsulent                 produkt
/priser                    prisside
/om-oss                    selskap
/nyheter                   blogg-liste
/nyheter/[slug]            blogg-artikkel
/hjelpesenter              FAQ-hub
/hjelpesenter/[kategori]   FAQ-kategori
/kontakt                   kontaktskjema
/partnere                  kompetansenettverk
/partner/[slug]            partner-landingsside (MEF, NESO, osv.)
/vilkar                    terms
/personvern                privacy
/studio                    Sanity Studio (admin)
```

App-ruter (Client Components — CSR bak Auth0):
```
/portal/start              dashboard
/portal/search             søk
/portal/notice             kunngjøringsdetalj
/portal/profile            profil
/portal/beta/*             Anbudshjelp AI-modulen
/portal/**                 øvrige innloggede views
```

`finndoff.no/` skal ikke lenger auto-redirecte uinnloggede til `/portal/start`. Forsiden er markedssiden.

## 4. Fase 0 — plattform-migrering (grunnmur)

**Mål:** App-delen fungerer identisk som i dag, men nå på Next.js-stacken i stedet for CRA. Ingen synlige endringer for brukere. Ingen Sanity-innhold ennå. Iframes mot WIX kan midlertidig beholdes under nye paths hvis nødvendig, men bør fjernes i Fase 1.

**Arbeidspakker:**

1. **Repo-scaffold:**
   - Opprett `apps/web/` med `create-next-app@latest --ts --app --src-dir`.
   - Sett opp `pnpm` eller `yarn workspaces` for å dele node_modules mellom legacy og ny app.
   - Kopier over `.env`-strukturen fra finndoff-web og doffin-alerts (Auth0, Sanity, API-URL-er).

2. **MUI-oppsett for App Router:**
   - Installer `@mui/material`, `@mui/material-nextjs`, `@emotion/react`, `@emotion/styled`, `@emotion/cache`.
   - Legg `AppRouterCacheProvider` i `app/layout.tsx`.
   - Flytt `theme/theme.ts` fra doffin-alerts inn uforandret; wrapp i `ThemeProvider` i en Client Component-barnkomponent av layout.
   - Port `CssBaseline`, `StyledEngineProvider`, `LocalizationProvider` fra `App.tsx`.

3. **Auth0-migrering:**
   - Installer `@auth0/nextjs-auth0` (App Router-kompatibel versjon).
   - Sett opp `app/api/auth/[...auth0]/route.ts` med login/logout/callback.
   - Erstatt `<Auth0Provider>` med `<UserProvider>` fra `@auth0/nextjs-auth0/client`.
   - Refaktorer alle `useAuth0()`-kall (>30 steder i doffin-alerts) til `useUser()` fra nextjs-auth0.
   - Verifiser at samme Auth0-tenant + callback-URL fungerer mot både test og prod.
   - Test silent token refresh og logout-flow grundig.

4. **Routing-migrering:**
   - Konverter `src/components/RoutingComponent/RoutingComponent.tsx` til filbasert routing.
   - Map hver rute i `paths.ts` + `portalPaths.ts` til en `page.tsx` under `app/portal/*`.
   - Legg `"use client"` på alle portal-ruter (de er interaktive og data-drevet).
   - Erstatt `<Link>` fra react-router med `next/link`.
   - Erstatt `useNavigate` → `useRouter` (next/navigation), `useLocation` → `usePathname`, `useParams` → `useParams` fra next.
   - `ScrollToTop`-komponenten implementeres som hook i root layout.

5. **SCSS + asset-pipeline:**
   - Installer `sass`. Next.js leser `.scss`-filer native.
   - Fjern `node-sass` (foreldet).
   - `public/`-assets flyttes 1:1.
   - `react-helmet-async` fjernes — erstattes av Next.js `generateMetadata()`.

6. **Tredjepartsbibliotek som krever ekstra oppmerksomhet:**
   - `react-quill-new`: må wrappes i `dynamic(() => import(...), { ssr: false })`.
   - `react-beautiful-dnd`: krever `"use client"` + noen ganger hack for StrictMode (bruk `@hello-pangea/dnd`-forken som erstatter).
   - `react-data-table-component`: Client Component.
   - `react-gtm-module`: flyttes til `Script`-tag med `strategy="afterInteractive"`.
   - `react-google-recaptcha`: Client Component.

7. **API-lag:**
   - `src/api/` (swagger-generert) endres ikke. `http-client.ts` fortsetter å funke client-side.
   - `securityWorker` i `ApiContext.tsx` må hente token via nextjs-auth0 i stedet for auth0-react.

8. **Deploy til Azure Static Web Apps:**
   - Opprett ny SWA-ressurs. Pek på `apps/web/` som app-mappe.
   - GitHub Actions-workflow genereres av SWA.
   - Konfigurer custom domain (staging-URL først, f.eks. `next.finndoff.no`).
   - Verifiser Auth0 callback-URL matcher.
   - Kjør smoke-test: login, søk, Anbudshjelp AI-flow, logout.

9. **Spike-sjekk for SWA-kompatibilitet (gjøres i uke 1):**
   - Test at bundle < 250 MB etter build.
   - Test at ISR-revalidering funker (trigger via Sanity webhook på en dummy-side).
   - Test at middleware kjører (f.eks. locale-detection eller Auth0-gating).
   - Hvis én av disse brekker: bytt til Azure Container Apps med `next build --output standalone` i Docker. Dokumentér beslutningen.

**Eksistans-kriterium:** alle eksisterende `/portal/*`-ruter fungerer under Next.js, alle Auth0-flows passerer, bundle-size og LCP er ikke verre enn CRA-baseline. Ingen markedsinnhold migrert ennå.

**Tidsestimat:** 3–5 uker for én person. Reduserbart ved parallellisering av Auth0-migrering og MUI-oppsett.

## 5. Fase 1 — bytt WIX-iframes til Sanity-drevne markedssider

**Mål:** Alle iframes mot `market.finndoff.no` er erstattet. Markedsinnholdet ligger nå direkte på toppdomenet som server-rendret HTML. SEO-gevinsten låses inn her.

**Arbeidspakker:**

1. **Flytt Sanity Studio:**
   - Kopier `src/sanity/` (schemas, queries, config, scripts) fra finndoff-web → `apps/web/src/sanity/` i doffin-alerts.
   - Eksponer Studio på `/studio` via `app/studio/[[...tool]]/page.tsx` (standard Sanity Next.js-pattern).
   - Sett `NEXT_PUBLIC_SANITY_PROJECT_ID=tuwrtxu5`, samme dataset (`production`).
   - Ingen innhold trenger re-migrering — Sanity-innholdet ligger der det er.
   - Arkivér `finndoff-web`-repoet eller marker det som deprecated i README.

2. **Port PageBuilder + 15 moduler fra Tailwind → MUI:**
   - Komponenter å porte: `Hero`, `FeatureGrid`, `PricingTable`, `PricingCalculator`, `TrustBar`, `Testimonial`, `VideoEmbed`, `CtaSection`, `FaqAccordion`, `Timeline`, `PartnerShowcase`, `ComparisonTable`, `TextSection`, `TeamGrid`, `ContactSection`, `PageBuilder`.
   - Strategi: behold Sanity-schema + GROQ-queries uforandret. Re-implementér kun JSX-rendringen i MUI.
   - Verkstedet-designtokens (teal `#008489`, copper `#C17F3E`, warm `#FAFAF7`, blueprint grid, `mono-label`, `verksted-card`) legges inn i `theme/theme.ts` som MUI custom palette + komponentoverrides.
   - Tailwind-spesifikke utility-klasser (`blueprint-grid`, `verksted-gradient`) implementeres som Emotion-styled komponenter eller theme-mixins.
   - Test hver modul i Sanity Studio preview-mode.

3. **Implementér markedsruter som Server Components:**
   - `app/page.tsx` (hjem) — fetcher Sanity-side med slug `hjem` via server-side GROQ.
   - `app/[slug]/page.tsx` — generic page renderer for alle Sanity `page`-dokumenter.
   - `app/nyheter/page.tsx` — blogg-liste med pagination.
   - `app/nyheter/[slug]/page.tsx` — blogg-artikkel med PortableText.
   - `app/hjelpesenter/page.tsx` — se Fase 2, men infrastrukturen klargjøres her.
   - Ingen `"use client"` på markedsruter med mindre nødvendig (f.eks. `PricingCalculator`, `FaqAccordion`, `ContactSection` — isolerte Client Components som innebygges i Server-rendret shell).

4. **SEO-infrastruktur:**
   - `generateMetadata()` per side: `title`, `description`, `openGraph`, `twitter`, `canonical`.
   - `app/sitemap.ts`: genererer sitemap dynamisk fra Sanity-innhold (pages + blogPosts + FAQs).
   - `app/robots.ts`: allow på markedsruter, disallow på `/portal/*` (forhindrer at innlogget UI indekseres), eksplisitt allow for `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `anthropic-ai`, `cohere-ai`, `CCBot`.
   - JSON-LD: `Organization` i root layout, `Product` per produktside, `FAQPage` på hjelpesenter og homepage-FAQ, `Article` på blogg, `BreadcrumbList` overalt, `LocalBusiness` med adresse til Narvik og Oslo.
   - OG-image generering via `app/opengraph-image.tsx` med Next.js native image-generering (eller statiske per side).
   - `<html lang="no">` i root layout.

5. **Revalidering / content-pipeline:**
   - Sanity webhook → Next.js `/api/revalidate` endpoint med `revalidateTag()` eller `revalidatePath()`.
   - Sett tags på fetch-calls (f.eks. `fetch(url, { next: { tags: ['page', slug] }})`).
   - Test at redaktører kan publisere i Studio og se endringer live innen sekunder.

6. **301-redirects:**
   - `market.finndoff.no/nyheter/{slug}` → `finndoff.no/nyheter/{slug}` (30 slugs — map i `steg1-kartlegging.md` seksjon D).
   - `market.finndoff.no/priser` → `finndoff.no/priser`, tilsvarende for alle WIX-sider.
   - `finndoff.no/portal/about` → `finndoff.no/om-oss`.
   - `finndoff.no/portal/news` → `finndoff.no/nyheter`.
   - `finndoff.no/portal/priser` → `finndoff.no/priser`.
   - `finndoff.no/portal/anbudshjelp-ai` → `finndoff.no/anbudshjelp-ai`.
   - (fullfør liste som en tabell i SWA `staticwebapp.config.json` eller Next.js `redirects()` i `next.config.ts`).
   - Core-side-redirect fra `/` → fjerne auto-redirect til `/portal/start` for uinnloggede.

7. **DNS + cutover:**
   - Når staging er verifisert: bytt `finndoff.no` A/CNAME til ny SWA-instans.
   - Sett `market.finndoff.no` til 301 → `finndoff.no` (bevar slug-mapping via SWA routes eller en liten Cloudflare Worker).
   - Lav TTL (300s) i dagene før cutover for rask rollback.
   - Overvåk Search Console i 4 uker: crawl-feil, indekseringsprosent, klikk på gamle vs. nye URL-er.

**Eksistans-kriterium:** Alle markedssider ligger på `finndoff.no/*`, Sanity Studio fungerer, 301-map dekker alle gamle URL-er, JSON-LD validerer i Google Rich Results Test, Lighthouse gir LCP < 1.5s / CLS < 0.05 / INP < 100ms på minst hjem, priser, ett produktside og ett blogginnlegg.

**Tidsestimat:** 4–6 uker. Port-arbeid av de 15 modulene dominerer.

## 6. Fase 2 — nye sider som ikke finnes i dag

**Mål:** Dekke innholdshull som prosjektet har identifisert men som WIX-siden aldri leverte.

**Arbeidspakker:**

1. **`/hjelpesenter`** — 53 FAQ-dokumenter i 9 kategorier, allerede seeded i Sanity (`seed-hjelpesenter-faq.ts`).
   - Sticky kategorisidebar, søk, accordion-visning per kategori.
   - `FAQPage` JSON-LD per kategori-side.
   - Dypelenker: `/hjelpesenter#oppsigelse` osv.

2. **Partnersider** (`/partner/byggmesterforbundet`, `/partner/mef`, `/partner/neso`, `/partner/arkitektbedriftene`):
   - Co-branded hero med partnerlogo + Finndoff-logo.
   - Medlemspris / spesialtilbud.
   - HubSpot-skjema med UTM-sporing (`?_referral=mefmember`-mønsteret videreføres).
   - Egen `partner`-schema i Sanity.

3. **Kundecase** (`/case/[slug]` eller som seksjon på forside + produktsider):
   - Reell bedrift, utfordring, resultat, tall, sitat, bilder.
   - Krever at Hjalmar/Thomas samler inn 3–5 reelle case med konkrete tall.

4. **Bransjesider** (SHOULD, ikke MUST):
   - `/bransje/bygg`, `/bransje/arkitekt`, `/bransje/renhold` osv.
   - Long-tail SEO for vertikaler. Start med 3–5 håndskrevne sider, ikke autogenererte.

5. **`/kontakt`** — dedikert kontaktside med:
   - Booking-lenke til Thomas (Varsling), Daniel (Anbudshjelp AI).
   - HubSpot-skjema.
   - Bilder av kontaktpersoner.
   - Kontaktkategorier uten "avslutte prøveperiode" (UX-review-funn #16).

**Tidsestimat:** 2–3 uker.

## 7. Fase 3 — styling-polish og konsolidering

**Mål:** Konsistent visuell opplevelse mellom marketing og app. Adressere resterende UX-review-funn.

**Arbeidspakker:**

- Unify Verkstedet-tokens mellom marketing-Sanity-moduler og app-MUI-theme (copper-farger, blueprint grid-intensiteter, skygge-tokens).
- Animasjoner og mikrointeraksjoner (hover-states, CTA pulse-glow).
- Lucide-ikonintegrasjon: appen bruker MUI icons, marketing bruker Lucide via `DynamicIcon`. Avklar om begge kan eksistere eller om vi konsoliderer.
- Accessibility-audit med axe: kontrast, ARIA, keyboard-nav.
- CWV-tuning: font-preloading, bildet-sizing, bundle-splitting for tunge ruter.
- Diversifisering av testimonials (ikke bare Tore Killi gjentatt — UX-review-funn #5).
- Fiks skrivefeil i Sanity-innhold (UX-review-funn #15).
- Oppdatering av onboarding-tidslinje til 3–4 steg (UX-review-funn #13).

**Tidsestimat:** 2 uker.

## 8. Kritiske risikopunkter

### Må valideres i uke 1

- **Azure SWA + Next.js 16 hybrid rendering.** Lag en minimal spike med én SSR-rute + én ISR-rute + én middleware. Bekreft at alt fungerer innenfor SWA Standard-begrensningene. Hvis ikke: bytt til Container Apps før mer arbeid legges inn.
- **Auth0 nextjs-auth0 + eksisterende tenant.** Bekreft at callback-URL, silent auth, og logout funker. Test på test-miljøet først (`finndoff-test.eu.auth0.com`).

### Kan oppstå senere

- **Bundle-size etter MUI-tree-shaking.** MUI 7 + datagrid + charts + PDF-libs kan presse mot 250 MB SWA-limit. Bundle-analyzer på dag én etter Fase 0.
- **SSR-hydration-mismatch på MUI-komponenter** med theme-avhengig rendering (dark mode, media queries). Emotion cache-provider må konfigureres riktig.
- **Sanity revalidering-latency** gjennom Azure SWA. Vercel revaliderer på millisekunder; SWA kan ha 10+ sekunders latency. Sjekk tidlig med redaktørene.
- **Redirects fra gamle WIX-slugs.** 30 blogg-slugs har norske tegn og spesialtegn i URL-en (`finndoff-bare-funker-for-nesna-maskinstasjon` osv.) — test URL-enkoding grundig.
- **`/portal/start`-redirect for uinnloggede.** Hvis vi ikke er nøye, kan innloggede brukere ende på marketing-forsiden i stedet for dashboard. Sjekk både utlogget og innlogget flow eksplisitt.

## 9. SEO og LLM-synlighet — konkret sjekkliste

Disse punktene gir SEO-gevinsten vi prosjekterer. Alt kan implementeres i Fase 1.

### Må-ha

- [ ] Server-rendret HTML på alle markedsruter (ikke `"use client"`).
- [ ] `generateMetadata()` per side med unik title, description, canonical URL.
- [ ] `<html lang="no">`.
- [ ] OG-bilder per side (`app/opengraph-image.tsx` eller per-route `opengraph-image.png`).
- [ ] `sitemap.xml` generert dynamisk fra Sanity.
- [ ] `robots.txt` med eksplisitt allow for GPTBot, ClaudeBot, PerplexityBot, Google-Extended, anthropic-ai, CCBot.
- [ ] JSON-LD: Organization, Product, FAQPage, Article, BreadcrumbList, LocalBusiness.
- [ ] 301-redirects for alle gamle URL-er (WIX + `/portal/*` marketing-paths).
- [ ] Semantisk HTML: `<header>`, `<main>`, `<article>`, `<nav>`, riktig heading-hierarki.
- [ ] LCP < 1.5s, CLS < 0.05, INP < 100ms på alle markedsruter (mål via Lighthouse og Search Console).

### Bør-ha

- [ ] hreflang (kun `no` for nå, men sett riktig).
- [ ] Internal linking mellom produktsider, blogg og hjelpesenter (PageBuilder kan generere "relaterte artikler").
- [ ] Breadcrumbs visuelt + JSON-LD.
- [ ] Strukturerte data for Priser (`Offer`-schema for pristrinn).
- [ ] FAQ Rich Results: `FAQPage` med alle 9 prospect-FAQ på homepage.

### Kan-ha (senere)

- [ ] Bransjesider (`/bransje/*`) — 5–8 håndskrevne landingssider.
- [ ] Lokale sider (`/anbud/{fylke}`) med data fra app-backend.
- [ ] PageSpeed Insights-overvåking automatisert via GitHub Actions.
- [ ] Automatisert JSON-LD-validering i CI.

## 10. Åpne spørsmål som ikke blokkerer oppstart

- Skal vi arkivere `finndoff-web`-repoet etter flytting, eller beholde som read-only referanse? Anbefalt: arkiver, all kode og Sanity-innhold lever i doffin-alerts.
- Hvordan håndterer vi feature-flags under parallell-migrering? Eget subdomene (`next.finndoff.no`) til vi er klare, eller canary-routing basert på Cloudflare cookie? Sannsynligvis subdomene — enkleste rollback.
- Skal Sanity Studio være på `finndoff.no/studio` eller eget subdomene (`cms.finndoff.no`)? Anbefalt: samme domene, enklere Auth0.
- Kundecase-innsamling: hvem driver det? Uten reelt innhold blir Fase 2 svakere. Bør starte parallelt med Fase 0.
- Hva med doffin-alerts-demo på Vercel (anbudshjelp-ai-demo)? Påvirkes ikke av denne migreringen, kan fortsette som demo-deploy uavhengig.

## 11. Anbefalt rekkefølge og tidsramme

| Uke | Aktivitet | Leveranse |
|---|---|---|
| 1 | Spike: Azure SWA + Next.js 16 + Auth0 | Go/no-go på SWA vs. Container Apps |
| 1–2 | Monorepo-scaffold, MUI-oppsett, theme-port | `apps/web/` kjører hello-world under Auth0 |
| 2–5 | Fase 0: CRA → Next.js routing + komponenter | App-paritet på staging |
| 5–10 | Fase 1: Sanity Studio-flytting, modul-porting, markedsruter | Markedssider live på staging med SSR |
| 10 | DNS cutover + 301-redirects + Search Console-monitoring | `finndoff.no` overtatt av ny stack |
| 11–13 | Fase 2: hjelpesenter, partnersider, kundecase | Nye sider live |
| 13–15 | Fase 3: styling-polish, CWV-tuning, a11y | Prosjekt ferdig |

**Totalt: 13–15 uker fra kickoff til ferdig prosjekt,** forutsatt én fulltids utvikler. Kortere med parallellisering.

## 12. Hvordan bruke dette dokumentet med Claude Code

- Åpne `doffin-alerts/Frontend/doffin-alerts/` i VS Code.
- Start med: `"Les docs/implementasjonsplan-integrering-i-react-app.md seksjon 4 (Fase 0) og begynn med arbeidspakke 1 (repo-scaffold). Vis meg en konkret plan før du skriver kode."`
- Behold `CLAUDE.md` i doffin-alerts-repoet oppdatert med nye konvensjoner etter hvert.
- Ved hver ny arbeidspakke: gi Claude eksplisitt hvilket avsnitt i dette dokumentet som gjelder.
- Ikke la Claude hoppe over spike-fasen i uke 1 — SWA-kompatibilitet er eneste gate for hele planen.

---

**Bunnlinje:** Den ene beslutningen som betyr noe er SSR for markedsinnholdet. Resten er Håvards håndverk med Claude Code som assistent. Innsatsen er betydelig (13–15 uker), men gevinsten er permanent: Finndoff blir synlig for både Google og LLM-er på sitt eget toppdomene, med én redaktørflyt, i én kodebase, på infrastruktur som allerede er i bruk for backend.
