<script setup lang="ts">
import { Button } from "./index";
</script>

<template>
  <Story title="UI/Button">
    <Variant title="Default Variants">
      <div class="flex flex-wrap gap-4 p-4">
        <Button>Default Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="destructive">Destructive Button</Button>
        <Button variant="outline">Outline Button</Button>
        <Button variant="ghost">Ghost Button</Button>
        <Button variant="link">Link Button</Button>
      </div>
    </Variant>

    <Variant title="Sizes">
      <div class="flex flex-wrap items-center gap-4 p-4">
        <Button size="default">Default Size</Button>
        <Button size="sm">Small Size</Button>
        <Button size="lg">Large Size</Button>
        <Button size="icon">
          <span class="h-4 w-4">🔍</span>
        </Button>
      </div>
    </Variant>

    <Variant title="States">
      <div class="flex flex-wrap gap-4 p-4">
        <Button>Normal</Button>
        <Button disabled>Disabled</Button>
      </div>
    </Variant>

    <Variant title="With Icons">
      <div class="flex flex-wrap gap-4 p-4">
        <Button>
          <span class="mr-2">🔍</span>
          Search
        </Button>
        <Button>
          Download
          <span class="ml-2">💾</span>
        </Button>
      </div>
    </Variant>

    <Variant title="Dark Mode Example">
      <div
        class="flex flex-wrap gap-4 p-4 rounded-md bg-gray-900 dark:bg-gray-800"
      >
        <Button>Default Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="destructive">Destructive Button</Button>
        <Button variant="outline">Outline Button</Button>
        <Button variant="ghost">Ghost Button</Button>
        <Button variant="link">Link Button</Button>
      </div>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Button Component

A button component with various styles and sizes.

## Props

- `variant`: The style variant of the button (default, destructive, outline, secondary, ghost, link)
- `size`: The size of the button (default, sm, lg, icon)
- `disabled`: Whether the button is disabled

## Usage

```vue
<Button>Default Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="destructive">Destructive Button</Button>
<Button disabled>Disabled Button</Button>
```
</docs>
