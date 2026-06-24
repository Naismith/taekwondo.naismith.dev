---
version: alpha
name: ITF Taekwondo
description: Premium dark training interface — Linear structure with Fey cinematic atmosphere and purple accents.
colors:
  background: "#000000"
  on-background: "#ffffff"
  surface: "#0a0a0a"
  surface-container-low: "rgba(255, 255, 255, 0.03)"
  surface-container: "rgba(255, 255, 255, 0.05)"
  surface-container-high: "rgba(255, 255, 255, 0.10)"
  on-surface: "rgba(255, 255, 255, 0.70)"
  on-surface-variant: "rgba(255, 255, 255, 0.50)"
  on-surface-muted: "rgba(255, 255, 255, 0.40)"
  on-surface-subtle: "rgba(255, 255, 255, 0.30)"
  primary: "#c084fc"
  on-primary: "#000000"
  primary-muted: "rgba(192, 132, 252, 0.80)"
  primary-subtle: "rgba(192, 132, 252, 0.60)"
  primary-dim: "rgba(192, 132, 252, 0.50)"
  primary-container: "rgba(192, 132, 252, 0.05)"
  on-primary-container: "rgba(192, 132, 252, 0.70)"
  primary-ring: "rgba(192, 132, 252, 0.20)"
  outline: "rgba(255, 255, 255, 0.10)"
  outline-variant: "rgba(255, 255, 255, 0.05)"
  glow-primary: "rgba(192, 132, 252, 0.15)"
  glow-ambient: "rgba(30, 58, 95, 0.40)"
  dojang-mat: "#1e3a5f"
  dojang-line: "#c084fc"
  belt-white: "#ffffff"
  belt-yellow: "#fde047"
  belt-green: "#4ade80"
  belt-blue: "#60a5fa"
  belt-red: "#f87171"
  belt-black: "#000000"
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: "600"
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: "600"
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 1.625
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: "400"
    lineHeight: 1.5
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: "500"
    lineHeight: 16px
    letterSpacing: 0.05em
  label-numeric:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 20px
    fontFeature: "tnum"
rounded:
  sm: 2px
  md: 4px
  lg: 8px
  xl: 12px
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  page-padding-x: 16px
  page-padding-top-mobile: 32px
  page-padding-bottom: 32px
  page-padding-bottom-mobile: 112px
  nav-padding: 16px
  nav-offset: 56px
  mobile-nav-offset: 88px
  card-padding: 16px
  card-padding-sm: 12px
  list-gap: 8px
  section-gap: 32px
  content-max-width: 1024px
components:
  nav-bar:
    backgroundColor: "rgba(0, 0, 0, 0.80)"
    textColor: "{colors.on-background}"
    padding: "{spacing.nav-padding}"
    height: "{spacing.nav-offset}"
    desktopPosition: "top"
    mobilePosition: "bottom"
  nav-link:
    textColor: "{colors.on-background}"
    typography: "{typography.body-md}"
  nav-link-active:
    textColor: "{colors.primary}"
  nav-link-hover:
    textColor: "{colors.primary}"
  page-shell:
    backgroundColor: "{colors.background}"
    paddingDesktop: "{spacing.nav-offset} {spacing.page-padding-x} {spacing.page-padding-bottom}"
    paddingMobile: "{spacing.page-padding-top-mobile} {spacing.page-padding-x} {spacing.page-padding-bottom-mobile}"
  content-column:
    width: "{spacing.content-max-width}"
  content-column-wide:
    width: "{spacing.content-max-width}"
  section-heading:
    textColor: "rgba(255, 255, 255, 0.80)"
    typography: "{typography.label-caps}"
  page-title:
    textColor: "{colors.on-background}"
    typography: "{typography.headline-lg}"
  page-subtitle:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.body-sm}"
  list-card:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: "{spacing.card-padding}"
  list-card-hover:
    backgroundColor: "{colors.surface-container-high}"
  step-card:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: "{spacing.card-padding-sm}"
  step-number:
    textColor: "{colors.primary-dim}"
    typography: "{typography.label-numeric}"
  highlight-card:
    backgroundColor: "{colors.primary-container}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: "{spacing.card-padding-sm}"
  back-link:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.body-sm}"
  back-link-hover:
    textColor: "{colors.primary}"
  scene-container:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm}"
