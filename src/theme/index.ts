/**
 * Design token bridge for styled-components ThemeProvider.
 *
 * Two theme objects (lightTheme / darkTheme) are exported. UserPreferencesContext
 * in src/features/theme/UserPreferencesContext.tsx selects between them based on
 * user preference (localStorage → OS fallback). All colors are plain TypeScript
 * values — no CSS custom properties.
 *
 * Token vocabulary follows the FastChickens HR Design System (ADR-0009,
 * extended by ADR-0042):
 *   canvas / surface / surface2  — background layers
 *   ink / muted / subtle         — text hierarchy
 *   border / borderStrong        — stroke hierarchy
 *   brand / brandHover / brandSoft — signal color (use sparingly); distinct
 *     from the `error` status color even though both are red
 *   success / warning / error / info + soft variants — semantic status
 *
 * Neutrals (canvas/surface/border/ink/muted/subtle) are drawn from Tailwind's
 * published `slate` scale in light mode, and from GitHub Primer's dark-theme
 * values in dark mode (ADR-0042) — not the slate scale, since Primer's dark
 * neutrals are tuned as a set for that specific near-black canvas.
 * success/warning/error are drawn from Tailwind's published green/yellow/red
 * scales in both modes (`scales` below), just at a lighter-numbered, more
 * legible shade in dark mode.
 *
 * Fixed colors (ink900, brand500 etc.) do NOT flip with dark mode and are
 * safe to use in always-dark contexts like the sidebar.
 */

// ---------------------------------------------------------------------------
// Fixed colors — identical in both themes
// ---------------------------------------------------------------------------
const fixed = {
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',

  // Ink scale (dark neutrals, used for always-dark surfaces)
  ink900: '#16171A',
  ink800: '#212327',
  ink700: '#2B2D32',
  ink600: '#3A3D44',
  // Light steps of the ink scale — text on the always-dark surfaces above
  ink400: '#6B6E78', // dim labels (section eyebrows)
  ink300: '#A1A3AA', // muted text / resting nav items
  ink50: '#F4F4F5', // active + hovered text

  // Brand red scale
  brand50: '#FDECED',
  brand200: '#F7A3A7',
  brand500: '#ED1C24',
  brand600: '#C8141B',
  brand800: '#8E0C11',
}

// ---------------------------------------------------------------------------
// Tailwind's published 10-step scales (ADR-0042) — source of truth for
// status colors (green/yellow/red) in both themes, and for light-mode
// neutrals (slate). Exposed directly for call sites that need a specific
// shade beyond the semantic aliases below (e.g. a hover state one step
// darker than `success`).
// ---------------------------------------------------------------------------
export const scales = {
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  yellow: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#eab308',
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
  },
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
}

// ---------------------------------------------------------------------------
// Non-color design tokens — identical in both themes
// ---------------------------------------------------------------------------
/**
 * The type scale. Values are rem, so they scale with the root font size — and the
 * root is NOT 16px: `index.css` sets `html { font-size: 112.5% }` (= 18px), the
 * FontSizePreference.STANDARD baseline (ADR-0044). Every px below is therefore the
 * *rendered* size at STANDARD, not `rem × 16`. LARGE (125%) and EXTRA_LARGE (137.5%)
 * scale all of them proportionally — that is the whole point of the rem scale, so no
 * single px number can be right for all three levels. STANDARD is the reference.
 *
 * Reach for a {@link Type role} (`theme/typography.ts`) rather than a raw step where
 * one fits — a role carries the family, weight, line-height, and tracking too.
 */
const fontSize = {
  xs: '0.75rem',      // 13.5px @ STANDARD
  sm: '0.8125rem',    // 14.6px
  base: '0.9375rem',  // 16.9px
  lg: '1.0625rem',    // 19.1px
  xl: '1.25rem',      // 22.5px
  '2xl': '1.5rem',    // 27px
  '3xl': '1.875rem',  // 33.8px
  '4xl': '2.25rem',   // 40.5px
  '5xl': '3rem',      // 54px
}

const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
}

/**
 * Line-height ratios. Unitless on purpose: a ratio is independent of the root
 * scaling above, so these hold at every FontSizePreference level.
 *
 * `flat` and `snugTight` sit below `tight` for large display type, where 1.25 leaves
 * headlines looking slack. They have no Tailwind counterpart (its scale, which the
 * rest of this one mirrors, jumps straight from `none` to `tight`).
 */
const lineHeight = {
  flat: '1.1',        // Display — 52/56 in the brand guidelines
  snugTight: '1.17',  // Heading 1 — 36/42
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
}

