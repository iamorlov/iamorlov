# Design

## Theme

Matte Monochrome. Near-black and soft white only: film grain, neutral light, hierarchy carried entirely by lightness and weight. Machined, nocturnal, precise. Single screen (100dvh), no scrolling at any viewport.

## Color

All tokens OKLCH, defined in `src/app/globals.scss`:

| Token | Value | Role |
|---|---|---|
| `--bg` | `oklch(14.5% 0.005 260)` | Page background (matte near-black) |
| `--white` | `oklch(94% 0.004 260)` | Primary type (VADYM), hovers, focus, selection, period |
| `--white-dim` | `oklch(68% 0.005 260)` | Secondary type, resting links |
| `--gray` | `oklch(55% 0.006 260)` | ORLOV fill, hairline low tones |

Strategy: Monochrome. Zero hue; chroma never exceeds 0.006 (the whisper tint that keeps neutrals from going dead). Hierarchy comes from lightness steps (94 / 68 / 55 on 14.5) and weight (700 / 500 / 300). Never introduce a colored accent; emphasis = brighter, never bluer.

## Typography

Single family: **Gabarito** (variable, via next/font). Rounded geometric; soft but premium.

- Name: weight 700, uppercase, `line-height 0.88`, tracking −0.015em, `font-size: min(clamp(5rem, 17vw, 17rem), 27svh, 24vw)` (24vw term guards 320px screens). VADYM solid white, ORLOV solid gray (tonal recession). Never outline/hollow text: outline strokes cross where negative tracking overlaps glyphs. Never weight 900 (user finds it too heavy).
- Role line: weight 300, uppercase, tracking 0.14em, sapphire period.
- Link labels: weight 500, 0.85rem, uppercase, tracking 0.09em.

## Motion

Easings: `--ease-out-expo` (0.16,1,0.3,1), `--ease-out-quint` (0.22,1,0.36,1). No bounce, no elastic.

Load choreography (framer-motion): letters rise with blur-reveal (0.05s stagger, 0.9s expo), VADYM at 0.15s, ORLOV at 0.4s; hairline draws scaleX at 1.05s; role fades up at 1.2s; links stagger from 1.55s.

Idle: canvas grain at 12fps; 70s light drift; 11s glow breath; hairline tonal shimmer drifts along the strand (10s alternate, 220% background-size under an edge-fade mask); cursor sheen plus glow parallax (lerped `--mx`/`--my` vars on the atmosphere container, fine pointers only).

Interaction: name letters lift 0.045em under cursor (0.25s quart); link underline sweep and icon lift.

`prefers-reduced-motion`: choreography collapses to 0.3s opacity fades, grain freezes, drift/parallax/letter-lift off.

## Components

- `Atmosphere` (`src/components/Atmosphere.tsx`): fixed background stack — CSS light drift, neutral glow, cursor sheen (lerped CSS vars), grain canvas (160px noise tile, pattern fill, dpr ≤2, pauses when hidden).
- `.stage`: 100dvh grid `1fr auto`, fluid padding `clamp(1.5rem, 4.5vw, 4.5rem)`, safe-area aware. Composition is centered: name, hairline (symmetric fade, draws from center), role, and links all on the vertical axis.
- `.link`: icon + label, white underline sweep (scaleX), icon lifts 2px on hover, ≥44px touch target.

## Rules

- Content is frozen: name, one role line, three links. Never invent copy.
- No scrolling: any new element must fit inside 100dvh at 360×640 through 4K, including 812×375 landscape.
- No gradients on text, no glassmorphism, no neon, no pure #000/#fff, no colored accents (monochrome is the identity).
- Focus: 2px white outline, 4px offset.
