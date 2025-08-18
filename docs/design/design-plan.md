# Design Plan (Fast-Track Execution)

All tasks are ≤ 1 day; most are a few hours using AI. Scope: landing site + SSG.

## Day-by-day plan

Day 1 — Accessibility Foundations (Phase 1)

- Focus-visible (WCAG 2.4.11/12/13), skip links + landmarks, target sizes (2.5.8)
- Motion control (`prefers-reduced-motion`) + quick ARIA audit
- Verify: keyboard pass, axe/Pa11y/Lighthouse

Day 2 — SEO + Social + Crawl

- Titles/descriptions/canonical; JSON‑LD
- OG defaults; robots.txt + sitemap.xml
- Verify: Rich Results + social previews

Day 3 — Content Chunking + Progressive Disclosure

- Components: RdContentChunker, RdShowMore (a11y built-in)
- Integrate into home/about/how-it-works; stories + tests

Day 4 — Sensory Customization MVP

- Panel: intensity, motion toggle, contrast preset, color‑vision presets, Reset
- Persist + apply immediately

Day 5 — Attention/Exec Function + Audit

- Reading Mode; focus preservation on route change; simple progress pattern
- Wire CI scripts: axe/Pa11y/Lighthouse; fix nits

Day 6–7 (optional) — Polish & Docs

- Design polish (hierarchy/CTAs), i18n small tasks, performance nits (LCP/CLS)

## Issue mapping (#10–#37)

- Day 1: #30, #31, #32, #33
- Day 2: #24, #25, #23, #19, #20
- Day 3: #34
- Day 4: #35
- Day 5: #36, #37, #16, #17
- Day 6–7: #21, #26, #27, #10, #11, #12, #13, #14, #15, #22 (superseded, consider close)

## Acceptance snapshots

- A11y: WCAG 2.2 AA; focus not obscured/visible; targets ≥ 24px; reduced motion
- SEO: unique titles/desc, canonical, JSON‑LD valid; OG/Twitter previews correct
- UX: chunked content, progressive disclosure predictable + accessible
- Sensory: panel is accessible, persistent, and applies without refresh
- Audit: axe/Pa11y/Lighthouse green; docs updated; stories present

## Links

- Vision/UX: ./design-document.md
- Visual system: ./styleguide.md
- QA: ./checklists/a11y-qa.md
- Patterns: ./patterns/page-composition.md
