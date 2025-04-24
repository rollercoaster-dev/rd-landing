<template>
  <Story title="Auth/LogoutButton" group="rd">
    <Variant title="Default">
      <LogoutButton />
    </Variant>

    <Variant title="Default (Text Only)">
      <LogoutButton show-text />
    </Variant>

    <Variant title="Primary Button">
      <LogoutButton variant="default" show-text />
    </Variant>

    <Variant title="Outline Button">
      <LogoutButton variant="outline" show-text />
    </Variant>

    <Variant title="Custom Text">
      <LogoutButton show-text text="Sign Out Now" />
    </Variant>

    <Variant title="Custom Text and Icon">
      <LogoutButton show-text text="Log Out User" icon="lucide:log-out" />
    </Variant>

    <Variant title="Dynamic Text (Bound)">
      <LogoutButton :show-text="true" :text="dynamicText" />
    </Variant>

    <Variant title="Icon Only">
      <LogoutButton />
    </Variant>

    <Variant title="Custom Icon and Class">
      <LogoutButton icon="mdi:exit-run" icon-class="text-red-500 w-6 h-6" />
    </Variant>

    <Variant title="All Props">
      <LogoutButton
        show-text
        text="Sign Out"
        icon="lucide:log-out"
        icon-class="h-6 w-6 mr-2"
        variant="default"
        size="lg"
        button-class="bg-red-500 hover:bg-red-700"
        redirect-to="/login"
      />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { logEvent } from "histoire/client";
import type { App } from "vue";
import { provide } from "vue";
</script>

<docs lang="md">
# Logout Button Component

A reusable button component for logging users out of the application.

## Features

- Configurable appearance (variant, size, classes)
- Optional icon and text display
- Loading state during logout
- Event emitters for logout lifecycle
- Redirect after successful logout

## Props

| Prop        | Type    | Default        | Description                                    |
| ----------- | ------- | -------------- | ---------------------------------------------- |
| variant     | String  | 'ghost'        | Button variant (ghost, default, outline, etc.) |
| size        | String  | 'default'      | Button size (default, sm, lg, etc.)            |
| buttonClass | String  | ''             | Additional CSS classes for the button          |
| showIcon    | Boolean | true           | Whether to show the logout icon                |
| showText    | Boolean | false          | Whether to show the button text                |
| text        | String  | 'Logout'       | The text to display on the button              |
| iconClass   | String  | 'h-4 w-4 mr-2' | CSS classes for the icon                       |
| redirectTo  | String  | '/'            | Where to redirect after successful logout      |

## Events

- `logout:start` - Emitted when logout process begins
- `logout:success` - Emitted when logout is successful
- `logout:error` - Emitted when logout fails, with the error

## Usage

```vue
<template>
  <!-- Basic usage -->
  <LogoutButton />

  <!-- With text -->
  <LogoutButton show-text />

  <!-- Custom styling -->
  <LogoutButton
    variant="default"
    show-text
    text="Sign Out"
    redirect-to="/login"
  />

  <!-- With event handlers -->
  <LogoutButton
    @logout:start="handleStart"
    @logout:success="handleSuccess"
    @logout:error="handleError"
  />
</template>
```
</docs>
