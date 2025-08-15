<script setup lang="ts">
import RdStatusCard from "./index.vue";
</script>

<template>
  <Story title="Components/StatusCard" :layout="{ type: 'grid', width: '50%' }">
    <Variant title="In Progress">
      <RdStatusCard
        title="Core Badge Engine"
        icon="⚙️"
        description="The foundational system for creating, managing, and issuing Open Badges is operational."
        :features="[
          { icon: '✅', text: 'Basic Badge creation and issuance' },
          { icon: '⏳', text: 'Integration with external identity providers' },
        ]"
        status="in-progress"
        gradient-from="primary"
      />
    </Variant>

    <Variant title="Planned">
      <RdStatusCard
        title="Community Features"
        icon="💬"
        description="Planning features to foster connection and shared learning within the platform."
        :features="[
          { icon: '💡', text: 'Shared goal templates (Planned)' },
          { icon: '💡', text: 'Peer support forums (Planned)' },
        ]"
        status="planned"
        gradient-from="accent"
      />
    </Variant>

    <Variant title="Completed">
      <RdStatusCard
        title="Authentication System"
        icon="🔐"
        description="User authentication and security features are fully implemented."
        :features="[
          { icon: '✅', text: 'OAuth integration' },
          { icon: '✅', text: 'WebAuthn support' },
          { icon: '✅', text: 'Session management' },
        ]"
        status="completed"
        gradient-from="secondary"
      />
    </Variant>
  </Story>
</template>
