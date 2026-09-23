import * as e from "@radix-ui/react-accordion";
import { css as t, keyframes as n, styled as r } from "styled-components";
import * as i from "@radix-ui/react-avatar";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
import { CalendarDaysIcon as c, CheckIcon as l, ChevronDownIcon as u, ChevronLeftIcon as d, ChevronRightIcon as f, ChevronUpDownIcon as p, ChevronUpIcon as m, XMarkIcon as h } from "@heroicons/react/24/outline";
import g, { Fragment as _, createContext as v, forwardRef as y, useCallback as b, useContext as x, useEffect as S, useId as C, useLayoutEffect as w, useMemo as T, useRef as E, useState as D, useSyncExternalStore as O } from "react";
import * as k from "@radix-ui/react-checkbox";
import * as A from "@radix-ui/react-dialog";
import * as j from "@radix-ui/react-popover";
import { endOfMonth as M, endOfYear as N, fromDate as P, getDayOfWeek as F, getLocalTimeZone as I, getWeeksInMonth as L, parseDate as R, startOfMonth as z, startOfYear as ee, toCalendarDate as te, today as B } from "@internationalized/date";
import * as V from "@radix-ui/react-dropdown-menu";
import * as H from "@radix-ui/react-label";
import U from "react-dom";
import * as W from "@radix-ui/react-progress";
import * as G from "@radix-ui/react-radio-group";
import * as K from "@radix-ui/react-select";
import * as ne from "@radix-ui/react-slider";
import * as q from "@radix-ui/react-tabs";
import * as re from "@radix-ui/react-toggle-group";
import * as J from "@radix-ui/react-tooltip";
//#region src/components/Accordion/index.tsx
var ie = e.Root, ae = r(e.Item)`
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
`, le = n`
  from { height: var(--radix-accordion-content-height); }
  to { height: 0; }
`, ue = r(e.Content)`
  overflow: hidden;
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.muted};
  line-height: ${({ theme: e }) => e.lineHeight.relaxed};

  &[data-state='open'] {
    animation: ${ce} ${({ theme: e }) => e.motion.duration.base}
      ${({ theme: e }) => e.motion.easing.standard};
  }
  &[data-state='closed'] {
    animation: ${le} ${({ theme: e }) => e.motion.duration.fast}
      ${({ theme: e }) => e.motion.easing.exit};
  }

  /* Inner padding so the animated height wraps the content cleanly. */
  & > * {
    padding: 0 ${({ theme: e }) => e.spacing.md} ${({ theme: e }) => e.spacing.lg};
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`, Y = (...e) => {
	let t = new Set(e);
	return (e) => !t.has(e);
}, de = {
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
}, fe = r.div.withConfig({ shouldForwardProp: Y("variant") })`
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: ${({ theme: e }) => e.borderRadius.md};
  border-left: 3px solid;
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};

  ${({ variant: e = "info" }) => de[e]}
`, pe = r.span`
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  padding-top: 1px;
  width: 1rem;
  height: 1rem;
`, me = r.div`
  flex: 1;
  min-width: 0;
`, he = r.p`
  margin: 0 0 0.125rem;
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  font-size: ${({ theme: e }) => e.fontSize.sm};
`, X = r.p`
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
	success: t`
    background-color: ${({ theme: e }) => e.colors.successSoft};
    color: ${({ theme: e }) => e.colors.success};
    border: none;
  `,
	warning: t`
    background-color: ${({ theme: e }) => e.colors.warningSoft};
    color: ${({ theme: e }) => e.colors.warning};
    border: none;
  `,
	error: t`
    background-color: ${({ theme: e }) => e.colors.errorSoft};
    color: ${({ theme: e }) => e.colors.error};
    border: none;
  `,
	neutral: t`
    background-color: ${({ theme: e }) => e.colors.surface2};
    color: ${({ theme: e }) => e.colors.muted};
    border: none;
  `,
	"outline-info": t`
    background-color: transparent;
    color: ${({ theme: e }) => e.colors.info};
    border: 1px solid ${({ theme: e }) => e.colors.borderStrong};
  `,
	"outline-success": t`
    background-color: transparent;
    color: ${({ theme: e }) => e.colors.success};
    border: 1px solid ${({ theme: e }) => e.colors.borderStrong};
  `,
	"outline-neutral": t`
    background-color: transparent;
    color: ${({ theme: e }) => e.colors.muted};
    border: 1px solid ${({ theme: e }) => e.colors.borderStrong};
  `
}, Ce = r.span.withConfig({ shouldForwardProp: Y("variant") })`
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

  ${({ variant: e = "outline-neutral" }) => Se[e]}
`;
//#endregion
//#region src/components/Breadcrumbs/index.tsx
function we({ items: e, className: t }) {
	return /* @__PURE__ */ o(Te, {
		"aria-label": "Breadcrumb",
		className: t,
		children: /* @__PURE__ */ o(Ee, { children: e.map((t, n) => {
			let r = n === e.length - 1;
			return /* @__PURE__ */ s(_, { children: [/* @__PURE__ */ o("li", { children: t.href && !r ? /* @__PURE__ */ o(De, {
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
}, Me = r.button.withConfig({ shouldForwardProp: Y("variant", "size") })`
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
`, qe = r.div.withConfig({ shouldForwardProp: Y("interactive") })`
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
}, et = v(null);
function tt() {
	let e = x(et);
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
`, rt = r(k.Root)`
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
  transition: background ${({ theme: e }) => e.motion.duration.micro} ease, border-color ${({ theme: e }) => e.motion.duration.micro} ease;

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
`, it = r(k.Indicator)`
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
	let { fieldProps: u } = tt(), d = C(), f = r ?? u.id ?? `checkbox-${d}`;
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
    box-shadow: 0 0 0 3px ${({ theme: t }) => t.colors[$e[e]]};
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
function pt(e) {
	let { options: t, onSearch: n, loading: r, debounceMs: i = 250, creatable: a, onCreate: c, placeholder: l = "Search…", disabled: u, hasError: d, id: f, className: m, "aria-label": h } = e, g = e.multiple ? {
		multiple: !0,
		values: e.values,
		onValuesChange: e.onValuesChange
	} : {
		multiple: !1,
		value: e.value,
		onValueChange: e.onValueChange
	}, { fieldProps: _, status: v } = tt(), y = d ? "error" : v, [b, x] = D(!1), [S, w] = D(""), [O, k] = D(0), A = E(null), j = E(null), M = E(null), N = !!n, P = g.multiple ? g.values : [], F = (e) => g.multiple ? P.includes(e) : e === g.value, I = (e) => t.find((t) => t.value === e)?.label ?? e, L = g.multiple ? P.map((e) => ({
		value: e,
		label: I(e)
	})) : [], R = T(() => {
		if (N) return t;
		let e = S.trim().toLowerCase();
		return e ? t.filter((t) => t.label.toLowerCase().includes(e)) : t;
	}, [
		t,
		S,
		N
	]), z = S.trim(), ee = !!a && z !== "" && !R.some((e) => e.label.toLowerCase() === z.toLowerCase() || e.value.toLowerCase() === z.toLowerCase()), te = R.length, B = R.length + +!!ee, V = B ? Math.min(O, B - 1) : 0, H = C(), U = `${H}-listbox`, W = (e) => `${H}-option-${e}`;
	mt({
		open: b,
		setOpen: x,
		rootRef: A,
		listRef: j,
		activeIndex: V,
		isAsync: N,
		query: S,
		debounceMs: i,
		onSearch: n
	});
	function G(e, t) {
		g.multiple ? (g.onValuesChange(e(P)), w(""), k(0), x(!0), M.current?.focus()) : (g.onValueChange?.(t), w(""), x(!1));
	}
	function K(e) {
		e && G((t) => t.includes(e.value) ? t.filter((t) => t !== e.value) : [...t, e.value], e.value);
	}
	function ne(e) {
		g.multiple && g.onValuesChange(P.filter((t) => t !== e));
	}
	function q(e) {
		let t = e.trim();
		t && (c?.(t), G((e) => e.includes(t) ? e : [...e, t], t));
	}
	function re(e) {
		e.key === "ArrowDown" ? (e.preventDefault(), b ? k((e) => Math.min(e + 1, B - 1)) : x(!0)) : e.key === "ArrowUp" ? (e.preventDefault(), k((e) => Math.max(e - 1, 0))) : e.key === "Enter" ? b && (e.preventDefault(), ee && V === te ? q(z) : K(R[V])) : e.key === "Backspace" ? g.multiple && S === "" && P.length > 0 && ne(P[P.length - 1]) : e.key === "Escape" && x(!1);
	}
	let J = b ? S : !g.multiple && g.value ? I(g.value) : "";
	return /* @__PURE__ */ s(gt, {
		ref: A,
		className: m,
		children: [
			g.multiple ? /* @__PURE__ */ s(vt, {
				$status: y,
				"data-disabled": u || void 0,
				onMouseDown: (e) => {
					e.target === e.currentTarget && (e.preventDefault(), M.current?.focus());
				},
				children: [L.map((e) => /* @__PURE__ */ o(st, {
					onRemove: u ? void 0 : () => ne(e.value),
					children: e.label
				}, e.value)), /* @__PURE__ */ o(yt, {
					ref: M,
					id: f ?? _.id,
					role: "combobox",
					"aria-expanded": b,
					"aria-controls": b ? U : void 0,
					"aria-activedescendant": b && B ? W(V) : void 0,
					"aria-label": h,
					"aria-describedby": _["aria-describedby"],
					"aria-required": _["aria-required"],
					"aria-invalid": y === "error" || void 0,
					disabled: u,
					placeholder: L.length === 0 ? l : "",
					value: S,
					onFocus: () => x(!0),
					onChange: (e) => {
						w(e.target.value), k(0), x(!0);
					},
					onKeyDown: re
				})]
			}) : /* @__PURE__ */ o(_t, {
				ref: M,
				id: f ?? _.id,
				role: "combobox",
				"aria-expanded": b,
				"aria-controls": b ? U : void 0,
				"aria-activedescendant": b && R.length ? W(V) : void 0,
				"aria-label": h,
				"aria-describedby": _["aria-describedby"],
				"aria-required": _["aria-required"],
				"aria-invalid": y === "error" || void 0,
				$status: y,
				disabled: u,
				placeholder: !g.multiple && g.value && !b ? I(g.value) : l,
				value: J,
				onFocus: () => x(!0),
				onChange: (e) => {
					w(e.target.value), k(0), x(!0);
				},
				onKeyDown: re
			}),
			/* @__PURE__ */ o(bt, {
				"aria-hidden": "true",
				children: /* @__PURE__ */ o(p, {
					width: 18,
					height: 18
				})
			}),
			b && /* @__PURE__ */ o(ht, {
				listboxId: U,
				listRef: j,
				multiple: g.multiple,
				loading: r,
				filtered: R,
				optionId: W,
				isSelected: F,
				activeIndex: V,
				onActivate: k,
				onChoose: K,
				showCreate: ee,
				createIndex: te,
				createQuery: z,
				onCreate: q
			})
		]
	});
}
function mt({ open: e, setOpen: t, rootRef: n, listRef: r, activeIndex: i, isAsync: a, query: o, debounceMs: s, onSearch: c }) {
	S(() => {
		if (!e) return;
		function r(e) {
			n.current && !n.current.contains(e.target) && t(!1);
		}
		return document.addEventListener("mousedown", r), () => document.removeEventListener("mousedown", r);
	}, [
		e,
		n,
		t
	]), S(() => {
		r.current?.querySelector(`[data-index="${i}"]`)?.scrollIntoView({ block: "nearest" });
	}, [
		i,
		e,
		r
	]);
	let l = E(c);
	S(() => {
		l.current = c;
	}), S(() => {
		if (!a || !e) return;
		let t = setTimeout(() => l.current?.(o), s);
		return () => clearTimeout(t);
	}, [
		o,
		e,
		a,
		s
	]);
}
function ht({ listboxId: e, listRef: t, multiple: n, loading: r, filtered: i, optionId: a, isSelected: c, activeIndex: u, onActivate: d, onChoose: f, showCreate: p, createIndex: m, createQuery: h, onCreate: g }) {
	return /* @__PURE__ */ s(xt, {
		id: e,
		ref: t,
		role: "listbox",
		"aria-multiselectable": n || void 0,
		children: [
			r && /* @__PURE__ */ o(wt, {
				"aria-live": "polite",
				children: "Searching…"
			}),
			!r && i.length === 0 && !p && /* @__PURE__ */ o(Ct, { children: "No matches" }),
			i.map((e, t) => /* @__PURE__ */ s(St, {
				id: a(t),
				"data-index": t,
				role: "option",
				"aria-selected": c(e.value),
				$active: t === u,
				onMouseEnter: () => d(t),
				onMouseDown: (t) => {
					t.preventDefault(), f(e);
				},
				children: [/* @__PURE__ */ o("span", { children: e.label }), c(e.value) && /* @__PURE__ */ o(l, {
					width: 16,
					height: 16
				})]
			}, e.value)),
			p && /* @__PURE__ */ o(St, {
				id: a(m),
				"data-index": m,
				role: "option",
				"aria-selected": !1,
				$active: u === m,
				onMouseEnter: () => d(m),
				onMouseDown: (e) => {
					e.preventDefault(), g(h);
				},
				children: /* @__PURE__ */ s(Tt, { children: [
					"Create “",
					/* @__PURE__ */ o("strong", { children: h }),
					"”"
				] })
			})
		]
	});
}
var gt = r.div`
  position: relative;
  width: 100%;
`, _t = r.input`
  ${ft}
  padding-right: 2.5rem;

  ${({ $status: e }) => dt(e)}
`, vt = r.div`
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
`, yt = r.input`
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
`, bt = r.span`
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
`, xt = r.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: ${({ theme: e }) => e.zIndex[50]};
  max-height: 15rem;
  overflow-y: auto;
  margin: 0;
  padding: ${({ theme: e }) => e.spacing.xs};
  list-style: none;
  background-color: ${({ theme: e }) => e.colors.canvas};
  border: 1px solid ${({ theme: e }) => e.colors.border};
  border-radius: ${({ theme: e }) => e.borderRadius.md};
  box-shadow: ${({ theme: e }) => e.boxShadow.pop};
`, St = r.li`
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
`, Ct = r.li`
  padding: ${({ theme: e }) => e.spacing.md};
  text-align: center;
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.muted};
`, wt = r.li`
  padding: ${({ theme: e }) => e.spacing.md};
  text-align: center;
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.muted};
`, Tt = r.span`
  color: ${({ theme: e }) => e.colors.muted};

  strong {
    color: ${({ theme: e }) => e.colors.ink};
    font-weight: ${({ theme: e }) => e.fontWeight.medium};
  }
