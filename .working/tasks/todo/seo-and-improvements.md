# RollerCoaster.dev – Targeted PR Plan (base: `main`)

> Purpose: Ship focused, low‑risk PRs that improve SEO, copy, design, legal compliance, accessibility, and performance. Each PR is small, independently reviewable, and rebases onto `main`.

---

## Branching & Review Rules

- **Base branch:** `main`
- **Naming:** `feat/{area}-{short}` or `chore/{area}-{short}`
- **Commits:** Conventional Commits (e.g., `feat(a11y): visible focus ring`)
- **CI gates:** build, typecheck, unit (if any), Lighthouse CI (optional), link checker
- **Definition of Done (per PR):** updated tests (if any), docs/notes, screenshots (desktop/mobile), before/after Lighthouse summary

---

## Dependencies & Recommended Order (for future issue creation)

> Use this when creating GitHub issues. Add `Depends on #<issue>` in each issue body.

**Order:**

1. **PR1 – IA & Navigation scaffold** (foundation)
2. **PR2 – Copy core pages** (depends on PR1)
3. **PR3 – Legal pages** (depends on PR1; can run parallel with PR2)
4. **PR8 – Design system polish** (depends on PR1)
5. **PR6 – Accessibility** (depends on PR1; preferably after PR8)
6. **PR9 – Social share assets (OG)** (no hard deps; merge before/with PR4)
7. **PR4 – SEO head meta** (depends on PR1; soft on PR2/PR3/PR9)
8. **PR5 – robots.txt & sitemap.xml** (depends on PR1; soft on PR2/PR3)
9. **PR7 – Performance (CWV)** (depends on PR1; benefits from PR2/PR8)
10. **PR10 – Content freshness** (soft on PR2)

**Quick map**

| PR   | Depends on               | Type |
| ---- | ------------------------ | ---- |
| PR1  | —                        | —    |
| PR2  | PR1                      | Hard |
| PR3  | PR1                      | Hard |
| PR4  | PR1 (+ PR2/PR3/PR9 soft) | Soft |
| PR5  | PR1 (+ PR2/PR3 soft)     | Hard |
| PR6  | PR1 (+ PR8 soft)         | Hard |
| PR7  | PR1 (+ PR2/PR8 soft)     | Soft |
| PR8  | PR1                      | Hard |
| PR9  | — (used by PR4)          | Soft |
| PR10 | PR2                      | Soft |

---

## PR1 — IA & Navigation scaffold

**Branch:** `feat/ia-nav-scaffold`  
**Depends on:** —

**Scope:**

- Add routes/pages: `/about`, `/how-it-works`, `/roadmap`, `/legal/impressum`, `/legal/privacy`.
- Header links: About, How it works, Roadmap, **Primary CTA:** “Join the waitlist”, **Secondary:** “Contribute on GitHub”.
- Footer links: Impressum, Datenschutz, GitHub, Email.

**Acceptance:**

- All pages routable and visible in header/footer.
- Links are plain `<a href>` (crawlable).

**Notes:** Sets the frame for later content PRs.

---

## PR2 — Copy: About / How‑It‑Works / Roadmap content

**Branch:** `feat/copy-core-pages`  
**Depends on:** PR1

**Scope:**

- Populate `/about`, `/how-it-works`, `/roadmap` with the provided copy blocks below.
- Add “Last updated: YYYY‑MM‑DD” to `/roadmap`.

**Acceptance:**

- Pages render with headings, lists, and clear H1.
- `/roadmap` uses dated milestones (no stale Q2 2024 text).

**Copy Blocks:** (drop‑in)

### /about

```
# About RollerCoaster.dev

**RollerCoaster.dev** is a toolkit **by and for neurodivergent minds**, reimagining how we track progress, set goals, and celebrate our journeys.

## Our Mission
We build **neuro-centered tools**—rooted in neurodivergent lived experience—to empower flexible, self-paced learning and growth. Traditional productivity apps assume linear progress and fixed schedules. We don’t.

## Who We Are
A community-led collective of designers, developers, and neurodivergent collaborators committed to building better digital tools.

## What We Value
- **Flexibility:** Support ebbs, flows, and rest without judgment.
- **Clarity:** Visual feedback, simple UI, optional deeper info.
- **Community:** Shared journeys, mutual support, lived experience at the core.

## How You Benefit
- Set goals that fit *your* rhythm.
- Document achievements with **open, verifiable badges**.
- Visualize your growth in ways that feel meaningful.
- Connect with others who understand the journey.

[Join the waitlist] • [Contribute on GitHub]
```

