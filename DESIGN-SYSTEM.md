# Northwood Academy & College — Design System & Brand Identity

> **Status:** Foundation (no pages built yet).
> **Single source of truth:** [`design-tokens.js`](./design-tokens.js) — change values there; every surface updates in lockstep.
> **Selected theme:** **Bright Horizon** (accessibility-hardened).
> **Target:** Next.js + Tailwind CSS · WCAG 2.1 AA.

This document defines the complete visual language for **every** surface — landing pages, dashboards, admin interfaces, reports, forms, modals, notifications, navigation, data tables, and charts — so they all read as one brand ecosystem. It also records the four alternative themes that were evaluated.

---

## 1. How the decision was made

Five distinct themes were generated, then scored by three independent judges (brand fit, accessibility, scalability).

| Theme | Brand | A11y | Scale | **Total** | One-line identity |
|---|:--:|:--:|:--:|:--:|---|
| **Heritage Scholar** | 8 | **9** | 8 | **25** | Navy + scholar gold, Fraunces serif — prestige/credibility |
| **Bright Horizon** ✅ | **9** | 6→**fixed** | **9** | **24** | Indigo + warm orange, Outfit/Inter — modern, warm, ambitious |
| **Civic Minimal** | 6 | **9** | **9** | **24** | Ink/slate + one royal blue, Inter only — precise, data-dense |
| **Editorial Prestige** | 8 | 8 | 6 | **22** | Ink-plum + oxblood/gold, Newsreader — magazine prestige |
| **Campus Community** | 8 | 4 ⚠️ | 7 | **19** | Teal + amber, Nunito — warmest, but failing primary contrast |

**Per-lens winners:** Brand → Bright Horizon · Accessibility → Heritage Scholar · Scalability → Civic Minimal.

⚠️ **Adversarial finding:** Campus Community's primary teal `#0D9488` computes to **3.74:1** on white (claimed 4.776:1) — it fails AA as a primary action/link color. Disqualifying for an accessibility-mandated education brand.

### Recommendation: **Bright Horizon** (hardened)

It wins the lens that matters most for *this* brief — **dual-audience brand fit (9/10)** — and ties for the best, most explicitly documented **token architecture (9/10)**, which is exactly what this deliverable centers on. Reasoning:

1. **It resolves the core tension.** A confident **indigo `#4F46E5`** supplies college-grade authority/ambition; a deliberately rationed **warm orange `#EA580C`** supplies the family warmth K-12 parents respond to. One token set lands emotionally with *both* audiences without re-skinning.
2. **It is modern + interactive** — geometric Outfit headlines and a complete motion system match the "modern interactive website" goal, rather than reading conservative or austere.
3. **It scales cleanly** — two sans families (no serif-in-data drift), full `--space/--radius/--shadow/--dur/--ease` token sets, density toggles, and CSS-vars→Tailwind mapping hold up from a hero to a 12-column gradebook.
4. **Its one weakness was fixable.** The accessibility judge (6/10) flagged thin contrast margins on the vivid orange and on `white-on-danger`. These are now **hardened in the tokens** (below) — unlike Campus Community's *actually failing* primary, these were always addressable.

**When to pick an alternative instead:** choose **Heritage Scholar** if you want old-world prestige/donor gravitas over warmth; **Civic Minimal** if the product is overwhelmingly data/dashboard-driven and you want maximum density purity; **Editorial Prestige** for a singular, magazine-quality identity (at a heavier 3–4 font maintenance cost). Because everything derives from `design-tokens.js`, switching themes later is a contained change.

### Accessibility hardening applied to Bright Horizon

| Issue flagged | Fix encoded in tokens |
|---|---|
| Vivid orange `#EA580C` = 3.56:1 (fails as body text/white-button-label) | Restricted to **large text / icons / UI (3:1)**. Added `accent.text`/`accent.solid` = `#C2410C` (5.0:1) for text & solid CTAs; `accent.onVivid` = `#1E1B4B` (4.7:1) if a vivid CTA is wanted. |
| `white-on-danger #DC2626` ≈ 4.83:1 (thin) | Kept (passes AA); error **text** uses `#B91C1C` (5.9:1) for headroom. |
| Muted `#64748B` drops to ~4.5:1 on the `#F8FAFC` canvas | Default muted text promoted to `#475569` (7.1–7.5:1 on both white and canvas). `#64748B` reserved for on-white/large; `#94A3B8` decorative only. |
| Success/warning vivid hues fail as solid-button labels | Added `success.solid #15803D` (4.6:1) and `warning.solid #B45309` (4.8:1). |

