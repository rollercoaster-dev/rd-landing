<script setup lang="ts">
import { logEvent } from "histoire/client";
</script>

<template>
  <Story title="Base/FeatureList" :layout="{ type: 'grid', width: '50%' }">
    <Variant title="Default">
      <RdBaseFeatureList
        :features="[
          'Get early access to features',
          'Stay updated on development',
          'Provide valuable feedback',
        ]"
      />
    </Variant>

    <Variant title="Custom Checkmark Color">
      <RdBaseFeatureList
        :features="[
          'Shape the platform\'s future',
          'Work with like-minded creators',
          'Build tools that matter',
        ]"
        checkmark-color="text-blue-500"
      />
    </Variant>

    <Variant title="Long Features">
      <RdBaseFeatureList
        :features="[
          'Flexible goal tracking that adapts to your unique journey',
          'Custom achievement paths designed for neurodivergent minds',
          'Progress visualization that makes sense for how you think',
        ]"
      />
    </Variant>
  </Story>
</template>