`, Et = r.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme: e }) => e.spacing.xs};
  min-width: 0;
`, Dt = r(A.Title)`
  font-family: ${({ theme: e }) => e.typography.fontFamily.display};
  font-size: ${({ theme: e }) => e.fontSize.lg};
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  color: ${({ theme: e }) => e.colors.ink};
  margin: 0;
`, Ot = r(A.Description)`
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.muted};
  margin: 0;
`, kt = r.button`
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
function At({ open: e, onOpenChange: t, title: n, description: r, children: i, footer: a, width: c }) {
	return /* @__PURE__ */ o(A.Root, {
		open: e,
		onOpenChange: t,
		children: /* @__PURE__ */ s(A.Portal, { children: [/* @__PURE__ */ o(Nt, {}), /* @__PURE__ */ s(Pt, {
			style: c ? { maxWidth: c } : void 0,
			children: [
				/* @__PURE__ */ s(Ft, { children: [/* @__PURE__ */ s(Et, { children: [/* @__PURE__ */ o(Dt, { children: n }), r ? /* @__PURE__ */ o(Ot, { children: r }) : /* @__PURE__ */ o(A.Description, {
					"aria-hidden": !0,
					style: { display: "none" }
				})] }), /* @__PURE__ */ o(A.Close, {
					asChild: !0,
					children: /* @__PURE__ */ o(kt, {
						"aria-label": "Close",
						children: /* @__PURE__ */ o(h, {
							width: 20,
							height: 20
						})
					})
				})] }),
				/* @__PURE__ */ o(It, { children: i }),
				a && /* @__PURE__ */ o(Lt, { children: a })
			]
		})] })
	});
}
var jt = n`from { opacity: 0; } to { opacity: 1; }`, Mt = n`
  from { opacity: 0; transform: translate(-50%, -48%) scale(0.98); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`, Nt = r(A.Overlay)`
  position: fixed;
  inset: 0;
  z-index: ${({ theme: e }) => e.zIndex[50]};
  background-color: ${({ theme: e }) => e.fixed.scrim};
  animation: ${jt} ${({ theme: e }) => e.motion.duration.base} ${({ theme: e }) => e.motion.easing.enter};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`, Pt = r(A.Content)`
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
  z-index: ${({ theme: e }) => e.zIndex[51]};
  animation: ${Mt} ${({ theme: e }) => e.motion.duration.base} ${({ theme: e }) => e.motion.easing.enter};

  &:focus {
    outline: none;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`, Ft = r.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme: e }) => e.spacing.lg};
  padding: ${({ theme: e }) => e.spacing.xl} ${({ theme: e }) => e.spacing.xl} ${({ theme: e }) => e.spacing.lg};
  flex-shrink: 0;
`, It = r.div`
  padding: 0 ${({ theme: e }) => e.spacing.xl};
  overflow-y: auto;
`, Lt = r.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme: e }) => e.spacing.md};
  padding: ${({ theme: e }) => e.spacing.xl};
  flex-shrink: 0;
`;
//#endregion
//#region src/components/ConfirmDialog/index.tsx
function Rt({ open: e, onOpenChange: t, title: n, description: r, children: i, confirmLabel: c = "Confirm", cancelLabel: l = "Cancel", confirmVariant: u = "primary", pending: d = !1, onConfirm: f }) {
	return /* @__PURE__ */ o(At, {
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
var zt = /^\d{4}-\d{2}-\d{2}$/;
function Bt(e) {
	if (!e || !zt.test(e)) return null;
	try {
		return R(e);
	} catch {
		return null;
	}
}
function Vt(e) {
	return e ? e.toString() : null;
}
function Ht() {
	return B(I());
}
function Ut(e) {
	return B(e);
}
function Wt() {
	return Ht().toString();
}
function Gt(e, t, n) {
	return !!t && e < t || !!n && e > n;
}
var Kt = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/, qt = /^(\d{4})(\d{2})(\d{2})$/;
function Jt(e) {
	let t = e.trim();
	if (!t) return null;
	if (zt.test(t)) return Bt(t);
	let n = qt.exec(t);
	if (n) {
		let [, e, t, r] = n;
		return Bt(`${e}-${t}-${r}`);
	}
	let r = Kt.exec(t);
	if (r) {
		let [, e, t, n] = r;
		return Bt(`${n}-${e.padStart(2, "0")}-${t.padStart(2, "0")}`);
	}
	return null;
}
var Yt = "Always", Xt = "Ongoing", Zt = "Anytime", Qt = new Intl.DateTimeFormat("en-US", {
	month: "short",
	day: "numeric",
	year: "numeric",
	timeZone: "UTC"
});
function $t(e, t = "—") {
	return e && Bt(e) ? e : t;
}
function en(e) {
	if (!e || zt.test(e)) return null;
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? null : te(P(t, I()));
}
function tn(e, t = "—") {
	let n = en(e);
	return n ? Qt.format(new Date(Date.UTC(n.year, n.month - 1, n.day))) : t;
}
function nn(e, t, n = "—") {
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
var rn = {
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
function an(e, t = "start") {
	let n = Ht();
	switch (e) {
		case "today": return n.toString();
		case "ongoing": return null;
		case "month": return (t === "start" ? z(n.add({ months: 1 })) : M(n)).toString();
		case "year": return (t === "start" ? ee(n.add({ years: 1 })) : N(n)).toString();
	}
}
function on(e, t, n) {
	return {
		token: e,
		label: t,
		markIndex: t.toLowerCase().indexOf(e),
		accessibleName: `${t}, type ${e[0]}`,
		value: an(e, n)
	};
}
function sn({ edge: e = "start", allowOpenEnded: t, min: n, max: r } = {}) {
	return rn[e].filter(({ token: e }) => e !== "ongoing" || t).map(({ token: t, label: n }) => on(t, n, e)).filter((e) => e.value === null || !Gt(e.value, n, r));
}
function cn(e, t = {}) {
	let n = e.trim().toLowerCase();
	if (!n) return { kind: "none" };
	let { edge: r = "start", allowOpenEnded: i, min: a, max: o } = t, s = rn[r].find(({ token: e }) => e.startsWith(n) && (e !== "ongoing" || i));
	if (!s) return { kind: "none" };
	let c = on(s.token, s.label, r);
	return c.value !== null && Gt(c.value, a, o) ? {
		kind: "outOfRange",
		pick: c
	} : {
		kind: "match",
		pick: c
	};
}
var ln = [
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
function un(e) {
	let t = Ht(), n = e === "nextMonth" ? t.add({ months: 1 }) : e === "nextYear" ? t.add({ years: 1 }) : t, [r, i] = e === "thisMonth" || e === "nextMonth" ? [z(n), M(n)] : [ee(n), N(n)];
	return {
		start: r.toString(),
		end: i.toString()
	};
}
function dn({ min: e, max: t } = {}) {
	return ln.map(({ period: e, label: t }) => ({
		period: e,
		label: t,
		...un(e)
	})).filter(({ start: n, end: r }) => !Gt(n, e, t) && !Gt(r, e, t));
}
//#endregion
//#region src/components/DatePicker/model.ts
var fn = "en-US", pn = [
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
], mn = [
	"Su",
	"Mo",
	"Tu",
	"We",
	"Th",
	"Fr",
	"Sa"
];
function hn(e) {
	let t = z(e), n = F(t, fn), r = t.subtract({ days: n }), i = L(e, fn);
	return Array.from({ length: i * 7 }, (e, t) => r.add({ days: t }));
}
function gn(e) {
	let [t, n, r] = e.split("-");
	return `${e}, ${t}${n}${r}, or ${n}/${r}/${t}`;
}
function _n(e) {
	return `${pn[e.month - 1]} ${e.day}, ${e.year}`;
}
function vn(e, t) {
	let n = e.trim();
	if (!n) return { kind: "empty" };
	let r = Vt(Jt(n));
	if (r && !Gt(r, t.min, t.max)) return {
		kind: "date",
		iso: r
	};
	let i = cn(n, t);
	return i.kind === "match" ? {
		kind: "pick",
		value: i.pick.value
	} : { kind: "invalid" };
}
function yn(e, t) {
	switch (e) {
		case "ArrowLeft": return t.subtract({ days: 1 });
		case "ArrowRight": return t.add({ days: 1 });
		case "ArrowUp": return t.subtract({ weeks: 1 });
		case "ArrowDown": return t.add({ weeks: 1 });
		case "PageUp": return t.subtract({ months: 1 });
		case "PageDown": return t.add({ months: 1 });
		case "Home": return z(t);
		default: return null;
	}
}
//#endregion
//#region src/components/DatePicker/styles.ts
var bn = r.div`
  position: relative;
  width: 100%;
`, xn = r.input`
  ${ft}
  padding-right: 2.75rem;
  color: ${({ theme: e, $openEnded: t }) => t ? e.colors.muted : e.colors.ink};
  font-style: ${({ $openEnded: e }) => e ? "italic" : "normal"};

  ${({ $status: e }) => dt(e)}
`, Sn = r.button`
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
`, Cn = r(j.Content)`
  background-color: ${({ theme: e }) => e.colors.canvas};
  border: 1px solid ${({ theme: e }) => e.colors.border};
  border-radius: ${({ theme: e }) => e.borderRadius.md};
  box-shadow: ${({ theme: e }) => e.boxShadow.pop};
  padding: 1rem;
  z-index: ${({ theme: e }) => e.zIndex[50]};
