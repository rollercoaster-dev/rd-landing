# Rollercoaster.dev Design Document

_Building upon accessibility and neurodivergent-friendly foundations_

## Executive Summary

This design document outlines the evolution of Rollercoaster.dev from its current prototype to an idealized, fully accessible platform that serves neurodivergent users while maintaining its unique cyberpunk rollercoaster aesthetic. The site currently demonstrates strong foundational elements including Atkinson Hyperlegible typography, dual-intensity theming, and semantic HTML structure that we will build upon.

## Design Docs Navigation

This document focuses on the vision, rationale, and UX strategy (the "why"). For the concrete specs and execution details, see:

- Style Guide (Source of Truth): docs/design/styleguide.md — tokens, components, motion, page patterns
- Design Plan (Fast-Track Execution): docs/design/design-plan.md — 5–7 day schedule and issue mapping
- Accessibility QA Checklist: docs/design/checklists/a11y-qa.md — PR review checklist
- Page Composition Patterns: docs/design/patterns/page-composition.md — recommended layouts
- Style Guide Examples: docs/design/styleguide-examples.md — links to living components and stories

## 1. Current State Analysis

### Existing Strengths

**Accessibility Foundations:**

- ✅ Atkinson Hyperlegible font family (designed for dyslexia and visual impairments)
- ✅ Semantic HTML structure with proper heading hierarchy
- ✅ ARIA labels and screen reader support in components
- ✅ Keyboard navigation patterns with focus management
- ✅ High contrast color ratios in both light and dark modes
- ✅ Responsive design with mobile-first approach

**Neurodivergent-Friendly Features:**

- ✅ Dual-intensity theming system ("vibrant" vs "calm" modes)
- ✅ Reduced motion considerations in CSS
- ✅ Predictable navigation patterns
- ✅ Clear visual hierarchy with generous spacing
- ✅ Customizable interface options (theme toggles)

**Cyberpunk Rollercoaster Aesthetic:**

