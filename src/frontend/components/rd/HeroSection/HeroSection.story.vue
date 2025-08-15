<script setup lang="ts">
import RdHeroSection from "./index.vue";
</script>

<template>
  <Story title="Components/HeroSection" :layout="{ type: 'fullscreen' }">
    <Variant title="Default">
      <RdHeroSection
        title="Rollercoaster.dev"
        subtitle="is a space where neurodivergent minds create and discover tools designed for the way we think."
        :actions="[
          {
            text: 'Learn More',
            href: '#what-we-build',
            icon: 'arrow-down',
            internal: true,
          },
          {
            text: 'View on GitHub',
            href: 'https://github.com/rollercoaster-dev',
            variant: 'secondary',
          },
        ]"
      />
    </Variant>

    <Variant title="No Actions">
      <RdHeroSection
        title="Simple Hero"
        subtitle="A hero section without any action buttons"
      />
    </Variant>

    <Variant title="Single Action">
      <RdHeroSection
        title="Hero with One Action"
        subtitle="A hero section with just one button"
        :actions="[
          {
            text: 'Get Started',
            href: '#start',
            variant: 'primary',
          },
        ]"
      />
    </Variant>
  </Story>
</template>
