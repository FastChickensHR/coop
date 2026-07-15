import * as e from "@radix-ui/react-accordion";
import t, { css as n, keyframes as r } from "styled-components";
import * as i from "@radix-ui/react-avatar";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
import { CalendarDaysIcon as c, CheckIcon as l, ChevronDownIcon as u, ChevronLeftIcon as d, ChevronRightIcon as f, ChevronUpDownIcon as p, ChevronUpIcon as m, XMarkIcon as h } from "@heroicons/react/24/outline";
import { Fragment as g, createContext as _, forwardRef as v, useContext as y, useEffect as b, useId as x, useLayoutEffect as S, useMemo as ee, useRef as C, useState as w } from "react";
import * as T from "@radix-ui/react-checkbox";
import * as E from "@radix-ui/react-popover";
import { getDayOfWeek as D, getLocalTimeZone as O, getWeeksInMonth as k, parseDate as A, startOfMonth as j, today as M } from "@internationalized/date";
import * as N from "@radix-ui/react-dropdown-menu";
import * as P from "@radix-ui/react-label";
import * as F from "@radix-ui/react-dialog";
import * as I from "@radix-ui/react-progress";
import * as L from "@radix-ui/react-radio-group";
import * as R from "@radix-ui/react-select";
import * as z from "@radix-ui/react-slider";
import * as B from "@radix-ui/react-tabs";
import * as V from "@radix-ui/react-toggle-group";
import * as H from "@radix-ui/react-tooltip";
//#region src/components/Accordion/index.tsx
var U = e.Root, W = t(e.Item)`
  border-bottom: 1px solid ${({ theme: e }) => e.colors.border};

  &:first-child {
    border-top: 1px solid ${({ theme: e }) => e.colors.border};
  }
`, te = t(e.Header)`
  margin: 0;
`, ne = t(e.Trigger)`
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
`, re = r`
  from { height: 0; }
  to { height: var(--radix-accordion-content-height); }
`, ie = r`
  from { height: var(--radix-accordion-content-height); }
  to { height: 0; }
`, ae = t(e.Content)`
  overflow: hidden;
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.muted};
  line-height: ${({ theme: e }) => e.lineHeight.relaxed};

  &[data-state='open'] {
    animation: ${re} ${({ theme: e }) => e.motion.duration.base}
      ${({ theme: e }) => e.motion.easing.standard};
  }
  &[data-state='closed'] {
    animation: ${ie} ${({ theme: e }) => e.motion.duration.fast}
      ${({ theme: e }) => e.motion.easing.exit};
  }

  /* Inner padding so the animated height wraps the content cleanly. */
  & > * {
    padding: 0 ${({ theme: e }) => e.spacing.md} ${({ theme: e }) => e.spacing.lg};
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`, oe = {
	info: n`
    background-color: ${({ theme: e }) => e.colors.infoSoft};
    border-left-color: ${({ theme: e }) => e.colors.info};
    color: ${({ theme: e }) => e.colors.info};
  `,
	success: n`
    background-color: ${({ theme: e }) => e.colors.successSoft};
    border-left-color: ${({ theme: e }) => e.colors.success};
    color: ${({ theme: e }) => e.colors.success};
  `,
	warning: n`
    background-color: ${({ theme: e }) => e.colors.warningSoft};
    border-left-color: ${({ theme: e }) => e.colors.warning};
    color: ${({ theme: e }) => e.colors.warning};
  `,
	error: n`
    background-color: ${({ theme: e }) => e.colors.errorSoft};
    border-left-color: ${({ theme: e }) => e.colors.error};
    color: ${({ theme: e }) => e.colors.error};
  `
}, se = t.div`
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: ${({ theme: e }) => e.borderRadius.md};
  border-left: 3px solid;
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};

  ${({ $variant: e = "info" }) => oe[e]}
`, G = t.span`
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  padding-top: 1px;
  width: 1rem;
  height: 1rem;
`, ce = t.div`
  flex: 1;
  min-width: 0;
`, le = t.p`
  margin: 0 0 0.125rem;
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  font-size: ${({ theme: e }) => e.fontSize.sm};
`, K = t.p`
  margin: 0;
  font-size: ${({ theme: e }) => e.fontSize.sm};
  opacity: 0.9;
`, q = {
	sm: "1.75rem",
	md: "2.25rem",
	lg: "3rem"
};
function ue(e) {
	let t = e.trim().split(/\s+/).filter(Boolean);
	return t.length === 0 ? "?" : t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
}
function de({ name: e, src: t, size: n = "md", className: r }) {
	return /* @__PURE__ */ s(fe, {
		$size: n,
		className: r,
		children: [t && /* @__PURE__ */ o(pe, {
			src: t,
			alt: e
		}), /* @__PURE__ */ o(me, {
			delayMs: t ? 300 : 0,
			children: ue(e)
		})]
	});
}
var fe = t(i.Root)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size: e }) => q[e]};
  height: ${({ $size: e }) => q[e]};
  border-radius: ${({ theme: e }) => e.borderRadius.full};
  overflow: hidden;
  flex-shrink: 0;
  user-select: none;
  vertical-align: middle;