### /how-it-works

```
# How It Works

1. **Define Your Goal**
   Break big aims into small, meaningful steps.

2. **Earn Badges**
   Each step can produce an **Open Badge**—portable, verifiable, yours.

3. **Visualize Progress**
   Choose timeline, grid, or tree views to spot patterns.

4. **Pause — and Resume**
   Pick up where you left off, pressure-free, with context intact.

5. **Share & Connect**
   Export badges, showcase progress, and learn from peers.

---

## Neuro-inclusive by Design
- Short chunks + “Show more” toggles
- Predictable layout & labels
- Respects `prefers-reduced-motion`
- High-contrast typography and generous spacing
```

### /roadmap

```
# Roadmap

| Timeframe          | What’s Next                                                                 | Status      |
|--------------------|-----------------------------------------------------------------------------|-------------|
| Now – Q3 2025      | Public waitlist; contributor docs                                           | In progress |
| Q4 2025            | Self-issued badge wallet; VC export (Open Badges 3.0)                       | Planned     |
| Q1 2026            | Peer/mentor verification pilot; feedback loops                              | Planned     |
| TBD                | Enhanced visualizations; mobile layout polish                                | Upcoming    |
| Ongoing            | Community, outreach, funding                                                | Ongoing     |

*Link items to GitHub issues/PRs for transparency.*
```

---

## PR3 — Legal pages (Impressum & Privacy)

**Branch:** `feat/legal-impressum-privacy`  
**Depends on:** PR1

**Scope:**

- Add `/legal/impressum` and `/legal/privacy` with placeholders to be filled.

**Acceptance:**

- Impressum contains operator, address, contact, register details, VAT (if any), content responsibility (per **§ 5 DDG**).
- Privacy describes data minimization, rights under GDPR/DSGVO, and cookie/consent posture.

**Copy Blocks:**

### /legal/impressum (DE)

```
# Impressum (gemäß § 5 DDG)

**Betreiber:** [Name / Organisation, Rechtsform]
**Anschrift:** [Straße], [PLZ] [Stadt], Deutschland
**E-Mail:** hello@rollercoaster.dev
**Telefon:** [optional]
**Vertretungsberechtigt:** [Name]
**Registergericht / Registernummer:** [z. B. Amtsgericht Hamburg, HRB 12345]
**USt-IdNr.:** [DE…] (falls vorhanden)
**Inhaltlich Verantwortlicher (§ 55 RStV):** [Name], [Adresse oder E-Mail]
```

### /legal/privacy (DE)

```
# Datenschutz

Wir respektieren deine Privatsphäre und verarbeiten nur, was nötig ist.

## Was wir **nicht** tun
- Keine Marketing-Cookies, kein Cross-Site-Tracking.
- Keine Weitergabe personenbezogener Daten.

## Wenn du uns kontaktierst
- Deine E-Mail verwenden wir ausschließlich zur Beantwortung deiner Anfrage.

## Rechtsgrundlagen
- DSGVO/GDPR; TTDSG für Zugriffe auf Endgeräte (z. B. Cookies).

## Cookies / Consent
- Wenn keine nicht-notwendigen Cookies gesetzt werden, ist **kein** Einwilligungs-Banner erforderlich.
- Wenn zukünftig Analyse/Marketing eingesetzt werden: vorherige Einwilligung (Opt-in) nötig.
```

**References:** WCAG/WAI & legal notes at end of file.

---

## PR4 — SEO head: titles, descriptions, canonical, OG/Twitter, JSON‑LD

**Branch:** `feat/seo-head-meta`  
**Depends on:** PR1; soft on PR2, PR3, PR9

**Scope:**

- Unique `<title>` and meta description per page.
- `<link rel="canonical">` per route.
- Open Graph + Twitter Card tags (site‑wide defaults, override per page).
- JSON‑LD `Organization` on homepage; optional `WebSite`.

**Acceptance:**

- Share debuggers show correct preview (title/desc/image/url).
- Title links align with main visual title (no duplicated H1 weights).

**Refs:** Google SEO Starter Guide; Title Links; Open Graph protocol. [See references]

---

## PR5 — robots.txt & sitemap.xml

**Branch:** `chore/crawl-robots-sitemap`  
**Depends on:** PR1; soft on PR2, PR3

**Scope:**

- `public/robots.txt` with sitemap hint.
- `public/sitemap.xml` listing primary routes.

**Acceptance:**

- Both files reachable in production; Search Console accepts sitemap.