---

## 2. Bright Horizon — complete standards

### 2.1 Philosophy & perception
**"Calm structure, energetic moments."** Surfaces are quiet (white / soft-indigo-tinted neutrals, generous space, restrained shadows) so color is spent deliberately: indigo carries primary actions and navigation state; orange carries **one** accent per view (a CTA, a highlighted stat, a progress marker). The same token set serves a marketing hero and a 12-column admin table — marketing lets color and motion breathe; dashboards compress density and lean on the neutral ramp.

- **Parents/families:** approachable, organized, safe.
- **Prospective college students:** ambitious, modern, credible.
- **Donors/community:** trust and stewardship.
- **Internal staff/faculty/students:** efficient, legible at high density — the same brand, now in "work mode."

### 2.2 Color
Vivid hues are for large text / icons / UI (≥3:1). Use the `.text` / `.solid` aliases for body text and solid buttons. Full scales + semantic aliases live in `design-tokens.js`.

| Role | Value | Usage & contrast |
|---|---|---|
| **Primary** | `#4F46E5` (indigo-600) | Primary buttons, links, active nav, focus base. White-on = **6.3:1**. Hover `#4338CA`, active `#3730A3`. |
| **Secondary** | `#818CF8` (indigo-400) | Decorative fills, chart series 2, gradients. Large/decorative only (2.6:1). |
| **Accent** | `#EA580C` (orange-600) | The single energetic moment: hero CTA, key stat, progress. Vivid = large/UI only. **Text/solid = `#C2410C` (5.0:1).** |
| **Success** | `#16A34A` / text `#15803D` | "Enrolled/paid/passing". Soft `#DCFCE7` bg + `#166534` text. Always + check icon. |
| **Warning** | `#D97706` / text `#B45309` | "Pending/due soon". Soft `#FEF3C7` bg + `#92400E`. Always + triangle icon. Kept perceptually distinct from accent orange. |
| **Danger** | `#DC2626` / text `#B91C1C` | Destructive/errors/overdue. On white 4.83:1; error text 5.9:1. Soft `#FEE2E2` + `#991B1B`. Always + alert icon. |
| **Neutrals** | slate, indigo-tinted | canvas `#F8FAFC`, surface `#FFFFFF`, border `#E2E8F0`, body `#1E293B` (13.6:1), muted `#475569` (7.5:1), heading `#0F172A` (17.4:1). Brand tint `#EEF2FF` for selected rows / info banners / active nav. |

**Color is never the sole signal** — status, validation, charts, trends always pair an icon, label, shape, or pattern. Chart series are colorblind-aware (`#4F46E5, #0D9488, #EA580C, #7C3AED, #0EA5E9, #CA8A04`) + pattern/direct labels. Dark mode is tonal (not inverted) and independently contrast-verified.

### 2.3 Typography
- **Display/headings:** **Outfit** (geometric modern sans, 400–700) — hero → KPI numerals. Fallback Poppins.
- **Body/UI/data:** **Inter** (400–600) — paragraphs, labels, table cells, forms. `tnum` tabular figures enabled on numeric/table contexts.
- **Mono:** **JetBrains Mono** — student/course IDs, codes, timestamps, log/report data.
- *Rationale:* two sans (not serif+sans) keep it unmistakably modern and avoid serif-in-data drift; mono only for machine data. Loaded via `next/font` with `display: swap`, latin subset, only the weights used.

**Type scale** (rem-based; honors zoom):

| Token | Size | LH / weight | Use |
|---|---|---|---|
| display | 3.5rem (56px) | 1.05 / 700 | Hero only (clamps to ~36px mobile) |
| h1 | 2.5rem (40px) | 1.1 / 700 | Page title |
| h2 | 2rem (32px) | 1.2 / 600 | Section |
| h3 | 1.625rem (26px) | 1.25 / 600 | Subsection |
| h4 | 1.375rem (22px) | 1.3 / 600 | Card title |
| h5 | 1.125rem (18px) | 1.4 / 600 | Minor heading |
| overline (h6) | 0.875rem (14px) | 1.4 / 600 | UPPERCASE eyebrow, +0.06em |
| body-lg | 1.125rem (18px) | 1.7 / 400 | Marketing lead |
| body | 1rem (16px) | 1.6 / 400 | Default (16px on mobile → no iOS zoom) |
| body-sm | 0.875rem (14px) | 1.5 / 400 | Dense UI, table cells |
| caption | 0.75rem (12px) | 1.4 / 500 | Metadata (minimum size) |