`, pe = t(i.Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`, me = t(i.Fallback)`
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
`, he = {
	active: n`
    background-color: ${({ theme: e }) => e.colors.successSoft};
    color: ${({ theme: e }) => e.colors.success};
    border: none;
  `,
	pending: n`
    background-color: ${({ theme: e }) => e.colors.warningSoft};
    color: ${({ theme: e }) => e.colors.warning};
    border: none;
  `,
	terminated: n`
    background-color: ${({ theme: e }) => e.colors.errorSoft};
    color: ${({ theme: e }) => e.colors.error};
    border: none;
  `,
	draft: n`
    background-color: ${({ theme: e }) => e.colors.surface2};
    color: ${({ theme: e }) => e.colors.muted};
    border: none;
  `
}, ge = {
	inbound: n`
    background-color: transparent;
    color: ${({ theme: e }) => e.colors.info};
    border: 1px solid ${({ theme: e }) => e.colors.borderStrong};
  `,
	outbound: n`
    background-color: transparent;
    color: ${({ theme: e }) => e.colors.success};
    border: 1px solid ${({ theme: e }) => e.colors.borderStrong};
  `,
	default: n`
    background-color: transparent;
    color: ${({ theme: e }) => e.colors.muted};
    border: 1px solid ${({ theme: e }) => e.colors.borderStrong};
  `
}, _e = {
	...he,
	...ge
}, ve = t.span`
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

  ${({ $variant: e = "default" }) => _e[e]}
`;
//#endregion
//#region src/components/Breadcrumbs/index.tsx
function ye({ items: e, className: t }) {
	return /* @__PURE__ */ o(be, {
		"aria-label": "Breadcrumb",
		className: t,
		children: /* @__PURE__ */ o(xe, { children: e.map((t, n) => {
			let r = n === e.length - 1;
			return /* @__PURE__ */ s(g, { children: [/* @__PURE__ */ o("li", { children: t.href && !r ? /* @__PURE__ */ o(Se, {
				href: t.href,
				children: t.label
			}) : /* @__PURE__ */ o(Ce, {
				"aria-current": r ? "page" : void 0,
				children: t.label
			}) }), !r && /* @__PURE__ */ o(we, {
				"aria-hidden": "true",
				children: /* @__PURE__ */ o(f, {
					width: 14,
					height: 14
				})
			})] }, n);
		}) })
	});
}
var be = t.nav`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
`, xe = t.ol`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme: e }) => e.spacing.xs};
  list-style: none;
  margin: 0;
  padding: 0;
`, Se = t.a`
  color: ${({ theme: e }) => e.colors.muted};
  text-decoration: none;

  &:hover {
    color: ${({ theme: e }) => e.colors.ink};
    text-decoration: underline;
  }
`, Ce = t.span`
  color: ${({ theme: e }) => e.colors.ink};
  font-weight: ${({ theme: e }) => e.fontWeight.medium};
`, we = t.span`
  display: inline-flex;
  color: ${({ theme: e }) => e.colors.subtle};
`, Te = {
	primary: n`
    background-color: ${({ theme: e }) => e.colors.ink900};
    color: ${({ theme: e }) => e.colors.brand50};
    border: 1px solid ${({ theme: e }) => e.colors.brand50};
    &:hover:not(:disabled) {
      background-color: ${({ theme: e }) => e.colors.brand50};
      color: ${({ theme: e }) => e.colors.ink900};
    }
  `,
	secondary: n`
    background-color: ${({ theme: e }) => e.colors.canvas};
    color: ${({ theme: e }) => e.colors.ink};
    border: 1px solid ${({ theme: e }) => e.colors.borderStrong};
    &:hover:not(:disabled) { background-color: ${({ theme: e }) => e.colors.surface}; }
  `,
	danger: n`
    background-color: transparent;
    color: ${({ theme: e }) => e.colors.brand};
    border: 1px solid ${({ theme: e }) => e.colors.brand};
    &:hover:not(:disabled) { background-color: ${({ theme: e }) => e.colors.brandSoft}; }
  `,
	ghost: n`
    background-color: transparent;
    color: ${({ theme: e }) => e.colors.ink};
    border: 1px solid transparent;
    &:hover:not(:disabled) { background-color: ${({ theme: e }) => e.colors.surface2}; }
  `
}, Ee = {
	sm: n`
    height: 34px;
    padding: 0 0.75rem;
    font-size: ${({ theme: e }) => e.fontSize.xs};
  `,
	md: n`
    height: 44px;
    padding: 0 1.25rem;
    font-size: ${({ theme: e }) => e.fontSize.base};
  `,
	lg: n`
    height: 54px;
    padding: 0 1.5rem;
    font-size: ${({ theme: e }) => e.fontSize.lg};
  `
}, De = t.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: ${({ theme: e }) => e.borderRadius.md};
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-weight: ${({ theme: e }) => e.fontWeight.bold};
  cursor: pointer;
  transition: background-color 150ms ease, opacity 150ms ease;
  white-space: nowrap;
  box-shadow: ${({ theme: e }) => e.boxShadow.card};

  ${({ $variant: e = "primary" }) => Te[e]}
  ${({ $size: e = "md" }) => Ee[e]}

  &:disabled {
    background-color: ${({ theme: e }) => e.colors.surface2};
    color: ${({ theme: e }) => e.colors.subtle};
    border-color: transparent;
    cursor: not-allowed;
    box-shadow: none;
  }
`, Oe = t.div`
  background-color: ${({ theme: e }) => e.colors.canvas};
  border: 1px solid ${({ theme: e }) => e.colors.border};
  border-radius: ${({ theme: e }) => e.borderRadius.lg};
  box-shadow: ${({ theme: e }) => e.boxShadow.card};
  overflow: hidden;

  ${({ theme: e, $interactive: t }) => t && `
    cursor: pointer;
    transition: border-color ${e.motion.duration.fast} ${e.motion.easing.standard},
      box-shadow ${e.motion.duration.fast} ${e.motion.easing.standard};
    &:hover {
      border-color: ${e.colors.borderStrong};
      box-shadow: ${e.boxShadow.pop};
    }
  `}
`, ke = t.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme: e }) => e.spacing.lg};
  padding: ${({ theme: e }) => e.spacing.lg} ${({ theme: e }) => e.spacing.xl};
  border-bottom: 1px solid ${({ theme: e }) => e.colors.border};
`, Ae = t.h3`
  font-family: ${({ theme: e }) => e.typography.fontFamily.display};
  font-size: ${({ theme: e }) => e.fontSize.base};
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  color: ${({ theme: e }) => e.colors.ink};
  margin: 0;
`, je = t.div`
  display: flex;
  align-items: center;
  gap: ${({ theme: e }) => e.spacing.sm};
  flex-shrink: 0;
`, Me = t.div`
  padding: ${({ theme: e }) => e.spacing.xl};
`, Ne = t.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme: e }) => e.spacing.md};
  padding: ${({ theme: e }) => e.spacing.lg} ${({ theme: e }) => e.spacing.xl};
  border-top: 1px solid ${({ theme: e }) => e.colors.border};
  background-color: ${({ theme: e }) => e.colors.surface};