/**
 * Letter-spacing (tracking), in em so it tracks the font size it's applied to.
 * Large display type needs negative tracking to stop looking gappy; small mono
 * labels need positive tracking to stay readable.
 */
const letterSpacing = {
  tight: '-0.03em',   // Display
  normal: '0',
  wide: '0.08em',     // Overline labels
}

const typography = {
  fontFamily: {
    display: "'Archivo', sans-serif",
    sans: "'Public Sans', ui-sans-serif, system-ui, -apple-system, sans-serif",
    mono: "'IBM Plex Mono', ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace",
  },
}

// Design system border-radius spec: sm=6px, md=10px, lg=14px
const borderRadius = {
  none: '0',
  sm: '6px',
  md: '10px',
  lg: '14px',
  full: '9999px',
}

// Spacing scale — an 8px-based rhythm for gaps, padding, and margins (ADR-0167).
// Reach for a step instead of a bespoke rem so layouts share one rhythm; prefer
// `gap` on a flex/grid parent over per-child margins. Adopted touch-only — new
// code uses `theme.spacing`; existing ad-hoc rems migrate on demand.
const spacing = {
  none: '0',
  xs: '0.25rem', // 4px
  sm: '0.5rem', // 8px
  md: '0.75rem', // 12px
  lg: '1rem', // 16px
  xl: '1.5rem', // 24px
  '2xl': '2rem', // 32px
  '3xl': '3rem', // 48px
  '4xl': '4rem', // 64px
}

// Design system shadow spec
const boxShadow = {
  card: '0 1px 2px rgba(16, 17, 20, 0.06)',
  pop: '0 6px 24px rgba(16, 17, 20, 0.09)',
  none: 'none',
}

const screens = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

const zIndex = {
  0: '0',
  10: '10',
  20: '20',
  30: '30',
  40: '40',
  50: '50',
  auto: 'auto',
}

// ---------------------------------------------------------------------------
// Semantic color tokens — these differ between light and dark themes
// ---------------------------------------------------------------------------
const lightColors = {
  // Background layers — Tailwind slate scale
  canvas: '#FFFFFF',
  surface: scales.slate[50],
  surface2: scales.slate[100],

  // Strokes — Tailwind slate scale
  border: scales.slate[200],
  borderStrong: scales.slate[300],

  // Text hierarchy — Tailwind slate scale
  ink: scales.slate[900],
  muted: scales.slate[600],
  subtle: scales.slate[500], // 500, not 400 — 400 (#94a3b8) fails AA on white (~2.85:1); 500 passes (~4.8:1)

  // Text that sits on a dark/colored fill (brand/accent buttons, dark chrome).
  // Fixed light in BOTH themes: those fills are dark in both, so this must NOT
  // flip like `canvas`/`surface` (which turn near-black in dark mode and made
  // on-fill text unreadable). This is the `inverse` tone's token (ADR-0228).
  onFill: '#FFFFFF',

  // Brand signal color — distinct from `error`, unchanged by ADR-0042
  brand: '#ED1C24',
  brandHover: '#C8141B',
  brandSoft: '#FDECED',

  // Status: success — Tailwind green scale
  success: scales.green[600],
  successSoft: scales.green[50],

  // Status: warning — Tailwind yellow scale
  warning: scales.yellow[700],
  warningSoft: scales.yellow[50],

  // Status: error — Tailwind red scale (not the same red as `brand`)
  error: scales.red[600],
  errorSoft: scales.red[50],

  // Status: info — unchanged by ADR-0042
  info: '#2563C9',
  infoSoft: '#E7EEFB',

  // Interaction accent — the "you're interacting here" color: focus rings,
  // selected/checked controls, active tab, links. Shares info's blue hue but is
  // a distinct ROLE, so red/yellow/green stay purely semantic (traffic-light).
  // This is what replaced `brand` on input focus so a focused field no longer
  // reads as an error.
  accent: '#2563C9',
  accentSoft: '#E7EEFB',

  // Open Enrollment — violet, deliberately outside the run-dot palette
  // (red/green/yellow/blue) so OE windows read as a distinct kind (ADR-0048).
  // `oeSoft` tints the window on the calendar; `oeFaint` the silent period.
  oe: '#7C3AED',
  oeSoft: '#EDE7FB',
  oeFaint: '#F5F1FC',
}