`, wn = r.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`, Tn = r.button`
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
`, En = r.span`
  font-family: ${({ theme: e }) => e.typography.fontFamily.display};
  font-size: ${({ theme: e }) => e.fontSize.base};
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  color: ${({ theme: e }) => e.colors.ink};
`, Dn = r.div`
  display: grid;
  grid-template-columns: repeat(7, 2.5rem);
`, On = r.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  font-family: ${({ theme: e }) => e.typography.fontFamily.mono};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  color: ${({ theme: e }) => e.colors.muted};
`, kn = r.button`
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
`, An = r.p`
  margin: 0.375rem 0 0;
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  color: ${({ theme: e }) => e.colors.error};
`, jn = r.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${({ theme: e }) => e.colors.border};
`, Mn = r.button`
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
`, Nn = r.span`
  display: inline;
`, Pn = r.span`
  font-weight: ${({ theme: e }) => e.fontWeight.bold};
  text-decoration: underline dotted;
  text-underline-offset: 2px;
`;
//#endregion
//#region src/components/DatePicker/CalendarPopover.tsx
function Fn({ calendarId: e, picks: t, anchor: n, cells: r, valueIso: i, todayIso: a, focusIso: c, min: l, max: u, inGrid: p, inputRef: m, onMonthShift: h, onPressQuickPick: g, onPickDay: _, onGridKeyDown: v, onGridElement: y, onEscapeFromGrid: b }) {
	return /* @__PURE__ */ o(j.Portal, { children: /* @__PURE__ */ s(Cn, {
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
			t.length > 0 && /* @__PURE__ */ o(jn, { children: t.map((e) => /* @__PURE__ */ o(Mn, {
				type: "button",
				"aria-label": e.accessibleName,
				onMouseDown: (e) => e.preventDefault(),
				onClick: () => g(e),
				children: /* @__PURE__ */ s(Nn, { children: [
					e.label.slice(0, e.markIndex),
					/* @__PURE__ */ o(Pn, { children: e.label[e.markIndex] }),
					e.label.slice(e.markIndex + 1)
				] })
			}, e.token)) }),
			/* @__PURE__ */ s(wn, { children: [
				/* @__PURE__ */ o(Tn, {
					type: "button",
					"aria-label": "Previous month",
					onClick: () => h(-1),
					children: /* @__PURE__ */ o(d, {})
				}),
				/* @__PURE__ */ s(En, { children: [
					pn[n.month - 1],
					" ",
					n.year
				] }),
				/* @__PURE__ */ o(Tn, {
					type: "button",
					"aria-label": "Next month",
					onClick: () => h(1),
					children: /* @__PURE__ */ o(f, {})
				})
			] }),
			/* @__PURE__ */ s(Dn, {
				ref: y,
				onKeyDown: v,
				children: [mn.map((e) => /* @__PURE__ */ o(On, {
					"aria-hidden": "true",
					children: e
				}, e)), r.map((e) => {
					let t = e.toString(), r = e.month === n.month && e.year === n.year, s = t === i;
					return /* @__PURE__ */ o(kn, {
						type: "button",
						"data-date": t,
						tabIndex: t === c ? 0 : -1,
						"aria-label": _n(e),
						"aria-pressed": s,
						"aria-current": t === a ? "date" : void 0,
						disabled: Gt(t, l, u),
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
function In({ value: e, onValueChange: t, isOpenEnded: n, options: r, isCalendarOpen: i, openCalendar: a, closeCalendar: o, followDate: s }) {
	let [c, l] = D("blurred"), [u, d] = D(""), [f, p] = D(!1), m = E(null), h = E(!1), g = E(!1), _ = E(!1);
	w(() => {
		g.current && (g.current = !1, m.current?.select());
	}, [c, u]);
	function v(e) {
		let n = vn(e, r);
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
				let a = vn(n, r);
				if (a.kind !== "date" && a.kind !== "pick") return;
				let o = a.kind === "date" ? a.iso : a.value;
				if (t?.(o), i() && o) {
					let e = Bt(o);
					e && s(e);
				}
			},
			onBlur: () => {
				l((e) => e === "grid" ? e : "blurred"), h.current && (h.current = !1, v(u));
			},
			onKeyDown: (e) => {
				if (e.key === "Enter") {
					e.preventDefault();
					let t = vn(u, r);
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
function Ln({ value: e, onValueChange: t, min: n, max: r, allowOpenEnded: i, openEndedLabel: l, edge: u = "start", placeholder: d = "YYYY-MM-DD", disabled: f, hasError: p, id: m, "aria-label": h, "aria-labelledby": g, className: _ }) {
	let { fieldProps: v, status: y } = tt(), b = p ? "error" : y, [x, S] = D(!1), [C, E] = D(() => Bt(e) ?? Ht()), [O, k] = D(() => Bt(e) ?? Ht()), [A, M] = D(null), N = i === !0 && e == null, P = {
		edge: u,
		allowOpenEnded: i,
		min: n,
		max: r
	}, F = sn(P);
	function I(e) {
		k(e), (e.month !== C.month || e.year !== C.year) && E(z(e));
	}
	let L = In({
		value: e,
		onValueChange: t,
		isOpenEnded: N,
		options: P,
		isCalendarOpen: () => x,
		openCalendar: () => G(!0),
		closeCalendar: () => S(!1),
		followDate: I
	}), { focusZone: R, setFocusZone: ee, text: te, parseError: B, inputRef: V } = L, H = m ?? v.id, U = H ? `${H}-parse-error` : void 0, W = H ? `${H}-calendar` : void 0;
	w(() => {
		R !== "grid" || !A || A.querySelector(`[data-date="${O.toString()}"]`)?.focus();
	}, [
		R,
		O,
		A
	]);
	function G(t) {
		if (t) {
			let t = Bt(e) ?? Ht();
			E(z(t)), k(t);
		} else ee((e) => e === "grid" ? "blurred" : e);
		S(t);
	}
	function K(e) {
		L.commitPicked(e.value), S(!1);
	}
	function ne(e) {
		let t = e.toString();
		Gt(t, n, r) || (L.commitPicked(t), S(!1));
	}
	function q() {
		let e = V.current;
		if (!e) return;
		let t = Array.from(document.querySelectorAll("a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex=\"-1\"])")).filter((t) => t.offsetParent !== null || t === e);
		t[t.indexOf(e) + 1]?.focus();
	}
	function re(e) {
		if (e.key === "Tab" && !e.shiftKey) {
			e.preventDefault(), ee("blurred"), S(!1), q();
			return;
		}
		let t = yn(e.key, O);
		t && (e.preventDefault(), I(t));
	}
	let J = T(() => hn(C), [C]), ie = Wt(), ae = R === "input" ? te : e || (N && l ? l : "");
	return /* @__PURE__ */ s(a, { children: [/* @__PURE__ */ s(j.Root, {
		open: x,
		onOpenChange: G,
		children: [/* @__PURE__ */ s(bn, {
			className: _,
			children: [/* @__PURE__ */ o(xn, {
				ref: V,
				$openEnded: N && R !== "input",
				id: H,
				"aria-label": h,
				"aria-labelledby": g,
				"aria-keyshortcuts": "ArrowDown",
				"aria-invalid": B || v["aria-invalid"] || void 0,
				"aria-required": v["aria-required"],
				"aria-describedby": [B ? U : void 0, v["aria-describedby"]].filter(Boolean).join(" ") || void 0,
				$status: B ? "error" : b,
				disabled: f,
				placeholder: d,
				value: ae,
				...L.handlers
			}), /* @__PURE__ */ o(j.Trigger, {
				asChild: !0,
				children: /* @__PURE__ */ o(Sn, {
					type: "button",
					disabled: f,
					tabIndex: -1,
					onMouseDown: (e) => e.preventDefault(),
					"aria-label": "Open calendar",
					"aria-expanded": x,
					"aria-controls": x ? W : void 0,
					children: /* @__PURE__ */ o(c, {})
				})
			})]
		}), /* @__PURE__ */ o(Fn, {
			calendarId: W,
			picks: F,
			anchor: C,
			cells: J,
			valueIso: e ?? null,
			todayIso: ie,
			focusIso: O.toString(),
			min: n,
			max: r,
			inGrid: R === "grid",
			inputRef: V,
			onMonthShift: (e) => E(e < 0 ? C.subtract({ months: -e }) : C.add({ months: e })),
			onPressQuickPick: K,
			onPickDay: ne,
			onGridKeyDown: re,
			onGridElement: M,
			onEscapeFromGrid: L.closeToInput
		})]
	}), B && /* @__PURE__ */ o(An, {
		id: U,
		role: "alert",
		children: /^[a-z]/i.test(te.trim()) && F.length > 0 ? `Try ${F.map((e) => e.token).join(", ")}.` : `Enter a date like ${gn(ie)}.`
	})] });
}
//#endregion
//#region src/components/DateRangePicker/PeriodChips.tsx
function Rn({ min: e, max: t, disabled: n, "aria-label": r, onPick: i }) {
	let [a, s] = D(0), c = E([]), l = dn({
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
	return /* @__PURE__ */ o(zn, {
		role: "toolbar",
		"aria-orientation": "horizontal",
		"aria-label": r,
		onKeyDown: f,
		children: l.map((e, t) => /* @__PURE__ */ o(Bn, {
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
var zn = r.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-shrink: 0;
  gap: ${({ theme: e }) => e.spacing.xs};
`, Bn = r.button`
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
  transition: background-color ${({ theme: e }) => e.motion.duration.fast} ease, border-color ${({ theme: e }) => e.motion.duration.fast} ease;

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
`, Vn = r.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.625rem;
`, Hn = r.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  flex: 1 1 20rem;
  min-width: 0;
`, Un = r.div`
  flex: 1 1 0;
  min-width: 0;
`, Wn = r.span`
  flex-shrink: 0;
  color: ${({ theme: e }) => e.colors.muted};
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
`;
function Gn({ start: e = {}, end: t = {}, onRangeChange: n, periodsAriaLabel: r = "Set both dates", min: i, max: a, disabled: c, hasError: l }) {
	return /* @__PURE__ */ s(Vn, { children: [/* @__PURE__ */ s(Hn, { children: [
		/* @__PURE__ */ o(Un, { children: /* @__PURE__ */ o(Ln, {
			edge: "start",
			id: e.id,
			"aria-label": e.ariaLabel ?? "Start date",
			value: e.value,
			onValueChange: e.onValueChange,
			min: i || void 0,
			max: t.value || a || void 0,
			allowOpenEnded: e.allowOpenEnded,
			openEndedLabel: e.openEndedLabel,
			disabled: c,
			hasError: l
		}) }),
		/* @__PURE__ */ o(Wn, {
			"aria-hidden": "true",
			children: "–"
		}),
		/* @__PURE__ */ o(Un, { children: /* @__PURE__ */ o(Ln, {
			edge: "end",
			id: t.id,
			"aria-label": t.ariaLabel ?? "End date",
			value: t.value,
			onValueChange: t.onValueChange,
			min: e.value || i || void 0,
			max: a || void 0,
			allowOpenEnded: t.allowOpenEnded,
			openEndedLabel: t.openEndedLabel,
			disabled: c,
			hasError: l
		}) })
	] }), n && /* @__PURE__ */ o(Rn, {
		"aria-label": r,
		min: i,
		max: a,
		disabled: c,
		onPick: n
	})] });
}
//#endregion
//#region src/components/DescriptionList/index.tsx
var Kn = r.dl`
  display: grid;
  grid-template-columns: minmax(8rem, 12rem) 1fr;
  gap: ${({ theme: e }) => e.spacing.sm} ${({ theme: e }) => e.spacing.lg};
  margin: 0;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: ${({ theme: e }) => e.spacing.xs} 0;
  }
`, qn = r.dt`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.muted};
  margin: 0;
`, Jn = r.dd`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.ink};
  margin: 0;

  @media (max-width: 480px) {
    margin-bottom: ${({ theme: e }) => e.spacing.sm};
  }
`, Yn = V.Root, Xn = V.Trigger, Zn = n`
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
`, Qn = r(V.Content)`
  min-width: 11rem;
  padding: ${({ theme: e }) => e.spacing.xs};
  background-color: ${({ theme: e }) => e.colors.canvas};
  border: 1px solid ${({ theme: e }) => e.colors.border};
  border-radius: ${({ theme: e }) => e.borderRadius.md};
  box-shadow: ${({ theme: e }) => e.boxShadow.pop};
  z-index: ${({ theme: e }) => e.zIndex[60]};
  animation: ${Zn} ${({ theme: e }) => e.motion.duration.fast}
    ${({ theme: e }) => e.motion.easing.enter};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
function $n(e) {
	return /* @__PURE__ */ o(V.Portal, { children: /* @__PURE__ */ o(Qn, {
		align: "end",
		sideOffset: 4,
		...e
	}) });
}
//#endregion
//#region src/components/DropdownMenu/items.tsx
var er = r(V.Item).withConfig({ shouldForwardProp: Y("danger") })`
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
`, tr = r(V.Separator)`
  height: 1px;
  margin: ${({ theme: e }) => e.spacing.xs} 0;
  background-color: ${({ theme: e }) => e.colors.border};
`, nr = r(V.Label)`
  padding: ${({ theme: e }) => e.spacing.xs} ${({ theme: e }) => e.spacing.md};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme: e }) => e.colors.subtle};
`, rr = r.input`
  ${ft}
  ${({ $status: e }) => dt(e)}
`, ir = y(function({ hasError: e, ...t }, n) {
	let { fieldProps: r, status: i } = tt();
	return /* @__PURE__ */ o(rr, {
		ref: n,
		$status: e ? "error" : i,
		...r,
		...t
	});
}), ar = r.p`
  font-size: ${({ theme: e }) => e.fontSize.xs};
  color: ${({ theme: e }) => e.colors.error};
  margin: 0;
`, or = r.p.withConfig({ shouldForwardProp: Y("status") })`
  font-size: ${({ theme: e }) => e.fontSize.xs};
  color: ${({ theme: e, status: t }) => e.colors[t]};
  margin: 0;
`, sr = r.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`, cr = r.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;
function lr(e) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());
}
var ur = y(function({ autoComplete: e = "email", onBlur: t, onChange: n, ...r }, i) {
	let [a, c] = D(!1), { hasError: l } = tt(), u = `${C()}-email-format`, d = b((e) => {
		let n = e.currentTarget.value;
		c(n.trim().length > 0 && !lr(n)), t?.(e);
	}, [t]), f = b((e) => {
		let t = e.currentTarget.value;
		c((e) => e && !lr(t)), n?.(e);
	}, [n]), p = a && !l;
	return /* @__PURE__ */ s(cr, { children: [/* @__PURE__ */ o(ir, {
		ref: i,
		type: "email",
		autoComplete: e,
		inputMode: "email",
		onBlur: d,
		onChange: f,
		hasError: p || void 0,
		"aria-invalid": p || void 0,
		"aria-describedby": p ? u : void 0,
		...r
	}), p && /* @__PURE__ */ o(or, {
		id: u,
		status: "error",
		role: "alert",
		children: "An email address looks like name@example.com."
	})] });
});
//#endregion
//#region src/components/EmptyState/index.tsx
function dr({ icon: e, title: t, description: n, action: r, className: i }) {
	return /* @__PURE__ */ s(fr, {
		className: i,
		children: [
			e && /* @__PURE__ */ o(pr, {
				"aria-hidden": "true",
				children: e
			}),
			/* @__PURE__ */ o(mr, { children: t }),
			n && /* @__PURE__ */ o(hr, { children: n }),
			r && /* @__PURE__ */ o(gr, { children: r })
		]
	});
}
var fr = r.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${({ theme: e }) => e.spacing.sm};
  padding: ${({ theme: e }) => e.spacing["3xl"]} ${({ theme: e }) => e.spacing.xl};
  color: ${({ theme: e }) => e.colors.muted};
`, pr = r.div`
  color: ${({ theme: e }) => e.colors.subtle};
  margin-bottom: ${({ theme: e }) => e.spacing.xs};

  svg {
    width: 2.5rem;
    height: 2.5rem;
  }
`, mr = r.p`
  font-family: ${({ theme: e }) => e.typography.fontFamily.display};
  font-size: ${({ theme: e }) => e.fontSize.lg};
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  color: ${({ theme: e }) => e.colors.ink};
  margin: 0;
`, hr = r.p`
  font-size: ${({ theme: e }) => e.fontSize.sm};
  max-width: 40ch;
  line-height: ${({ theme: e }) => e.lineHeight.relaxed};
  margin: 0;
`, gr = r.div`
  margin-top: ${({ theme: e }) => e.spacing.md};
`, _r = r(H.Root)`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  font-weight: ${({ theme: e }) => e.fontWeight.medium};
  color: ${({ theme: e }) => e.colors.ink};
  cursor: default;
`, vr = r.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`, yr = r(_r)`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
`, br = r.span`
  color: ${({ theme: e }) => e.colors.brand};
`, xr = r.p`
  font-size: ${({ theme: e }) => e.fontSize.xs};
  color: ${({ theme: e }) => e.colors.muted};
  margin: 0;
`;
function Sr(e, t, n) {
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
function Cr({ label: e, description: t, error: n, warning: r, success: i, required: a = !1, htmlFor: c, className: l, children: u }) {
	let d = C(), f = c ?? `field-${d}`, p = t ? `${f}-description` : void 0, m = Sr(n, r, i), h = m?.status, g = h ? `${f}-status` : void 0, _ = T(() => ({
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
		value: _,
		children: /* @__PURE__ */ s(vr, {
			className: l,
			children: [
				/* @__PURE__ */ s(yr, {
					htmlFor: f,
					children: [e, a && /* @__PURE__ */ o(br, {
						"aria-hidden": "true",
						children: "*"
					})]
				}),
				u,
				t && /* @__PURE__ */ o(xr, {
					id: p,
					children: t
				}),
				m && /* @__PURE__ */ o(or, {
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
var wr = n`
  from { opacity: 0; }
  to { opacity: 1; }
`, Tr = n`
  from { opacity: 1; }
  to { opacity: 0; }
`, Er = n`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`, Dr = n`
  from { transform: translateX(0); }
  to { transform: translateX(100%); }
`, Or = "400ms cubic-bezier(0.32, 0.72, 0, 1)", kr = "280ms cubic-bezier(0.55, 0, 1, 0.45)", Ar = r(A.Overlay)`
  background-color: ${({ theme: e }) => e.fixed.scrim};
  position: fixed;
  inset: 0;
  z-index: ${({ theme: e }) => e.zIndex[40]};

  &[data-state='open'] {
    animation: ${wr} ${Or};
  }
  &[data-state='closed'] {
    animation: ${Tr} ${kr} forwards;
    pointer-events: none;
  }
`, jr = r(A.Content)`
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
  z-index: ${({ theme: e }) => e.zIndex[50]};
  display: flex;
  flex-direction: column;

  &[data-state='open'] {
    animation: ${Er} ${Or};
    will-change: transform;
  }
  &[data-state='closed'] {
    animation: ${Dr} ${kr} forwards;
    will-change: transform;
    pointer-events: none;
  }

  // Reduced motion: drop the slide transform, degrade to a brief opacity fade
  // (a full-height panel snapping in/out is disorienting; a fade is gentler).
  @media (prefers-reduced-motion: reduce) {
    &[data-state='open'] {
      animation: ${wr} ${({ theme: e }) => e.motion.duration.fast}
        ${({ theme: e }) => e.motion.easing.standard};
    }
    &[data-state='closed'] {
      animation: ${Tr} ${({ theme: e }) => e.motion.duration.fast}
        ${({ theme: e }) => e.motion.easing.standard} forwards;
    }
  }

  &:focus {
    outline: none;
  }
`, Mr = r.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: ${({ theme: e }) => e.spacing.xl};
  border-bottom: 1px solid ${({ theme: e }) => e.colors.border};
  flex-shrink: 0;
`, Nr = r.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
`, Pr = r.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ $padding: e, theme: t }) => e ?? t.spacing.xl};
`, Fr = r.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: ${({ theme: e }) => e.spacing.lg} ${({ theme: e }) => e.spacing.xl};
  border-top: 1px solid ${({ theme: e }) => e.colors.border};
  flex-shrink: 0;
`;
function Ir({ open: e, onOpenChange: t, title: n, description: r, headerActions: i, children: a, footer: c, bodyPadding: l }) {
	return /* @__PURE__ */ o(A.Root, {
		open: e,
		onOpenChange: t,
		children: /* @__PURE__ */ s(A.Portal, { children: [/* @__PURE__ */ o(Ar, {}), /* @__PURE__ */ s(jr, { children: [
			/* @__PURE__ */ s(Mr, { children: [/* @__PURE__ */ s(Et, { children: [/* @__PURE__ */ o(Dt, { children: n }), r ? /* @__PURE__ */ o(Ot, { children: r }) : /* @__PURE__ */ o(A.Description, {
				"aria-hidden": !0,
				style: { display: "none" }
			})] }), /* @__PURE__ */ s(Nr, { children: [i, /* @__PURE__ */ o(A.Close, {
				asChild: !0,
				children: /* @__PURE__ */ o(kt, {
					"aria-label": "Close",
					children: /* @__PURE__ */ o(h, {
						width: 20,
						height: 20
					})
				})
			})] })] }),
			/* @__PURE__ */ o(Pr, {
				$padding: l,
				children: a
			}),
			c && /* @__PURE__ */ o(Fr, { children: c })
		] })] })
	});
}
//#endregion
//#region src/components/Drawer/drawerStore.ts
var Lr = globalThis.process, Rr = Lr ? Lr.env?.NODE_ENV !== "production" : !1;
function zr() {
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
			n++, Rr && e.open && e.activeId !== null && e.activeId !== t && console.error(`[Drawer] Single-slot violation: "${e.config?.title}" is open and another drawer ("${i.title}") is opening over it. Only one DrawerSlot may be open at a time — the newcomer replaces the incumbent. (ADR-0068)`), r({
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
var Br = v(null), Vr = Br.Provider;
function Hr() {
	let e = x(Br);
	if (e === null) throw Error("DrawerSlot must be used within a DrawerProvider");
	return e;
}
//#endregion
//#region src/components/Drawer/DrawerSlot.tsx
function Ur({ open: e, title: t, description: n, headerActions: r, footer: i, bodyPadding: a, onOpenChange: o, children: s }) {
	let c = Hr(), l = C();
	return w(() => {
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
	]), S(() => () => c.release(l), [c, l]), null;
}
//#endregion
//#region src/components/Drawer/DrawerHost.tsx
function Wr({ children: e }) {
	let [t] = D(zr);
	return /* @__PURE__ */ s(Vr, {
		value: t,
		children: [e, /* @__PURE__ */ o(Gr, { store: t })]
	});
}
function Gr({ store: e }) {
	let t = O(e.subscribe, e.getSnapshot), { config: n } = t;
	return /* @__PURE__ */ o(Ir, {
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
var Kr = r.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
function qr({ children: e }) {
	return /* @__PURE__ */ o(Kr, { children: e });
}
var Jr = r.section`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`, Yr = r.h3`
  font-family: ${({ theme: e }) => e.typography.fontFamily.mono};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme: e }) => e.colors.subtle};
  margin: 0;
`;
function Xr({ title: e, children: t }) {
	return /* @__PURE__ */ s(Jr, { children: [e != null && /* @__PURE__ */ o(Yr, { children: e }), t] });
}
var Zr = r.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`, Qr = r.span`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  color: ${({ theme: e }) => e.colors.muted};
`, $r = r.div`
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.ink};
`;
function ei({ label: e, children: t }) {
	return /* @__PURE__ */ s(Zr, { children: [/* @__PURE__ */ o(Qr, { children: e }), /* @__PURE__ */ o($r, { children: t })] });
}
//#endregion
//#region src/theme/motion.ts
var ti = n`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`, ni = t`
  animation: ${ti} ${({ theme: e }) => e.motion.duration.slow}
    ${({ theme: e }) => e.motion.easing.enter};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`, ri = r.div`
  max-width: 80rem;
  margin: 0 auto;
  width: 100%;
  padding: 1.5rem 1rem;
  ${ni}

  @media (min-width: 640px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 3rem 4rem;
  }
`, ii = r.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 1rem;
`, ai = r.h1`
  ${Ue}
  color: ${({ theme: e }) => e.colors.ink};
  margin: 0;
`, oi = r.p`
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.muted};
  margin: 0;
`, si = r.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`, ci = r.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
`;
function li({ title: e, subtitle: t, actions: n }) {
	return /* @__PURE__ */ s(ii, { children: [/* @__PURE__ */ s(ci, { children: [/* @__PURE__ */ o(ai, { children: e }), t != null && /* @__PURE__ */ o(oi, { children: t })] }), n != null && /* @__PURE__ */ o(si, { children: n })] });
}
//#endregion
//#region ../../node_modules/sonner/dist/index.mjs
function ui(e) {
	if (!e || typeof document > "u") return;
	let t = document.head || document.getElementsByTagName("head")[0], n = document.createElement("style");
	n.type = "text/css", t.appendChild(n), n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(document.createTextNode(e));
}
var di = (e) => {
	switch (e) {
		case "success": return mi;
		case "info": return gi;
		case "warning": return hi;
		case "error": return _i;
		default: return null;
	}
}, fi = Array(12).fill(0), pi = ({ visible: e, className: t }) => /*#__PURE__*/ g.createElement("div", {
	className: ["sonner-loading-wrapper", t].filter(Boolean).join(" "),
	"data-visible": e
}, /*#__PURE__*/ g.createElement("div", { className: "sonner-spinner" }, fi.map((e, t) => /*#__PURE__*/ g.createElement("div", {
	className: "sonner-loading-bar",
	key: `spinner-bar-${t}`
})))), mi = /*#__PURE__*/ g.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20",
	"aria-hidden": "true"
}, /*#__PURE__*/ g.createElement("path", {
	fillRule: "evenodd",
	d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
	clipRule: "evenodd"
})), hi = /*#__PURE__*/ g.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 24 24",
	fill: "currentColor",
	height: "20",
	width: "20",
	"aria-hidden": "true"
}, /*#__PURE__*/ g.createElement("path", {
	fillRule: "evenodd",
	d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
	clipRule: "evenodd"
})), gi = /*#__PURE__*/ g.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20",
	"aria-hidden": "true"
}, /*#__PURE__*/ g.createElement("path", {
	fillRule: "evenodd",
	d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
	clipRule: "evenodd"
})), _i = /*#__PURE__*/ g.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20",
	"aria-hidden": "true"
}, /*#__PURE__*/ g.createElement("path", {
	fillRule: "evenodd",
	d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
	clipRule: "evenodd"
})), vi = /*#__PURE__*/ g.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	width: "12",
	height: "12",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.5",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": "true"
}, /*#__PURE__*/ g.createElement("line", {
	x1: "18",
	y1: "6",
	x2: "6",
	y2: "18"
}), /*#__PURE__*/ g.createElement("line", {
	x1: "6",
	y1: "6",
	x2: "18",
	y2: "18"
})), yi = () => {
	let [e, t] = g.useState(document.hidden);
	return g.useEffect(() => {
		let e = () => {
			t(document.hidden);
		};
		return document.addEventListener("visibilitychange", e), () => document.removeEventListener("visibilitychange", e);
	}, []), e;
}, bi = 1, xi = 100, Si = (e) => typeof e?.id == "number" || e?.id?.length > 0 ? e.id : bi++, Z = new class {
	constructor() {
		this.subscribe = (e) => (this.subscribers.push(e), this.getActiveToasts().forEach((t) => e(t)), () => {
			let t = this.subscribers.indexOf(e);
			this.subscribers.splice(t, 1);
		}), this.publish = (e) => {
			this.subscribers.forEach((t) => t(e));
		}, this.addToast = (e) => {
			this.publish(e), this.toasts = [...this.toasts, e], this.trimHistory();
		}, this.trimHistory = () => {
			let e = this.toasts.length - xi;
			e <= 0 || (this.toasts = this.toasts.filter((t) => e > 0 && this.dismissedToasts.has(t.id) ? (this.dismissedToasts.delete(t.id), e--, !1) : !0));
		}, this.create = (e) => {
			let { message: t, ...n } = e, r = Si(e), i = this.pendingDismissals.get(r);
			i !== void 0 && (cancelAnimationFrame(i), this.pendingDismissals.delete(r), this.dismissedToasts.delete(r));
			let a = this.dismissedToasts.has(r), o = e.dismissible === void 0 || e.dismissible;
			return a && (this.dismissedToasts.delete(r), this.toasts = this.toasts.filter((e) => e.id !== r)), !a && this.toasts.find((e) => e.id === r) ? this.toasts = this.toasts.map((n) => n.id === r ? (this.publish({
				...n,
				...e,
				id: r,
				title: t
			}), {
				...n,
				...e,
				id: r,
				dismissible: o,
				title: t
			}) : n) : this.addToast({
				title: t,
				...n,
				dismissible: o,
				id: r
			}), r;
		}, this.dismiss = (e) => {
			if (e == null) return this.getActiveToasts().forEach((e) => {
				this.dismissedToasts.add(e.id), this.subscribers.forEach((t) => t({
					id: e.id,
					dismiss: !0
				}));
			}), e;
			this.dismissedToasts.add(e);
			let t = this.pendingDismissals.get(e);
			return t !== void 0 && cancelAnimationFrame(t), this.pendingDismissals.set(e, requestAnimationFrame(() => {
				this.pendingDismissals.delete(e), this.subscribers.forEach((t) => t({
					id: e,
					dismiss: !0
				}));
			})), e;
		}, this.message = (e, t) => this.create({
			...t,
			message: e,
			type: void 0
		}), this.error = (e, t) => this.create({
			...t,
			message: e,
			type: "error"
		}), this.success = (e, t) => this.create({
			...t,
			type: "success",
			message: e
		}), this.info = (e, t) => this.create({
			...t,
			type: "info",
			message: e
		}), this.warning = (e, t) => this.create({
			...t,
			type: "warning",
			message: e
		}), this.loading = (e, t) => this.create({
			...t,
			type: "loading",
			message: e
		}), this.promise = (e, t) => {
			if (!t) return;
			let n;
			t.loading !== void 0 && (n = this.create({
				...t,
				promise: e,
				type: "loading",
				message: t.loading,
				description: typeof t.description == "function" ? void 0 : t.description
			}));
			let r = Promise.resolve(e instanceof Function ? e() : e), i = n !== void 0, a, o = r.then(async (e) => {
				if (a = ["resolve", e], g.isValidElement(e)) i = !1, this.create({
					id: n,
					type: "default",
					message: e
				});
				else if (wi(e) && !e.ok) {
					i = !1;
					let r = typeof t.error == "function" ? await t.error(`HTTP error! status: ${e.status}`) : t.error, a = typeof t.description == "function" ? await t.description(`HTTP error! status: ${e.status}`) : t.description, o = typeof r == "object" && !g.isValidElement(r) ? r : { message: r };
					this.create({
						id: n,
						type: "error",
						description: a,
						...o
					});
				} else if (e instanceof Error) {
					i = !1;
					let r = typeof t.error == "function" ? await t.error(e) : t.error, a = typeof t.description == "function" ? await t.description(e) : t.description, o = typeof r == "object" && !g.isValidElement(r) ? r : { message: r };
					this.create({
						id: n,
						type: "error",
						description: a,
						...o
					});
				} else if (t.success !== void 0) {
					i = !1;
					let r = typeof t.success == "function" ? await t.success(e) : t.success, a = typeof t.description == "function" ? await t.description(e) : t.description, o = typeof r == "object" && !g.isValidElement(r) ? r : { message: r };
					this.create({
						id: n,
						type: "success",
						description: a,
						...o
					});
				}
			}).catch(async (e) => {
				if (a = ["reject", e], t.error !== void 0) {
					i = !1;
					let r = typeof t.error == "function" ? await t.error(e) : t.error, a = typeof t.description == "function" ? await t.description(e) : t.description, o = typeof r == "object" && !g.isValidElement(r) ? r : { message: r };
					this.create({
						id: n,
						type: "error",
						description: a,
						...o
					});
				}
			}).finally(() => {
				i && (this.dismiss(n), n = void 0), t.finally == null || t.finally.call(t);
			}), s = () => new Promise((e, t) => o.then(() => a[0] === "reject" ? t(a[1]) : e(a[1])).catch(t));
			return typeof n != "string" && typeof n != "number" ? { unwrap: s } : Object.assign(n, { unwrap: s });
		}, this.custom = (e, t) => {
			let n = Si(t);
			return this.create({
				...t,
				jsx: e(n),
				id: n,
				type: void 0
			}), n;
		}, this.getActiveToasts = () => this.toasts.filter((e) => !this.dismissedToasts.has(e.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set(), this.pendingDismissals = /* @__PURE__ */ new Map();
	}
}(), Ci = (e, t) => Z.message(e, t), wi = (e) => e && typeof e == "object" && "ok" in e && typeof e.ok == "boolean" && "status" in e && typeof e.status == "number", Ti = Object.assign(Ci, {
	success: Z.success,
	info: Z.info,
	warning: Z.warning,
	error: Z.error,
	custom: Z.custom,
	message: Z.message,
	promise: Z.promise,
	dismiss: Z.dismiss,
	loading: Z.loading
}, {
	getHistory: () => Z.toasts,
	getToasts: () => Z.getActiveToasts()
});
ui("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px;flex:1;min-width:0}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--normal-text);background:var(--normal-bg);border:1px solid var(--normal-border);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{-webkit-user-select:none;user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Ei(e) {
	return e.label !== void 0;
}
var Di = 3, Oi = "24px", ki = "16px", Ai = 4e3, ji = 356, Mi = 14, Ni = 45, Pi = 200;
function Q(...e) {
	return e.filter(Boolean).join(" ");
}
function Fi(e) {
	let [t, n] = e.split("-"), r = [];
	return t && r.push(t), n && r.push(n), r;
}
var Ii = (e) => {
	let { invert: t, toast: n, unstyled: r, interacting: i, setHeights: a, visibleToasts: o, heights: s, index: c, toasts: l, expanded: u, removeToast: d, defaultRichColors: f, closeButton: p, style: m, cancelButtonStyle: h, actionButtonStyle: _, className: v = "", descriptionClassName: y = "", duration: b, position: x, gap: S, expandByDefault: C, classNames: w, icons: T, closeButtonAriaLabel: E = "Close toast" } = e, [D, O] = g.useState(null), [k, A] = g.useState(null), [j, M] = g.useState(!1), [N, P] = g.useState(!1), [F, I] = g.useState(!1), [L, R] = g.useState(!1), [z, ee] = g.useState(!1), [te, B] = g.useState(0), [V, H] = g.useState(0), U = g.useRef(n.duration || b || Ai), W = g.useRef(null), G = g.useRef(null), K = c === 0, ne = c + 1 <= o, q = n.type, re = q ?? "default", J = n.dismissible !== !1, ie = n.className || "", ae = n.descriptionClassName || "", oe = g.useMemo(() => s.findIndex((e) => e.toastId === n.id) || 0, [s, n.id]), se = g.useMemo(() => n.closeButton ?? p, [n.closeButton, p]), ce = g.useMemo(() => n.duration || b || Ai, [n.duration, b]), le = g.useRef(0), ue = g.useRef(0), Y = g.useRef(0), de = g.useRef(null), [fe, pe] = x.split("-"), me = g.useMemo(() => s.reduce((e, t, n) => n >= oe ? e : e + t.height, 0), [s, oe]), he = yi(), X = g.useMemo(() => e.swipeDirections ?? Fi(x), [e.swipeDirections, x]), ge = n.invert || t, _e = q === "loading";
	ue.current = g.useMemo(() => oe * S + me, [oe, me]), g.useEffect(() => {
		U.current = ce;
	}, [ce]), g.useEffect(() => {
		M(!0);
	}, []), g.useEffect(() => {
		let e = G.current;
		if (e) {
			let t = e.getBoundingClientRect().height;
			return H(t), a((e) => [{
				toastId: n.id,
				height: t,
				position: n.position
			}, ...e]), () => a((e) => e.filter((e) => e.toastId !== n.id));
		}
	}, [a, n.id]), g.useLayoutEffect(() => {
		if (!j) return;
		let e = G.current, t = e.style.height;
		e.style.height = "auto";
		let r = e.getBoundingClientRect().height;
		e.style.height = t, H(r), a((e) => e.find((e) => e.toastId === n.id) ? e.map((e) => e.toastId === n.id ? {
			...e,
			height: r
		} : e) : [{
			toastId: n.id,
			height: r,
			position: n.position
		}, ...e]);
	}, [
		j,
		n.title,
		n.description,
		a,
		n.id,
		n.jsx,
		n.action,
		n.cancel
	]);
	let ve = g.useCallback(() => {
		P(!0), B(ue.current), a((e) => e.filter((e) => e.toastId !== n.id)), setTimeout(() => {
			d(n);
		}, Pi);
	}, [
		n,
		d,
		a,
		ue
	]);
	g.useEffect(() => {
		if (n.promise && q === "loading" || n.duration === Infinity || n.type === "loading") return;
		let e;
		return u || i || he ? (() => {
			if (Y.current < le.current) {
				let e = (/* @__PURE__ */ new Date()).getTime() - le.current;
				U.current -= e;
			}
			Y.current = (/* @__PURE__ */ new Date()).getTime();
		})() : U.current !== Infinity && (le.current = (/* @__PURE__ */ new Date()).getTime(), e = setTimeout(() => {
			n.onAutoClose == null || n.onAutoClose.call(n, n), ve();
		}, U.current)), () => clearTimeout(e);
	}, [
		u,
		i,
		n,
		q,
		he,
		ve
	]), g.useEffect(() => {
		n.delete && (ve(), n.onDismiss == null || n.onDismiss.call(n, n));
	}, [ve, n.delete]);
	function ye() {
		return T?.loading ? /*#__PURE__*/ g.createElement("div", {
			className: Q(w?.loader, n?.classNames?.loader, "sonner-loader"),
			"data-visible": q === "loading"
		}, T.loading) : /*#__PURE__*/ g.createElement(pi, {
			className: Q(w?.loader, n?.classNames?.loader),
			visible: q === "loading"
		});
	}
	let be = n.icon || T?.[q] || di(q);
	return /*#__PURE__*/ g.createElement("li", {
		tabIndex: 0,
		ref: G,
		className: Q(v, ie, w?.toast, n?.classNames?.toast, w?.[re], n?.classNames?.[re]),
		"data-sonner-toast": "",
		"data-rich-colors": n.richColors ?? f,
		"data-styled": !(n.jsx || n.unstyled || r),
		"data-mounted": j,
		"data-promise": !!n.promise,
		"data-swiped": z,
		"data-removed": N,
		"data-visible": ne,
		"data-y-position": fe,
		"data-x-position": pe,
		"data-index": c,
		"data-front": K,
		"data-swiping": F,
		"data-dismissible": J,
		"data-type": q,
		"data-invert": ge,
		"data-swipe-out": L,
		"data-swipe-direction": k,
		"data-expanded": !!(u || C && j),
		"data-testid": n.testId,
		style: {
			"--index": c,
			"--toasts-before": c,
			"--z-index": l.length - c,
			"--offset": `${N ? te : ue.current}px`,
			"--initial-height": C ? "auto" : `${V}px`,
			...m,
			...n.style
		},
		onDragEnd: () => {
			I(!1), O(null), de.current = null;
		},
		onPointerDown: (e) => {
			e.button !== 2 && (_e || !J || (W.current = /* @__PURE__ */ new Date(), B(ue.current), e.target.setPointerCapture(e.pointerId), e.target.tagName !== "BUTTON" && (I(!0), de.current = {
				x: e.clientX,
				y: e.clientY
			})));
		},
		onPointerUp: () => {
			if (L || !J) return;
			de.current = null;
			let e = Number(G.current?.style.getPropertyValue("--swipe-amount-x").replace("px", "") || 0), t = Number(G.current?.style.getPropertyValue("--swipe-amount-y").replace("px", "") || 0), r = (/* @__PURE__ */ new Date()).getTime() - W.current?.getTime(), i = D === "x" ? e : t, a = Math.abs(i) / r;
			if ((D === "x" ? X.includes(e > 0 ? "right" : "left") : X.includes(t > 0 ? "bottom" : "top")) && (Math.abs(i) >= Ni || a > .11)) {
				B(ue.current), n.onDismiss == null || n.onDismiss.call(n, n), A(D === "x" ? e > 0 ? "right" : "left" : t > 0 ? "down" : "up"), ve(), R(!0);
				return;
			}
			var o, s;
			(o = G.current) == null || o.style.setProperty("--swipe-amount-x", "0px"), (s = G.current) == null || s.style.setProperty("--swipe-amount-y", "0px"), ee(!1), I(!1), O(null);
		},
		onPointerMove: (e) => {
			var t, n;
			if (!de.current || !J || window.getSelection()?.toString().length > 0) return;
			let r = e.clientY - de.current.y, i = e.clientX - de.current.x;
			!D && (Math.abs(i) > 1 || Math.abs(r) > 1) && O(Math.abs(i) > Math.abs(r) ? "x" : "y");
			let a = {
				x: 0,
				y: 0
			}, o = (e) => 1 / (1.5 + Math.abs(e) / 20);
			if (D === "y") {
				if (X.includes("top") || X.includes("bottom")) {
					if (X.includes("top") && r < 0 || X.includes("bottom") && r > 0) a.y = r;
					else {
						let e = r * o(r);
						a.y = Math.abs(e) < Math.abs(r) ? e : r;
					}
				}
			} else if (D === "x" && (X.includes("left") || X.includes("right"))) {
				if (X.includes("left") && i < 0 || X.includes("right") && i > 0) a.x = i;
				else {
					let e = i * o(i);
					a.x = Math.abs(e) < Math.abs(i) ? e : i;
				}
			}
			(Math.abs(a.x) > 0 || Math.abs(a.y) > 0) && ee(!0), (t = G.current) == null || t.style.setProperty("--swipe-amount-x", `${a.x}px`), (n = G.current) == null || n.style.setProperty("--swipe-amount-y", `${a.y}px`);
		}
	}, se && !n.jsx && q !== "loading" ? /*#__PURE__*/ g.createElement("button", {
		"aria-label": E,
		"data-disabled": _e,
		"data-close-button": !0,
		onClick: _e || !J ? () => {} : () => {
			ve(), n.onDismiss == null || n.onDismiss.call(n, n);
		},
		className: Q(w?.closeButton, n?.classNames?.closeButton)
	}, T?.close ?? vi) : null, (q || n.icon || n.promise) && n.icon !== null && (T?.[q] !== null || n.icon) ? /*#__PURE__*/ g.createElement("div", {
		"data-icon": "",
		className: Q(w?.icon, n?.classNames?.icon)
	}, q === "loading" ? n.icon || ye() : n.promise ? ye() : null, q === "loading" ? null : be) : null, /*#__PURE__*/ g.createElement("div", {
		"data-content": "",
		className: Q(w?.content, n?.classNames?.content)
	}, /*#__PURE__*/ g.createElement("div", {
		"data-title": "",
		className: Q(w?.title, n?.classNames?.title)
	}, n.jsx ? n.jsx : typeof n.title == "function" ? n.title() : n.title), n.description ? /*#__PURE__*/ g.createElement("div", {
		"data-description": "",
		className: Q(y, ae, w?.description, n?.classNames?.description)
	}, typeof n.description == "function" ? n.description() : n.description) : null), /*#__PURE__*/ g.isValidElement(n.cancel) ? n.cancel : n.cancel && Ei(n.cancel) ? /*#__PURE__*/ g.createElement("button", {
		"data-button": !0,
		"data-cancel": !0,
		style: n.cancelButtonStyle || h,
		onClick: (e) => {
			Ei(n.cancel) && J && (n.cancel.onClick == null || n.cancel.onClick.call(n.cancel, e), ve());
		},
		className: Q(w?.cancelButton, n?.classNames?.cancelButton)
	}, n.cancel.label) : null, /*#__PURE__*/ g.isValidElement(n.action) ? n.action : n.action && Ei(n.action) ? /*#__PURE__*/ g.createElement("button", {
		"data-button": !0,
		"data-action": !0,
		style: n.actionButtonStyle || _,
		onClick: (e) => {
			Ei(n.action) && (n.action.onClick == null || n.action.onClick.call(n.action, e), !e.defaultPrevented && ve());
		},
		className: Q(w?.actionButton, n?.classNames?.actionButton)
	}, n.action.label) : null);
};
function Li() {
	if (typeof window > "u" || typeof document > "u") return "ltr";
	let e = document.documentElement.getAttribute("dir");
	return e === "auto" || !e ? window.getComputedStyle(document.documentElement).direction : e;
}
function Ri(e, t) {
	let n = {};
	return [e, t].forEach((e, t) => {
		let r = t === 1, i = r ? "--mobile-offset" : "--offset", a = r ? ki : Oi;
		function o(e) {
			[
				"top",
				"right",
				"bottom",
				"left"
			].forEach((t) => {
				n[`${i}-${t}`] = typeof e == "number" ? `${e}px` : e;
			});
		}
		typeof e == "number" || typeof e == "string" ? o(e) : typeof e == "object" ? [
			"top",
			"right",
			"bottom",
			"left"
		].forEach((t) => {
			e[t] === void 0 ? n[`${i}-${t}`] = a : n[`${i}-${t}`] = typeof e[t] == "number" ? `${e[t]}px` : e[t];
		}) : o(a);
	}), n;
}
var zi = /*#__PURE__*/ g.forwardRef(function(e, t) {
	let { id: n, invert: r, position: i = "bottom-right", hotkey: a = ["altKey", "KeyT"], expand: o, closeButton: s, className: c, offset: l, mobileOffset: u, theme: d = "light", richColors: f, duration: p, style: m, visibleToasts: h = Di, toastOptions: _, dir: v = Li(), gap: y = Mi, icons: b, customAriaLabel: x, containerAriaLabel: S = "Notifications" } = e, [C, w] = g.useState([]), T = g.useMemo(() => n ? C.filter((e) => e.toasterId === n) : C.filter((e) => !e.toasterId), [C, n]), E = g.useMemo(() => Array.from(new Set([i].concat(T.filter((e) => e.position).map((e) => e.position)))), [T, i]), [D, O] = g.useState([]), [k, A] = g.useState(!1), [j, M] = g.useState(!1), [N, P] = g.useState(d === "system" ? typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : d), F = g.useRef(null), I = a.join("+").replace(/Key/g, "").replace(/Digit/g, ""), L = g.useRef(null), R = g.useRef(!1), z = g.useCallback((e) => {
		w((t) => (t.find((t) => t.id === e.id)?.delete || Z.dismiss(e.id), t.filter(({ id: t }) => t !== e.id)));
	}, []);
	return g.useEffect(() => Z.subscribe((e) => {
		if (e.dismiss) {
			requestAnimationFrame(() => {
				w((t) => t.map((t) => t.id === e.id ? {
					...t,
					delete: !0
				} : t));
			});
			return;
		}
		setTimeout(() => {
			U.flushSync(() => {
				w((t) => {
					let n = t.findIndex((t) => t.id === e.id);
					return n === -1 ? [e, ...t] : [
						...t.slice(0, n),
						{
							...t[n],
							...e
						},
						...t.slice(n + 1)
					];
				});
			});
		});
	}), []), g.useEffect(() => {
		if (d !== "system") {
			P(d);
			return;
		}
		if (d === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? P("dark") : P("light")), typeof window > "u") return;
		let e = window.matchMedia("(prefers-color-scheme: dark)");
		try {
			e.addEventListener("change", ({ matches: e }) => {
				P(e ? "dark" : "light");
			});
		} catch {
			e.addListener(({ matches: e }) => {
				try {
					P(e ? "dark" : "light");
				} catch (e) {
					console.error(e);
				}
			});
		}
	}, [d]), g.useEffect(() => {
		C.length <= 1 && A(!1);
	}, [C]), g.useEffect(() => {
		let e = (e) => {
			if (a.length > 0 && a.every((t) => e[t] || e.code === t)) {
				var t;
				A(!0), (t = F.current) == null || t.focus();
			}
			e.code === "Escape" && (document.activeElement === F.current || F.current?.contains(document.activeElement)) && A(!1);
		};
		return document.addEventListener("keydown", e), () => document.removeEventListener("keydown", e);
	}, [a]), g.useEffect(() => {
		if (F.current) return () => {
			L.current && (L.current.focus({ preventScroll: !0 }), L.current = null, R.current = !1);
		};
	}, [F.current]), /*#__PURE__*/ g.createElement("section", {
		ref: t,
		"aria-label": x ?? `${S} ${I}`,
		tabIndex: -1,
		"aria-live": "polite",
		"aria-relevant": "additions text",
		"aria-atomic": "false",
		suppressHydrationWarning: !0,
		"data-react-aria-top-layer": !0
	}, E.map((t, n) => {
		let [i, a] = t.split("-");
		return T.length ? /*#__PURE__*/ g.createElement("ol", {
			key: t,
			dir: v === "auto" ? Li() : v,
			tabIndex: -1,
			ref: F,
			className: c,
			"data-sonner-toaster": !0,
			"data-sonner-theme": N,
			"data-y-position": i,
			"data-x-position": a,
			style: {
				"--front-toast-height": `${D[0]?.height || 0}px`,
				"--width": `${ji}px`,
				"--gap": `${y}px`,
				...m,
				...Ri(l, u)
			},
			onBlur: (e) => {
				R.current && !e.currentTarget.contains(e.relatedTarget) && (R.current = !1, L.current &&= (L.current.focus({ preventScroll: !0 }), null));
			},
			onFocus: (e) => {
				e.target instanceof HTMLElement && e.target.dataset.dismissible === "false" || R.current || (R.current = !0, L.current = e.relatedTarget);
			},
			onMouseEnter: () => A(!0),
			onMouseMove: () => A(!0),
			onMouseLeave: () => {
				j || A(!1);
			},
			onDragEnd: () => A(!1),
			onPointerDown: (e) => {
				e.target instanceof HTMLElement && e.target.dataset.dismissible === "false" || M(!0);
			},
			onPointerUp: () => M(!1)
		}, T.filter((e) => !e.position && n === 0 || e.position === t).map((n, i) => /*#__PURE__*/ g.createElement(Ii, {
			key: n.id,
			icons: b,
			index: i,
			toast: n,
			defaultRichColors: f,
			duration: _?.duration ?? p,
			className: _?.className,
			descriptionClassName: _?.descriptionClassName,
			invert: r,
			visibleToasts: h,
			closeButton: _?.closeButton ?? s,
			interacting: j,
			position: t,
			style: _?.style,
			unstyled: _?.unstyled,
			classNames: _?.classNames,
			cancelButtonStyle: _?.cancelButtonStyle,
			actionButtonStyle: _?.actionButtonStyle,
			closeButtonAriaLabel: _?.closeButtonAriaLabel,
			removeToast: z,
			toasts: T.filter((e) => e.position == n.position),
			heights: D.filter((e) => e.position == n.position),
			setHeights: O,
			expandByDefault: o,
			gap: y,
			expanded: k,
			swipeDirections: e.swipeDirections
		}))) : null;
	}));
}), Bi = r.header`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 1.5rem;
  background-color: ${({ theme: e }) => e.colors.canvas};
  border-bottom: 1px solid ${({ theme: e }) => e.colors.border};
  flex-shrink: 0;

  ${({ $sticky: e }) => e && t`
      position: sticky;
      top: 0;
      z-index: ${({ theme: e }) => e.zIndex[40]};
    `}
`, Vi = r(ir)`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
  appearance: textfield;
`;
function Hi({ inputMode: e = "numeric", ...t }) {
	return /* @__PURE__ */ o(Vi, {
		type: "number",
		inputMode: e,
		...t
	});
}
//#endregion
//#region src/components/Pagination/index.tsx
function Ui({ page: e, pageCount: t, onPageChange: n, className: r }) {
	if (t <= 1) return null;
	let i = Gi(e, t);
	return /* @__PURE__ */ s(Ki, {
		"aria-label": "Pagination",
		className: r,
		children: [
			/* @__PURE__ */ o(Ji, {
				type: "button",
				"aria-label": "Previous page",
				disabled: e <= 1,
				onClick: () => n(e - 1),
				children: /* @__PURE__ */ o(d, {
					width: 16,
					height: 16
				})
			}),
			i.map((t, r) => t === Wi ? /* @__PURE__ */ o(Xi, {
				"aria-hidden": "true",
				children: "…"
			}, `gap-${r}`) : /* @__PURE__ */ o(Yi, {
				type: "button",
				$active: t === e,
				"aria-current": t === e ? "page" : void 0,
				onClick: () => n(t),
				children: t
			}, t)),
			/* @__PURE__ */ o(Ji, {
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
var Wi = -1;
function Gi(e, t) {
	let n = [.../* @__PURE__ */ new Set([
		1,
		t,
		e,
		e - 1,
		e + 1
	])].filter((e) => e >= 1 && e <= t).sort((e, t) => e - t), r = [], i = 0;
	for (let e of n) e - i > 1 && r.push(Wi), r.push(e), i = e;
	return r;
}
var Ki = r.nav`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme: e }) => e.spacing.xs};
`, qi = "\n  min-width: 2rem;\n  height: 2rem;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 8px;\n  cursor: pointer;\n", Ji = r.button`
  ${qi}
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
`, Yi = r.button`
  ${qi}
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
`, Xi = r.span`
  min-width: 1.5rem;
  text-align: center;
  color: ${({ theme: e }) => e.colors.subtle};
`, Zi = r.div`
  position: relative;
`, Qi = r(ir)`
  padding-right: 2.75rem;
`, $i = r.button`
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
function ea() {
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
function ta() {
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
var na = y(function(e, t) {
	let [n, r] = D(!1);
	return /* @__PURE__ */ s(Zi, { children: [/* @__PURE__ */ o(Qi, {
		ref: t,
		type: n ? "text" : "password",
		...e
	}), /* @__PURE__ */ o($i, {
		type: "button",
		"aria-label": n ? "Hide password" : "Show password",
		"aria-pressed": n,
		onClick: () => r((e) => !e),
		children: o(n ? ta : ea, {})
	})] });
}), ra = j.Root, ia = j.Trigger, aa = j.Close, oa = n`
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
`, sa = r(j.Content)`
  min-width: 14rem;
  max-width: min(24rem, calc(100vw - 2rem));
  padding: ${({ theme: e }) => e.spacing.lg};
  background-color: ${({ theme: e }) => e.colors.canvas};
  border: 1px solid ${({ theme: e }) => e.colors.border};
  border-radius: ${({ theme: e }) => e.borderRadius.md};
  box-shadow: ${({ theme: e }) => e.boxShadow.pop};
  z-index: ${({ theme: e }) => e.zIndex[60]};
  animation: ${oa} ${({ theme: e }) => e.motion.duration.fast}
    ${({ theme: e }) => e.motion.easing.enter};

  &:focus {
    outline: none;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`, ca = r(j.Arrow)`
  fill: ${({ theme: e }) => e.colors.canvas};
  stroke: ${({ theme: e }) => e.colors.border};
  stroke-width: 1px;
`;
function la(e) {
	let { children: t, ...n } = e;
	return /* @__PURE__ */ o(j.Portal, { children: /* @__PURE__ */ s(sa, {
		align: "start",
		sideOffset: 6,
		...n,
		children: [t, /* @__PURE__ */ o(ca, {})]
	}) });
}
//#endregion
//#region src/components/Progress/index.tsx
var ua = r(W.Root)`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 0.5rem;
  border-radius: ${({ theme: e }) => e.borderRadius.full};
  background-color: ${({ theme: e }) => e.colors.surface2};
`, da = r(W.Indicator)`
  height: 100%;
  background-color: ${({ theme: e }) => e.colors.accent};
  border-radius: inherit;
  transition: width ${({ theme: e }) => e.motion.duration.slow}
    ${({ theme: e }) => e.motion.easing.standard};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
function fa({ value: e, className: t, ...n }) {
	let r = e == null ? null : Math.max(0, Math.min(100, e));
	return /* @__PURE__ */ o(ua, {
		value: r,
		className: t,
		...n,
		children: /* @__PURE__ */ o(da, { style: { width: `${r ?? 0}%` } })
	});
}
//#endregion
//#region src/components/RadioGroup/index.tsx
var pa = r(G.Root)`
  display: flex;
  flex-direction: ${({ $horizontal: e }) => e ? "row" : "column"};
  flex-wrap: ${({ $horizontal: e }) => e ? "wrap" : "nowrap"};
  gap: ${({ $horizontal: e }) => e ? "1.25rem" : "0.5rem"};
`, ma = r.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: ${({ $disabled: e }) => e ? "not-allowed" : "pointer"};
`, ha = r(G.Item)`
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
  transition: border-color ${({ theme: e }) => e.motion.duration.micro} ease;

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
`, ga = r(G.Indicator)`
  display: inline-flex;
  &::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ theme: e }) => e.colors.accent};
  }
`, _a = r.label`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.ink};
  cursor: inherit;
`;
function va({ value: e, onValueChange: t, options: n, disabled: r, id: i, name: a, orientation: c = "vertical", className: l, ...u }) {
	let { fieldProps: d } = tt(), f = C(), p = i ?? d.id ?? `radiogroup-${f}`;
	return /* @__PURE__ */ o(pa, {
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
			return /* @__PURE__ */ s(ma, {
				$disabled: r || e.disabled,
				children: [/* @__PURE__ */ o(ha, {
					value: e.value,
					id: t,
					disabled: e.disabled,
					children: /* @__PURE__ */ o(ga, {})
				}), /* @__PURE__ */ o(_a, {
					htmlFor: t,
					children: e.label
				})]
			}, e.value);
		})
	});
}
//#endregion
//#region src/components/Select/index.tsx
var ya = r(K.Trigger)`
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
`, ba = r(K.Content)`
  overflow: hidden;
  background-color: ${({ theme: e }) => e.colors.canvas};
  border: 1px solid ${({ theme: e }) => e.colors.border};
  border-radius: ${({ theme: e }) => e.borderRadius.md};
  box-shadow: ${({ theme: e }) => e.boxShadow.pop};
  z-index: ${({ theme: e }) => e.zIndex[50]};
`, xa = r(K.Viewport)`
  padding: 0.25rem;
`, Sa = r(K.Item)`
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
`, Ca = r.span`
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.muted};
  max-width: 18rem;
  white-space: normal;
`, wa = r(K.ItemIndicator)`
  position: absolute;
  right: 0.5rem;
  display: inline-flex;
  align-items: center;
  color: ${({ theme: e }) => e.colors.accent};
`, Ta = r(K.ScrollUpButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.5rem;
  color: ${({ theme: e }) => e.colors.muted};
  cursor: default;
`;
function Ea({ value: e, onValueChange: t, options: n, placeholder: r, disabled: i, hasError: a, id: c, className: d, tabIndex: f, "aria-label": p, "aria-labelledby": h }) {
	let { fieldProps: g, status: _ } = tt();
	return /* @__PURE__ */ s(K.Root, {
		value: e,
		onValueChange: t,
		disabled: i,
		children: [/* @__PURE__ */ s(ya, {
			className: d,
			$status: a ? "error" : _,
			id: c ?? g.id,
			tabIndex: f,
			"aria-label": p,
			"aria-labelledby": h,
			"aria-describedby": g["aria-describedby"],
			"aria-invalid": g["aria-invalid"],
			"aria-required": g["aria-required"],
			children: [/* @__PURE__ */ o(K.Value, { placeholder: r ?? "Select…" }), /* @__PURE__ */ o(K.Icon, { children: /* @__PURE__ */ o(u, { style: {
				width: "1rem",
				height: "1rem"
			} }) })]
		}), /* @__PURE__ */ o(K.Portal, { children: /* @__PURE__ */ s(ba, {
			position: "popper",
			sideOffset: 4,
			children: [
				/* @__PURE__ */ o(Ta, {
					as: K.ScrollUpButton,
					children: /* @__PURE__ */ o(m, { style: {
						width: "1rem",
						height: "1rem"
					} })
				}),
				/* @__PURE__ */ o(xa, { children: n.map((e) => /* @__PURE__ */ s(Sa, {
					value: e.value,
					disabled: e.disabled,
					children: [
						/* @__PURE__ */ o(K.ItemText, { children: e.label }),
						e.hint && /* @__PURE__ */ o(Ca, { children: e.hint }),
						/* @__PURE__ */ o(wa, { children: /* @__PURE__ */ o(l, { style: {
							width: "0.875rem",
							height: "0.875rem"
						} }) })
					]
				}, e.value)) }),
				/* @__PURE__ */ o(Ta, {
					as: K.ScrollDownButton,
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
var Da = n`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
`, Oa = r.div.withConfig({ shouldForwardProp: Y("radius") })`
  background-color: ${({ theme: e }) => e.colors.surface2};
  border-radius: ${({ theme: e, radius: t }) => t ?? e.borderRadius.sm};
  width: 100%;
  height: 1rem;
  animation: ${Da} 1.4s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`, ka = r(Oa)`
  border-radius: ${({ theme: e }) => e.borderRadius.full};
`, Aa = r(Oa)`
  height: 0.75rem;
`;
//#endregion
//#region src/components/Slider/index.tsx
function ja({ value: e, onValueChange: t, min: n = 0, max: r = 100, step: i = 1, disabled: a, className: c, "aria-label": l }) {
	return /* @__PURE__ */ s(Ma, {
		value: [e],
		onValueChange: ([e]) => t(e),
		min: n,
		max: r,
		step: i,
		disabled: a,
		className: c,
		children: [/* @__PURE__ */ o(Na, { children: /* @__PURE__ */ o(Pa, {}) }), /* @__PURE__ */ o(Fa, { "aria-label": l })]
	});
}
var Ma = r(ne.Root)`
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
`, Na = r(ne.Track)`
  position: relative;
  flex-grow: 1;
  height: 4px;
  border-radius: ${({ theme: e }) => e.borderRadius.full};
  background-color: ${({ theme: e }) => e.colors.surface2};
`, Pa = r(ne.Range)`
  position: absolute;
  height: 100%;
  border-radius: inherit;
  background-color: ${({ theme: e }) => e.colors.accent};
`, Fa = r(ne.Thumb)`
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
`, Ia = {
	sm: "1rem",
	md: "1.5rem",
	lg: "2.25rem"
}, La = n`
  to { transform: rotate(360deg); }
`, Ra = r.span.withConfig({ shouldForwardProp: Y("size", "color") })`
  display: inline-block;
  width: ${({ size: e = "md" }) => Ia[e]};
  height: ${({ size: e = "md" }) => Ia[e]};
  border-radius: 50%;
  border: 2px solid ${({ theme: e }) => e.colors.borderStrong};
  border-top-color: ${({ theme: e, color: t }) => t ?? e.colors.accent};
  animation: ${La} 0.6s linear infinite;
  flex-shrink: 0;

  @media (prefers-reduced-motion: reduce) {
    animation-duration: 1.6s;
  }
`;
//#endregion
//#region src/components/Stepper/index.tsx
function za({ steps: e, current: t, className: n }) {
	return /* @__PURE__ */ o(Ba, {
		className: n,
		"aria-label": "Progress",
		children: e.map((n, r) => {
			let i = r < t ? "done" : r === t ? "current" : "upcoming";
			return /* @__PURE__ */ s(_, { children: [/* @__PURE__ */ s(Va, {
				"aria-current": i === "current" ? "step" : void 0,
				children: [/* @__PURE__ */ o(Ha, {
					$state: i,
					children: i === "done" ? /* @__PURE__ */ o(l, {
						width: 14,
						height: 14
					}) : r + 1
				}), /* @__PURE__ */ o(Ua, {
					$state: i,
					children: n.label
				})]
			}), r < e.length - 1 && /* @__PURE__ */ o(Wa, {
				$done: r < t,
				"aria-hidden": "true"
			})] }, r);
		})
	});
}
var Ba = r.ol`
  display: flex;
  align-items: center;
  gap: ${({ theme: e }) => e.spacing.sm};
  list-style: none;
  margin: 0;
  padding: 0;
`, Va = r.li`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme: e }) => e.spacing.sm};
`, Ha = r.span`
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
`, Ua = r.span`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  font-weight: ${({ theme: e, $state: t }) => t === "current" ? e.fontWeight.semibold : e.fontWeight.normal};
  color: ${({ theme: e, $state: t }) => t === "upcoming" ? e.colors.subtle : e.colors.ink};
  white-space: nowrap;
`, Wa = r.span`
  width: 2rem;
  height: 2px;
  border-radius: 1px;
  background-color: ${({ theme: e, $done: t }) => t ? e.colors.accent : e.colors.border};
`, Ga = r.label`
  display: inline-flex;
  align-items: center;
  cursor: ${({ $disabled: e }) => e ? "not-allowed" : "pointer"};
`, Ka = r.input`
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  margin: 0;
`, qa = r.span`
  position: relative;
  display: inline-block;
  width: 34px;
  height: 20px;
  border-radius: ${({ theme: e }) => e.borderRadius.full};
  background: ${({ theme: e, $checked: t }) => t ? e.colors.accent : e.colors.borderStrong};
  opacity: ${({ $disabled: e }) => e ? .5 : 1};
  transition: background ${({ theme: e }) => e.motion.duration.micro} ease;

  ${Ka}:focus-visible + & {
    outline: 2px solid ${({ theme: e }) => e.colors.accent};
    outline-offset: 2px;
  }
`, Ja = r.span`
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  transform: translateX(${({ $checked: e }) => e ? "14px" : "0"});
  transition: transform ${({ theme: e }) => e.motion.duration.micro} ease;
`;
function Ya({ checked: e, onCheckedChange: t, disabled: n, ...r }) {
	return /* @__PURE__ */ s(Ga, {
		$disabled: n,
		children: [/* @__PURE__ */ o(Ka, {
			type: "checkbox",
			role: "switch",
			checked: e,
			disabled: n,
			"aria-label": r["aria-label"],
			onChange: (e) => t(e.target.checked)
		}), /* @__PURE__ */ o(qa, {
			$checked: e,
			$disabled: n,
			children: /* @__PURE__ */ o(Ja, { $checked: e })
		})]
	});
}
//#endregion
//#region src/components/Table/index.tsx
var Xa = r.div`
  overflow-x: auto;
`, Za = r.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme: e }) => e.fontSize.sm};
`, Qa = r.thead`
  background-color: ${({ theme: e }) => e.colors.surface};
`, $a = r.tbody``, eo = r.tr.withConfig({ shouldForwardProp: Y("interactive") })`
  cursor: ${({ interactive: e }) => e ? "pointer" : "default"};
  ${({ interactive: e, theme: t }) => e && `&:hover { background-color: ${t.colors.surface}; }`}
`, to = r.th.withConfig({ shouldForwardProp: Y("noBorder", "align") })`
  padding: 0.75rem 1rem;
  text-align: ${({ align: e }) => e ?? "left"};
  font-family: ${({ theme: e }) => e.typography.fontFamily.mono};
  font-weight: ${({ theme: e }) => e.fontWeight.medium};
  color: ${({ theme: e }) => e.colors.muted};
  text-transform: uppercase;
  font-size: ${({ theme: e }) => e.fontSize.xs};
  letter-spacing: 0.05em;
  border-bottom: ${({ theme: e, noBorder: t }) => t ? "none" : `1px solid ${e.colors.border}`};
`, no = r.td.withConfig({ shouldForwardProp: Y("noBorder", "align", "mono", "muted") })`
  padding: 0.75rem 1rem;
  text-align: ${({ align: e }) => e ?? "left"};
  font-family: ${({ theme: e, mono: t }) => t ? e.typography.fontFamily.mono : e.typography.fontFamily.sans};
  font-size: ${({ theme: e, mono: t, muted: n }) => t || n ? e.fontSize.xs : e.fontSize.sm};
  color: ${({ theme: e, muted: t }) => t ? e.colors.muted : e.colors.ink};
  white-space: ${({ mono: e, muted: t }) => e || t ? "nowrap" : "normal"};
  vertical-align: middle;
  border-bottom: ${({ theme: e, noBorder: t }) => t ? "none" : `1px solid ${e.colors.border}`};
`, ro = r(Za)`
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
`, io = q.Root, ao = r(q.List)`
  display: flex;
  border-bottom: 1px solid ${({ theme: e }) => e.colors.border};
  gap: 0;
`, oo = r(q.Trigger)`
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
`, so = r(q.Content)`
  outline: none;

  &:focus-visible {
    box-shadow: 0 0 0 2px ${({ theme: e }) => e.colors.accentSoft};
    border-radius: ${({ theme: e }) => e.borderRadius.md};
  }
`, co = {
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
}, lo = {
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
}, uo = {
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
}, fo = r.p`
  margin: 0; /* layout owns spacing (ADR-0167 gap-first); no stray browser margins */
  ${({ $variant: e }) => co[e]}
  color: ${({ theme: e, $tone: t }) => lo[t](e)};
`;
function po({ variant: e = "body", tone: t = "default", as: n, ...r }) {
	return /* @__PURE__ */ o(fo, {
		as: n ?? uo[e],
		$variant: e,
		$tone: t,
		...r
	});
}
//#endregion
//#region src/components/Textarea/index.tsx
var mo = r.textarea`
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
  transition: border-color ${({ theme: e }) => e.motion.duration.fast} ease, box-shadow ${({ theme: e }) => e.motion.duration.fast} ease;

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
`, ho = y(function({ hasError: e, ...t }, n) {
	let { fieldProps: r, status: i } = tt();
	return /* @__PURE__ */ o(mo, {
		ref: n,
		$status: e ? "error" : i,
		...r,
		...t
	});
}), go = r(re.Root)`
  display: inline-flex;
  padding: 2px;
  gap: 2px;
  background-color: ${({ theme: e }) => e.colors.surface2};
  border-radius: ${({ theme: e }) => e.borderRadius.md};
`, _o = r(re.Item)`
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
function vo({ content: e, children: t, side: n = "top", delayDuration: r = 200 }) {
	return /* @__PURE__ */ o(J.Provider, {
		delayDuration: r,
		children: /* @__PURE__ */ s(J.Root, { children: [/* @__PURE__ */ o(J.Trigger, {
			asChild: !0,
			children: t
		}), /* @__PURE__ */ o(J.Portal, { children: /* @__PURE__ */ s(bo, {
			side: n,
			sideOffset: 6,
			children: [e, /* @__PURE__ */ o(xo, {})]
		}) })] })
	});
}
var yo = n`
  from { opacity: 0; transform: translateY(2px); }
  to { opacity: 1; transform: translateY(0); }
`, bo = r(J.Content)`
  max-width: 18rem;
  padding: 0.375rem 0.625rem;
  border-radius: ${({ theme: e }) => e.borderRadius.sm};
  background-color: ${({ theme: e }) => e.colors.ink};
  color: ${({ theme: e }) => e.colors.canvas};
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  line-height: ${({ theme: e }) => e.lineHeight.snug};
  box-shadow: ${({ theme: e }) => e.boxShadow.pop};
  z-index: ${({ theme: e }) => e.zIndex[60]};
  animation: ${yo} ${({ theme: e }) => e.motion.duration.fast}
    ${({ theme: e }) => e.motion.easing.enter};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`, xo = r(J.Arrow)`
  fill: ${({ theme: e }) => e.colors.ink};
`, So = {
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
	scrim: "${({ theme }) => theme.fixed.scrim}",
	successOnDark: "#28C76F",
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
}, Co = {
	xs: "0.75rem",
	sm: "0.8125rem",
	base: "0.9375rem",
	lg: "1.0625rem",
	xl: "1.25rem",
	"2xl": "1.5rem",
	"3xl": "1.875rem",
	"4xl": "2.25rem",
	"5xl": "3rem"
}, wo = {
	normal: "400",
	medium: "500",
	semibold: "600",
	bold: "700",
	extrabold: "800",
	black: "900"
}, To = {
	flat: "1.1",
	snugTight: "1.17",
	tight: "1.25",
	snug: "1.375",
	normal: "1.5",
	relaxed: "1.625",
	loose: "2"
}, Eo = {
	tight: "-0.03em",
	normal: "0",
	wide: "0.08em"
}, Do = { fontFamily: {
	display: "'Archivo', sans-serif",
	sans: "'Public Sans', ui-sans-serif, system-ui, -apple-system, sans-serif",
	mono: "'IBM Plex Mono', ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace"
} }, Oo = {
	none: "0",
	sm: "6px",
	md: "10px",
	lg: "14px",
	full: "9999px"
}, ko = {
	none: "0",
	xs: "0.25rem",
	sm: "0.5rem",
	md: "0.75rem",
	lg: "1rem",
	xl: "1.5rem",
	"2xl": "2rem",
	"3xl": "3rem",
	"4xl": "4rem"
}, Ao = {
	card: "0 1px 2px rgba(16, 17, 20, 0.06)",
	pop: "0 6px 24px rgba(16, 17, 20, 0.09)",
	none: "none"
}, jo = {
	sm: "640px",
	md: "768px",
	lg: "1024px",
	xl: "1280px",
	"2xl": "1536px"
}, Mo = {
	0: "0",
	1: "1",
	10: "10",
	15: "15",
	20: "20",
	30: "30",
	40: "40",
	50: "50",
	51: "51",
	60: "60",
	61: "61",
	auto: "auto"
}, No = {
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
	highlight: "#7C3AED",
	highlightSoft: "#EDE7FB",
	highlightFaint: "#F5F1FC"
}, Po = {
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
	highlight: "#A78BFA",
	highlightSoft: "rgba(167, 139, 250, 0.22)",
	highlightFaint: "rgba(167, 139, 250, 0.10)"
}, Fo = {
	fixed: So,
	scales: $,
	fontSize: Co,
	fontWeight: wo,
	lineHeight: To,
	letterSpacing: Eo,
	typography: Do,
	borderRadius: Oo,
	spacing: ko,
	boxShadow: Ao,
	screens: jo,
	zIndex: Mo,
	motion: {
		duration: {
			micro: "120ms",
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
}, Io = {
	...Fo,
	colors: {
		...So,
		...No
	}
}, Lo = {
	...Fo,
	colors: {
		...So,
		...Po
	}
}, Ro = {
	STANDARD: 112.5,
	LARGE: 125,
	EXTRA_LARGE: 137.5
};
//#endregion
export { Yt as ALWAYS, Zt as ANYTIME, ie as Accordion, ue as AccordionContent, oe as AccordionHeader, ae as AccordionItem, se as AccordionTrigger, fe as Alert, me as AlertBody, pe as AlertIcon, X as AlertMessage, he as AlertTitle, ve as Avatar, Ce as Badge, we as Breadcrumbs, Me as Button, qe as Card, Xe as CardActions, Ze as CardBody, Qe as CardFooter, Je as CardHeader, Ye as CardTitle, ot as Checkbox, st as Chip, pt as Combobox, Rt as ConfirmDialog, Ln as DatePicker, Gn as DateRangePicker, Jn as DescriptionDetails, Kn as DescriptionList, qn as DescriptionTerm, Ir as Drawer, qr as DrawerBody, ei as DrawerField, Wr as DrawerProvider, Xr as DrawerSection, Ur as DrawerSlot, Yn as DropdownMenu, $n as DropdownMenuContent, er as DropdownMenuItem, nr as DropdownMenuLabel, tr as DropdownMenuSeparator, Xn as DropdownMenuTrigger, ur as EmailInput, dr as EmptyState, ar as ErrorText, sr as Field, Cr as FormField, ir as Input, _r as Label, At as Modal, Hi as NumberInput, Xt as ONGOING, si as PageActions, ri as PageContainer, ii as PageHeader, li as PageHeading, oi as PageSubtitle, ai as PageTitle, Ui as Pagination, na as PasswordInput, ra as Popover, aa as PopoverClose, la as PopoverContent, ia as PopoverTrigger, fa as Progress, va as RadioGroup, Ea as Select, Oa as Skeleton, ka as SkeletonCircle, Aa as SkeletonText, ja as Slider, Ra as Spinner, or as StatusMessage, za as Stepper, Ya as Switch, Za as Table, Xa as TableScroll, io as Tabs, so as TabsContent, ao as TabsList, oo as TabsTrigger, $a as Tbody, no as Td, po as Text, ho as Textarea, to as Th, Qa as Thead, ro as Timeline, zi as Toaster, go as ToggleGroup, _o as ToggleGroupItem, vo as Tooltip, Bi as TopBar, eo as Tr, Le as bodyLargeType, ze as bodySmallType, Re as bodyType, Be as captionType, Ge as cardHeadingType, Lo as darkTheme, en as dayOfInstant, Ne as displayType, Ke as eyebrowType, Ro as fontSizeScale, $t as formatDate, nn as formatDateTime, tn as formatInstant, Bt as fromISO, Pe as h1Type, Fe as h2Type, Io as lightTheme, cn as matchQuickPick, He as monoType, Gt as outOfRange, Ve as overlineType, ti as pageEnter, ni as pageEnterAnimation, Ue as pageTitleType, We as panelHeadingType, Jt as parseUserDate, sn as quickPicksFor, dn as rangePicksFor, an as resolveQuickPick, un as resolveRangePeriod, $ as scales, Ie as sectionTitleType, Vt as toISO, Ti as toast, Ht as todayDate, Ut as todayDateIn, Wt as todayISO };