`, Pe = {
	error: "errorSoft",
	warning: "warningSoft",
	success: "successSoft"
}, Fe = _(null);
function J() {
	let e = y(Fe);
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
var Ie = t.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: ${({ $disabled: e }) => e ? "not-allowed" : "pointer"};
`, Le = t(T.Root)`
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
`, Re = t(T.Indicator)`
  display: inline-flex;
  color: ${({ theme: e }) => e.colors.canvas};
  svg {
    width: 14px;
    height: 14px;
    stroke-width: 3;
  }
`, ze = t.label`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.ink};
  cursor: inherit;
`;
function Be({ checked: e, onCheckedChange: t, disabled: n, id: r, children: i, className: a, ...c }) {
	let { fieldProps: u } = J(), d = x(), f = r ?? u.id ?? `checkbox-${d}`;
	return /* @__PURE__ */ s(Ie, {
		$disabled: n,
		className: a,
		children: [/* @__PURE__ */ o(Le, {
			id: f,
			checked: e,
			onCheckedChange: (e) => t?.(e === !0),
			disabled: n,
			"aria-label": c["aria-label"],
			"aria-describedby": u["aria-describedby"],
			"aria-invalid": u["aria-invalid"],
			"aria-required": u["aria-required"],
			children: /* @__PURE__ */ o(Re, { children: /* @__PURE__ */ o(l, {}) })
		}), i != null && /* @__PURE__ */ o(ze, {
			htmlFor: f,
			children: i
		})]
	});
}
//#endregion
//#region src/components/Chip/index.tsx
function Ve({ children: e, onRemove: t, removeLabel: n = "Remove", className: r }) {
	return /* @__PURE__ */ s(He, {
		className: r,
		children: [/* @__PURE__ */ o(Ue, { children: e }), t && /* @__PURE__ */ o(We, {
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
var He = t.span`
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
`, Ue = t.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 0.125rem;
`, We = t.button`
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
`, Y = (e) => n`
  ${e && n`
    border-color: ${({ theme: t }) => t.colors[e]};
    box-shadow: 0 0 0 3px ${({ theme: t }) => t.colors[Pe[e]]};
  `}

  &:focus {
    border-color: ${({ theme: e }) => e.colors.accent};
    box-shadow: 0 0 0 3px ${({ theme: e }) => e.colors.accentSoft};
  }
`;
//#endregion
//#region src/components/Combobox/index.tsx
function Ge({ options: e, value: t, onValueChange: n, placeholder: r = "Search…", disabled: i, $hasError: a, id: c, className: u, "aria-label": d }) {
	let { fieldProps: f, status: m } = J(), h = a ? "error" : m, [g, _] = w(!1), [v, y] = w(""), [x, S] = w(0), T = C(null), E = C(null), D = e.find((e) => e.value === t), O = ee(() => {
		let t = v.trim().toLowerCase();
		return t ? e.filter((e) => e.label.toLowerCase().includes(t)) : e;
	}, [e, v]), k = O.length ? Math.min(x, O.length - 1) : 0;
	b(() => {
		if (!g) return;
		function e(e) {
			T.current && !T.current.contains(e.target) && _(!1);
		}
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [g]), b(() => {
		E.current?.querySelector(`[data-index="${k}"]`)?.scrollIntoView({ block: "nearest" });
	}, [k, g]);
	function A(e) {
		e && (n?.(e.value), y(""), _(!1));
	}
	function j(e) {
		e.key === "ArrowDown" ? (e.preventDefault(), g ? S((e) => Math.min(e + 1, O.length - 1)) : _(!0)) : e.key === "ArrowUp" ? (e.preventDefault(), S((e) => Math.max(e - 1, 0))) : e.key === "Enter" ? g && (e.preventDefault(), A(O[k])) : e.key === "Escape" && _(!1);
	}
	let M = g ? v : D?.label ?? "";
	return /* @__PURE__ */ s(Ke, {
		ref: T,
		className: u,
		children: [
			/* @__PURE__ */ o(qe, {
				id: c ?? f.id,
				role: "combobox",
				"aria-expanded": g,
				"aria-controls": "combobox-list",
				"aria-label": d,
				"aria-describedby": f["aria-describedby"],
				"aria-required": f["aria-required"],
				"aria-invalid": h === "error" || void 0,
				$status: h,
				disabled: i,
				placeholder: D && !g ? D.label : r,
				value: M,
				onFocus: () => _(!0),
				onChange: (e) => {
					y(e.target.value), S(0), _(!0);
				},
				onKeyDown: j
			}),
			/* @__PURE__ */ o(Je, {
				"aria-hidden": "true",
				children: /* @__PURE__ */ o(p, {
					width: 18,
					height: 18
				})
			}),
			g && /* @__PURE__ */ o(Ye, {
				id: "combobox-list",
				ref: E,
				role: "listbox",
				children: O.length === 0 ? /* @__PURE__ */ o(Ze, { children: "No matches" }) : O.map((e, n) => /* @__PURE__ */ s(Xe, {
					"data-index": n,
					role: "option",
					"aria-selected": e.value === t,
					$active: n === k,
					onMouseEnter: () => S(n),
					onMouseDown: (t) => {
						t.preventDefault(), A(e);
					},
					children: [/* @__PURE__ */ o("span", { children: e.label }), e.value === t && /* @__PURE__ */ o(l, {
						width: 16,
						height: 16
					})]
				}, e.value))
			})
		]
	});
}
var Ke = t.div`
  position: relative;
  width: 100%;
`, qe = t.input`
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

  ${({ $status: e }) => Y(e)}

  &:disabled {
    background-color: ${({ theme: e }) => e.colors.surface2};
    color: ${({ theme: e }) => e.colors.subtle};
    cursor: not-allowed;
  }
  &::placeholder {
    color: ${({ theme: e }) => e.colors.subtle};
  }
`, Je = t.span`
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
`, Ye = t.ul`
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
`, Xe = t.li`
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
`, Ze = t.li`
  padding: ${({ theme: e }) => e.spacing.md};
  text-align: center;
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.muted};
`, Qe = /^\d{4}-\d{2}-\d{2}$/;
function X(e) {
	if (!e || !Qe.test(e)) return null;
	try {
		return A(e);
	} catch {
		return null;
	}
}
function $e(e) {
	return e ? e.toString() : null;
}
var et = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
function tt(e) {
	let t = e.trim();
	if (!t) return null;
	if (Qe.test(t)) return X(t);
	let n = et.exec(t);
	if (n) {
		let [, e, t, r] = n;
		return X(`${r}-${e.padStart(2, "0")}-${t.padStart(2, "0")}`);
	}
	return null;
}
var nt = new Intl.DateTimeFormat("en-US", {
	month: "short",
	day: "numeric",
	year: "numeric",
	timeZone: "UTC"
}), rt = new Intl.DateTimeFormat("en-US", {
	month: "short",
	day: "numeric",
	year: "numeric"
});
function it(e, t = "—") {
	if (!e) return t;
	let n = X(e);
	if (n) return nt.format(new Date(Date.UTC(n.year, n.month - 1, n.day)));
	let r = new Date(e);
	return Number.isNaN(r.getTime()) ? t : rt.format(r);
}
function at(e, t = "—") {
	if (!e) return t;
	let [n, r, i] = e.slice(0, 10).split("-");
	return !n || !r || !i ? t : `${r}/${i}/${n}`;
}
//#endregion
//#region src/components/DatePicker/index.tsx
var ot = "en-US", st = [
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
], ct = [
	"Su",
	"Mo",
	"Tu",
	"We",
	"Th",
	"Fr",
	"Sa"
];
function lt(e) {
	let t = j(e), n = D(t, ot), r = t.subtract({ days: n }), i = k(e, ot);
	return Array.from({ length: i * 7 }, (e, t) => r.add({ days: t }));
}
function Z(e, t, n) {
	return !!t && e < t || !!n && e > n;
}
function ut(e) {
	return `${st[e.month - 1]} ${e.day}, ${e.year}`;
}
var dt = t.div`
  position: relative;
  width: 100%;
`, ft = t.input`
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

  ${({ $status: e }) => Y(e)}

  &:disabled {
    background-color: ${({ theme: e }) => e.colors.surface2};
    color: ${({ theme: e }) => e.colors.subtle};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${({ theme: e }) => e.colors.subtle};
  }
`, pt = t.button`
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
`, mt = t(E.Content)`
  background-color: ${({ theme: e }) => e.colors.canvas};
  border: 1px solid ${({ theme: e }) => e.colors.border};
  border-radius: ${({ theme: e }) => e.borderRadius.md};
  box-shadow: ${({ theme: e }) => e.boxShadow.pop};
  padding: 0.75rem;
  z-index: 50;
`, ht = t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`, gt = t.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid ${({ theme: e }) => e.colors.border};
  border-radius: ${({ theme: e }) => e.borderRadius.sm};
  background: none;
  color: ${({ theme: e }) => e.colors.muted};
  cursor: pointer;

  &:hover { background-color: ${({ theme: e }) => e.colors.surface2}; color: ${({ theme: e }) => e.colors.ink}; }
  svg { width: 15px; height: 15px; }
`, _t = t.span`
  font-family: ${({ theme: e }) => e.typography.fontFamily.display};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  color: ${({ theme: e }) => e.colors.ink};
`, vt = t.div`
  display: grid;
  grid-template-columns: repeat(7, 2rem);
`, yt = t.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.75rem;
  font-family: ${({ theme: e }) => e.typography.fontFamily.mono};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  color: ${({ theme: e }) => e.colors.muted};
`, bt = t.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
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
`, xt = t.p`
  margin: 0.375rem 0 0;
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  color: ${({ theme: e }) => e.colors.error};
`, St = t.button`
  margin-top: 0.375rem;
  padding: 0;
  background: none;
  border: none;
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  color: ${({ theme: e }) => e.colors.muted};
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 2px;

  &:hover { color: ${({ theme: e }) => e.colors.ink}; }
`;
function Ct({ value: e, onValueChange: t, min: n, max: r, allowOpenEnded: i, openEndedLabel: l, placeholder: u = "MM/DD/YYYY", disabled: p, $hasError: m, id: h, "aria-label": g, "aria-labelledby": _, className: v }) {
	let { fieldProps: y, status: b } = J(), x = m ? "error" : b, [T, D] = w(!1), [k, A] = w(""), [N, P] = w(!1), [F, I] = w(!1), L = C(null), R = C(!1), [z, B] = w(() => X(e) ?? M(O())), [V, H] = w(() => X(e) ?? M(O())), U = C(null), W = h ?? y.id, te = W ? `${W}-parse-error` : void 0;
	S(() => {
		F && U.current?.querySelector(`[data-date="${V.toString()}"]`)?.focus();
	}, [F, V]);
	function ne(t) {
		if (t) {
			let t = X(e) ?? M(O());
			B(j(t)), H(t);
		}
		I(t);
	}
	function re(e) {
		let i = e.trim();
		if (!i) {
			P(!1), t?.(null);
			return;
		}
		let a = $e(tt(i));
		if (!a || Z(a, n, r)) {
			P(!0);
			return;
		}
		P(!1), t?.(a);
	}
	function ie(e) {
		let i = e.toString();
		Z(i, n, r) || (P(!1), t?.(i), I(!1));
	}
	function ae(e) {
		H(e), (e.month !== z.month || e.year !== z.year) && B(j(e));
	}
	function oe(e) {
		let t = {
			ArrowLeft: () => V.subtract({ days: 1 }),
			ArrowRight: () => V.add({ days: 1 }),
			ArrowUp: () => V.subtract({ weeks: 1 }),
			ArrowDown: () => V.add({ weeks: 1 }),
			PageUp: () => V.subtract({ months: 1 }),
			PageDown: () => V.add({ months: 1 }),
			Home: () => j(V)
		}[e.key];
		t && (e.preventDefault(), ae(t()));
	}
	let se = ee(() => lt(z), [z]), G = M(O()).toString(), ce = e ?? null, le = V.toString(), K = i === !0 && e == null, q = e ? it(e) : "", ue = T ? k : e ? q : K && l ? l : "";
	return /* @__PURE__ */ s(a, { children: [/* @__PURE__ */ s(E.Root, {
		open: F,
		onOpenChange: ne,
		children: [
			/* @__PURE__ */ s(dt, {
				className: v,
				children: [/* @__PURE__ */ o(ft, {
					ref: L,
					$openEnded: K && !T,
					id: W,
					"aria-label": g,
					"aria-labelledby": _,
					"aria-invalid": N || y["aria-invalid"] || void 0,
					"aria-required": y["aria-required"],
					"aria-describedby": [N ? te : void 0, y["aria-describedby"]].filter(Boolean).join(" ") || void 0,
					$status: N ? "error" : x,
					disabled: p,
					placeholder: u,
					value: ue,
					onFocus: () => {
						D(!0), R.current = !1, A(K ? "" : q);
					},
					onChange: (e) => {
						let i = e.target.value;
						A(i), R.current = !0, N && P(!1);
						let a = $e(tt(i));
						a && !Z(a, n, r) && t?.(a);
					},
					onBlur: () => {
						D(!1), R.current && (R.current = !1, re(k));
					},
					onKeyDown: (e) => {
						e.key === "Enter" && (e.preventDefault(), R.current && (R.current = !1, re(k)));
					}
				}), /* @__PURE__ */ o(E.Trigger, {
					asChild: !0,
					children: /* @__PURE__ */ o(pt, {
						type: "button",
						disabled: p,
						"aria-label": "Open calendar",
						children: /* @__PURE__ */ o(c, {})
					})
				})]
			}),
			i && !p && (e == null ? /* @__PURE__ */ o(St, {
				type: "button",
				onClick: () => {
					D(!0), A(""), L.current?.focus();
				},
				children: "Pick a date"
			}) : /* @__PURE__ */ s(St, {
				type: "button",
				onClick: () => {
					P(!1), t?.(null);
				},
				children: ["Set to ", l ?? "open-ended"]
			})),
			/* @__PURE__ */ o(E.Portal, { children: /* @__PURE__ */ s(mt, {
				align: "start",
				sideOffset: 4,
				role: "dialog",
				"aria-label": "Choose date",
				onOpenAutoFocus: (e) => e.preventDefault(),
				children: [/* @__PURE__ */ s(ht, { children: [
					/* @__PURE__ */ o(gt, {
						type: "button",
						"aria-label": "Previous month",
						onClick: () => B(z.subtract({ months: 1 })),
						children: /* @__PURE__ */ o(d, {})
					}),
					/* @__PURE__ */ s(_t, { children: [
						st[z.month - 1],
						" ",
						z.year
					] }),
					/* @__PURE__ */ o(gt, {
						type: "button",
						"aria-label": "Next month",
						onClick: () => B(z.add({ months: 1 })),
						children: /* @__PURE__ */ o(f, {})
					})
				] }), /* @__PURE__ */ s(vt, {
					ref: U,
					onKeyDown: oe,
					children: [ct.map((e) => /* @__PURE__ */ o(yt, {
						"aria-hidden": "true",
						children: e
					}, e)), se.map((e) => {
						let t = e.toString(), i = e.month === z.month && e.year === z.year, a = t === ce;
						return /* @__PURE__ */ o(bt, {
							type: "button",
							"data-date": t,
							tabIndex: t === le ? 0 : -1,
							"aria-label": ut(e),
							"aria-pressed": a,
							"aria-current": t === G ? "date" : void 0,
							disabled: Z(t, n, r),
							$selected: a,
							$today: t === G,
							$outside: !i,
							onClick: () => ie(e),
							children: e.day
						}, t);
					})]
				})]
			}) })
		]
	}), N && /* @__PURE__ */ s(xt, {
		id: te,
		role: "alert",
		children: [
			"Enter a date like ",
			G,
			" or ",
			at(G),
			"."
		]
	})] });
}
//#endregion
//#region src/components/DateRangePicker/index.tsx
var wt = t.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
`, Tt = t.div`
  flex: 1 1 0;
  min-width: 0;
`, Et = t.span`
  flex-shrink: 0;
  color: ${({ theme: e }) => e.colors.muted};
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
`;
function Dt({ start: e, end: t, onStartChange: n, onEndChange: r, min: i, max: a, allowOpenEndedStart: c, allowOpenEndedEnd: l, startOpenEndedLabel: u, endOpenEndedLabel: d, startId: f, endId: p, startAriaLabel: m = "Start date", endAriaLabel: h = "End date", disabled: g, $hasError: _ }) {
	return /* @__PURE__ */ s(wt, { children: [
		/* @__PURE__ */ o(Tt, { children: /* @__PURE__ */ o(Ct, {
			id: f,
			"aria-label": m,
			value: e,
			onValueChange: n,
			min: i || void 0,
			max: t || a || void 0,
			allowOpenEnded: c,
			openEndedLabel: u,
			disabled: g,
			$hasError: _
		}) }),
		/* @__PURE__ */ o(Et, {
			"aria-hidden": "true",
			children: "–"
		}),
		/* @__PURE__ */ o(Tt, { children: /* @__PURE__ */ o(Ct, {
			id: p,
			"aria-label": h,
			value: t,
			onValueChange: r,
			min: e || i || void 0,
			max: a || void 0,
			allowOpenEnded: l,
			openEndedLabel: d,
			disabled: g,
			$hasError: _
		}) })
	] });
}
//#endregion
//#region src/components/DescriptionList/index.tsx
var Ot = t.dl`
  display: grid;
  grid-template-columns: minmax(8rem, 12rem) 1fr;
  gap: ${({ theme: e }) => e.spacing.sm} ${({ theme: e }) => e.spacing.lg};
  margin: 0;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: ${({ theme: e }) => e.spacing.xs} 0;
  }
`, kt = t.dt`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.muted};
  margin: 0;
`, At = t.dd`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.ink};
  margin: 0;

  @media (max-width: 480px) {
    margin-bottom: ${({ theme: e }) => e.spacing.sm};
  }
`, jt = N.Root, Mt = N.Trigger, Nt = r`
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
`, Pt = t(N.Content)`
  min-width: 11rem;
  padding: ${({ theme: e }) => e.spacing.xs};
  background-color: ${({ theme: e }) => e.colors.canvas};
  border: 1px solid ${({ theme: e }) => e.colors.border};
  border-radius: ${({ theme: e }) => e.borderRadius.md};
  box-shadow: ${({ theme: e }) => e.boxShadow.pop};
  z-index: 60;
  animation: ${Nt} ${({ theme: e }) => e.motion.duration.fast}
    ${({ theme: e }) => e.motion.easing.enter};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
function Ft(e) {
	return /* @__PURE__ */ o(N.Portal, { children: /* @__PURE__ */ o(Pt, {
		align: "end",
		sideOffset: 4,
		...e
	}) });
}
//#endregion
//#region src/components/DropdownMenu/items.tsx
var It = t(N.Item)`
  display: flex;
  align-items: center;
  gap: ${({ theme: e }) => e.spacing.sm};
  padding: ${({ theme: e }) => e.spacing.sm} ${({ theme: e }) => e.spacing.md};
  border-radius: ${({ theme: e }) => e.borderRadius.sm};
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e, $danger: t }) => t ? e.colors.error : e.colors.ink};
  cursor: pointer;
  outline: none;
  user-select: none;

  &[data-highlighted] {
    background-color: ${({ theme: e, $danger: t }) => t ? e.colors.errorSoft : e.colors.surface2};
  }

  &[data-disabled] {
    color: ${({ theme: e }) => e.colors.subtle};
    cursor: not-allowed;
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`, Lt = t(N.Separator)`
  height: 1px;
  margin: ${({ theme: e }) => e.spacing.xs} 0;
  background-color: ${({ theme: e }) => e.colors.border};
`, Rt = t(N.Label)`
  padding: ${({ theme: e }) => e.spacing.xs} ${({ theme: e }) => e.spacing.md};
  font-size: ${({ theme: e }) => e.fontSize.xs};
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme: e }) => e.colors.subtle};
`;
//#endregion
//#region src/components/EmptyState/index.tsx
function zt({ icon: e, title: t, description: n, action: r, className: i }) {
	return /* @__PURE__ */ s(Bt, {
		className: i,
		children: [
			e && /* @__PURE__ */ o(Vt, {
				"aria-hidden": "true",
				children: e
			}),
			/* @__PURE__ */ o(Ht, { children: t }),
			n && /* @__PURE__ */ o(Ut, { children: n }),
			r && /* @__PURE__ */ o(Wt, { children: r })
		]
	});
}
var Bt = t.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${({ theme: e }) => e.spacing.sm};
  padding: ${({ theme: e }) => e.spacing["3xl"]} ${({ theme: e }) => e.spacing.xl};
  color: ${({ theme: e }) => e.colors.muted};
`, Vt = t.div`
  color: ${({ theme: e }) => e.colors.subtle};
  margin-bottom: ${({ theme: e }) => e.spacing.xs};

  svg {
    width: 2.5rem;
    height: 2.5rem;
  }
`, Ht = t.p`
  font-family: ${({ theme: e }) => e.typography.fontFamily.display};
  font-size: ${({ theme: e }) => e.fontSize.lg};
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  color: ${({ theme: e }) => e.colors.ink};
  margin: 0;
`, Ut = t.p`
  font-size: ${({ theme: e }) => e.fontSize.sm};
  max-width: 40ch;
  line-height: ${({ theme: e }) => e.lineHeight.relaxed};
  margin: 0;
`, Wt = t.div`
  margin-top: ${({ theme: e }) => e.spacing.md};
`, Gt = t(P.Root)`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  font-weight: ${({ theme: e }) => e.fontWeight.medium};
  color: ${({ theme: e }) => e.colors.ink};
  cursor: default;
`, Kt = t.input`
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
  transition: border-color 150ms ease, box-shadow 150ms ease;

  ${({ $status: e }) => Y(e)}

  &:disabled {
    background-color: ${({ theme: e }) => e.colors.surface2};
    color: ${({ theme: e }) => e.colors.subtle};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${({ theme: e }) => e.colors.subtle};
  }
`, qt = v(function({ $hasError: e, ...t }, n) {
	let { fieldProps: r, status: i } = J();
	return /* @__PURE__ */ o(Kt, {
		ref: n,
		$status: e ? "error" : i,
		...r,
		...t
	});
}), Jt = t.p`
  font-size: ${({ theme: e }) => e.fontSize.xs};
  color: ${({ theme: e }) => e.colors.error};
  margin: 0;
`, Yt = t.p`
  font-size: ${({ theme: e }) => e.fontSize.xs};
  color: ${({ theme: e, $status: t }) => e.colors[t]};
  margin: 0;
`, Xt = t.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`, Zt = t.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`, Qt = t(Gt)`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
`, $t = t.span`
  color: ${({ theme: e }) => e.colors.brand};
`, en = t.p`
  font-size: ${({ theme: e }) => e.fontSize.xs};
  color: ${({ theme: e }) => e.colors.muted};
  margin: 0;
`;
function tn(e, t, n) {
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
function nn({ label: e, description: t, error: n, warning: r, success: i, required: a = !1, htmlFor: c, className: l, children: u }) {
	let d = x(), f = c ?? `field-${d}`, p = t ? `${f}-description` : void 0, m = tn(n, r, i), h = m?.status, g = h ? `${f}-status` : void 0, _ = ee(() => ({
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
	return /* @__PURE__ */ o(Fe.Provider, {
		value: _,
		children: /* @__PURE__ */ s(Zt, {
			className: l,
			children: [
				/* @__PURE__ */ s(Qt, {
					htmlFor: f,
					children: [e, a && /* @__PURE__ */ o($t, {
						"aria-hidden": "true",
						children: "*"
					})]
				}),
				u,
				t && /* @__PURE__ */ o(en, {
					id: p,
					children: t
				}),
				m && /* @__PURE__ */ o(Yt, {
					id: g,
					$status: m.status,
					role: m.status === "error" ? "alert" : void 0,
					children: m.message
				})
			]
		})
	});
}
//#endregion
//#region src/components/Modal/index.tsx
function rn({ open: e, onOpenChange: t, title: n, description: r, children: i, footer: a, width: c }) {
	return /* @__PURE__ */ o(F.Root, {
		open: e,
		onOpenChange: t,
		children: /* @__PURE__ */ s(F.Portal, { children: [/* @__PURE__ */ o(sn, {}), /* @__PURE__ */ s(cn, {
			style: c ? { maxWidth: c } : void 0,
			children: [
				/* @__PURE__ */ s(ln, { children: [/* @__PURE__ */ s(un, { children: [/* @__PURE__ */ o(dn, { children: n }), r ? /* @__PURE__ */ o(fn, { children: r }) : /* @__PURE__ */ o(F.Description, {
					"aria-hidden": !0,
					style: { display: "none" }
				})] }), /* @__PURE__ */ o(F.Close, {
					asChild: !0,
					children: /* @__PURE__ */ o(pn, {
						"aria-label": "Close",
						children: /* @__PURE__ */ o(h, {
							width: 20,
							height: 20
						})
					})
				})] }),
				/* @__PURE__ */ o(mn, { children: i }),
				a && /* @__PURE__ */ o(hn, { children: a })
			]
		})] })
	});
}
var an = r`from { opacity: 0; } to { opacity: 1; }`, on = r`
  from { opacity: 0; transform: translate(-50%, -48%) scale(0.98); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`, sn = t(F.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.45);
  animation: ${an} ${({ theme: e }) => e.motion.duration.base} ${({ theme: e }) => e.motion.easing.enter};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`, cn = t(F.Content)`
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
  animation: ${on} ${({ theme: e }) => e.motion.duration.base} ${({ theme: e }) => e.motion.easing.enter};

  &:focus {
    outline: none;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`, ln = t.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme: e }) => e.spacing.lg};
  padding: ${({ theme: e }) => e.spacing.xl} ${({ theme: e }) => e.spacing.xl} ${({ theme: e }) => e.spacing.lg};
  flex-shrink: 0;
`, un = t.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme: e }) => e.spacing.xs};
  min-width: 0;
`, dn = t(F.Title)`
  font-family: ${({ theme: e }) => e.typography.fontFamily.display};
  font-size: ${({ theme: e }) => e.fontSize.lg};
  font-weight: ${({ theme: e }) => e.fontWeight.semibold};
  color: ${({ theme: e }) => e.colors.ink};
  margin: 0;
`, fn = t(F.Description)`
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.muted};
  margin: 0;
`, pn = t.button`
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
`, mn = t.div`
  padding: 0 ${({ theme: e }) => e.spacing.xl};
  overflow-y: auto;
`, hn = t.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme: e }) => e.spacing.md};
  padding: ${({ theme: e }) => e.spacing.xl};
  flex-shrink: 0;
`, gn = t(qt)`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
  appearance: textfield;
`;
function _n({ inputMode: e = "numeric", ...t }) {
	return /* @__PURE__ */ o(gn, {
		type: "number",
		inputMode: e,
		...t
	});
}
//#endregion
//#region src/components/Pagination/index.tsx
function vn({ page: e, pageCount: t, onPageChange: n, className: r }) {
	if (t <= 1) return null;
	let i = bn(e, t);
	return /* @__PURE__ */ s(xn, {
		"aria-label": "Pagination",
		className: r,
		children: [
			/* @__PURE__ */ o(Cn, {
				type: "button",
				"aria-label": "Previous page",
				disabled: e <= 1,
				onClick: () => n(e - 1),
				children: /* @__PURE__ */ o(d, {
					width: 16,
					height: 16
				})
			}),
			i.map((t, r) => t === yn ? /* @__PURE__ */ o(Tn, {
				"aria-hidden": "true",
				children: "…"
			}, `gap-${r}`) : /* @__PURE__ */ o(wn, {
				type: "button",
				$active: t === e,
				"aria-current": t === e ? "page" : void 0,
				onClick: () => n(t),
				children: t
			}, t)),
			/* @__PURE__ */ o(Cn, {
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
var yn = -1;
function bn(e, t) {
	let n = [.../* @__PURE__ */ new Set([
		1,
		t,
		e,
		e - 1,
		e + 1
	])].filter((e) => e >= 1 && e <= t).sort((e, t) => e - t), r = [], i = 0;
	for (let e of n) e - i > 1 && r.push(yn), r.push(e), i = e;
	return r;
}
var xn = t.nav`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme: e }) => e.spacing.xs};
`, Sn = "\n  min-width: 2rem;\n  height: 2rem;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 8px;\n  cursor: pointer;\n", Cn = t.button`
  ${Sn}
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
`, wn = t.button`
  ${Sn}
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
`, Tn = t.span`
  min-width: 1.5rem;
  text-align: center;
  color: ${({ theme: e }) => e.colors.subtle};
`, En = E.Root, Dn = E.Trigger, On = E.Close, kn = r`
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
`, An = t(E.Content)`
  min-width: 14rem;
  max-width: min(24rem, calc(100vw - 2rem));
  padding: ${({ theme: e }) => e.spacing.lg};
  background-color: ${({ theme: e }) => e.colors.canvas};
  border: 1px solid ${({ theme: e }) => e.colors.border};
  border-radius: ${({ theme: e }) => e.borderRadius.md};
  box-shadow: ${({ theme: e }) => e.boxShadow.pop};
  z-index: 60;
  animation: ${kn} ${({ theme: e }) => e.motion.duration.fast}
    ${({ theme: e }) => e.motion.easing.enter};

  &:focus {
    outline: none;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`, jn = t(E.Arrow)`
  fill: ${({ theme: e }) => e.colors.canvas};
  stroke: ${({ theme: e }) => e.colors.border};
  stroke-width: 1px;
`;
function Mn(e) {
	let { children: t, ...n } = e;
	return /* @__PURE__ */ o(E.Portal, { children: /* @__PURE__ */ s(An, {
		align: "start",
		sideOffset: 6,
		...n,
		children: [t, /* @__PURE__ */ o(jn, {})]
	}) });
}
//#endregion
//#region src/components/Progress/index.tsx
var Nn = t(I.Root)`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 0.5rem;
  border-radius: ${({ theme: e }) => e.borderRadius.full};
  background-color: ${({ theme: e }) => e.colors.surface2};
`, Pn = t(I.Indicator)`
  height: 100%;
  background-color: ${({ theme: e }) => e.colors.accent};
  border-radius: inherit;
  transition: width ${({ theme: e }) => e.motion.duration.slow}
    ${({ theme: e }) => e.motion.easing.standard};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
function Fn({ value: e, className: t, ...n }) {
	let r = e == null ? null : Math.max(0, Math.min(100, e));
	return /* @__PURE__ */ o(Nn, {
		value: r,
		className: t,
		...n,
		children: /* @__PURE__ */ o(Pn, { style: { width: `${r ?? 0}%` } })
	});
}
//#endregion
//#region src/components/RadioGroup/index.tsx
var In = t(L.Root)`
  display: flex;
  flex-direction: ${({ $horizontal: e }) => e ? "row" : "column"};
  flex-wrap: ${({ $horizontal: e }) => e ? "wrap" : "nowrap"};
  gap: ${({ $horizontal: e }) => e ? "1.25rem" : "0.5rem"};
`, Ln = t.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: ${({ $disabled: e }) => e ? "not-allowed" : "pointer"};
`, Rn = t(L.Item)`
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
`, zn = t(L.Indicator)`
  display: inline-flex;
  &::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ theme: e }) => e.colors.accent};
  }
`, Bn = t.label`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  color: ${({ theme: e }) => e.colors.ink};
  cursor: inherit;
`;
function Vn({ value: e, onValueChange: t, options: n, disabled: r, id: i, name: a, orientation: c = "vertical", className: l, ...u }) {
	let { fieldProps: d } = J(), f = x(), p = i ?? d.id ?? `radiogroup-${f}`;
	return /* @__PURE__ */ o(In, {
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
			return /* @__PURE__ */ s(Ln, {
				$disabled: r || e.disabled,
				children: [/* @__PURE__ */ o(Rn, {
					value: e.value,
					id: t,
					disabled: e.disabled,
					children: /* @__PURE__ */ o(zn, {})
				}), /* @__PURE__ */ o(Bn, {
					htmlFor: t,
					children: e.label
				})]
			}, e.value);
		})
	});
}
//#endregion
//#region src/components/Select/index.tsx
var Hn = t(R.Trigger)`
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

  ${({ $status: e }) => Y(e)}

  &[data-disabled] {
    background-color: ${({ theme: e }) => e.colors.surface2};
    color: ${({ theme: e }) => e.colors.subtle};
    cursor: not-allowed;
  }

  &[data-placeholder] {
    color: ${({ theme: e }) => e.colors.subtle};
  }
`, Un = t(R.Content)`
  overflow: hidden;
  background-color: ${({ theme: e }) => e.colors.canvas};
  border: 1px solid ${({ theme: e }) => e.colors.border};
  border-radius: ${({ theme: e }) => e.borderRadius.md};
  box-shadow: ${({ theme: e }) => e.boxShadow.pop};
  z-index: 50;
`, Wn = t(R.Viewport)`
  padding: 0.25rem;
`, Gn = t(R.Item)`
  display: flex;
  align-items: center;
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
`, Kn = t(R.ItemIndicator)`
  position: absolute;
  right: 0.5rem;
  display: inline-flex;
  align-items: center;
  color: ${({ theme: e }) => e.colors.accent};
`, qn = t(R.ScrollUpButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.5rem;
  color: ${({ theme: e }) => e.colors.muted};
  cursor: default;
`;
function Jn({ value: e, onValueChange: t, options: n, placeholder: r, disabled: i, $hasError: a, id: c, className: d, "aria-label": f, "aria-labelledby": p }) {
	let { fieldProps: h, status: g } = J();
	return /* @__PURE__ */ s(R.Root, {
		value: e,
		onValueChange: t,
		disabled: i,
		children: [/* @__PURE__ */ s(Hn, {
			className: d,
			$status: a ? "error" : g,
			id: c ?? h.id,
			"aria-label": f,
			"aria-labelledby": p,
			"aria-describedby": h["aria-describedby"],
			"aria-invalid": h["aria-invalid"],
			"aria-required": h["aria-required"],
			children: [/* @__PURE__ */ o(R.Value, { placeholder: r ?? "Select…" }), /* @__PURE__ */ o(R.Icon, { children: /* @__PURE__ */ o(u, { style: {
				width: "1rem",
				height: "1rem"
			} }) })]
		}), /* @__PURE__ */ o(R.Portal, { children: /* @__PURE__ */ s(Un, {
			position: "popper",
			sideOffset: 4,
			children: [
				/* @__PURE__ */ o(qn, {
					as: R.ScrollUpButton,
					children: /* @__PURE__ */ o(m, { style: {
						width: "1rem",
						height: "1rem"
					} })
				}),
				/* @__PURE__ */ o(Wn, { children: n.map((e) => /* @__PURE__ */ s(Gn, {
					value: e.value,
					children: [/* @__PURE__ */ o(R.ItemText, { children: e.label }), /* @__PURE__ */ o(Kn, { children: /* @__PURE__ */ o(l, { style: {
						width: "0.875rem",
						height: "0.875rem"
					} }) })]
				}, e.value)) }),
				/* @__PURE__ */ o(qn, {
					as: R.ScrollDownButton,
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
var Yn = r`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
`, Xn = t.div`
  background-color: ${({ theme: e }) => e.colors.surface2};
  border-radius: ${({ theme: e, $radius: t }) => t ?? e.borderRadius.sm};
  width: 100%;
  height: 1rem;
  animation: ${Yn} 1.4s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`, Zn = t(Xn)`
  border-radius: ${({ theme: e }) => e.borderRadius.full};
`, Qn = t(Xn)`
  height: 0.75rem;
`;
//#endregion
//#region src/components/Slider/index.tsx
function $n({ value: e, onValueChange: t, min: n = 0, max: r = 100, step: i = 1, disabled: a, className: c, "aria-label": l }) {
	return /* @__PURE__ */ s(er, {
		value: [e],
		onValueChange: ([e]) => t(e),
		min: n,
		max: r,
		step: i,
		disabled: a,
		className: c,
		children: [/* @__PURE__ */ o(tr, { children: /* @__PURE__ */ o(nr, {}) }), /* @__PURE__ */ o(rr, { "aria-label": l })]
	});
}
var er = t(z.Root)`
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
`, tr = t(z.Track)`
  position: relative;
  flex-grow: 1;
  height: 4px;
  border-radius: ${({ theme: e }) => e.borderRadius.full};
  background-color: ${({ theme: e }) => e.colors.surface2};
`, nr = t(z.Range)`
  position: absolute;
  height: 100%;
  border-radius: inherit;
  background-color: ${({ theme: e }) => e.colors.accent};
`, rr = t(z.Thumb)`
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
`, ir = {
	sm: "1rem",
	md: "1.5rem",
	lg: "2.25rem"
}, ar = r`
  to { transform: rotate(360deg); }
`, or = t.span`
  display: inline-block;
  width: ${({ $size: e = "md" }) => ir[e]};
  height: ${({ $size: e = "md" }) => ir[e]};
  border-radius: 50%;
  border: 2px solid ${({ theme: e }) => e.colors.borderStrong};
  border-top-color: ${({ theme: e, $color: t }) => t ?? e.colors.accent};
  animation: ${ar} 0.6s linear infinite;
  flex-shrink: 0;

  @media (prefers-reduced-motion: reduce) {
    animation-duration: 1.6s;
  }
`;
//#endregion
//#region src/components/Stepper/index.tsx
function sr({ steps: e, current: t, className: n }) {
	return /* @__PURE__ */ o(cr, {
		className: n,
		"aria-label": "Progress",
		children: e.map((n, r) => {
			let i = r < t ? "done" : r === t ? "current" : "upcoming";
			return /* @__PURE__ */ s(g, { children: [/* @__PURE__ */ s(lr, {
				"aria-current": i === "current" ? "step" : void 0,
				children: [/* @__PURE__ */ o(ur, {
					$state: i,
					children: i === "done" ? /* @__PURE__ */ o(l, {
						width: 14,
						height: 14
					}) : r + 1
				}), /* @__PURE__ */ o(dr, {
					$state: i,
					children: n.label
				})]
			}), r < e.length - 1 && /* @__PURE__ */ o(fr, {
				$done: r < t,
				"aria-hidden": "true"
			})] }, r);
		})
	});
}
var cr = t.ol`
  display: flex;
  align-items: center;
  gap: ${({ theme: e }) => e.spacing.sm};
  list-style: none;
  margin: 0;
  padding: 0;
`, lr = t.li`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme: e }) => e.spacing.sm};
`, ur = t.span`
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
`, dr = t.span`
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  font-size: ${({ theme: e }) => e.fontSize.sm};
  font-weight: ${({ theme: e, $state: t }) => t === "current" ? e.fontWeight.semibold : e.fontWeight.normal};
  color: ${({ theme: e, $state: t }) => t === "upcoming" ? e.colors.subtle : e.colors.ink};
  white-space: nowrap;
`, fr = t.span`
  width: 2rem;
  height: 2px;
  border-radius: 1px;
  background-color: ${({ theme: e, $done: t }) => t ? e.colors.accent : e.colors.border};
`, pr = t.label`
  display: inline-flex;
  align-items: center;
  cursor: ${({ $disabled: e }) => e ? "not-allowed" : "pointer"};
`, mr = t.input`
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  margin: 0;
`, hr = t.span`
  position: relative;
  display: inline-block;
  width: 34px;
  height: 20px;
  border-radius: ${({ theme: e }) => e.borderRadius.full};
  background: ${({ theme: e, $checked: t }) => t ? e.colors.accent : e.colors.borderStrong};
  opacity: ${({ $disabled: e }) => e ? .5 : 1};
  transition: background 120ms ease;

  ${mr}:focus-visible + & {
    outline: 2px solid ${({ theme: e }) => e.colors.accent};
    outline-offset: 2px;
  }
`, gr = t.span`
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
function _r({ checked: e, onCheckedChange: t, disabled: n, ...r }) {
	return /* @__PURE__ */ s(pr, {
		$disabled: n,
		children: [/* @__PURE__ */ o(mr, {
			type: "checkbox",
			role: "switch",
			checked: e,
			disabled: n,
			"aria-label": r["aria-label"],
			onChange: (e) => t(e.target.checked)
		}), /* @__PURE__ */ o(hr, {
			$checked: e,
			$disabled: n,
			children: /* @__PURE__ */ o(gr, { $checked: e })
		})]
	});
}
//#endregion
//#region src/components/Table/index.tsx
var vr = t.div`
  overflow-x: auto;
`, yr = t.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme: e }) => e.fontSize.sm};
`, br = t.thead`
  background-color: ${({ theme: e }) => e.colors.surface};
