<script setup lang="ts">
import Header from "./Header.vue";
</script>

<template>
  <Story title="RD/Layout/Header" group="rd">
    <Variant title="Default">
      <div class="w-full">
        <Header />
      </div>
    </Variant>

    <Variant title="With Content Below">
      <div class="w-full">
        <Header />
        <div class="container mx-auto p-6">
          <h1 class="text-2xl font-bold mb-4">Page Content</h1>
          <p class="mb-4">
            This shows how the header looks in the context of a page with
            content below it.
          </p>
          <p>
            The header is sticky and will remain at the top of the viewport when
            scrolling.
          </p>
        </div>
      </div>
    </Variant>
  </Story>
</template>
