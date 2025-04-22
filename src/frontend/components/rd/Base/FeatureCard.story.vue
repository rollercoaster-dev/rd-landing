<script setup lang="ts">
import FeatureCard from "./FeatureCard.vue";
</script>

<template>
  <Story title="RD/Base/FeatureCard" group="rd">
    <Variant title="Basic">
      <div class="p-4 max-w-md">
        <FeatureCard
          title="Basic Feature Card"
          icon="📊"
          description="This is a simple feature card with a description."
          :features="['Feature 1', 'Feature 2', 'Feature 3']"
        />
      </div>
    </Variant>

    <Variant title="Different Icon">
      <div class="p-4 max-w-md">
        <FeatureCard
          title="Card with Different Icon"
          icon="🚀"
          description="This card uses a different icon to represent the feature."
          :features="['Feature 1', 'Feature 2', 'Feature 3']"
        />
      </div>
    </Variant>

    <Variant title="Long Description">
      <div class="p-4 max-w-md">
        <FeatureCard
          title="Long Description"
          icon="📝"
          description="This card has a longer description to demonstrate how the card handles more text content. The card should expand to fit the content while maintaining its design integrity and readability."
          :features="['Feature 1', 'Feature 2', 'Feature 3']"
        />
      </div>
    </Variant>

    <Variant title="Many Features">
      <div class="p-4 max-w-md">
        <FeatureCard
          title="Many Features"
          icon="🔍"
          description="This card has many features listed."
          :features="[
            'First feature item',
            'Second feature item',
            'Third feature item',
            'Fourth feature item',
            'Fifth feature item',
            'Sixth feature item',
          ]"
        />
      </div>
    </Variant>

    <Variant title="No Features">
      <div class="p-4 max-w-md">
        <FeatureCard
          title="No Features"
          icon="📋"
          description="This card doesn't have any features listed."
          :features="[]"
        />
      </div>
    </Variant>

    <Variant title="Multiple Cards">
      <div class="p-4 grid grid-cols-2 gap-4">
        <FeatureCard
          title="First Feature"
          icon="1️⃣"
          description="Description of the first feature."
          :features="['Sub-feature 1', 'Sub-feature 2']"
        />
        <FeatureCard
          title="Second Feature"
          icon="2️⃣"
          description="Description of the second feature."
          :features="['Sub-feature 1', 'Sub-feature 2']"
        />
      </div>
    </Variant>

    <Variant title="Dark Mode" dark>
      <div class="p-4 max-w-md bg-background">
        <FeatureCard
          title="Dark Mode Card"
          icon="🌙"
          description="This card is displayed in dark mode."
          :features="['Feature 1', 'Feature 2', 'Feature 3']"
        />
      </div>
    </Variant>
  </Story>
</template>