`, xr = t.tbody``, Sr = t.tr`
  cursor: ${({ $interactive: e }) => e ? "pointer" : "default"};
  ${({ $interactive: e, theme: t }) => e && `&:hover { background-color: ${t.colors.surface}; }`}
`, Cr = t.th`
  padding: 0.75rem 1rem;
  text-align: ${({ $align: e }) => e ?? "left"};
  font-family: ${({ theme: e }) => e.typography.fontFamily.mono};
  font-weight: ${({ theme: e }) => e.fontWeight.medium};
  color: ${({ theme: e }) => e.colors.muted};
  text-transform: uppercase;
  font-size: ${({ theme: e }) => e.fontSize.xs};
  letter-spacing: 0.05em;
  border-bottom: ${({ theme: e, $noBorder: t }) => t ? "none" : `1px solid ${e.colors.border}`};
`, wr = t.td`
  padding: 0.75rem 1rem;
  text-align: ${({ $align: e }) => e ?? "left"};
  font-family: ${({ theme: e }) => e.typography.fontFamily.sans};
  color: ${({ theme: e }) => e.colors.ink};
  vertical-align: middle;
  border-bottom: ${({ theme: e, $noBorder: t }) => t ? "none" : `1px solid ${e.colors.border}`};
`, Tr = B.Root, Er = t(B.List)`
  display: flex;
  border-bottom: 1px solid ${({ theme: e }) => e.colors.border};
  gap: 0;
