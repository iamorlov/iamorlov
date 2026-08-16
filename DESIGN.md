# Design

## Theme

Ink & Verdigris. The split identity in a modern duotone: deep ink blue-black panel against a muted teal-verdigris panel, each with its own living background effect (constellation on ink, rising embers on teal). Energetic, warm, game-dev confident. Single screen (100dvh), no scrolling at any viewport.

## Color

All tokens OKLCH, defined in `src/app/globals.scss`:

| Token | Value | Role |
|---|---|---|
| `--ink` | `oklch(21% 0.035 270)` | Left/top panel, ORLOV fill, mobile chips, themeColor |
| `--ink-deep` | `oklch(16.5% 0.03 270)` | Selection text |
| `--teal` | `oklch(62% 0.1 195)` | Right/bottom panel, selection background |
| `--warm-white` | `oklch(94% 0.015 60)` | VADYM fill, desktop chips, constellation |
| `--warm-white-dim` | `oklch(78% 0.02 60)` | Role line |

The role line lives entirely on the ink panel and uses `--warm-white-dim`. **Never use `mix-blend-mode` for text over the split**: `.stage` has a z-index stacking context, so blends cannot see the fixed background behind it (this shipped broken once as white-on-light). Any text near the seam must be position-checked against the 5° diagonal, not the 50% line.

## Typography

Single family: **Gabarito** (variable, via next/font). User-chosen; DM Sans, Outfit, Archivo, Sora all rejected in past iterations.

- Name words: weight 700 (never 900), uppercase, tracking −0.015em. Desktop `min(clamp(4.25rem, 11.5vw, 13rem), 24svh)` per half; mobile `min(clamp(3.75rem, 19vw, 9rem), 18svh, 23vw)`; short-landscape override caps at 20svh.
- Role line: weight 400, uppercase, tracking 0.15em, fluid 0.85–1.25rem.
- Chip labels: weight 500, 0.72rem, uppercase.

## Layout

- Desktop: VADYM centered in left (ink) half and raised `clamp(2rem, 7vh, 5rem)`; ORLOV centered in right (teal) half and lowered the same amount (echoes the diagonal). Role line centered under VADYM at `left: 25%, top: 63svh`, max-width 44vw, always fully inside the ink half. Chips bottom-left half.
- Mobile (<768px): panels split top/bottom; words centered in their halves with no offset; role line at `36.5svh`, fully inside the top (ink) half with margin against the tilted seam; chips full-width bottom over teal.
- Short landscape (≥768px wide, ≤480px tall): smaller names, smaller offsets, role at `60svh` (collision-checked against VADYM above and chips below).

## Motion

Easings: expo-out `(0.16, 1, 0.3, 1)` everywhere. No springs, no bounce (original springs were refined away).

Load: peach panel slides in from the right/bottom (1.1s, 0.15s delay); VADYM letters drop from above with blur (0.5s start, 0.05s stagger), ORLOV letters rise from below (0.75s start): the original's directional identity at letter granularity. Role line fades in with letter-spacing settling (1.5s). Chips rise last (1.9s+).

Idle: two distinct effects on one canvas. Ink side: mouse-repelled constellation with connection lines (≤60 nodes). Teal side: soft pale embers rising with sine wobble, respawning at the bottom of their region (≤45). The two sides must never share the same effect.

`prefers-reduced-motion`: all entrances become fades; both particle effects render one static frame with no mouse tracking.

## Components

- `AnimatedBackground` + `ClientBackground` (ssr:false wrapper): ink base + teal `clip-path` panel (diagonal at 5°) + `ParticleLayer`.
- `ParticleLayer`: one canvas, two populations (nodes on ink, embers on teal), region split at the 50% line per breakpoint.
- `.chip`: circular icon chip + label, tint from panel (warm-white on ink, ink on teal), lifts 3px on hover, ≥44px touch target.

## Rules

- The split is the identity. Never flatten it to a single background (a full dark redesign was reverted).
- Content is frozen: name, "Software Engineer and Game Developer", three links. Never invent copy.
- No scrolling: everything fits 100dvh from 360×640 through 4K, including 812×375 landscape.
- No gradient text, no outline/hollow text, no glassmorphism, no pure #000/#fff.
