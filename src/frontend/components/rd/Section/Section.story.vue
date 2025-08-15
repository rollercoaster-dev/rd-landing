<script setup lang="ts">
import RdSection from "./index.vue";
</script>

<template>
  <Story title="Components/Section" :layout="{ type: 'single', iframe: false }">
    <Variant title="Default">
      <RdSection>
        <h2>Section Content</h2>
        <p>This is content inside a section wrapper.</p>
      </RdSection>
    </Variant>

    <Variant title="With ID and Separator">
      <RdSection id="test-section" with-separator>
        <h2>Section with Separator</h2>
        <p>This section has separators before and after.</p>
      </RdSection>
    </Variant>

    <Variant title="Small Spacing">
      <RdSection spacing="sm">
        <h2>Compact Section</h2>
        <p>This section uses small spacing between elements.</p>
        <p>Another paragraph to show spacing.</p>
      </RdSection>
    </Variant>

    <Variant title="Large Spacing">
      <RdSection spacing="lg">
        <h2>Spacious Section</h2>
        <p>This section uses large spacing between elements.</p>
        <p>Another paragraph to show spacing.</p>
      </RdSection>
    </Variant>
  </Story>
</template>
