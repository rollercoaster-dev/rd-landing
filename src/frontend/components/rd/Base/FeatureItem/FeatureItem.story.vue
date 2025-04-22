<script setup lang="ts">
import FeatureItem from "./index.vue";
</script>

<template>
  <Story title="RD/Base/FeatureItem" group="rd">
    <Variant title="Default">
      <div class="p-4">
        <ul class="space-y-2">
          <FeatureItem text="Default feature item with checkmark" />
        </ul>
      </div>
    </Variant>

    <Variant title="Custom Icon">
      <div class="p-4">
        <ul class="space-y-2">
          <FeatureItem text="Feature with star icon" icon="★" />
          <FeatureItem text="Feature with arrow icon" icon="→" />
          <FeatureItem text="Feature with bullet icon" icon="•" />
        </ul>
      </div>
    </Variant>

    <Variant title="Custom Icon Colors">
      <div class="p-4">
        <ul class="space-y-2">
          <FeatureItem
            text="Primary color icon"
            icon="✓"
            icon-color="text-primary"
          />
          <FeatureItem
            text="Secondary color icon"
            icon="✓"
            icon-color="text-secondary"
          />
          <FeatureItem
            text="Destructive color icon"
            icon="✓"
            icon-color="text-destructive"
          />
          <FeatureItem
            text="Muted color icon"
            icon="✓"
            icon-color="text-muted-foreground"
          />
        </ul>
      </div>
    </Variant>

    <Variant title="In List Context">
      <div class="p-4">
        <div class="p-4 border rounded-md">
          <h3 class="text-lg font-medium mb-2">Feature List</h3>
          <ul class="space-y-2">
            <FeatureItem text="First feature in a list" />
            <FeatureItem text="Second feature in a list" />
            <FeatureItem text="Third feature in a list" />
          </ul>
        </div>
      </div>
    </Variant>

    <Variant title="Different Icons for Status">
      <div class="p-4">
        <ul class="space-y-2">
          <FeatureItem text="Completed feature" icon="✅" />
          <FeatureItem text="In progress feature" icon="⏳" />
          <FeatureItem text="Planned feature" icon="📅" />
          <FeatureItem
            text="Unavailable feature"
            icon="❌"
            icon-color="text-destructive"
          />
        </ul>
      </div>
    </Variant>

    <Variant title="Dark Mode" dark>
      <div class="p-4 bg-background">
        <ul class="space-y-2">
          <FeatureItem text="Default feature in dark mode" />
          <FeatureItem text="Custom icon in dark mode" icon="★" />
          <FeatureItem
            text="Custom color in dark mode"
            icon="✓"
            icon-color="text-primary"
          />
        </ul>
      </div>
    </Variant>
  </Story>
</template>
