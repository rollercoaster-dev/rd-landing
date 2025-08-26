<script setup lang="ts">
import { RouterLink } from "vue-router";
import type { NavItem } from "@/frontend/composables/useNavigation";

const props = defineProps<{
  items: NavItem[];
  ctas: NavItem[];
  labelledbyId?: string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();
</script>

<template>
  <nav
    class="flex-1 overflow-auto p-2 space-y-1"
    :aria-labelledby="props.labelledbyId"
  >
    <RouterLink
      v-for="item in items"
      :key="'m-' + item.id"
      :to="item.to as any"
      class="block rounded px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset"
      @click="emit('close')"
    >
      {{ item.label }}
    </RouterLink>

    <div class="border-t my-2" />

    <template v-for="cta in ctas" :key="'m-cta-' + cta.id">
      <RouterLink
        v-if="cta.to"
        :to="cta.to as any"
        class="block rounded px-3 py-2 text-sm bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset"
        @click="emit('close')"
      >
        {{ cta.label }}
      </RouterLink>
      <a
        v-else-if="cta.href"
        :href="cta.href"
        target="_blank"
        rel="noopener noreferrer"
        class="block rounded px-3 py-2 text-sm border border-primary text-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset"
        @click="emit('close')"
      >
        {{ cta.label }}
      </a>

      <div class="border-t my-3" />

      <section aria-labelledby="mobile-settings-heading" class="pt-1 pb-3">
        <h3
          id="mobile-settings-heading"
          class="px-3 text-xs font-medium text-muted-foreground tracking-wide uppercase"
        >
          {{ $t("header.settings.title") }}
        </h3>
        <div class="pt-2 flex justify-center">
          <RdLayoutHeaderControls class="gap-1" />
        </div>
      </section>
    </template>
  </nav>
</template>
