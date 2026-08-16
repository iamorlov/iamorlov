# Design

## Theme

Split Duality. The original site's identity, refined: a diagonal two-panel split (deep navy / warm peach), cream and navy display type crossing it, a mouse-reactive particle constellation living on both sides. Bright, warm, a little playful. Single screen (100dvh), no scrolling at any viewport.

## Color

All tokens OKLCH, defined in `src/app/globals.scss` (refined from the original hex palette; keep hues recognizable):

| Token | Value | Role |
|---|---|---|
| `--navy` | `oklch(38% 0.058 265)` | Left/top panel, ORLOV fill, themeColor |
| `--navy-deep` | `oklch(33% 0.06 265)` | Selection background |
| `--cream` | `oklch(93% 0.042 108)` | VADYM fill, desktop chips |
| `--peach` | `oklch(93.5% 0.028 70)` | Right/bottom panel |
| `--sage` | `oklch(52% 0.035 150)` | Mobile chips (over peach) |

The role line is pure white under `mix-blend-mode: difference`: it self-inverts across the seam (light over navy, dark over peach). Keep it blend-based; never give it a fixed color.

## Typography

Single family: **Gabarito** (variable, via next/font). User-chosen; DM Sans, Outfit, Archivo, Sora all rejected in past iterations.

- Name words: weight 700 (never 900), uppercase, tracking −0.015em. Desktop `min(clamp(4.25rem, 11.5vw, 13rem), 24svh)` per half; mobile `min(clamp(3.75rem, 19vw, 9rem), 18svh, 23vw)`; short-landscape override caps at 20svh.
- Role line: weight 400, uppercase, tracking 0.15em, fluid 0.85–1.25rem.
- Chip labels: weight 500, 0.72rem, uppercase.

## Layout

- Desktop: VADYM centered in left (navy) half and raised `clamp(2rem, 7vh, 5rem)`; ORLOV centered in right (peach) half and lowered the same amount (echoes the diagonal). Role line centered at `74svh`, crossing the seam. Chips bottom-left half.
- Mobile (<768px): panels split top/bottom; words centered in their halves with no offset; role line dead-center on the horizontal seam; chips full-width bottom.
- Short landscape (≥768px wide, ≤480px tall): smaller names, smaller offsets, role at `66svh` (collision-checked against ORLOV above and chips below).

## Motion

Easings: expo-out `(0.16, 1, 0.3, 1)` everywhere. No springs, no bounce (original springs were refined away).

Load: peach panel slides in from the right/bottom (1.1s, 0.15s delay); VADYM letters drop from above with blur (0.5s start, 0.05s stagger), ORLOV letters rise from below (0.75s start): the original's directional identity at letter granularity. Role line fades in with letter-spacing settling (1.5s). Chips rise last (1.9s+).

Idle: particle constellation (mouse-repelled, drifts home, connection lines, split-aware colors) at ≤120 particles.

`prefers-reduced-motion`: all entrances become fades; particles render one static frame with no mouse tracking.

## Components

- `AnimatedBackground` + `ClientBackground` (ssr:false wrapper): navy base + peach `clip-path` panel (diagonal at 5°) + `ParticleLayer`.
- `ParticleLayer`: canvas constellation; colors switch per panel side; density `area/11000` capped at 120.
- `.chip`: circular icon chip + label, tint from panel (cream on navy, sage on peach), lifts 3px on hover, ≥44px touch target.

## Rules

- The split is the identity. Never flatten it to a single background (a full dark redesign was reverted).
- Content is frozen: name, "Software Engineer and Game Developer", three links. Never invent copy.
- No scrolling: everything fits 100dvh from 360×640 through 4K, including 812×375 landscape.
- No gradient text, no outline/hollow text, no glassmorphism, no pure #000/#fff.
