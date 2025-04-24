# Components Implementation Task List

This file tracks the components we need to implement from the platform/frontend project, along with their Histoire stories.

## UI Components (Shadcn-like components)

These are base UI components that follow the Shadcn design system. We can add these using the Shadcn CLI.

| Component      | Status      | Histoire Story | Notes                                          |
| -------------- | ----------- | -------------- | ---------------------------------------------- |
| **Accordion**  |             |                |                                                |
| `ui/accordion` | Not Started | Not Started    | Add with `npx shadcn-vue@latest add accordion` |
| **Alert**      |             |                |                                                |
| `ui/alert`     | Not Started | Not Started    | Add with `npx shadcn-vue@latest add alert`     |
| **Badge**      |             |                |                                                |
| `ui/badge`     | Not Started | Not Started    | Add with `npx shadcn-vue@latest add badge`     |
| **Button**     | ✅          | ✅             |                                                |
| `ui/button`    | Completed   | Completed      | Added with `npx shadcn-vue@latest add button`  |
| **Card**       |             |                |                                                |
| `ui/card`      | Not Started | Not Started    | Add with `npx shadcn-vue@latest add card`      |
| **Separator**  |             |                |                                                |
| `ui/separator` | Not Started | Not Started    | Add with `npx shadcn-vue@latest add separator` |
| **Tooltip**    |             |                |                                                |
| `ui/tooltip`   | Not Started | Not Started    | Add with `npx shadcn-vue@latest add tooltip`   |

## Rollercoaster.dev Components

These are custom components specific to the Rollercoaster.dev project.

| Component                       | Status      | Histoire Story | Notes |
| ------------------------------- | ----------- | -------------- | ----- |
| **Base Components**             |             |                |       |
| `rd/Base/ActionCard/index.vue`  | Not Started | Not Started    |       |
| `rd/Base/Button/index.vue`      | Not Started | Not Started    |       |
| `rd/Base/FeatureCard.vue`       | Not Started | Not Started    |       |
| `rd/Base/FeatureItem/index.vue` | Not Started | Not Started    |       |
| `rd/Base/Link.vue`              | Not Started | Not Started    |       |
| `rd/Base/SectionHeader.vue`     | Not Started | Not Started    |       |
| **Headline Components**         |             |                |       |
| `rd/HeadlineGradient/index.vue` | Not Started | Not Started    |       |
| **Layout Components**           |             |                |       |
| `rd/layout/Header.vue`          | Not Started | Not Started    |       |

## Implementation Plan

1. Start with the base UI components using Shadcn CLI ✅
2. Create Histoire stories for each component ✅
3. Move on to the Rollercoaster.dev specific components
4. Ensure all components use the new styling system

## Progress

- Added Button component with Histoire story
- Created a test component to verify Histoire setup
- Updated Histoire configuration for proper styling and dark mode support

## Adding Shadcn Components

To add a Shadcn component, run:

```bash
npx shadcn-vue@latest add component-name
```

This will add the component to the `src/components/ui` directory.

## Creating Histoire Stories

For each component, create a story file with the same name as the component but with `.story.vue` extension. Place it in the same directory as the component.

### Basic story template for UI components:

```vue
<template>
  <Story title="UI/ComponentName" group="ui">
    <Variant title="Default">
      <ComponentName />
    </Variant>
    <Variant title="Another Variant">
      <ComponentName variant="secondary" />
    </Variant>
    <Variant title="Dark Mode" :darkMode="true">
      <ComponentName />
    </Variant>
  </Story>
</template>

<script setup>
import { Story, Variant } from "histoire/client";
import ComponentName from "./ComponentName.vue";
</script>
```

### Basic story template for Rollercoaster.dev components:

```vue
<template>
  <Story title="RD/ComponentName" group="rd">
    <Variant title="Default">
      <ComponentName />
    </Variant>
    <Variant title="Dark Mode" :darkMode="true">
      <ComponentName />
    </Variant>
  </Story>
</template>

<script setup>
import { Story, Variant } from "histoire/client";
import ComponentName from "./index.vue";
</script>
```

## Notes

- Ensure all components follow the styling system from platform/frontend
- Test components in both light and dark mode
- Document props and usage in the Histoire stories
- For Shadcn components, check if any customization is needed to match the platform/frontend design