**Snippets:**

```
User-agent: *
Allow: /

Sitemap: https://rollercoaster.dev/sitemap.xml
```

---

## PR6 — Accessibility (WCAG 2.2 AA)

**Branch:** `feat/a11y-wcag22`  
**Depends on:** PR1; preferable after PR8

**Scope:**

- Visible, high‑contrast focus indicator; not obscured.
- Target size ≥ ~24px logical; avoid drag‑only interactions.
- Landmarks, one H1 per page, ordered headings, meaningful alt text.
- Respect `prefers-reduced-motion`; provide pause/stop for moving content.

**Acceptance:**

- Axe/WAVE: 0 critical issues; manual keyboard test passes.
- Focus not obscured; focus appearance clearly visible (meets 2.4.11/12/13).

**Refs:** WCAG 2.2 and WAI Understanding docs. [See references]

**CSS starter:**

```
:focus-visible { outline: 3px solid currentColor; outline-offset: 3px; }
@media (prefers-reduced-motion: reduce) {
  * { animation-duration:.01ms !important; animation-iteration-count:1 !important; transition-duration:.01ms !important; }
}
.nav a,.btn{ min-height:44px; min-width:44px; display:inline-flex; align-items:center; justify-content:center; padding:.5rem 1rem; }
```

---

## PR7 — Performance (Core Web Vitals: LCP/INP/CLS)

**Branch:** `perf/cwv-inp-lcp-cls`  
**Depends on:** PR1; benefits from PR2, PR8

**Scope:**

- Optimize LCP image (AVIF/WebP), explicit width/height, preload hero if above the fold.
- Reduce long tasks; defer non‑critical JS; event delegation for nav.
- Prevent layout shifts (reserve space; avoid late font swaps).

**Acceptance:**

- Lighthouse mobile: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1.
- Field data (if available) shows no regressions.

**Refs:** INP replaces FID; web.dev INP guidance. [See references]

---

## PR8 — Design system polish

**Branch:** `feat/design-hierarchy-ctas`  
**Depends on:** PR1

**Scope:**

- One clear H1; subheads every ~3–4 paragraphs; bullet lists for scannability.
- Distinct CTA styles: primary (filled), secondary (outline).
- Spacing scale (4/8/12/16px multiples); OG image template 1200×630.

**Acceptance:**

- Visual hierarchy obvious; OG image previews look correct on major platforms.

---

## PR9 — Social share assets (OG images)

**Branch:** `feat/social-og-assets`  
**Depends on:** — (but referenced by PR4)

**Scope:**

- Create `/public/og/og-default-1200x630.png` (brand + tagline).
- Optional per‑page OG images.

**Acceptance:**

- Facebook/Twitter/LinkedIn debuggers render correct preview with the chosen image.

**Refs:** Open Graph protocol; platform best practices. [See references]

---

## PR10 — Freshness & updates

**Branch:** `chore/content-freshness`  
**Depends on:** PR2

**Scope:**

- Remove stale dates (“Q2 2024”).
- Add `/roadmap` “Last updated:” auto‑stamp on build.
- Optional monthly “Updates” post (three bullets + one image).

**Acceptance:**

- No stale timeline text; `git log`/build date reflected where intended.

---

## QA & CI Add‑Ons (optional but recommended)

- Lighthouse CI against PR preview; budget gate for LCP/INP/CLS.
- Link checker (internal + external).
- HTML validator (aria roles/landmarks).

---

## References (for implementers)

- **SEO:** Google SEO Starter Guide; Title Links best practices.
  - https://developers.google.com/search/docs/fundamentals/seo-starter-guide
  - https://developers.google.com/search/docs/appearance/title-link
- **Core Web Vitals / INP:**
  - INP became Core Web Vital (Mar 12, 2024): https://web.dev/blog/inp-cwv-launch
  - INP overview: https://web.dev/articles/inp
  - FID deprecation note: https://web.dev/articles/fid
- **WCAG 2.2:**
  - Spec & new criteria: https://www.w3.org/TR/WCAG22/
  - WAI “What’s new in 2.2”: https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/
  - Focus Appearance explainer: https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html
- **Open Graph:**
  - Protocol: https://ogp.me/
  - Facebook webmasters docs: https://developers.facebook.com/docs/sharing/webmasters/

# Ready‑to‑Paste GitHub Issue Templates (with dependencies)

