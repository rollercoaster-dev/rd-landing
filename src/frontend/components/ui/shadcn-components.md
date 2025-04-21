# shadcn-vue Components

This document provides an overview of all available shadcn-vue components and indicates which ones are currently installed in our project.

## Installation

To add a new shadcn component, use the following command:

```bash
pnpm shadcn-components <component-name>
```

## Component List

### Currently Installed Components

- [x] **Accordion** - A vertically stacked set of interactive headings that each reveal a section of content.
- [x] **Alert** - Displays a callout for user attention with optional title and description.
- [x] **Badge** - Small status descriptor for UI elements.
- [x] **Button** - Trigger for actions with various styles and states.
- [x] **Card** - Container with header, content, footer sections for grouping related information.
- [x] **Separator** - Visual divider between content with horizontal or vertical orientation.
- [x] **Tooltip** - Floating label that appears when user hovers over or focuses on an element.

### Available Components (Not Yet Installed)

- [ ] **Aspect Ratio** - Maintains consistent width-to-height ratio for responsive elements.
- [ ] **Avatar** - Image element with fallback for representing users.
- [ ] **Calendar** - Date picker with grid view of days, months, and years.
- [ ] **Checkbox** - Control that allows selecting multiple items from a set.
- [ ] **Collapsible** - Component that can be expanded/collapsed with animation.
- [ ] **Command** - Command palette for keyboard-centric interfaces.
- [ ] **Context Menu** - Right-click menu with nested functionality.
- [ ] **Dialog** - Modal window overlaid on the interface.
- [ ] **Dropdown Menu** - Menu that appears from a trigger element.
- [ ] **Form** - Components for building forms with validation.
- [ ] **Hover Card** - Card that appears when hovering over an element.
- [ ] **Input** - Form control for text entry.
- [ ] **Label** - Text caption for form elements.
- [ ] **Menubar** - Horizontal navigation component with dropdowns.
- [ ] **Navigation Menu** - Hierarchical navigation component.
- [ ] **Pagination** - Controls for navigating through pages of content.
- [ ] **Popover** - Floating element that displays relative to a trigger.
- [ ] **Progress** - Visual indicator of completion percentage.
- [ ] **Radio Group** - Set of radio buttons for selecting one option.
- [ ] **Scroll Area** - Custom scrollable container with consistent styling.
- [ ] **Select** - Dropdown selection control.
- [ ] **Sheet** - Side-anchored dialog component.
- [ ] **Skeleton** - Placeholder loading state for UI elements.
- [ ] **Slider** - Control for selecting a value from a range.
- [ ] **Switch** - Toggle control for binary options.
- [ ] **Table** - Tabular data presentation component.
- [ ] **Tabs** - Organize content into separate views.
- [ ] **Textarea** - Multi-line text input control.
- [ ] **Toast** - Brief notification component.
- [ ] **Toggle** - Two-state button that can be toggled on or off.
- [ ] **Toggle Group** - Group of toggle controls.

## Usage Example

```vue
<template>
  <UIAccordion type="single" collapsible>
    <UIAccordionItem value="item-1">
      <UIAccordionTrigger>Is it accessible?</UIAccordionTrigger>
      <UIAccordionContent>
        Yes. It adheres to the WAI-ARIA design pattern.
      </UIAccordionContent>
    </UIAccordionItem>
  </UIAccordion>
</template>
```

## Documentation

For detailed documentation on each component, visit the [shadcn-vue documentation](https://shadcn-vue.com/docs/components/accordion).
