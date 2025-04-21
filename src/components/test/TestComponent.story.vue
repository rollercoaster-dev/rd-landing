<script setup lang="ts">
import TestComponent from "./TestComponent.vue";

function handleClick() {
  console.log("Button clicked!");
}
</script>

<template>
  <Story title="Test/TestComponent">
    <Variant title="Default Example">
      <div class="p-4 border rounded-md">
        <TestComponent
          title="My Test Component"
          description="This is a simple test component to verify our Histoire setup."
          button-text="Test Button"
          @click="handleClick"
        />
      </div>
    </Variant>

    <Variant title="Custom Title">
      <div class="p-4 border rounded-md">
        <TestComponent
          title="Custom Title Example"
          description="This component has a custom title."
          button-text="Click Me"
          @click="handleClick"
        />
      </div>
    </Variant>

    <Variant title="Dark Mode Example">
      <div
        class="p-4 border rounded-md bg-gray-900 dark:bg-gray-800 text-white"
      >
        <TestComponent
          title="Dark Mode Component"
          description="This component is displayed in dark mode."
          button-text="Dark Button"
          @click="handleClick"
        />
      </div>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Test Component

A simple test component to verify our Histoire setup.

## Props

- `title`: The title of the component
- `description`: The description text
- `buttonText`: The text to display on the button

## Events

- `click`: Emitted when the button is clicked
</docs>
