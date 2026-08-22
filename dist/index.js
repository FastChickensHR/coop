import * as e from "@radix-ui/react-accordion";
import { css as t, keyframes as n, styled as r } from "styled-components";
import * as i from "@radix-ui/react-avatar";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
import { CalendarDaysIcon as c, CheckIcon as l, ChevronDownIcon as u, ChevronLeftIcon as d, ChevronRightIcon as f, ChevronUpDownIcon as p, ChevronUpIcon as m, XMarkIcon as h } from "@heroicons/react/24/outline";
import { Fragment as g, createContext as _, forwardRef as v, useContext as y, useEffect as b, useId as x, useLayoutEffect as ee, useMemo as te, useRef as S, useState as C, useSyncExternalStore as w } from "react";
import * as T from "@radix-ui/react-checkbox";
import * as E from "@radix-ui/react-dialog";
import * as D from "@radix-ui/react-popover";
import { endOfMonth as O, endOfYear as k, fromDate as A, getDayOfWeek as ne, getLocalTimeZone as j, getWeeksInMonth as M, parseDate as re, startOfMonth as N, startOfYear as P, toCalendarDate as F, today as I } from "@internationalized/date";
import * as L from "@radix-ui/react-dropdown-menu";
import * as R from "@radix-ui/react-label";
import * as z from "@radix-ui/react-progress";
import * as B from "@radix-ui/react-radio-group";
import * as V from "@radix-ui/react-select";
import * as H from "@radix-ui/react-slider";
import * as U from "@radix-ui/react-tabs";
import * as W from "@radix-ui/react-toggle-group";
import * as G from "@radix-ui/react-tooltip";
//#region src/components/Accordion/index.tsx
var ie = e.Root, K = r(e.Item)`
  border-bottom: 1px solid ${({ theme: e }) => e.colors.border};

  &:first-child {
    border-top: 1px solid ${({ theme: e }) => e.colors.border};
  }
`, ae = r(e.Header)`
  margin: 0;
`, oe = r(e.Trigger)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme: e }) => e.spacing.md};
  width: 100%;
  padding: ${({ theme: e }) => e.spacing.lg} ${({ theme: e }) => e.spacing.md};
  background: none;
  border: none;
  cursor: pointer;
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.base};
  font-weight: ${({ theme: e }) => e.fontWeight.medium};
  color: ${({ theme: e }) => e.colors.ink};
  text-align: left;

  &:focus-visible {
    outline: 2px solid ${({ theme: e }) => e.colors.accent};
    outline-offset: -2px;
    border-radius: ${({ theme: e }) => e.borderRadius.sm};
  }

  /* CSS chevron — down, flips up when the item is open. */
  &::after {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    flex-shrink: 0;
    border-right: 2px solid ${({ theme: e }) => e.colors.muted};
    border-bottom: 2px solid ${({ theme: e }) => e.colors.muted};
    transform: rotate(45deg) translateY(-2px);
    transition: transform ${({ theme: e }) => e.motion.duration.base}
      ${({ theme: e }) => e.motion.easing.standard};
  }

  &[data-state='open']::after {
    transform: rotate(-135deg) translateY(-2px);
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      transition: none;
    }
  }
`, se = n`
  from { height: 0; }
  to { height: var(--radix-accordion-content-height); }
`, ce = n`
  from { height: var(--radix-accordion-content-height); }
  to { height: 0; }
`, le = r(e.Content)`
  overflow: hidden;
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.muted};
  line-height: ${({ theme: e }) => e.lineHeight.relaxed};

  &[data-state='open'] {
    animation: ${se} ${({ theme: e }) => e.motion.duration.base}
      ${({ theme: e }) => e.motion.easing.standard};
  }
  &[data-state='closed'] {
    animation: ${ce} ${({ theme: e }) => e.motion.duration.fast}
      ${({ theme: e }) => e.motion.easing.exit};
  }

  /* Inner padding so the animated height wraps the content cleanly. */
  & > * {
    padding: 0 ${({ theme: e }) => e.spacing.md} ${({ theme: e }) => e.spacing.lg};
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`, q = (...e) => {
	let t = new Set(e);
	return (e) => !t.has(e);
}, ue = {
	info: t`
    background-color: ${({ theme: e }) => e.colors.infoSoft};
    border-left-color: ${({ theme: e }) => e.colors.info};
    color: ${({ theme: e }) => e.colors.info};
  `,
	success: t`
    background-color: ${({ theme: e }) => e.colors.successSoft};
    border-left-color: ${({ theme: e }) => e.colors.success};
    color: ${({ theme: e }) => e.colors.success};
  `,
	warning: t`
    background-color: ${({ theme: e }) => e.colors.warningSoft};
    border-left-color: ${({ theme: e }) => e.colors.warning};
    color: ${({ theme: e }) => e.colors.warning};
  `,
	error: t`
    background-color: ${({ theme: e }) => e.colors.errorSoft};
    border-left-color: ${({ theme: e }) => e.colors.error};
    color: ${({ theme: e }) => e.colors.error};
  `
}, de = r.div.withConfig({ shouldForwardProp: q("variant") })`
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: ${({ theme: e }) => e.borderRadius.md};
  border-left: 3px solid;
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};

  ${({ variant: e = "info" }) => ue[e]}
`, fe = r.span`
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  padding-top: 1px;
  width: 1rem;
  height: 1rem;
`, pe = r.div`
  flex: 1;
  min-width: 0;
`, me = r.p`
  margin: 0 0 0.125rem;
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  font-size: ${({ theme: e }) => e.fontSize.sm};
`, he = r.p`
  margin: 0;
  font-size: ${({ theme: e }) => e.fontSize.sm};
  opacity: 0.9;
`, ge = {
	sm: "1.75rem",
	md: "2.25rem",
	lg: "3rem"
};
function _e(e) {
	let t = e.trim().split(/\s+/).filter(Boolean);
	return t.length === 0 ? "?" : t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
}
function ve({ name: e, src: t, size: n = "md", className: r }) {
	return /* @__PURE__ */ s(ye, {
		$size: n,
		className: r,
		children: [t && /* @__PURE__ */ o(be, {
			src: t,
			alt: e
		}), /* @__PURE__ */ o(xe, {
			delayMs: t ? 300 : 0,
			children: _e(e)
		})]
	});
}
var ye = r(i.Root)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size: e }) => ge[e]};
  height: ${({ $size: e }) => ge[e]};
  border-radius: ${({ theme: e }) => e.borderRadius.full};
  overflow: hidden;
  flex-shrink: 0;
  user-select: none;
  vertical-align: middle;
`, be = r(i.Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`, xe = r(i.Fallback)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme: e }) => e.colors.surface2};
  color: ${({ theme: e }) => e.colors.muted};
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: 0.7em;
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  letter-spacing: 0.02em;
`, Se = {
	active: t`
    background-color: ${({ theme: e }) => e.colors.successSoft};
    color: ${({ theme: e }) => e.colors.success};
    border: none;
  `,
	pending: t`
    background-color: ${({ theme: e }) => e.colors.warningSoft};
    color: ${({ theme: e }) => e.colors.warning};
    border: none;
  `,
	terminated: t`
    background-color: ${({ theme: e }) => e.colors.errorSoft};
    color: ${({ theme: e }) => e.colors.error};
    border: none;
  `,
	draft: t`
    background-color: ${({ theme: e }) => e.colors.surface2};
    color: ${({ theme: e }) => e.colors.muted};
    border: none;
  `
}, Ce = {
	inbound: t`
    background-color: transparent;
    color: ${({ theme: e }) => e.colors.info};
    border: 1px solid ${({ theme: e }) => e.colors.borderStrong};
  `,
	outbound: t`
    background-color: transparent;
    color: ${({ theme: e }) => e.colors.success};
    border: 1px solid ${({ theme: e }) => e.colors.borderStrong};
  `,
	default: t`
    background-color: transparent;
    color: ${({ theme: e }) => e.colors.muted};
    border: 1px solid ${({ theme: e }) => e.colors.borderStrong};
  `
}, we = {
	...Se,
	...Ce
}, Te = r.span.withConfig({ shouldForwardProp: q("variant") })`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  height: 28px;
  padding: 0 0.75rem;
  border-radius: ${({ theme: e }) => e.borderRadius.full};
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  font-weight: ${({ theme: e }) => e.fontWeight.medium};
  white-space: nowrap;

  ${({ variant: e = "default" }) => we[e]}
`;
//#endregion
//#region src/components/Breadcrumbs/index.tsx
function Ee({ items: e, className: t }) {
	return /* @__PURE__ */ o(De, {
		"aria-label": "Breadcrumb",
		className: t,
		children: /* @__PURE__ */ o(Oe, { children: e.map((t, n) => {
			let r = n === e.length - 1;
			return /* @__PURE__ */ s(g, { children: [/* @__PURE__ */ o("li", { children: t.href && !r ? /* @__PURE__ */ o(ke, {
				href: t.href,
				children: t.label
			}) : /* @__PURE__ */ o(Ae, {
				"aria-current": r ? "page" : void 0,
				children: t.label
			}) }), !r && /* @__PURE__ */ o(je, {
				"aria-hidden": "true",
				children: /* @__PURE__ */ o(f, {
					width: 14,
					height: 14
				})
			})] }, n);
		}) })
	});
}
var De = r.nav`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
`, Oe = r.ol`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme: e }) => e.spacing.xs};
  list-style: none;
  margin: 0;
  padding: 0;
`, ke = r.a`
  color: ${({ theme: e }) => e.colors.muted};
  text-decoration: none;

  &:hover {
    color: ${({ theme: e }) => e.colors.ink};
    text-decoration: underline;
  }
`, Ae = r.span`
  color: ${({ theme: e }) => e.colors.ink};
  font-weight: ${({ theme: e }) => e.fontWeight.medium};
`, je = r.span`
  display: inline-flex;
  color: ${({ theme: e }) => e.colors.subtle};
`, Me = {
	primary: t`
    background-color: ${({ theme: e }) => e.colors.ink900};
    color: ${({ theme: e }) => e.colors.brand50};
    border: 1px solid ${({ theme: e }) => e.colors.brand50};
    &:hover:not(:disabled) {
      background-color: ${({ theme: e }) => e.colors.brand50};
      color: ${({ theme: e }) => e.colors.ink900};
    }
  `,
	secondary: t`
    background-color: ${({ theme: e }) => e.colors.canvas};
    color: ${({ theme: e }) => e.colors.ink};
    border: 1px solid ${({ theme: e }) => e.colors.borderStrong};
    &:hover:not(:disabled) { background-color: ${({ theme: e }) => e.colors.surface}; }
  `,
	danger: t`
    background-color: transparent;
    color: ${({ theme: e }) => e.colors.brand};
    border: 1px solid ${({ theme: e }) => e.colors.brand};
    &:hover:not(:disabled) { background-color: ${({ theme: e }) => e.colors.brandSoft}; }
  `,
	ghost: t`
    background-color: transparent;
    color: ${({ theme: e }) => e.colors.ink};
    border: 1px solid transparent;
    &:hover:not(:disabled) { background-color: ${({ theme: e }) => e.colors.surface2}; }
  `
}, Ne = {
	sm: t`
    height: 34px;
    padding: 0 0.75rem;
    font-size: ${({ theme: e }) => e.fontSize.xs};
  `,
	md: t`
    height: 44px;
    padding: 0 1.25rem;
    font-size: ${({ theme: e }) => e.fontSize.base};
  `,
	lg: t`
    height: 54px;
    padding: 0 1.5rem;
    font-size: ${({ theme: e }) => e.fontSize.lg};
  `
}, Pe = r.button.withConfig({ shouldForwardProp: q("variant", "size") })`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: ${({ theme: e }) => e.borderRadius.md};
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-weight: ${({ theme: e }) => e.fontWeight.bold};
  cursor: pointer;
  transition: background-color ${({ theme: e }) => e.motion.duration.fast}
      ${({ theme: e }) => e.motion.easing.standard},
    opacity ${({ theme: e }) => e.motion.duration.fast} ${({ theme: e }) => e.motion.easing.standard};
  white-space: nowrap;
  box-shadow: ${({ theme: e }) => e.boxShadow.card};

  ${({ variant: e = "primary" }) => Me[e]}
  ${({ size: e = "md" }) => Ne[e]}

  &:focus-visible {
    outline: 2px solid ${({ theme: e }) => e.colors.brand};
    outline-offset: 2px;
  }

  &:disabled {
    background-color: ${({ theme: e }) => e.colors.surface2};
    color: ${({ theme: e }) => e.colors.subtle};
    border-color: transparent;
    cursor: not-allowed;
    box-shadow: none;
  }
`, Fe = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.display};
  font-style: italic;
  font-weight: ${({ theme: e }) => e.fontWeight.black};
  font-size: ${({ theme: e }) => e.fontSize["5xl"]};
  line-height: ${({ theme: e }) => e.lineHeight.flat};
  letter-spacing: ${({ theme: e }) => e.letterSpacing.tight};
`, Ie = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.display};
  font-weight: ${({ theme: e }) => e.fontWeight.extrabold};
  font-size: ${({ theme: e }) => e.fontSize["4xl"]};
  line-height: ${({ theme: e }) => e.lineHeight.snugTight};
`, Le = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.display};
  font-weight: ${({ theme: e }) => e.fontWeight.bold};
  font-size: ${({ theme: e }) => e.fontSize["2xl"]};
  line-height: ${({ theme: e }) => e.lineHeight.tight};
`, Re = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  line-height: ${({ theme: e }) => e.lineHeight.snug};
`, ze = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-weight: ${({ theme: e }) => e.fontWeight.normal};
  font-size: ${({ theme: e }) => e.fontSize.lg};
  line-height: ${({ theme: e }) => e.lineHeight.relaxed};
