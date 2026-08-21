import * as e from "@radix-ui/react-accordion";
import { css as t, keyframes as n, styled as r } from "styled-components";
import * as i from "@radix-ui/react-avatar";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
import { CalendarDaysIcon as c, CheckIcon as l, ChevronDownIcon as u, ChevronLeftIcon as d, ChevronRightIcon as f, ChevronUpDownIcon as p, ChevronUpIcon as m, XMarkIcon as h } from "@heroicons/react/24/outline";
import { Fragment as g, createContext as ee, forwardRef as _, useContext as te, useEffect as v, useId as ne, useLayoutEffect as re, useMemo as ie, useRef as y, useState as b } from "react";
import * as x from "@radix-ui/react-checkbox";
import * as S from "@radix-ui/react-dialog";
import * as C from "@radix-ui/react-popover";
import { endOfMonth as w, endOfYear as T, fromDate as E, getDayOfWeek as D, getLocalTimeZone as O, getWeeksInMonth as k, parseDate as A, startOfMonth as j, startOfYear as M, toCalendarDate as N, today as P } from "@internationalized/date";
import * as F from "@radix-ui/react-dropdown-menu";
import * as I from "@radix-ui/react-label";
import * as L from "@radix-ui/react-progress";
import * as R from "@radix-ui/react-radio-group";
import * as z from "@radix-ui/react-select";
import * as B from "@radix-ui/react-slider";
import * as V from "@radix-ui/react-tabs";
import * as H from "@radix-ui/react-toggle-group";
import * as U from "@radix-ui/react-tooltip";
//#region src/components/Accordion/index.tsx
var W = e.Root, G = r(e.Item)`
  border-bottom: 1px solid ${({ theme: e }) => e.colors.border};

  &:first-child {
    border-top: 1px solid ${({ theme: e }) => e.colors.border};
  }
`, K = r(e.Header)`
  margin: 0;
`, ae = r(e.Trigger)`
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
`, oe = n`
  from { height: 0; }
  to { height: var(--radix-accordion-content-height); }
`, se = n`
  from { height: var(--radix-accordion-content-height); }
  to { height: 0; }
`, q = r(e.Content)`
  overflow: hidden;
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.muted};
  line-height: ${({ theme: e }) => e.lineHeight.relaxed};

  &[data-state='open'] {
    animation: ${oe} ${({ theme: e }) => e.motion.duration.base}
      ${({ theme: e }) => e.motion.easing.standard};
  }
  &[data-state='closed'] {
    animation: ${se} ${({ theme: e }) => e.motion.duration.fast}
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
}, ce = {
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
}, le = r.div.withConfig({ shouldForwardProp: J("variant") })`
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: ${({ theme: e }) => e.borderRadius.md};
  border-left: 3px solid;
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};

  ${({ variant: e = "info" }) => ce[e]}
`, ue = r.span`
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  padding-top: 1px;
  width: 1rem;
  height: 1rem;
`, de = r.div`
  flex: 1;
  min-width: 0;
`, fe = r.p`
  margin: 0 0 0.125rem;
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  font-size: ${({ theme: e }) => e.fontSize.sm};
`, pe = r.p`
  margin: 0;
  font-size: ${({ theme: e }) => e.fontSize.sm};
  opacity: 0.9;
`, me = {
	sm: "1.75rem",
	md: "2.25rem",
	lg: "3rem"
};
function he(e) {
	let t = e.trim().split(/\s+/).filter(Boolean);
	return t.length === 0 ? "?" : t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
}
function ge({ name: e, src: t, size: n = "md", className: r }) {
	return /* @__PURE__ */ s(_e, {
		$size: n,
		className: r,
		children: [t && /* @__PURE__ */ o(ve, {
			src: t,
			alt: e
		}), /* @__PURE__ */ o(ye, {
			delayMs: t ? 300 : 0,
			children: he(e)
		})]
	});
}
var _e = r(i.Root)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size: e }) => me[e]};
  height: ${({ $size: e }) => me[e]};
  border-radius: ${({ theme: e }) => e.borderRadius.full};
  overflow: hidden;
  flex-shrink: 0;
  user-select: none;
  vertical-align: middle;
`, ve = r(i.Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`, ye = r(i.Fallback)`
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
`, be = {
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
}, xe = {
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
}, Se = {
	...be,
	...xe
}, Ce = r.span.withConfig({ shouldForwardProp: J("variant") })`
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

  ${({ variant: e = "default" }) => Se[e]}
`;
//#endregion
//#region src/components/Breadcrumbs/index.tsx
function we({ items: e, className: t }) {
	return /* @__PURE__ */ o(Te, {
		"aria-label": "Breadcrumb",
		className: t,
		children: /* @__PURE__ */ o(Ee, { children: e.map((t, n) => {
			let r = n === e.length - 1;
			return /* @__PURE__ */ s(g, { children: [/* @__PURE__ */ o("li", { children: t.href && !r ? /* @__PURE__ */ o(De, {
				href: t.href,
				children: t.label
			}) : /* @__PURE__ */ o(Oe, {
				"aria-current": r ? "page" : void 0,
				children: t.label
			}) }), !r && /* @__PURE__ */ o(ke, {
				"aria-hidden": "true",
				children: /* @__PURE__ */ o(f, {
					width: 14,
					height: 14
				})
			})] }, n);
		}) })
	});
}
var Te = r.nav`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
`, Ee = r.ol`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme: e }) => e.spacing.xs};
  list-style: none;
  margin: 0;
  padding: 0;
`, De = r.a`
  color: ${({ theme: e }) => e.colors.muted};
  text-decoration: none;

  &:hover {
    color: ${({ theme: e }) => e.colors.ink};
    text-decoration: underline;
  }
`, Oe = r.span`
  color: ${({ theme: e }) => e.colors.ink};
  font-weight: ${({ theme: e }) => e.fontWeight.medium};
`, ke = r.span`
  display: inline-flex;
  color: ${({ theme: e }) => e.colors.subtle};
`, Ae = {
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
}, je = {
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
}, Me = r.button.withConfig({ shouldForwardProp: J("variant", "size") })`
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

  ${({ variant: e = "primary" }) => Ae[e]}
  ${({ size: e = "md" }) => je[e]}

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
`, Ne = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.display};
  font-style: italic;
  font-weight: ${({ theme: e }) => e.fontWeight.black};
  font-size: ${({ theme: e }) => e.fontSize["5xl"]};
  line-height: ${({ theme: e }) => e.lineHeight.flat};
  letter-spacing: ${({ theme: e }) => e.letterSpacing.tight};
`, Pe = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.display};
  font-weight: ${({ theme: e }) => e.fontWeight.extrabold};
  font-size: ${({ theme: e }) => e.fontSize["4xl"]};
  line-height: ${({ theme: e }) => e.lineHeight.snugTight};
`, Fe = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.display};
  font-weight: ${({ theme: e }) => e.fontWeight.bold};
  font-size: ${({ theme: e }) => e.fontSize["2xl"]};
  line-height: ${({ theme: e }) => e.lineHeight.tight};
`, Ie = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  line-height: ${({ theme: e }) => e.lineHeight.snug};
`, Le = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-weight: ${({ theme: e }) => e.fontWeight.normal};
  font-size: ${({ theme: e }) => e.fontSize.lg};
  line-height: ${({ theme: e }) => e.lineHeight.relaxed};
`, Re = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-weight: ${({ theme: e }) => e.fontWeight.normal};
  font-size: ${({ theme: e }) => e.fontSize.base};
  line-height: ${({ theme: e }) => e.lineHeight.relaxed};
`, ze = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-weight: ${({ theme: e }) => e.fontWeight.normal};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  line-height: ${({ theme: e }) => e.lineHeight.normal};
`, Be = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-weight: ${({ theme: e }) => e.fontWeight.normal};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  line-height: ${({ theme: e }) => e.lineHeight.normal};
`, Ve = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.mono};
  font-weight: ${({ theme: e }) => e.fontWeight.medium};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  line-height: ${({ theme: e }) => e.lineHeight.normal};
  letter-spacing: ${({ theme: e }) => e.letterSpacing.wide};
`, He = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.mono};
  font-weight: ${({ theme: e }) => e.fontWeight.normal};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  line-height: ${({ theme: e }) => e.lineHeight.normal};
`, Ue = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.display};
  font-weight: ${({ theme: e }) => e.fontWeight.bold};
  font-size: ${({ theme: e }) => e.fontSize["2xl"]};
`, We = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.display};
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  font-size: ${({ theme: e }) => e.fontSize.lg};
`, Ge = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.display};
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  font-size: ${({ theme: e }) => e.fontSize.base};
`, Ke = t`
  font-family: ${({ theme: e }) => e.typography.fontFamily.mono};
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  letter-spacing: 0.05em;
`, qe = r.div.withConfig({ shouldForwardProp: J("interactive") })`
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
`, Je = r.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme: e }) => e.spacing.lg};
  padding: ${({ theme: e }) => e.spacing.lg} ${({ theme: e }) => e.spacing.xl};
  border-bottom: 1px solid ${({ theme: e }) => e.colors.border};
`, Ye = r.h3`
  ${Ge}
  color: ${({ theme: e }) => e.colors.ink};
  margin: 0;