> How to use: Create each issue in this order. In the **Dependencies** section, replace `#<n>` with real issue numbers after you create the previous issues. Use task lists to track progress; they render natively in GitHub and unfurl linked issues/PRs. Use closing keywords like `Closes #123` in PR descriptions to auto‑close issues on merge.  
> Refs: Task lists, Issue Forms, and Closing keywords.  
> • https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/about-tasklists  
> • https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms  
> • https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/using-keywords-in-issues-and-pull-requests

---

## Issue 1 — IA & Navigation scaffold

**Title:** IA & Navigation scaffold (routes, header/footer, CTAs)  
**Labels:** `fundamental`, `frontend`, `routing`

**Scope:**

- Create routes/pages: `/about`, `/how-it-works`, `/roadmap`, `/legal/impressum`, `/legal/privacy`.
- Update header with: About • How it works • Roadmap • **Join the waitlist** (primary) • **Contribute on GitHub** (secondary).
- Update footer with: Impressum • Datenschutz • GitHub • Email.

**Acceptance Criteria:**

- [ ] All pages routable and visible in header/footer.
- [ ] Links are plain `<a href>` (crawlable).

**Dependencies:**

- Depends on: —
- Blocks: #<PR2>, #<PR3>, #<PR4>, #<PR5>, #<PR6>, #<PR7>, #<PR8>

**Checklist:**

- [ ] Routes added
- [ ] Header updated
- [ ] Footer updated
- [ ] Screenshots (desktop/mobile) attached

---

## Issue 2 — Copy core pages: About / How‑It‑Works / Roadmap

**Title:** Copy content for core pages  
**Labels:** `copy`, `content`, `frontend`

**Scope:**

- Drop in the copy blocks from this file for `/about`, `/how-it-works`, `/roadmap`.
- Add “Last updated: YYYY‑MM‑DD” to `/roadmap`.

**Acceptance Criteria:**

- [ ] Clear H1 per page; headings ordered.
- [ ] Dated roadmap with no stale text.

**Dependencies:**

- Depends on: #<PR1>
- Blocks: #<PR10>, soft‑blocks #<PR4>, #<PR7>

**Checklist:**

- [ ] About content
- [ ] How‑It‑Works content
- [ ] Roadmap content + date
- [ ] Screenshots attached

---

## Issue 3 — Legal pages: Impressum & Privacy (DE)

**Title:** Add legal pages: Impressum & Datenschutz  
**Labels:** `legal`, `compliance`, `content`

**Scope:**

- Add `/legal/impressum` and `/legal/privacy` with placeholders populated.

**Acceptance Criteria:**

- [ ] Impressum includes operator, address, contact, register details, VAT (if any), content responsibility (per §5 DDG).
- [ ] Privacy covers data minimization, rights under GDPR/DSGVO, TTDSG cookie stance.

**Dependencies:**

- Depends on: #<PR1>
- Soft‑blocks: #<PR4>, #<PR5>

**Checklist:**

- [ ] Impressum content
- [ ] Privacy content
- [ ] Links in footer
- [ ] Screenshots attached

---

## Issue 4 — Design system polish (hierarchy, spacing, CTAs)

**Title:** Design polish: hierarchy & CTA styles  
**Labels:** `design`, `ui`, `style`

**Scope:**

- Enforce one H1 per page; add subheads; use bullet lists.
- Define spacing scale (4/8/12/16px multiples).
- Primary (filled) vs secondary (outline) CTA styles.

**Acceptance Criteria:**

- [ ] Visual hierarchy obvious at a glance.
- [ ] CTA styles consistent across pages.

**Dependencies:**

- Depends on: #<PR1>
- Enables: #<PR6>, improves #<PR7>

**Checklist:**

- [ ] H1/subhead audit
- [ ] Spacing tokens
- [ ] CTA components/styles
- [ ] Screenshots attached

---

## Issue 5 — Accessibility (WCAG 2.2 AA)

**Title:** Accessibility: focus, target size, landmarks  
**Labels:** `a11y`, `wcag22`, `frontend`

**Scope:**

- Add visible, high‑contrast focus styles; ensure not obscured.
- Target size ≥ ~24px logical.
- Landmarks, ordered headings, meaningful alt.
- Respect `prefers-reduced-motion`; provide pause/stop/hide for motion.

**Acceptance Criteria:**

- [ ] Axe/WAVE: 0 critical issues.
- [ ] Keyboard‑only navigation passes.

**Dependencies:**

- Depends on: #<PR1>
- Prefer after: #<PR4 design> (#<PR8 actual number>)

**Checklist:**