---

## Overview

This file follows the [Google Labs DESIGN.md spec](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md). The YAML frontmatter holds machine-readable design tokens; the markdown body holds human-readable rationale. **Tokens are normative** — prose explains how to apply them when edge cases arise. `{colors.primary}` references in the `components` block use the spec's token-reference syntax.

### Implementation

In this codebase, tokens map to Tailwind via `@theme` in `src/index.css`. Use utility classes in JSX and `cn()` from `~/utils` for composition. Shared layout helpers: `@utility page-shell`, `@utility content-column-wide`, `@utility ambient-glow`, `@utility accent-glow`. Inter is loaded in `index.html`.

| Token source                                 | Implementation                                                 |
| -------------------------------------------- | -------------------------------------------------------------- |
| `colors.primary`, belt colors, dojang colors | `@theme` → `text-primary`, `bg-belt-yellow`, etc.              |
| `colors.surface-container*`                  | `bg-white/5`, `bg-white/10` (white-alpha surfaces)             |
| `colors.on-surface*`                         | `text-white/70`, `text-white/50`, etc.                         |
| `typography.*`                               | Tailwind size/weight/tracking utilities per Components section |
| `rounded.*`                                  | `@theme` radius tokens → `rounded-sm`, `rounded-md`            |
| `spacing.*`                                  | Tailwind spacing scale (`px-4`, `gap-2`, `max-w-5xl`, etc.)    |

Add new **wired** tokens to `@theme` when they will be reused; one-off opacity variants can stay as inline utilities if they match existing on-surface hierarchy.

### Visual direction

The visual direction is a blend of **Linear's structured product minimalism** and **Fey's cinematic premium interface language**.

The goal is a taekwondo learning app that feels disciplined, modern, premium, calm, precise, motivating, and serious — without feeling cold.

### Core thesis

> A premium dark training interface with Linear-like clarity and Fey-like atmosphere.

**Linear** contributes structure: clean hierarchy, restrained density, precise alignment, quiet surfaces, thoughtful spacing, low-noise navigation, and workflow-first interaction patterns.

**Fey** contributes atmosphere: deep cinematic dark mode, elegant glow, premium gradients, immersive cards, confident visual drama, and progress presented beautifully.

Together, the style should feel like a **martial arts command center for learning, practice, progress, and mastery**.

### Final direction

> Linear's calm structure applied to martial arts learning, elevated with Fey's cinematic dark atmosphere and purple premium accents.

The result should feel modern enough for serious adult learners, polished enough to stand beside premium productivity tools, and focused enough to support real practice.

**Audience:** Adult ITF practitioners studying patterns, sparring sets, and theory — not a gamified kids app.

**Emotional register:** Disciplined focus. Quiet confidence. Mastery-oriented.

## Colors

The palette is **cinematic near-black** with **purple as the sole accent**. Belt rank colors appear only on belt components and rank indicators — never as general UI accents.

### Foundation