`, Be = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-weight: ${({ theme: e }) => e.fontWeight.normal};
  font-size: ${({ theme: e }) => e.fontSize.base};
  line-height: ${({ theme: e }) => e.lineHeight.relaxed};
`, Ve = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-weight: ${({ theme: e }) => e.fontWeight.normal};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  line-height: ${({ theme: e }) => e.lineHeight.normal};
`, He = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-weight: ${({ theme: e }) => e.fontWeight.normal};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  line-height: ${({ theme: e }) => e.lineHeight.normal};
`, Ue = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.mono};
  font-weight: ${({ theme: e }) => e.fontWeight.medium};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  line-height: ${({ theme: e }) => e.lineHeight.normal};
  letter-spacing: ${({ theme: e }) => e.letterSpacing.wide};
`, We = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.mono};
  font-weight: ${({ theme: e }) => e.fontWeight.normal};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  line-height: ${({ theme: e }) => e.lineHeight.normal};
`, Ge = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.display};
  font-weight: ${({ theme: e }) => e.fontWeight.bold};
  font-size: ${({ theme: e }) => e.fontSize["2xl"]};
`, Ke = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.display};
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  font-size: ${({ theme: e }) => e.fontSize.lg};
`, qe = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.display};
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  font-size: ${({ theme: e }) => e.fontSize.base};
`, Je = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.mono};
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  letter-spacing: 0.05em;
`, Ye = r.div.withConfig({ shouldForwardProp: q("interactive") })`
  background-color: ${({ theme: e }) => e.colors.canvas};
  border: 1px solid ${({ theme: e }) => e.colors.border};
  border-radius: ${({ theme: e }) => e.borderRadius.lg};
  box-shadow: ${({ theme: e }) => e.boxShadow.card};
  overflow: hidden;

  ${({ theme: e, interactive: t }) => t && `
    cursor: pointer;
    transition: border-color ${e.motion.duration.fast} ${e.motion.easing.standard},
      box-shadow ${e.motion.duration.fast} ${e.motion.easing.standard};
    &:hover {
      border-color: ${e.colors.borderStrong};
      box-shadow: ${e.boxShadow.pop};
    }
  `}
`, Xe = r.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme: e }) => e.spacing.lg};
  padding: ${({ theme: e }) => e.spacing.lg} ${({ theme: e }) => e.spacing.xl};
  border-bottom: 1px solid ${({ theme: e }) => e.colors.border};
`, Ze = r.h3`
  ${qe}
  color: ${({ theme: e }) => e.colors.ink};
  margin: 0;
`, Qe = r.div`
  display: flex;
  align-items: center;
  gap: ${({ theme: e }) => e.spacing.sm};
  flex-shrink: 0;
`, $e = r.div`
  padding: ${({ theme: e }) => e.spacing.xl};
`, et = r.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme: e }) => e.spacing.md};
  padding: ${({ theme: e }) => e.spacing.lg} ${({ theme: e }) => e.spacing.xl};
  border-top: 1px solid ${({ theme: e }) => e.colors.border};
  background-color: ${({ theme: e }) => e.colors.surface};
`, tt = {
	error: "errorSoft",
	warning: "warningSoft",
	success: "successSoft"
}, nt = _(null);
function J() {
	let e = y(nt);
	if (!e) return {
		fieldProps: {},
		hasError: !1
	};
	let t = [e.descriptionId, e.status ? e.statusId : void 0].filter(Boolean).join(" ");
	return {
		fieldProps: {
			id: e.controlId,
			"aria-describedby": t || void 0,
			"aria-invalid": e.status === "error" || void 0,
			"aria-required": e.required || void 0
		},
		status: e.status,
		hasError: e.status === "error"
	};
}
//#endregion
//#region src/components/Checkbox/index.tsx
var rt = r.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: ${({ $disabled: e }) => e ? "not-allowed" : "pointer"};
`, it = r(T.Root)`
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 1px solid ${({ theme: e }) => e.colors.borderStrong};
  border-radius: ${({ theme: e }) => e.borderRadius.sm};
  background: ${({ theme: e }) => e.colors.canvas};
  cursor: inherit;
  transition: background 120ms ease, border-color 120ms ease;

  &[data-state='checked'],
  &[data-state='indeterminate'] {
    background: ${({ theme: e }) => e.colors.accent};
    border-color: ${({ theme: e }) => e.colors.accent};
  }
  &[data-disabled] {
    opacity: 0.5;
  }
  &:focus-visible {
    outline: 2px solid ${({ theme: e }) => e.colors.accent};
    outline-offset: 2px;
  }
`, at = r(T.Indicator)`
  display: inline-flex;
  /* The checkmark sits on the accent-filled box, so it must stay light in BOTH
     themes. canvas flips to near-black in dark mode (a near-invisible check on
     the blue box); onFill is fixed light. (ADR-0228) */
  color: ${({ theme: e }) => e.colors.onFill};
  svg {
    width: 14px;
    height: 14px;
    stroke-width: 3;
  }
`, ot = r.label`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.ink};
  cursor: inherit;
`;
function st({ checked: e, onCheckedChange: t, disabled: n, id: r, children: i, className: a, ...c }) {
	let { fieldProps: u } = J(), d = x(), f = r ?? u.id ?? `checkbox-${d}`;
	return /* @__PURE__ */ s(rt, {
		$disabled: n,
		className: a,
		children: [/* @__PURE__ */ o(it, {
			id: f,
			checked: e,
			onCheckedChange: (e) => t?.(e === !0),
			disabled: n,
			"aria-label": c["aria-label"],
			"aria-describedby": u["aria-describedby"],
			"aria-invalid": u["aria-invalid"],
			"aria-required": u["aria-required"],
			children: /* @__PURE__ */ o(at, { children: /* @__PURE__ */ o(l, {}) })
		}), i != null && /* @__PURE__ */ o(ot, {
			htmlFor: f,
			children: i
		})]
	});
}
//#endregion
//#region src/components/Chip/index.tsx
function ct({ children: e, onRemove: t, removeLabel: n = "Remove", className: r }) {
	return /* @__PURE__ */ s(lt, {
		className: r,
		children: [/* @__PURE__ */ o(ut, { children: e }), t && /* @__PURE__ */ o(dt, {
			type: "button",
			"aria-label": n,
			onClick: t,
			children: /* @__PURE__ */ o(h, {
				width: 14,
				height: 14
			})
		})]
	});
}
var lt = r.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme: e }) => e.spacing.xs};
  height: 1.5rem;
  padding: 0 ${({ theme: e }) => e.spacing.xs} 0 ${({ theme: e }) => e.spacing.sm};
  border-radius: ${({ theme: e }) => e.borderRadius.full};
  background-color: ${({ theme: e }) => e.colors.surface2};
  color: ${({ theme: e }) => e.colors.ink};
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  font-weight: ${({ theme: e }) => e.fontWeight.medium};
  max-width: 100%;
`, ut = r.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 0.125rem;
`, dt = r.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  padding: 0;
  border: none;
  border-radius: ${({ theme: e }) => e.borderRadius.full};
  background: none;
  color: ${({ theme: e }) => e.colors.muted};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme: e }) => e.colors.border};
    color: ${({ theme: e }) => e.colors.ink};
  }
  &:focus-visible {
    outline: 2px solid ${({ theme: e }) => e.colors.accent};
    outline-offset: 1px;
  }
`, Y = (e, n = "&:focus") => t`
  ${e && t`
    border-color: ${({ theme: t }) => t.colors[e]};
    box-shadow: 0 0 0 3px ${({ theme: t }) => t.colors[tt[e]]};
  `}

  ${n} {
    border-color: ${({ theme: e }) => e.colors.accent};
    box-shadow: 0 0 0 3px ${({ theme: e }) => e.colors.accentSoft};
  }
`, ft = t`
  width: 100%;
  height: 44px;
  padding: 0 0.875rem;
  border: 1px solid ${({ theme: e }) => e.colors.borderStrong};
  border-radius: ${({ theme: e }) => e.borderRadius.md};
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.base};
  color: ${({ theme: e }) => e.colors.ink};
  background-color: ${({ theme: e }) => e.colors.canvas};
  outline: none;
  box-sizing: border-box;
  transition:
    border-color ${({ theme: e }) => e.motion.duration.fast} ${({ theme: e }) => e.motion.easing.standard},
    box-shadow ${({ theme: e }) => e.motion.duration.fast} ${({ theme: e }) => e.motion.easing.standard};

  &:disabled {
    background-color: ${({ theme: e }) => e.colors.surface2};
    color: ${({ theme: e }) => e.colors.subtle};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${({ theme: e }) => e.colors.subtle};
  }
`;
//#endregion
//#region src/components/Combobox/index.tsx
function pt({ options: e, value: t, onValueChange: n, multiple: r, values: i, onValuesChange: a, onSearch: c, loading: u, debounceMs: d = 250, creatable: f, onCreate: m, placeholder: h = "Search…", disabled: g, hasError: _, id: v, className: y, "aria-label": ee }) {
	let { fieldProps: w, status: T } = J(), E = _ ? "error" : T, [D, O] = C(!1), [k, A] = C(""), [ne, j] = C(0), M = S(null), re = S(null), N = S(null), P = !!c, F = i ?? [], I = (e) => r ? F.includes(e) : e === t, L = (t) => e.find((e) => e.value === t)?.label ?? t, R = r ? F.map((e) => ({
		value: e,
		label: L(e)
	})) : [], z = te(() => {
		if (P) return e;
		let t = k.trim().toLowerCase();
		return t ? e.filter((e) => e.label.toLowerCase().includes(t)) : e;
	}, [
		e,
		k,
		P
	]), B = k.trim(), V = !!f && B !== "" && !z.some((e) => e.label.toLowerCase() === B.toLowerCase() || e.value.toLowerCase() === B.toLowerCase()), H = z.length, U = z.length + +!!V, W = U ? Math.min(ne, U - 1) : 0, G = x(), ie = `${G}-listbox`, K = (e) => `${G}-option-${e}`;
	b(() => {
		if (!D) return;
		function e(e) {
			M.current && !M.current.contains(e.target) && O(!1);
		}
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [D]), b(() => {
		re.current?.querySelector(`[data-index="${W}"]`)?.scrollIntoView({ block: "nearest" });
	}, [W, D]);
	let ae = S(c);
	b(() => {
		ae.current = c;
	}), b(() => {
		if (!P || !D) return;
		let e = setTimeout(() => ae.current?.(k), d);
		return () => clearTimeout(e);
	}, [
		k,
		D,
		P,
		d
	]);
	function oe(e) {
		if (e) {
			if (r) {
				let t = F.includes(e.value) ? F.filter((t) => t !== e.value) : [...F, e.value];
				a?.(t), A(""), j(0), O(!0), N.current?.focus();
			} else n?.(e.value), A(""), O(!1);
		}
	}
	function se(e) {
		a?.(F.filter((t) => t !== e));
	}
	function ce(e) {
		let t = e.trim();
		t && (m?.(t), r ? (F.includes(t) || a?.([...F, t]), A(""), j(0), O(!0), N.current?.focus()) : (n?.(t), A(""), O(!1)));
	}
	function le(e) {
		e.key === "ArrowDown" ? (e.preventDefault(), D ? j((e) => Math.min(e + 1, U - 1)) : O(!0)) : e.key === "ArrowUp" ? (e.preventDefault(), j((e) => Math.max(e - 1, 0))) : e.key === "Enter" ? D && (e.preventDefault(), V && W === H ? ce(B) : oe(z[W])) : e.key === "Backspace" ? r && k === "" && F.length > 0 && se(F[F.length - 1]) : e.key === "Escape" && O(!1);
	}
	let q = D ? k : t ? L(t) : "";
	return /* @__PURE__ */ s(mt, {
		ref: M,
		className: y,
		children: [
			r ? /* @__PURE__ */ s(gt, {
				$status: E,
				"data-disabled": g || void 0,
				onMouseDown: (e) => {
					e.target === e.currentTarget && (e.preventDefault(), N.current?.focus());
				},
				children: [R.map((e) => /* @__PURE__ */ o(ct, {
					onRemove: g ? void 0 : () => se(e.value),
					children: e.label
				}, e.value)), /* @__PURE__ */ o(_t, {
					ref: N,
					id: v ?? w.id,
					role: "combobox",
					"aria-expanded": D,
					"aria-controls": D ? ie : void 0,
					"aria-activedescendant": D && U ? K(W) : void 0,
					"aria-label": ee,
					"aria-describedby": w["aria-describedby"],
					"aria-required": w["aria-required"],
					"aria-invalid": E === "error" || void 0,
					disabled: g,
					placeholder: R.length === 0 ? h : "",
					value: k,
					onFocus: () => O(!0),
					onChange: (e) => {
						A(e.target.value), j(0), O(!0);
					},
					onKeyDown: le
				})]
			}) : /* @__PURE__ */ o(ht, {
				ref: N,
				id: v ?? w.id,
				role: "combobox",
				"aria-expanded": D,
				"aria-controls": D ? ie : void 0,
				"aria-activedescendant": D && z.length ? K(W) : void 0,
				"aria-label": ee,
				"aria-describedby": w["aria-describedby"],
				"aria-required": w["aria-required"],
				"aria-invalid": E === "error" || void 0,
				$status: E,
				disabled: g,
				placeholder: t && !D ? L(t) : h,
				value: q,
				onFocus: () => O(!0),
				onChange: (e) => {
					A(e.target.value), j(0), O(!0);
				},
				onKeyDown: le
			}),
			/* @__PURE__ */ o(vt, {
				"aria-hidden": "true",
				children: /* @__PURE__ */ o(p, {
					width: 18,
					height: 18
				})
			}),
			D && /* @__PURE__ */ s(yt, {
				id: ie,
				ref: re,
				role: "listbox",
				"aria-multiselectable": r || void 0,
				children: [
					u && /* @__PURE__ */ o(St, {
						"aria-live": "polite",
						children: "Searching…"
					}),
					!u && z.length === 0 && !V && /* @__PURE__ */ o(xt, { children: "No matches" }),
					z.map((e, t) => /* @__PURE__ */ s(bt, {
						id: K(t),
						"data-index": t,
						role: "option",
						"aria-selected": I(e.value),
						$active: t === W,
						onMouseEnter: () => j(t),
						onMouseDown: (t) => {
							t.preventDefault(), oe(e);
						},
						children: [/* @__PURE__ */ o("span", { children: e.label }), I(e.value) && /* @__PURE__ */ o(l, {
							width: 16,
							height: 16
						})]
					}, e.value)),
					V && /* @__PURE__ */ o(bt, {
						id: K(H),
						"data-index": H,
						role: "option",
						"aria-selected": !1,
						$active: W === H,
						onMouseEnter: () => j(H),
						onMouseDown: (e) => {
							e.preventDefault(), ce(B);
						},
						children: /* @__PURE__ */ s(Ct, { children: [
							"Create “",
							/* @__PURE__ */ o("strong", { children: B }),
							"”"
						] })
					})
				]
			})
		]
	});
}
var mt = r.div`
  position: relative;
  width: 100%;
`, ht = r.input`
  ${ft}
  padding-right: 2.5rem;

  ${({ $status: e }) => Y(e)}
`, gt = r.div`
  ${ft}
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme: e }) => e.spacing.xs};
  height: auto;
  min-height: 44px;
  padding: 0.3rem 2.5rem 0.3rem 0.5rem;
  cursor: text;

  /* A wrapper div never :focuses — the ring keys off the inner input (#1217; this used to be
     a hand-inlined, slightly drifted copy of controlStatusStyles). */
  ${({ $status: e }) => Y(e, "&:focus-within")}

  &[data-disabled] {
    background-color: ${({ theme: e }) => e.colors.surface2};
    cursor: not-allowed;
  }
`, _t = r.input`
  flex: 1 1 4rem;
  min-width: 4rem;
  height: 30px;
  padding: 0 0.25rem;
  border: none;
  outline: none;
  background: transparent;
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.base};
  color: ${({ theme: e }) => e.colors.ink};

  &::placeholder {
    color: ${({ theme: e }) => e.colors.subtle};
  }
  &:disabled {
    cursor: not-allowed;
  }
`, vt = r.span`
  position: absolute;
  top: 0;
  right: 0;
  height: 44px;
  width: 2.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme: e }) => e.colors.muted};
  pointer-events: none;
`, yt = r.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: 50;
  max-height: 15rem;
  overflow-y: auto;
  margin: 0;
  padding: ${({ theme: e }) => e.spacing.xs};
  list-style: none;
  background-color: ${({ theme: e }) => e.colors.canvas};
  border: 1px solid ${({ theme: e }) => e.colors.border};
  border-radius: ${({ theme: e }) => e.borderRadius.md};
  box-shadow: ${({ theme: e }) => e.boxShadow.pop};
`, bt = r.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme: e }) => e.spacing.sm};
  padding: ${({ theme: e }) => e.spacing.sm} ${({ theme: e }) => e.spacing.md};
  border-radius: ${({ theme: e }) => e.borderRadius.sm};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.ink};
  cursor: pointer;
  background-color: ${({ theme: e, $active: t }) => t ? e.colors.surface2 : "transparent"};

  svg {
    color: ${({ theme: e }) => e.colors.accent};
    flex-shrink: 0;
  }
`, xt = r.li`
  padding: ${({ theme: e }) => e.spacing.md};
  text-align: center;
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.muted};
`, St = r.li`
  padding: ${({ theme: e }) => e.spacing.md};
  text-align: center;
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.muted};
`, Ct = r.span`
  color: ${({ theme: e }) => e.colors.muted};

  strong {
    color: ${({ theme: e }) => e.colors.ink};
    font-weight: ${({ theme: e }) => e.fontWeight.medium};
  }
`, wt = r.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme: e }) => e.spacing.xs};
  min-width: 0;