Weights: 400 body · 500 labels/links · 600 headings/buttons · 700 display/overline. Prose measure 65–75ch.

### 2.4 Spacing
Base **4px**, **8px** rhythm — maps 1:1 onto Tailwind's default scale. Tokens: `0,2,4,6,8,12,16,20,24,32,40,48,64,80,96,128`. Conventions: input/button vertical padding 12px (≥44px target), card 24px (16px compact), marketing section rhythm 16/24/32/48/64, table cells 12×16 (comfortable) / 8×12 (compact). Page gutters 16→24→32–48px by breakpoint. Content max-width 1280px app / 1152px marketing prose.

### 2.5 Border radius
`xs 4` (tags) · `sm 6` (buttons, inputs) · **`md 10` (default — cards, dropdowns, toasts)** · `lg 14` (modals, panels) · `xl 20` (hero media, feature cards) · `2xl 28` (promo) · `full` (pills, avatars, dots). App/data surfaces stay sm–md (crisp); marketing uses lg–2xl (warm). Nested elements step **down** one radius from their container.

### 2.6 Shadows (elevation)
Indigo-tinted (`rgba(15,23,42,…)`), not gray-black. `xs` (inputs) · `sm` (resting cards, row hover) · `md` (dropdowns, raised/hover cards, sticky header) · `lg` (toasts, floating panels) · `xl` (modals). Focus is a **ring**, not a shadow. Marketing CTA may use `brandGlow`. Max one elevation jump between stacked layers; dashboards prefer 1px borders + `sm` to keep data crisp. Dark mode adds a 1px top inset highlight.

### 2.7 Icons
**Lucide** (outline), single family across all surfaces. Stroke 1.75px (2px ≤16px). Sizes `14/16/20/24/32`. Outline at a given hierarchy; **filled reserved for active/selected nav + status dots** so fill carries meaning. `currentColor` (token-driven). Icon-only buttons need `aria-label` + 44×44px hit area. Functional color icons always + text. No emoji as icons.

### 2.8 Motion & transitions
Durations: `instant 75` (tap) · `fast 150` (hover) · `base 200` (dropdowns/tabs/accordions) · `slow 300` (modal/sheet enter, reveals) · `slower 400` (hero, cap). Easing: `out` (enter) · `in` (exit) · `standard` (in-place) · `spring` (playful press, marketing only). **Exit ≈65% of enter.** Animate **transform + opacity only** (no width/height/top/left). Patterns: buttons scale 0.97 on press; cards `translateY(-2px)` + shadow on hover; modals scale 0.96→1 + fade from trigger; toasts slide+fade; rows stagger 30–40ms (cap ~8). All animations **interruptible** and **respect `prefers-reduced-motion`** (→ opacity-only ≤120ms).

### 2.9 States (hover / focus / active / disabled)
- **Hover** (150ms): primary `#4F46E5`→`#4338CA`; ghost gets `#F1F5F9`; cards lift; links underline; table rows `#F8FAFC`.
- **Focus-visible** (the keyboard contract): **4px total ring** = `0 0 0 2px #FFF, 0 0 0 4px #4F46E5`, ≥3:1 on all surfaces, **never removed**; flips to indigo-200 on dark.
- **Active/pressed** (75ms): `scale(0.97)` + one shade deeper (`#3730A3`).
- **Disabled:** opacity 0.5, `cursor: not-allowed`, no hover/active, `aria-disabled` + native `disabled`.
- **Read-only:** visually distinct from disabled (no opacity drop, subtle `#F8FAFC` bg, lock icon).
- **Selected** (nav/rows/tabs): `#EEF2FF` bg + `#3730A3` text + 2px indigo indicator + filled icon — never color alone.

