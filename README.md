# Coop

**The open-source design system behind FastChickens HR.**

Coop is a small, carefully-made set of accessible React components and design
tokens — the same ones we ship in production. We build in the open because we
care about craft, and we'd love your help shaping it.

**[Read the docs →](https://fastchickenshr.github.io/coop/)** — every component with
live examples, the theme tokens, and the color and typography scales, in light or dark.

## Philosophy

- **Dependency-light.** No UI framework. Accessible headless primitives ([Radix](https://www.radix-ui.com/)) styled with our own themed [styled-components](https://styled-components.com/) — we own the CSS, so we own the craft.
- **Accessible by default.** Focus management, keyboard navigation, ARIA, and reduced-motion come from the primitives and a small motion scale — not bolted on afterward.
- **One themed source of truth.** Color, type, spacing, and motion are typed tokens. Light and dark are the same components reading the same theme.

## Install

Coop is distributed **from GitHub only** — there is no npm package. Install a
**tag**, never a branch:

```bash
yarn add FastChickensHR/coop#<tag>           # the tag you're pinning to
yarn add react react-dom styled-components   # peer deps
```

Tags are the versioned surface and carry the compatibility promise below.
`main` is a **continuously-published mirror** of our monorepo — it may run ahead
of the tags at any moment, so pin to a tag and move deliberately. The
[releases page](https://github.com/FastChickensHR/coop/releases) lists every
published tag; take the newest one.

## Use

Coop components read their tokens from a styled-components `ThemeProvider` —
this is **required**:

```tsx
import { ThemeProvider } from 'styled-components'
import { lightTheme, Button, FormField, Input } from '@fastchickenshr/coop'

export function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <FormField label="Email" required>
        <Input type="email" placeholder="you@company.com" />
      </FormField>
      <Button variant="primary">Save</Button>
    </ThemeProvider>
  )
}
```

For dark mode, swap `lightTheme` for `darkTheme`. Coop is designed for Archivo /
Public Sans / IBM Plex Mono — install the `@fontsource/*` packages for the
intended look (the theme falls back to system fonts otherwise).

Theme access is fully typed with no setup on your side: the `DefaultTheme`
augmentation ships in the published types, so the tokens are typed inside your
own styled-components too.

## What's inside

**38 components** — buttons, the full form-control set (inputs, select,
combobox, date pickers, checkbox/radio/switch/slider/toggle), overlays (modal,
confirm dialog, popover, dropdown menu, tooltip), feedback (spinner, skeleton,
progress, alert, empty state), surfaces & navigation (card, accordion,
breadcrumbs, pagination, stepper), and data display (table, avatar, chip, badge,
description list).

**Foundations** — a typed theme (color scales + semantic tokens, three type
families and a modular scale, spacing, radius, elevation) and a motion scale
(durations + easings), all exported.

The per-component reference — live demos, props, types, and when to reach for
each one — lives on the FastChickens HR design showcase. A link will land here
once the domain is live.

## Tests & bundlers

Bundler consumers (Vite and friends) work out of the box. **Vitest** needs
`server: { deps: { inline: ['@fastchickenshr/coop'] } }` in its config, and
**native Node ESM without a bundler is not supported at beta** — see
[CHANGELOG.md](./CHANGELOG.md) and the Getting Started page on the showcase for
the detail and the reason.

## Status

Coop is in **beta**. Versions run `1.0.0-beta.N` → `1.0.0`; every release
section in [CHANGELOG.md](./CHANGELOG.md) carries a mandatory **Breaking**
subsection, written explicitly as "none" when there is nothing to report. Betas
may break — never silently.

The compatibility promise has **two tiers**: the exported **type surface**
(everything reachable from the entry point, plus the `DefaultTheme`
augmentation) is mechanically gated, and **documented prop behavior** is held by
review and changelog discipline. Rendered DOM, class names, and token *values*
are explicitly not covered. The full text, with worked examples and the
deprecation policy, is in [CHANGELOG.md](./CHANGELOG.md).

This repository is a curated snapshot published one-way from our private
monorepo, prebuilt (ESM + TypeScript types).

If Coop resonates with you — especially if you're a designer — we'd genuinely
love to talk: **contact@fastchickenshr.com**.

## Support

Support is **best-effort, via [GitHub issues](https://github.com/FastChickensHR/coop/issues)** — no SLA.
For security vulnerabilities, follow [SECURITY.md](./SECURITY.md) (private
reporting, never a public issue). If all else fails: **contact@fastchickenshr.com**.

## Brand

The FastChickens HR name, rooster mark, and wordmark are **trademarks, not
MIT** — they don't ship here. Take the code; leave the rooster. See
[TRADEMARK.md](./TRADEMARK.md).

## License

[MIT](./LICENSE) © FastChickens HR — **code only**. The brand is reserved; see
[TRADEMARK.md](./TRADEMARK.md).