- **Background (#000000):** Pure black canvas. The void of the dojang floor at night. Never substitute gray backgrounds.
- **Surface containers:** Layered white-alpha surfaces (`5%`, `10%`) for cards and list rows. Surfaces are quiet — they frame content without competing with it.
- **On-surface hierarchy:** White at full opacity for titles; `70%` for body; `50%` for secondary; `40%` for metadata; `30%` for decorative chevrons and hints.

### Accent — Purple

- **Primary (#c084fc):** The premium accent. Active nav links, step highlights, focus rings, 3D path lines, and key metadata. Purple signals _progress and mastery_, not decoration.
- **Primary container:** `primary/5` fill with `primary/20` ring for highlighted callouts (meanings, oath blocks, selected states).
- **Glow:** Soft `rgba(192, 132, 252, 0.15)` ambient glow on focal elements (3D viewer edge, progress milestones). Use sparingly — one glow per viewport.

### Domain colors

- **Dojang mat (#1e3a5f):** Deep navy for the 3D training area. Cinematic, not sporty.
- **Dojang lines (#c084fc):** Pattern path and corner markers — tied to primary accent.
- **Belt colors:** Semantic only on `Belt` / `MiniBelt` components. Do not use belt yellow/green/blue/red as general UI accents.

### Gradients (Fey layer)

Reserve gradients for hero moments and the 3D viewer backdrop:

- **Ambient:** `radial-gradient(ellipse at 50% 0%, rgba(30, 58, 95, 0.4) 0%, transparent 70%)` above the mat.
- **Accent wash:** `radial-gradient(ellipse at 80% 20%, rgba(192, 132, 252, 0.08) 0%, transparent 50%)` — subtle, never overpowering.

## Typography

**Inter** (or system-ui fallback) for Linear-grade clarity. No display fonts. Hierarchy comes from size, weight, and opacity — not font switching.

| Role          | Spec                                                 | Usage                                      |
| ------------- | ---------------------------------------------------- | ------------------------------------------ |
| Page title    | 24px / semibold / white                              | Route `<h1>` — pattern name, section title |
| Section label | 12px / medium / uppercase / wide tracking / white/80 | `PATTERNS`, `MEANING`, `OATH` headers      |
| Body          | 14px / regular / white/70 / relaxed leading          | Step text, theory detail, descriptions     |
| Metadata      | 13px / regular / white/50                            | Pattern meanings, rank labels, subtitles   |
| Numeric       | 14px / tabular-nums                                  | Step numbers, gup counts, move counts      |

- **Headlines:** Semibold, never bold. Tight but not cramped (`-0.01em` on large titles).
- **Labels:** Uppercase + `tracking-wide` for section headers only — not for every label.
- **Numbers:** Always `tabular-nums` for step indices, ranks, and counts.

## Layout

Linear-style **centered content shell** with a wide max-width for reference pages.

- **Content column:** `content-column-wide` — `max-w-5xl` (1024px) centered. Used on all route pages.
- **Page shell:** `min-h-screen`, `px-4`, `pt-8`, and bottom padding for the mobile tab bar. At `md+`, use `pt-14` (desktop nav offset) and `pb-8`.
- **Rhythm:** 4px base grid. Common gaps: `gap-1.5` (6px tight lists), `gap-2` (8px list rows), `gap-4` (16px card grids), `gap-8` (32px page sections).
- **Density:** Restrained. One primary action per row. List rows are tappable cards, not dense tables.
- **Navigation:** Desktop uses a fixed top bar with horizontal text links. Mobile uses a fixed bottom tab bar with icons and labels for the main sections, including Home. No sidebar.
- **3D viewer:** Full-width within the content column on pattern detail — the immersive Fey moment in an otherwise Linear layout.

## Elevation & Depth

Depth is **tonal + atmospheric**, not shadow-heavy.

### Surface stack

1. **Base:** `#000000` background.
2. **Container:** `bg-white/5` cards and list rows.
3. **Hover / elevated:** `bg-white/10` on interactive rows.
4. **Highlight:** `bg-primary/5` + `ring-1 ring-primary/20` for semantic emphasis.

### Fey atmosphere

- **Backdrop blur:** Nav bar (`bg-black/80 backdrop-blur-sm`). Extend to modals/overlays when added.
- **Glow:** Single soft purple or navy radial behind focal content — 3D scene, home section cards, belt progression page.
- **Shadows:** Avoid box shadows on cards. If needed, use `0 0 40px rgba(192, 132, 252, 0.08)` — glow, not drop shadow.
- **Borders:** `ring-1 ring-white/10` or `ring-primary/20` for emphasis. No thick borders.

## Shapes

**Architectural minimalism** — Linear sharpness with slight softness.

- **Cards and list rows:** `rounded-sm` (2px). Precise, disciplined, not bubbly.
- **3D scene container:** `rounded-md` (4px). Slightly softer for the immersive viewport.
- **Buttons (when added):** `rounded-sm` primary, `rounded-full` only for pill filters/chips.
- **Belt components:** Rectilinear — belts are horizontal bars, not rounded pills.

Corner radius is a hierarchy signal: sharper = structural/reference UI; slightly rounder = immersive/atmospheric zones.

## Components

### Navigation bar

Fixed navigation that changes placement by breakpoint. **Desktop (`md+`):** top bar with `bg-black/80 backdrop-blur-sm` and horizontal text links with `gap-4` to Home, Belts, Patterns, Sparring, Theory, and Glossary. Active state: `text-primary`. Hover: `text-primary` with `transition-colors`. **Mobile:** bottom app-style tab bar, `bg-black/90 backdrop-blur-sm`, `ring-1 ring-white/10`, six equal tabs with section icons and compact labels. Active tab uses `bg-primary/10`, `text-primary`, and `ring-primary/20`. Account for `env(safe-area-inset-bottom)` and add enough page bottom padding so content never sits behind the bar.

### Page header

Title (`text-2xl font-semibold text-white`) + optional subtitle (`text-sm text-white/60`) + optional metadata line (`text-primary/80 text-sm`). Tight vertical rhythm: `mb-1` between title and subtitle, `mb-6` or `mb-8` before content.

### Section heading

`text-sm font-medium uppercase tracking-wide text-white/80 mb-3`. Groups content within a page — belt section, pattern category, theory topic.

### List card (patterns, sparring, theory)

Full-width row: `flex items-center gap-3 rounded-sm bg-white/5 px-4 py-3 transition-colors hover:bg-white/10`.

- Leading: numeric index or icon slot (`text-primary/60 tabular-nums w-6 text-center`).
- Body: title (`text-white font-medium`) + subtitle (`text-white/50 text-sm truncate`).
- Trailing: metadata (`text-white/40 text-xs`) + optional `MiniBelt` + chevron (`text-white/30 text-xs`).

### Step list

Ordered steps for pattern movements and sparring sequences.

- Container: `flex flex-col gap-1.5`.
- Row: `flex gap-3 rounded-sm bg-white/5 px-3 py-2.5 text-sm leading-relaxed`.
- Number: `tabular-nums w-5 shrink-0 text-right text-primary/50`.
- Text: `text-white/70`.

### Highlight card

For meanings, oath text, and semantic callouts: `bg-primary/5 ring-1 ring-primary/20 rounded-sm px-3 py-2.5 text-sm text-white/70 leading-relaxed`.

### Back link

`inline-flex items-center gap-1.5 text-white/50 hover:text-primary text-sm transition-colors`. Precedes detail page headers.

### Belt progression (`/belts`)

Rank selector (two-column grid on desktop, dropdown on mobile) beside grading requirements for the selected rank. Rank labels use `whitespace-nowrap`. Layout splits ~55% selector / ~45% details on large screens. `MiniBelt` beside each rank option.

### 3D pattern scene

Immersive viewport: navy mat (`#1e3a5f`), purple path lines (`#c084fc`), corner labels. Container uses `rounded-md` with optional ambient gradient behind. This is the cinematic centerpiece — allow it more visual weight than surrounding list UI.

### Definition list (theory)

`flex gap-3 rounded-sm bg-white/5 px-4 py-3 text-sm`. Term (`text-primary font-medium w-10 shrink-0`) + definition (`text-white/70`).

## Do's and Don'ts

### Do

- Keep the canvas black. Depth comes from white-alpha surfaces, not gray backgrounds.
- Use purple (`primary`) for interaction, progress, and emphasis — one accent, applied consistently.
- Use `tabular-nums` on all numeric content (steps, ranks, move counts).
- Maintain `content-column-wide` (`max-w-5xl`) content width on route pages.
- Apply uppercase + tracking only to section headings, not body labels.
- Use subtle glow and gradient on hero/immersive zones (home section cards, 3D viewer).
- Keep nav minimal — desktop text links, mobile compact icon tabs, restrained active state.
- Preserve belt colors strictly on belt components.

### Don't

- Don't use yellow as a general UI accent (legacy direction — purple replaces it).
- Don't add box shadows on cards — use surface layers and glow instead.
- Don't use `rounded-lg` or `rounded-xl` on list rows and reference cards.
- Don't mix multiple accent colors in one view (no rainbow metadata).
- Don't add sidebar chrome — mobile navigation is the persistent bottom tab bar.
- Don't use bold headlines — semibold is the maximum weight.
- Don't gamify with badges, streaks, or loud progress bars — progress should feel premium and calm.
- Don't use light mode — this system is dark-only by design.
- Don't crowd list rows — one primary line of action per row.
