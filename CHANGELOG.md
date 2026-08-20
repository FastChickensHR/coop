# Changelog

All notable changes to Coop are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
This file is curated by hand — it is not generated from commit messages. The
commit history remains the raw feed; this file is the canonical, human-readable
record.

## Conventions

- One section per released version, newest first.
- Every release section carries a **mandatory Breaking subsection** — written
  explicitly as "none" when there are no breaking changes. The heading is never
  omitted. This subsection is the canonical notice that the compatibility
  promise below refers to.
- Standard Keep-a-Changelog subsections (Added, Changed, Deprecated, Removed,
  Fixed, Security) are used as applicable.
- On each release cut, the version's section is mirrored into the GitHub
  Release notes.

## Versioning and deprecation policy

Decided in [#7](https://github.com/FastChickensHR/coop/issues/7); recorded here
so consumers can find it.

### Version scheme

- Versions run `1.0.0-beta.N` → `1.0.0`. **There is no 0.x line** — a
  prerelease tag states the destination ("this API is locking toward 1.0")
  where 0.x states nothing, and `^0.x` npm ranges make every 0.x minor behave
  like a major anyway. Graduation is a rename (`beta.N` → `1.0.0`), not a
  renumbering.
- The `v0.1.0` tag below predates this policy and is kept as history, not as a
  scheme commitment.
- **Lockstep by construction:** Coop is one package, so the components, the
  theme, and the public `lib/*` helpers always share one version. There is
  nothing to keep in sync.

### Release discipline

- **Beta → beta: breaking changes are allowed, but never silently.** Every
  break is enumerated in that release's Breaking subsection. The notice is the
  promise during the beta.
- **`1.0.0` is a content-identical re-release of the final beta** — nothing but
  the version string changes. Any change between the last beta and stable
  invalidates the soak, so it ships as one more `beta.N` first, and that
  becomes the new candidate.

### Compatibility promise — two tiers, and an explicit not-covered list

**Tier 1 — gated: the exported type surface.** The public `.d.ts`: everything
reachable from the entry barrel (`src/index.ts`), plus the `DefaultTheme`
augmentation of `styled-components`. A break is anything that makes existing
consumer code fail to typecheck — a removed or renamed export, a new required
prop, a narrowed prop type, a changed callback signature, or a change to the
theme's *shape*. Mechanically diffable, no judgment calls.

**Tier 2 — policy: documented prop behavior.** The semantics types can't see —
a changed behavioral default, controlled/uncontrolled semantics, a prop that
stops honoring its documented effect. These are breaking changes and carry a
mandatory Breaking entry, but they are enforced by review and changelog
discipline rather than by an automated gate.

**Not covered.** Rendered DOM structure, class names, internal element
hierarchy, visual appearance, and token *values*. Consumers writing selectors
into Coop internals are outside the promise, and visual or markup refactors
stay free forever. Worked example: changing the theme's **shape** is a break
(with notice during the beta, a major after 1.0); changing a token's **value**
is never a break, at any stage.

### How Tier 1 is enforced

Decided in [#10](https://github.com/FastChickensHR/coop/issues/10). The exported
type surface is snapshotted, resolved and normalized, into **`API.md`**, which
ships with the package. In the source monorepo `yarn coop:api` regenerates it and
CI fails when the committed copy is stale, so the surface cannot move without the
diff appearing in the pull request that moves it.

Changing the surface is therefore two acts, and never one:

1. **Commit the regenerated report.** Always — additions included. The gate only
   asks whether the report is current.
2. **Add the Breaking entry** to the release's mandatory Breaking subsection —
   only when the change breaks consumers, which is the judgement in the tiers
   above.

There is no exclusions file and no way to acknowledge a break away. A snapshot
gate never *classifies* a change, so there is nothing to overrule: it makes every
surface change visible and leaves the question of what it means to a human, in
the changelog.

### Deprecation

- The marker is the **JSDoc `@deprecated` tag** on the prop or the component
  export, and it must name the replacement (or state that there is none).
  IDE strikethrough and lint rules do the rest.
- **Type-level only — no runtime `console.warn`.** Deprecation never adds
  bundle noise.
- Removal is **release-based**: a public API is removed only at a **major**
  version, and only after at least **one shipped minor** carried the
  deprecation marker.
- During the beta, deprecation is **optional** — betas may break directly under
  the breaks-allowed-with-notice rule above.

## [Unreleased]

### Breaking

- none

## [1.0.0-beta.1]

The first release the compatibility promise applies to. Everything below is
measured against `v0.1.0` — the July snapshot, published before the versioning
policy existed — by diffing the generated `API.md` surface report: **114 exported
names then, 162 now, and none removed**. Upgrading from that snapshot is a rename
exercise, not a rewrite.

### Breaking

- **The package is now `@fastchickenshr/coop`.** It was `coop`. Change the
  install target and every import specifier:

  ```diff
  - yarn add FastChickensHR/coop#v0.1.0
  + yarn add FastChickensHR/coop#v1.0.0-beta.1
  - import { Button, lightTheme } from 'coop'
  + import { Button, lightTheme } from '@fastchickenshr/coop'
  ```

- **Transient `$`-prefixed props are gone from the public API.** `$`-prefixing is
  styled-components' escape syntax for "do not forward this to the DOM" — an
  implementation detail that should never have reached consumers. It is now
  internal-only, and 23 props across 17 exported components take clean names.
  Passing the old name is silently ignored, so this is a compile error only if
  you typecheck; grep for `$` in your JSX either way.

  | Component | Renamed |
  | --- | --- |
  | `Alert`, `Badge` | `$variant` → `variant` |
  | `Button` | `$variant` → `variant`, `$size` → `size` |
  | `Card` | `$interactive` → `interactive` |
  | `Combobox`, `DatePicker`, `DateRangePicker`, `Input`, `Select`, `Textarea` | `$hasError` → `hasError` |
  | `Skeleton` (and `SkeletonCircle`, `SkeletonText`) | `$radius` → `radius` |
  | `Spinner` | `$size` → `size`, `$color` → `color` |
  | `DropdownMenuItem` | `$danger` → `danger` |
  | `StatusMessage` | `$status` → `status` |
  | `Tr` | `$interactive` → `interactive` |
  | `Th` | `$noBorder` → `noBorder`, `$align` → `align` |
  | `Td` | `$noBorder` → `noBorder`, `$align` → `align`, `$mono` → `mono`, `$muted` → `muted` |

- **The theme shape gained keys.** Purely additive — no key was removed or
  retyped — so reading the theme is unaffected. This breaks you only if you hand
  author a theme object typed as `DefaultTheme`, which must now also supply:
  a top-level `letterSpacing` group (`normal`, `tight`, `wide`); `lineHeight.flat`
  and `lineHeight.snugTight`; `colors.onFill`; and `ink50` / `ink300` / `ink400`
  on both `colors` and `fixed`. Token *values* remain outside the promise.

### Added

- **Three components**, taking the surface from 35 to 38: `ConfirmDialog`,
  `PasswordInput`, and `Text`. All three existed in the source at 0.1.0 but never
  reached a published build.
- **The date foundations are public.** `lib/date` (`formatDate`, `formatDateTime`,
  `formatInstant`, `parseUserDate`, `toISO`, `fromISO`, `todayISO`, `todayDate`,
  `todayDateIn`, `dayOfInstant`, `outOfRange`, `Timeline`) and `lib/quickPicks`
  (`QuickPick`, `QuickPickMatch`, `QuickPickToken`, `RangePeriod`, `RangePick`,
  `quickPicksFor`, `rangePicksFor`, `resolveQuickPick`, `resolveRangePeriod`,
  `matchQuickPick`, `ALWAYS`, `ANYTIME`, `ONGOING`) now export from the entry
  barrel. They were already load-bearing — `DateEdge` and `DateRangeValue` appear
  inside the picker components' public props — so shipping them unexported made
  those props unusable.
- **The typography role tokens** (`h1Type`, `h2Type`, `pageTitleType`,
  `sectionTitleType`, `panelHeadingType`, `cardHeadingType`, `displayType`,
  `bodyType`, `bodyLargeType`, `bodySmallType`, `captionType`, `eyebrowType`,
  `overlineType`, `monoType`) export from the theme barrel.
- **A typed theme for installed consumers.** The `DefaultTheme` augmentation of
  `styled-components` now compiles into `dist/`. At 0.1.0 it lived in a
  `.d.ts` that the build did not emit, so anyone installing the package got an
  untyped `theme` inside their own styled components.
- **`PasswordInputProps`** is exported.
- **`Combobox` gained** `creatable`, `multiple`, `loading`, `debounceMs`,
  `onSearch`, `onCreate`, `onValuesChange`, and `values`.
- **`API.md`** — a normalized snapshot of the public type surface, generated from
  the types and shipped with the package. Diff it between two releases to see
  exactly what moved.
- **`CHANGELOG.md`** ships inside the package, so the versioning and deprecation
  policy travels with the code.

### Fixed

- **The published build is whole again.** The 0.1.0 publishing machinery assembled
  its tree from a hand-maintained manifest that omitted `lib/quickPicks`, which
  the date pickers import — a republish from it would not have compiled. The
  manifest is gone; the entry barrel and the package's own build are now the only
  definition of what ships, so a file the surface reaches cannot be left behind.

### Changed

- **The compatibility promise starts here.** Two tiers: the exported type surface
  is gated by `API.md` in CI, and documented prop behavior is covered by policy.
  DOM structure, class names, visuals, and token values are not covered. The full
  statement is in `CHANGELOG.md`, which ships inside the package.

## [0.1.0] - 2026-07-15

The first public snapshot, published before the versioning policy above existed
and retro-tagged for the record. Kept as history: the `1.0.0-beta.N` line is
the versioned surface, and no compatibility promise attaches to this release.

### Added

- 35 components and the typed theme, installable from GitHub under MIT.

[Unreleased]: https://github.com/FastChickensHR/coop/compare/v1.0.0-beta.1...HEAD
[1.0.0-beta.1]: https://github.com/FastChickensHR/coop/compare/v0.1.0...v1.0.0-beta.1
[0.1.0]: https://github.com/FastChickensHR/coop/releases/tag/v0.1.0