`, Tt = r(E.Title)`
  font-family: ${({ theme: e }) => e.typography.fontFamily.display};
  font-size: ${({ theme: e }) => e.fontSize.lg};
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  color: ${({ theme: e }) => e.colors.ink};
  margin: 0;
`, Et = r(E.Description)`
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.muted};
  margin: 0;
`, Dt = r.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: none;
  border: none;
  border-radius: ${({ theme: e }) => e.borderRadius.md};
  color: ${({ theme: e }) => e.colors.muted};
  cursor: pointer;
  flex-shrink: 0;
  transition: background-color ${({ theme: e }) => e.motion.duration.fast} ${({ theme: e }) => e.motion.easing.standard};

  &:hover {
    background-color: ${({ theme: e }) => e.colors.surface2};
    color: ${({ theme: e }) => e.colors.ink};
  }
`;
//#endregion
//#region src/components/Modal/index.tsx
function Ot({ open: e, onOpenChange: t, title: n, description: r, children: i, footer: a, width: c }) {
	return /* @__PURE__ */ o(E.Root, {
		open: e,
		onOpenChange: t,
		children: /* @__PURE__ */ s(E.Portal, { children: [/* @__PURE__ */ o(jt, {}), /* @__PURE__ */ s(Mt, {
			style: c ? { maxWidth: c } : void 0,
			children: [
				/* @__PURE__ */ s(Nt, { children: [/* @__PURE__ */ s(wt, { children: [/* @__PURE__ */ o(Tt, { children: n }), r ? /* @__PURE__ */ o(Et, { children: r }) : /* @__PURE__ */ o(E.Description, {
					"aria-hidden": !0,
					style: { display: "none" }
				})] }), /* @__PURE__ */ o(E.Close, {
					asChild: !0,
					children: /* @__PURE__ */ o(Dt, {
						"aria-label": "Close",
						children: /* @__PURE__ */ o(h, {
							width: 20,
							height: 20
						})
					})
				})] }),
				/* @__PURE__ */ o(Pt, { children: i }),
				a && /* @__PURE__ */ o(Ft, { children: a })
			]
		})] })
	});
}
var kt = n`from { opacity: 0; } to { opacity: 1; }`, At = n`
  from { opacity: 0; transform: translate(-50%, -48%) scale(0.98); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`, jt = r(E.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.45);
  animation: ${kt} ${({ theme: e }) => e.motion.duration.base} ${({ theme: e }) => e.motion.easing.enter};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`, Mt = r(E.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100vw - 2rem);
  max-width: 32rem;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme: e }) => e.colors.canvas};
  border: 1px solid ${({ theme: e }) => e.colors.border};
  border-radius: ${({ theme: e }) => e.borderRadius.lg};
  box-shadow: ${({ theme: e }) => e.boxShadow.pop};
  z-index: 51;
  animation: ${At} ${({ theme: e }) => e.motion.duration.base} ${({ theme: e }) => e.motion.easing.enter};

  &:focus {
    outline: none;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`, Nt = r.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme: e }) => e.spacing.lg};
  padding: ${({ theme: e }) => e.spacing.xl} ${({ theme: e }) => e.spacing.xl} ${({ theme: e }) => e.spacing.lg};
  flex-shrink: 0;
`, Pt = r.div`
  padding: 0 ${({ theme: e }) => e.spacing.xl};
  overflow-y: auto;
`, Ft = r.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme: e }) => e.spacing.md};
  padding: ${({ theme: e }) => e.spacing.xl};
  flex-shrink: 0;
`;
//#endregion
//#region src/components/ConfirmDialog/index.tsx
function It({ open: e, onOpenChange: t, title: n, description: r, children: i, confirmLabel: c = "Confirm", cancelLabel: l = "Cancel", confirmVariant: u = "primary", pending: d = !1, onConfirm: f }) {
	return /* @__PURE__ */ o(Ot, {
		open: e,
		onOpenChange: t,
		title: n,
		description: r,
		width: "26rem",
		footer: /* @__PURE__ */ s(a, { children: [/* @__PURE__ */ o(Pe, {
			type: "button",
			variant: "secondary",
			size: "sm",
			disabled: d,
			onClick: () => t(!1),
			children: l
		}), /* @__PURE__ */ o(Pe, {
			type: "button",
			variant: u,
			size: "sm",
			disabled: d,
			onClick: f,
			children: c
		})] }),
		children: i
	});
}
//#endregion
//#region src/lib/date.ts
var Lt = /^\d{4}-\d{2}-\d{2}$/;
function X(e) {
	if (!e || !Lt.test(e)) return null;
	try {
		return re(e);
	} catch {
		return null;
	}
}
function Rt(e) {
	return e ? e.toString() : null;
}
function Z() {
	return I(j());
}
function zt(e) {
	return I(e);
}
function Bt() {
	return Z().toString();
}
function Q(e, t, n) {
	return !!t && e < t || !!n && e > n;
}
var Vt = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/, Ht = /^(\d{4})(\d{2})(\d{2})$/;
function Ut(e) {
	let t = e.trim();
	if (!t) return null;
	if (Lt.test(t)) return X(t);
	let n = Ht.exec(t);
	if (n) {
		let [, e, t, r] = n;
		return X(`${e}-${t}-${r}`);
	}
	let r = Vt.exec(t);
	if (r) {
		let [, e, t, n] = r;
		return X(`${n}-${e.padStart(2, "0")}-${t.padStart(2, "0")}`);
	}
	return null;
}
var Wt = "Always", Gt = "Ongoing", Kt = "Anytime", qt = new Intl.DateTimeFormat("en-US", {
	month: "short",
	day: "numeric",
	year: "numeric",
	timeZone: "UTC"
});
function Jt(e, t = "—") {
	return e && X(e) ? e : t;
}
function Yt(e) {
	if (!e || Lt.test(e)) return null;
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? null : F(A(t, j()));
}
function Xt(e, t = "—") {
	let n = Yt(e);
	return n ? qt.format(new Date(Date.UTC(n.year, n.month - 1, n.day))) : t;
}
function Zt(e, t, n = "—") {
	if (!e) return n;
	let r = new Date(e);
	return Number.isNaN(r.getTime()) ? n : new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		...t?.timeZoneName ? { timeZoneName: "short" } : {}
	}).format(r);
}
//#endregion
//#region src/lib/quickPicks.ts
var Qt = {
	start: [
		{
			token: "today",
			label: "Today"
		},
		{
			token: "month",
			label: "1st of next month"
		},
		{
			token: "year",
			label: "1st of next year"
		}
	],
	end: [
		{
			token: "month",
			label: "End of this month"
		},
		{
			token: "year",
			label: "End of this year"
		},
		{
			token: "ongoing",
			label: "Ongoing"
		}
	]
};
function $t(e, t = "start") {
	let n = Z();
	switch (e) {
		case "today": return n.toString();
		case "ongoing": return null;
		case "month": return (t === "start" ? N(n.add({ months: 1 })) : O(n)).toString();
		case "year": return (t === "start" ? P(n.add({ years: 1 })) : k(n)).toString();
	}
}
function en(e, t, n) {
	return {
		token: e,
		label: t,
		markIndex: t.toLowerCase().indexOf(e),
		accessibleName: `${t}, type ${e[0]}`,
		value: $t(e, n)
	};
}
function tn({ edge: e = "start", allowOpenEnded: t, min: n, max: r } = {}) {
	return Qt[e].filter(({ token: e }) => e !== "ongoing" || t).map(({ token: t, label: n }) => en(t, n, e)).filter((e) => e.value === null || !Q(e.value, n, r));
}
function nn(e, t = {}) {
	let n = e.trim().toLowerCase();
	if (!n) return { kind: "none" };
	let { edge: r = "start", allowOpenEnded: i, min: a, max: o } = t, s = Qt[r].find(({ token: e }) => e.startsWith(n) && (e !== "ongoing" || i));
	if (!s) return { kind: "none" };
	let c = en(s.token, s.label, r);
	return c.value !== null && Q(c.value, a, o) ? {
		kind: "outOfRange",
		pick: c
	} : {
		kind: "match",
		pick: c
	};
}
var rn = [
	{
		period: "thisMonth",
		label: "This month"
	},
	{
		period: "nextMonth",
		label: "Next month"
	},
	{
		period: "thisYear",
		label: "This year"
	},
	{
		period: "nextYear",
		label: "Next year"
	}
];
function an(e) {
	let t = Z(), n = e === "nextMonth" ? t.add({ months: 1 }) : e === "nextYear" ? t.add({ years: 1 }) : t, [r, i] = e === "thisMonth" || e === "nextMonth" ? [N(n), O(n)] : [P(n), k(n)];
	return {
		start: r.toString(),
		end: i.toString()
	};
}
function on({ min: e, max: t } = {}) {
	return rn.map(({ period: e, label: t }) => ({
		period: e,
		label: t,
		...an(e)
	})).filter(({ start: n, end: r }) => !Q(n, e, t) && !Q(r, e, t));
}
//#endregion
//#region src/components/DatePicker/model.ts
var sn = "en-US", cn = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
], ln = [
	"Su",
	"Mo",
	"Tu",
	"We",
	"Th",
	"Fr",
	"Sa"
];
function un(e) {
	let t = N(e), n = ne(t, sn), r = t.subtract({ days: n }), i = M(e, sn);
	return Array.from({ length: i * 7 }, (e, t) => r.add({ days: t }));
}
function dn(e) {
	let [t, n, r] = e.split("-");
	return `${e}, ${t}${n}${r}, or ${n}/${r}/${t}`;
}
function fn(e) {
	return `${cn[e.month - 1]} ${e.day}, ${e.year}`;
}
function pn(e, t) {
	let n = e.trim();
	if (!n) return { kind: "empty" };
	let r = Rt(Ut(n));
	if (r && !Q(r, t.min, t.max)) return {
		kind: "date",
		iso: r
	};
	let i = nn(n, t);
	return i.kind === "match" ? {
		kind: "pick",
		value: i.pick.value
	} : { kind: "invalid" };
}
function mn(e, t) {
	switch (e) {
		case "ArrowLeft": return t.subtract({ days: 1 });
		case "ArrowRight": return t.add({ days: 1 });
		case "ArrowUp": return t.subtract({ weeks: 1 });
		case "ArrowDown": return t.add({ weeks: 1 });
		case "PageUp": return t.subtract({ months: 1 });
		case "PageDown": return t.add({ months: 1 });
		case "Home": return N(t);
		default: return null;
	}
}
//#endregion
//#region src/components/DatePicker/styles.ts
var hn = r.div`
  position: relative;
  width: 100%;
`, gn = r.input`
  ${ft}
  padding-right: 2.75rem;
  color: ${({ theme: e, $openEnded: t }) => t ? e.colors.muted : e.colors.ink};
  font-style: ${({ $openEnded: e }) => e ? "italic" : "normal"};

  ${({ $status: e }) => Y(e)}
`, _n = r.button`
  position: absolute;
  top: 0;
  right: 0;
  height: 44px;
  width: 2.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: ${({ theme: e }) => e.colors.muted};
  cursor: pointer;

  &:hover:not(:disabled) {
    color: ${({ theme: e }) => e.colors.ink};
  }
  &:disabled {
    cursor: not-allowed;
    color: ${({ theme: e }) => e.colors.subtle};
  }
  svg { width: 1.15rem; height: 1.15rem; }
`, vn = r(D.Content)`
  background-color: ${({ theme: e }) => e.colors.canvas};
  border: 1px solid ${({ theme: e }) => e.colors.border};
  border-radius: ${({ theme: e }) => e.borderRadius.md};
  box-shadow: ${({ theme: e }) => e.boxShadow.pop};
  padding: 1rem;
  z-index: 50;
`, yn = r.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`, bn = r.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid ${({ theme: e }) => e.colors.border};
  border-radius: ${({ theme: e }) => e.borderRadius.sm};
  background: none;
  color: ${({ theme: e }) => e.colors.muted};
  cursor: pointer;

  &:hover { background-color: ${({ theme: e }) => e.colors.surface2}; color: ${({ theme: e }) => e.colors.ink}; }
  svg { width: 17px; height: 17px; }
`, xn = r.span`
  font-family: ${({ theme: e }) => e.typography.fontFamily.display};
  font-size: ${({ theme: e }) => e.fontSize.base};
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  color: ${({ theme: e }) => e.colors.ink};
`, Sn = r.div`
  display: grid;
  grid-template-columns: repeat(7, 2.5rem);
`, Cn = r.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  font-family: ${({ theme: e }) => e.typography.fontFamily.mono};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  color: ${({ theme: e }) => e.colors.muted};
`, wn = r.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.base};
  font-weight: ${({ theme: e, $today: t }) => t ? e.fontWeight.bold : e.fontWeight.normal};
  color: ${({ theme: e, $selected: t, $outside: n }) => t ? e.colors.canvas : n ? e.colors.subtle : e.colors.ink};
  background-color: ${({ theme: e, $selected: t }) => t ? e.colors.accent : "transparent"};
  transition: background-color 100ms ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme: e, $selected: t }) => t ? e.colors.accent : e.colors.surface2};
  }
  &:focus-visible {
    outline: 2px solid ${({ theme: e }) => e.colors.accent};
    outline-offset: 1px;
  }
  &:disabled {
    color: ${({ theme: e }) => e.colors.subtle};
    cursor: not-allowed;
    opacity: 0.5;
  }
`, Tn = r.p`
  margin: 0.375rem 0 0;
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  color: ${({ theme: e }) => e.colors.error};
`, En = r.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${({ theme: e }) => e.colors.border};
`, Dn = r.button`
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.4rem 0.5rem;
  border: none;
  border-radius: ${({ theme: e }) => e.borderRadius.sm};
  background: none;
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.ink};
  cursor: pointer;

  &:hover { background-color: ${({ theme: e }) => e.colors.surface2}; }
  &:focus-visible {
    outline: 2px solid ${({ theme: e }) => e.colors.accent};
    outline-offset: -2px;
  }
