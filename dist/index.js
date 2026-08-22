import * as e from "@radix-ui/react-accordion";
import { css as t, keyframes as n, styled as r } from "styled-components";
import * as i from "@radix-ui/react-avatar";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
import { CalendarDaysIcon as c, CheckIcon as l, ChevronDownIcon as u, ChevronLeftIcon as d, ChevronRightIcon as f, ChevronUpDownIcon as p, ChevronUpIcon as m, XMarkIcon as h } from "@heroicons/react/24/outline";
import { Fragment as g, createContext as _, forwardRef as v, useContext as y, useEffect as b, useId as x, useLayoutEffect as ee, useMemo as te, useRef as S, useState as C, useSyncExternalStore as w } from "react";
import * as ne from "@radix-ui/react-checkbox";
import * as T from "@radix-ui/react-dialog";
import * as E from "@radix-ui/react-popover";
import { endOfMonth as D, endOfYear as O, fromDate as k, getDayOfWeek as A, getLocalTimeZone as j, getWeeksInMonth as M, parseDate as re, startOfMonth as N, startOfYear as P, toCalendarDate as F, today as I } from "@internationalized/date";
import * as L from "@radix-ui/react-dropdown-menu";
import * as ie from "@radix-ui/react-label";
import * as R from "@radix-ui/react-progress";
import * as z from "@radix-ui/react-radio-group";
import * as B from "@radix-ui/react-select";
import * as V from "@radix-ui/react-slider";
import * as H from "@radix-ui/react-tabs";
import * as U from "@radix-ui/react-toggle-group";
import * as W from "@radix-ui/react-tooltip";
//#region src/components/Accordion/index.tsx
var ae = e.Root, G = r(e.Item)`
  border-bottom: 1px solid ${({ theme: e }) => e.colors.border};

  &:first-child {
    border-top: 1px solid ${({ theme: e }) => e.colors.border};
  }
`, oe = r(e.Header)`
  margin: 0;
`, se = r(e.Trigger)`
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
`, ce = n`
  from { height: 0; }
  to { height: var(--radix-accordion-content-height); }
`, K = n`
  from { height: var(--radix-accordion-content-height); }
  to { height: 0; }
`, q = r(e.Content)`
  overflow: hidden;
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.muted};
  line-height: ${({ theme: e }) => e.lineHeight.relaxed};

  &[data-state='open'] {
    animation: ${ce} ${({ theme: e }) => e.motion.duration.base}
      ${({ theme: e }) => e.motion.easing.standard};
  }
  &[data-state='closed'] {
    animation: ${K} ${({ theme: e }) => e.motion.duration.fast}
      ${({ theme: e }) => e.motion.easing.exit};
  }

  /* Inner padding so the animated height wraps the content cleanly. */
  & > * {
    padding: 0 ${({ theme: e }) => e.spacing.md} ${({ theme: e }) => e.spacing.lg};
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`, J = (...e) => {
	let t = new Set(e);
	return (e) => !t.has(e);
}, le = {
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
}, ue = r.div.withConfig({ shouldForwardProp: J("variant") })`
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: ${({ theme: e }) => e.borderRadius.md};
  border-left: 3px solid;
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};

  ${({ variant: e = "info" }) => le[e]}
`, de = r.span`
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  padding-top: 1px;
  width: 1rem;
  height: 1rem;
`, fe = r.div`
  flex: 1;
  min-width: 0;
`, pe = r.p`
  margin: 0 0 0.125rem;
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  font-size: ${({ theme: e }) => e.fontSize.sm};
`, me = r.p`
  margin: 0;
  font-size: ${({ theme: e }) => e.fontSize.sm};
  opacity: 0.9;
`, he = {
	sm: "1.75rem",
	md: "2.25rem",
	lg: "3rem"
};
function ge(e) {
	let t = e.trim().split(/\s+/).filter(Boolean);
	return t.length === 0 ? "?" : t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
}
function _e({ name: e, src: t, size: n = "md", className: r }) {
	return /* @__PURE__ */ s(ve, {
		$size: n,
		className: r,
		children: [t && /* @__PURE__ */ o(ye, {
			src: t,
			alt: e
		}), /* @__PURE__ */ o(be, {
			delayMs: t ? 300 : 0,
			children: ge(e)
		})]
	});
}
var ve = r(i.Root)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size: e }) => he[e]};
  height: ${({ $size: e }) => he[e]};
  border-radius: ${({ theme: e }) => e.borderRadius.full};
  overflow: hidden;
  flex-shrink: 0;
  user-select: none;
  vertical-align: middle;
`, ye = r(i.Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`, be = r(i.Fallback)`
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
`, xe = {
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
}, Se = {
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
}, Ce = {
	...xe,
	...Se
}, we = r.span.withConfig({ shouldForwardProp: J("variant") })`
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

  ${({ variant: e = "default" }) => Ce[e]}
`;
//#endregion
//#region src/components/Breadcrumbs/index.tsx
function Te({ items: e, className: t }) {
	return /* @__PURE__ */ o(Ee, {
		"aria-label": "Breadcrumb",
		className: t,
		children: /* @__PURE__ */ o(De, { children: e.map((t, n) => {
			let r = n === e.length - 1;
			return /* @__PURE__ */ s(g, { children: [/* @__PURE__ */ o("li", { children: t.href && !r ? /* @__PURE__ */ o(Oe, {
				href: t.href,
				children: t.label
			}) : /* @__PURE__ */ o(ke, {
				"aria-current": r ? "page" : void 0,
				children: t.label
			}) }), !r && /* @__PURE__ */ o(Ae, {
				"aria-hidden": "true",
				children: /* @__PURE__ */ o(f, {
					width: 14,
					height: 14
				})
			})] }, n);
		}) })
	});
}
var Ee = r.nav`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
`, De = r.ol`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme: e }) => e.spacing.xs};
  list-style: none;
  margin: 0;
  padding: 0;
`, Oe = r.a`
  color: ${({ theme: e }) => e.colors.muted};
  text-decoration: none;

  &:hover {
    color: ${({ theme: e }) => e.colors.ink};
    text-decoration: underline;
  }
`, ke = r.span`
  color: ${({ theme: e }) => e.colors.ink};
  font-weight: ${({ theme: e }) => e.fontWeight.medium};
`, Ae = r.span`
  display: inline-flex;
  color: ${({ theme: e }) => e.colors.subtle};
`, je = {
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
}, Me = {
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
}, Ne = r.button.withConfig({ shouldForwardProp: J("variant", "size") })`
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

  ${({ variant: e = "primary" }) => je[e]}
  ${({ size: e = "md" }) => Me[e]}

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
`, Pe = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.display};
  font-style: italic;
  font-weight: ${({ theme: e }) => e.fontWeight.black};
  font-size: ${({ theme: e }) => e.fontSize["5xl"]};
  line-height: ${({ theme: e }) => e.lineHeight.flat};
  letter-spacing: ${({ theme: e }) => e.letterSpacing.tight};
`, Fe = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.display};
  font-weight: ${({ theme: e }) => e.fontWeight.extrabold};
  font-size: ${({ theme: e }) => e.fontSize["4xl"]};
  line-height: ${({ theme: e }) => e.lineHeight.snugTight};
`, Ie = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.display};
  font-weight: ${({ theme: e }) => e.fontWeight.bold};
  font-size: ${({ theme: e }) => e.fontSize["2xl"]};
  line-height: ${({ theme: e }) => e.lineHeight.tight};
`, Le = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  line-height: ${({ theme: e }) => e.lineHeight.snug};
`, Re = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-weight: ${({ theme: e }) => e.fontWeight.normal};
  font-size: ${({ theme: e }) => e.fontSize.lg};
  line-height: ${({ theme: e }) => e.lineHeight.relaxed};
`, ze = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-weight: ${({ theme: e }) => e.fontWeight.normal};
  font-size: ${({ theme: e }) => e.fontSize.base};
  line-height: ${({ theme: e }) => e.lineHeight.relaxed};
`, Be = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-weight: ${({ theme: e }) => e.fontWeight.normal};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  line-height: ${({ theme: e }) => e.lineHeight.normal};
`, Ve = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-weight: ${({ theme: e }) => e.fontWeight.normal};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  line-height: ${({ theme: e }) => e.lineHeight.normal};
`, He = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.mono};
  font-weight: ${({ theme: e }) => e.fontWeight.medium};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  line-height: ${({ theme: e }) => e.lineHeight.normal};
  letter-spacing: ${({ theme: e }) => e.letterSpacing.wide};
`, Ue = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.mono};
  font-weight: ${({ theme: e }) => e.fontWeight.normal};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  line-height: ${({ theme: e }) => e.lineHeight.normal};
`, We = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.display};
  font-weight: ${({ theme: e }) => e.fontWeight.bold};
  font-size: ${({ theme: e }) => e.fontSize["2xl"]};