### 2.10 Modals & popups
Scrim `rgba(15,23,42,0.55)` + `backdrop-blur(2px)`. Container white, `radius-lg (14px)`, `shadow-xl`, max-w 560 (dialog) / 640 (form); **bottom-sheet on mobile** with drag handle. Enter 300ms `out` (scale 0.96→1 + fade); exit 200ms `in`. **Focus trap** on open → first focusable; **focus returns to trigger** on close; `role="dialog" aria-modal="true"` + labelledby/describedby; background inert + scroll locked. Dismissal: Esc, scrim click, always-visible 44px close — **except** destructive/unsaved-changes dialogs (disable scrim/Esc, prompt "Discard changes?"). One primary CTA (right); destructive uses danger color, spatially separated. Toasts: top-right, auto-dismiss 4s, `aria-live="polite"`, never steal focus, max 3 stacked, undo for destructive.

### 2.11 Forms
Top-aligned **visible labels** (14px/600 `#334155`) — never placeholder-as-label. Required = `#C2410C` asterisk + `aria`. Inputs ≥44px, 12×14 padding, `radius-sm`, 1px `#CBD5E1`, **16px text** (no iOS zoom). Persistent helper text below (12px `#64748B`). Focus = `#4F46E5` border + 4px ring. **Validate on blur**, not per keystroke; error = `#B91C1C` border+text + alert icon (not color alone) + `role="alert"` + recovery hint ("Enter a valid school email, e.g. name@northwood.edu"). On submit, **focus first invalid field** + error summary with anchor links for multiple errors. Semantic input types + autocomplete; password show/hide; numeric `tnum`. Group related fields (`fieldset/legend`). Multi-step admissions/enrollment flows: step indicator + back nav + autosave drafts. Submit → spinner (disabled) → success/inline confirm or error recovery.

### 2.12 Tables
Header: `#F1F5F9` bg, 12px/600 uppercase `#475569`, **sticky** with `shadow-sm` on scroll. Rows: 14px Inter, `#0F172A`, 1px `#E2E8F0` dividers; **zebra off by default** (borders preferred). Row hover `#F8FAFC`; selected `#EEF2FF` + 2px indigo left bar + checkbox. **Density toggle:** comfortable 52px / compact 40px. Numeric columns right-aligned `tnum`; IDs in mono. **Sort:** clickable headers + chevron + `aria-sort`. Status as a badge (dot + text). **Sticky first column** on horizontal scroll. ≥50 rows → pagination/virtualization. Skeleton rows while loading; empty state = message + primary action; CSV export on data-heavy tables. **Responsive:** below 768px → stacked label:value cards, or scroll with frozen identity column + scroll-shadow.

### 2.13 Cards
White bg, `radius-md (10px)`, 1px `#E2E8F0` + `shadow-sm`, padding 24px (16px compact). Header: h4/h5 (Outfit 600) + optional kebab. **Interactive cards:** whole card is one focusable link, hover `translateY(-2px)` + `sm→md`, press scale 0.99, visible focus ring. **KPI/stat cards:** 12px uppercase label, Outfit 600 32px `tnum` value, delta chip (↑/↓ arrow + color, not color alone) — max one orange-accent stat per row. **Marketing feature cards:** `radius-xl`, 32px padding, 48px `#EEF2FF` icon chip. Cards never exceed `shadow-md` unless lifted; nested inner cards drop to `#F8FAFC` + no shadow.

### 2.14 Responsive
Mobile-first. Breakpoints `sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536` (design targets 375/768/1024/1440). Single column → multi-column from `md`. **Adaptive nav:** marketing top bar + hamburger drawer on mobile; app shell collapsible left sidebar ≥1024px → bottom bar (≤5 items) or top bar + drawer on mobile. Tables → cards/scroll. Hero type via `clamp()`. Touch targets ≥44px, spacing ≥8px. `min-h-dvh` not `100vh`; zoom **enabled**; safe-area-inset on fixed bars. Charts simplify on small screens (fewer ticks, horizontal bars, direct labels).

