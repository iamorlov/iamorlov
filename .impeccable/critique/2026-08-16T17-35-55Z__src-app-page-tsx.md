---
target: src/app/page.tsx
total_score: 32
p0_count: 0
p1_count: 2
timestamp: 2026-08-16T17-35-55Z
slug: src-app-page-tsx
---
# Critique: src/app/page.tsx (working-tree indigo/rose palette, uncommitted)

## Design Health Score: 32/40 (Good)

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Chips focusable while still at opacity 0 during entrance |
| 2 | Match System / Real World | 4 | n/a - canonical icons, labeled, zero jargon |
| 3 | User Control and Freedom | 3 | 2.8s unskippable entrance; mailto has no fallback |
| 4 | Consistency and Standards | 3 | Rest-state opacities scatter (0.85/0.75/1.0); reduced-motion gets different final state |
| 5 | Error Prevention | 2 | Email is bare mailto:, address printed nowhere; silent dead click for webmail users |
| 6 | Recognition Rather Than Recall | 4 | n/a - everything visible and labeled |
| 7 | Flexibility and Efficiency | 3 | Full entrance replays every visit; keyboard path solid |
| 8 | Aesthetic and Minimalist Design | 4 | Three content elements, decoration capped and regioned |
| 9 | Error Recovery | 2 | The one real failure mode (mailto dead-end) has zero recovery |
| 10 | Help and Documentation | 4 | n/a-adjusted - self-documenting card |
| **Total** | | **32/40** | **Good** |

## Anti-Patterns Verdict

LLM assessment: NOT AI-slop. The 5-degree seam is a system (names offset with it, per-side particle species, seam-checked text placement); directional letter entrances perform the two-halves identity. One inherited cliche: the mouse-repelled constellation-with-lines background is the most template-recognizable effect of the decade.

Deterministic scan: UNAVAILABLE - bundled detector artifact missing (wrapper ran, reported "bundled detector not found"). Browser overlay skipped for the same reason. Fallback: manual banned-pattern grep sweep - zero hits for gradient text, glassmorphism, pure #000/#fff, side-stripe borders, em dashes.

## Overall Impression

Strong identity architecture wearing an unproven coat of paint. The split system, motion discipline, and seam rigor are studio-grade; the conversion surface (three chips) is measurably under-contrast, the most valuable click (email) can dead-end silently, and the new rose palette softens the engineer half of the story.

## What's Working

1. Complete motion system: one easing token everywhere, letter-granular directional stagger, three-tier reduced-motion (framer fades + CSS zeroing + static canvas frame).
2. Seam discipline verified at four viewports: role line always fully on rose, names never cross, no scroll anywhere including 812x375.
3. Two particle species, one canvas, correctly partitioned and capped; decoration never competes with content.

## Priority Issues

1. **[P1] Chip labels fail AA on both breakpoints.** Measured 4.05:1 desktop / 3.67:1 mobile at 11.5px (opacity 0.75 on mid-contrast pairs). The page's entire conversion surface, against PRODUCT.md's explicit AA pledge. Fix: labels at full opacity (5.94:1 measured), de-emphasize via size/weight instead. Command: polish.
2. **[P1] Email is mailto:-only, address printed nowhere.** Desktop users without a mail handler get a silent dead click on the highest-value action; no recovery path. Fix: label becomes the address, or click-to-copy with confirmation. Command: harden or clarify.
3. **[P2] Entrance withholds all affordances for 1.9s; chips clickable/focusable at opacity 0.** Keyboard focus ring lands on invisible controls (WCAG 2.4.7 risk). Fix: compress choreography to ~1.4s, gate interactivity with visibility. Command: animate or polish.
4. **[P2] Breakpoint unit mismatch can delete ORLOV.** SCSS px (767px) vs Tailwind md rem (48rem): at 125% browser font size, widths 768-959px render desktop text over the mobile panel - indigo ORLOV on indigo base. Fix: single breakpoint source of truth. Command: adapt.
5. **[P3] Rest-state cluster:** role opacity 0.85 only via animation (reduced-motion gets 1.0); reduced-motion + resize wipes canvas (no redraw); canvas ignores devicePixelRatio (fuzzy on retina); selection 3.41:1. Command: polish.

## Persona Red Flags

- Casey (distracted mobile): thumb-zone chips good (48-73px targets), but 11.5px labels at 3.67:1 illegible in sunlight; full entrance replays on every return; glance-read is the name sandwich VADYM / role / ORLOV.
- Riley (stress tester): 125% font x 768-959px width blanks the surname; reduced-motion + resize leaves empty canvas; refresh restarts full wait.
- Sam (accessibility): exemplary bones (aria-label name, aria-hidden letters, landmarks, focus-visible) undermined by sub-AA labels, focus on invisible chips, enlarged-font breakpoint hole.

## Minor Observations

- create-next-app starter SVGs still in public/.
- No OG/Twitter metadata: LinkedIn shares (the distribution channel) unfurl bare.
- mouseRef inits at (0,0): phantom repulsion top-left until first mousemove.
- will-change persists on all letters after one-shot entrance.
- rel="noopener noreferrer" on the mailto (dead attribute).
- Rendered tokens drift slightly from Color Hunt hexes (#3B3185 vs #403D88 declared themeColor).
- Mobile reading order sandwiches the name: VADYM / role line / ORLOV.

## Questions to Consider

1. What does rose say about the split identity that teal didn't; is prettier worth a possible Valentine-card first read?
2. The success metric is "remembers the name, clicks a link", yet the entrance withholds every link for 2s and dims their labels below AA. Who is the entrance staged for?
3. If the ink-side particles behaved like something Vadym ships (pathfinding grid, match lattice) instead of stock constellation, would the left half be as authored as the seam?
