/**
 * ============================================================================
 *  NORTHWOOD ACADEMY & COLLEGE — DESIGN TOKENS  (Single Source of Truth)
 * ============================================================================
 *  Theme:   "Bright Horizon" palette · "Claymorphism" skin (ACTIVE)
 *  Stack:   Next.js + Tailwind CSS
 *
 *  This file is the ONE place to change design values. Everything downstream
 *  derives from it:
 *    • tailwind.config.js     -> `const t = require('./design-tokens'); ...theme.extend`
 *    • app/globals.css :root  -> CSS custom properties generated from these values
 *    • chart libraries / JS   -> import tokens directly for series colors, etc.
 *
 *  Change a value here once and every landing page, dashboard, admin screen,
 *  report, form, modal, notification, nav, table, and chart updates in lockstep.
 *
 *  ACCESSIBILITY CONTRACT (WCAG 2.1 AA): every foreground/background pairing
 *  below is annotated with its measured contrast ratio. Body text must clear
 *  4.5:1; large text (>=24px, or >=18.66px bold) and UI/graphics must clear 3:1.
 *  Where a vivid hue fails as text/fill (e.g. orange, raw status hues), a
 *  deeper `*.text` / `*.solid` alias is provided and MUST be used instead.
 * ============================================================================
 */

const color = {
  /* ---- Brand: Indigo (authority, intellect, trust) ---------------------- */
  brand: {
    50: "#EEF2FF",
    100: "#E0E7FF",
    200: "#C7D2FE",
    300: "#A5B4FC",
    400: "#818CF8", // decorative/large only on white (2.6:1) — never body text
    500: "#6366F1",
    600: "#4F46E5", // DEFAULT — primary actions, links. white-on = 6.3:1 (AA)
    700: "#4338CA", // hover / link text on white = 8.0:1 (AA)
    800: "#3730A3", // active/pressed; text on brand-50 tint = 8.6:1
    900: "#312E81",
    950: "#1E1B4B",
    DEFAULT: "#4F46E5",
  },

  /* ---- Accent: Warm orange (energy, optimism) — "one moment per view" ---- */
  /* Vivid #EA580C is 3.56:1 on white => LARGE/UI/icons ONLY.                 */
  /* For accent TEXT or solid buttons w/ white label, use `solid`/`text`.     */
  accent: {
    50: "#FFF7ED",
    100: "#FFEDD5",
    200: "#FED7AA",
    400: "#FB923C",
    500: "#F97316",
    600: "#EA580C", // vivid highlight, large display, icons, progress (3:1 UI)
    700: "#C2410C", // solid CTA bg (white label = 5.0:1) / accent text on white
    800: "#9A3412", // active/pressed
    DEFAULT: "#EA580C",
    solid: "#C2410C", // button background when label is white (AA)
    text: "#C2410C", // accent-colored text at body size (5.0:1, AA)
    onVivid: "#1E1B4B", // dark label on vivid #EA580C = 4.7:1 (AA) if vivid CTA wanted
  },

  /* ---- Neutral: Slate, faintly indigo-tinted for ecosystem cohesion ------ */
  neutral: {
    0: "#FFFFFF", // base surface / cards
    50: "#F8FAFC", // app canvas / page bg / zebra row
    100: "#F1F5F9", // muted surface / table header / hover wash
    200: "#E2E8F0", // borders, dividers
    300: "#CBD5E1", // input borders, disabled borders, chart gridlines
    400: "#94A3B8", // placeholder / disabled text / decorative ONLY (2.6:1)
    500: "#64748B", // subtle/secondary text — AA on WHITE only (4.76:1)
    600: "#475569", // muted text — AA on white AND #F8FAFC canvas (7.1–7.5:1)
    700: "#334155", // strong secondary text / labels (9.3:1)
    800: "#1E293B", // body text (13.6:1)
    900: "#0F172A", // headings / ink (17.4:1, AAA)
    950: "#020617",
  },

  /* ---- Semantic status (each: vivid hue + AA `text`/`solid` + soft pair) -- */
  success: {
    DEFAULT: "#16A34A", // vivid / icon / large (3.3:1 UI)
    solid: "#15803D", // button bg, white label = 4.6:1 (AA)
    text: "#15803D", // success text on white = 4.6:1 (AA)
    bg: "#DCFCE7", // soft surface
    fg: "#166534", // text on soft surface (>= 7:1)
  },
  warning: {
    DEFAULT: "#D97706", // vivid / icon / large (3.4:1 UI)
    solid: "#B45309", // button bg, white label = 4.8:1 (AA)
    text: "#B45309", // warning text on white = 4.8:1 (AA)
    bg: "#FEF3C7",
    fg: "#92400E",
  },
  danger: {
    DEFAULT: "#DC2626", // vivid; on white = 4.83:1 (AA), white-on = 4.83:1 (AA)
    solid: "#DC2626", // destructive button bg w/ white label (4.83:1)
    text: "#B91C1C", // error text on white = 5.9:1 (headroom)
    bg: "#FEE2E2",
    fg: "#991B1B",
  },
  info: {
    DEFAULT: "#4F46E5", // reuse brand for informational states
    text: "#4338CA",
    bg: "#EEF2FF",
    fg: "#3730A3",
  },
};