`, Xe = r.div`
  display: flex;
  align-items: center;
  gap: ${({ theme: e }) => e.spacing.sm};
  flex-shrink: 0;
`, Ze = r.div`
  padding: ${({ theme: e }) => e.spacing.xl};
`, Qe = r.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme: e }) => e.spacing.md};
  padding: ${({ theme: e }) => e.spacing.lg} ${({ theme: e }) => e.spacing.xl};
  border-top: 1px solid ${({ theme: e }) => e.colors.border};
  background-color: ${({ theme: e }) => e.colors.surface};
`, $e = {
	error: "errorSoft",
	warning: "warningSoft",
	success: "successSoft"
}, et = ee(null);
function Y() {
	let e = te(et);
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
var tt = r.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: ${({ $disabled: e }) => e ? "not-allowed" : "pointer"};
`, nt = r(x.Root)`
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
`, rt = r(x.Indicator)`
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
`, it = r.label`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.ink};
  cursor: inherit;
`;
function at({ checked: e, onCheckedChange: t, disabled: n, id: r, children: i, className: a, ...c }) {
	let { fieldProps: u } = Y(), d = ne(), f = r ?? u.id ?? `checkbox-${d}`;
	return /* @__PURE__ */ s(tt, {
		$disabled: n,
		className: a,
		children: [/* @__PURE__ */ o(nt, {
			id: f,
			checked: e,
			onCheckedChange: (e) => t?.(e === !0),
			disabled: n,
			"aria-label": c["aria-label"],
			"aria-describedby": u["aria-describedby"],
			"aria-invalid": u["aria-invalid"],
			"aria-required": u["aria-required"],
			children: /* @__PURE__ */ o(rt, { children: /* @__PURE__ */ o(l, {}) })
		}), i != null && /* @__PURE__ */ o(it, {
			htmlFor: f,
			children: i
		})]
	});
}
//#endregion
//#region src/components/Chip/index.tsx
function ot({ children: e, onRemove: t, removeLabel: n = "Remove", className: r }) {
	return /* @__PURE__ */ s(st, {
		className: r,
		children: [/* @__PURE__ */ o(ct, { children: e }), t && /* @__PURE__ */ o(lt, {
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
var st = r.span`
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
`, ct = r.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 0.125rem;
`, lt = r.button`
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
`, ut = (e) => t`
  ${e && t`
    border-color: ${({ theme: t }) => t.colors[e]};
    box-shadow: 0 0 0 3px ${({ theme: t }) => t.colors[$e[e]]};
  `}

  &:focus {
    border-color: ${({ theme: e }) => e.colors.accent};
    box-shadow: 0 0 0 3px ${({ theme: e }) => e.colors.accentSoft};
  }
`;
//#endregion
//#region src/components/Combobox/index.tsx
function dt({ options: e, value: t, onValueChange: n, multiple: r, values: i, onValuesChange: a, onSearch: c, loading: u, debounceMs: d = 250, creatable: f, onCreate: m, placeholder: h = "Search…", disabled: g, hasError: ee, id: _, className: te, "aria-label": re }) {
	let { fieldProps: x, status: S } = Y(), C = ee ? "error" : S, [w, T] = b(!1), [E, D] = b(""), [O, k] = b(0), A = y(null), j = y(null), M = y(null), N = !!c, P = i ?? [], F = (e) => r ? P.includes(e) : e === t, I = (t) => e.find((e) => e.value === t)?.label ?? t, L = r ? P.map((e) => ({
		value: e,
		label: I(e)
	})) : [], R = ie(() => {
		if (N) return e;
		let t = E.trim().toLowerCase();
		return t ? e.filter((e) => e.label.toLowerCase().includes(t)) : e;
	}, [
		e,
		E,
		N
	]), z = E.trim(), B = !!f && z !== "" && !R.some((e) => e.label.toLowerCase() === z.toLowerCase() || e.value.toLowerCase() === z.toLowerCase()), V = R.length, H = R.length + +!!B, U = H ? Math.min(O, H - 1) : 0, W = ne(), G = `${W}-listbox`, K = (e) => `${W}-option-${e}`;
	v(() => {
		if (!w) return;
		function e(e) {
			A.current && !A.current.contains(e.target) && T(!1);
		}
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [w]), v(() => {
		j.current?.querySelector(`[data-index="${U}"]`)?.scrollIntoView({ block: "nearest" });
	}, [U, w]);
	let ae = y(c);
	v(() => {
		ae.current = c;
	}), v(() => {
		if (!N || !w) return;
		let e = setTimeout(() => ae.current?.(E), d);
		return () => clearTimeout(e);
	}, [
		E,
		w,
		N,
		d
	]);
	function oe(e) {
		if (e) if (r) {
			let t = P.includes(e.value) ? P.filter((t) => t !== e.value) : [...P, e.value];
			a?.(t), D(""), k(0), T(!0), M.current?.focus();
		} else n?.(e.value), D(""), T(!1);
	}
	function se(e) {
		a?.(P.filter((t) => t !== e));
	}
	function q(e) {
		let t = e.trim();
		t && (m?.(t), r ? (P.includes(t) || a?.([...P, t]), D(""), k(0), T(!0), M.current?.focus()) : (n?.(t), D(""), T(!1)));
	}
	function J(e) {
		e.key === "ArrowDown" ? (e.preventDefault(), w ? k((e) => Math.min(e + 1, H - 1)) : T(!0)) : e.key === "ArrowUp" ? (e.preventDefault(), k((e) => Math.max(e - 1, 0))) : e.key === "Enter" ? w && (e.preventDefault(), B && U === V ? q(z) : oe(R[U])) : e.key === "Backspace" ? r && E === "" && P.length > 0 && se(P[P.length - 1]) : e.key === "Escape" && T(!1);
	}
	let ce = w ? E : t ? I(t) : "";
	return /* @__PURE__ */ s(ft, {
		ref: A,
		className: te,
		children: [
			r ? /* @__PURE__ */ s(mt, {
				$status: C,
				"data-disabled": g || void 0,
				onMouseDown: (e) => {
					e.target === e.currentTarget && (e.preventDefault(), M.current?.focus());
				},
				children: [L.map((e) => /* @__PURE__ */ o(ot, {
					onRemove: g ? void 0 : () => se(e.value),
					children: e.label
				}, e.value)), /* @__PURE__ */ o(ht, {
					ref: M,
					id: _ ?? x.id,
					role: "combobox",
					"aria-expanded": w,
					"aria-controls": w ? G : void 0,
					"aria-activedescendant": w && H ? K(U) : void 0,
					"aria-label": re,
					"aria-describedby": x["aria-describedby"],
					"aria-required": x["aria-required"],
					"aria-invalid": C === "error" || void 0,
					disabled: g,
					placeholder: L.length === 0 ? h : "",
					value: E,
					onFocus: () => T(!0),
					onChange: (e) => {
						D(e.target.value), k(0), T(!0);
					},
					onKeyDown: J
				})]
			}) : /* @__PURE__ */ o(pt, {
				ref: M,
				id: _ ?? x.id,
				role: "combobox",
				"aria-expanded": w,
				"aria-controls": w ? G : void 0,
				"aria-activedescendant": w && R.length ? K(U) : void 0,
				"aria-label": re,
				"aria-describedby": x["aria-describedby"],
				"aria-required": x["aria-required"],
				"aria-invalid": C === "error" || void 0,
				$status: C,
				disabled: g,
				placeholder: t && !w ? I(t) : h,
				value: ce,
				onFocus: () => T(!0),
				onChange: (e) => {
					D(e.target.value), k(0), T(!0);
				},
				onKeyDown: J
			}),
			/* @__PURE__ */ o(gt, {
				"aria-hidden": "true",
				children: /* @__PURE__ */ o(p, {
					width: 18,
					height: 18
				})
			}),
			w && /* @__PURE__ */ s(_t, {
				id: G,
				ref: j,
				role: "listbox",
				"aria-multiselectable": r || void 0,
				children: [
					u && /* @__PURE__ */ o(bt, {
						"aria-live": "polite",
						children: "Searching…"
					}),
					!u && R.length === 0 && !B && /* @__PURE__ */ o(yt, { children: "No matches" }),
					R.map((e, t) => /* @__PURE__ */ s(vt, {
						id: K(t),
						"data-index": t,
						role: "option",
						"aria-selected": F(e.value),
						$active: t === U,
						onMouseEnter: () => k(t),
						onMouseDown: (t) => {
							t.preventDefault(), oe(e);
						},
						children: [/* @__PURE__ */ o("span", { children: e.label }), F(e.value) && /* @__PURE__ */ o(l, {
							width: 16,
							height: 16
						})]
					}, e.value)),
					B && /* @__PURE__ */ o(vt, {
						id: K(V),
						"data-index": V,
						role: "option",
						"aria-selected": !1,
						$active: U === V,
						onMouseEnter: () => k(V),
						onMouseDown: (e) => {
							e.preventDefault(), q(z);
						},
						children: /* @__PURE__ */ s(xt, { children: [
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
var ft = r.div`
  position: relative;
  width: 100%;
`, pt = r.input`
  width: 100%;
  height: 44px;
  padding: 0 2.5rem 0 0.875rem;
  border: 1px solid ${({ theme: e }) => e.colors.borderStrong};
  border-radius: ${({ theme: e }) => e.borderRadius.md};
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.base};
  color: ${({ theme: e }) => e.colors.ink};
  background-color: ${({ theme: e }) => e.colors.canvas};
  outline: none;
  box-sizing: border-box;
  transition: border-color 150ms ease, box-shadow 150ms ease;

  ${({ $status: e }) => ut(e)}

  &:disabled {
    background-color: ${({ theme: e }) => e.colors.surface2};
    color: ${({ theme: e }) => e.colors.subtle};
    cursor: not-allowed;
  }
  &::placeholder {
    color: ${({ theme: e }) => e.colors.subtle};
  }
`, mt = r.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme: e }) => e.spacing.xs};
  width: 100%;
  min-height: 44px;
  padding: 0.3rem 2.5rem 0.3rem 0.5rem;
  border: 1px solid ${({ theme: e }) => e.colors.borderStrong};
  border-radius: ${({ theme: e }) => e.borderRadius.md};
  background-color: ${({ theme: e }) => e.colors.canvas};
  box-sizing: border-box;
  cursor: text;
  transition: border-color 150ms ease, box-shadow 150ms ease;

  ${({ $status: e, theme: n }) => e && t`
      border-color: ${n.colors[e]};
      box-shadow: 0 0 0 3px ${n.colors[$e[e]]};
    `}

  &:focus-within {
    border-color: ${({ theme: e }) => e.colors.accent};
    box-shadow: 0 0 0 3px ${({ theme: e }) => e.colors.accentSoft};
  }

  &[data-disabled] {
    background-color: ${({ theme: e }) => e.colors.surface2};
    cursor: not-allowed;
  }
`, ht = r.input`
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
`, gt = r.span`
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
`, _t = r.ul`
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
`, vt = r.li`
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
`, yt = r.li`
  padding: ${({ theme: e }) => e.spacing.md};
  text-align: center;
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.muted};
`, bt = r.li`
  padding: ${({ theme: e }) => e.spacing.md};
  text-align: center;
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.muted};
`, xt = r.span`
  color: ${({ theme: e }) => e.colors.muted};

  strong {
    color: ${({ theme: e }) => e.colors.ink};
    font-weight: ${({ theme: e }) => e.fontWeight.medium};
  }
`;
//#endregion
//#region src/components/Modal/index.tsx
function St({ open: e, onOpenChange: t, title: n, description: r, children: i, footer: a, width: c }) {
	return /* @__PURE__ */ o(S.Root, {
		open: e,
		onOpenChange: t,
		children: /* @__PURE__ */ s(S.Portal, { children: [/* @__PURE__ */ o(Tt, {}), /* @__PURE__ */ s(Et, {
			style: c ? { maxWidth: c } : void 0,
			children: [
				/* @__PURE__ */ s(Dt, { children: [/* @__PURE__ */ s(Ot, { children: [/* @__PURE__ */ o(kt, { children: n }), r ? /* @__PURE__ */ o(At, { children: r }) : /* @__PURE__ */ o(S.Description, {
					"aria-hidden": !0,
					style: { display: "none" }
				})] }), /* @__PURE__ */ o(S.Close, {
					asChild: !0,
					children: /* @__PURE__ */ o(jt, {
						"aria-label": "Close",
						children: /* @__PURE__ */ o(h, {
							width: 20,
							height: 20
						})
					})
				})] }),
				/* @__PURE__ */ o(Mt, { children: i }),
				a && /* @__PURE__ */ o(Nt, { children: a })
			]
		})] })
	});
}
var Ct = n`from { opacity: 0; } to { opacity: 1; }`, wt = n`
  from { opacity: 0; transform: translate(-50%, -48%) scale(0.98); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`, Tt = r(S.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.45);
  animation: ${Ct} ${({ theme: e }) => e.motion.duration.base} ${({ theme: e }) => e.motion.easing.enter};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`, Et = r(S.Content)`
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
  animation: ${wt} ${({ theme: e }) => e.motion.duration.base} ${({ theme: e }) => e.motion.easing.enter};

  &:focus {
    outline: none;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`, Dt = r.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme: e }) => e.spacing.lg};
  padding: ${({ theme: e }) => e.spacing.xl} ${({ theme: e }) => e.spacing.xl} ${({ theme: e }) => e.spacing.lg};
  flex-shrink: 0;
`, Ot = r.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme: e }) => e.spacing.xs};
  min-width: 0;
`, kt = r(S.Title)`
  font-family: ${({ theme: e }) => e.typography.fontFamily.display};
  font-size: ${({ theme: e }) => e.fontSize.lg};
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  color: ${({ theme: e }) => e.colors.ink};
  margin: 0;
`, At = r(S.Description)`
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.muted};
  margin: 0;
`, jt = r.button`
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
`, Mt = r.div`
  padding: 0 ${({ theme: e }) => e.spacing.xl};
  overflow-y: auto;
`, Nt = r.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme: e }) => e.spacing.md};
  padding: ${({ theme: e }) => e.spacing.xl};
  flex-shrink: 0;
`;
//#endregion
//#region src/components/ConfirmDialog/index.tsx
function Pt({ open: e, onOpenChange: t, title: n, description: r, children: i, confirmLabel: c = "Confirm", cancelLabel: l = "Cancel", confirmVariant: u = "primary", pending: d = !1, onConfirm: f }) {
	return /* @__PURE__ */ o(St, {
		open: e,
		onOpenChange: t,
		title: n,
		description: r,
		width: "26rem",
		footer: /* @__PURE__ */ s(a, { children: [/* @__PURE__ */ o(Me, {
			type: "button",
			variant: "secondary",
			size: "sm",
			disabled: d,
			onClick: () => t(!1),
			children: l
		}), /* @__PURE__ */ o(Me, {
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
var Ft = /^\d{4}-\d{2}-\d{2}$/;
function X(e) {
	if (!e || !Ft.test(e)) return null;
	try {
		return A(e);
	} catch {
		return null;
	}
}
function It(e) {
	return e ? e.toString() : null;
}
function Z() {
	return P(O());
}
function Lt(e) {
	return P(e);
}
function Rt() {
	return Z().toString();
}
function Q(e, t, n) {
	return !!t && e < t || !!n && e > n;
}
var zt = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/, Bt = /^(\d{4})(\d{2})(\d{2})$/;
function Vt(e) {
	let t = e.trim();
	if (!t) return null;
	if (Ft.test(t)) return X(t);
	let n = Bt.exec(t);
	if (n) {
		let [, e, t, r] = n;
		return X(`${e}-${t}-${r}`);
	}
	let r = zt.exec(t);
	if (r) {
		let [, e, t, n] = r;
		return X(`${n}-${e.padStart(2, "0")}-${t.padStart(2, "0")}`);
	}
	return null;
}
var Ht = "Always", Ut = "Ongoing", Wt = "Anytime", Gt = new Intl.DateTimeFormat("en-US", {
	month: "short",
	day: "numeric",
	year: "numeric",
	timeZone: "UTC"
});
function Kt(e, t = "—") {
	return e && X(e) ? e : t;
}
function qt(e) {
	if (!e || Ft.test(e)) return null;
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? null : N(E(t, O()));
}
function Jt(e, t = "—") {
	let n = qt(e);
	return n ? Gt.format(new Date(Date.UTC(n.year, n.month - 1, n.day))) : t;
}
function Yt(e, t, n = "—") {
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
var Xt = {
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
function Zt(e, t = "start") {
	let n = Z();
	switch (e) {
		case "today": return n.toString();
		case "ongoing": return null;
		case "month": return (t === "start" ? j(n.add({ months: 1 })) : w(n)).toString();
		case "year": return (t === "start" ? M(n.add({ years: 1 })) : T(n)).toString();
	}
}
function Qt(e, t, n) {
	return {
		token: e,
		label: t,
		markIndex: t.toLowerCase().indexOf(e),
		accessibleName: `${t}, type ${e[0]}`,
		value: Zt(e, n)
	};
}
function $t({ edge: e = "start", allowOpenEnded: t, min: n, max: r } = {}) {
	return Xt[e].filter(({ token: e }) => e !== "ongoing" || t).map(({ token: t, label: n }) => Qt(t, n, e)).filter((e) => e.value === null || !Q(e.value, n, r));
}
function en(e, t = {}) {
	let n = e.trim().toLowerCase();
	if (!n) return { kind: "none" };
	let { edge: r = "start", allowOpenEnded: i, min: a, max: o } = t, s = Xt[r].find(({ token: e }) => e.startsWith(n) && (e !== "ongoing" || i));
	if (!s) return { kind: "none" };
	let c = Qt(s.token, s.label, r);
	return c.value !== null && Q(c.value, a, o) ? {
		kind: "outOfRange",
		pick: c
	} : {
		kind: "match",
		pick: c
	};
}
var tn = [
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
function nn(e) {
	let t = Z(), n = e === "nextMonth" ? t.add({ months: 1 }) : e === "nextYear" ? t.add({ years: 1 }) : t, [r, i] = e === "thisMonth" || e === "nextMonth" ? [j(n), w(n)] : [M(n), T(n)];
	return {
		start: r.toString(),
		end: i.toString()
	};
}
function rn({ min: e, max: t } = {}) {
	return tn.map(({ period: e, label: t }) => ({
		period: e,
		label: t,
		...nn(e)
	})).filter(({ start: n, end: r }) => !Q(n, e, t) && !Q(r, e, t));
}
//#endregion
//#region src/components/DatePicker/index.tsx
var an = "en-US", on = [
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
], sn = [
	"Su",
	"Mo",
	"Tu",
	"We",
	"Th",
	"Fr",
	"Sa"
];
function cn(e) {
	let t = j(e), n = D(t, an), r = t.subtract({ days: n }), i = k(e, an);
	return Array.from({ length: i * 7 }, (e, t) => r.add({ days: t }));
}
function ln(e) {
	let [t, n, r] = e.split("-");
	return `${e}, ${t}${n}${r}, or ${n}/${r}/${t}`;
}
function un(e) {
	return `${on[e.month - 1]} ${e.day}, ${e.year}`;
}
var dn = r.div`
  position: relative;
  width: 100%;
`, fn = r.input`
  width: 100%;
  height: 44px;
  padding: 0 2.75rem 0 0.875rem;
  border: 1px solid ${({ theme: e }) => e.colors.borderStrong};
  border-radius: ${({ theme: e }) => e.borderRadius.md};
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.base};
  color: ${({ theme: e, $openEnded: t }) => t ? e.colors.muted : e.colors.ink};
  font-style: ${({ $openEnded: e }) => e ? "italic" : "normal"};
  background-color: ${({ theme: e }) => e.colors.canvas};
  outline: none;
  box-sizing: border-box;
  transition: border-color 150ms ease, box-shadow 150ms ease;

  ${({ $status: e }) => ut(e)}

  &:disabled {
    background-color: ${({ theme: e }) => e.colors.surface2};
    color: ${({ theme: e }) => e.colors.subtle};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${({ theme: e }) => e.colors.subtle};
  }
`, pn = r.button`
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
`, mn = r(C.Content)`
  background-color: ${({ theme: e }) => e.colors.canvas};
  border: 1px solid ${({ theme: e }) => e.colors.border};
  border-radius: ${({ theme: e }) => e.borderRadius.md};
  box-shadow: ${({ theme: e }) => e.boxShadow.pop};
  padding: 1rem;
  z-index: 50;
`, hn = r.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`, gn = r.button`
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
`, _n = r.span`
  font-family: ${({ theme: e }) => e.typography.fontFamily.display};
  font-size: ${({ theme: e }) => e.fontSize.base};
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  color: ${({ theme: e }) => e.colors.ink};
`, vn = r.div`
  display: grid;
  grid-template-columns: repeat(7, 2.5rem);
`, yn = r.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  font-family: ${({ theme: e }) => e.typography.fontFamily.mono};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  color: ${({ theme: e }) => e.colors.muted};
`, bn = r.button`
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
`, xn = r.p`
  margin: 0.375rem 0 0;
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  color: ${({ theme: e }) => e.colors.error};
`, Sn = r.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${({ theme: e }) => e.colors.border};
`, Cn = r.button`
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
`, wn = r.span`
  display: inline;
`, Tn = r.span`
  font-weight: ${({ theme: e }) => e.fontWeight.bold};
  text-decoration: underline dotted;
  text-underline-offset: 2px;
`;
function En({ value: e, onValueChange: t, min: n, max: r, allowOpenEnded: i, openEndedLabel: l, edge: u = "start", placeholder: p = "YYYY-MM-DD", disabled: m, hasError: h, id: g, "aria-label": ee, "aria-labelledby": _, className: te }) {
	let { fieldProps: v, status: ne } = Y(), x = h ? "error" : ne, [S, w] = b(!1), [T, E] = b(""), [D, O] = b(!1), [k, A] = b(!1), [M, N] = b(!1), P = y(null), F = y(!1), I = y(!1), L = y(!1), [R, z] = b(() => X(e) ?? Z()), [B, V] = b(() => X(e) ?? Z()), [H, U] = b(null), W = g ?? v.id, G = W ? `${W}-parse-error` : void 0, K = W ? `${W}-calendar` : void 0;
	re(() => {
		I.current && (I.current = !1, P.current?.select());
	}, [S, T]), re(() => {
		!M || !H || H.querySelector(`[data-date="${B.toString()}"]`)?.focus();
	}, [
		M,
		B,
		H
	]);
	function ae(t) {
		if (t) {
			let t = X(e) ?? Z();
			z(j(t)), V(t);
		} else N(!1);
		A(t);
	}
	function oe() {
		N(!1), A(!1), I.current = !0, P.current?.focus();
	}
	function se() {
		let e = P.current;
		if (!e) return;
		let t = Array.from(document.querySelectorAll("a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex=\"-1\"])")).filter((t) => t.offsetParent !== null || t === e);
		t[t.indexOf(e) + 1]?.focus();
	}
	let q = {
		edge: u,
		allowOpenEnded: i,
		min: n,
		max: r
	}, J = $t(q);
	function ce(e) {
		let i = e.trim();
		if (!i) {
			O(!1), t?.(null);
			return;
		}
		let a = It(Vt(i));
		if (a && !Q(a, n, r)) {
			O(!1), t?.(a);
			return;
		}
		let o = en(i, q);
		if (o.kind === "match") {
			O(!1), t?.(o.pick.value);
			return;
		}
		O(!0);
	}
	function le(e) {
		P.current?.focus(), O(!1), t?.(e.value), E(e.value ?? ""), F.current = !1, I.current = !0, N(!1), A(!1);
	}
	function ue(e) {
		let i = e.toString();
		Q(i, n, r) || (P.current?.focus(), O(!1), t?.(i), E(i), F.current = !1, I.current = !0, N(!1), A(!1));
	}
	function de(e) {
		V(e), (e.month !== R.month || e.year !== R.year) && z(j(e));
	}
	function fe(e) {
		if (e.key === "Tab" && !e.shiftKey) {
			e.preventDefault(), N(!1), A(!1), se();
			return;
		}
		let t = {
			ArrowLeft: () => B.subtract({ days: 1 }),
			ArrowRight: () => B.add({ days: 1 }),
			ArrowUp: () => B.subtract({ weeks: 1 }),
			ArrowDown: () => B.add({ weeks: 1 }),
			PageUp: () => B.subtract({ months: 1 }),
			PageDown: () => B.add({ months: 1 }),
			Home: () => j(B)
		}[e.key];
		t && (e.preventDefault(), de(t()));
	}
	let pe = ie(() => cn(R), [R]), me = Rt(), he = e ?? null, ge = B.toString(), _e = i === !0 && e == null, ve = S ? T : e || (_e && l ? l : "");
	return /* @__PURE__ */ s(a, { children: [/* @__PURE__ */ s(C.Root, {
		open: k,
		onOpenChange: ae,
		children: [/* @__PURE__ */ s(dn, {
			className: te,
			children: [/* @__PURE__ */ o(fn, {
				ref: P,
				$openEnded: _e && !S,
				id: W,
				"aria-label": ee,
				"aria-labelledby": _,
				"aria-keyshortcuts": "ArrowDown",
				"aria-invalid": D || v["aria-invalid"] || void 0,
				"aria-required": v["aria-required"],
				"aria-describedby": [D ? G : void 0, v["aria-describedby"]].filter(Boolean).join(" ") || void 0,
				$status: D ? "error" : x,
				disabled: m,
				placeholder: p,
				value: ve,
				onMouseDown: () => {
					L.current = document.activeElement !== P.current;
				},
				onMouseUp: (e) => {
					L.current && (L.current = !1, e.preventDefault());
				},
				onFocus: () => {
					w(!0), F.current = !1, I.current = !0, E(_e ? "" : e ?? "");
				},
				onChange: (e) => {
					let i = e.target.value;
					E(i), F.current = !0, D && O(!1);
					let a = It(Vt(i));
					if (a && !Q(a, n, r)) {
						if (t?.(a), k) {
							let e = X(a);
							e && de(e);
						}
						return;
					}
					let o = en(i, q);
					if (o.kind === "match" && (t?.(o.pick.value), k && o.pick.value)) {
						let e = X(o.pick.value);
						e && de(e);
					}
				},
				onBlur: () => {
					w(!1), F.current && (F.current = !1, ce(T));
				},
				onKeyDown: (e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						let n = en(T, q);
						if (n.kind === "match") {
							O(!1), t?.(n.pick.value), E(n.pick.value ?? ""), F.current = !1, I.current = !0;
							return;
						}
						F.current && (F.current = !1, ce(T));
						return;
					}
					if (e.key === "ArrowDown") {
						e.preventDefault(), k || ae(!0), N(!0);
						return;
					}
					e.key === "Tab" && k && (N(!1), A(!1));
				}
			}), /* @__PURE__ */ o(C.Trigger, {
				asChild: !0,
				children: /* @__PURE__ */ o(pn, {
					type: "button",
					disabled: m,
					tabIndex: -1,
					onMouseDown: (e) => e.preventDefault(),
					"aria-label": "Open calendar",
					"aria-expanded": k,
					"aria-controls": k ? K : void 0,
					children: /* @__PURE__ */ o(c, {})
				})
			})]
		}), /* @__PURE__ */ o(C.Portal, { children: /* @__PURE__ */ s(mn, {
			id: K,
			align: "start",
			sideOffset: 4,
			collisionPadding: 8,
			role: "dialog",
			"aria-label": "Choose date",
			onOpenAutoFocus: (e) => e.preventDefault(),
			onCloseAutoFocus: (e) => e.preventDefault(),
			onFocusOutside: (e) => e.preventDefault(),
			onPointerDownOutside: (e) => {
				e.target === P.current && e.preventDefault();
			},
			onEscapeKeyDown: () => {
				M && oe();
			},
			children: [
				J.length > 0 && /* @__PURE__ */ o(Sn, { children: J.map((e) => /* @__PURE__ */ o(Cn, {
					type: "button",
					"aria-label": e.accessibleName,
					onMouseDown: (e) => e.preventDefault(),
					onClick: () => le(e),
					children: /* @__PURE__ */ s(wn, { children: [
						e.label.slice(0, e.markIndex),
						/* @__PURE__ */ o(Tn, { children: e.label[e.markIndex] }),
						e.label.slice(e.markIndex + 1)
					] })
				}, e.token)) }),
				/* @__PURE__ */ s(hn, { children: [
					/* @__PURE__ */ o(gn, {
						type: "button",
						"aria-label": "Previous month",
						onClick: () => z(R.subtract({ months: 1 })),
						children: /* @__PURE__ */ o(d, {})
					}),
					/* @__PURE__ */ s(_n, { children: [
						on[R.month - 1],
						" ",
						R.year
					] }),
					/* @__PURE__ */ o(gn, {
						type: "button",
						"aria-label": "Next month",
						onClick: () => z(R.add({ months: 1 })),
						children: /* @__PURE__ */ o(f, {})
					})
				] }),
				/* @__PURE__ */ s(vn, {
					ref: U,
					onKeyDown: fe,
					children: [sn.map((e) => /* @__PURE__ */ o(yn, {
						"aria-hidden": "true",
						children: e
					}, e)), pe.map((e) => {
						let t = e.toString(), i = e.month === R.month && e.year === R.year, a = t === he;
						return /* @__PURE__ */ o(bn, {
							type: "button",
							"data-date": t,
							tabIndex: t === ge ? 0 : -1,
							"aria-label": un(e),
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
	}), D && /* @__PURE__ */ o(xn, {
		id: G,
		role: "alert",
		children: /^[a-z]/i.test(T.trim()) && J.length > 0 ? `Try ${J.map((e) => e.token).join(", ")}.` : `Enter a date like ${ln(me)}.`
	})] });
}
//#endregion
//#region src/components/DateRangePicker/PeriodChips.tsx
function Dn({ min: e, max: t, disabled: n, "aria-label": r, onPick: i }) {
	let [a, s] = b(0), c = y([]), l = rn({
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
	return /* @__PURE__ */ o(On, {
		role: "toolbar",
		"aria-orientation": "horizontal",
		"aria-label": r,
		onKeyDown: f,
		children: l.map((e, t) => /* @__PURE__ */ o(kn, {
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
var On = r.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-shrink: 0;
  gap: ${({ theme: e }) => e.spacing.xs};
`, kn = r.button`
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
`, An = r.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.625rem;
`, jn = r.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  flex: 1 1 20rem;
  min-width: 0;
`, Mn = r.div`
  flex: 1 1 0;
  min-width: 0;
`, Nn = r.span`
  flex-shrink: 0;
  color: ${({ theme: e }) => e.colors.muted};
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
`;
function Pn({ start: e, end: t, onStartChange: n, onEndChange: r, onRangeChange: i, periodsAriaLabel: a = "Set both dates", min: c, max: l, allowOpenEndedStart: u, allowOpenEndedEnd: d, startOpenEndedLabel: f, endOpenEndedLabel: p, startId: m, endId: h, startAriaLabel: g = "Start date", endAriaLabel: ee = "End date", disabled: _, hasError: te }) {
	return /* @__PURE__ */ s(An, { children: [/* @__PURE__ */ s(jn, { children: [
		/* @__PURE__ */ o(Mn, { children: /* @__PURE__ */ o(En, {
			edge: "start",
			id: m,
			"aria-label": g,
			value: e,
			onValueChange: n,
			min: c || void 0,
			max: t || l || void 0,
			allowOpenEnded: u,
			openEndedLabel: f,
			disabled: _,
			hasError: te
		}) }),
		/* @__PURE__ */ o(Nn, {
			"aria-hidden": "true",
			children: "–"
		}),
		/* @__PURE__ */ o(Mn, { children: /* @__PURE__ */ o(En, {
			edge: "end",
			id: h,
			"aria-label": ee,
			value: t,
			onValueChange: r,
			min: e || c || void 0,
			max: l || void 0,
			allowOpenEnded: d,
			openEndedLabel: p,
			disabled: _,
			hasError: te
		}) })
	] }), i && /* @__PURE__ */ o(Dn, {
		"aria-label": a,
		min: c,
		max: l,
		disabled: _,
		onPick: i
	})] });
}
//#endregion
//#region src/components/DescriptionList/index.tsx
var Fn = r.dl`
  display: grid;
  grid-template-columns: minmax(8rem, 12rem) 1fr;
  gap: ${({ theme: e }) => e.spacing.sm} ${({ theme: e }) => e.spacing.lg};
  margin: 0;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: ${({ theme: e }) => e.spacing.xs} 0;
  }
`, In = r.dt`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.muted};
  margin: 0;
`, Ln = r.dd`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.ink};
  margin: 0;

  @media (max-width: 480px) {
    margin-bottom: ${({ theme: e }) => e.spacing.sm};
  }
`, Rn = F.Root, zn = F.Trigger, Bn = n`
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
`, Vn = r(F.Content)`
  min-width: 11rem;
  padding: ${({ theme: e }) => e.spacing.xs};
  background-color: ${({ theme: e }) => e.colors.canvas};
  border: 1px solid ${({ theme: e }) => e.colors.border};
  border-radius: ${({ theme: e }) => e.borderRadius.md};
  box-shadow: ${({ theme: e }) => e.boxShadow.pop};
  z-index: 60;
  animation: ${Bn} ${({ theme: e }) => e.motion.duration.fast}
    ${({ theme: e }) => e.motion.easing.enter};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
function Hn(e) {
	return /* @__PURE__ */ o(F.Portal, { children: /* @__PURE__ */ o(Vn, {
		align: "end",
		sideOffset: 4,
		...e
	}) });
}
//#endregion
//#region src/components/DropdownMenu/items.tsx
var Un = r(F.Item).withConfig({ shouldForwardProp: J("danger") })`
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
`, Wn = r(F.Separator)`
  height: 1px;
  margin: ${({ theme: e }) => e.spacing.xs} 0;
  background-color: ${({ theme: e }) => e.colors.border};
`, Gn = r(F.Label)`
  padding: ${({ theme: e }) => e.spacing.xs} ${({ theme: e }) => e.spacing.md};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme: e }) => e.colors.subtle};
`;
//#endregion
//#region src/components/EmptyState/index.tsx
function Kn({ icon: e, title: t, description: n, action: r, className: i }) {
	return /* @__PURE__ */ s(qn, {
		className: i,
		children: [
			e && /* @__PURE__ */ o(Jn, {
				"aria-hidden": "true",
				children: e
			}),
			/* @__PURE__ */ o(Yn, { children: t }),
			n && /* @__PURE__ */ o(Xn, { children: n }),
			r && /* @__PURE__ */ o(Zn, { children: r })
		]
	});
}
var qn = r.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${({ theme: e }) => e.spacing.sm};
  padding: ${({ theme: e }) => e.spacing["3xl"]} ${({ theme: e }) => e.spacing.xl};
  color: ${({ theme: e }) => e.colors.muted};
`, Jn = r.div`
  color: ${({ theme: e }) => e.colors.subtle};
  margin-bottom: ${({ theme: e }) => e.spacing.xs};

  svg {
    width: 2.5rem;
    height: 2.5rem;
  }
`, Yn = r.p`
  font-family: ${({ theme: e }) => e.typography.fontFamily.display};
  font-size: ${({ theme: e }) => e.fontSize.lg};
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  color: ${({ theme: e }) => e.colors.ink};
  margin: 0;
`, Xn = r.p`
  font-size: ${({ theme: e }) => e.fontSize.sm};
  max-width: 40ch;
  line-height: ${({ theme: e }) => e.lineHeight.relaxed};
  margin: 0;
`, Zn = r.div`
  margin-top: ${({ theme: e }) => e.spacing.md};
`, Qn = r(I.Root)`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  font-weight: ${({ theme: e }) => e.fontWeight.medium};
  color: ${({ theme: e }) => e.colors.ink};
  cursor: default;
`, $n = r.input`
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
  transition: border-color ${({ theme: e }) => e.motion.duration.fast}
      ${({ theme: e }) => e.motion.easing.standard},
    box-shadow ${({ theme: e }) => e.motion.duration.fast} ${({ theme: e }) => e.motion.easing.standard};

  ${({ $status: e }) => ut(e)}

  &:disabled {
    background-color: ${({ theme: e }) => e.colors.surface2};
    color: ${({ theme: e }) => e.colors.subtle};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${({ theme: e }) => e.colors.subtle};
  }
`, er = _(function({ hasError: e, ...t }, n) {
	let { fieldProps: r, status: i } = Y();
	return /* @__PURE__ */ o($n, {
		ref: n,
		$status: e ? "error" : i,
		...r,
		...t
	});
}), tr = r.p`
  font-size: ${({ theme: e }) => e.fontSize.xs};
  color: ${({ theme: e }) => e.colors.error};
  margin: 0;
`, nr = r.p.withConfig({ shouldForwardProp: J("status") })`
  font-size: ${({ theme: e }) => e.fontSize.xs};
  color: ${({ theme: e, status: t }) => e.colors[t]};
  margin: 0;
`, rr = r.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`, ir = r.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`, ar = r(Qn)`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
`, or = r.span`
  color: ${({ theme: e }) => e.colors.brand};
`, sr = r.p`
  font-size: ${({ theme: e }) => e.fontSize.xs};
  color: ${({ theme: e }) => e.colors.muted};
  margin: 0;
`;
function cr(e, t, n) {
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
function lr({ label: e, description: t, error: n, warning: r, success: i, required: a = !1, htmlFor: c, className: l, children: u }) {
	let d = ne(), f = c ?? `field-${d}`, p = t ? `${f}-description` : void 0, m = cr(n, r, i), h = m?.status, g = h ? `${f}-status` : void 0, ee = ie(() => ({
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
	return /* @__PURE__ */ o(et.Provider, {
		value: ee,
		children: /* @__PURE__ */ s(ir, {
			className: l,
			children: [
				/* @__PURE__ */ s(ar, {
					htmlFor: f,
					children: [e, a && /* @__PURE__ */ o(or, {
						"aria-hidden": "true",
						children: "*"
					})]
				}),
				u,
				t && /* @__PURE__ */ o(sr, {
					id: p,
					children: t
				}),
				m && /* @__PURE__ */ o(nr, {
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
//#region src/components/NumberInput/index.tsx
var ur = r(er)`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
  appearance: textfield;
`;
function dr({ inputMode: e = "numeric", ...t }) {
	return /* @__PURE__ */ o(ur, {
		type: "number",
		inputMode: e,
		...t
	});
}
//#endregion
//#region src/components/Pagination/index.tsx
function fr({ page: e, pageCount: t, onPageChange: n, className: r }) {
	if (t <= 1) return null;
	let i = mr(e, t);
	return /* @__PURE__ */ s(hr, {
		"aria-label": "Pagination",
		className: r,
		children: [
			/* @__PURE__ */ o(_r, {
				type: "button",
				"aria-label": "Previous page",
				disabled: e <= 1,
				onClick: () => n(e - 1),
				children: /* @__PURE__ */ o(d, {
					width: 16,
					height: 16
				})
			}),
			i.map((t, r) => t === pr ? /* @__PURE__ */ o(yr, {
				"aria-hidden": "true",
				children: "…"
			}, `gap-${r}`) : /* @__PURE__ */ o(vr, {
				type: "button",
				$active: t === e,
				"aria-current": t === e ? "page" : void 0,
				onClick: () => n(t),
				children: t
			}, t)),
			/* @__PURE__ */ o(_r, {
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
var pr = -1;
function mr(e, t) {
	let n = [.../* @__PURE__ */ new Set([
		1,
		t,
		e,
		e - 1,
		e + 1
	])].filter((e) => e >= 1 && e <= t).sort((e, t) => e - t), r = [], i = 0;
	for (let e of n) e - i > 1 && r.push(pr), r.push(e), i = e;
	return r;
}
var hr = r.nav`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme: e }) => e.spacing.xs};
`, gr = "\n  min-width: 2rem;\n  height: 2rem;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 8px;\n  cursor: pointer;\n", _r = r.button`
  ${gr}
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
`, vr = r.button`
  ${gr}
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
`, yr = r.span`
  min-width: 1.5rem;
  text-align: center;
  color: ${({ theme: e }) => e.colors.subtle};
`, br = r.div`
  position: relative;
`, xr = r(er)`
  padding-right: 2.75rem;
`, Sr = r.button`
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
function Cr() {
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
function wr() {
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
var Tr = _(function(e, t) {
	let [n, r] = b(!1);
	return /* @__PURE__ */ s(br, { children: [/* @__PURE__ */ o(xr, {
		ref: t,
		type: n ? "text" : "password",
		...e
	}), /* @__PURE__ */ o(Sr, {
		type: "button",
		"aria-label": n ? "Hide password" : "Show password",
		"aria-pressed": n,
		onClick: () => r((e) => !e),
		children: o(n ? wr : Cr, {})
	})] });
}), Er = C.Root, Dr = C.Trigger, Or = C.Close, kr = n`
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
`, Ar = r(C.Content)`
  min-width: 14rem;
  max-width: min(24rem, calc(100vw - 2rem));
  padding: ${({ theme: e }) => e.spacing.lg};
  background-color: ${({ theme: e }) => e.colors.canvas};
  border: 1px solid ${({ theme: e }) => e.colors.border};
  border-radius: ${({ theme: e }) => e.borderRadius.md};
  box-shadow: ${({ theme: e }) => e.boxShadow.pop};
  z-index: 60;
  animation: ${kr} ${({ theme: e }) => e.motion.duration.fast}
    ${({ theme: e }) => e.motion.easing.enter};

  &:focus {
    outline: none;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`, jr = r(C.Arrow)`
  fill: ${({ theme: e }) => e.colors.canvas};
  stroke: ${({ theme: e }) => e.colors.border};
  stroke-width: 1px;
`;
function Mr(e) {
	let { children: t, ...n } = e;
	return /* @__PURE__ */ o(C.Portal, { children: /* @__PURE__ */ s(Ar, {
		align: "start",
		sideOffset: 6,
		...n,
		children: [t, /* @__PURE__ */ o(jr, {})]
	}) });
}
//#endregion
//#region src/components/Progress/index.tsx
var Nr = r(L.Root)`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 0.5rem;
  border-radius: ${({ theme: e }) => e.borderRadius.full};
  background-color: ${({ theme: e }) => e.colors.surface2};
`, Pr = r(L.Indicator)`
  height: 100%;
  background-color: ${({ theme: e }) => e.colors.accent};
  border-radius: inherit;
  transition: width ${({ theme: e }) => e.motion.duration.slow}
    ${({ theme: e }) => e.motion.easing.standard};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
function Fr({ value: e, className: t, ...n }) {
	let r = e == null ? null : Math.max(0, Math.min(100, e));
	return /* @__PURE__ */ o(Nr, {
		value: r,
		className: t,
		...n,
		children: /* @__PURE__ */ o(Pr, { style: { width: `${r ?? 0}%` } })
	});
}
//#endregion
//#region src/components/RadioGroup/index.tsx
var Ir = r(R.Root)`
  display: flex;
  flex-direction: ${({ $horizontal: e }) => e ? "row" : "column"};
  flex-wrap: ${({ $horizontal: e }) => e ? "wrap" : "nowrap"};
  gap: ${({ $horizontal: e }) => e ? "1.25rem" : "0.5rem"};
`, Lr = r.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: ${({ $disabled: e }) => e ? "not-allowed" : "pointer"};
`, Rr = r(R.Item)`
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
`, zr = r(R.Indicator)`
  display: inline-flex;
  &::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ theme: e }) => e.colors.accent};
  }
`, Br = r.label`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.ink};
  cursor: inherit;
`;
function Vr({ value: e, onValueChange: t, options: n, disabled: r, id: i, name: a, orientation: c = "vertical", className: l, ...u }) {
	let { fieldProps: d } = Y(), f = ne(), p = i ?? d.id ?? `radiogroup-${f}`;
	return /* @__PURE__ */ o(Ir, {
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
			return /* @__PURE__ */ s(Lr, {
				$disabled: r || e.disabled,
				children: [/* @__PURE__ */ o(Rr, {
					value: e.value,
					id: t,
					disabled: e.disabled,
					children: /* @__PURE__ */ o(zr, {})
				}), /* @__PURE__ */ o(Br, {
					htmlFor: t,
					children: e.label
				})]
			}, e.value);
		})
	});
}
//#endregion
//#region src/components/Select/index.tsx
var Hr = r(z.Trigger)`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 44px;
  padding: 0 0.875rem;
  border: 1px solid ${({ theme: e }) => e.colors.borderStrong};
  border-radius: ${({ theme: e }) => e.borderRadius.md};
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.base};
  color: ${({ theme: e }) => e.colors.ink};
  background-color: ${({ theme: e }) => e.colors.canvas};
  cursor: pointer;
  outline: none;
  gap: 0.5rem;
  box-sizing: border-box;
  transition: border-color 150ms ease, box-shadow 150ms ease;

  ${({ $status: e }) => ut(e)}

  &[data-disabled] {
    background-color: ${({ theme: e }) => e.colors.surface2};
    color: ${({ theme: e }) => e.colors.subtle};
    cursor: not-allowed;
  }

  &[data-placeholder] {
    color: ${({ theme: e }) => e.colors.subtle};
  }
`, Ur = r(z.Content)`
  overflow: hidden;
  background-color: ${({ theme: e }) => e.colors.canvas};
  border: 1px solid ${({ theme: e }) => e.colors.border};
  border-radius: ${({ theme: e }) => e.borderRadius.md};
  box-shadow: ${({ theme: e }) => e.boxShadow.pop};
  z-index: 50;
`, Wr = r(z.Viewport)`
  padding: 0.25rem;
`, Gr = r(z.Item)`
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
`, Kr = r.span`
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.muted};
  max-width: 18rem;
  white-space: normal;
`, qr = r(z.ItemIndicator)`
  position: absolute;
  right: 0.5rem;
  display: inline-flex;
  align-items: center;
  color: ${({ theme: e }) => e.colors.accent};
`, Jr = r(z.ScrollUpButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.5rem;
  color: ${({ theme: e }) => e.colors.muted};
  cursor: default;
`;
function Yr({ value: e, onValueChange: t, options: n, placeholder: r, disabled: i, hasError: a, id: c, className: d, tabIndex: f, "aria-label": p, "aria-labelledby": h }) {
	let { fieldProps: g, status: ee } = Y();
	return /* @__PURE__ */ s(z.Root, {
		value: e,
		onValueChange: t,
		disabled: i,
		children: [/* @__PURE__ */ s(Hr, {
			className: d,
			$status: a ? "error" : ee,
			id: c ?? g.id,
			tabIndex: f,
			"aria-label": p,
			"aria-labelledby": h,
			"aria-describedby": g["aria-describedby"],
			"aria-invalid": g["aria-invalid"],
			"aria-required": g["aria-required"],
			children: [/* @__PURE__ */ o(z.Value, { placeholder: r ?? "Select…" }), /* @__PURE__ */ o(z.Icon, { children: /* @__PURE__ */ o(u, { style: {
				width: "1rem",
				height: "1rem"
			} }) })]
		}), /* @__PURE__ */ o(z.Portal, { children: /* @__PURE__ */ s(Ur, {
			position: "popper",
			sideOffset: 4,
			children: [
				/* @__PURE__ */ o(Jr, {
					as: z.ScrollUpButton,
					children: /* @__PURE__ */ o(m, { style: {
						width: "1rem",
						height: "1rem"
					} })
				}),
				/* @__PURE__ */ o(Wr, { children: n.map((e) => /* @__PURE__ */ s(Gr, {
					value: e.value,
					disabled: e.disabled,
					children: [
						/* @__PURE__ */ o(z.ItemText, { children: e.label }),
						e.hint && /* @__PURE__ */ o(Kr, { children: e.hint }),
						/* @__PURE__ */ o(qr, { children: /* @__PURE__ */ o(l, { style: {
							width: "0.875rem",
							height: "0.875rem"
						} }) })
					]
				}, e.value)) }),
				/* @__PURE__ */ o(Jr, {
					as: z.ScrollDownButton,
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
var Xr = n`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
`, Zr = r.div.withConfig({ shouldForwardProp: J("radius") })`
  background-color: ${({ theme: e }) => e.colors.surface2};
  border-radius: ${({ theme: e, radius: t }) => t ?? e.borderRadius.sm};
  width: 100%;
  height: 1rem;
  animation: ${Xr} 1.4s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`, Qr = r(Zr)`
  border-radius: ${({ theme: e }) => e.borderRadius.full};
`, $r = r(Zr)`
  height: 0.75rem;
`;
//#endregion
//#region src/components/Slider/index.tsx
function ei({ value: e, onValueChange: t, min: n = 0, max: r = 100, step: i = 1, disabled: a, className: c, "aria-label": l }) {
	return /* @__PURE__ */ s(ti, {
		value: [e],
		onValueChange: ([e]) => t(e),
		min: n,
		max: r,
		step: i,
		disabled: a,
		className: c,
		children: [/* @__PURE__ */ o(ni, { children: /* @__PURE__ */ o(ri, {}) }), /* @__PURE__ */ o(ii, { "aria-label": l })]
	});
}
var ti = r(B.Root)`
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
`, ni = r(B.Track)`
  position: relative;
  flex-grow: 1;
  height: 4px;
  border-radius: ${({ theme: e }) => e.borderRadius.full};
  background-color: ${({ theme: e }) => e.colors.surface2};
`, ri = r(B.Range)`
  position: absolute;
  height: 100%;
  border-radius: inherit;
  background-color: ${({ theme: e }) => e.colors.accent};
`, ii = r(B.Thumb)`
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
`, ai = {
	sm: "1rem",
	md: "1.5rem",
	lg: "2.25rem"
}, oi = n`
  to { transform: rotate(360deg); }
`, si = r.span.withConfig({ shouldForwardProp: J("size", "color") })`
  display: inline-block;
  width: ${({ size: e = "md" }) => ai[e]};
  height: ${({ size: e = "md" }) => ai[e]};
  border-radius: 50%;
  border: 2px solid ${({ theme: e }) => e.colors.borderStrong};
  border-top-color: ${({ theme: e, color: t }) => t ?? e.colors.accent};
  animation: ${oi} 0.6s linear infinite;
  flex-shrink: 0;

  @media (prefers-reduced-motion: reduce) {
    animation-duration: 1.6s;
  }
`;
//#endregion
//#region src/components/Stepper/index.tsx
function ci({ steps: e, current: t, className: n }) {
	return /* @__PURE__ */ o(li, {
		className: n,
		"aria-label": "Progress",
		children: e.map((n, r) => {
			let i = r < t ? "done" : r === t ? "current" : "upcoming";
			return /* @__PURE__ */ s(g, { children: [/* @__PURE__ */ s(ui, {
				"aria-current": i === "current" ? "step" : void 0,
				children: [/* @__PURE__ */ o(di, {
					$state: i,
					children: i === "done" ? /* @__PURE__ */ o(l, {
						width: 14,
						height: 14
					}) : r + 1
				}), /* @__PURE__ */ o(fi, {
					$state: i,
					children: n.label
				})]
			}), r < e.length - 1 && /* @__PURE__ */ o(pi, {
				$done: r < t,
				"aria-hidden": "true"
			})] }, r);
		})
	});
}
var li = r.ol`
  display: flex;
  align-items: center;
  gap: ${({ theme: e }) => e.spacing.sm};
  list-style: none;
  margin: 0;
  padding: 0;
`, ui = r.li`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme: e }) => e.spacing.sm};
`, di = r.span`
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
`, fi = r.span`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  font-weight: ${({ theme: e, $state: t }) => t === "current" ? e.fontWeight.semibold : e.fontWeight.normal};
  color: ${({ theme: e, $state: t }) => t === "upcoming" ? e.colors.subtle : e.colors.ink};
  white-space: nowrap;
`, pi = r.span`
  width: 2rem;
  height: 2px;
  border-radius: 1px;
  background-color: ${({ theme: e, $done: t }) => t ? e.colors.accent : e.colors.border};
`, mi = r.label`
  display: inline-flex;
  align-items: center;
  cursor: ${({ $disabled: e }) => e ? "not-allowed" : "pointer"};
`, hi = r.input`
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  margin: 0;
`, gi = r.span`
  position: relative;
  display: inline-block;
  width: 34px;
  height: 20px;
  border-radius: ${({ theme: e }) => e.borderRadius.full};
  background: ${({ theme: e, $checked: t }) => t ? e.colors.accent : e.colors.borderStrong};
  opacity: ${({ $disabled: e }) => e ? .5 : 1};
  transition: background 120ms ease;

  ${hi}:focus-visible + & {
    outline: 2px solid ${({ theme: e }) => e.colors.accent};
    outline-offset: 2px;
  }
`, _i = r.span`
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
function vi({ checked: e, onCheckedChange: t, disabled: n, ...r }) {
	return /* @__PURE__ */ s(mi, {
		$disabled: n,
		children: [/* @__PURE__ */ o(hi, {
			type: "checkbox",
			role: "switch",
			checked: e,
			disabled: n,
			"aria-label": r["aria-label"],
			onChange: (e) => t(e.target.checked)
		}), /* @__PURE__ */ o(gi, {
			$checked: e,
			$disabled: n,
			children: /* @__PURE__ */ o(_i, { $checked: e })
		})]
	});
}
//#endregion
//#region src/components/Table/index.tsx
var yi = r.div`
  overflow-x: auto;
`, bi = r.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme: e }) => e.fontSize.sm};
`, xi = r.thead`
  background-color: ${({ theme: e }) => e.colors.surface};
`, Si = r.tbody``, Ci = r.tr.withConfig({ shouldForwardProp: J("interactive") })`
  cursor: ${({ interactive: e }) => e ? "pointer" : "default"};
  ${({ interactive: e, theme: t }) => e && `&:hover { background-color: ${t.colors.surface}; }`}
`, wi = r.th.withConfig({ shouldForwardProp: J("noBorder", "align") })`
  padding: 0.75rem 1rem;
  text-align: ${({ align: e }) => e ?? "left"};
  font-family: ${({ theme: e }) => e.typography.fontFamily.mono};
  font-weight: ${({ theme: e }) => e.fontWeight.medium};
  color: ${({ theme: e }) => e.colors.muted};
  text-transform: uppercase;
  font-size: ${({ theme: e }) => e.fontSize.xs};
  letter-spacing: 0.05em;
  border-bottom: ${({ theme: e, noBorder: t }) => t ? "none" : `1px solid ${e.colors.border}`};
`, Ti = r.td.withConfig({ shouldForwardProp: J("noBorder", "align", "mono", "muted") })`
  padding: 0.75rem 1rem;
  text-align: ${({ align: e }) => e ?? "left"};
  font-family: ${({ theme: e, mono: t }) => t ? e.typography.fontFamily.mono : e.typography.fontFamily.sans};
  font-size: ${({ theme: e, mono: t, muted: n }) => t || n ? e.fontSize.xs : e.fontSize.sm};
  color: ${({ theme: e, muted: t }) => t ? e.colors.muted : e.colors.ink};
  white-space: ${({ mono: e, muted: t }) => e || t ? "nowrap" : "normal"};
  vertical-align: middle;
  border-bottom: ${({ theme: e, noBorder: t }) => t ? "none" : `1px solid ${e.colors.border}`};
`, Ei = r(bi)`
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
`, Di = V.Root, Oi = r(V.List)`
  display: flex;
  border-bottom: 1px solid ${({ theme: e }) => e.colors.border};
  gap: 0;
`, ki = r(V.Trigger)`
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
`, Ai = r(V.Content)`
  outline: none;

  &:focus-visible {
    box-shadow: 0 0 0 2px ${({ theme: e }) => e.colors.accentSoft};
    border-radius: ${({ theme: e }) => e.borderRadius.md};
  }
`, ji = {
	display: Ne,
	h1: Pe,
	h2: Fe,
	sectionTitle: Ie,
	bodyLarge: Le,
	body: Re,
	bodySmall: ze,
	caption: Be,
	overline: Ve,
	mono: He
}, Mi = {
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
}, Ni = {
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
}, Pi = r.p`
  margin: 0; /* layout owns spacing (ADR-0167 gap-first); no stray browser margins */
  ${({ $variant: e }) => ji[e]}
  color: ${({ theme: e, $tone: t }) => Mi[t](e)};
`;
function Fi({ variant: e = "body", tone: t = "default", as: n, ...r }) {
	return /* @__PURE__ */ o(Pi, {
		as: n ?? Ni[e],
		$variant: e,
		$tone: t,
		...r
	});
}
//#endregion
//#region src/components/Textarea/index.tsx
var Ii = r.textarea`
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

  ${({ $status: e }) => ut(e)}

  &:disabled {
    background-color: ${({ theme: e }) => e.colors.surface2};
    color: ${({ theme: e }) => e.colors.subtle};
    cursor: not-allowed;
    resize: none;
  }

  &::placeholder {
    color: ${({ theme: e }) => e.colors.subtle};
  }
`, Li = _(function({ hasError: e, ...t }, n) {
	let { fieldProps: r, status: i } = Y();
	return /* @__PURE__ */ o(Ii, {
		ref: n,
		$status: e ? "error" : i,
		...r,
		...t
	});
}), Ri = r(H.Root)`
  display: inline-flex;
  padding: 2px;
  gap: 2px;
  background-color: ${({ theme: e }) => e.colors.surface2};
  border-radius: ${({ theme: e }) => e.borderRadius.md};
`, zi = r(H.Item)`
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
function Bi({ content: e, children: t, side: n = "top", delayDuration: r = 200 }) {
	return /* @__PURE__ */ o(U.Provider, {
		delayDuration: r,
		children: /* @__PURE__ */ s(U.Root, { children: [/* @__PURE__ */ o(U.Trigger, {
			asChild: !0,
			children: t
		}), /* @__PURE__ */ o(U.Portal, { children: /* @__PURE__ */ s(Hi, {
			side: n,
			sideOffset: 6,
			children: [e, /* @__PURE__ */ o(Ui, {})]
		}) })] })
	});
}
var Vi = n`
  from { opacity: 0; transform: translateY(2px); }
  to { opacity: 1; transform: translateY(0); }
`, Hi = r(U.Content)`
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
  animation: ${Vi} ${({ theme: e }) => e.motion.duration.fast}
    ${({ theme: e }) => e.motion.easing.enter};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`, Ui = r(U.Arrow)`
  fill: ${({ theme: e }) => e.colors.ink};
`, Wi = {
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
}, Gi = {
	xs: "0.75rem",
	sm: "0.8125rem",
	base: "0.9375rem",
	lg: "1.0625rem",
	xl: "1.25rem",
	"2xl": "1.5rem",
	"3xl": "1.875rem",
	"4xl": "2.25rem",
	"5xl": "3rem"
}, Ki = {
	normal: "400",
	medium: "500",
	semibold: "600",
	bold: "700",
	extrabold: "800",
	black: "900"
}, qi = {
	flat: "1.1",
	snugTight: "1.17",
	tight: "1.25",
	snug: "1.375",
	normal: "1.5",
	relaxed: "1.625",
	loose: "2"
}, Ji = {
	tight: "-0.03em",
	normal: "0",
	wide: "0.08em"
}, Yi = { fontFamily: {
	display: "'Archivo', sans-serif",
	sans: "'Public Sans', ui-sans-serif, system-ui, -apple-system, sans-serif",
	mono: "'IBM Plex Mono', ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace"
} }, Xi = {
	none: "0",
	sm: "6px",
	md: "10px",
	lg: "14px",
	full: "9999px"
}, Zi = {
	none: "0",
	xs: "0.25rem",
	sm: "0.5rem",
	md: "0.75rem",
	lg: "1rem",
	xl: "1.5rem",
	"2xl": "2rem",
	"3xl": "3rem",
	"4xl": "4rem"
}, Qi = {
	card: "0 1px 2px rgba(16, 17, 20, 0.06)",
	pop: "0 6px 24px rgba(16, 17, 20, 0.09)",
	none: "none"
}, $i = {
	sm: "640px",
	md: "768px",
	lg: "1024px",
	xl: "1280px",
	"2xl": "1536px"
}, ea = {
	0: "0",
	10: "10",
	20: "20",
	30: "30",
	40: "40",
	50: "50",
	auto: "auto"
}, ta = {
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
}, na = {
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
}, ra = {
	fixed: Wi,
	scales: $,
	fontSize: Gi,
	fontWeight: Ki,
	lineHeight: qi,
	letterSpacing: Ji,
	typography: Yi,
	borderRadius: Xi,
	spacing: Zi,
	boxShadow: Qi,
	screens: $i,
	zIndex: ea,
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
}, ia = {
	...ra,
	colors: {
		...Wi,
		...ta
	}
}, aa = {
	...ra,
	colors: {
		...Wi,
		...na
	}
}, oa = {
	STANDARD: 112.5,
	LARGE: 125,
	EXTRA_LARGE: 137.5
};
//#endregion
export { Ht as ALWAYS, Wt as ANYTIME, W as Accordion, q as AccordionContent, K as AccordionHeader, G as AccordionItem, ae as AccordionTrigger, le as Alert, de as AlertBody, ue as AlertIcon, pe as AlertMessage, fe as AlertTitle, ge as Avatar, Ce as Badge, we as Breadcrumbs, Me as Button, qe as Card, Xe as CardActions, Ze as CardBody, Qe as CardFooter, Je as CardHeader, Ye as CardTitle, at as Checkbox, ot as Chip, dt as Combobox, Pt as ConfirmDialog, En as DatePicker, Pn as DateRangePicker, Ln as DescriptionDetails, Fn as DescriptionList, In as DescriptionTerm, Rn as DropdownMenu, Hn as DropdownMenuContent, Un as DropdownMenuItem, Gn as DropdownMenuLabel, Wn as DropdownMenuSeparator, zn as DropdownMenuTrigger, Kn as EmptyState, tr as ErrorText, rr as Field, lr as FormField, er as Input, Qn as Label, St as Modal, dr as NumberInput, Ut as ONGOING, fr as Pagination, Tr as PasswordInput, Er as Popover, Or as PopoverClose, Mr as PopoverContent, Dr as PopoverTrigger, Fr as Progress, Vr as RadioGroup, Yr as Select, Zr as Skeleton, Qr as SkeletonCircle, $r as SkeletonText, ei as Slider, si as Spinner, nr as StatusMessage, ci as Stepper, vi as Switch, bi as Table, yi as TableScroll, Di as Tabs, Ai as TabsContent, Oi as TabsList, ki as TabsTrigger, Si as Tbody, Ti as Td, Fi as Text, Li as Textarea, wi as Th, xi as Thead, Ei as Timeline, Ri as ToggleGroup, zi as ToggleGroupItem, Bi as Tooltip, Ci as Tr, Le as bodyLargeType, ze as bodySmallType, Re as bodyType, Be as captionType, Ge as cardHeadingType, aa as darkTheme, qt as dayOfInstant, Ne as displayType, Ke as eyebrowType, oa as fontSizeScale, Kt as formatDate, Yt as formatDateTime, Jt as formatInstant, X as fromISO, Pe as h1Type, Fe as h2Type, ia as lightTheme, en as matchQuickPick, He as monoType, Q as outOfRange, Ve as overlineType, Ue as pageTitleType, We as panelHeadingType, Vt as parseUserDate, $t as quickPicksFor, rn as rangePicksFor, Zt as resolveQuickPick, nn as resolveRangePeriod, $ as scales, Ie as sectionTitleType, It as toISO, Z as todayDate, Lt as todayDateIn, Rt as todayISO };
