<script setup lang="ts">
// TODO: find replacement for seo meta
// const config = useRuntimeConfig();
// const siteName = config.public.siteName as string;

// useSeoMeta({
//   title: 'Rollercoaster.dev: Tools for Neurodivergent Minds',
//   description:
//     'Building flexible tools with Open Badges, designed by and for the neurodivergent community to navigate goals and showcase progress.',
//   ogTitle: 'Rollercoaster.dev: Tools for Neurodivergent Minds',
//   ogDescription:
//     'Building flexible tools with Open Badges for the neurodivergent community.',
//   ogSiteName: siteName,
//   twitterCard: 'summary_large_image',
// });
</script>

<template>
  <div class="min-h-screen bg-background text-foreground font-sans">
    <main class="container mx-auto max-w-4xl px-4 py-12 space-y-12">
      <!-- 1. Headline / Hero Section -->
      <RdHeroSection
        title="Rollercoaster.dev"
        subtitle="is a space where neurodivergent minds create and discover tools designed for the way we think."
        :actions="[
          {
            text: 'Learn More',
            href: '#what-we-build',
            icon: 'arrow-down',
            internal: true,
          },
          {
            text: 'View on GitHub',
            href: 'https://github.com/rollercoaster-dev',
            variant: 'secondary',
          },
        ]"
      />

      <!-- 2. "What We're Building" Section -->
      <RdSection id="what-we-build" with-separator>
        <RdBaseSectionHeader
          title="What We're Building"
          description="At Rollercoaster.dev, we're crafting a unique platform centered around"
        >
          <template #description>
            At Rollercoaster.dev, we're crafting a unique platform centered
            around
            <RdBaseLink
              href="https://openbadges.org"
              variant="text"
              icon="arrow-right"
              class="text-accent font-semibold"
            >
              Open Badges
            </RdBaseLink>
            , designed specifically for the neurodivergent experience.
          </template>
        </RdBaseSectionHeader>

        <RdGrid :cols="2">
          <!-- Feature 1: Track Progress -->
          <RdBaseFeatureCard
            title="Track and Showcase Progress"
            icon="📊"
            description="Track progress on any goal that matters to you – learning, work, hobbies, community action, personal growth, and more. Our flexible system adapts to your unique journey, letting you document and celebrate achievements in a way that makes sense for you."
            :features="[
              'Flexible goal tracking',
              'Custom achievement paths',
              'Progress visualization',
            ]"
          />

          <!-- Feature 2: Visualize Journey -->
          <RdBaseFeatureCard
            title="Visualize Your Journey"
            icon="🎨"
            description="See your progress and achievements in meaningful, visual ways. Our platform offers different views and representations of your journey, helping you recognize patterns, celebrate milestones, and stay motivated through visual feedback."
            :features="[
              'Multiple view options',
              'Pattern recognition',
              'Visual milestone tracking',
            ]"
          />

          <!-- Feature 3: Flexibility -->
          <RdBaseFeatureCard
            title="Pause and Restart with Ease"
            icon="🌱"
            description="Life isn't linear, and neither is progress. Our system supports natural ebbs and flows, letting you pause during challenging times like burnout or low motivation. When you're ready to return, you'll find your progress preserved and tools to help you pick up where you left off."
            :features="[
              'Flexible pausing',
              'Progress preservation',
              'Easy resumption',
            ]"
          />

          <!-- Feature 4: Community -->
          <RdBaseFeatureCard
            title="Connect with Community"
            icon="🤝"
            description="Join a community that understands. Share experiences, learn from others' journeys, and find mutual support. Our platform facilitates meaningful connections through shared achievements and collaborative learning paths."
            :features="[
              'Shared achievements',
              'Learning communities',
              'Mutual support',
            ]"
          />
        </RdGrid>

        <p
          class="text-lg text-card-foreground/90 text-center max-w-3xl mx-auto italic"
        >
          We believe this system can empower neurodivergent individuals to
          navigate their goals, document their unique paths, and build
          confidence along the way.
        </p>
      </RdSection>

      <!-- 3. "Our Vision & Goals" Section -->
      <RdSection with-separator>
        <RdBaseSectionHeader
          title="Our Vision: Tools Built From Lived Experience"
          description="Standard productivity tools often fall short for neurodivergent individuals."
        />

        <!-- Vision Cards -->
        <RdGrid :cols="2">
          <RdContentBlock
            title="The Challenge"
            content="Rigid schedules and linear lists don't always align with how our minds work best. We understand that neurodivergent strengths are different, and navigating goals requires tools that offer flexibility, clear steps, and genuine understanding – not just another calendar."
          />

          <RdContentBlock
            title="Our Solution"
            variant="accent"
            content="At Rollercoaster.dev, our vision is simple: <strong class='block mt-2 text-xl text-accent'>Create the tools we wish existed, built <em>by</em> and <em>for</em> the neurodivergent community.</strong>"
          />
        </RdGrid>

        <!-- Goals Section -->
        <RdPrincipleGrid
          :principles="[
            {
              title: 'Flexibility First',
              description:
                'Adaptable to diverse thinking styles and changing needs.',
            },
            {
              title: 'Community Driven',
              description:
                'Developed with continuous input from the neurodivergent community.',
            },
            {
              title: 'Open & Transparent',
              description:
                'Built on open standards (like Open Badges) and open source.',
            },
          ]"
        />
      </RdSection>

      <!-- 4. Current State / Roadmap -->
      <RdSection with-separator>
        <RdBaseSectionHeader
          title="Where We Are & Where We're Going"
          description="Our journey is underway! Here's a glimpse of our progress and planned next steps:"
        />
        <!-- Status Cards -->
        <RdGrid :cols="2">
          <!-- Item 1: Core Engine -->
          <RdStatusCard
            title="Core Badge Engine"
            icon="⚙️"
            description="The foundational system for creating, managing, and issuing Open Badges is operational."
            :features="[
              { icon: '✅', text: 'Basic Badge creation and issuance' },
              {
                icon: '⏳',
                text: 'Integration with external identity providers',
              },
            ]"
            status="in-progress"
            gradient-from="primary"
          />

          <!-- Item 2: Frontend UI -->
          <RdStatusCard
            title="User Interface (Vue)"
            icon="🖥️"
            description="Developing an intuitive and accessible frontend using Vue.js and modern UI components."
            :features="[
              { icon: '✅', text: 'Initial component library setup' },
              { icon: '✅', text: 'Basic layout and navigation structures' },
              { icon: '⏳', text: 'Goal tracking interface design' },
            ]"
            status="in-progress"
            gradient-from="accent"
          />

          <!-- Item 3: Backend API -->
          <RdStatusCard
            title="Backend API (Elysia)"
            icon="💾"
            description="Building a robust and efficient backend API using ElysiaJS for fast performance."
            :features="[
              { icon: '✅', text: 'Core authentication endpoints' },
              { icon: '✅', text: 'Badge data management APIs' },
              { icon: '⏳', text: 'Real-time progress updates' },
            ]"
            status="in-progress"
            gradient-from="secondary"
          />

          <!-- Item 4: Community Features -->
          <RdStatusCard
            title="Community & Collaboration"
            icon="💬"
            description="Planning features to foster connection and shared learning within the platform."
            :features="[
              { icon: '💡', text: 'Shared goal templates (Planned)' },
              { icon: '💡', text: 'Peer support forums (Planned)' },
              { icon: '💡', text: 'Collaborative projects (Planned)' },
            ]"
            status="planned"
            gradient-from="primary"
          />
        </RdGrid>

        <p
          class="text-lg text-card-foreground/90 text-center max-w-3xl mx-auto italic"
        >
          Our focus is on building a solid foundation first, then expanding
          features based on community feedback and needs.
        </p>
      </RdSection>

      <!-- 5. "Get Involved" Section -->
      <RdCallToAction
        title="Get Involved & Shape the Future"
        description="Rollercoaster.dev is an open, community-driven project. Your voice matters!"
        subtitle="Whether you're neurodivergent, an ally, a developer, a designer, or just interested in what we're building, there are many ways to contribute:"
        footer-text="We're excited to build this together!"
        with-separator
      >
        <RdGrid :cols="3">
          <!-- GitHub Card -->
          <RdBaseActionCard
            title="Contribute on GitHub"
            icon="github"
            description="Check out our repositories, report issues, suggest features, or contribute code."
            :features="[]"
            link="https://github.com/rollercoaster-dev"
            link-text="View Repositories"
          />

          <!-- Discord Card (Example) -->
          <RdBaseActionCard
            title="Join the Conversation"
            icon="discord"
            description="Connect with the community, share feedback, and participate in discussions on Discord."
            :features="[]"
            link="#"
            link-text="Join Discord (Coming Soon)"
            :disabled="true"
          />

          <!-- Feedback Card (Example) -->
          <RdBaseActionCard
            title="Provide Feedback"
            icon="feedback"
            description="Share your thoughts, experiences, and ideas on how we can make these tools better."
            :features="[]"
            link="mailto:feedback@rollercoaster.dev"
            link-text="Send Email"
          />
        </RdGrid>
      </RdCallToAction>
    </main>
  </div>
</template>

<style scoped>
/* Scoped styles if needed */
</style>
