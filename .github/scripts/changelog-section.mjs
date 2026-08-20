#!/usr/bin/env node
// Print one version's section of CHANGELOG.md (mono#1091, coop#7).
//
// The changelog states the convention this script exists to keep:
//
//   "On each release cut, the version's section is mirrored into the GitHub
//    Release notes."
//
// Nothing performed it. `release.yml` generated its notes from the commit log,
// and public main carries only bot snapshot commits — so a release's notes read
// "Coop 0.0.0-dev.<sha> by Coop Publisher" where the policy promises the curated
// section, mandatory **Breaking** subsection and all. That subsection IS the
// compatibility notice (coop#7), and the Release page is where a consumer looks
// for it.
//
// This file lives under the `.github/` overlay for two reasons: it rides with
// the workflow it serves (build-publish-tree.mjs copies coop/repo/ recursively,
// so there is no copy list to forget), and `.github/` is outside the package's
// `files` array, so it never reaches an installing consumer.
//
// Two callers, one implementation:
//   - the public repo's release.yml, at the tag, to write --notes-file;
//   - mono's coop-release.yml, BEFORE pushing the tag, as a hard guard.
//
// Exit 0 with the section on stdout; exit 1 with the reason on stderr when the
// version has no section. Callers decide what absence means — the mono-side
// guard treats it as fatal (still reversible), the public side falls back to
// generated notes (the tag is already immutable by then).
//
// Plain Node, zero dependencies, like its siblings. Pure helpers are exported so
// they can be exercised directly.
//
// Usage:
//   node .github/scripts/changelog-section.mjs --version 1.0.0-beta.1
//   node .github/scripts/changelog-section.mjs --version 0.1.0 --changelog path/to/CHANGELOG.md

import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, join } from 'node:path'

// A release heading: `## [1.0.0-beta.1] - 2026-08-08`, or `## [Unreleased]`.
// The date suffix is optional because Unreleased carries none.
const HEADING = /^##\s+\[([^\]]+)\](?:\s*-\s*(\S+))?\s*$/
// Any h2 — where a section ends. The changelog's prose sections (Conventions,
// Versioning and deprecation policy) are h2 too, so this is the only safe stop.
const ANY_H2 = /^##\s+/
// Keep-a-Changelog link definitions live at the document foot, after the last
// section. They belong to the file, not to whichever section they trail.
const LINK_DEF = /^\[[^\]]+\]:\s*\S+/

/**
 * The body of `## [<version>]`, or null when that version has no section.
 *
 * Matching is exact on the bracketed text: `1.0.0-beta.1` never matches
 * `1.0.0-beta.10`, and a release cut before its entry was written gets a clean
 * null rather than the neighbouring section's notes.
 */
export function extractSection(markdown, version) {
  const lines = markdown.split(/\r?\n/)
  const start = lines.findIndex((line) => {
    const match = HEADING.exec(line)
    return match !== null && match[1] === version
  })
  if (start === -1) return null

  const rest = lines.slice(start + 1)
  const end = rest.findIndex((line) => ANY_H2.test(line))
  const body = end === -1 ? rest : rest.slice(0, end)

  // Drop the trailing link definitions the last section would otherwise absorb.
  while (body.length > 0) {
    const last = body[body.length - 1]
    if (last.trim() === '' || LINK_DEF.test(last)) body.pop()
    else break
  }

  const text = body.join('\n').trim()
  return text.length > 0 ? text : null
}

/** Every released version in file order — used only to make the error useful. */
export function listVersions(markdown) {
  return markdown
    .split(/\r?\n/)
    .map((line) => HEADING.exec(line))
    .filter((match) => match !== null)
    .map((match) => match[1])
}

export function parseArgs(argv) {
  const args = {}
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i]
    if (!token.startsWith('--')) throw new Error(`unexpected argument "${token}"`)
    const [flag, inlineValue] = token.slice(2).split(/=(.*)/s)
    const value = inlineValue ?? argv[++i]
    if (value === undefined) throw new Error(`--${flag} needs a value`)
    args[flag] = value
  }
  return args
}

// ── CLI ────────────────────────────────────────────────────────────────────────
const invokedDirectly = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)

if (invokedDirectly) {
  const scriptDir = dirname(fileURLToPath(import.meta.url))
  // .github/scripts/ → the repo root beside it.
  const defaultChangelog = resolve(scriptDir, '..', '..', 'CHANGELOG.md')

  try {
    const args = parseArgs(process.argv.slice(2))
    const version = args.version
    if (!version) throw new Error('--version is required (bare semver, e.g. 1.0.0-beta.1)')
    if (/^v/i.test(version)) {
      throw new Error(`--version must not carry a leading "v" (got "${version}") — the tag wears the v, the heading does not.`)
    }

    const changelogPath = args.changelog ? resolve(args.changelog) : defaultChangelog
    if (!existsSync(changelogPath)) throw new Error(`no CHANGELOG.md at ${changelogPath}`)

    const markdown = readFileSync(changelogPath, 'utf8')
    const section = extractSection(markdown, version)
    if (section === null) {
      const known = listVersions(markdown).join(', ') || '(none)'
      throw new Error(
        `CHANGELOG.md has no section for "${version}". Add a "## [${version}] - <date>" heading with its mandatory Breaking subsection. Sections present: ${known}`,
      )
    }

    process.stdout.write(`${section}\n`)
  } catch (error) {
    console.error(`✗ ${error.message}`)
    process.exit(1)
  }
}
