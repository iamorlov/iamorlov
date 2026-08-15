# Design

## Theme

Graphite & Spectrum. Matte premium dark: cool graphite near-black, film grain, a quiet three-hue cool spectrum (mint, sapphire, violet) led by sapphire. Machined, nocturnal, precise. Single screen (100dvh), no scrolling at any viewport.

## Color

All tokens OKLCH, defined in `src/app/globals.scss`:

| Token | Value | Role |
|---|---|---|
| `--bg` | `oklch(15.5% 0.01 255)` | Page background (cool graphite) |
| `--porcelain` | `oklch(92% 0.01 240)` | Primary type (cool porcelain white) |
| `--porcelain-dim` | `oklch(70% 0.014 245)` | Secondary type, resting links |
| `--accent` | `oklch(70% 0.13 250)` | Sapphire: ORLOV fill, hairline center, hovers, focus, selection |
| `--accent-deep` | `oklch(56% 0.14 258)` | Reserved deep sapphire |
| `--accent-mint` | `oklch(78% 0.1 175)` | Mint: role period, hairline left |
| `--accent-violet` | `oklch(66% 0.1 300)` | Violet: hairline right, top-right atmosphere breath |

Strategy: Full palette, quiet. Three cool hues (mint 175, sapphire 250, violet 300), each with a fixed role. Sapphire leads (ORLOV + all interactive states); mint and violet appear only as punctuation and ambience. Never let mint or violet take an interactive role, never add a fourth hue, keep chroma ≤0.13 (matte, not neon).

## Typography

Single family: **Gabarito** (variable, via next/font). Rounded geometric; soft but premium.

- Name: weight 700, uppercase, `line-height 0.88`, tracking −0.015em, `font-size: min(clamp(5rem, 17vw, 17rem), 27svh, 24vw)` (24vw term guards 320px screens). VADYM solid porcelain, ORLOV solid sapphire. Never outline/hollow text: outline strokes cross where negative tracking overlaps glyphs. Never weight 900 (user finds it too heavy).
- Role line: weight 300, uppercase, tracking 0.14em, sapphire period.
- Link labels: weight 500, 0.85rem, uppercase, tracking 0.09em.

## Motion

Easings: `--ease-out-expo` (0.16,1,0.3,1), `--ease-out-quint` (0.22,1,0.36,1). No bounce, no elastic.

Load choreography (framer-motion): letters rise with blur-reveal (0.05s stagger, 0.9s expo), VADYM at 0.15s, ORLOV at 0.4s; hairline draws scaleX at 1.05s; role fades up at 1.2s; links stagger from 1.55s. Idle: canvas grain at 12fps, 70s light drift, 11s glow breath, cursor sheen (fine pointers only). `prefers-reduced-motion`: everything collapses to 0.3s opacity fades, grain freezes.

## Components

- `Atmosphere` (`src/components/Atmosphere.tsx`): fixed background stack — CSS light drift, sapphire glow, cursor sheen (lerped CSS vars), grain canvas (160px noise tile, pattern fill, dpr ≤2, pauses when hidden).
- `.stage`: 100dvh grid `1fr auto`, fluid padding `clamp(1.5rem, 4.5vw, 4.5rem)`, safe-area aware. Composition is centered: name, hairline (symmetric fade, draws from center), role, and links all on the vertical axis.
- `.link`: icon + label, sapphire underline sweep (scaleX), icon lifts 2px on hover, ≥44px touch target.

## Rules

- Content is frozen: name, one role line, three links. Never invent copy.
- No scrolling: any new element must fit inside 100dvh at 360×640 through 4K, including 812×375 landscape.
- No gradients on text, no glassmorphism, no neon, no pure #000/#fff.
- Focus: 2px sapphire outline, 4px offset.
