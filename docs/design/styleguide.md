# Style Guide (Source of Truth)

A concise, actionable visual and interaction system for Rollercoaster.dev.

## 1. Design Tokens

### Color

- Neutrals: use CSS vars `--gray-50 … --gray-950` (already in code)
- Brand
  - Primary (Magenta): `hsl(315 85% 55%)`
  - Accent/Secondary (Cyan): `hsl(190 90% 50%)`
  - Calm variants: `--primary-calm`, `--secondary-calm` (desaturated)
- States
  - Border/Input/Ring tokens already defined; use tokens only
- Contrast
  - Text ≥ 4.5:1, Large text ≥ 3:1, UI/Focus ≥ 3:1

### Typography

- Family: Atkinson Hyperlegible (primary), system fallback
- Base: 16px, line-height 1.6, letter-spacing 0.01em
- Scale: text-sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl (tailwind classes)
- Max text width: 65–72ch; Reading Mode = 65ch

### Spacing (4pt base, tuned)

- 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80
- Section spacing: 40–64px (mobile), 64–96px (desktop)

### Radius & Elevation

- Radii: sm 6px, md 8px, lg 12px (map to `--radius` variants)
- Elevation levels
  - 0: page background
  - 1: card (1px border, subtle fill)
  - 2: overlays (backdrop blur, ring)
- Prefer borders over heavy shadows; use `--ring` for emphasis

### Motion

- Micro: 120–180ms ease-out (hover/press)
- UI transitions: 180–240ms ease-out
- Overlay: 200–260ms spring-like ease-out (scale 98% → 100%)
- Reduced motion: disable transforms; fade only; ≤ 50ms

## 2. Art Direction: Subtle Cyberpunk Rollercoaster

- Motifs: gradient rails (thin lines), node dots, soft glow accents
- Use neon for emphasis/interactions; never for body fills
- One gradient headline per section max; neutrals elsewhere
- Avoid dense/competing backgrounds; pick one subtle motif per page

## 3. Components

### Buttons

- Sizes: sm 32px, md 40px, lg 44px, icon 40px
- Focus: 3px ring (`--ring`), offset 2–3px
- Variants
  - Primary: filled magenta (ensure 4.5:1 text contrast)
  - Secondary: outline accent; hover = subtle fill
  - Ghost: text-only; strong focus ring; minimum contrast

### Cards

- Border 1px (`--border`), 12px radius
- Header 16/20, Body 16/24, Footer 16/20
- No heavy shadows; prefer ring for emphasis

### Navigation

- Header: sticky, translucent backdrop; clear focus order
- Menu items: min height 40px; target size ≥ 24px (mobile 44px)
- Active state: underline or weight + color; not both

### Forms

- Inputs min height 40px; persistent label
- Error state uses `--destructive`; `aria-describedby` for message
- Checkbox/Radio: 24px min target; label clickable

### Content & Text

- Links use accent; underline on hover/focus; keep ≥ 3:1 against adjacents
- Gradient text via `RdHeadlineGradient`; max one per section
- Lists over walls of text; chunk content into short sections

## 4. Accessibility Baselines

- One H1 per page; landmarks present; skip links visible on focus
- Target sizes ≥ 24px; touch targets ≥ 44px
- Focus ring visible and unobscured across themes/intensities
- Reduced motion respected; no parallax by default

## 5. Page Composition Patterns

### Landing

- Hero (gradient headline) → 3-up value props → community/roadmap teaser → CTA → Footer
- One subtle background motif; no parallax

### Secondary

- Intro block → chunked sections (accordion/tabs) → CTA

### Footer

- Navigation clusters, legal links (Impressum/Datenschutz), GitHub/social

## 6. References

- Tailwind tokens: tailwind.config.js
- CSS variables: src/frontend/styles/main.css
- Components: src/frontend/components/rd/_ and ui/_
- Histoire stories: src/frontend/components/**/**.story.vue
