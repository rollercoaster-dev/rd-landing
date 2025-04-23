<script setup lang="ts">
import SectionHeader from "./SectionHeader.vue";
</script>

<template>
  <Story title="RD/Base/SectionHeader" group="rd">
    <Variant title="Default (Center Aligned)">
      <div class="p-4 max-w-3xl">
        <SectionHeader
          title="Section Title"
          description="This is a default section header with center alignment and a description."
          align="center"
        />
      </div>
    </Variant>

    <Variant title="Left Aligned">
      <div class="p-4 max-w-3xl">
        <SectionHeader
          title="Left Aligned Title"
          description="This section header is aligned to the left."
          align="left"
        />
      </div>
    </Variant>

    <Variant title="Right Aligned">
      <div class="p-4 max-w-3xl">
        <SectionHeader
          title="Right Aligned Title"
          description="This section header is aligned to the right."
          align="right"
        />
      </div>
    </Variant>

    <Variant title="Without Description">
      <div class="p-4 max-w-3xl">
        <SectionHeader title="Title Only" />
      </div>
    </Variant>

    <Variant title="With Long Description">
      <div class="p-4 max-w-3xl">
        <SectionHeader
          title="Long Description Example"
          description="This section header has a longer description to demonstrate how the component handles more text. The description should wrap properly and maintain readability while keeping the design consistent with the rest of the application."
        />
      </div>
    </Variant>

    <Variant title="With Custom Description Slot">
      <div class="p-4 max-w-3xl">
        <SectionHeader
          title="Custom Description Slot"
          description="This text will be replaced by the slot content."
        >
          <template #description>
            This is a <strong>custom description</strong> with
            <em>formatting</em> and a
            <a href="#" class="text-primary underline">link</a>.
          </template>
        </SectionHeader>
      </div>
    </Variant>

    <Variant title="With Additional Content">
      <div class="p-4 max-w-3xl">
        <SectionHeader
          title="Additional Content"
          description="This section header includes additional content in the default slot."
        >
          <div class="mt-4 p-4 border rounded-md bg-card">
            <p>This is additional content placed in the default slot.</p>
          </div>
        </SectionHeader>
      </div>
    </Variant>

    <Variant title="Dark Mode" dark>
      <div class="p-4 max-w-3xl bg-background">
        <SectionHeader
          title="Dark Mode Section Header"
          description="This section header is displayed in dark mode to show how it adapts to different color schemes."
        />
      </div>
    </Variant>
  </Story>
</template>