`, On = r.span`
  display: inline;
`, kn = r.span`
  font-weight: ${({ theme: e }) => e.fontWeight.bold};
  text-decoration: underline dotted;
  text-underline-offset: 2px;
`;
//#endregion
//#region src/components/DatePicker/CalendarPopover.tsx
function An({ calendarId: e, picks: t, anchor: n, cells: r, valueIso: i, todayIso: a, focusIso: c, min: l, max: u, inGrid: p, inputRef: m, onMonthShift: h, onPressQuickPick: g, onPickDay: _, onGridKeyDown: v, onGridElement: y, onEscapeFromGrid: b }) {
	return /* @__PURE__ */ o(D.Portal, { children: /* @__PURE__ */ s(vn, {
		id: e,
		align: "start",
		sideOffset: 4,
		collisionPadding: 8,
		role: "dialog",
		"aria-label": "Choose date",
		onOpenAutoFocus: (e) => e.preventDefault(),
		onCloseAutoFocus: (e) => e.preventDefault(),
		onFocusOutside: (e) => e.preventDefault(),
		onPointerDownOutside: (e) => {
			e.target === m.current && e.preventDefault();
		},
		onEscapeKeyDown: () => {
			p && b();
		},
		children: [
			t.length > 0 && /* @__PURE__ */ o(En, { children: t.map((e) => /* @__PURE__ */ o(Dn, {
				type: "button",
				"aria-label": e.accessibleName,
				onMouseDown: (e) => e.preventDefault(),
				onClick: () => g(e),
				children: /* @__PURE__ */ s(On, { children: [
					e.label.slice(0, e.markIndex),
					/* @__PURE__ */ o(kn, { children: e.label[e.markIndex] }),
					e.label.slice(e.markIndex + 1)
				] })
			}, e.token)) }),
			/* @__PURE__ */ s(yn, { children: [
				/* @__PURE__ */ o(bn, {
					type: "button",
					"aria-label": "Previous month",
					onClick: () => h(-1),
					children: /* @__PURE__ */ o(d, {})
				}),
				/* @__PURE__ */ s(xn, { children: [
					cn[n.month - 1],
					" ",
					n.year
				] }),
				/* @__PURE__ */ o(bn, {
					type: "button",
					"aria-label": "Next month",
					onClick: () => h(1),
					children: /* @__PURE__ */ o(f, {})
				})
			] }),
			/* @__PURE__ */ s(Sn, {
				ref: y,
				onKeyDown: v,
				children: [ln.map((e) => /* @__PURE__ */ o(Cn, {
					"aria-hidden": "true",
					children: e
				}, e)), r.map((e) => {
					let t = e.toString(), r = e.month === n.month && e.year === n.year, s = t === i;
					return /* @__PURE__ */ o(wn, {
						type: "button",
						"data-date": t,
						tabIndex: t === c ? 0 : -1,
						"aria-label": fn(e),
						"aria-pressed": s,
						"aria-current": t === a ? "date" : void 0,
						disabled: Q(t, l, u),
						$selected: s,
						$today: t === a,
						$outside: !r,
						onMouseDown: (e) => e.preventDefault(),
						onClick: () => _(e),
						children: e.day
					}, t);
				})]
			})
		]
	}) });
}
//#endregion
//#region src/components/DatePicker/useDateTextEditing.ts
function jn({ value: e, onValueChange: t, isOpenEnded: n, options: r, isCalendarOpen: i, openCalendar: a, closeCalendar: o, followDate: s }) {
	let [c, l] = C("blurred"), [u, d] = C(""), [f, p] = C(!1), m = S(null), h = S(!1), g = S(!1), _ = S(!1);
	ee(() => {
		g.current && (g.current = !1, m.current?.select());
	}, [c, u]);
	function v(e) {
		let n = pn(e, r);
		if (n.kind === "invalid") {
			p(!0);
			return;
		}
		p(!1), t?.(n.kind === "date" ? n.iso : n.kind === "pick" ? n.value : null);
	}
	function y(e) {
		m.current?.focus(), p(!1), t?.(e), d(e ?? ""), h.current = !1, g.current = !0, l("input");
	}
	function b() {
		o(), g.current = !0, l("input"), m.current?.focus();
	}
	return {
		focusZone: c,
		setFocusZone: l,
		text: u,
		parseError: f,
		setParseError: p,
		inputRef: m,
		handlers: {
			onMouseDown: () => {
				_.current = document.activeElement !== m.current;
			},
			onMouseUp: (e) => {
				_.current && (_.current = !1, e.preventDefault());
			},
			onFocus: () => {
				l("input"), h.current = !1, g.current = !0, d(n ? "" : e ?? "");
			},
			onChange: (e) => {
				let n = e.target.value;
				d(n), h.current = !0, f && p(!1);
				let a = pn(n, r);
				if (a.kind !== "date" && a.kind !== "pick") return;
				let o = a.kind === "date" ? a.iso : a.value;
				if (t?.(o), i() && o) {
					let e = X(o);
					e && s(e);
				}
			},
			onBlur: () => {
				l((e) => e === "grid" ? e : "blurred"), h.current && (h.current = !1, v(u));
			},
			onKeyDown: (e) => {
				if (e.key === "Enter") {
					e.preventDefault();
					let t = pn(u, r);
					if (t.kind === "pick") {
						y(t.value);
						return;
					}
					h.current && (h.current = !1, v(u));
					return;
				}
				if (e.key === "ArrowDown") {
					e.preventDefault(), i() || a(), l("grid");
					return;
				}
				e.key === "Tab" && i() && o();
			}
		},
		commitPicked: y,
		closeToInput: b
	};
}
//#endregion
//#region src/components/DatePicker/index.tsx
function Mn({ value: e, onValueChange: t, min: n, max: r, allowOpenEnded: i, openEndedLabel: l, edge: u = "start", placeholder: d = "YYYY-MM-DD", disabled: f, hasError: p, id: m, "aria-label": h, "aria-labelledby": g, className: _ }) {
	let { fieldProps: v, status: y } = J(), b = p ? "error" : y, [x, S] = C(!1), [w, T] = C(() => X(e) ?? Z()), [E, O] = C(() => X(e) ?? Z()), [k, A] = C(null), ne = i === !0 && e == null, j = {
		edge: u,
		allowOpenEnded: i,
		min: n,
		max: r
	}, M = tn(j);
	function re(e) {
		O(e), (e.month !== w.month || e.year !== w.year) && T(N(e));
	}
	let P = jn({
		value: e,
		onValueChange: t,
		isOpenEnded: ne,
		options: j,
		isCalendarOpen: () => x,
		openCalendar: () => U(!0),
		closeCalendar: () => S(!1),
		followDate: re
	}), { focusZone: F, setFocusZone: I, text: L, parseError: R, inputRef: z } = P, B = m ?? v.id, V = B ? `${B}-parse-error` : void 0, H = B ? `${B}-calendar` : void 0;
	ee(() => {
		F !== "grid" || !k || k.querySelector(`[data-date="${E.toString()}"]`)?.focus();
	}, [
		F,
		E,
		k
	]);
	function U(t) {
		if (t) {
			let t = X(e) ?? Z();
			T(N(t)), O(t);
		} else I((e) => e === "grid" ? "blurred" : e);
		S(t);
	}
	function W(e) {
		P.commitPicked(e.value), S(!1);
	}
	function G(e) {
		let t = e.toString();
		Q(t, n, r) || (P.commitPicked(t), S(!1));
	}
	function ie() {
		let e = z.current;
		if (!e) return;
		let t = Array.from(document.querySelectorAll("a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex=\"-1\"])")).filter((t) => t.offsetParent !== null || t === e);
		t[t.indexOf(e) + 1]?.focus();
	}
	function K(e) {
		if (e.key === "Tab" && !e.shiftKey) {
			e.preventDefault(), I("blurred"), S(!1), ie();
			return;
		}
		let t = mn(e.key, E);
		t && (e.preventDefault(), re(t));
	}
	let ae = te(() => un(w), [w]), oe = Bt(), se = F === "input" ? L : e || (ne && l ? l : "");
	return /* @__PURE__ */ s(a, { children: [/* @__PURE__ */ s(D.Root, {
		open: x,
		onOpenChange: U,
		children: [/* @__PURE__ */ s(hn, {
			className: _,
			children: [/* @__PURE__ */ o(gn, {
				ref: z,
				$openEnded: ne && F !== "input",
				id: B,
				"aria-label": h,
				"aria-labelledby": g,
				"aria-keyshortcuts": "ArrowDown",
				"aria-invalid": R || v["aria-invalid"] || void 0,
				"aria-required": v["aria-required"],
				"aria-describedby": [R ? V : void 0, v["aria-describedby"]].filter(Boolean).join(" ") || void 0,
				$status: R ? "error" : b,
				disabled: f,
				placeholder: d,
				value: se,
				...P.handlers
			}), /* @__PURE__ */ o(D.Trigger, {
				asChild: !0,
				children: /* @__PURE__ */ o(_n, {
					type: "button",
					disabled: f,
					tabIndex: -1,
					onMouseDown: (e) => e.preventDefault(),
					"aria-label": "Open calendar",
					"aria-expanded": x,
					"aria-controls": x ? H : void 0,
					children: /* @__PURE__ */ o(c, {})
				})
			})]
		}), /* @__PURE__ */ o(An, {
			calendarId: H,
			picks: M,
			anchor: w,
			cells: ae,
			valueIso: e ?? null,
			todayIso: oe,
			focusIso: E.toString(),
			min: n,
			max: r,
			inGrid: F === "grid",
			inputRef: z,
			onMonthShift: (e) => T(e < 0 ? w.subtract({ months: -e }) : w.add({ months: e })),
			onPressQuickPick: W,
			onPickDay: G,
			onGridKeyDown: K,
			onGridElement: A,
			onEscapeFromGrid: P.closeToInput
		})]
	}), R && /* @__PURE__ */ o(Tn, {
		id: V,
		role: "alert",
		children: /^[a-z]/i.test(L.trim()) && M.length > 0 ? `Try ${M.map((e) => e.token).join(", ")}.` : `Enter a date like ${dn(oe)}.`
	})] });
}
//#endregion
//#region src/components/DateRangePicker/PeriodChips.tsx
function Nn({ min: e, max: t, disabled: n, "aria-label": r, onPick: i }) {
	let [a, s] = C(0), c = S([]), l = on({
		min: e,
		max: t
	});
	if (l.length === 0) return null;
	let u = Math.min(a, l.length - 1);
	function d(e) {
		s(e), c.current[e]?.focus();
	}
	function f(e) {
		let t = l.length - 1, n = e.key === "ArrowRight" ? u === t ? 0 : u + 1 : e.key === "ArrowLeft" ? u === 0 ? t : u - 1 : e.key === "Home" ? 0 : e.key === "End" ? t : null;
		n !== null && (e.preventDefault(), d(n));
	}
	return /* @__PURE__ */ o(Pn, {
		role: "toolbar",
		"aria-orientation": "horizontal",
		"aria-label": r,
		onKeyDown: f,
		children: l.map((e, t) => /* @__PURE__ */ o(Fn, {
			type: "button",
			ref: (e) => {
				c.current[t] = e;
			},
			tabIndex: t === u ? 0 : -1,
			disabled: n,
			onClick: () => {
				i({
					start: e.start,
					end: e.end
				}), d(t);
			},
			children: e.label
		}, e.period))
	});
}
var Pn = r.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-shrink: 0;
  gap: ${({ theme: e }) => e.spacing.xs};
`, Fn = r.button`
  height: 1.75rem;
  padding: 0 ${({ theme: e }) => e.spacing.sm};
  border: 1px solid ${({ theme: e }) => e.colors.border};
  border-radius: ${({ theme: e }) => e.borderRadius.full};
  background-color: ${({ theme: e }) => e.colors.surface2};
  color: ${({ theme: e }) => e.colors.ink};
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  font-weight: ${({ theme: e }) => e.fontWeight.medium};
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 150ms ease, border-color 150ms ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme: e }) => e.colors.border};
    border-color: ${({ theme: e }) => e.colors.borderStrong};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme: e }) => e.colors.accent};
    outline-offset: 1px;
  }

  &:disabled {
    color: ${({ theme: e }) => e.colors.subtle};
    cursor: not-allowed;
  }
`, In = r.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.625rem;
`, Ln = r.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  flex: 1 1 20rem;
  min-width: 0;
`, Rn = r.div`
  flex: 1 1 0;
  min-width: 0;
`, zn = r.span`
  flex-shrink: 0;
  color: ${({ theme: e }) => e.colors.muted};
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
`;
function Bn({ start: e, end: t, onStartChange: n, onEndChange: r, onRangeChange: i, periodsAriaLabel: a = "Set both dates", min: c, max: l, allowOpenEndedStart: u, allowOpenEndedEnd: d, startOpenEndedLabel: f, endOpenEndedLabel: p, startId: m, endId: h, startAriaLabel: g = "Start date", endAriaLabel: _ = "End date", disabled: v, hasError: y }) {
	return /* @__PURE__ */ s(In, { children: [/* @__PURE__ */ s(Ln, { children: [
		/* @__PURE__ */ o(Rn, { children: /* @__PURE__ */ o(Mn, {
			edge: "start",
			id: m,
			"aria-label": g,
			value: e,
			onValueChange: n,
			min: c || void 0,
			max: t || l || void 0,
			allowOpenEnded: u,
			openEndedLabel: f,
			disabled: v,
			hasError: y
		}) }),
		/* @__PURE__ */ o(zn, {
			"aria-hidden": "true",
			children: "–"
		}),
		/* @__PURE__ */ o(Rn, { children: /* @__PURE__ */ o(Mn, {
			edge: "end",
			id: h,
			"aria-label": _,
			value: t,
			onValueChange: r,
			min: e || c || void 0,
			max: l || void 0,
			allowOpenEnded: d,
			openEndedLabel: p,
			disabled: v,
			hasError: y
		}) })
	] }), i && /* @__PURE__ */ o(Nn, {
		"aria-label": a,
		min: c,
		max: l,
		disabled: v,
		onPick: i
	})] });
}
//#endregion
//#region src/components/DescriptionList/index.tsx
var Vn = r.dl`
  display: grid;
  grid-template-columns: minmax(8rem, 12rem) 1fr;
  gap: ${({ theme: e }) => e.spacing.sm} ${({ theme: e }) => e.spacing.lg};
  margin: 0;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: ${({ theme: e }) => e.spacing.xs} 0;
  }
`, Hn = r.dt`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.muted};
  margin: 0;
`, Un = r.dd`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.ink};
  margin: 0;

  @media (max-width: 480px) {
    margin-bottom: ${({ theme: e }) => e.spacing.sm};
  }
`, Wn = L.Root, Gn = L.Trigger, Kn = n`
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
`, qn = r(L.Content)`
  min-width: 11rem;
  padding: ${({ theme: e }) => e.spacing.xs};
  background-color: ${({ theme: e }) => e.colors.canvas};
  border: 1px solid ${({ theme: e }) => e.colors.border};
  border-radius: ${({ theme: e }) => e.borderRadius.md};
  box-shadow: ${({ theme: e }) => e.boxShadow.pop};
  z-index: 60;
  animation: ${Kn} ${({ theme: e }) => e.motion.duration.fast}
    ${({ theme: e }) => e.motion.easing.enter};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
function Jn(e) {
	return /* @__PURE__ */ o(L.Portal, { children: /* @__PURE__ */ o(qn, {
		align: "end",
		sideOffset: 4,
		...e
	}) });
}
//#endregion
//#region src/components/DropdownMenu/items.tsx
var Yn = r(L.Item).withConfig({ shouldForwardProp: q("danger") })`
  display: flex;
  align-items: center;
  gap: ${({ theme: e }) => e.spacing.sm};
  padding: ${({ theme: e }) => e.spacing.sm} ${({ theme: e }) => e.spacing.md};
  border-radius: ${({ theme: e }) => e.borderRadius.sm};
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e, danger: t }) => t ? e.colors.error : e.colors.ink};
  cursor: pointer;
  outline: none;
  user-select: none;

  &[data-highlighted] {
    background-color: ${({ theme: e, danger: t }) => t ? e.colors.errorSoft : e.colors.surface2};
  }

  &[data-disabled] {
    color: ${({ theme: e }) => e.colors.subtle};
    cursor: not-allowed;
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`, Xn = r(L.Separator)`
  height: 1px;
  margin: ${({ theme: e }) => e.spacing.xs} 0;
  background-color: ${({ theme: e }) => e.colors.border};
`, Zn = r(L.Label)`
  padding: ${({ theme: e }) => e.spacing.xs} ${({ theme: e }) => e.spacing.md};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme: e }) => e.colors.subtle};
