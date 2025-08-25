# Mobile Menu Refactor (Header.vue) — Task Tracker

## Goal

Refactor the mobile menu to use shadcn-style Sheet components with full WCAG 2.1 AA accessibility, consistent styling, and smooth animations.

## Tasks

- [/] Draft detailed refactor plan for mobile menu using shadcn Sheet
  - Create an actionable plan to replace the custom mobile menu with shadcn-style Sheet components, covering accessibility, component integration, and visual design.
- [ ] Implement UiSheet components under src/frontend/components/ui/sheet
  - Add shadcn-style Sheet wrappers (Root, Trigger, Overlay, Content, Header, Footer, Title, Description, Close) around Reka UI Dialog primitives with proper styling and animations.
- [ ] Refactor Header.vue to use UiSheet for the mobile menu
  - Replace manual state/overflow/focus handling with UiSheet primitives, integrate nav and CTAs, and remove or repurpose unused MobileMenue.vue.
- [ ] Tests & Validation
  - Add/adjust unit tests verifying focus trap, escape-to-close, focus restoration, and ARIA props.
  - Run Playwright flows: keyboard-only open/close, Tab/Shift+Tab wrap, Escape close, and route navigation close.

## Notes

- Ensure trigger meets 44x44 touch target.
- Prefer aria-labelledby with visible title over aria-label.
- Keep styles consistent with other shadcn components (dropdown/select animations).
