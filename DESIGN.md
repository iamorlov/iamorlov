# Design

## Theme

Onyx & Ember. Matte premium dark: warm graphite near-black, film grain, one heated-bronze accent. Machined, nocturnal, precise. Single screen (100dvh), no scrolling at any viewport.

## Color

All tokens OKLCH, defined in `src/app/globals.scss`:

| Token | Value | Role |
|---|---|---|
| `--bg` | `oklch(15.5% 0.008 75)` | Page background (warm graphite) |
| `--bg-lift` | `oklch(20% 0.014 70)` | Ambient light drift |
| `--bone` | `oklch(92% 0.015 85)` | Primary type (warm bone white) |
| `--bone-dim` | `oklch(70% 0.016 80)` | Secondary type, resting links |
| `--ember` | `oklch(73% 0.125 55)` | Accent: hairline, hovers, focus, period, selection |
| `--ember-deep` | `oklch(58% 0.13 45)` | Hairline gradient tail |

Strategy: Restrained. Ember stays under 10% of the surface; never add a second accent.

## Typography

Single family: **Archivo** (variable, `wdth` axis loaded via next/font).

- Name: weight 900, `font-stretch: 125%`, uppercase, `line-height 0.84`, tracking −0.025em, `font-size: min(clamp(4.25rem, 16.5vw, 17rem), 27svh)`. Second word (ORLOV) hollow: transparent fill + bone text-stroke, indented 0.55ch.
- Role line: weight 300, uppercase, tracking 0.14em, ember period.
- Link labels: weight 500, 0.85rem, uppercase, tracking 0.09em.

## Motion

Easings: `--ease-out-expo` (0.16,1,0.3,1), `--ease-out-quint` (0.22,1,0.36,1). No bounce, no elastic.

Load choreography (framer-motion): letters rise with blur-reveal (0.05s stagger, 0.9s expo), VADYM at 0.15s, ORLOV at 0.4s; hairline draws scaleX at 1.05s; role fades up at 1.2s; links stagger from 1.55s. Idle: canvas grain at 12fps, 70s light drift, 11s ember breath, cursor sheen (fine pointers only). `prefers-reduced-motion`: everything collapses to 0.3s opacity fades, grain freezes.

## Components

- `Atmosphere` (`src/components/Atmosphere.tsx`): fixed background stack — CSS light drift, ember glow, cursor sheen (lerped CSS vars), grain canvas (160px noise tile, pattern fill, dpr ≤2, pauses when hidden).
- `.stage`: 100dvh grid `1fr auto`, fluid padding `clamp(1.5rem, 4.5vw, 4.5rem)`, safe-area aware.
- `.link`: icon + label, ember underline sweep (scaleX), icon lifts 2px on hover, ≥44px touch target.

## Rules

- Content is frozen: name, one role line, three links. Never invent copy.
- No scrolling: any new element must fit inside 100dvh at 360×640 through 4K, including 812×375 landscape.
- No gradients on text, no glassmorphism, no neon, no pure #000/#fff.
- Focus: 2px ember outline, 4px offset.