`;
//#endregion
//#region src/components/EmptyState/index.tsx
function Qn({ icon: e, title: t, description: n, action: r, className: i }) {
	return /* @__PURE__ */ s($n, {
		className: i,
		children: [
			e && /* @__PURE__ */ o(er, {
				"aria-hidden": "true",
				children: e
			}),
			/* @__PURE__ */ o(tr, { children: t }),
			n && /* @__PURE__ */ o(nr, { children: n }),
			r && /* @__PURE__ */ o(rr, { children: r })
		]
	});
}
var $n = r.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${({ theme: e }) => e.spacing.sm};
  padding: ${({ theme: e }) => e.spacing["3xl"]} ${({ theme: e }) => e.spacing.xl};
  color: ${({ theme: e }) => e.colors.muted};
`, er = r.div`
  color: ${({ theme: e }) => e.colors.subtle};
  margin-bottom: ${({ theme: e }) => e.spacing.xs};

  svg {
    width: 2.5rem;
    height: 2.5rem;
  }
`, tr = r.p`
  font-family: ${({ theme: e }) => e.typography.fontFamily.display};
  font-size: ${({ theme: e }) => e.fontSize.lg};
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  color: ${({ theme: e }) => e.colors.ink};
  margin: 0;
`, nr = r.p`
  font-size: ${({ theme: e }) => e.fontSize.sm};
  max-width: 40ch;
  line-height: ${({ theme: e }) => e.lineHeight.relaxed};
  margin: 0;
`, rr = r.div`
  margin-top: ${({ theme: e }) => e.spacing.md};
`, ir = r(R.Root)`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  font-weight: ${({ theme: e }) => e.fontWeight.medium};
  color: ${({ theme: e }) => e.colors.ink};
  cursor: default;
`, ar = r.input`
  ${ft}
  ${({ $status: e }) => Y(e)}
`, or = v(function({ hasError: e, ...t }, n) {
	let { fieldProps: r, status: i } = J();
	return /* @__PURE__ */ o(ar, {
		ref: n,
		$status: e ? "error" : i,
		...r,
		...t
	});
}), sr = r.p`
  font-size: ${({ theme: e }) => e.fontSize.xs};
  color: ${({ theme: e }) => e.colors.error};
  margin: 0;
`, cr = r.p.withConfig({ shouldForwardProp: q("status") })`
  font-size: ${({ theme: e }) => e.fontSize.xs};
  color: ${({ theme: e, status: t }) => e.colors[t]};
  margin: 0;
`, lr = r.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`, ur = r.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`, dr = r(ir)`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
`, fr = r.span`
  color: ${({ theme: e }) => e.colors.brand};
`, pr = r.p`
  font-size: ${({ theme: e }) => e.fontSize.xs};
  color: ${({ theme: e }) => e.colors.muted};
  margin: 0;
`;
function mr(e, t, n) {
	return e ? {
		status: "error",
		message: e
	} : t ? {
		status: "warning",
		message: t
	} : n ? {
		status: "success",
		message: n
	} : null;
}
function hr({ label: e, description: t, error: n, warning: r, success: i, required: a = !1, htmlFor: c, className: l, children: u }) {
	let d = x(), f = c ?? `field-${d}`, p = t ? `${f}-description` : void 0, m = mr(n, r, i), h = m?.status, g = h ? `${f}-status` : void 0, _ = te(() => ({
		controlId: f,
		descriptionId: p,
		statusId: g,
		status: h,
		required: a
	}), [
		f,
		p,
		g,
		h,
		a
	]);
	return /* @__PURE__ */ o(nt.Provider, {
		value: _,
		children: /* @__PURE__ */ s(ur, {
			className: l,
			children: [
				/* @__PURE__ */ s(dr, {
					htmlFor: f,
					children: [e, a && /* @__PURE__ */ o(fr, {
						"aria-hidden": "true",
						children: "*"
					})]
				}),
				u,
				t && /* @__PURE__ */ o(pr, {
					id: p,
					children: t
				}),
				m && /* @__PURE__ */ o(cr, {
					id: g,
					status: m.status,
					role: m.status === "error" ? "alert" : void 0,
					children: m.message
				})
			]
		})
	});
}
//#endregion
//#region src/components/Drawer/index.tsx
var gr = n`
  from { opacity: 0; }
  to { opacity: 1; }
`, _r = n`
  from { opacity: 1; }
  to { opacity: 0; }
`, vr = n`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`, yr = n`
  from { transform: translateX(0); }
  to { transform: translateX(100%); }
`, br = "400ms cubic-bezier(0.32, 0.72, 0, 1)", xr = "280ms cubic-bezier(0.55, 0, 1, 0.45)", Sr = r(E.Overlay)`
  background-color: rgba(0, 0, 0, 0.45);
  position: fixed;
  inset: 0;
  z-index: 40;

  &[data-state='open'] {
    animation: ${gr} ${br};
  }
  &[data-state='closed'] {
    animation: ${_r} ${xr} forwards;
    pointer-events: none;
  }
`, Cr = r(E.Content)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  min-width: 78vw;
  width: 78vw;
  max-width: 100vw;
  background-color: ${({ theme: e }) => e.colors.canvas};
  border-left: 1px solid ${({ theme: e }) => e.colors.border};
  box-shadow: ${({ theme: e }) => e.boxShadow.pop};
  z-index: 50;
  display: flex;
  flex-direction: column;

  &[data-state='open'] {
    animation: ${vr} ${br};
    will-change: transform;
  }
  &[data-state='closed'] {
    animation: ${yr} ${xr} forwards;
    will-change: transform;
    pointer-events: none;
  }

  // Reduced motion: drop the slide transform, degrade to a brief opacity fade
  // (a full-height panel snapping in/out is disorienting; a fade is gentler).
  @media (prefers-reduced-motion: reduce) {
    &[data-state='open'] {
      animation: ${gr} ${({ theme: e }) => e.motion.duration.fast}
        ${({ theme: e }) => e.motion.easing.standard};
    }
    &[data-state='closed'] {
      animation: ${_r} ${({ theme: e }) => e.motion.duration.fast}
        ${({ theme: e }) => e.motion.easing.standard} forwards;
    }
  }

  &:focus {
    outline: none;
  }
`, wr = r.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: ${({ theme: e }) => e.spacing.xl};
  border-bottom: 1px solid ${({ theme: e }) => e.colors.border};
  flex-shrink: 0;
`, Tr = r.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
`, Er = r.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ $padding: e, theme: t }) => e ?? t.spacing.xl};
`, Dr = r.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: ${({ theme: e }) => e.spacing.lg} ${({ theme: e }) => e.spacing.xl};
  border-top: 1px solid ${({ theme: e }) => e.colors.border};
  flex-shrink: 0;