const darkColors = {
  // Background layers — GitHub Primer dark theme neutrals
  canvas: '#0d1117',
  surface: '#161b22',
  surface2: '#21262d',

  // Strokes — GitHub Primer dark theme neutrals
  border: '#30363d',
  borderStrong: '#484f58',

  // Text hierarchy — GitHub Primer dark theme neutrals
  ink: '#e6edf3',
  muted: '#8b949e',
  subtle: '#7d8590', // lifted from #6e7681 for AA contrast on the dark canvas

  // Text on a dark/colored fill — fixed light, does NOT flip (see lightColors). (ADR-0228)
  onFill: '#FFFFFF',

  // Brand signal color — distinct from `error`, unchanged by ADR-0042
  brand: '#ED1C24',
  brandHover: '#FF4A52',
  brandSoft: 'rgba(237, 28, 36, 0.18)',

  // Status: success — Tailwind green scale, lighter shade for dark-bg contrast
  success: scales.green[400],
  successSoft: 'rgba(74, 222, 128, 0.16)',

  // Status: warning — Tailwind yellow scale, lighter shade for dark-bg contrast
  warning: scales.yellow[400],
  warningSoft: 'rgba(250, 204, 21, 0.16)',

  // Status: error — Tailwind red scale, lighter shade for dark-bg contrast
  error: scales.red[400],
  errorSoft: 'rgba(248, 113, 113, 0.16)',

  // Status: info — unchanged by ADR-0042
  info: '#4B8DF8',
  infoSoft: 'rgba(75, 141, 248, 0.16)',

  // Interaction accent — the "you're interacting here" role (focus, selected,
  // active). Shares info's blue hue; keeps red/yellow/green purely semantic.
  accent: '#4B8DF8',
  accentSoft: 'rgba(75, 141, 248, 0.16)',

  // Open Enrollment — violet, outside the run-dot palette (ADR-0048).
  oe: '#A78BFA',
  oeSoft: 'rgba(167, 139, 250, 0.22)',
  oeFaint: 'rgba(167, 139, 250, 0.10)',
}

// ---------------------------------------------------------------------------
// Motion — durations + easings for transitions/animations (ADR-0081).
// One scale so timing is consistent and tunable in a single place instead of
// per-component magic numbers. Referenced by the page/route transitions and the
// Drawer; the scattered hover/micro-interaction transitions are migrated later.
// ---------------------------------------------------------------------------
const motion = {
  duration: {
    fast: '150ms', // hovers, overlay-out
    base: '220ms', // general enter/settle, overlay-in
    slow: '280ms', // page / content route transitions
  },
  easing: {
    enter: 'cubic-bezier(0.22, 1, 0.36, 1)', // decelerate — arriving/settling in
    exit: 'cubic-bezier(0.4, 0, 1, 1)', // accelerate — leaving
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)', // in-out — hovers / bidirectional state
  },
} as const

// ---------------------------------------------------------------------------
// Theme objects
// ---------------------------------------------------------------------------
const baseTheme = {
  fixed,
  scales,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  typography,
  borderRadius,
  spacing,
  boxShadow,
  screens,
  zIndex,
  motion,
}

export const lightTheme = {
  ...baseTheme,
  colors: { ...fixed, ...lightColors },
}

export const darkTheme = {
  ...baseTheme,
  colors: { ...fixed, ...darkColors },
}

export type AppTheme = typeof lightTheme

// ---------------------------------------------------------------------------
// User-selectable font preferences (ADR-0044)
// ---------------------------------------------------------------------------

export type FontSizePreference = 'STANDARD' | 'LARGE' | 'EXTRA_LARGE'

/**
 * Root <html> font-size percentage per FontSizePreference level. The whole
 * rem-based fontSize scale above grows proportionally from this — no
 * per-token overrides. STANDARD (112.5%) is also the default set directly in
 * index.css, so unauthenticated/marketing pages get the same baseline
 * without needing a UserPreferencesProvider to apply it first.
 */
export const fontSizeScale: Record<FontSizePreference, number> = {
  STANDARD: 112.5,
  LARGE: 125,
  EXTRA_LARGE: 137.5,
}

/**
 * Only DEFAULT exists today — no font style has been chosen yet. Reserved so
 * choosing real fonts later is additive, not a schema migration.
 */
export type FontFamilyPreference = 'DEFAULT'

// The type roles ride the theme barrel (coop#6: no de-facto-private files), and
// the side-effect import keeps the DefaultTheme augmentation in every consumer's
// type graph — declaration emit preserves it into dist/theme/index.d.ts.
export * from './typography'
import './styled'
