<script setup lang="ts">
import RdGrid from "./index.vue";
</script>

<template>
  <Story title="Components/Grid" :layout="{ type: 'single', iframe: false }">
    <Variant title="2 Columns (Default)">
      <RdGrid>
        <div class="bg-card p-4 rounded border">Item 1</div>
        <div class="bg-card p-4 rounded border">Item 2</div>
        <div class="bg-card p-4 rounded border">Item 3</div>
        <div class="bg-card p-4 rounded border">Item 4</div>
      </RdGrid>
    </Variant>

    <Variant title="3 Columns">
      <RdGrid :cols="3">
        <div class="bg-card p-4 rounded border">Item 1</div>
        <div class="bg-card p-4 rounded border">Item 2</div>
        <div class="bg-card p-4 rounded border">Item 3</div>
        <div class="bg-card p-4 rounded border">Item 4</div>
        <div class="bg-card p-4 rounded border">Item 5</div>
        <div class="bg-card p-4 rounded border">Item 6</div>
      </RdGrid>
    </Variant>

    <Variant title="4 Columns">
      <RdGrid :cols="4">
        <div class="bg-card p-4 rounded border">Item 1</div>
        <div class="bg-card p-4 rounded border">Item 2</div>
        <div class="bg-card p-4 rounded border">Item 3</div>
        <div class="bg-card p-4 rounded border">Item 4</div>
      </RdGrid>
    </Variant>

    <Variant title="Large Gap">
      <RdGrid gap="lg">
        <div class="bg-card p-4 rounded border">Item 1</div>
        <div class="bg-card p-4 rounded border">Item 2</div>
        <div class="bg-card p-4 rounded border">Item 3</div>
        <div class="bg-card p-4 rounded border">Item 4</div>
      </RdGrid>
    </Variant>
  </Story>
</template>
