# Bitcoin Silver — Landing Page

Marketing site for the Bitcoin Silver (BTCS) blockchain, deployed to GitHub
Pages at [bitcoinsilver.top](https://bitcoinsilver.top).

Built with Vite, React 18, TypeScript and Tailwind CSS.

## Getting started

```bash
npm ci
npm run dev      # http://localhost:5173
```

```bash
npm run build    # type-checks, then builds to dist/
npm run lint
npm run preview  # serve the production build locally
```

Node 18+ is required; CI builds on Node 24.

## Project structure

```
src/
├── components/
│   ├── ui/                 # shadcn-style primitives (button, card, dropdown)
│   ├── icons/              # inline brand marks (platform, social)
│   ├── tokenomics/         # supply charts, cards, and their chart types
│   ├── Header.tsx          # sticky nav, active section, scroll progress
│   ├── HeroSection.tsx
│   ├── NetworkTicker.tsx   # running band of live network numbers
│   ├── MarketsSection.tsx  # exchanges and trackers
│   ├── BrandMark.tsx       # exchange logo or monogram
│   ├── StatsSection.tsx    # live explorer numbers, counted up
│   ├── NodeMapSection.tsx  # Leaflet peer map (lazy-loaded)
│   ├── WalletsSection.tsx
│   ├── FeaturesSection.tsx
│   ├── TokenomicsSection.tsx  # Recharts (lazy-loaded)
│   ├── RoadmapSection.tsx
│   ├── CommunitySection.tsx
│   ├── Footer.tsx
│   ├── SectionHeading.tsx  # shared section header
│   └── POWAnimation.tsx    # latest-blocks grid
├── hooks/
│   └── useBlockchainData.tsx  # provider + hook for explorer data
├── lib/
│   ├── format.ts           # number formatting
│   ├── links.ts            # shared social links
│   ├── markets.ts          # exchanges and trackers (one source)
│   ├── motion.ts           # framer-motion presets
│   ├── useCountUp.ts       # number count-up
│   ├── useSpotlight.ts     # cursor-following card highlight
│   └── utils.ts            # cn()
├── utils/
│   └── tokenomicsCalculations.ts
├── index.css               # design tokens, layout wrappers, base styles
└── main.tsx

public/
├── legal.css               # shared styles for the static legal pages
├── fonts/                  # latin subsets those pages load directly
├── brands/                 # optional exchange logos (see BrandMark)
├── privacy.html · terms.html · risk-disclosure.html
└── logo.png · whitepaper.pdf · robots.txt · sitemap.xml
```

## Design system

All colour, spacing and type decisions run through tokens — components should
not carry raw hex values.

- **Tokens** live in `src/index.css` as HSL triples: four surface levels
  (`--surface-0…3`), three text levels (`--fg`, `--fg-muted`, `--fg-subtle`),
  two line weights, and exactly one accent (`--brand`, a cool platinum cyan).
  The shadcn aliases (`--background`, `--card`, `--primary`, …) map onto these.
- **The accent is rationed.** It marks primary CTAs, live/active states and
  focus. Everything else is built from brightness steps, which is what gives
  the page its metallic feel. `--glow-2` exists only for background light
  fields — never use it for text, borders or fills.
- **Width** comes from three wrappers, not Tailwind's `container` (that core
  plugin is switched off): `.shell` for normal sections (max 1920px),
  `.shell-wide` (max 2240px), `.shell-bleed` for truly edge-to-edge blocks
  like the node map, and `.shell-tight` for running text. All three use a fluid `padding-inline`, so the gutter grows
  with the viewport instead of jumping at breakpoints.
- **Type** uses a fluid scale — `text-display-2xl` down to `text-lead` in
  `tailwind.config.js`. Prefer these over ad-hoc `text-3xl md:text-4xl` chains.
  Sora is the display face, Inter the body face; both are self-hosted via
  `@fontsource-variable` so no request goes to Google.
- **Motion** presets live in `src/lib/motion.ts`. Use `fadeUp` /
  `fadeUpStagger(i)` rather than writing new `initial`/`whileInView` blocks, so
  timing stays consistent. `prefers-reduced-motion` is honoured globally.
  Above the fold, use `riseOnMount`, which animates transform only — if the
  animation never runs, the content is still visible.
- **Section rhythm**: `.section` / `.section-tight` for vertical padding,
  `.hairline-top` for the divider, `.icon-chip` for icon containers,
  `.text-silver` for the brushed-metal headline treatment, `.spotlight` for
  cards that light up under the cursor (pair it with `useSpotlight`).

## Live data

`BlockchainDataProvider` (in `src/hooks/useBlockchainData.tsx`) wraps the app
and polls the explorer once every 30 seconds. Components read it via
`useBlockchainData()` — do not add a second provider, and do not fetch these
endpoints directly, or the page goes back to making duplicate requests.

Endpoints (proxied through Vite in dev, see `vite.config.ts`):

- `/api/getdifficulty`, `/api/getblockcount`, `/api/getnetworkhashps`
- `/ext/getmoneysupply`, `/api/getconnectioncount`

When the explorer is unreachable the UI shows `—` and an "unavailable" note.
It deliberately does **not** fall back to invented numbers.

The node map calls `https://bitcoinsilver.eu/api/peers`. That endpoint allows
CORS **only** for `https://bitcoinsilver.top`, so it works in production but
not from localhost. Dev therefore routes through a Vite proxy (`/peers-api`,
see `vite.config.ts`). If you add another dev origin, give it the proxy too —
an allowlist entry on the server would have to be added upstream.

## Static legal pages

`privacy.html`, `terms.html` and `risk-disclosure.html` are plain HTML served
straight from `public/`, outside the React app. They share `public/legal.css`,
which mirrors the tokens from `src/index.css` — **if the palette changes there,
update it here too.** They load their fonts from `public/fonts/` because a
static page cannot resolve the hashed filenames in the Vite build output.

`public/Privacy-Policy` (no file extension) is a plain-text duplicate of the
privacy policy. It is not linked from anywhere in this repo, but the URL is
likely referenced by the Google Play listing for the wallet app — check the
Play Console before removing it.

## Deployment

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes `dist/` to GitHub Pages. `public/CNAME` pins the custom domain.

Note that `public/.htaccess` has no effect on GitHub Pages — it is Apache
configuration. If those security headers and the SPA fallback matter, they
have to be set wherever the site is actually served from.
