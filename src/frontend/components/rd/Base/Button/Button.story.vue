<script setup lang="ts">
// No components or imports needed
</script>

<template>
  <Story title="RD/Base/Button" group="rd">
    <!-- Default Variants -->
    <Variant title="Primary (Default)">
      <div class="p-4 space-y-4">
        <button
          class="inline-flex items-center gap-2 rounded-md font-medium transition-colors bg-primary text-primary-foreground h-9 px-4 py-2"
        >
          Primary Button
        </button>
      </div>
    </Variant>

    <Variant title="Secondary">
      <div class="p-4 space-y-4">
        <button
          class="inline-flex items-center gap-2 rounded-md font-medium transition-colors bg-secondary text-secondary-foreground h-9 px-4 py-2"
        >
          Secondary Button
        </button>
      </div>
    </Variant>

    <Variant title="Outline">
      <div class="p-4 space-y-4">
        <button
          class="inline-flex items-center gap-2 rounded-md font-medium transition-colors border border-input bg-background h-9 px-4 py-2"
        >
          Outline Button
        </button>
      </div>
    </Variant>

    <Variant title="Ghost">
      <div class="p-4 space-y-4">
        <button
          class="inline-flex items-center gap-2 rounded-md font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
        >
          Ghost Button
        </button>
      </div>
    </Variant>

    <Variant title="Link">
      <div class="p-4 space-y-4">
        <button
          class="inline-flex items-center gap-2 rounded-md font-medium transition-colors text-primary underline-offset-4 hover:underline h-9 px-4 py-2"
        >
          Link Button
        </button>
      </div>
    </Variant>

    <Variant title="Destructive">
      <div class="p-4 space-y-4">
        <button
          class="inline-flex items-center gap-2 rounded-md font-medium transition-colors bg-destructive text-destructive-foreground h-9 px-4 py-2"
        >
          Destructive Button
        </button>
      </div>
    </Variant>

    <!-- Sizes -->
    <Variant title="Size Variants">
      <div class="p-4 space-y-4">
        <div class="flex items-center gap-4">
          <button
            class="inline-flex items-center gap-2 rounded-md font-medium transition-colors bg-primary text-primary-foreground h-8 rounded-md px-3 text-xs"
          >
            Small
          </button>
          <button
            class="inline-flex items-center gap-2 rounded-md font-medium transition-colors bg-primary text-primary-foreground h-9 px-4 py-2"
          >
            Default
          </button>
          <button
            class="inline-flex items-center gap-2 rounded-md font-medium transition-colors bg-primary text-primary-foreground h-10 rounded-md px-8"
          >
            Large
          </button>
          <button
            class="inline-flex items-center gap-2 rounded-md font-medium transition-colors bg-primary text-primary-foreground h-9 w-9"
          >
            A
          </button>
        </div>
      </div>
    </Variant>

    <!-- Icons -->
    <Variant title="With Icons">
      <div class="p-4 space-y-4">
        <div class="flex flex-col gap-4">
          <button
            class="inline-flex items-center gap-2 rounded-md font-medium transition-colors bg-primary text-primary-foreground h-9 px-4 py-2"
          >
            With Right Arrow
            <span class="text-lg">→</span>
          </button>
          <button
            class="inline-flex items-center gap-2 rounded-md font-medium transition-colors bg-primary text-primary-foreground h-9 px-4 py-2"
          >
            With Down Arrow
            <span class="text-lg">↓</span>
          </button>
        </div>
      </div>
    </Variant>

    <!-- States -->
    <Variant title="Disabled State">
      <div class="p-4 space-y-4">
        <div class="flex flex-wrap gap-4">
          <button
            disabled
            class="inline-flex items-center gap-2 rounded-md font-medium transition-colors bg-primary text-primary-foreground h-9 px-4 py-2 opacity-50 cursor-not-allowed"
          >
            Primary Disabled
          </button>
          <button
            disabled
            class="inline-flex items-center gap-2 rounded-md font-medium transition-colors bg-secondary text-secondary-foreground h-9 px-4 py-2 opacity-50 cursor-not-allowed"
          >
            Secondary Disabled
          </button>
          <button
            disabled
            class="inline-flex items-center gap-2 rounded-md font-medium transition-colors border border-input bg-background h-9 px-4 py-2 opacity-50 cursor-not-allowed"
          >
            Outline Disabled
          </button>
        </div>
      </div>
    </Variant>
  </Story>
</template>
