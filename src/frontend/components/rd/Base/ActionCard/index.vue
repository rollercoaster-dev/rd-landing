<script setup lang="ts">
export type ActionCardProps = {
  title: string;
  icon?: string;
  description: string;
  features: string[];
  actions?: {
    text: string;
    href: string;
    variant?: "primary" | "secondary" | "text";
    internal?: boolean;
  }[];
};

withDefaults(defineProps<ActionCardProps>(), {
  icon: "",
  actions: () => [],
});
</script>

<template>
  <UiCardCard class="grid grid-rows-[auto_1fr_auto]">
    <UiCardCardHeader>
      <UiCardCardTitle class="text-xl flex items-center gap-2">
        <span v-if="icon" class="text-2xl text-accent">{{ icon }}</span>
        {{ title }}
      </UiCardCardTitle>
    </UiCardCardHeader>
    <UiCardCardContent>
      <p class="text-muted-foreground">
        {{ description }}
      </p>
      <ul class="mt-4 space-y-2">
        <RdBaseFeatureItem
          v-for="(feature, index) in features"
          :key="index"
          :text="feature"
        />
      </ul>
      <slot name="content"></slot>
    </UiCardCardContent>
    <UiCardCardFooter>
      <slot name="footer">
        <div
          :class="{
            'w-full': actions.length > 0,
            'grid grid-cols-2 gap-4': actions.length > 1,
            'flex justify-center': actions.length === 1,
          }"
        >
          <template v-for="(action, _index) in actions" :key="_index">
            <RdBaseLink
              :href="action.href"
              :variant="action.variant || 'primary'"
              :internal="action.internal"
              class="justify-center focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
              :class="{ 'w-full': actions.length === 1 }"
            >
              {{ action.text }}
            </RdBaseLink>
          </template>
        </div>
      </slot>
    </UiCardCardFooter>
  </UiCardCard>
</template>