- [ ] Focus styles
- [ ] Target sizes
- [ ] Landmarks/headings
- [ ] Reduced motion
- [ ] Screenshots attached

---

## Issue 6 — Social share assets (Open Graph images)

**Title:** Social share: add OG images  
**Labels:** `seo`, `assets`, `social`

**Scope:**

- Add `/public/og/og-default-1200x630.png` (brand + tagline).
- Optional per‑page OG images.

**Acceptance Criteria:**

- [ ] Share debuggers render correct preview.

**Dependencies:**

- Depends on: —
- Should land before/with: #<PR7 SEO head>

**Checklist:**

- [ ] Default OG created
- [ ] Optional per‑page OG
- [ ] Debugger screenshots

---

## Issue 7 — SEO head meta (titles, descriptions, canonical, OG/Twitter, JSON‑LD)

**Title:** SEO: titles, descriptions, canonical, OG/Twitter, JSON‑LD  
**Labels:** `seo`, `frontend`, `meta`

**Scope:**

- Unique titles + descriptions; canonical for each route.
- Add Open Graph + Twitter Card tags.
- JSON‑LD `Organization` on homepage.

**Acceptance Criteria:**

- [ ] Share debuggers show correct title/desc/image/url.
- [ ] Title link matches on‑page H1.

**Dependencies:**

- Depends on: #<PR1>
- Soft‑depends: #<PR2>, #<PR3>, #<PR6>
- Needs OG assets from: #<PR6 OG issue number>

**Checklist:**

- [ ] Title/meta per page
- [ ] Canonicals added
- [ ] OG/Twitter tags
- [ ] JSON‑LD Organization

---

## Issue 8 — robots.txt & sitemap.xml

**Title:** Crawl: robots.txt and sitemap.xml  
**Labels:** `seo`, `crawl`, `infrastructure`

**Scope:**

- Publish `public/robots.txt` with sitemap hint.
- Publish `public/sitemap.xml` listing primary routes.

**Acceptance Criteria:**

- [ ] Files reachable in production.
- [ ] Search Console accepts sitemap.

**Dependencies:**

- Depends on: #<PR1>
- Soft‑depends: #<PR2>, #<PR3>

**Checklist:**

- [ ] robots.txt
- [ ] sitemap.xml
- [ ] Search Console screenshot

---

## Issue 9 — Performance (Core Web Vitals: LCP/INP/CLS)

**Title:** Performance: optimize LCP/INP/CLS  
**Labels:** `performance`, `core-web-vitals`

**Scope:**

- Optimize LCP image (AVIF/WebP) + explicit dimensions; preload hero if needed.
- Reduce long tasks; defer non‑critical JS; event delegation.
- Prevent layout shifts (reserve space; font loading strategy).

**Acceptance Criteria:**

- [ ] Lighthouse mobile: LCP ≤ 2.5s; INP ≤ 200ms; CLS ≤ 0.1.

**Dependencies:**

- Depends on: #<PR1>
- Benefits from: #<PR2>, #<PR4>

**Checklist:**

- [ ] Image optimization
- [ ] JS defer/long‑task fixes
- [ ] CLS audit
- [ ] Lighthouse report attached

---

## Issue 10 — Content freshness automation

**Title:** Content freshness: remove stale dates, auto “Last updated”  
**Labels:** `content`, `automation`

**Scope:**

- Remove stale references (e.g., “Q2 2024”).
- Add build‑time “Last updated:” stamps to `/roadmap`.

**Acceptance Criteria:**

- [ ] No stale dates on site.
- [ ] “Last updated” visible on `/roadmap`.

**Dependencies:**

- Depends on: #<PR2>

**Checklist:**

- [ ] Stale text removed
- [ ] Build hook added
- [ ] Screenshot attached

---

## Optional: Issue Form (YAML) stub (drop in `.github/ISSUE_TEMPLATE/feature.yml`)

```yaml
name: Feature request
description: Create a dependency‑aware task
labels: [feature]
body:
  - type: input
    id: depends_on
    attributes:
      label: Depends on (issue #)
      placeholder: "#123, #124"
  - type: textarea
    id: scope
    attributes:
      label: Scope
      description: What is in scope?
  - type: textarea
    id: acceptance
    attributes:
      label: Acceptance Criteria
      description: Checklist of what must be true to close this
  - type: textarea
    id: notes
    attributes:
      label: Notes / Links
```

> Notes: GitHub doesn’t have native “depends on” semantics in Issues; referencing `#123` and using Actions like **Dependent Issues** can help track dependencies.
