<script setup lang="ts">
import RdPrincipleGrid from "./index.vue";
</script>

<template>
  <Story
    title="Components/PrincipleGrid"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="Default (3 columns)">
      <RdPrincipleGrid
        :principles="[
          {
            title: 'Flexibility First',
            description:
              'Adaptable to diverse thinking styles and changing needs.',
          },
          {
            title: 'Community Driven',
            description:
              'Developed with continuous input from the neurodivergent community.',
          },
          {
            title: 'Open & Transparent',
            description:
              'Built on open standards (like Open Badges) and open source.',
          },
        ]"
      />
    </Variant>

    <Variant title="2 Columns">
      <RdPrincipleGrid
        :columns="2"
        :principles="[
          {
            title: 'User-Centered Design',
            description:
              'Every feature is designed with real user needs in mind.',
          },
          {
            title: 'Accessibility',
            description: 'Built to be accessible and inclusive for all users.',
          },
        ]"
      />
    </Variant>

    <Variant title="Custom Title">
      <RdPrincipleGrid
        title="Core Values"
        :principles="[
          {
            title: 'Innovation',
            description: 'Pushing boundaries to create better solutions.',
          },
          {
            title: 'Quality',
            description: 'High standards in everything we build.',
          },
          {
            title: 'Impact',
            description: 'Making a meaningful difference in users\' lives.',
          },
        ]"
      />
    </Variant>
  </Story>
</template>
