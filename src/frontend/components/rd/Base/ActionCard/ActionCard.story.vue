<script setup lang="ts">
import ActionCard from "./index.vue";
</script>

<template>
  <Story title="RD/Base/ActionCard" group="rd">
    <Variant title="Basic">
      <div class="p-4 max-w-md">
        <ActionCard
          title="Basic Action Card"
          description="This is a simple action card with a description."
          :features="['Feature 1', 'Feature 2', 'Feature 3']"
          :actions="[{ text: 'Primary Action', href: '#' }]"
        />
      </div>
    </Variant>

    <Variant title="With Icon">
      <div class="p-4 max-w-md">
        <ActionCard
          title="Card with Icon"
          icon="🚀"
          description="This card includes an icon next to the title."
          :features="['Feature 1', 'Feature 2', 'Feature 3']"
          :actions="[{ text: 'Primary Action', href: '#' }]"
        />
      </div>
    </Variant>

    <Variant title="Multiple Actions">
      <div class="p-4 max-w-md">
        <ActionCard
          title="Multiple Actions"
          icon="💡"
          description="This card has multiple action buttons."
          :features="['Feature 1', 'Feature 2', 'Feature 3']"
          :actions="[
            { text: 'Primary Action', href: '#', variant: 'primary' },
            { text: 'Secondary Action', href: '#', variant: 'secondary' },
          ]"
        />
      </div>
    </Variant>

    <Variant title="Different Action Variants">
      <div class="p-4 max-w-md">
        <ActionCard
          title="Action Variants"
          icon="🔍"
          description="This card demonstrates different action button variants."
          :features="['Feature 1', 'Feature 2']"
          :actions="[
            { text: 'Primary', href: '#', variant: 'primary' },
            { text: 'Secondary', href: '#', variant: 'secondary' },
            { text: 'Text Link', href: '#', variant: 'text' },
          ]"
        />
      </div>
    </Variant>

    <Variant title="External Links">
      <div class="p-4 max-w-md">
        <ActionCard
          title="External Links"
          icon="🌐"
          description="This card has links to external resources."
          :features="['Opens in new tab', 'Has proper rel attributes']"
          :actions="[
            { text: 'GitHub', href: 'https://github.com', internal: false },
            {
              text: 'Documentation',
              href: 'https://docs.example.com',
              internal: false,
            },
          ]"
        />
      </div>
    </Variant>

    <Variant title="No Features">
      <div class="p-4 max-w-md">
        <ActionCard
          title="No Features List"
          icon="📋"
          description="This card doesn't have a features list."
          :features="[]"
          :actions="[{ text: 'Learn More', href: '#' }]"
        />
      </div>
    </Variant>

    <Variant title="Dark Mode" dark>
      <div class="p-4 max-w-md bg-background">
        <ActionCard
          title="Dark Mode Card"
          icon="🌙"
          description="This card is displayed in dark mode."
          :features="['Feature 1', 'Feature 2', 'Feature 3']"
          :actions="[
            { text: 'Primary Action', href: '#', variant: 'primary' },
            { text: 'Secondary Action', href: '#', variant: 'secondary' },
          ]"
        />
      </div>
    </Variant>
  </Story>
</template>