`, Dr = t(B.Trigger)`
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
  transition: color 150ms ease, border-color 150ms ease;
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
`, Or = t(B.Content)`
  outline: none;

  &:focus-visible {
    box-shadow: 0 0 0 2px ${({ theme: e }) => e.colors.accentSoft};
    border-radius: ${({ theme: e }) => e.borderRadius.md};
  }
`, kr = t.textarea`
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
`, Ar = v(function({ $hasError: e, ...t }, n) {
	let { fieldProps: r, status: i } = J();
	return /* @__PURE__ */ o(kr, {
		ref: n,
		$status: e ? "error" : i,
		...r,
		...t
	});
}), jr = t(V.Root)`
  display: inline-flex;
  padding: 2px;
  gap: 2px;
  background-color: ${({ theme: e }) => e.colors.surface2};
  border-radius: ${({ theme: e }) => e.borderRadius.md};
`, Mr = t(V.Item)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme: e }) => e.spacing.xs};
  height: 2rem;
  padding: 0 ${({ theme: e }) => e.spacing.md};
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
function Nr({ content: e, children: t, side: n = "top", delayDuration: r = 200 }) {
	return /* @__PURE__ */ o(H.Provider, {
		delayDuration: r,
		children: /* @__PURE__ */ s(H.Root, { children: [/* @__PURE__ */ o(H.Trigger, {
			asChild: !0,
			children: t
		}), /* @__PURE__ */ o(H.Portal, { children: /* @__PURE__ */ s(Fr, {
			side: n,
			sideOffset: 6,
			children: [e, /* @__PURE__ */ o(Ir, {})]
		}) })] })
	});
}
var Pr = r`
  from { opacity: 0; transform: translateY(2px); }
  to { opacity: 1; transform: translateY(0); }