`;
function Or({ open: e, onOpenChange: t, title: n, description: r, headerActions: i, children: a, footer: c, bodyPadding: l }) {
	return /* @__PURE__ */ o(E.Root, {
		open: e,
		onOpenChange: t,
		children: /* @__PURE__ */ s(E.Portal, { children: [/* @__PURE__ */ o(Sr, {}), /* @__PURE__ */ s(Cr, { children: [
			/* @__PURE__ */ s(wr, { children: [/* @__PURE__ */ s(wt, { children: [/* @__PURE__ */ o(Tt, { children: n }), r ? /* @__PURE__ */ o(Et, { children: r }) : /* @__PURE__ */ o(E.Description, {
				"aria-hidden": !0,
				style: { display: "none" }
			})] }), /* @__PURE__ */ s(Tr, { children: [i, /* @__PURE__ */ o(E.Close, {
				asChild: !0,
				children: /* @__PURE__ */ o(Dt, {
					"aria-label": "Close",
					children: /* @__PURE__ */ o(h, {
						width: 20,
						height: 20
					})
				})
			})] })] }),
			/* @__PURE__ */ o(Er, {
				$padding: l,
				children: a
			}),
			c && /* @__PURE__ */ o(Dr, { children: c })
		] })] })
	});
}
//#endregion
//#region src/components/Drawer/drawerStore.ts
var kr = globalThis.process, Ar = kr ? kr.env?.NODE_ENV !== "production" : !1;
function jr() {
	let e = {
		open: !1,
		activeId: null,
		config: null
	}, t = /* @__PURE__ */ new Set(), n = 0, r = (n) => {
		e = n, t.forEach((e) => e());
	};
	return {
		subscribe: (e) => (t.add(e), () => {
			t.delete(e);
		}),
		getSnapshot: () => e,
		acquire: (t, i) => {
			n++, Ar && e.open && e.activeId !== null && e.activeId !== t && console.error(`[Drawer] Single-slot violation: "${e.config?.title}" is open and another drawer ("${i.title}") is opening over it. Only one DrawerSlot may be open at a time — the newcomer replaces the incumbent. (ADR-0068)`), r({
				open: !0,
				activeId: t,
				config: i
			});
		},
		release: (t) => {
			if (e.activeId !== t || !e.open) return;
			let i = ++n;
			queueMicrotask(() => {
				i === n && e.activeId === t && e.open && r({
					...e,
					open: !1
				});
			});
		},
		requestClose: () => {
			e.config?.onRequestClose ? e.config.onRequestClose() : e.activeId !== null && r({
				...e,
				open: !1
			});
		}
	};
}
var Mr = _(null), Nr = Mr.Provider;
function Pr() {
	let e = y(Mr);
	if (e === null) throw Error("DrawerSlot must be used within a DrawerProvider");
	return e;
}
//#endregion
//#region src/components/Drawer/DrawerSlot.tsx
function Fr({ open: e, title: t, description: n, headerActions: r, footer: i, bodyPadding: a, onOpenChange: o, children: s }) {
	let c = Pr(), l = x();
	return ee(() => {
		e ? c.acquire(l, {
			title: t,
			description: n,
			headerActions: r,
			footer: i,
			bodyPadding: a,
			onRequestClose: o ? () => o(!1) : void 0,
			children: s
		}) : c.release(l);
	}, [
		c,
		l,
		e,
		t,
		n,
		r,
		i,
		a,
		o,
		s
	]), b(() => () => c.release(l), [c, l]), null;
}
//#endregion
//#region src/components/Drawer/DrawerHost.tsx
function Ir({ children: e }) {
	let [t] = C(jr);
	return /* @__PURE__ */ s(Nr, {
		value: t,
		children: [e, /* @__PURE__ */ o(Lr, { store: t })]
	});
}
function Lr({ store: e }) {
	let t = w(e.subscribe, e.getSnapshot), { config: n } = t;
	return /* @__PURE__ */ o(Or, {
		open: t.open,
		onOpenChange: (t) => {
			t || e.requestClose();
		},
		title: n?.title ?? "",
		description: n?.description,
		headerActions: n?.headerActions,
		footer: n?.footer,
		bodyPadding: n?.bodyPadding,
		children: n?.children
	});
}
//#endregion
//#region src/components/Drawer/layout.tsx
var Rr = r.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
function zr({ children: e }) {
	return /* @__PURE__ */ o(Rr, { children: e });
}
var Br = r.section`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`, Vr = r.h3`
  font-family: ${({ theme: e }) => e.typography.fontFamily.mono};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme: e }) => e.colors.subtle};
  margin: 0;
`;
function Hr({ title: e, children: t }) {
	return /* @__PURE__ */ s(Br, { children: [e != null && /* @__PURE__ */ o(Vr, { children: e }), t] });
}
var Ur = r.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`, Wr = r.span`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  color: ${({ theme: e }) => e.colors.muted};
`, Gr = r.div`
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.ink};
`;
function Kr({ label: e, children: t }) {
	return /* @__PURE__ */ s(Ur, { children: [/* @__PURE__ */ o(Wr, { children: e }), /* @__PURE__ */ o(Gr, { children: t })] });
}
//#endregion
//#region src/components/NumberInput/index.tsx
var qr = r(or)`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
  appearance: textfield;
`;
function Jr({ inputMode: e = "numeric", ...t }) {
	return /* @__PURE__ */ o(qr, {
		type: "number",
		inputMode: e,
		...t
	});
}
//#endregion
//#region src/components/Pagination/index.tsx
function Yr({ page: e, pageCount: t, onPageChange: n, className: r }) {
	if (t <= 1) return null;
	let i = Zr(e, t);
	return /* @__PURE__ */ s(Qr, {
		"aria-label": "Pagination",
		className: r,
		children: [
			/* @__PURE__ */ o(ei, {
				type: "button",
				"aria-label": "Previous page",
				disabled: e <= 1,
				onClick: () => n(e - 1),
				children: /* @__PURE__ */ o(d, {
					width: 16,
					height: 16
				})
			}),
			i.map((t, r) => t === Xr ? /* @__PURE__ */ o(ni, {
				"aria-hidden": "true",
				children: "…"
			}, `gap-${r}`) : /* @__PURE__ */ o(ti, {
				type: "button",
				$active: t === e,
				"aria-current": t === e ? "page" : void 0,
				onClick: () => n(t),
				children: t
			}, t)),
			/* @__PURE__ */ o(ei, {
				type: "button",
				"aria-label": "Next page",
				disabled: e >= t,
				onClick: () => n(e + 1),
				children: /* @__PURE__ */ o(f, {
					width: 16,
					height: 16
				})
			})
		]
	});
}
var Xr = -1;
function Zr(e, t) {
	let n = [.../* @__PURE__ */ new Set([
		1,
		t,
		e,
		e - 1,
		e + 1
	])].filter((e) => e >= 1 && e <= t).sort((e, t) => e - t), r = [], i = 0;
	for (let e of n) e - i > 1 && r.push(Xr), r.push(e), i = e;
	return r;
}
var Qr = r.nav`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme: e }) => e.spacing.xs};
`, $r = "\n  min-width: 2rem;\n  height: 2rem;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 8px;\n  cursor: pointer;\n", ei = r.button`
  ${$r}
  padding: 0 0.375rem;
  border: 1px solid ${({ theme: e }) => e.colors.border};
  background-color: ${({ theme: e }) => e.colors.canvas};
  color: ${({ theme: e }) => e.colors.muted};

  &:hover:not(:disabled) {
    border-color: ${({ theme: e }) => e.colors.borderStrong};
    color: ${({ theme: e }) => e.colors.ink};
  }
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`, ti = r.button`
  ${$r}
  padding: 0 0.5rem;
  border: 1px solid ${({ theme: e, $active: t }) => t ? e.colors.accent : e.colors.border};
  background-color: ${({ theme: e, $active: t }) => t ? e.colors.accentSoft : e.colors.canvas};
  color: ${({ theme: e, $active: t }) => t ? e.colors.accent : e.colors.ink};
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  font-weight: ${({ theme: e, $active: t }) => t ? e.fontWeight.semibold : e.fontWeight.normal};

  &:hover {
    border-color: ${({ theme: e }) => e.colors.borderStrong};
  }
`, ni = r.span`
  min-width: 1.5rem;
  text-align: center;
  color: ${({ theme: e }) => e.colors.subtle};
`, ri = r.div`
  position: relative;
`, ii = r(or)`
  padding-right: 2.75rem;
`, ai = r.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 2.75rem;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: ${({ theme: e }) => e.colors.subtle};
  cursor: pointer;
  border-radius: ${({ theme: e }) => e.borderRadius.md};

  &:hover {
    color: ${({ theme: e }) => e.colors.ink};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme: e }) => e.colors.accent};
    outline-offset: -4px;
  }
`;
function oi() {
	return /* @__PURE__ */ s("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ o("path", {
			d: "M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z",
			stroke: "currentColor",
			strokeWidth: "1.6",
			strokeLinejoin: "round"
		}), /* @__PURE__ */ o("circle", {
			cx: "12",
			cy: "12",
			r: "3",
			stroke: "currentColor",
			strokeWidth: "1.6"
		})]
	});
}
function si() {
	return /* @__PURE__ */ s("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ o("path", {
			d: "M2.5 12S6 5.5 12 5.5c1.7 0 3.2.5 4.5 1.2M21.5 12S18 18.5 12 18.5c-1.7 0-3.2-.5-4.5-1.2",
			stroke: "currentColor",
			strokeWidth: "1.6",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}), /* @__PURE__ */ o("path", {
			d: "M4 20 20 4",
			stroke: "currentColor",
			strokeWidth: "1.6",
			strokeLinecap: "round"
		})]
	});
}
var ci = v(function(e, t) {
	let [n, r] = C(!1);
	return /* @__PURE__ */ s(ri, { children: [/* @__PURE__ */ o(ii, {
		ref: t,
		type: n ? "text" : "password",
		...e
	}), /* @__PURE__ */ o(ai, {
		type: "button",
		"aria-label": n ? "Hide password" : "Show password",
		"aria-pressed": n,
		onClick: () => r((e) => !e),
		children: o(n ? si : oi, {})
	})] });
}), li = D.Root, ui = D.Trigger, di = D.Close, fi = n`
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
`, pi = r(D.Content)`
  min-width: 14rem;
  max-width: min(24rem, calc(100vw - 2rem));
  padding: ${({ theme: e }) => e.spacing.lg};
  background-color: ${({ theme: e }) => e.colors.canvas};
  border: 1px solid ${({ theme: e }) => e.colors.border};
  border-radius: ${({ theme: e }) => e.borderRadius.md};
  box-shadow: ${({ theme: e }) => e.boxShadow.pop};
  z-index: 60;
  animation: ${fi} ${({ theme: e }) => e.motion.duration.fast}
    ${({ theme: e }) => e.motion.easing.enter};

  &:focus {
    outline: none;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`, mi = r(D.Arrow)`
  fill: ${({ theme: e }) => e.colors.canvas};
  stroke: ${({ theme: e }) => e.colors.border};
  stroke-width: 1px;
`;
function hi(e) {
	let { children: t, ...n } = e;
	return /* @__PURE__ */ o(D.Portal, { children: /* @__PURE__ */ s(pi, {
		align: "start",
		sideOffset: 6,
		...n,
		children: [t, /* @__PURE__ */ o(mi, {})]
	}) });
}
//#endregion
//#region src/components/Progress/index.tsx
var gi = r(z.Root)`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 0.5rem;
  border-radius: ${({ theme: e }) => e.borderRadius.full};
  background-color: ${({ theme: e }) => e.colors.surface2};
`, _i = r(z.Indicator)`
  height: 100%;
  background-color: ${({ theme: e }) => e.colors.accent};
  border-radius: inherit;
  transition: width ${({ theme: e }) => e.motion.duration.slow}
    ${({ theme: e }) => e.motion.easing.standard};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
function vi({ value: e, className: t, ...n }) {
	let r = e == null ? null : Math.max(0, Math.min(100, e));
	return /* @__PURE__ */ o(gi, {
		value: r,
		className: t,
		...n,
		children: /* @__PURE__ */ o(_i, { style: { width: `${r ?? 0}%` } })
	});
}
//#endregion
//#region src/components/RadioGroup/index.tsx
var yi = r(B.Root)`
  display: flex;
  flex-direction: ${({ $horizontal: e }) => e ? "row" : "column"};
  flex-wrap: ${({ $horizontal: e }) => e ? "wrap" : "nowrap"};
  gap: ${({ $horizontal: e }) => e ? "1.25rem" : "0.5rem"};
`, bi = r.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: ${({ $disabled: e }) => e ? "not-allowed" : "pointer"};
`, xi = r(B.Item)`
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 1px solid ${({ theme: e }) => e.colors.borderStrong};
  border-radius: 50%;
  background: ${({ theme: e }) => e.colors.canvas};
  cursor: inherit;
  transition: border-color 120ms ease;

  &[data-state='checked'] {
    border-color: ${({ theme: e }) => e.colors.accent};
  }
  &[data-disabled] {
    opacity: 0.5;
  }
  &:focus-visible {
    outline: 2px solid ${({ theme: e }) => e.colors.accent};
    outline-offset: 2px;
  }
`, Si = r(B.Indicator)`
  display: inline-flex;
  &::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ theme: e }) => e.colors.accent};
  }
`, Ci = r.label`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.ink};
  cursor: inherit;
`;
function wi({ value: e, onValueChange: t, options: n, disabled: r, id: i, name: a, orientation: c = "vertical", className: l, ...u }) {
	let { fieldProps: d } = J(), f = x(), p = i ?? d.id ?? `radiogroup-${f}`;
	return /* @__PURE__ */ o(yi, {
		value: e,
		onValueChange: t,
		disabled: r,
		name: a,
		className: l,
		$horizontal: c === "horizontal",
		"aria-label": u["aria-label"],
		"aria-describedby": d["aria-describedby"],
		"aria-invalid": d["aria-invalid"],
		"aria-required": d["aria-required"],
		children: n.map((e) => {
			let t = `${p}-${e.value}`;
			return /* @__PURE__ */ s(bi, {
				$disabled: r || e.disabled,
				children: [/* @__PURE__ */ o(xi, {
					value: e.value,
					id: t,
					disabled: e.disabled,
					children: /* @__PURE__ */ o(Si, {})
				}), /* @__PURE__ */ o(Ci, {
					htmlFor: t,
					children: e.label
				})]
			}, e.value);
		})
	});
}
//#endregion
//#region src/components/Select/index.tsx
var Ti = r(V.Trigger)`
  ${ft}
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  cursor: pointer;

  ${({ $status: e }) => Y(e)}

  &[data-disabled] {
    background-color: ${({ theme: e }) => e.colors.surface2};
    color: ${({ theme: e }) => e.colors.subtle};
    cursor: not-allowed;
  }

  &[data-placeholder] {
    color: ${({ theme: e }) => e.colors.subtle};
  }
`, Ei = r(V.Content)`
  overflow: hidden;
  background-color: ${({ theme: e }) => e.colors.canvas};
  border: 1px solid ${({ theme: e }) => e.colors.border};
  border-radius: ${({ theme: e }) => e.borderRadius.md};
  box-shadow: ${({ theme: e }) => e.boxShadow.pop};
  z-index: 50;
`, Di = r(V.Viewport)`
  padding: 0.25rem;