`, Ge = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.display};
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  font-size: ${({ theme: e }) => e.fontSize.lg};
`, Ke = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.display};
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  font-size: ${({ theme: e }) => e.fontSize.base};
`, qe = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.mono};
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  letter-spacing: 0.05em;
`, Je = r.div.withConfig({ shouldForwardProp: J("interactive") })`
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
`, Ye = r.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme: e }) => e.spacing.lg};
  padding: ${({ theme: e }) => e.spacing.lg} ${({ theme: e }) => e.spacing.xl};
  border-bottom: 1px solid ${({ theme: e }) => e.colors.border};
`, Xe = r.h3`
  ${Ke}
  color: ${({ theme: e }) => e.colors.ink};
  margin: 0;
`, Ze = r.div`
  display: flex;
  align-items: center;
  gap: ${({ theme: e }) => e.spacing.sm};
  flex-shrink: 0;
`, Qe = r.div`
  padding: ${({ theme: e }) => e.spacing.xl};
`, $e = r.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme: e }) => e.spacing.md};
  padding: ${({ theme: e }) => e.spacing.lg} ${({ theme: e }) => e.spacing.xl};
  border-top: 1px solid ${({ theme: e }) => e.colors.border};
  background-color: ${({ theme: e }) => e.colors.surface};
`, et = {
	error: "errorSoft",
	warning: "warningSoft",
	success: "successSoft"
}, tt = _(null);
function Y() {
	let e = y(tt);
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
var nt = r.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: ${({ $disabled: e }) => e ? "not-allowed" : "pointer"};
`, rt = r(ne.Root)`
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
`, it = r(ne.Indicator)`
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
`, at = r.label`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.ink};
  cursor: inherit;
