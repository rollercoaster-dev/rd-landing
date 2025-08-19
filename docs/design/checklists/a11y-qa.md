# Accessibility QA Checklist

Use this on every PR. Target WCAG 2.2 AA.

## Baseline

- [ ] One H1 per page; headings in order
- [ ] Landmarks: header/nav/main/aside/footer
- [ ] Skip links: visible on focus, work with Tab
- [ ] Focus: visible, 3:1 contrast, not obscured
- [ ] Targets: ≥ 24px (mobile ≥ 44px)
- [ ] Reduced motion: `prefers-reduced-motion` respected
- [ ] Images: alt text; decorative marked appropriately
- [ ] Links: descriptive text (no “click here”)
- [ ] Forms: labels + `aria-describedby` for errors

## Keyboard-only

- [ ] All interactive elements reachable
- [ ] Logical tab order
- [ ] No keyboard traps; Esc closes overlays
- [ ] Focus returns to trigger after modal/overlay

## Screen readers

- [ ] NVDA / VoiceOver smoke test passes
- [ ] ARIA roles/labels present for complex components
- [ ] Live regions for dynamic status updates

## Visual

- [ ] Contrast: text ≥ 4.5:1, UI ≥ 3:1
- [ ] Max text width ≤ 72ch; reading mode 65ch
- [ ] Gradient headlines: ≤ 1 per section

## Automation

- [ ] axe-core: 0 violations
- [ ] Pa11y: no blocking issues
- [ ] Lighthouse: ≥ 95 a11y score
