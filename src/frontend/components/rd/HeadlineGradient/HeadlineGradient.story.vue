<script setup lang="ts">
import HeadlineGradient from "./index.vue";
</script>

<template>
  <Story title="RD/HeadlineGradient" group="rd">
    <Variant title="Default State">
      <div class="p-4">
        <HeadlineGradient>Gradient Headline</HeadlineGradient>
      </div>
    </Variant>

    <Variant title="In Heading">
      <div class="p-4">
        <h1 class="text-3xl font-bold">
          <HeadlineGradient>Rollercoaster.dev</HeadlineGradient>
        </h1>
      </div>
    </Variant>

    <Variant title="In Paragraph">
      <div class="p-4">
        <p class="text-lg">
          Welcome to <HeadlineGradient>rollercoaster.dev</HeadlineGradient>,
          where development meets excitement.
        </p>
      </div>
    </Variant>

    <Variant title="Multiple Instances">
      <div class="p-4 space-y-4">
        <h2 class="text-2xl font-bold">
          <HeadlineGradient>Main Title</HeadlineGradient>
        </h2>
        <p class="text-lg">
          This is a paragraph with
          <HeadlineGradient>highlighted text</HeadlineGradient> in the middle.
        </p>
        <div class="text-xl font-semibold">
          <HeadlineGradient>Call to Action</HeadlineGradient>
        </div>
      </div>
    </Variant>

    <Variant title="Dark Mode" dark>
      <div class="p-4">
        <HeadlineGradient>Gradient Headline in Dark Mode</HeadlineGradient>
      </div>
    </Variant>
  </Story>
</template>
