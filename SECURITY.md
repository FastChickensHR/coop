# Security Policy

## Reporting a vulnerability

Please report vulnerabilities through **GitHub's private vulnerability
reporting** for this repository:
[Report a vulnerability](https://github.com/FastChickensHR/coop/security/advisories/new).

**Do not open a public issue for a security vulnerability.** Public issues are
visible immediately to everyone; private reporting lets us fix the problem
before it's disclosed.

If private reporting fails you for any reason, the human backstop is
**contact@fastchickenshr.com**.

## Supported versions

Only the **latest tagged release** is supported. Fixes ship as a new tag; we do
not backport to older tags.

## Dependency updates — there is deliberately no `dependabot.yml` here

**This is a decision, not a gap. Please do not "fix" it by adding one.**

Dependabot **alerts are enabled** on this repository and are valuable as a
signal. What is deliberately absent is a `dependabot.yml`, and therefore any
Dependabot *pull request*.

The reason is that **this repository is a one-way mirror**. Its `main` is a
snapshot of `frontend/packages/coop` inside the private `mono` repository,
written by a bot on every change there. The mirror replaces the entire working
tree on each run, so **a pull request opened here has no mergeable surface** —
and any file committed directly to this repo, including a `dependabot.yml`,
is erased on the next mirror.

Dependency remediation therefore happens **in `mono`**, where the source of
truth lives and where the package's dependencies are already covered by that
repository's npm configuration via the shared lockfile. A fix applied there
flows out to this mirror automatically.

The full posture — the two lanes, the soak, how ignores are expressed, and the
remediation SLA — is recorded in `mono`'s ADR-1373.
