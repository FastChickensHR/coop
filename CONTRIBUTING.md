# Contributing to Coop

Thanks for caring about Coop. Before you open anything, please read how this
repository actually works — it's a little unusual.

## 1. How this repository works

Coop's source of truth is a **private monorepo**. The `main` branch here is a
**generated mirror**: a one-way snapshot pushed from that monorepo. Nothing
merges into this repository directly — which means **pull requests cannot be
merged here**. **Issues are the front door** for everything: bugs, proposed
changes, patches, questions.

When we adopt a change you proposed, we port it into the monorepo ourselves and
credit you with a `Co-authored-by` trailer on the commit that ships it.

## 2. Reporting bugs well

A great bug report lets us reproduce the problem before we've finished our
coffee. Please include:

- **Version** — the release tag you installed (e.g. `v1.0.0-beta.1`), or the
  `Mono-Source` SHA from the commit you're on.
- **A minimal reproduction** — a StackBlitz (or similar) is ideal; a small
  self-contained snippet is fine too.
- **Expected vs actual** — what you expected to happen, and what happened
  instead.

Accessibility bugs — focus, keyboard, screen reader, contrast, reduced motion —
are especially welcome. Use the bug template; it walks you through all of this.

## 3. Proposing changes

Open an issue describing the change and why it matters. **Patches are welcome
in the issue body** (a diff or a code block is perfect) — remember that pull
requests can't merge here, so an issue is the right vehicle even for finished
code.

Licensing is simple: **by submitting a patch or suggestion you agree it's
MIT-licensed (inbound = outbound).** No DCO, no CLA.

## 4. Security issues

**Never open a public issue for a vulnerability.** Use GitHub's private
vulnerability reporting instead — see [SECURITY.md](./SECURITY.md).

## 5. Style & idioms

Coop's conventions are enforced mechanically in the source repository (lint,
type gates, generated prop docs); there is no separate style guide, and your
proposal doesn't need to match house style — maintainers port contributions
with credit.