`, Fr = t(H.Content)`
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
  animation: ${Pr} ${({ theme: e }) => e.motion.duration.fast}
    ${({ theme: e }) => e.motion.easing.enter};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`, Ir = t(H.Arrow)`
  fill: ${({ theme: e }) => e.colors.ink};
`, Q = {
	white: "#ffffff",
	black: "#000000",
	transparent: "transparent",
	ink900: "#16171A",
	ink800: "#212327",
	ink700: "#2B2D32",
	ink600: "#3A3D44",
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
}, Lr = {
	xs: "0.75rem",
	sm: "0.8125rem",
	base: "0.9375rem",
	lg: "1.0625rem",
	xl: "1.25rem",
	"2xl": "1.5rem",
	"3xl": "1.875rem",
	"4xl": "2.25rem",
	"5xl": "3rem"
}, Rr = {
	normal: "400",
	medium: "500",
	semibold: "600",
	bold: "700",
	extrabold: "800",
	black: "900"
}, zr = {
	tight: "1.25",
	snug: "1.375",
	normal: "1.5",
	relaxed: "1.625",
	loose: "2"
}, Br = { fontFamily: {
	display: "'Archivo', sans-serif",
	sans: "'Public Sans', ui-sans-serif, system-ui, -apple-system, sans-serif",
	mono: "'IBM Plex Mono', ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace"
} }, Vr = {
	none: "0",
	sm: "6px",
	md: "10px",
	lg: "14px",
	full: "9999px"
}, Hr = {
	none: "0",
	xs: "0.25rem",
	sm: "0.5rem",
	md: "0.75rem",
	lg: "1rem",
	xl: "1.5rem",
	"2xl": "2rem",
	"3xl": "3rem",
	"4xl": "4rem"
}, Ur = {
	card: "0 1px 2px rgba(16, 17, 20, 0.06)",
	pop: "0 6px 24px rgba(16, 17, 20, 0.09)",
	none: "none"
}, Wr = {
	sm: "640px",
	md: "768px",
	lg: "1024px",
	xl: "1280px",
	"2xl": "1536px"
}, Gr = {
	0: "0",
	10: "10",
	20: "20",
	30: "30",
	40: "40",
	50: "50",
	auto: "auto"
}, Kr = {
	canvas: "#FFFFFF",
	surface: $.slate[50],
	surface2: $.slate[100],
	border: $.slate[200],
	borderStrong: $.slate[300],
	ink: $.slate[900],
	muted: $.slate[600],
	subtle: $.slate[400],
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
}, qr = {
	canvas: "#0d1117",
	surface: "#161b22",
	surface2: "#21262d",
	border: "#30363d",
	borderStrong: "#484f58",
	ink: "#e6edf3",
	muted: "#8b949e",
	subtle: "#6e7681",
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
}, Jr = {
	fixed: Q,
	scales: $,
	fontSize: Lr,
	fontWeight: Rr,
	lineHeight: zr,
	typography: Br,
	borderRadius: Vr,
	spacing: Hr,
	boxShadow: Ur,
	screens: Wr,
	zIndex: Gr,
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
}, Yr = {
	...Jr,
	colors: {
		...Q,
		...Kr
	}
}, Xr = {
	...Jr,
	colors: {
		...Q,
		...qr
	}
}, Zr = {
	STANDARD: 112.5,
	LARGE: 125,
	EXTRA_LARGE: 137.5
};
//#endregion
export { U as Accordion, ae as AccordionContent, te as AccordionHeader, W as AccordionItem, ne as AccordionTrigger, se as Alert, ce as AlertBody, G as AlertIcon, K as AlertMessage, le as AlertTitle, de as Avatar, ve as Badge, ye as Breadcrumbs, De as Button, Oe as Card, je as CardActions, Me as CardBody, Ne as CardFooter, ke as CardHeader, Ae as CardTitle, Be as Checkbox, Ve as Chip, Ge as Combobox, Ct as DatePicker, Dt as DateRangePicker, At as DescriptionDetails, Ot as DescriptionList, kt as DescriptionTerm, jt as DropdownMenu, Ft as DropdownMenuContent, It as DropdownMenuItem, Rt as DropdownMenuLabel, Lt as DropdownMenuSeparator, Mt as DropdownMenuTrigger, zt as EmptyState, Jt as ErrorText, Xt as Field, nn as FormField, qt as Input, Gt as Label, rn as Modal, _n as NumberInput, vn as Pagination, En as Popover, On as PopoverClose, Mn as PopoverContent, Dn as PopoverTrigger, Fn as Progress, Vn as RadioGroup, Jn as Select, Xn as Skeleton, Zn as SkeletonCircle, Qn as SkeletonText, $n as Slider, or as Spinner, Yt as StatusMessage, sr as Stepper, _r as Switch, yr as Table, vr as TableScroll, Tr as Tabs, Or as TabsContent, Er as TabsList, Dr as TabsTrigger, xr as Tbody, wr as Td, Ar as Textarea, Cr as Th, br as Thead, jr as ToggleGroup, Mr as ToggleGroupItem, Nr as Tooltip, Sr as Tr, Xr as darkTheme, Zr as fontSizeScale, Yr as lightTheme, $ as scales };