- ✅ Neon color palette (magenta #d946ef, cyan #06b6d4)
- ✅ Gradient text effects for brand elements
- ✅ Subtle geometric background elements
- ✅ Modern, clean typography with technical feel
- ✅ Dark/light mode support maintaining aesthetic consistency

**Technical Architecture:**

- ✅ Vue 3 + TypeScript frontend with SSG capabilities
- ✅ Component-driven architecture with Histoire documentation
- ✅ Shadcn-vue base components with accessibility built-in
- ✅ TailwindCSS with custom design tokens
- ✅ Composable-based state management

### Areas for Enhancement

**Accessibility Gaps:**

- ⚠️ Missing comprehensive focus indicators (WCAG 2.4.11/12/13)
- ⚠️ Limited motion control implementation
- ⚠️ Incomplete ARIA landmark structure
- ⚠️ Target size compliance needs verification (24px minimum)

**Neurodivergent Experience:**

- ⚠️ Limited cognitive load management features
- ⚠️ No content chunking or progressive disclosure
- ⚠️ Missing sensory customization options
- ⚠️ No attention management tools

## 2. Vision Statement

**Primary Vision:** Create a digital space where neurodivergent minds feel genuinely welcomed and empowered, combining cutting-edge accessibility with a distinctive cyberpunk rollercoaster aesthetic that celebrates the unique perspectives and creative energy of our community.

**Core Principles:**

1. **Accessibility First:** Every feature designed with WCAG 2.2 AA+ compliance
2. **Neurodivergent-Centered:** Built by and for neurodivergent experiences
3. **Aesthetic Integrity:** Maintain cyberpunk rollercoaster theme without compromising usability
4. **Cognitive Respect:** Minimize cognitive load while maximizing functionality
5. **Sensory Awareness:** Provide comprehensive sensory customization options

## 3. Technical Architecture Strategy

### Accessibility Implementation

**WCAG 2.2 AA+ Compliance:**

```css
/* Enhanced focus indicators */
:focus-visible {
  outline: 3px solid currentColor;
  outline-offset: 3px;
  border-radius: 2px;
}

/* Motion preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Semantic Structure:**

- Consistent landmark usage (`<main>`, `<nav>`, `<aside>`, `<section>`)
- Single H1 per page with logical heading hierarchy
- Descriptive link text and button labels
- Form labels and error messaging
- Skip links for keyboard navigation

**Screen Reader Optimization:**

- Live regions for dynamic content updates
- Descriptive alt text for all images
- ARIA labels for complex interactions
- Status announcements for state changes

### Performance Considerations

**Core Web Vitals Targets:**

- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

**Implementation Strategy:**

- Static site generation with Vite SSG
- Component-level code splitting
- Optimized font loading with `font-display: swap`
- Progressive image enhancement
- Service worker for offline functionality

### Responsive Design Approach

**Breakpoint Strategy:**

```javascript
const breakpoints = {
  xs: "320px", // Small phones
  sm: "640px", // Large phones
  md: "768px", // Tablets
  lg: "1024px", // Small laptops
  xl: "1280px", // Large laptops
  "2xl": "1536px", // Desktops
};
```

**Mobile-First Principles:**

- Touch-friendly target sizes (minimum 44px)
- Thumb-zone optimization for primary actions
- Simplified navigation on smaller screens
- Readable typography at all sizes

## 4. Design System

### Color Palette & Contrast

**Primary Neon Palette:**

```css
:root {
  /* Cyberpunk Neon Colors */
  --primary: 315 85% 55%; /* Magenta #d946ef */
  --secondary: 190 90% 50%; /* Cyan #06b6d4 */
  --accent: var(--secondary); /* Unified accent system */

  /* Calm Mode Variants */
  --primary-calm: 315 60% 60%; /* Desaturated magenta */
  --secondary-calm: 190 65% 55%; /* Desaturated cyan */
}
```

**Contrast Ratios (WCAG AA+):**

- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- UI components: 3:1 minimum
- Focus indicators: 3:1 minimum against adjacent colors

**Grayscale Foundation:**

- Consistent 240° hue with 10% saturation
- 11-step scale from 96% to 9% lightness
- Maintains color temperature across themes

### Typography Hierarchy

**Font Stack:**

```css
--font-primary:
  "Atkinson Hyperlegible", -apple-system, BlinkMacSystemFont, "Segoe UI",
  system-ui, sans-serif;
```

**Scale & Hierarchy:**

```css
/* Responsive typography scale */
.text-xs {
  font-size: 0.75rem;
  line-height: 1.5;
}
.text-sm {
  font-size: 0.875rem;
  line-height: 1.6;
}
.text-base {
  font-size: 1rem;
  line-height: 1.6;
}
.text-lg {
  font-size: 1.125rem;
  line-height: 1.6;
}
.text-xl {
  font-size: 1.25rem;
  line-height: 1.5;
}
.text-2xl {
  font-size: 1.5rem;
  line-height: 1.4;
}
.text-3xl {
  font-size: 1.875rem;
  line-height: 1.3;
}
.text-4xl {
  font-size: 2.25rem;
  line-height: 1.2;
}
.text-5xl {
  font-size: 3rem;
  line-height: 1.1;
}
```

**Accessibility Features:**

- Minimum 16px base font size
- 1.6 line height for optimal readability
- 0.01em letter spacing for clarity
- Font smoothing for crisp rendering

### Component Library

**Base Components (Shadcn-vue):**

- Button variants with proper focus states
- Form controls with validation feedback
- Navigation components with ARIA support
- Modal and overlay components with focus trapping
- Data display components with screen reader support

**Custom Components:**

- `RdHeadlineGradient`: Branded gradient text effect
- `RdHeroSection`: Accessible hero with decorative elements
- `RdThemeToggle`: Dual-axis theme control (mode + intensity)
- `RdProgressIndicator`: Neurodivergent-friendly progress display
- `RdContentChunker`: Progressive disclosure for cognitive load management

### Animation & Motion Guidelines

**Respect for Vestibular Disorders:**

```css
/* Default: Subtle, purposeful animations */
.animate-gentle {
  transition: all 0.2s ease-out;
}

/* Reduced motion: Instant or minimal animation */
@media (prefers-reduced-motion: reduce) {
  .animate-gentle {
    transition: none;
  }
}
```

**Animation Principles:**

- Maximum 0.3s duration for UI transitions
- Easing functions: `ease-out` for entrances, `ease-in` for exits
- No auto-playing animations without user control
- Pause/play controls for any motion longer than 5 seconds
- Parallax effects disabled in reduced motion mode

### Visual Elements

**Cyberpunk Rollercoaster Motifs:**

- Subtle geometric patterns in background elements
- Gradient overlays with neon color combinations
- Clean, technical aesthetic with rounded corners
- Minimal use of shadows and depth effects
- Focus on typography and color over complex graphics

**Decorative Elements:**

```css
/* Subtle background gradients */
.bg-cyber-subtle {
  background: linear-gradient(
    135deg,
    hsl(var(--background)) 0%,
    hsl(var(--muted)) 100%
  );
}

/* Neon glow effects (respecting motion preferences) */
.glow-primary {
  box-shadow: 0 0 20px hsl(var(--primary) / 0.3);
}
```

## 5. User Experience Strategy

### Neurodivergent-Specific Features

**Cognitive Load Management:**

- Progressive disclosure with "Show more" toggles
- Content chunking with clear section breaks
- Breadcrumb navigation for context awareness
- Consistent layout patterns across pages
- Minimal cognitive overhead in navigation

**Sensory Considerations:**

- Comprehensive theme customization (intensity levels)
- Optional sound feedback with volume controls
- Texture and pattern options for visual variety
- Color blind friendly palette alternatives
- High contrast mode beyond standard dark/light

**Attention Management:**

- Focus indicators that don't disappear unexpectedly
- Minimal use of auto-updating content
- Clear visual hierarchy to guide attention
- Distraction-free reading modes
- Customizable notification preferences

**Executive Function Support:**

- Clear next steps and action items
- Progress indicators for multi-step processes
- Undo functionality where appropriate
- Confirmation dialogs for destructive actions
- Saved state preservation across sessions

### Navigation & Wayfinding

**Predictable Patterns:**

- Consistent header navigation across all pages
- Breadcrumb trails for deep navigation
- "You are here" indicators in complex sections
- Clear page titles and section headings
- Logical tab order for keyboard navigation

**Accessibility Features:**

- Skip links to main content and navigation
- Landmark roles for screen reader navigation
- Descriptive link text (no "click here")
- Keyboard shortcuts for power users
- Search functionality with filters

## 6. Implementation Roadmap

### Fast‑Track (Landing Page + AI‑accelerated) — 5–7 days total

Assumptions: current scope is a landing site (SSG) and we use AI for most code, docs, and tests. We will batch changes to minimize PR churn and ship daily.

Day 1 — Accessibility Foundations (Phase 1)

- Implement: focus‑visible (WCAG 2.4.11/12/13), skip links + landmarks, target sizes (2.5.8), motion control (`prefers-reduced-motion`), quick ARIA labeling audit
- Verify: keyboard‑only pass, axe/Pa11y/Lighthouse quick run
- Deliverables: 1–2 PRs (styles + minimal markup), updated a11y notes

Day 2 — SEO + Social + Crawl

- Titles, descriptions, canonical; JSON‑LD (homepage + core routes)
- OG defaults using existing OG tokens; robots.txt + sitemap.xml
- Verify: Google Rich Results test, social preview debuggers
- Deliverables: 1 PR, before/after Lighthouse summary

Day 3 — Content Chunking + Progressive Disclosure (Phase 2)

- Components: RdContentChunker, RdShowMore (a11y built‑in, motion‑safe)
- Integrate on home/about/how‑it‑works sections
- Add Histoire stories + minimal unit tests
- Deliverables: 1 PR (components + usage), stories + tests

Day 4 — Sensory Customization MVP (Phase 2)

- Panel with quick wins: intensity (existing), motion toggle, contrast preset, color‑vision presets (CSS vars), Reset
- Persist via localStorage; apply instantly
- Verify: contrast targets and a11y of the panel
- Deliverables: 1 PR (panel + useTheme extension), docs

Day 5 — Attention/Exec‑Function Helpers + Audit

- Reading Mode (width/line‑height/size controls), focus preservation on route change
- Simple progress indicator pattern (stub) for multi‑step content
- Wire CI scripts: axe/Pa11y/Lighthouse; run audit and fix nits
- Deliverables: 1 PR (helpers + CI scripts), audit report

Day 6–7 (Optional) — Polish & Docs

- Design polish (hierarchy/CTAs), i18n small tasks, performance nits (LCP/CLS)
- Finalize docs and Histoire coverage

Milestone mapping

- Phase 1: Day 1 (foundations), Day 5 (audit)
- Phase 2: Day 3–4 (neurodivergent features)
- Performance/SEO: Day 2 (+ Day 6–7 polish)

Automation & batching guidelines

- Prefer CSS tokens + global utilities over per‑component overrides
- Add a11y/SEO/testing scripts to package.json and CI early (Day 2/5)
- Use Histoire stories to document variants and a11y states
- Keep PRs small but vertically integrated (code + docs + tests)

## Success Metrics

**Accessibility Metrics:**

- WCAG 2.2 AA+ compliance: 100%
- Lighthouse accessibility score: 95+
- Screen reader compatibility: Full support
- Keyboard navigation: Complete coverage

**User Experience Metrics:**

- Task completion rate: 90%+
- User satisfaction (neurodivergent users): 4.5/5
- Cognitive load assessment: Reduced by 40%
- Time to complete common tasks: Improved by 30%

**Technical Metrics:**

- Core Web Vitals: All green
- Cross-browser compatibility: 99%+
- Mobile responsiveness: Perfect scores
- Component test coverage: 90%+

## Conclusion

This design document provides a roadmap for evolving Rollercoaster.dev into a truly inclusive, accessible platform that celebrates neurodivergent experiences while maintaining its distinctive cyberpunk rollercoaster aesthetic. The phased approach ensures we build upon existing strengths while systematically addressing gaps and enhancing the user experience for our target community.

The success of this project will be measured not just in technical compliance, but in the genuine empowerment and welcome that neurodivergent users feel when interacting with our platform. Every design decision should be evaluated through the lens of accessibility, cognitive respect, and authentic community support.