`, Oi = r(V.Item)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.5rem 2rem 0.5rem 0.75rem;
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.base};
  color: ${({ theme: e }) => e.colors.ink};
  border-radius: ${({ theme: e }) => e.borderRadius.sm};
  cursor: pointer;
  outline: none;
  position: relative;
  user-select: none;
  transition: background-color 100ms ease;

  &[data-highlighted] {
    background-color: ${({ theme: e }) => e.colors.surface2};
    color: ${({ theme: e }) => e.colors.ink};
  }

  &[data-disabled] {
    color: ${({ theme: e }) => e.colors.subtle};
    cursor: not-allowed;
  }
`, ki = r.span`
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.muted};
  max-width: 18rem;
  white-space: normal;
`, Ai = r(V.ItemIndicator)`
  position: absolute;
  right: 0.5rem;
  display: inline-flex;
  align-items: center;
  color: ${({ theme: e }) => e.colors.accent};
`, ji = r(V.ScrollUpButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.5rem;
  color: ${({ theme: e }) => e.colors.muted};
  cursor: default;
`;
function Mi({ value: e, onValueChange: t, options: n, placeholder: r, disabled: i, hasError: a, id: c, className: d, tabIndex: f, "aria-label": p, "aria-labelledby": h }) {
	let { fieldProps: g, status: _ } = J();
	return /* @__PURE__ */ s(V.Root, {
		value: e,
		onValueChange: t,
		disabled: i,
		children: [/* @__PURE__ */ s(Ti, {
			className: d,
			$status: a ? "error" : _,
			id: c ?? g.id,
			tabIndex: f,
			"aria-label": p,
			"aria-labelledby": h,
			"aria-describedby": g["aria-describedby"],
			"aria-invalid": g["aria-invalid"],
			"aria-required": g["aria-required"],
			children: [/* @__PURE__ */ o(V.Value, { placeholder: r ?? "Select…" }), /* @__PURE__ */ o(V.Icon, { children: /* @__PURE__ */ o(u, { style: {
				width: "1rem",
				height: "1rem"
			} }) })]
		}), /* @__PURE__ */ o(V.Portal, { children: /* @__PURE__ */ s(Ei, {
			position: "popper",
			sideOffset: 4,
			children: [
				/* @__PURE__ */ o(ji, {
					as: V.ScrollUpButton,
					children: /* @__PURE__ */ o(m, { style: {
						width: "1rem",
						height: "1rem"
					} })
				}),
				/* @__PURE__ */ o(Di, { children: n.map((e) => /* @__PURE__ */ s(Oi, {
					value: e.value,
					disabled: e.disabled,
					children: [
						/* @__PURE__ */ o(V.ItemText, { children: e.label }),
						e.hint && /* @__PURE__ */ o(ki, { children: e.hint }),
						/* @__PURE__ */ o(Ai, { children: /* @__PURE__ */ o(l, { style: {
							width: "0.875rem",
							height: "0.875rem"
						} }) })
					]
				}, e.value)) }),
				/* @__PURE__ */ o(ji, {
					as: V.ScrollDownButton,
					children: /* @__PURE__ */ o(u, { style: {
						width: "1rem",
						height: "1rem"
					} })
				})
			]
		}) })]
	});
}
//#endregion
//#region src/components/Skeleton/index.tsx
var Ni = n`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
`, Pi = r.div.withConfig({ shouldForwardProp: q("radius") })`
  background-color: ${({ theme: e }) => e.colors.surface2};
  border-radius: ${({ theme: e, radius: t }) => t ?? e.borderRadius.sm};
  width: 100%;
  height: 1rem;
  animation: ${Ni} 1.4s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`, Fi = r(Pi)`
  border-radius: ${({ theme: e }) => e.borderRadius.full};
`, Ii = r(Pi)`
  height: 0.75rem;
`;
//#endregion
//#region src/components/Slider/index.tsx
function Li({ value: e, onValueChange: t, min: n = 0, max: r = 100, step: i = 1, disabled: a, className: c, "aria-label": l }) {
	return /* @__PURE__ */ s(Ri, {
		value: [e],
		onValueChange: ([e]) => t(e),
		min: n,
		max: r,
		step: i,
		disabled: a,
		className: c,
		children: [/* @__PURE__ */ o(zi, { children: /* @__PURE__ */ o(Bi, {}) }), /* @__PURE__ */ o(Vi, { "aria-label": l })]
	});
}
var Ri = r(H.Root)`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 1.25rem;
  touch-action: none;
  user-select: none;

  &[data-disabled] {
    opacity: 0.5;
  }
`, zi = r(H.Track)`
  position: relative;
  flex-grow: 1;
  height: 4px;
  border-radius: ${({ theme: e }) => e.borderRadius.full};
  background-color: ${({ theme: e }) => e.colors.surface2};
`, Bi = r(H.Range)`
  position: absolute;
  height: 100%;
  border-radius: inherit;
  background-color: ${({ theme: e }) => e.colors.accent};
`, Vi = r(H.Thumb)`
  display: block;
  width: 1rem;
  height: 1rem;
  border-radius: ${({ theme: e }) => e.borderRadius.full};
  background-color: ${({ theme: e }) => e.colors.canvas};
  border: 2px solid ${({ theme: e }) => e.colors.accent};
  box-shadow: ${({ theme: e }) => e.boxShadow.card};
  cursor: grab;

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 4px ${({ theme: e }) => e.colors.accentSoft};
  }

  &:active {
    cursor: grabbing;
  }
`, Hi = {
	sm: "1rem",
	md: "1.5rem",
	lg: "2.25rem"
}, Ui = n`
  to { transform: rotate(360deg); }
`, Wi = r.span.withConfig({ shouldForwardProp: q("size", "color") })`
  display: inline-block;
  width: ${({ size: e = "md" }) => Hi[e]};
  height: ${({ size: e = "md" }) => Hi[e]};
  border-radius: 50%;
  border: 2px solid ${({ theme: e }) => e.colors.borderStrong};
  border-top-color: ${({ theme: e, color: t }) => t ?? e.colors.accent};
  animation: ${Ui} 0.6s linear infinite;
  flex-shrink: 0;

  @media (prefers-reduced-motion: reduce) {
    animation-duration: 1.6s;
  }
`;
//#endregion
//#region src/components/Stepper/index.tsx
function Gi({ steps: e, current: t, className: n }) {
	return /* @__PURE__ */ o(Ki, {
		className: n,
		"aria-label": "Progress",
		children: e.map((n, r) => {
			let i = r < t ? "done" : r === t ? "current" : "upcoming";
			return /* @__PURE__ */ s(g, { children: [/* @__PURE__ */ s(qi, {
				"aria-current": i === "current" ? "step" : void 0,
				children: [/* @__PURE__ */ o(Ji, {
					$state: i,
					children: i === "done" ? /* @__PURE__ */ o(l, {
						width: 14,
						height: 14
					}) : r + 1
				}), /* @__PURE__ */ o(Yi, {
					$state: i,
					children: n.label
				})]
			}), r < e.length - 1 && /* @__PURE__ */ o(Xi, {
				$done: r < t,
				"aria-hidden": "true"
			})] }, r);
		})
	});
}
var Ki = r.ol`
  display: flex;
  align-items: center;
  gap: ${({ theme: e }) => e.spacing.sm};
  list-style: none;
  margin: 0;
  padding: 0;
`, qi = r.li`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme: e }) => e.spacing.sm};
`, Ji = r.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  flex-shrink: 0;
  border-radius: ${({ theme: e }) => e.borderRadius.full};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  border: 2px solid
    ${({ theme: e, $state: t }) => t === "upcoming" ? e.colors.border : e.colors.accent};
  background-color: ${({ theme: e, $state: t }) => t === "done" ? e.colors.accent : e.colors.canvas};
  color: ${({ theme: e, $state: t }) => t === "done" ? e.colors.canvas : t === "current" ? e.colors.accent : e.colors.subtle};
`, Yi = r.span`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  font-weight: ${({ theme: e, $state: t }) => t === "current" ? e.fontWeight.semibold : e.fontWeight.normal};
  color: ${({ theme: e, $state: t }) => t === "upcoming" ? e.colors.subtle : e.colors.ink};
  white-space: nowrap;
`, Xi = r.span`
  width: 2rem;
  height: 2px;
  border-radius: 1px;
  background-color: ${({ theme: e, $done: t }) => t ? e.colors.accent : e.colors.border};
`, Zi = r.label`
  display: inline-flex;
  align-items: center;
  cursor: ${({ $disabled: e }) => e ? "not-allowed" : "pointer"};
`, Qi = r.input`
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  margin: 0;
`, $i = r.span`
  position: relative;
  display: inline-block;
  width: 34px;
  height: 20px;
  border-radius: ${({ theme: e }) => e.borderRadius.full};
  background: ${({ theme: e, $checked: t }) => t ? e.colors.accent : e.colors.borderStrong};
  opacity: ${({ $disabled: e }) => e ? .5 : 1};
  transition: background 120ms ease;

  ${Qi}:focus-visible + & {
    outline: 2px solid ${({ theme: e }) => e.colors.accent};
    outline-offset: 2px;
  }
`, ea = r.span`
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  transform: translateX(${({ $checked: e }) => e ? "14px" : "0"});
  transition: transform 120ms ease;
`;
function ta({ checked: e, onCheckedChange: t, disabled: n, ...r }) {
	return /* @__PURE__ */ s(Zi, {
		$disabled: n,
		children: [/* @__PURE__ */ o(Qi, {
			type: "checkbox",
			role: "switch",
			checked: e,
			disabled: n,
			"aria-label": r["aria-label"],
			onChange: (e) => t(e.target.checked)
		}), /* @__PURE__ */ o($i, {
			$checked: e,
			$disabled: n,
			children: /* @__PURE__ */ o(ea, { $checked: e })
		})]
	});
}
//#endregion
//#region src/components/Table/index.tsx
var na = r.div`
  overflow-x: auto;
`, ra = r.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme: e }) => e.fontSize.sm};
`, ia = r.thead`
  background-color: ${({ theme: e }) => e.colors.surface};
`, aa = r.tbody``, oa = r.tr.withConfig({ shouldForwardProp: q("interactive") })`
  cursor: ${({ interactive: e }) => e ? "pointer" : "default"};
  ${({ interactive: e, theme: t }) => e && `&:hover { background-color: ${t.colors.surface}; }`}
`, sa = r.th.withConfig({ shouldForwardProp: q("noBorder", "align") })`
  padding: 0.75rem 1rem;
  text-align: ${({ align: e }) => e ?? "left"};
  font-family: ${({ theme: e }) => e.typography.fontFamily.mono};
  font-weight: ${({ theme: e }) => e.fontWeight.medium};
  color: ${({ theme: e }) => e.colors.muted};
  text-transform: uppercase;
  font-size: ${({ theme: e }) => e.fontSize.xs};
  letter-spacing: 0.05em;
  border-bottom: ${({ theme: e, noBorder: t }) => t ? "none" : `1px solid ${e.colors.border}`};
`, ca = r.td.withConfig({ shouldForwardProp: q("noBorder", "align", "mono", "muted") })`
  padding: 0.75rem 1rem;
  text-align: ${({ align: e }) => e ?? "left"};
  font-family: ${({ theme: e, mono: t }) => t ? e.typography.fontFamily.mono : e.typography.fontFamily.sans};
  font-size: ${({ theme: e, mono: t, muted: n }) => t || n ? e.fontSize.xs : e.fontSize.sm};
  color: ${({ theme: e, muted: t }) => t ? e.colors.muted : e.colors.ink};
  white-space: ${({ mono: e, muted: t }) => e || t ? "nowrap" : "normal"};
  vertical-align: middle;
  border-bottom: ${({ theme: e, noBorder: t }) => t ? "none" : `1px solid ${e.colors.border}`};
`, la = r(ra)`
  th,
  td {
    text-align: center;
  }

  th[data-identity],
  td[data-identity] {
    text-align: left;
  }

  th[data-action],
  td[data-action] {
    width: 1px;
    white-space: nowrap;
    text-align: right;
  }

  tbody tr:hover {
    background-color: ${({ theme: e }) => e.colors.surface};
  }

  tbody tr[data-past] {
    background-color: ${({ theme: e }) => e.colors.surface};
  }

  tbody tr[data-past]:hover {
    background-color: ${({ theme: e }) => e.colors.surface2};
  }
`, ua = U.Root, da = r(U.List)`
  display: flex;
  border-bottom: 1px solid ${({ theme: e }) => e.colors.border};
  gap: 0;
`, fa = r(U.Trigger)`
  padding: 0.75rem 1rem;
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  font-weight: ${({ theme: e }) => e.fontWeight.medium};
  color: ${({ theme: e }) => e.colors.muted};
  border: none;
  border-bottom: 2px solid transparent;
  background: none;
  cursor: pointer;
  margin-bottom: -1px;
  transition: color ${({ theme: e }) => e.motion.duration.fast}
      ${({ theme: e }) => e.motion.easing.standard},
    border-color ${({ theme: e }) => e.motion.duration.fast} ${({ theme: e }) => e.motion.easing.standard};
  outline: none;

  &:hover {
    color: ${({ theme: e }) => e.colors.ink};
  }

  &[data-state='active'] {
    color: ${({ theme: e }) => e.colors.accent};
    border-bottom-color: ${({ theme: e }) => e.colors.accent};
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px ${({ theme: e }) => e.colors.accentSoft};
    border-radius: ${({ theme: e }) => e.borderRadius.sm};
  }
`, pa = r(U.Content)`
  outline: none;

  &:focus-visible {
    box-shadow: 0 0 0 2px ${({ theme: e }) => e.colors.accentSoft};
    border-radius: ${({ theme: e }) => e.borderRadius.md};
  }
