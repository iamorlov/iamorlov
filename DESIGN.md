# Design

## Theme

Indigo & Rose. The split identity on the user-chosen Color Hunt palette (f8b2b2 / af719d / 8b639b / 403d88): deep indigo panel against a soft rose panel, each with its own living background effect (constellation on indigo, rising embers on rose). Warm, confident, a little tender. Single screen (100dvh), no scrolling at any viewport.

## Color

All tokens OKLCH, defined in `src/app/globals.scss`:

| Token | Value | Role |
|---|---|---|
| `--indigo` | `oklch(37.5% 0.135 283)` | Left/top panel (#403D88), ORLOV fill, mobile chips, themeColor |
| `--indigo-deep` | `oklch(30% 0.12 283)` | Role line, selection background |
| `--rose` | `oklch(82% 0.075 19)` | Right/bottom panel (#F8B2B2), VADYM fill, desktop chips |
| `--rose-bright` | `oklch(88% 0.05 19)` | Body fallback text, selection text |
| `--orchid` | `oklch(60% 0.1 338)` | Ember glow (#AF719D) |
| `--plum` | `oklch(54% 0.085 316)` | Desktop chip hover fill (#8B639B) |

Measured contrast: names 5.94:1 both directions, role 7.87:1, chip labels 5.94:1 at full opacity. **Chip labels stay at opacity 1**; opacity-based de-emphasis dropped them below AA once. **Never use `mix-blend-mode` for text over the split**: `.stage` has a z-index stacking context, so blends cannot see the fixed background behind it (this shipped broken once as white-on-light). Any text near the seam must be position-checked against the 5° diagonal, not the 50% line. Tailwind's `md` is pinned to 768px via `@theme` so it can never drift from the px SCSS queries at enlarged root font sizes.

## Typography

Single family: **Gabarito** (variable, via next/font). User-chosen; DM Sans, Outfit, Archivo, Sora all rejected in past iterations.

- Name words: weight 700 (never 900), uppercase, tracking −0.015em. Desktop `min(clamp(4.75rem, 13.5vw, 15rem), 28svh)` per half; mobile `min(clamp(4rem, 21vw, 10rem), 20svh, 25vw)`; short-landscape override caps at 22svh.
- Role line: weight 400, uppercase, tracking 0.15em, fluid 0.85–1.25rem.
- Chip labels: weight 500, 0.72rem, uppercase.

## Layout

- Desktop: VADYM centered in left (indigo) half and raised `clamp(2rem, 7vh, 5rem)`; ORLOV centered in right (rose) half and lowered the same amount (echoes the diagonal). Role line centered under ORLOV at `left: 75%, top: 74svh`, max-width 44vw, in `--indigo-deep`, always fully on the rose half (seam-checked). Chips bottom-left half.
- Mobile (<768px): panels split top/bottom; words centered in their halves with no offset; role line at `57svh` in `--indigo-deep`, fully inside the bottom (rose) half between the seam and ORLOV; chips full-width bottom over rose.
- Short landscape (≥768px wide, ≤480px tall): smaller names, smaller offsets, role at `72svh` (collision-checked against ORLOV above and the viewport edge below).

## Motion

Easings: expo-out `(0.16, 1, 0.3, 1)` everywhere. No springs, no bounce (original springs were refined away).

Load: rose panel slides in from the right/bottom (0.9s, 0.1s delay); VADYM letters drop from above with blur (0.35s start, 0.04s stagger), ORLOV letters rise from below (0.55s start): the original's directional identity at letter granularity. Role line fades in with letter-spacing settling (1.0s). Chips rise last from 1.25s, gated with a visibility flip so they are never focusable while invisible; fully settled ~2.0s. Email chip copies the address on click and flashes Copied.

Idle: two distinct effects on one canvas. Indigo side: mouse-repelled constellation with connection lines (≤60 nodes). Rose side: soft orchid embers rising with sine wobble, respawning at the bottom of their region (≤45). The two sides must never share the same effect.

`prefers-reduced-motion`: all entrances become fades; both particle effects render one static frame with no mouse tracking.

## Components

- `AnimatedBackground` + `ClientBackground` (ssr:false wrapper): indigo base + rose `clip-path` panel (diagonal at 5°) + `ParticleLayer`.
- `ParticleLayer`: one canvas, two populations (nodes on indigo, embers on rose), region split at the 50% line per breakpoint.
- `.chip`: circular icon chip + label, tint from panel (rose on indigo, indigo on rose), lifts 3px on hover, ≥44px touch target.

## Rules

- The split is the identity. Never flatten it to a single background (a full dark redesign was reverted).
- Content is frozen: name, "Software Engineer and Game Developer", three links. Never invent copy.
- No scrolling: everything fits 100dvh from 360×640 through 4K, including 812×375 landscape.
- No gradient text, no outline/hollow text, no glassmorphism, no pure #000/#fff.
