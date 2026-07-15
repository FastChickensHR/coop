# Coop

**The open-source design system behind [FastChickens HR](https://fastchickenshr.com).**

Coop is a small, carefully-made set of accessible React components and design tokens — the same ones we ship in production. We build in the open because we care about craft, and we'd love your help shaping it.

> **Live showcase → [fastchickenshr.com/design](https://fastchickenshr.com/design)** — every token and component rendered from this source, in light and dark.

## Philosophy

- **Dependency-light.** No UI framework. Accessible headless primitives ([Radix](https://www.radix-ui.com/)) styled with our own themed [styled-components](https://styled-components.com/) — we own the CSS, so we own the craft.
- **Accessible by default.** Focus management, keyboard navigation, ARIA, and reduced-motion come from the primitives and a small motion scale — not bolted on afterward.
- **One themed source of truth.** Color, type, spacing, and motion are typed tokens. Light and dark are the same components reading the same theme.

## Install

```bash
yarn add github:FastChickensHR/coop
yarn add react react-dom styled-components   # peer deps
```

Coop components read their tokens from a styled-components `ThemeProvider` — this is **required**:

```tsx
import { ThemeProvider } from 'styled-components'
import { lightTheme, Button, FormField, Input } from 'coop'

export function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <FormField label="Email" required>
        <Input type="email" placeholder="you@company.com" />
      </FormField>
      <Button $variant="primary">Save</Button>
    </ThemeProvider>
  )
}
```

For dark mode, swap `lightTheme` for `darkTheme`. Coop is designed for Archivo / Public Sans / IBM Plex Mono — install the `@fontsource/*` packages for the intended look (the theme falls back to system fonts otherwise). Full per-component API — props, types, usage — is on the [live docs](https://fastchickenshr.com/design).

## What's inside

**35 components** — buttons, the full form-control set (inputs, select, combobox, date pickers, checkbox/radio/switch/slider/toggle), overlays (modal, drawer-adjacent popover, dropdown menu, tooltip), feedback (spinner, skeleton, progress, alert, empty state), surfaces & navigation (card, accordion, breadcrumbs, pagination, stepper), and data display (table, avatar, chip, badge, description list).

**Foundations** — a typed theme (color scales + semantic tokens, three type families and a modular scale, spacing, radius, elevation) and a motion scale (durations + easings), all exported.

## Status

A **curated snapshot** published one-way from our private monorepo — **installable from GitHub** (ships prebuilt ESM + TypeScript types). An npm release will follow if there's demand.

If Coop resonates with you — especially if you're a designer — we'd genuinely love to talk: **contact@fastchickenshr.com**.

## License

[MIT](./LICENSE) © FastChickens HR
