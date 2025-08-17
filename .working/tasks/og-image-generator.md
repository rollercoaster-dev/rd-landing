# Task: OG Image Generator System

## Overview

Implement a build-time OG image generation system that automatically creates beautiful, accessible social media images for all pages using our neurodivergent-focused design language.

## Goals

- **Zero cognitive load**: Pages get OG images automatically with `useSEO()` composable
- **Build-time generation**: No runtime overhead, works with SSG
- **Design consistent**: Uses our exact color tokens and Atkinson Hyperlegible font
- **Scalable**: Works for current and future pages effortlessly

## Implementation Tasks

### Phase 1: Setup & Dependencies

- [x] Install `@vercel/og` dependency
- [x] Create scripts directory structure
- [x] Set up build integration in package.json

### Phase 2: Core Generator

- [x] Create `scripts/generate-og-images.ts` main generator
- [x] Implement `scripts/og-design-tokens.ts` with our color/font system
- [x] Create `scripts/og-templates.tsx` with React components for layouts
- [x] Build `scripts/og-content-config.ts` route-based configuration

### Phase 3: Page Integration System

- [x] Create `src/frontend/composables/useSEO.ts` composable
- [x] Implement automatic OG image path generation
- [x] Add comprehensive meta tag handling (OG, Twitter, etc.)
- [x] Test integration with existing pages

### Phase 4: Templates & Design

- [x] **DefaultTemplate**: Hero-style for homepage with gradient title
- [x] **PageTemplate**: Clean title + subtitle layout for content pages
- [x] **FeatureTemplate**: Highlight layout for special content
- [x] Ensure high contrast and accessibility

### Phase 5: Build Integration

- [x] Update build scripts to generate OG images before build
- [x] Add development script to regenerate images
- [x] Set up proper output directory (`public/og/`)
- [x] Add generated images to .gitignore

### Phase 6: Testing & Documentation

- [ ] Test with existing homepage
- [ ] Prepare for upcoming pages (about, roadmap, legal, etc.)
- [ ] Document usage for future developers
- [ ] Validate OG images in Facebook/Twitter debuggers

## Technical Specifications

### File Structure

```
scripts/
├── generate-og-images.ts      # Main generator
├── og-templates.tsx           # React components for layouts
├── og-content-config.ts       # Route-based content config
└── og-design-tokens.ts        # Our color/font system

src/frontend/composables/
├── useSEO.ts                  # Main composable for pages

public/og/                     # Generated images (auto-created)
├── index-default-1200x630.png
├── about-page-1200x630.png
└── [route]-[template]-1200x630.png
```

### Design Tokens Integration

- **Colors**: Use exact HSL values from our CSS custom properties
- **Typography**: Atkinson Hyperlegible font (fallback to system fonts)
- **Layout**: Generous whitespace, high contrast for accessibility
- **Branding**: Subtle geometric elements matching our favicon

### Developer Experience

```vue
<!-- Simple usage -->
<script setup>
useSEO({
  title: "About Us",
  description: "Building tools by and for neurodivergent minds",
  // OG image automatically generated and included
});
</script>
```

```vue
<!-- Advanced usage -->
<script setup>
useSEO({
  title: "Roadmap",
  description: "Our journey ahead",
  og: {
    title: "Roadmap 2025",
    subtitle: "What's next for RollerCoaster.dev",
    template: "feature",
  },
});
</script>
```

## Success Criteria

- [ ] All pages automatically get OG images via `useSEO()` composable
- [ ] Images match our design language (neon accents, accessible typography)
- [ ] Build-time generation works seamlessly with existing build process
- [ ] Generated images are 1200x630px, optimized for social sharing
- [ ] Meta tags are automatically added for Open Graph and Twitter Cards
- [ ] System is documented and easy for future developers to use

## Dependencies

- @vercel/og (for image generation)
- Existing Vue 3 + TypeScript + @unhead/vue setup
- Our current design system (TailwindCSS tokens)

## Timeline

- **Phase 1-2**: Core generator implementation
- **Phase 3**: Integration with Vue composable system
- **Phase 4**: Template design and accessibility
- **Phase 5-6**: Build integration and testing

## Notes

- Focus on accessibility: high contrast, readable typography
- Leverage our existing design tokens for consistency
- Keep templates simple and maintainable
- Ensure generated images work well across all social platforms
- System should be invisible to developers - just works automatically
