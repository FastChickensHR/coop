import { type KeyboardEvent as ReactKeyboardEvent, type RefObject } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import type { CalendarDate } from '@internationalized/date'
import { outOfRange } from '../../lib/date'
import type { QuickPick } from '../../lib/quickPicks'
import { MONTH_NAMES, WEEKDAYS, dayLabel } from './model'
import {
  CalHeader,
  Content,
  DayButton,
  Grid,
  Mark,
  MonthLabel,
  NavButton,
  PickButton,
  PickLabel,
  PickRow,
  Weekday,
} from './styles'

export interface CalendarPopoverProps {
  calendarId?: string
  picks: QuickPick[]
  anchor: CalendarDate
  cells: CalendarDate[]
  valueIso: string | null
  todayIso: string
  focusIso: string
  min?: string | null
  max?: string | null
  inGrid: boolean
  inputRef: RefObject<HTMLInputElement | null>
  onMonthShift: (months: number) => void
  onPressQuickPick: (pick: QuickPick) => void
  onPickDay: (day: CalendarDate) => void
  onGridKeyDown: (event: ReactKeyboardEvent) => void
  onGridElement: (element: HTMLDivElement | null) => void
  onEscapeFromGrid: () => void
}

/** The popover half of the DatePicker (#1228): quick picks, month header, day grid — markup
 *  only; every decision flows back through the callbacks the component wires in. */
export function CalendarPopover({
  calendarId,
  picks,
  anchor,
  cells,
  valueIso,
  todayIso,
  focusIso,
  min,
  max,
  inGrid,
  inputRef,
  onMonthShift,
  onPressQuickPick,
  onPickDay,
  onGridKeyDown,
  onGridElement,
  onEscapeFromGrid,
}: CalendarPopoverProps) {
  return (
    <Popover.Portal>
      <Content
        id={calendarId}
        align="start"
        sideOffset={4}
        // ⚠️ §6's own hazard: the picks now sit on the popover's TOP edge, which is exactly
        // the edge that gets clipped. At 480×900 a flipped popover rendered at y=-26 — 26px
        // shaved off what used to be dead padding and is now the fast path. Without this, a
        // fourth pick would silently eat it. (The separate "flip to top covers the field"
        // worry was measured FALSE and is not what this guards.)
        collisionPadding={8}
        role="dialog"
        aria-label="Choose date"
        onOpenAutoFocus={(e) => e.preventDefault()}
        // ⚠️ Radix returns focus to the TRIGGER on close, which would land the user on the 📅
        // icon — a control that is deliberately no longer a tab stop. The DatePicker decides
        // where focus goes after every close, so Radix must not.
        onCloseAutoFocus={(e) => e.preventDefault()}
        // ⚠️ Trap 4 — focus deliberately sits OUTSIDE the content (in the input), so Radix's
        // DismissableLayer reads typing there as a focus-outside and would dismiss the
        // calendar mid-keystroke. Guarding it is what lets the grid track what you type.
        onFocusOutside={(e) => e.preventDefault()}
        // The input is "outside" the popover in DOM terms but is the same control to the user,
        // and under §3 it is where focus deliberately lives. Clicking into it to move the caret
        // must not dismiss the calendar you are picking from. Every other outside click still
        // closes, which is what makes the field's own click the only exception.
        onPointerDownOutside={(e) => {
          if (e.target === inputRef.current) e.preventDefault()
        }}
        // Escape only ever closes — never clears, never reverts (clearing is what select-all
        // and Delete are for). When focus is in the grid the popover is about to unmount from
        // under it, so hand focus back explicitly. When the calendar is already CLOSED this
        // handler doesn't exist and Escape bubbles, so an enclosing Drawer still closes.
        onEscapeKeyDown={() => {
          if (inGrid) onEscapeFromGrid()
        }}
      >
        {picks.length > 0 && (
          <PickRow>
            {picks.map((p) => (
              <PickButton
                key={p.token}
                type="button"
                aria-label={p.accessibleName}
                // Same trap as the day cells: without this, mousedown steals focus out of the
                // input before the press handler can land it back there.
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => onPressQuickPick(p)}
              >
                <PickLabel>
                  {p.label.slice(0, p.markIndex)}
                  <Mark>{p.label[p.markIndex]}</Mark>
                  {p.label.slice(p.markIndex + 1)}
                </PickLabel>
              </PickButton>
            ))}
          </PickRow>
        )}
        <CalHeader>
          <NavButton type="button" aria-label="Previous month" onClick={() => onMonthShift(-1)}>
            <ChevronLeftIcon />
          </NavButton>
          <MonthLabel>
            {MONTH_NAMES[anchor.month - 1]} {anchor.year}
          </MonthLabel>
          <NavButton type="button" aria-label="Next month" onClick={() => onMonthShift(1)}>
            <ChevronRightIcon />
          </NavButton>
        </CalHeader>
        <Grid ref={onGridElement} onKeyDown={onGridKeyDown}>
          {WEEKDAYS.map((w) => (
            <Weekday key={w} aria-hidden="true">
              {w}
            </Weekday>
          ))}
          {cells.map((d) => {
            const iso = d.toString()
            const inMonth = d.month === anchor.month && d.year === anchor.year
            const isSelected = iso === valueIso
            return (
              <DayButton
                key={iso}
                type="button"
                data-date={iso}
                tabIndex={iso === focusIso ? 0 : -1}
                aria-label={dayLabel(d)}
                aria-pressed={isSelected}
                aria-current={iso === todayIso ? 'date' : undefined}
                disabled={outOfRange(iso, min, max)}
                $selected={isSelected}
                $today={iso === todayIso}
                $outside={!inMonth}
                // ⚠️ Trap 2 — without this, mousedown on a day steals focus out of the input
                // before the pick can put it back. Same trick our Combobox uses on its options.
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => onPickDay(d)}
              >
                {d.day}
              </DayButton>
            )
          })}
        </Grid>
      </Content>
    </Popover.Portal>
  )
}
