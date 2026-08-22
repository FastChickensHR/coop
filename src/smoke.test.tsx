/**
 * The Coop quality bar (coop#11 / #989): every component reachable from the
 * public barrel mounts under the theme, and every mount is axe-clean.
 *
 * The enrolment is **structural, not a list**: the suite imports `./index` and
 * enumerates its exports at runtime, so a component added to the barrel is
 * tested the moment it is exported — there is nothing to remember to update.
 * That is the whole point; never replace the enumeration with a hand-kept array.
 *
 * There is no behavioural-coverage mandate here. A component passes by
 * rendering without throwing and producing no WCAG A/AA violation. Behaviour is
 * tested where behaviour lives.
 *
 * ## The ratchet
 *
 * An export with no fixture is mounted bare — `<X />`. That is deliberate: a new
 * part-set member (something that only makes sense inside a parent, like a new
 * `TabsX`) will FAIL until someone gives it a fixture describing a valid
 * composition. The failure is the prompt to say how the part is meant to be
 * used; do not "fix" it by loosening the mount.
 */
import { createElement, type ComponentType, type ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { axe } from 'vitest-axe'
import * as coop from './index'

// ---------------------------------------------------------------------------
// What counts as a component
// ---------------------------------------------------------------------------

/**
 * The barrel also exports the theme, the typography `css` fragments and the
 * `lib/date` + `lib/quickPicks` functions, none of which can be mounted. The
 * split is pragmatic and matches the convention the package already follows:
 * components are PascalCase and are either a function component or a React
 * object type (styled-components and `forwardRef` both produce the latter);
 * everything public that is not a component is camelCase or SCREAMING_CASE.
 *
 * A PascalCase non-component added to the barrel would be enrolled and fail —
 * an acceptable false positive, and a fair question to be asked at review.
 */
function isReactComponent(name: string, value: unknown): boolean {
  if (!/^[A-Z]/.test(name)) return false
  if (typeof value === 'function') return true
  if (typeof value !== 'object' || value === null) return false
  const tag = (value as { $$typeof?: symbol }).$$typeof
  return tag === Symbol.for('react.forward_ref') || tag === Symbol.for('react.memo')
}

const components = Object.entries(coop)
  .filter(([name, value]) => isReactComponent(name, value))
  .map(([name, value]) => [name, value as ComponentType] as const)

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

/**
 * Minimal, valid usage for the exports a bare `<X />` cannot express:
 *
 *  - **part-set members** (`AccordionItem`, `TabsTrigger`, `Td`, …) — they need
 *    their parent, so the fixture mounts the whole composition;
 *  - **components with required props** — a callback, an options list, an
 *    accessible name.
 *
 * Keep each fixture the smallest thing that is genuinely valid. They are JSX
 * (not prop bags) so the compiler checks them against the real prop types.
 */
const FIXTURES: Record<string, () => ReactElement> = {}

const noop = () => {}

// -- Accordion (part set) ----------------------------------------------------
const accordion = () => (
  <coop.Accordion type="single" collapsible defaultValue="one">
    <coop.AccordionItem value="one">
      <coop.AccordionHeader>
        <coop.AccordionTrigger>Eligibility</coop.AccordionTrigger>
      </coop.AccordionHeader>
      <coop.AccordionContent>
        <div>Who the plan covers.</div>
      </coop.AccordionContent>
    </coop.AccordionItem>
  </coop.Accordion>
)
for (const part of [
  'Accordion',
  'AccordionItem',
  'AccordionHeader',
  'AccordionTrigger',
  'AccordionContent',
]) {
  FIXTURES[part] = accordion
}

// -- Description list (part set) ---------------------------------------------
const descriptionList = () => (
  <coop.DescriptionList>
    <coop.DescriptionTerm>Status</coop.DescriptionTerm>
    <coop.DescriptionDetails>Active</coop.DescriptionDetails>
  </coop.DescriptionList>
)
for (const part of ['DescriptionList', 'DescriptionTerm', 'DescriptionDetails']) {
  FIXTURES[part] = descriptionList
}

// -- Dropdown menu (part set; the content self-portals, so it needs the root) --
const dropdownMenu = () => (
  <coop.DropdownMenu open modal={false}>
    <coop.DropdownMenuTrigger>Actions</coop.DropdownMenuTrigger>
    <coop.DropdownMenuContent>
      <coop.DropdownMenuLabel>Row</coop.DropdownMenuLabel>
      <coop.DropdownMenuItem>Edit</coop.DropdownMenuItem>
      <coop.DropdownMenuSeparator />
      <coop.DropdownMenuItem>Delete</coop.DropdownMenuItem>
    </coop.DropdownMenuContent>
  </coop.DropdownMenu>
)
for (const part of [
  'DropdownMenu',
  'DropdownMenuTrigger',
  'DropdownMenuContent',
  'DropdownMenuItem',
  'DropdownMenuSeparator',
  'DropdownMenuLabel',
]) {
  FIXTURES[part] = dropdownMenu
}

// -- Popover (part set) ------------------------------------------------------
const popover = () => (
  <coop.Popover open modal={false}>
    <coop.PopoverTrigger>Details</coop.PopoverTrigger>
    <coop.PopoverContent>
      <p>The effective date decides the plan year.</p>
      <coop.PopoverClose>Close</coop.PopoverClose>
    </coop.PopoverContent>
  </coop.Popover>
)
for (const part of ['Popover', 'PopoverTrigger', 'PopoverContent', 'PopoverClose']) {
  FIXTURES[part] = popover
}

// -- Table (part set) --------------------------------------------------------
const table = (Root: typeof coop.Table) => () => (
  <coop.TableScroll>
    <Root>
      <coop.Thead>
        <coop.Tr>
          <coop.Th>Member</coop.Th>
          <coop.Th>Effective</coop.Th>
        </coop.Tr>
      </coop.Thead>
      <coop.Tbody>
        <coop.Tr>
          <coop.Td>Ada Lovelace</coop.Td>
          <coop.Td>2026-01-01</coop.Td>
        </coop.Tr>
      </coop.Tbody>
    </Root>
  </coop.TableScroll>
)
for (const part of ['TableScroll', 'Table', 'Thead', 'Tbody', 'Tr', 'Th', 'Td']) {
  FIXTURES[part] = table(coop.Table)
}
FIXTURES.Timeline = table(coop.Timeline)

// -- Tabs (part set) ---------------------------------------------------------
const tabs = () => (
  <coop.Tabs defaultValue="setup">
    <coop.TabsList>
      <coop.TabsTrigger value="setup">Setup</coop.TabsTrigger>
    </coop.TabsList>
    <coop.TabsContent value="setup">Setup panel</coop.TabsContent>
  </coop.Tabs>
)
for (const part of ['Tabs', 'TabsList', 'TabsTrigger', 'TabsContent']) {
  FIXTURES[part] = tabs
}

// -- Toggle group (part set) -------------------------------------------------
const toggleGroup = () => (
  <coop.ToggleGroup type="single" defaultValue="list" aria-label="View mode">
    <coop.ToggleGroupItem value="list">List</coop.ToggleGroupItem>
    <coop.ToggleGroupItem value="grid">Grid</coop.ToggleGroupItem>
  </coop.ToggleGroup>
)
FIXTURES.ToggleGroup = toggleGroup
FIXTURES.ToggleGroupItem = toggleGroup

// -- Required props ----------------------------------------------------------
FIXTURES.Avatar = () => <coop.Avatar name="Ada Lovelace" />
FIXTURES.Badge = () => <coop.Badge>Active</coop.Badge>
FIXTURES.Breadcrumbs = () => (
  <coop.Breadcrumbs items={[{ label: 'Integrations', href: '/integrations' }, { label: 'Setup' }]} />
)
FIXTURES.Button = () => <coop.Button>Save</coop.Button>
FIXTURES.CardTitle = () => <coop.CardTitle>Coverage</coop.CardTitle>
FIXTURES.Checkbox = () => <coop.Checkbox aria-label="Include terminated members" />
FIXTURES.Chip = () => <coop.Chip onRemove={noop}>Dental</coop.Chip>
FIXTURES.Combobox = () => (
  <coop.Combobox aria-label="Carrier" options={[{ value: 'bcbs', label: 'BCBS' }]} />
)
FIXTURES.ConfirmDialog = () => (
  <coop.ConfirmDialog
    open
    onOpenChange={noop}
    onConfirm={noop}
    title="Promote to production?"
    description="The feed starts sending real files."
  />
)
FIXTURES.DatePicker = () => <coop.DatePicker aria-label="Effective date" />
FIXTURES.Drawer = () => (
  <coop.Drawer open onOpenChange={noop} title="Employee detail" description="Everything on file.">
    <p>Body</p>
  </coop.Drawer>
)
FIXTURES.DrawerProvider = () => (
  <coop.DrawerProvider>
    <p>Page content</p>
  </coop.DrawerProvider>
)
FIXTURES.DrawerSlot = () => (
  // A slot only means something inside the provider that owns the one global drawer.
  <coop.DrawerProvider>
    <coop.DrawerSlot open title="Employee detail">
      <p>Body</p>
    </coop.DrawerSlot>
  </coop.DrawerProvider>
)
FIXTURES.DrawerBody = () => (
  <coop.DrawerBody>
    <p>Section</p>
  </coop.DrawerBody>
)
FIXTURES.DrawerSection = () => (
  <coop.DrawerSection title="Delivery">
    <p>Row</p>
  </coop.DrawerSection>
)
FIXTURES.DrawerField = () => <coop.DrawerField label="Carrier">BCBS</coop.DrawerField>
FIXTURES.DateRangePicker = () => (
  <coop.DateRangePicker startAriaLabel="Range start" endAriaLabel="Range end" />
)
FIXTURES.EmptyState = () => (
  <coop.EmptyState title="No integrations yet" description="Create one to start sending files." />
)
FIXTURES.Field = () => (
  <coop.Field>
    <coop.Input aria-label="Group number" />
  </coop.Field>
)
FIXTURES.FormField = () => (
  <coop.FormField label="Group number">
    <coop.Input />
  </coop.FormField>
)
FIXTURES.ErrorText = () => <coop.ErrorText>Enter a group number.</coop.ErrorText>
FIXTURES.Input = () => <coop.Input aria-label="Group number" />
FIXTURES.Label = () => <coop.Label htmlFor="smoke-label-target">Group number</coop.Label>
FIXTURES.Modal = () => (
  <coop.Modal open onOpenChange={noop} title="Edit carrier" description="Change the destination.">
    <p>Body</p>
  </coop.Modal>
)
FIXTURES.NumberInput = () => <coop.NumberInput aria-label="Group size" />
FIXTURES.PageHeading = () => (
  <coop.PageHeading title="Members" subtitle="Everyone in the organization" />
)
FIXTURES.Pagination = () => <coop.Pagination page={2} pageCount={5} onPageChange={noop} />
FIXTURES.PasswordInput = () => <coop.PasswordInput aria-label="Password" />
FIXTURES.Progress = () => <coop.Progress value={40} aria-label="Upload progress" />
FIXTURES.RadioGroup = () => (
  <coop.RadioGroup
    aria-label="Cadence"
    options={[
      { value: 'weekly', label: 'Weekly' },
      { value: 'monthly', label: 'Monthly' },
    ]}
  />
)
FIXTURES.Select = () => (
  <coop.Select
    aria-label="Carrier"
    options={[
      { value: 'bcbs', label: 'BCBS' },
      { value: 'delta', label: 'Delta Dental' },
    ]}
  />
)
FIXTURES.Slider = () => <coop.Slider value={50} onValueChange={noop} aria-label="Threshold" />
FIXTURES.StatusMessage = () => (
  <coop.StatusMessage status="error">Enter a group number.</coop.StatusMessage>
)
FIXTURES.Stepper = () => (
  <coop.Stepper current={1} steps={[{ label: 'Connect' }, { label: 'Map' }, { label: 'Send' }]} />
)
FIXTURES.Switch = () => (
  <coop.Switch checked={false} onCheckedChange={noop} aria-label="Send test files" />
)
FIXTURES.Text = () => <coop.Text>Effective 2026-01-01.</coop.Text>
FIXTURES.Textarea = () => <coop.Textarea aria-label="Notes" />
FIXTURES.Tooltip = () => (
  <coop.Tooltip content="Files land here">
    <button type="button">Destination</button>
  </coop.Tooltip>
)

// ---------------------------------------------------------------------------
// Accessibility
// ---------------------------------------------------------------------------

/**
 * The conformance target, not a convenience: WCAG 2.0/2.1 level A + AA. Rules
 * outside it are axe's "best-practice" set, which is page-shaped (`region`,
 * `landmark-one-main`, `page-has-heading-one`) and says nothing true about a
 * component rendered on its own.
 */
const WCAG_AA = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']

/**
 * Per-component, per-rule exemptions. Every entry needs a reason naming why the
 * violation is not the component's to fix — a suite-wide rule disable is never
 * the answer, because it would hide the same fault everywhere else.
 */
const AXE_EXEMPTIONS: Record<string, { rules: string[]; reason: string }> = {}

// ---------------------------------------------------------------------------
// The suite
// ---------------------------------------------------------------------------

afterEach(cleanup)

describe('coop public barrel', () => {
  it('exports at least the agreed cut line of components', () => {
    // coop#6 settled the surface at 38 components; each contributes one or more
    // exports. A drop below the line means the barrel lost something.
    expect(components.length).toBeGreaterThanOrEqual(38)
  })

  it('has no fixture or exemption for an export that no longer exists', () => {
    // A rename would otherwise leave the old fixture unused and silently drop
    // the renamed export to a bare mount — losing its composition and its props.
    const exported = new Set(components.map(([name]) => name))
    const stale = [...Object.keys(FIXTURES), ...Object.keys(AXE_EXEMPTIONS)].filter(
      (name) => !exported.has(name),
    )
    expect(stale).toEqual([])
  })

  it.each(components.map(([name]) => name))(
    '%s mounts under the theme and is axe-clean',
    async (name) => {
      const fixture = FIXTURES[name]
      const component = components.find(([n]) => n === name)![1]
      const element = fixture ? fixture() : createElement(component)

      const { baseElement } = render(
        <ThemeProvider theme={coop.lightTheme}>{element}</ThemeProvider>,
      )

      const exemption = AXE_EXEMPTIONS[name]
      const results = await axe(baseElement, {
        runOnly: { type: 'tag', values: WCAG_AA },
        rules: Object.fromEntries(
          (exemption?.rules ?? []).map((rule) => [rule, { enabled: false }]),
        ),
      })

      expect(results.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([])
    },
    15_000,
  )
})
