<script setup lang="ts">
export type HeroAction = {
  text: string;
  href: string;
  variant?: "primary" | "secondary" | "text";
  icon?: "arrow-right" | "arrow-down" | "none";
  internal?: boolean;
};

export type HeroSectionProps = {
  title: string;
  subtitle: string;
  actions?: HeroAction[];
};

withDefaults(defineProps<HeroSectionProps>(), {
  actions: () => [],
});
</script>

<template>
  <section class="relative text-center space-y-8 py-8">
    <!-- Decorative background elements -->
    <div
      class="absolute inset-0 overflow-hidden pointer-events-none opacity-50"
    >
      <div
        class="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute -bottom-24 -right-24 w-64 h-64 bg-accent/5 rounded-full blur-3xl"
      ></div>
    </div>

    <h1
      class="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-3xl mx-auto"
    >
      <RdHeadlineGradient>{{ title }}</RdHeadlineGradient>
      <span
        class="mt-6 block text-2xl md:text-3xl font-medium text-foreground/90"
      >
        {{ subtitle }}
      </span>
    </h1>

    <!-- Quick action buttons -->
    <div v-if="actions.length > 0" class="flex flex-wrap justify-center gap-4">
      <RdBaseLink
        v-for="(action, index) in actions"
        :key="index"
        :href="action.href"
        :variant="action.variant || 'primary'"
        :icon="action.icon || 'arrow-right'"
        :internal="action.internal"
      >
        {{ action.text }}
      </RdBaseLink>
    </div>

    <slot></slot>
  </section>
</template>
