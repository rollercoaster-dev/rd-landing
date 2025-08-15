<script setup lang="ts">
import RdCallToAction from "./index.vue";
import RdBaseActionCard from "../Base/ActionCard/index.vue";
</script>

<template>
  <Story title="Components/CallToAction" :layout="{ type: 'fullscreen' }">
    <Variant title="Default">
      <RdCallToAction
        title="Get Involved & Shape the Future"
        description="Join our community-driven project and help make a difference."
        subtitle="There are many ways to contribute and be part of our mission."
        footer-text="We're excited to build this together!"
      >
        <div class="grid md:grid-cols-3 gap-6">
          <RdBaseActionCard
            title="Contribute"
            icon="github"
            description="Check out our repositories and contribute code."
            :features="[]"
            link="https://github.com/example"
            link-text="View GitHub"
          />

          <RdBaseActionCard
            title="Community"
            icon="discord"
            description="Join discussions and connect with others."
            :features="[]"
            link="#"
            link-text="Join Discord"
          />

          <RdBaseActionCard
            title="Feedback"
            icon="feedback"
            description="Share your thoughts and ideas with us."
            :features="[]"
            link="mailto:feedback@example.com"
            link-text="Send Email"
          />
        </div>
      </RdCallToAction>
    </Variant>

    <Variant title="Simple Version">
      <RdCallToAction
        title="Simple Call to Action"
        description="A more minimal version without extra content."
      >
        <button class="bg-primary text-primary-foreground px-6 py-3 rounded-md">
          Get Started
        </button>
      </RdCallToAction>
    </Variant>
  </Story>
</template>