/* Semantic surface + text aliases — components reference THESE, not raw scale */
const semantic = {
  light: {
    surface: color.neutral[0], // #FFFFFF cards
    canvas: color.neutral[50], // #F8FAFC page background
    surfaceMuted: color.neutral[100], // #F1F5F9 wells / table header
    brandTint: color.brand[50], // #EEF2FF selected row / info banner / active nav
    border: color.neutral[200], // #E2E8F0 default border/divider
    borderStrong: color.neutral[300], // #CBD5E1 input borders
    textHeading: color.neutral[900], // #0F172A
    textBody: color.neutral[800], // #1E293B
    textMuted: color.neutral[600], // #475569 (AA on white + canvas)
    textSubtle: color.neutral[500], // #64748B (AA on white only)
    textPlaceholder: color.neutral[400], // #94A3B8 (decorative)
    textOnBrand: color.neutral[0], // white on indigo
    link: color.brand[700], // #4338CA (8.0:1)
    focusRing: color.brand[600], // #4F46E5
  },
  /* Dark mode = tonal, re-verified independently (not an inversion) */
  dark: {
    surface: "#1E293B", // raised card
    canvas: "#0B1120", // page background
    surfaceMuted: "#162032",
    brandTint: "#1E1B4B",
    border: "#334155",
    borderStrong: "#475569",
    textHeading: "#F8FAFC", // 17:1 on canvas
    textBody: "#E2E8F0",
    textMuted: "#94A3B8", // 7.3:1 on canvas
    textSubtle: "#7C8BA3",
    textPlaceholder: "#64748B",
    textOnBrand: "#FFFFFF",
    link: "#A5B4FC", // brand-300 for contrast on dark
    focusRing: "#A5B4FC",
  },
};

/* Categorical chart palette — colorblind-aware; pair with pattern/label, never hue alone */
const chart = {
  series: ["#4F46E5", "#0D9488", "#EA580C", "#7C3AED", "#0EA5E9", "#CA8A04"],
  gridline: color.neutral[200],
  axis: color.neutral[500],
};

const typography = {
  fontFamily: {
    // Claymorphism skin: friendly rounded display + humanist body
    display: ["var(--font-display)", "Fredoka", "ui-sans-serif", "system-ui", "sans-serif"],
    sans: ["var(--font-sans)", "DM Sans", "ui-sans-serif", "system-ui", "sans-serif"],
    mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
  },
  fontWeight: {
    regular: 400, // body
    medium: 500, // labels, links, table cells emphasis
    semibold: 600, // headings, buttons
    bold: 700, // display, overlines
  },
  /* [size(rem), { lineHeight, letterSpacing, weight }] — rem honors zoom */
  fontSize: {
    display: ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "700" }], // 56px, hero (Outfit)
    h1: ["2.5rem", { lineHeight: "1.1", letterSpacing: "-0.01em", fontWeight: "700" }], // 40px (Outfit)
    h2: ["2rem", { lineHeight: "1.2", letterSpacing: "-0.005em", fontWeight: "600" }], // 32px (Outfit)
    h3: ["1.625rem", { lineHeight: "1.25", fontWeight: "600" }], // 26px (Outfit)
    h4: ["1.375rem", { lineHeight: "1.3", fontWeight: "600" }], // 22px (Outfit)
    h5: ["1.125rem", { lineHeight: "1.4", fontWeight: "600" }], // 18px (Outfit)
    overline: ["0.875rem", { lineHeight: "1.4", letterSpacing: "0.06em", fontWeight: "600" }], // 14px UPPERCASE (h6/eyebrow)
    "body-lg": ["1.125rem", { lineHeight: "1.7", fontWeight: "400" }], // 18px marketing lead (Inter)
    body: ["1rem", { lineHeight: "1.6", fontWeight: "400" }], // 16px default (Inter)
    "body-sm": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }], // 14px dense UI / table cells
    caption: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.01em", fontWeight: "500" }], // 12px meta (min size)
  },
};

/* 4px base, 8px rhythm — maps 1:1 onto Tailwind's default spacing scale */
const spacing = {
  0: "0px",
  px: "1px",
  0.5: "2px",
  1: "4px",
  1.5: "6px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
  20: "80px",
  24: "96px",
  32: "128px",
};

const radius = {
  none: "0px",
  xs: "4px", // tags, badges, checkboxes
  sm: "6px", // buttons, inputs, table controls
  md: "10px", // DEFAULT — cards, dropdowns, popovers, toasts
  lg: "14px", // modals, large panels, media
  xl: "20px", // hero media, feature/bento cards
  "2xl": "28px", // large promotional sections
  full: "9999px", // pills, avatars, status dots, icon buttons
  DEFAULT: "10px",
  /* semantic aliases */
  control: "6px",
  surface: "10px",
  modal: "14px",
};