`;
function ot({ checked: e, onCheckedChange: t, disabled: n, id: r, children: i, className: a, ...c }) {
	let { fieldProps: u } = Y(), d = x(), f = r ?? u.id ?? `checkbox-${d}`;
	return /* @__PURE__ */ s(nt, {
		$disabled: n,
		className: a,
		children: [/* @__PURE__ */ o(rt, {
			id: f,
			checked: e,
			onCheckedChange: (e) => t?.(e === !0),
			disabled: n,
			"aria-label": c["aria-label"],
			"aria-describedby": u["aria-describedby"],
			"aria-invalid": u["aria-invalid"],
			"aria-required": u["aria-required"],
			children: /* @__PURE__ */ o(it, { children: /* @__PURE__ */ o(l, {}) })
		}), i != null && /* @__PURE__ */ o(at, {
			htmlFor: f,
			children: i
		})]
	});
}
//#endregion
//#region src/components/Chip/index.tsx
function st({ children: e, onRemove: t, removeLabel: n = "Remove", className: r }) {
	return /* @__PURE__ */ s(ct, {
		className: r,
		children: [/* @__PURE__ */ o(lt, { children: e }), t && /* @__PURE__ */ o(ut, {
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
var ct = r.span`
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
`, lt = r.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 0.125rem;
`, ut = r.button`
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
`, dt = (e, n = "&:focus") => t`
  ${e && t`
    border-color: ${({ theme: t }) => t.colors[e]};
    box-shadow: 0 0 0 3px ${({ theme: t }) => t.colors[et[e]]};
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
	let { fieldProps: w, status: ne } = Y(), T = _ ? "error" : ne, [E, D] = C(!1), [O, k] = C(""), [A, j] = C(0), M = S(null), re = S(null), N = S(null), P = !!c, F = i ?? [], I = (e) => r ? F.includes(e) : e === t, L = (t) => e.find((e) => e.value === t)?.label ?? t, ie = r ? F.map((e) => ({
		value: e,
		label: L(e)
	})) : [], R = te(() => {
		if (P) return e;
		let t = O.trim().toLowerCase();
		return t ? e.filter((e) => e.label.toLowerCase().includes(t)) : e;
	}, [
		e,
		O,
		P
	]), z = O.trim(), B = !!f && z !== "" && !R.some((e) => e.label.toLowerCase() === z.toLowerCase() || e.value.toLowerCase() === z.toLowerCase()), V = R.length, H = R.length + +!!B, U = H ? Math.min(A, H - 1) : 0, W = x(), ae = `${W}-listbox`, G = (e) => `${W}-option-${e}`;
	b(() => {
		if (!E) return;
		function e(e) {
			M.current && !M.current.contains(e.target) && D(!1);
		}
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [E]), b(() => {
		re.current?.querySelector(`[data-index="${U}"]`)?.scrollIntoView({ block: "nearest" });
	}, [U, E]);
	let oe = S(c);
	b(() => {
		oe.current = c;
	}), b(() => {
		if (!P || !E) return;
		let e = setTimeout(() => oe.current?.(O), d);
		return () => clearTimeout(e);
	}, [
		O,
		E,
		P,
		d
	]);
	function se(e) {
		if (e) if (r) {
			let t = F.includes(e.value) ? F.filter((t) => t !== e.value) : [...F, e.value];
			a?.(t), k(""), j(0), D(!0), N.current?.focus();
		} else n?.(e.value), k(""), D(!1);
	}
	function ce(e) {
		a?.(F.filter((t) => t !== e));
	}
	function K(e) {
		let t = e.trim();
		t && (m?.(t), r ? (F.includes(t) || a?.([...F, t]), k(""), j(0), D(!0), N.current?.focus()) : (n?.(t), k(""), D(!1)));
	}
	function q(e) {
		e.key === "ArrowDown" ? (e.preventDefault(), E ? j((e) => Math.min(e + 1, H - 1)) : D(!0)) : e.key === "ArrowUp" ? (e.preventDefault(), j((e) => Math.max(e - 1, 0))) : e.key === "Enter" ? E && (e.preventDefault(), B && U === V ? K(z) : se(R[U])) : e.key === "Backspace" ? r && O === "" && F.length > 0 && ce(F[F.length - 1]) : e.key === "Escape" && D(!1);
	}
	let J = E ? O : t ? L(t) : "";
	return /* @__PURE__ */ s(mt, {
		ref: M,
		className: y,
		children: [
			r ? /* @__PURE__ */ s(gt, {
				$status: T,
				"data-disabled": g || void 0,
				onMouseDown: (e) => {
					e.target === e.currentTarget && (e.preventDefault(), N.current?.focus());
				},
				children: [ie.map((e) => /* @__PURE__ */ o(st, {
					onRemove: g ? void 0 : () => ce(e.value),
					children: e.label
				}, e.value)), /* @__PURE__ */ o(_t, {
					ref: N,
					id: v ?? w.id,
					role: "combobox",
					"aria-expanded": E,
					"aria-controls": E ? ae : void 0,
					"aria-activedescendant": E && H ? G(U) : void 0,
					"aria-label": ee,
					"aria-describedby": w["aria-describedby"],
					"aria-required": w["aria-required"],
					"aria-invalid": T === "error" || void 0,
					disabled: g,
					placeholder: ie.length === 0 ? h : "",
					value: O,
					onFocus: () => D(!0),
					onChange: (e) => {
						k(e.target.value), j(0), D(!0);
					},
					onKeyDown: q
				})]
			}) : /* @__PURE__ */ o(ht, {
				ref: N,
				id: v ?? w.id,
				role: "combobox",
				"aria-expanded": E,
				"aria-controls": E ? ae : void 0,
				"aria-activedescendant": E && R.length ? G(U) : void 0,
				"aria-label": ee,
				"aria-describedby": w["aria-describedby"],
				"aria-required": w["aria-required"],
				"aria-invalid": T === "error" || void 0,
				$status: T,
				disabled: g,
				placeholder: t && !E ? L(t) : h,
				value: J,
				onFocus: () => D(!0),
				onChange: (e) => {
					k(e.target.value), j(0), D(!0);
				},
				onKeyDown: q
			}),
			/* @__PURE__ */ o(vt, {
				"aria-hidden": "true",
				children: /* @__PURE__ */ o(p, {
					width: 18,
					height: 18
				})
			}),
			E && /* @__PURE__ */ s(yt, {
				id: ae,
				ref: re,
				role: "listbox",
				"aria-multiselectable": r || void 0,
				children: [
					u && /* @__PURE__ */ o(St, {
						"aria-live": "polite",
						children: "Searching…"
					}),
					!u && R.length === 0 && !B && /* @__PURE__ */ o(xt, { children: "No matches" }),
					R.map((e, t) => /* @__PURE__ */ s(bt, {
						id: G(t),
						"data-index": t,
						role: "option",
						"aria-selected": I(e.value),
						$active: t === U,
						onMouseEnter: () => j(t),
						onMouseDown: (t) => {
							t.preventDefault(), se(e);
						},
						children: [/* @__PURE__ */ o("span", { children: e.label }), I(e.value) && /* @__PURE__ */ o(l, {
							width: 16,
							height: 16
						})]
					}, e.value)),
					B && /* @__PURE__ */ o(bt, {
						id: G(V),
						"data-index": V,
						role: "option",
						"aria-selected": !1,
						$active: U === V,
						onMouseEnter: () => j(V),
						onMouseDown: (e) => {
							e.preventDefault(), K(z);
						},
						children: /* @__PURE__ */ s(Ct, { children: [
							"Create “",
							/* @__PURE__ */ o("strong", { children: z }),
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

  ${({ $status: e }) => dt(e)}
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
  ${({ $status: e }) => dt(e, "&:focus-within")}

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
`, Tt = r(T.Title)`
  font-family: ${({ theme: e }) => e.typography.fontFamily.display};
  font-size: ${({ theme: e }) => e.fontSize.lg};
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  color: ${({ theme: e }) => e.colors.ink};
  margin: 0;
`, Et = r(T.Description)`
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
	return /* @__PURE__ */ o(T.Root, {
		open: e,
		onOpenChange: t,
		children: /* @__PURE__ */ s(T.Portal, { children: [/* @__PURE__ */ o(jt, {}), /* @__PURE__ */ s(Mt, {
			style: c ? { maxWidth: c } : void 0,
			children: [
				/* @__PURE__ */ s(Nt, { children: [/* @__PURE__ */ s(wt, { children: [/* @__PURE__ */ o(Tt, { children: n }), r ? /* @__PURE__ */ o(Et, { children: r }) : /* @__PURE__ */ o(T.Description, {
					"aria-hidden": !0,
					style: { display: "none" }
				})] }), /* @__PURE__ */ o(T.Close, {
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
`, jt = r(T.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.45);
  animation: ${kt} ${({ theme: e }) => e.motion.duration.base} ${({ theme: e }) => e.motion.easing.enter};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`, Mt = r(T.Content)`
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
		footer: /* @__PURE__ */ s(a, { children: [/* @__PURE__ */ o(Ne, {
			type: "button",
			variant: "secondary",
			size: "sm",
			disabled: d,
			onClick: () => t(!1),
			children: l
		}), /* @__PURE__ */ o(Ne, {
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
	return Number.isNaN(t.getTime()) ? null : F(k(t, j()));
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
		case "month": return (t === "start" ? N(n.add({ months: 1 })) : D(n)).toString();
		case "year": return (t === "start" ? P(n.add({ years: 1 })) : O(n)).toString();
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
	let t = Z(), n = e === "nextMonth" ? t.add({ months: 1 }) : e === "nextYear" ? t.add({ years: 1 }) : t, [r, i] = e === "thisMonth" || e === "nextMonth" ? [N(n), D(n)] : [P(n), O(n)];
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
//#region src/components/DatePicker/index.tsx
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
	let t = N(e), n = A(t, sn), r = t.subtract({ days: n }), i = M(e, sn);
	return Array.from({ length: i * 7 }, (e, t) => r.add({ days: t }));
}
function dn(e) {
	let [t, n, r] = e.split("-");
	return `${e}, ${t}${n}${r}, or ${n}/${r}/${t}`;
}
function fn(e) {
	return `${cn[e.month - 1]} ${e.day}, ${e.year}`;
}
var pn = r.div`
  position: relative;
  width: 100%;
`, mn = r.input`
  ${ft}
  padding-right: 2.75rem;
  color: ${({ theme: e, $openEnded: t }) => t ? e.colors.muted : e.colors.ink};
  font-style: ${({ $openEnded: e }) => e ? "italic" : "normal"};

  ${({ $status: e }) => dt(e)}
`, hn = r.button`
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
`, gn = r(E.Content)`
  background-color: ${({ theme: e }) => e.colors.canvas};
  border: 1px solid ${({ theme: e }) => e.colors.border};
  border-radius: ${({ theme: e }) => e.borderRadius.md};
  box-shadow: ${({ theme: e }) => e.boxShadow.pop};
  padding: 1rem;
  z-index: 50;
`, _n = r.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`, vn = r.button`
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
`, yn = r.span`
  font-family: ${({ theme: e }) => e.typography.fontFamily.display};
  font-size: ${({ theme: e }) => e.fontSize.base};
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  color: ${({ theme: e }) => e.colors.ink};
`, bn = r.div`
  display: grid;
  grid-template-columns: repeat(7, 2.5rem);
`, xn = r.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  font-family: ${({ theme: e }) => e.typography.fontFamily.mono};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  color: ${({ theme: e }) => e.colors.muted};
`, Sn = r.button`
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
`, Cn = r.p`
  margin: 0.375rem 0 0;
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  color: ${({ theme: e }) => e.colors.error};
`, wn = r.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${({ theme: e }) => e.colors.border};
`, Tn = r.button`
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
`, En = r.span`
  display: inline;
`, Dn = r.span`
  font-weight: ${({ theme: e }) => e.fontWeight.bold};
  text-decoration: underline dotted;
  text-underline-offset: 2px;
`;
function On({ value: e, onValueChange: t, min: n, max: r, allowOpenEnded: i, openEndedLabel: l, edge: u = "start", placeholder: p = "YYYY-MM-DD", disabled: m, hasError: h, id: g, "aria-label": _, "aria-labelledby": v, className: y }) {
	let { fieldProps: b, status: x } = Y(), w = h ? "error" : x, [ne, T] = C(!1), [D, O] = C(""), [k, A] = C(!1), [j, M] = C(!1), [re, P] = C(!1), F = S(null), I = S(!1), L = S(!1), ie = S(!1), [R, z] = C(() => X(e) ?? Z()), [B, V] = C(() => X(e) ?? Z()), [H, U] = C(null), W = g ?? b.id, ae = W ? `${W}-parse-error` : void 0, G = W ? `${W}-calendar` : void 0;
	ee(() => {
		L.current && (L.current = !1, F.current?.select());
	}, [ne, D]), ee(() => {
		!re || !H || H.querySelector(`[data-date="${B.toString()}"]`)?.focus();
	}, [
		re,
		B,
		H
	]);
	function oe(t) {
		if (t) {
			let t = X(e) ?? Z();
			z(N(t)), V(t);
		} else P(!1);
		M(t);
	}
	function se() {
		P(!1), M(!1), L.current = !0, F.current?.focus();
	}
	function ce() {
		let e = F.current;
		if (!e) return;
		let t = Array.from(document.querySelectorAll("a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex=\"-1\"])")).filter((t) => t.offsetParent !== null || t === e);
		t[t.indexOf(e) + 1]?.focus();
	}
	let K = {
		edge: u,
		allowOpenEnded: i,
		min: n,
		max: r
	}, q = tn(K);
	function J(e) {
		let i = e.trim();
		if (!i) {
			A(!1), t?.(null);
			return;
		}
		let a = Rt(Ut(i));
		if (a && !Q(a, n, r)) {
			A(!1), t?.(a);
			return;
		}
		let o = nn(i, K);
		if (o.kind === "match") {
			A(!1), t?.(o.pick.value);
			return;
		}
		A(!0);
	}
	function le(e) {
		F.current?.focus(), A(!1), t?.(e.value), O(e.value ?? ""), I.current = !1, L.current = !0, P(!1), M(!1);
	}
	function ue(e) {
		let i = e.toString();
		Q(i, n, r) || (F.current?.focus(), A(!1), t?.(i), O(i), I.current = !1, L.current = !0, P(!1), M(!1));
	}
	function de(e) {
		V(e), (e.month !== R.month || e.year !== R.year) && z(N(e));
	}
	function fe(e) {
		if (e.key === "Tab" && !e.shiftKey) {
			e.preventDefault(), P(!1), M(!1), ce();
			return;
		}
		let t = {
			ArrowLeft: () => B.subtract({ days: 1 }),
			ArrowRight: () => B.add({ days: 1 }),
			ArrowUp: () => B.subtract({ weeks: 1 }),
			ArrowDown: () => B.add({ weeks: 1 }),
			PageUp: () => B.subtract({ months: 1 }),
			PageDown: () => B.add({ months: 1 }),
			Home: () => N(B)
		}[e.key];
		t && (e.preventDefault(), de(t()));
	}
	let pe = te(() => un(R), [R]), me = Bt(), he = e ?? null, ge = B.toString(), _e = i === !0 && e == null, ve = ne ? D : e || (_e && l ? l : "");
	return /* @__PURE__ */ s(a, { children: [/* @__PURE__ */ s(E.Root, {
		open: j,
		onOpenChange: oe,
		children: [/* @__PURE__ */ s(pn, {
			className: y,
			children: [/* @__PURE__ */ o(mn, {
				ref: F,
				$openEnded: _e && !ne,
				id: W,
				"aria-label": _,
				"aria-labelledby": v,
				"aria-keyshortcuts": "ArrowDown",
				"aria-invalid": k || b["aria-invalid"] || void 0,
				"aria-required": b["aria-required"],
				"aria-describedby": [k ? ae : void 0, b["aria-describedby"]].filter(Boolean).join(" ") || void 0,
				$status: k ? "error" : w,
				disabled: m,
				placeholder: p,
				value: ve,
				onMouseDown: () => {
					ie.current = document.activeElement !== F.current;
				},
				onMouseUp: (e) => {
					ie.current && (ie.current = !1, e.preventDefault());
				},
				onFocus: () => {
					T(!0), I.current = !1, L.current = !0, O(_e ? "" : e ?? "");
				},
				onChange: (e) => {
					let i = e.target.value;
					O(i), I.current = !0, k && A(!1);
					let a = Rt(Ut(i));
					if (a && !Q(a, n, r)) {
						if (t?.(a), j) {
							let e = X(a);
							e && de(e);
						}
						return;
					}
					let o = nn(i, K);
					if (o.kind === "match" && (t?.(o.pick.value), j && o.pick.value)) {
						let e = X(o.pick.value);
						e && de(e);
					}
				},
				onBlur: () => {
					T(!1), I.current && (I.current = !1, J(D));
				},
				onKeyDown: (e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						let n = nn(D, K);
						if (n.kind === "match") {
							A(!1), t?.(n.pick.value), O(n.pick.value ?? ""), I.current = !1, L.current = !0;
							return;
						}
						I.current && (I.current = !1, J(D));
						return;
					}
					if (e.key === "ArrowDown") {
						e.preventDefault(), j || oe(!0), P(!0);
						return;
					}
					e.key === "Tab" && j && (P(!1), M(!1));
				}
			}), /* @__PURE__ */ o(E.Trigger, {
				asChild: !0,
				children: /* @__PURE__ */ o(hn, {
					type: "button",
					disabled: m,
					tabIndex: -1,
					onMouseDown: (e) => e.preventDefault(),
					"aria-label": "Open calendar",
					"aria-expanded": j,
					"aria-controls": j ? G : void 0,
					children: /* @__PURE__ */ o(c, {})
				})
			})]
		}), /* @__PURE__ */ o(E.Portal, { children: /* @__PURE__ */ s(gn, {
			id: G,
			align: "start",
			sideOffset: 4,
			collisionPadding: 8,
			role: "dialog",
			"aria-label": "Choose date",
			onOpenAutoFocus: (e) => e.preventDefault(),
			onCloseAutoFocus: (e) => e.preventDefault(),
			onFocusOutside: (e) => e.preventDefault(),
			onPointerDownOutside: (e) => {
				e.target === F.current && e.preventDefault();
			},
			onEscapeKeyDown: () => {
				re && se();
			},
			children: [
				q.length > 0 && /* @__PURE__ */ o(wn, { children: q.map((e) => /* @__PURE__ */ o(Tn, {
					type: "button",
					"aria-label": e.accessibleName,
					onMouseDown: (e) => e.preventDefault(),
					onClick: () => le(e),
					children: /* @__PURE__ */ s(En, { children: [
						e.label.slice(0, e.markIndex),
						/* @__PURE__ */ o(Dn, { children: e.label[e.markIndex] }),
						e.label.slice(e.markIndex + 1)
					] })
				}, e.token)) }),
				/* @__PURE__ */ s(_n, { children: [
					/* @__PURE__ */ o(vn, {
						type: "button",
						"aria-label": "Previous month",
						onClick: () => z(R.subtract({ months: 1 })),
						children: /* @__PURE__ */ o(d, {})
					}),
					/* @__PURE__ */ s(yn, { children: [
						cn[R.month - 1],
						" ",
						R.year
					] }),
					/* @__PURE__ */ o(vn, {
						type: "button",
						"aria-label": "Next month",
						onClick: () => z(R.add({ months: 1 })),
						children: /* @__PURE__ */ o(f, {})
					})
				] }),
				/* @__PURE__ */ s(bn, {
					ref: U,
					onKeyDown: fe,
					children: [ln.map((e) => /* @__PURE__ */ o(xn, {
						"aria-hidden": "true",
						children: e
					}, e)), pe.map((e) => {
						let t = e.toString(), i = e.month === R.month && e.year === R.year, a = t === he;
						return /* @__PURE__ */ o(Sn, {
							type: "button",
							"data-date": t,
							tabIndex: t === ge ? 0 : -1,
							"aria-label": fn(e),
							"aria-pressed": a,
							"aria-current": t === me ? "date" : void 0,
							disabled: Q(t, n, r),
							$selected: a,
							$today: t === me,
							$outside: !i,
							onMouseDown: (e) => e.preventDefault(),
							onClick: () => ue(e),
							children: e.day
						}, t);
					})]
				})
			]
		}) })]
	}), k && /* @__PURE__ */ o(Cn, {
		id: ae,
		role: "alert",
		children: /^[a-z]/i.test(D.trim()) && q.length > 0 ? `Try ${q.map((e) => e.token).join(", ")}.` : `Enter a date like ${dn(me)}.`
	})] });
}
//#endregion
//#region src/components/DateRangePicker/PeriodChips.tsx
function kn({ min: e, max: t, disabled: n, "aria-label": r, onPick: i }) {
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
	return /* @__PURE__ */ o(An, {
		role: "toolbar",
		"aria-orientation": "horizontal",
		"aria-label": r,
		onKeyDown: f,
		children: l.map((e, t) => /* @__PURE__ */ o(jn, {
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
var An = r.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-shrink: 0;
  gap: ${({ theme: e }) => e.spacing.xs};
`, jn = r.button`
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
`, Mn = r.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.625rem;
`, Nn = r.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  flex: 1 1 20rem;
  min-width: 0;
`, Pn = r.div`
  flex: 1 1 0;
  min-width: 0;
`, Fn = r.span`
  flex-shrink: 0;
  color: ${({ theme: e }) => e.colors.muted};
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
`;
function In({ start: e, end: t, onStartChange: n, onEndChange: r, onRangeChange: i, periodsAriaLabel: a = "Set both dates", min: c, max: l, allowOpenEndedStart: u, allowOpenEndedEnd: d, startOpenEndedLabel: f, endOpenEndedLabel: p, startId: m, endId: h, startAriaLabel: g = "Start date", endAriaLabel: _ = "End date", disabled: v, hasError: y }) {
	return /* @__PURE__ */ s(Mn, { children: [/* @__PURE__ */ s(Nn, { children: [
		/* @__PURE__ */ o(Pn, { children: /* @__PURE__ */ o(On, {
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
		/* @__PURE__ */ o(Fn, {
			"aria-hidden": "true",
			children: "–"
		}),
		/* @__PURE__ */ o(Pn, { children: /* @__PURE__ */ o(On, {
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
	] }), i && /* @__PURE__ */ o(kn, {
		"aria-label": a,
		min: c,
		max: l,
		disabled: v,
		onPick: i
	})] });
}
//#endregion
//#region src/components/DescriptionList/index.tsx
var Ln = r.dl`
  display: grid;
  grid-template-columns: minmax(8rem, 12rem) 1fr;
  gap: ${({ theme: e }) => e.spacing.sm} ${({ theme: e }) => e.spacing.lg};
  margin: 0;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: ${({ theme: e }) => e.spacing.xs} 0;
  }
`, Rn = r.dt`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.muted};
  margin: 0;
`, zn = r.dd`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.ink};
  margin: 0;

  @media (max-width: 480px) {
    margin-bottom: ${({ theme: e }) => e.spacing.sm};
  }
`, Bn = L.Root, Vn = L.Trigger, Hn = n`
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
`, Un = r(L.Content)`
  min-width: 11rem;
  padding: ${({ theme: e }) => e.spacing.xs};
  background-color: ${({ theme: e }) => e.colors.canvas};
  border: 1px solid ${({ theme: e }) => e.colors.border};
  border-radius: ${({ theme: e }) => e.borderRadius.md};
  box-shadow: ${({ theme: e }) => e.boxShadow.pop};
  z-index: 60;
  animation: ${Hn} ${({ theme: e }) => e.motion.duration.fast}
    ${({ theme: e }) => e.motion.easing.enter};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
function Wn(e) {
	return /* @__PURE__ */ o(L.Portal, { children: /* @__PURE__ */ o(Un, {
		align: "end",
		sideOffset: 4,
		...e
	}) });
}
//#endregion
//#region src/components/DropdownMenu/items.tsx
var Gn = r(L.Item).withConfig({ shouldForwardProp: J("danger") })`
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
`, Kn = r(L.Separator)`
  height: 1px;
  margin: ${({ theme: e }) => e.spacing.xs} 0;
  background-color: ${({ theme: e }) => e.colors.border};
`, qn = r(L.Label)`
  padding: ${({ theme: e }) => e.spacing.xs} ${({ theme: e }) => e.spacing.md};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme: e }) => e.colors.subtle};
`;
//#endregion
//#region src/components/EmptyState/index.tsx
function Jn({ icon: e, title: t, description: n, action: r, className: i }) {
	return /* @__PURE__ */ s(Yn, {
		className: i,
		children: [
			e && /* @__PURE__ */ o(Xn, {
				"aria-hidden": "true",
				children: e
			}),
			/* @__PURE__ */ o(Zn, { children: t }),
			n && /* @__PURE__ */ o(Qn, { children: n }),
			r && /* @__PURE__ */ o($n, { children: r })
		]
	});
}
var Yn = r.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${({ theme: e }) => e.spacing.sm};
  padding: ${({ theme: e }) => e.spacing["3xl"]} ${({ theme: e }) => e.spacing.xl};
  color: ${({ theme: e }) => e.colors.muted};
`, Xn = r.div`
  color: ${({ theme: e }) => e.colors.subtle};
  margin-bottom: ${({ theme: e }) => e.spacing.xs};

  svg {
    width: 2.5rem;
    height: 2.5rem;
  }
`, Zn = r.p`
  font-family: ${({ theme: e }) => e.typography.fontFamily.display};
  font-size: ${({ theme: e }) => e.fontSize.lg};
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  color: ${({ theme: e }) => e.colors.ink};
  margin: 0;
`, Qn = r.p`
  font-size: ${({ theme: e }) => e.fontSize.sm};
  max-width: 40ch;
  line-height: ${({ theme: e }) => e.lineHeight.relaxed};
  margin: 0;
`, $n = r.div`
  margin-top: ${({ theme: e }) => e.spacing.md};
`, er = r(ie.Root)`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  font-weight: ${({ theme: e }) => e.fontWeight.medium};
  color: ${({ theme: e }) => e.colors.ink};
  cursor: default;
`, tr = r.input`
  ${ft}
  ${({ $status: e }) => dt(e)}
`, nr = v(function({ hasError: e, ...t }, n) {
	let { fieldProps: r, status: i } = Y();
	return /* @__PURE__ */ o(tr, {
		ref: n,
		$status: e ? "error" : i,
		...r,
		...t
	});
}), rr = r.p`
  font-size: ${({ theme: e }) => e.fontSize.xs};
  color: ${({ theme: e }) => e.colors.error};
  margin: 0;
`, ir = r.p.withConfig({ shouldForwardProp: J("status") })`
  font-size: ${({ theme: e }) => e.fontSize.xs};
  color: ${({ theme: e, status: t }) => e.colors[t]};
  margin: 0;
`, ar = r.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`, or = r.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`, sr = r(er)`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
`, cr = r.span`
  color: ${({ theme: e }) => e.colors.brand};
`, lr = r.p`
  font-size: ${({ theme: e }) => e.fontSize.xs};
  color: ${({ theme: e }) => e.colors.muted};
  margin: 0;
`;
function ur(e, t, n) {
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
function dr({ label: e, description: t, error: n, warning: r, success: i, required: a = !1, htmlFor: c, className: l, children: u }) {
	let d = x(), f = c ?? `field-${d}`, p = t ? `${f}-description` : void 0, m = ur(n, r, i), h = m?.status, g = h ? `${f}-status` : void 0, _ = te(() => ({
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
	return /* @__PURE__ */ o(tt.Provider, {
		value: _,
		children: /* @__PURE__ */ s(or, {
			className: l,
			children: [
				/* @__PURE__ */ s(sr, {
					htmlFor: f,
					children: [e, a && /* @__PURE__ */ o(cr, {
						"aria-hidden": "true",
						children: "*"
					})]
				}),
				u,
				t && /* @__PURE__ */ o(lr, {
					id: p,
					children: t
				}),
				m && /* @__PURE__ */ o(ir, {
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
var fr = n`
  from { opacity: 0; }
  to { opacity: 1; }
`, pr = n`
  from { opacity: 1; }
  to { opacity: 0; }
`, mr = n`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`, hr = n`
  from { transform: translateX(0); }
  to { transform: translateX(100%); }
`, gr = "400ms cubic-bezier(0.32, 0.72, 0, 1)", _r = "280ms cubic-bezier(0.55, 0, 1, 0.45)", vr = r(T.Overlay)`
  background-color: rgba(0, 0, 0, 0.45);
  position: fixed;
  inset: 0;
  z-index: 40;

  &[data-state='open'] {
    animation: ${fr} ${gr};
  }
  &[data-state='closed'] {
    animation: ${pr} ${_r} forwards;
    pointer-events: none;
  }
`, yr = r(T.Content)`
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
    animation: ${mr} ${gr};
    will-change: transform;
  }
  &[data-state='closed'] {
    animation: ${hr} ${_r} forwards;
    will-change: transform;
    pointer-events: none;
  }

  // Reduced motion: drop the slide transform, degrade to a brief opacity fade
  // (a full-height panel snapping in/out is disorienting; a fade is gentler).
  @media (prefers-reduced-motion: reduce) {
    &[data-state='open'] {
      animation: ${fr} ${({ theme: e }) => e.motion.duration.fast}
        ${({ theme: e }) => e.motion.easing.standard};
    }
    &[data-state='closed'] {
      animation: ${pr} ${({ theme: e }) => e.motion.duration.fast}
        ${({ theme: e }) => e.motion.easing.standard} forwards;
    }
  }

  &:focus {
    outline: none;
  }
`, br = r.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: ${({ theme: e }) => e.spacing.xl};
  border-bottom: 1px solid ${({ theme: e }) => e.colors.border};
  flex-shrink: 0;
`, xr = r.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
`, Sr = r.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ $padding: e, theme: t }) => e ?? t.spacing.xl};
`, Cr = r.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: ${({ theme: e }) => e.spacing.lg} ${({ theme: e }) => e.spacing.xl};
  border-top: 1px solid ${({ theme: e }) => e.colors.border};
  flex-shrink: 0;
`;
function wr({ open: e, onOpenChange: t, title: n, description: r, headerActions: i, children: a, footer: c, bodyPadding: l }) {
	return /* @__PURE__ */ o(T.Root, {
		open: e,
		onOpenChange: t,
		children: /* @__PURE__ */ s(T.Portal, { children: [/* @__PURE__ */ o(vr, {}), /* @__PURE__ */ s(yr, { children: [
			/* @__PURE__ */ s(br, { children: [/* @__PURE__ */ s(wt, { children: [/* @__PURE__ */ o(Tt, { children: n }), r ? /* @__PURE__ */ o(Et, { children: r }) : /* @__PURE__ */ o(T.Description, {
				"aria-hidden": !0,
				style: { display: "none" }
			})] }), /* @__PURE__ */ s(xr, { children: [i, /* @__PURE__ */ o(T.Close, {
				asChild: !0,
				children: /* @__PURE__ */ o(Dt, {
					"aria-label": "Close",
					children: /* @__PURE__ */ o(h, {
						width: 20,
						height: 20
					})
				})
			})] })] }),
			/* @__PURE__ */ o(Sr, {
				$padding: l,
				children: a
			}),
			c && /* @__PURE__ */ o(Cr, { children: c })
		] })] })
	});
}
//#endregion
//#region src/components/Drawer/drawerStore.ts
var Tr = globalThis.process, Er = Tr ? Tr.env?.NODE_ENV !== "production" : !1;
function Dr() {
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
			n++, Er && e.open && e.activeId !== null && e.activeId !== t && console.error(`[Drawer] Single-slot violation: "${e.config?.title}" is open and another drawer ("${i.title}") is opening over it. Only one DrawerSlot may be open at a time — the newcomer replaces the incumbent. (ADR-0068)`), r({
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
var Or = _(null), kr = Or.Provider;
function Ar() {
	let e = y(Or);
	if (e === null) throw Error("DrawerSlot must be used within a DrawerProvider");
	return e;
}
//#endregion
//#region src/components/Drawer/DrawerSlot.tsx
function jr({ open: e, title: t, description: n, headerActions: r, footer: i, bodyPadding: a, onOpenChange: o, children: s }) {
	let c = Ar(), l = x();
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
function Mr({ children: e }) {
	let [t] = C(Dr);
	return /* @__PURE__ */ s(kr, {
		value: t,
		children: [e, /* @__PURE__ */ o(Nr, { store: t })]
	});
}
function Nr({ store: e }) {
	let t = w(e.subscribe, e.getSnapshot), { config: n } = t;
	return /* @__PURE__ */ o(wr, {
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
var Pr = r.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
function Fr({ children: e }) {
	return /* @__PURE__ */ o(Pr, { children: e });
}
var Ir = r.section`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`, Lr = r.h3`
  font-family: ${({ theme: e }) => e.typography.fontFamily.mono};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme: e }) => e.colors.subtle};
  margin: 0;
`;
function Rr({ title: e, children: t }) {
	return /* @__PURE__ */ s(Ir, { children: [e != null && /* @__PURE__ */ o(Lr, { children: e }), t] });
}
var zr = r.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`, Br = r.span`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  color: ${({ theme: e }) => e.colors.muted};
`, Vr = r.div`
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.ink};
`;
function Hr({ label: e, children: t }) {
	return /* @__PURE__ */ s(zr, { children: [/* @__PURE__ */ o(Br, { children: e }), /* @__PURE__ */ o(Vr, { children: t })] });
}
//#endregion
//#region src/components/NumberInput/index.tsx
var Ur = r(nr)`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
  appearance: textfield;
`;
function Wr({ inputMode: e = "numeric", ...t }) {
	return /* @__PURE__ */ o(Ur, {
		type: "number",
		inputMode: e,
		...t
	});
}
//#endregion
//#region src/components/Pagination/index.tsx
function Gr({ page: e, pageCount: t, onPageChange: n, className: r }) {
	if (t <= 1) return null;
	let i = qr(e, t);
	return /* @__PURE__ */ s(Jr, {
		"aria-label": "Pagination",
		className: r,
		children: [
			/* @__PURE__ */ o(Xr, {
				type: "button",
				"aria-label": "Previous page",
				disabled: e <= 1,
				onClick: () => n(e - 1),
				children: /* @__PURE__ */ o(d, {
					width: 16,
					height: 16
				})
			}),
			i.map((t, r) => t === Kr ? /* @__PURE__ */ o(Qr, {
				"aria-hidden": "true",
				children: "…"
			}, `gap-${r}`) : /* @__PURE__ */ o(Zr, {
				type: "button",
				$active: t === e,
				"aria-current": t === e ? "page" : void 0,
				onClick: () => n(t),
				children: t
			}, t)),
			/* @__PURE__ */ o(Xr, {
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
var Kr = -1;
function qr(e, t) {
	let n = [.../* @__PURE__ */ new Set([
		1,
		t,
		e,
		e - 1,
		e + 1
	])].filter((e) => e >= 1 && e <= t).sort((e, t) => e - t), r = [], i = 0;
	for (let e of n) e - i > 1 && r.push(Kr), r.push(e), i = e;
	return r;
}
var Jr = r.nav`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme: e }) => e.spacing.xs};
`, Yr = "\n  min-width: 2rem;\n  height: 2rem;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 8px;\n  cursor: pointer;\n", Xr = r.button`
  ${Yr}
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
`, Zr = r.button`
  ${Yr}
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
`, Qr = r.span`
  min-width: 1.5rem;
  text-align: center;
  color: ${({ theme: e }) => e.colors.subtle};
`, $r = r.div`
  position: relative;
`, ei = r(nr)`
  padding-right: 2.75rem;
`, ti = r.button`
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
function ni() {
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
function ri() {
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
var ii = v(function(e, t) {
	let [n, r] = C(!1);
	return /* @__PURE__ */ s($r, { children: [/* @__PURE__ */ o(ei, {
		ref: t,
		type: n ? "text" : "password",
		...e
	}), /* @__PURE__ */ o(ti, {
		type: "button",
		"aria-label": n ? "Hide password" : "Show password",
		"aria-pressed": n,
		onClick: () => r((e) => !e),
		children: o(n ? ri : ni, {})
	})] });
}), ai = E.Root, oi = E.Trigger, si = E.Close, ci = n`
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
`, li = r(E.Content)`
  min-width: 14rem;
  max-width: min(24rem, calc(100vw - 2rem));
  padding: ${({ theme: e }) => e.spacing.lg};
  background-color: ${({ theme: e }) => e.colors.canvas};
  border: 1px solid ${({ theme: e }) => e.colors.border};
  border-radius: ${({ theme: e }) => e.borderRadius.md};
  box-shadow: ${({ theme: e }) => e.boxShadow.pop};
  z-index: 60;
  animation: ${ci} ${({ theme: e }) => e.motion.duration.fast}
    ${({ theme: e }) => e.motion.easing.enter};

  &:focus {
    outline: none;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`, ui = r(E.Arrow)`
  fill: ${({ theme: e }) => e.colors.canvas};
  stroke: ${({ theme: e }) => e.colors.border};
  stroke-width: 1px;
`;
function di(e) {
	let { children: t, ...n } = e;
	return /* @__PURE__ */ o(E.Portal, { children: /* @__PURE__ */ s(li, {
		align: "start",
		sideOffset: 6,
		...n,
		children: [t, /* @__PURE__ */ o(ui, {})]
	}) });
}
//#endregion
//#region src/components/Progress/index.tsx
var fi = r(R.Root)`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 0.5rem;
  border-radius: ${({ theme: e }) => e.borderRadius.full};
  background-color: ${({ theme: e }) => e.colors.surface2};
`, pi = r(R.Indicator)`
  height: 100%;
  background-color: ${({ theme: e }) => e.colors.accent};
  border-radius: inherit;
  transition: width ${({ theme: e }) => e.motion.duration.slow}
    ${({ theme: e }) => e.motion.easing.standard};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
function mi({ value: e, className: t, ...n }) {
	let r = e == null ? null : Math.max(0, Math.min(100, e));
	return /* @__PURE__ */ o(fi, {
		value: r,
		className: t,
		...n,
		children: /* @__PURE__ */ o(pi, { style: { width: `${r ?? 0}%` } })
	});
}
//#endregion
//#region src/components/RadioGroup/index.tsx
var hi = r(z.Root)`
  display: flex;
  flex-direction: ${({ $horizontal: e }) => e ? "row" : "column"};
  flex-wrap: ${({ $horizontal: e }) => e ? "wrap" : "nowrap"};
  gap: ${({ $horizontal: e }) => e ? "1.25rem" : "0.5rem"};
`, gi = r.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: ${({ $disabled: e }) => e ? "not-allowed" : "pointer"};
`, _i = r(z.Item)`
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
`, vi = r(z.Indicator)`
  display: inline-flex;
  &::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ theme: e }) => e.colors.accent};
  }
`, yi = r.label`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.ink};
  cursor: inherit;
`;
function bi({ value: e, onValueChange: t, options: n, disabled: r, id: i, name: a, orientation: c = "vertical", className: l, ...u }) {
	let { fieldProps: d } = Y(), f = x(), p = i ?? d.id ?? `radiogroup-${f}`;
	return /* @__PURE__ */ o(hi, {
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
			return /* @__PURE__ */ s(gi, {
				$disabled: r || e.disabled,
				children: [/* @__PURE__ */ o(_i, {
					value: e.value,
					id: t,
					disabled: e.disabled,
					children: /* @__PURE__ */ o(vi, {})
				}), /* @__PURE__ */ o(yi, {
					htmlFor: t,
					children: e.label
				})]
			}, e.value);
		})
	});
}
//#endregion
//#region src/components/Select/index.tsx
var xi = r(B.Trigger)`
  ${ft}
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  cursor: pointer;

  ${({ $status: e }) => dt(e)}

  &[data-disabled] {
    background-color: ${({ theme: e }) => e.colors.surface2};
    color: ${({ theme: e }) => e.colors.subtle};
    cursor: not-allowed;
  }

  &[data-placeholder] {
    color: ${({ theme: e }) => e.colors.subtle};
  }
`, Si = r(B.Content)`
  overflow: hidden;
  background-color: ${({ theme: e }) => e.colors.canvas};
  border: 1px solid ${({ theme: e }) => e.colors.border};
  border-radius: ${({ theme: e }) => e.borderRadius.md};
  box-shadow: ${({ theme: e }) => e.boxShadow.pop};
  z-index: 50;
`, Ci = r(B.Viewport)`
  padding: 0.25rem;
`, wi = r(B.Item)`
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
`, Ti = r.span`
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.muted};
  max-width: 18rem;
  white-space: normal;
`, Ei = r(B.ItemIndicator)`
  position: absolute;
  right: 0.5rem;
  display: inline-flex;
  align-items: center;
  color: ${({ theme: e }) => e.colors.accent};
`, Di = r(B.ScrollUpButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.5rem;
  color: ${({ theme: e }) => e.colors.muted};
  cursor: default;
`;
function Oi({ value: e, onValueChange: t, options: n, placeholder: r, disabled: i, hasError: a, id: c, className: d, tabIndex: f, "aria-label": p, "aria-labelledby": h }) {
	let { fieldProps: g, status: _ } = Y();
	return /* @__PURE__ */ s(B.Root, {
		value: e,
		onValueChange: t,
		disabled: i,
		children: [/* @__PURE__ */ s(xi, {
			className: d,
			$status: a ? "error" : _,
			id: c ?? g.id,
			tabIndex: f,
			"aria-label": p,
			"aria-labelledby": h,
			"aria-describedby": g["aria-describedby"],
			"aria-invalid": g["aria-invalid"],
			"aria-required": g["aria-required"],
			children: [/* @__PURE__ */ o(B.Value, { placeholder: r ?? "Select…" }), /* @__PURE__ */ o(B.Icon, { children: /* @__PURE__ */ o(u, { style: {
				width: "1rem",
				height: "1rem"
			} }) })]
		}), /* @__PURE__ */ o(B.Portal, { children: /* @__PURE__ */ s(Si, {
			position: "popper",
			sideOffset: 4,
			children: [
				/* @__PURE__ */ o(Di, {
					as: B.ScrollUpButton,
					children: /* @__PURE__ */ o(m, { style: {
						width: "1rem",
						height: "1rem"
					} })
				}),
				/* @__PURE__ */ o(Ci, { children: n.map((e) => /* @__PURE__ */ s(wi, {
					value: e.value,
					disabled: e.disabled,
					children: [
						/* @__PURE__ */ o(B.ItemText, { children: e.label }),
						e.hint && /* @__PURE__ */ o(Ti, { children: e.hint }),
						/* @__PURE__ */ o(Ei, { children: /* @__PURE__ */ o(l, { style: {
							width: "0.875rem",
							height: "0.875rem"
						} }) })
					]
				}, e.value)) }),
				/* @__PURE__ */ o(Di, {
					as: B.ScrollDownButton,
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
var ki = n`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
`, Ai = r.div.withConfig({ shouldForwardProp: J("radius") })`
  background-color: ${({ theme: e }) => e.colors.surface2};
  border-radius: ${({ theme: e, radius: t }) => t ?? e.borderRadius.sm};
  width: 100%;
  height: 1rem;
  animation: ${ki} 1.4s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`, ji = r(Ai)`
  border-radius: ${({ theme: e }) => e.borderRadius.full};
`, Mi = r(Ai)`
  height: 0.75rem;
`;
//#endregion
//#region src/components/Slider/index.tsx
function Ni({ value: e, onValueChange: t, min: n = 0, max: r = 100, step: i = 1, disabled: a, className: c, "aria-label": l }) {
	return /* @__PURE__ */ s(Pi, {
		value: [e],
		onValueChange: ([e]) => t(e),
		min: n,
		max: r,
		step: i,
		disabled: a,
		className: c,
		children: [/* @__PURE__ */ o(Fi, { children: /* @__PURE__ */ o(Ii, {}) }), /* @__PURE__ */ o(Li, { "aria-label": l })]
	});
}
var Pi = r(V.Root)`
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
`, Fi = r(V.Track)`
  position: relative;
  flex-grow: 1;
  height: 4px;
  border-radius: ${({ theme: e }) => e.borderRadius.full};
  background-color: ${({ theme: e }) => e.colors.surface2};
`, Ii = r(V.Range)`
  position: absolute;
  height: 100%;
  border-radius: inherit;
  background-color: ${({ theme: e }) => e.colors.accent};
`, Li = r(V.Thumb)`
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
`, Ri = {
	sm: "1rem",
	md: "1.5rem",
	lg: "2.25rem"
}, zi = n`
  to { transform: rotate(360deg); }
`, Bi = r.span.withConfig({ shouldForwardProp: J("size", "color") })`
  display: inline-block;
  width: ${({ size: e = "md" }) => Ri[e]};
  height: ${({ size: e = "md" }) => Ri[e]};
  border-radius: 50%;
  border: 2px solid ${({ theme: e }) => e.colors.borderStrong};
  border-top-color: ${({ theme: e, color: t }) => t ?? e.colors.accent};
  animation: ${zi} 0.6s linear infinite;
  flex-shrink: 0;

  @media (prefers-reduced-motion: reduce) {
    animation-duration: 1.6s;
  }
`;
//#endregion
//#region src/components/Stepper/index.tsx
function Vi({ steps: e, current: t, className: n }) {
	return /* @__PURE__ */ o(Hi, {
		className: n,
		"aria-label": "Progress",
		children: e.map((n, r) => {
			let i = r < t ? "done" : r === t ? "current" : "upcoming";
			return /* @__PURE__ */ s(g, { children: [/* @__PURE__ */ s(Ui, {
				"aria-current": i === "current" ? "step" : void 0,
				children: [/* @__PURE__ */ o(Wi, {
					$state: i,
					children: i === "done" ? /* @__PURE__ */ o(l, {
						width: 14,
						height: 14
					}) : r + 1
				}), /* @__PURE__ */ o(Gi, {
					$state: i,
					children: n.label
				})]
			}), r < e.length - 1 && /* @__PURE__ */ o(Ki, {
				$done: r < t,
				"aria-hidden": "true"
			})] }, r);
		})
	});
}
var Hi = r.ol`
  display: flex;
  align-items: center;
  gap: ${({ theme: e }) => e.spacing.sm};
  list-style: none;
  margin: 0;
  padding: 0;
`, Ui = r.li`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme: e }) => e.spacing.sm};
`, Wi = r.span`
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
`, Gi = r.span`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  font-weight: ${({ theme: e, $state: t }) => t === "current" ? e.fontWeight.semibold : e.fontWeight.normal};
  color: ${({ theme: e, $state: t }) => t === "upcoming" ? e.colors.subtle : e.colors.ink};
  white-space: nowrap;
`, Ki = r.span`
  width: 2rem;
  height: 2px;
  border-radius: 1px;
  background-color: ${({ theme: e, $done: t }) => t ? e.colors.accent : e.colors.border};
`, qi = r.label`
  display: inline-flex;
  align-items: center;
  cursor: ${({ $disabled: e }) => e ? "not-allowed" : "pointer"};
`, Ji = r.input`
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  margin: 0;
`, Yi = r.span`
  position: relative;
  display: inline-block;
  width: 34px;
  height: 20px;
  border-radius: ${({ theme: e }) => e.borderRadius.full};
  background: ${({ theme: e, $checked: t }) => t ? e.colors.accent : e.colors.borderStrong};
  opacity: ${({ $disabled: e }) => e ? .5 : 1};
  transition: background 120ms ease;

  ${Ji}:focus-visible + & {
    outline: 2px solid ${({ theme: e }) => e.colors.accent};
    outline-offset: 2px;
  }
`, Xi = r.span`
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
function Zi({ checked: e, onCheckedChange: t, disabled: n, ...r }) {
	return /* @__PURE__ */ s(qi, {
		$disabled: n,
		children: [/* @__PURE__ */ o(Ji, {
			type: "checkbox",
			role: "switch",
			checked: e,
			disabled: n,
			"aria-label": r["aria-label"],
			onChange: (e) => t(e.target.checked)
		}), /* @__PURE__ */ o(Yi, {
			$checked: e,
			$disabled: n,
			children: /* @__PURE__ */ o(Xi, { $checked: e })
		})]
	});
}
//#endregion
//#region src/components/Table/index.tsx
var Qi = r.div`
  overflow-x: auto;
`, $i = r.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme: e }) => e.fontSize.sm};
`, ea = r.thead`
  background-color: ${({ theme: e }) => e.colors.surface};
`, ta = r.tbody``, na = r.tr.withConfig({ shouldForwardProp: J("interactive") })`
  cursor: ${({ interactive: e }) => e ? "pointer" : "default"};
  ${({ interactive: e, theme: t }) => e && `&:hover { background-color: ${t.colors.surface}; }`}
`, ra = r.th.withConfig({ shouldForwardProp: J("noBorder", "align") })`
  padding: 0.75rem 1rem;
  text-align: ${({ align: e }) => e ?? "left"};
  font-family: ${({ theme: e }) => e.typography.fontFamily.mono};
  font-weight: ${({ theme: e }) => e.fontWeight.medium};
  color: ${({ theme: e }) => e.colors.muted};
  text-transform: uppercase;
  font-size: ${({ theme: e }) => e.fontSize.xs};
  letter-spacing: 0.05em;
  border-bottom: ${({ theme: e, noBorder: t }) => t ? "none" : `1px solid ${e.colors.border}`};
`, ia = r.td.withConfig({ shouldForwardProp: J("noBorder", "align", "mono", "muted") })`
  padding: 0.75rem 1rem;
  text-align: ${({ align: e }) => e ?? "left"};
  font-family: ${({ theme: e, mono: t }) => t ? e.typography.fontFamily.mono : e.typography.fontFamily.sans};
  font-size: ${({ theme: e, mono: t, muted: n }) => t || n ? e.fontSize.xs : e.fontSize.sm};
  color: ${({ theme: e, muted: t }) => t ? e.colors.muted : e.colors.ink};
  white-space: ${({ mono: e, muted: t }) => e || t ? "nowrap" : "normal"};
  vertical-align: middle;
  border-bottom: ${({ theme: e, noBorder: t }) => t ? "none" : `1px solid ${e.colors.border}`};
`, aa = r($i)`
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
`, oa = H.Root, sa = r(H.List)`
  display: flex;
  border-bottom: 1px solid ${({ theme: e }) => e.colors.border};
  gap: 0;
`, ca = r(H.Trigger)`
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
`, la = r(H.Content)`
  outline: none;

  &:focus-visible {
    box-shadow: 0 0 0 2px ${({ theme: e }) => e.colors.accentSoft};
    border-radius: ${({ theme: e }) => e.borderRadius.md};
  }
`, ua = {
	display: Pe,
	h1: Fe,
	h2: Ie,
	sectionTitle: Le,
	bodyLarge: Re,
	body: ze,
	bodySmall: Be,
	caption: Ve,
	overline: He,
	mono: Ue
}, da = {
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
}, fa = {
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
}, pa = r.p`
  margin: 0; /* layout owns spacing (ADR-0167 gap-first); no stray browser margins */
  ${({ $variant: e }) => ua[e]}
  color: ${({ theme: e, $tone: t }) => da[t](e)};
`;
function ma({ variant: e = "body", tone: t = "default", as: n, ...r }) {
	return /* @__PURE__ */ o(pa, {
		as: n ?? fa[e],
		$variant: e,
		$tone: t,
		...r
	});
}
//#endregion
//#region src/components/Textarea/index.tsx
var ha = r.textarea`
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

  ${({ $status: e }) => dt(e)}

  &:disabled {
    background-color: ${({ theme: e }) => e.colors.surface2};
    color: ${({ theme: e }) => e.colors.subtle};
    cursor: not-allowed;
    resize: none;
  }

  &::placeholder {
    color: ${({ theme: e }) => e.colors.subtle};
  }
`, ga = v(function({ hasError: e, ...t }, n) {
	let { fieldProps: r, status: i } = Y();
	return /* @__PURE__ */ o(ha, {
		ref: n,
		$status: e ? "error" : i,
		...r,
		...t
	});
}), _a = r(U.Root)`
  display: inline-flex;
  padding: 2px;
  gap: 2px;
  background-color: ${({ theme: e }) => e.colors.surface2};
  border-radius: ${({ theme: e }) => e.borderRadius.md};
`, va = r(U.Item)`
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
function ya({ content: e, children: t, side: n = "top", delayDuration: r = 200 }) {
	return /* @__PURE__ */ o(W.Provider, {
		delayDuration: r,
		children: /* @__PURE__ */ s(W.Root, { children: [/* @__PURE__ */ o(W.Trigger, {
			asChild: !0,
			children: t
		}), /* @__PURE__ */ o(W.Portal, { children: /* @__PURE__ */ s(xa, {
			side: n,
			sideOffset: 6,
			children: [e, /* @__PURE__ */ o(Sa, {})]
		}) })] })
	});
}
var ba = n`
  from { opacity: 0; transform: translateY(2px); }
  to { opacity: 1; transform: translateY(0); }
`, xa = r(W.Content)`
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
  animation: ${ba} ${({ theme: e }) => e.motion.duration.fast}
    ${({ theme: e }) => e.motion.easing.enter};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`, Sa = r(W.Arrow)`
  fill: ${({ theme: e }) => e.colors.ink};
`, Ca = {
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
}, wa = {
	xs: "0.75rem",
	sm: "0.8125rem",
	base: "0.9375rem",
	lg: "1.0625rem",
	xl: "1.25rem",
	"2xl": "1.5rem",
	"3xl": "1.875rem",
	"4xl": "2.25rem",
	"5xl": "3rem"
}, Ta = {
	normal: "400",
	medium: "500",
	semibold: "600",
	bold: "700",
	extrabold: "800",
	black: "900"
}, Ea = {
	flat: "1.1",
	snugTight: "1.17",
	tight: "1.25",
	snug: "1.375",
	normal: "1.5",
	relaxed: "1.625",
	loose: "2"
}, Da = {
	tight: "-0.03em",
	normal: "0",
	wide: "0.08em"
}, Oa = { fontFamily: {
	display: "'Archivo', sans-serif",
	sans: "'Public Sans', ui-sans-serif, system-ui, -apple-system, sans-serif",
	mono: "'IBM Plex Mono', ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace"
} }, ka = {
	none: "0",
	sm: "6px",
	md: "10px",
	lg: "14px",
	full: "9999px"
}, Aa = {
	none: "0",
	xs: "0.25rem",
	sm: "0.5rem",
	md: "0.75rem",
	lg: "1rem",
	xl: "1.5rem",
	"2xl": "2rem",
	"3xl": "3rem",
	"4xl": "4rem"
}, ja = {
	card: "0 1px 2px rgba(16, 17, 20, 0.06)",
	pop: "0 6px 24px rgba(16, 17, 20, 0.09)",
	none: "none"
}, Ma = {
	sm: "640px",
	md: "768px",
	lg: "1024px",
	xl: "1280px",
	"2xl": "1536px"
}, Na = {
	0: "0",
	10: "10",
	20: "20",
	30: "30",
	40: "40",
	50: "50",
	auto: "auto"
}, Pa = {
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
}, Fa = {
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
}, Ia = {
	fixed: Ca,
	scales: $,
	fontSize: wa,
	fontWeight: Ta,
	lineHeight: Ea,
	letterSpacing: Da,
	typography: Oa,
	borderRadius: ka,
	spacing: Aa,
	boxShadow: ja,
	screens: Ma,
	zIndex: Na,
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
}, La = {
	...Ia,
	colors: {
		...Ca,
		...Pa
	}
}, Ra = {
	...Ia,
	colors: {
		...Ca,
		...Fa
	}
}, za = {
	STANDARD: 112.5,
	LARGE: 125,
	EXTRA_LARGE: 137.5
};
//#endregion
export { Wt as ALWAYS, Kt as ANYTIME, ae as Accordion, q as AccordionContent, oe as AccordionHeader, G as AccordionItem, se as AccordionTrigger, ue as Alert, fe as AlertBody, de as AlertIcon, me as AlertMessage, pe as AlertTitle, _e as Avatar, we as Badge, Te as Breadcrumbs, Ne as Button, Je as Card, Ze as CardActions, Qe as CardBody, $e as CardFooter, Ye as CardHeader, Xe as CardTitle, ot as Checkbox, st as Chip, pt as Combobox, It as ConfirmDialog, On as DatePicker, In as DateRangePicker, zn as DescriptionDetails, Ln as DescriptionList, Rn as DescriptionTerm, wr as Drawer, Fr as DrawerBody, Hr as DrawerField, Mr as DrawerProvider, Rr as DrawerSection, jr as DrawerSlot, Bn as DropdownMenu, Wn as DropdownMenuContent, Gn as DropdownMenuItem, qn as DropdownMenuLabel, Kn as DropdownMenuSeparator, Vn as DropdownMenuTrigger, Jn as EmptyState, rr as ErrorText, ar as Field, dr as FormField, nr as Input, er as Label, Ot as Modal, Wr as NumberInput, Gt as ONGOING, Gr as Pagination, ii as PasswordInput, ai as Popover, si as PopoverClose, di as PopoverContent, oi as PopoverTrigger, mi as Progress, bi as RadioGroup, Oi as Select, Ai as Skeleton, ji as SkeletonCircle, Mi as SkeletonText, Ni as Slider, Bi as Spinner, ir as StatusMessage, Vi as Stepper, Zi as Switch, $i as Table, Qi as TableScroll, oa as Tabs, la as TabsContent, sa as TabsList, ca as TabsTrigger, ta as Tbody, ia as Td, ma as Text, ga as Textarea, ra as Th, ea as Thead, aa as Timeline, _a as ToggleGroup, va as ToggleGroupItem, ya as Tooltip, na as Tr, Re as bodyLargeType, Be as bodySmallType, ze as bodyType, Ve as captionType, Ke as cardHeadingType, Ra as darkTheme, Yt as dayOfInstant, Pe as displayType, qe as eyebrowType, za as fontSizeScale, Jt as formatDate, Zt as formatDateTime, Xt as formatInstant, X as fromISO, Fe as h1Type, Ie as h2Type, La as lightTheme, nn as matchQuickPick, Ue as monoType, Q as outOfRange, He as overlineType, We as pageTitleType, Ge as panelHeadingType, Ut as parseUserDate, tn as quickPicksFor, on as rangePicksFor, $t as resolveQuickPick, an as resolveRangePeriod, $ as scales, Le as sectionTitleType, Rt as toISO, Z as todayDate, zt as todayDateIn, Bt as todayISO };
