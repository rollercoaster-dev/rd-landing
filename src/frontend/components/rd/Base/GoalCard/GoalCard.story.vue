<script setup lang="ts">
import { logEvent } from "histoire/client";
</script>

<template>
  <Story title="Base/GoalCard" :layout="{ type: 'grid', width: '33%' }">
    <Variant title="Empower Users">
      <RdBaseGoalCard
        title="🎯 To Empower Users"
        description="Breaking down overwhelming goals into manageable, actionable steps that make sense for you."
      />
    </Variant>

    <Variant title="Offer Flexibility">
      <RdBaseGoalCard
        title="🌊 To Offer Flexibility"
        description="Adapting to your fluctuating energy and focus, free from rigid timelines and expectations."
      />
    </Variant>

    <Variant title="Foster Community">
      <RdBaseGoalCard
        title="🤝 To Foster Community"
        description="Building connections through shared understanding and mutual support, because we truly 'get it'."
      />
    </Variant>
  </Story>
</template>
