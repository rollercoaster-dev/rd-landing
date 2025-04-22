<script setup lang="ts">
import Link from "./Link.vue";
</script>

<template>
  <Story title="RD/Base/Link" group="rd">
    <Variant title="Primary (Default)">
      <div class="p-4 space-y-4">
        <Link href="#" internal>Primary Link</Link>
      </div>
    </Variant>

    <Variant title="Secondary">
      <div class="p-4 space-y-4">
        <Link href="#" variant="secondary" internal>Secondary Link</Link>
      </div>
    </Variant>

    <Variant title="Text">
      <div class="p-4 space-y-4">
        <Link href="#" variant="text" internal>Text Link</Link>
      </div>
    </Variant>

    <Variant title="Icon Variants">
      <div class="p-4 space-y-4">
        <div class="flex flex-col gap-4">
          <Link href="#" icon="arrow-right" internal>With Right Arrow</Link>
          <Link href="#" icon="arrow-down" internal>With Down Arrow</Link>
          <Link href="#" icon="none" internal>No Icon</Link>
        </div>
      </div>
    </Variant>

    <Variant title="External Links">
      <div class="p-4 space-y-4">
        <div class="flex flex-col gap-4">
          <Link href="https://github.com">External Link (GitHub)</Link>
          <Link href="https://example.com" variant="secondary"
            >External Secondary Link</Link
          >
          <Link href="https://example.com" variant="text"
            >External Text Link</Link
          >
        </div>
      </div>
    </Variant>

    <Variant title="Internal Links">
      <div class="p-4 space-y-4">
        <div class="flex flex-col gap-4">
          <Link href="/" internal>Home Page Link</Link>
          <Link href="#section" internal>Anchor Link</Link>
          <Link href="/about" internal variant="secondary"
            >About Page Link</Link
          >
        </div>
      </div>
    </Variant>

    <Variant title="In Context">
      <div class="p-4">
        <div class="p-6 border rounded-lg space-y-4">
          <h3 class="text-xl font-bold">Call to Action Section</h3>
          <p>Learn more about our services and how we can help you.</p>
          <div class="flex gap-4">
            <Link href="#" internal>Get Started</Link>
            <Link href="#" variant="secondary" internal>Learn More</Link>
          </div>
        </div>
      </div>
    </Variant>

    <Variant title="Dark Mode" dark>
      <div class="p-4 bg-background space-y-4">
        <div class="flex gap-4">
          <Link href="#" internal>Primary Link</Link>
          <Link href="#" variant="secondary" internal>Secondary Link</Link>
          <Link href="#" variant="text" internal>Text Link</Link>
        </div>
      </div>
    </Variant>
  </Story>
</template>