`, ma = {
	display: Fe,
	h1: Ie,
	h2: Le,
	sectionTitle: Re,
	bodyLarge: ze,
	body: Be,
	bodySmall: Ve,
	caption: He,
	overline: Ue,
	mono: We
}, ha = {
	default: (e) => e.colors.ink,
	muted: (e) => e.colors.muted,
	subtle: (e) => e.colors.subtle,
	brand: (e) => e.colors.brand,
	accent: (e) => e.colors.accent,
	danger: (e) => e.colors.error,
	warning: (e) => e.colors.warning,
	success: (e) => e.colors.success,
	info: (e) => e.colors.info,
	inverse: (e) => e.colors.onFill
}, ga = {
	display: "h1",
	h1: "h1",
	h2: "h2",
	sectionTitle: "h3",
	bodyLarge: "p",
	body: "p",
	bodySmall: "p",
	caption: "p",
	overline: "span",
	mono: "span"
}, _a = r.p`
  margin: 0; /* layout owns spacing (ADR-0167 gap-first); no stray browser margins */
  ${({ $variant: e }) => ma[e]}
  color: ${({ theme: e, $tone: t }) => ha[t](e)};
`;
function va({ variant: e = "body", tone: t = "default", as: n, ...r }) {
	return /* @__PURE__ */ o(_a, {
		as: n ?? ga[e],
		$variant: e,
		$tone: t,
		...r
	});
}
//#endregion
//#region src/components/Textarea/index.tsx
var ya = r.textarea`
  width: 100%;
  min-height: 88px;
  padding: 0.625rem 0.875rem;
  border: 1px solid ${({ theme: e }) => e.colors.borderStrong};
  border-radius: ${({ theme: e }) => e.borderRadius.md};
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.base};
  line-height: 1.5;
  color: ${({ theme: e }) => e.colors.ink};
  background-color: ${({ theme: e }) => e.colors.canvas};
  outline: none;
  box-sizing: border-box;
  resize: vertical;
  transition: border-color 150ms ease, box-shadow 150ms ease;

  ${({ $status: e }) => Y(e)}

  &:disabled {
    background-color: ${({ theme: e }) => e.colors.surface2};
    color: ${({ theme: e }) => e.colors.subtle};
    cursor: not-allowed;
    resize: none;
  }

  &::placeholder {
    color: ${({ theme: e }) => e.colors.subtle};
  }
`, ba = v(function({ hasError: e, ...t }, n) {
	let { fieldProps: r, status: i } = J();
	return /* @__PURE__ */ o(ya, {
		ref: n,
		$status: e ? "error" : i,
		...r,
		...t
	});
}), xa = r(W.Root)`
  display: inline-flex;
  padding: 2px;
  gap: 2px;
  background-color: ${({ theme: e }) => e.colors.surface2};
  border-radius: ${({ theme: e }) => e.borderRadius.md};
`, Sa = r(W.Item)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  height: 2rem;
  padding: 0 0.75rem;
  border: none;
  border-radius: ${({ theme: e }) => e.borderRadius.sm};
  background: none;
  cursor: pointer;
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  font-weight: ${({ theme: e }) => e.fontWeight.medium};
  color: ${({ theme: e }) => e.colors.muted};
  transition: background-color ${({ theme: e }) => e.motion.duration.fast}
      ${({ theme: e }) => e.motion.easing.standard},
    color ${({ theme: e }) => e.motion.duration.fast} ${({ theme: e }) => e.motion.easing.standard};

  &:hover {
    color: ${({ theme: e }) => e.colors.ink};
  }

  &[data-state='on'] {
    background-color: ${({ theme: e }) => e.colors.canvas};
    color: ${({ theme: e }) => e.colors.ink};
    box-shadow: ${({ theme: e }) => e.boxShadow.card};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme: e }) => e.colors.accent};
    outline-offset: 1px;
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;
//#endregion
//#region src/components/Tooltip/index.tsx
function Ca({ content: e, children: t, side: n = "top", delayDuration: r = 200 }) {
	return /* @__PURE__ */ o(G.Provider, {
		delayDuration: r,
		children: /* @__PURE__ */ s(G.Root, { children: [/* @__PURE__ */ o(G.Trigger, {
			asChild: !0,
			children: t
		}), /* @__PURE__ */ o(G.Portal, { children: /* @__PURE__ */ s(Ta, {
			side: n,
			sideOffset: 6,
			children: [e, /* @__PURE__ */ o(Ea, {})]
		}) })] })
	});
}
var wa = n`
  from { opacity: 0; transform: translateY(2px); }
  to { opacity: 1; transform: translateY(0); }
`, Ta = r(G.Content)`
  max-width: 18rem;
  padding: 0.375rem 0.625rem;
  border-radius: ${({ theme: e }) => e.borderRadius.sm};
  background-color: ${({ theme: e }) => e.colors.ink};
  color: ${({ theme: e }) => e.colors.canvas};
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  line-height: ${({ theme: e }) => e.lineHeight.snug};
  box-shadow: ${({ theme: e }) => e.boxShadow.pop};
  z-index: 60;
  animation: ${wa} ${({ theme: e }) => e.motion.duration.fast}
    ${({ theme: e }) => e.motion.easing.enter};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`, Ea = r(G.Arrow)`
  fill: ${({ theme: e }) => e.colors.ink};
`, Da = {
	white: "#ffffff",
	black: "#000000",
	transparent: "transparent",
	ink900: "#16171A",
	ink800: "#212327",
	ink700: "#2B2D32",
	ink600: "#3A3D44",
	ink400: "#6B6E78",
	ink300: "#A1A3AA",
	ink50: "#F4F4F5",
	brand50: "#FDECED",
	brand200: "#F7A3A7",
	brand500: "#ED1C24",
	brand600: "#C8141B",
	brand800: "#8E0C11"
}, $ = {
	slate: {
		50: "#f8fafc",
		100: "#f1f5f9",
		200: "#e2e8f0",
		300: "#cbd5e1",
		400: "#94a3b8",
		500: "#64748b",
		600: "#475569",
		700: "#334155",
		800: "#1e293b",
		900: "#0f172a"
	},
	red: {
		50: "#fef2f2",
		100: "#fee2e2",
		200: "#fecaca",
		300: "#fca5a5",
		400: "#f87171",
		500: "#ef4444",
		600: "#dc2626",
		700: "#b91c1c",
		800: "#991b1b",
		900: "#7f1d1d"
	},
	yellow: {
		50: "#fefce8",
		100: "#fef9c3",
		200: "#fef08a",
		300: "#fde047",
		400: "#facc15",
		500: "#eab308",
		600: "#ca8a04",
		700: "#a16207",
		800: "#854d0e",
		900: "#713f12"
	},
	green: {
		50: "#f0fdf4",
		100: "#dcfce7",
		200: "#bbf7d0",
		300: "#86efac",
		400: "#4ade80",
		500: "#22c55e",
		600: "#16a34a",
		700: "#15803d",
		800: "#166534",
		900: "#14532d"
	}
}, Oa = {
	xs: "0.75rem",
	sm: "0.8125rem",
	base: "0.9375rem",
	lg: "1.0625rem",
	xl: "1.25rem",
	"2xl": "1.5rem",
	"3xl": "1.875rem",
	"4xl": "2.25rem",
	"5xl": "3rem"
}, ka = {
	normal: "400",
	medium: "500",
	semibold: "600",
	bold: "700",
	extrabold: "800",
	black: "900"
}, Aa = {
	flat: "1.1",
	snugTight: "1.17",
	tight: "1.25",
	snug: "1.375",
	normal: "1.5",
	relaxed: "1.625",
	loose: "2"
}, ja = {
	tight: "-0.03em",
	normal: "0",
	wide: "0.08em"
}, Ma = { fontFamily: {
	display: "'Archivo', sans-serif",
	sans: "'Public Sans', ui-sans-serif, system-ui, -apple-system, sans-serif",
	mono: "'IBM Plex Mono', ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace"
} }, Na = {
	none: "0",
	sm: "6px",
	md: "10px",
	lg: "14px",
	full: "9999px"
}, Pa = {
	none: "0",
	xs: "0.25rem",
	sm: "0.5rem",
	md: "0.75rem",
	lg: "1rem",
	xl: "1.5rem",
	"2xl": "2rem",
	"3xl": "3rem",
	"4xl": "4rem"
}, Fa = {
	card: "0 1px 2px rgba(16, 17, 20, 0.06)",
	pop: "0 6px 24px rgba(16, 17, 20, 0.09)",
	none: "none"
}, Ia = {
	sm: "640px",
	md: "768px",
	lg: "1024px",
	xl: "1280px",
	"2xl": "1536px"
}, La = {
	0: "0",
	10: "10",
	20: "20",
	30: "30",
	40: "40",
	50: "50",
	auto: "auto"
}, Ra = {
	canvas: "#FFFFFF",
	surface: $.slate[50],
	surface2: $.slate[100],
	border: $.slate[200],
	borderStrong: $.slate[300],
	ink: $.slate[900],
	muted: $.slate[600],
	subtle: $.slate[500],
	onFill: "#FFFFFF",
	brand: "#ED1C24",
	brandHover: "#C8141B",
	brandSoft: "#FDECED",
	success: $.green[600],
	successSoft: $.green[50],
	warning: $.yellow[700],
	warningSoft: $.yellow[50],
	error: $.red[600],
	errorSoft: $.red[50],
	info: "#2563C9",
	infoSoft: "#E7EEFB",
	accent: "#2563C9",
	accentSoft: "#E7EEFB",
	oe: "#7C3AED",
	oeSoft: "#EDE7FB",
	oeFaint: "#F5F1FC"
}, za = {
	canvas: "#0d1117",
	surface: "#161b22",
	surface2: "#21262d",
	border: "#30363d",
	borderStrong: "#484f58",
	ink: "#e6edf3",
	muted: "#8b949e",
	subtle: "#7d8590",
	onFill: "#FFFFFF",
	brand: "#ED1C24",
	brandHover: "#FF4A52",
	brandSoft: "rgba(237, 28, 36, 0.18)",
	success: $.green[400],
	successSoft: "rgba(74, 222, 128, 0.16)",
	warning: $.yellow[400],
	warningSoft: "rgba(250, 204, 21, 0.16)",
	error: $.red[400],
	errorSoft: "rgba(248, 113, 113, 0.16)",
	info: "#4B8DF8",
	infoSoft: "rgba(75, 141, 248, 0.16)",
	accent: "#4B8DF8",
	accentSoft: "rgba(75, 141, 248, 0.16)",
	oe: "#A78BFA",
	oeSoft: "rgba(167, 139, 250, 0.22)",
	oeFaint: "rgba(167, 139, 250, 0.10)"
}, Ba = {
	fixed: Da,
	scales: $,
	fontSize: Oa,
	fontWeight: ka,
	lineHeight: Aa,
	letterSpacing: ja,
	typography: Ma,
	borderRadius: Na,
	spacing: Pa,
	boxShadow: Fa,
	screens: Ia,
	zIndex: La,
	motion: {
		duration: {
			fast: "150ms",
			base: "220ms",
			slow: "280ms"
		},
		easing: {
			enter: "cubic-bezier(0.22, 1, 0.36, 1)",
			exit: "cubic-bezier(0.4, 0, 1, 1)",
			standard: "cubic-bezier(0.4, 0, 0.2, 1)"
		}
	}
}, Va = {
	...Ba,
	colors: {
		...Da,
		...Ra
	}
}, Ha = {
	...Ba,
	colors: {
		...Da,
		...za
	}
}, Ua = {
	STANDARD: 112.5,
	LARGE: 125,
	EXTRA_LARGE: 137.5
};
//#endregion
export { Wt as ALWAYS, Kt as ANYTIME, ie as Accordion, le as AccordionContent, ae as AccordionHeader, K as AccordionItem, oe as AccordionTrigger, de as Alert, pe as AlertBody, fe as AlertIcon, he as AlertMessage, me as AlertTitle, ve as Avatar, Te as Badge, Ee as Breadcrumbs, Pe as Button, Ye as Card, Qe as CardActions, $e as CardBody, et as CardFooter, Xe as CardHeader, Ze as CardTitle, st as Checkbox, ct as Chip, pt as Combobox, It as ConfirmDialog, Mn as DatePicker, Bn as DateRangePicker, Un as DescriptionDetails, Vn as DescriptionList, Hn as DescriptionTerm, Or as Drawer, zr as DrawerBody, Kr as DrawerField, Ir as DrawerProvider, Hr as DrawerSection, Fr as DrawerSlot, Wn as DropdownMenu, Jn as DropdownMenuContent, Yn as DropdownMenuItem, Zn as DropdownMenuLabel, Xn as DropdownMenuSeparator, Gn as DropdownMenuTrigger, Qn as EmptyState, sr as ErrorText, lr as Field, hr as FormField, or as Input, ir as Label, Ot as Modal, Jr as NumberInput, Gt as ONGOING, Yr as Pagination, ci as PasswordInput, li as Popover, di as PopoverClose, hi as PopoverContent, ui as PopoverTrigger, vi as Progress, wi as RadioGroup, Mi as Select, Pi as Skeleton, Fi as SkeletonCircle, Ii as SkeletonText, Li as Slider, Wi as Spinner, cr as StatusMessage, Gi as Stepper, ta as Switch, ra as Table, na as TableScroll, ua as Tabs, pa as TabsContent, da as TabsList, fa as TabsTrigger, aa as Tbody, ca as Td, va as Text, ba as Textarea, sa as Th, ia as Thead, la as Timeline, xa as ToggleGroup, Sa as ToggleGroupItem, Ca as Tooltip, oa as Tr, ze as bodyLargeType, Ve as bodySmallType, Be as bodyType, He as captionType, qe as cardHeadingType, Ha as darkTheme, Yt as dayOfInstant, Fe as displayType, Je as eyebrowType, Ua as fontSizeScale, Jt as formatDate, Zt as formatDateTime, Xt as formatInstant, X as fromISO, Ie as h1Type, Le as h2Type, Va as lightTheme, nn as matchQuickPick, We as monoType, Q as outOfRange, Ue as overlineType, Ge as pageTitleType, Ke as panelHeadingType, Ut as parseUserDate, tn as quickPicksFor, on as rangePicksFor, $t as resolveQuickPick, an as resolveRangePeriod, $ as scales, Re as sectionTitleType, Rt as toISO, Z as todayDate, zt as todayDateIn, Bt as todayISO };