### 2.15 Accessibility (WCAG 2.1 AA)
All pairs verified (see §2.2 + token annotations). 4px visible focus ring on every interactive element, never removed. Color never the sole signal. Sequential `h1→h6`, landmarks, skip-to-content, `label/for`, `role="alert"`/`aria-live` for errors & toasts (toasts don't steal focus), `aria-sort` tables, `aria-modal` + focus trap + return on modals, focus → main on route change, descriptive alt/aria-labels, charts ship text summary + data-table alternative. Touch ≥44×44px; supports 200% zoom / dynamic type without truncation (wrap over truncate). Light **and** dark contrast-checked independently.

---

## 3. Cross-surface consistency (one ecosystem)

Every surface draws from the same tokens; only **density and color-spend** change.

| Surface | How the system applies |
|---|---|
| **Landing pages** | Generous space, larger radii (xl–2xl), motion + one orange accent per view, Outfit display, `brandGlow` CTA. |
| **Dashboards** | Compact density, KPI cards (`tnum`), 1px borders + `shadow-sm`, max one orange-accent stat per row, charts from the series palette. |
| **Admin interfaces** | Persistent sidebar (≥lg), `surfaceMuted` chrome, dense tables, overflow menus, destructive actions in danger + separated. |
| **Reports** | Tabular figures everywhere, neutral ramp dominant, print-friendly (borders define structure, not shadow), CSV/export. |
| **Forms** | §2.11 — labels above, blur validation, error summary, multi-step indicators, autosave. |
| **Modals** | §2.10 — scrim 55%, focus trap, bottom-sheet on mobile, one primary CTA. |
| **Notifications** | Toasts top-right, `aria-live="polite"`, semantic color + icon + text, auto-dismiss 4s, undo for destructive. |
| **Navigation** | Active = `#EEF2FF` bg + `#3730A3` + indicator + filled icon; adaptive placement; consistent across pages. |
| **Data tables** | §2.12 — sticky header/first column, density toggle, badges, `aria-sort`. |
| **Charts & analytics** | Colorblind-aware series + pattern/labels, subtle `#E2E8F0` gridlines, legend near chart, tooltips on hover/tap, text summary + data-table fallback, reduced-motion safe. |

---

## 4. Appendix — the four alternative themes (for the record)

Full specs were generated for each; summaries below. (Switching to any of these is a contained change in `design-tokens.js`.)

### Heritage Scholar — *prestige/credibility* (total 25)
Navy `#1E3A8A` (90% of brand weight) + restrained Scholar Gold `#C8961E` "seal of distinction" + **Fraunces** serif display / **Inter** body / IBM Plex Mono. Serif-for-voice, sans-for-data. Restrained radii (8px app), navy-tinted shadows, 3px focus ring. **Strength:** aced accessibility (every claim verified, body 11.97:1), most prestigious for donors/college. **Tradeoff:** cool neutrals + held-back gold can drift near-monochrome and cold for young families; conservative.

### Civic Minimal — *precise, data-dense* (total 24)
Swiss minimalism: 12-step slate ramp carries everything, **one** royal blue `#2563EB` accent (used as a tint system), **Inter** only (Geist alt), Geist/JetBrains Mono. Semantic radius aliases, `:root + [data-theme=dark]`. **Strength:** lowest-maintenance, hardest to break across surfaces; aced a11y + scalability. **Tradeoff:** can read austere/corporate for K-12 families; one accent makes 6+ chart series lean on tints/patterns; least "ownable" identity.

### Editorial Prestige — *magazine-quality* (total 22)
High-contrast editorial: Ink-Plum `#4A2C5E` + Oxblood `#8C2D33` action + muted Gold `#9A7A1E` credentials, paper-toned neutrals `#FBFAF7`. **Newsreader** serif display + **Space Grotesk** UI + **Inter** reading + IBM Plex Mono. "Every screen is a page in one publication." **Strength:** most distinctive/ownable identity; warm paper + serif prestige. **Tradeoff:** 3–4 type families = heaviest maintenance/CLS budget; lowest scalability score; can feel formal for the youngest families.

### Campus Community — *warmest* (total 19, ⚠️ a11y defect)
Teal `#0D9488` + warm Amber `#F59E0B`, deep-pine `#134E4A` authority anchor; **Nunito** display (≥20px) + **Plus Jakarta Sans** body + JetBrains Mono. **Strength:** warmest, most explicitly family-resonant; distinctive vs the navy/indigo crowd. **Tradeoff / disqualifier:** primary teal **fails AA at 3.74:1** as specified, and amber is a recurring contrast footgun requiring constant `amber-700` swaps; warmth recedes on dense reports.
