<script setup lang="ts">
import { logEvent } from "histoire/client";
</script>

<template>
  <Story title="Base/InvolvementCard" :layout="{ type: 'grid', width: '100%' }">
    <Variant title="Using the Tools">
      <RdBaseInvolvementCard
        title="👋 Interested in Using the Tools?"
        description="Want to know when the platform launches or major updates are released?"
        :features="[
          'Get early access to features',
          'Stay updated on development',
          'Provide valuable feedback',
        ]"
        :actions="[
          {
            text: 'Follow Progress on GitHub',
            href: 'https://github.com/rollercoaster-dev',
          },
        ]"
      />
    </Variant>

    <Variant title="Contributing">
      <RdBaseInvolvementCard
        title="🚀 Interested in Contributing?"
        description="We're seeking passionate neurodivergent creators (designers, frontend, backend, full-stack). Explore our work or get in touch!"
        :features="[
          'Shape the platform\'s future',
          'Work with like-minded creators',
          'Build tools that matter',
        ]"
        :actions="[
          {
            text: 'Explore on GitHub',
            href: 'https://github.com/rollercoaster-dev',
          },
          {
            text: 'Email Us',
            href: 'mailto:dev@rollercoaster.dev',
          },
        ]"
      />
    </Variant>
  </Story>
</template>
