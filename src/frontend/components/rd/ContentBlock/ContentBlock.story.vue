<script setup lang="ts">
import RdContentBlock from "./index.vue";
</script>

<template>
  <Story
    title="Components/ContentBlock"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant title="Default">
      <RdContentBlock
        title="The Challenge"
        content="Rigid schedules and linear lists don't always align with how our minds work best. We understand that neurodivergent strengths are different."
      />
    </Variant>

    <Variant title="Accent Variant">
      <RdContentBlock
        title="Our Solution"
        variant="accent"
        content="At Rollercoaster.dev, our vision is simple: <strong class='block mt-2 text-xl text-accent'>Create the tools we wish existed, built <em>by</em> and <em>for</em> the neurodivergent community.</strong>"
      />
    </Variant>

    <Variant title="Primary Variant">
      <RdContentBlock
        title="Innovation Focus"
        variant="primary"
        content="We're committed to pushing the boundaries of what's possible in assistive technology and user experience design."
      />
    </Variant>

    <Variant title="With Footer Slot">
      <RdContentBlock
        title="Get Started"
        content="Ready to begin your journey? We have resources to help you get started."
      >
        <template #footer>
          <button class="bg-primary text-primary-foreground px-4 py-2 rounded">
            Learn More
          </button>
        </template>
      </RdContentBlock>
    </Variant>
  </Story>
</template>