/* Indigo-tinted elevation, rgba of slate-900 (15,23,42). Pair with 1px border in dark mode. */
const shadow = {
  xs: "0 1px 2px 0 rgba(15,23,42,0.05)",
  sm: "0 1px 3px 0 rgba(15,23,42,0.08), 0 1px 2px -1px rgba(15,23,42,0.06)",
  md: "0 4px 8px -2px rgba(15,23,42,0.10), 0 2px 4px -2px rgba(15,23,42,0.06)",
  lg: "0 12px 20px -6px rgba(15,23,42,0.12), 0 4px 8px -4px rgba(15,23,42,0.07)",
  xl: "0 24px 48px -12px rgba(15,23,42,0.18)",
  brandGlow: "0 8px 24px -6px rgba(79,70,229,0.35)", // marketing CTA only
  focus: "0 0 0 2px #FFFFFF, 0 0 0 4px #4F46E5", // 4px visible focus ring (2px offset)
  none: "none",
  /* ---- Claymorphism skin: puffy dual (outer + inner) shadows ---- */
  clay: "10px 14px 30px -8px rgba(79,70,229,0.22), -8px -8px 22px -6px rgba(255,255,255,0.95), inset 3px 3px 8px rgba(255,255,255,0.9), inset -5px -6px 12px rgba(99,102,241,0.14)",
  clayBtn: "7px 9px 18px -4px rgba(67,56,202,0.45), -4px -4px 12px -2px rgba(165,180,252,0.55), inset 2px 2px 6px rgba(255,255,255,0.4), inset -3px -4px 9px rgba(49,46,129,0.45)",
  clayPressed: "inset 5px 5px 12px rgba(49,46,129,0.40), inset -4px -4px 10px rgba(255,255,255,0.25)",
};

const motion = {
  duration: {
    instant: "75ms", // tap feedback
    fast: "150ms", // hover, color/bg, small toggles
    base: "200ms", // dropdowns, tooltips, tabs, accordions
    slow: "300ms", // modal/sheet enter, section reveals
    slower: "400ms", // hero / shared-element (hard cap)
  },
  easing: {
    out: "cubic-bezier(0.16, 1, 0.3, 1)", // ENTER (decelerate)
    in: "cubic-bezier(0.4, 0, 1, 1)", // EXIT (accelerate)
    standard: "cubic-bezier(0.4, 0, 0.2, 1)", // in-place state change
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)", // playful press/pops (marketing only)
  },
  /* exits run ~65% of enter; respect prefers-reduced-motion (opacity-only fallback) */
  transition: {
    colors: "color 150ms cubic-bezier(0.4,0,0.2,1), background-color 150ms cubic-bezier(0.4,0,0.2,1), border-color 150ms cubic-bezier(0.4,0,0.2,1)",
    transform: "transform 200ms cubic-bezier(0.16,1,0.3,1)",
    opacity: "opacity 200ms cubic-bezier(0.16,1,0.3,1)",
    elevation: "box-shadow 150ms cubic-bezier(0.4,0,0.2,1), transform 150ms cubic-bezier(0.16,1,0.3,1)",
  },
};

const zIndex = {
  hide: -1,
  base: 0,
  raised: 10,
  dropdown: 1000,
  sticky: 1100,
  overlay: 1200, // modal scrim
  modal: 1300,
  popover: 1400,
  toast: 1500,
  tooltip: 1600,
};

/* min-width breakpoints, Tailwind-aligned */
const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

/* Interaction-state contract shared by every interactive component */
const states = {
  disabledOpacity: 0.5,
  focusRingWidth: "2px",
  focusRingOffset: "2px",
  hoverLift: "-2px", // translateY on cards/buttons
  activeScale: 0.97, // press
  minTouchTarget: "44px",
  density: {
    table: { comfortable: "52px", compact: "40px" },
    cellPadding: { comfortable: "12px 16px", compact: "8px 12px" },
  },
  /* per-intent button color states */
  button: {
    primary: { bg: color.brand[600], hover: color.brand[700], active: color.brand[800], label: "#FFFFFF" },
    accent: { bg: color.accent.solid, hover: color.accent[800], active: "#7C2D12", label: "#FFFFFF" },
    danger: { bg: color.danger.solid, hover: "#B91C1C", active: "#991B1B", label: "#FFFFFF" },
    ghost: { bg: "transparent", hover: color.neutral[100], active: color.neutral[200], label: color.brand[700] },
  },
};

const tokens = {
  meta: {
    theme: "Bright Horizon (accessibility-hardened)",
    version: "1.0.0",
    wcag: "2.1 AA",
  },
  color,
  semantic,
  chart,
  typography,
  spacing,
  radius,
  shadow,
  motion,
  zIndex,
  breakpoints,
  states,
};

module.exports = tokens;
module.exports.tokens = tokens;
