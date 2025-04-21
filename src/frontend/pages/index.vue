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
      <section class="relative text-center space-y-8 py-8">
        <!-- Decorative background elements -->
        <div
          class="absolute inset-0 overflow-hidden pointer-events-none opacity-50"
        >
          <div
            class="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          ></div>
          <div
            class="absolute -bottom-24 -right-24 w-64 h-64 bg-accent/5 rounded-full blur-3xl"
          ></div>
        </div>

        <h1
          class="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-3xl mx-auto"
        >
          <RdHeadlineGradient>Rollercoaster.dev</RdHeadlineGradient>
          <span
            class="mt-6 block text-2xl md:text-3xl font-medium text-foreground/90"
          >
            is a space where neurodivergent minds create and discover tools
            designed for the way we think.
          </span>
        </h1>

        <!-- Quick action buttons -->
        <div class="flex flex-wrap justify-center gap-4">
          <RdBaseLink href="#what-we-build" icon="arrow-down" internal>
            Learn More
          </RdBaseLink>
          <!-- Duplicate link removed -->
          <RdBaseLink
            href="https://github.com/rollercoaster-dev"
            variant="secondary"
          >
            View on GitHub
          </RdBaseLink>
        </div>
      </section>

      <UiSeparatorSeparator class="my-12" />

      <!-- 2. "What We're Building" Section -->
      <section id="what-we-build" class="space-y-8 scroll-mt-16">
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

        <div class="grid md:grid-cols-2 gap-6">
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
        </div>

        <p
          class="text-lg text-card-foreground/90 text-center max-w-3xl mx-auto italic"
        >
          We believe this system can empower neurodivergent individuals to
          navigate their goals, document their unique paths, and build
          confidence along the way.
        </p>
      </section>

      <UiSeparatorSeparator class="my-12" />

      <!-- 3. "Our Vision & Goals" Section -->
      <section class="space-y-8">
        <RdBaseSectionHeader
          title="Our Vision: Tools Built From Lived Experience"
          description="Standard productivity tools often fall short for neurodivergent individuals."
        />

        <!-- Vision Cards -->
        <div class="grid md:grid-cols-2 gap-6">
          <UiCardCard class="overflow-hidden">
            <UiCardCardHeader>
              <UiCardCardTitle class="text-xl font-medium text-primary"
                >The Challenge</UiCardCardTitle
              >
            </UiCardCardHeader>
            <UiCardCardContent class="space-y-4">
              <p class="text-card-foreground/90">
                Rigid schedules and linear lists don't always align with how our
                minds work best. We understand that neurodivergent strengths are
                different, and navigating goals requires tools that offer
                flexibility, clear steps, and genuine understanding – not just
                another calendar.
              </p>
            </UiCardCardContent>
          </UiCardCard>

          <UiCardCard
            class="overflow-hidden bg-gradient-to-br from-accent/10 to-transparent"
          >
            <UiCardCardHeader>
              <UiCardCardTitle class="text-xl font-medium text-primary"
                >Our Solution</UiCardCardTitle
              >
            </UiCardCardHeader>
            <UiCardCardContent class="space-y-4">
              <p class="text-card-foreground/90">
                At Rollercoaster.dev, our vision is simple:
                <strong class="block mt-2 text-xl text-accent"
                  >Create the tools we wish existed, built <em>by</em> and
                  <em>for</em> the neurodivergent community.</strong
                >
              </p>
            </UiCardCardContent>
          </UiCardCard>
        </div>

        <!-- Goals Section -->
        <div class="space-y-6">
          <h3 class="text-2xl font-semibold text-center text-primary/90">
            Our Guiding Principles
          </h3>
          <ul class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <li
              class="bg-card p-6 rounded-lg shadow-sm border border-border/50"
            >
              <h4 class="font-semibold text-lg mb-2">Flexibility First</h4>
              <p class="text-sm text-card-foreground/80">
                Adaptable to diverse thinking styles and changing needs.
              </p>
            </li>
            <li
              class="bg-card p-6 rounded-lg shadow-sm border border-border/50"
            >
              <h4 class="font-semibold text-lg mb-2">Community Driven</h4>
              <p class="text-sm text-card-foreground/80">
                Developed with continuous input from the neurodivergent
                community.
              </p>
            </li>
            <li
              class="bg-card p-6 rounded-lg shadow-sm border border-border/50"
            >
              <h4 class="font-semibold text-lg mb-2">Open & Transparent</h4>
              <p class="text-sm text-card-foreground/80">
                Built on open standards (like Open Badges) and open source.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <UiSeparatorSeparator class="my-12" />

      <!-- 4. Current State / Roadmap -->
      <section class="space-y-8">
        <RdBaseSectionHeader
          title="Where We Are & Where We're Going"
          description="Our journey is underway! Here's a glimpse of our progress and planned next steps:"
        />
        <!-- Status Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Item 1: Core Engine -->
          <UiCardCard
            class="group overflow-hidden hover:shadow-lg transition-all relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:to-transparent before:-z-10"
          >
            <UiCardCardHeader>
              <UiCardCardTitle class="flex items-center gap-2">
                <span class="text-2xl">⚙️</span>
                <span>Core Badge Engine</span>
              </UiCardCardTitle>
            </UiCardCardHeader>
            <UiCardCardContent class="space-y-2">
              <p class="text-sm text-card-foreground/90">
                The foundational system for creating, managing, and issuing Open
                Badges is operational.
              </p>
              <RdBaseFeatureItem
                icon="✅"
                text="Basic Badge creation and issuance"
              />
              <RdBaseFeatureItem
                icon="⏳"
                text="Integration with external identity providers"
              />
            </UiCardCardContent>
            <UiCardCardFooter>
              <UiBadgeBadge variant="secondary">In Progress</UiBadgeBadge>
            </UiCardCardFooter>
          </UiCardCard>

          <!-- Item 2: Frontend UI -->
          <UiCardCard
            class="group overflow-hidden hover:shadow-lg transition-all relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-accent/5 before:to-transparent before:-z-10"
          >
            <UiCardCardHeader>
              <UiCardCardTitle class="flex items-center gap-2">
                <span class="text-2xl">🖥️</span>
                <span>User Interface (Vue)</span>
              </UiCardCardTitle>
            </UiCardCardHeader>
            <UiCardCardContent class="space-y-2">
              <p class="text-sm text-card-foreground/90">
                Developing an intuitive and accessible frontend using Vue.js and
                modern UI components.
              </p>
              <RdBaseFeatureItem
                icon="✅"
                text="Initial component library setup"
              />
              <RdBaseFeatureItem
                icon="✅"
                text="Basic layout and navigation structures"
              />
              <RdBaseFeatureItem
                icon="⏳"
                text="Goal tracking interface design"
              />
            </UiCardCardContent>
            <UiCardCardFooter>
              <UiBadgeBadge variant="secondary">In Progress</UiBadgeBadge>
            </UiCardCardFooter>
          </UiCardCard>

          <!-- Item 3: Backend API -->
          <UiCardCard
            class="group overflow-hidden hover:shadow-lg transition-all relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-secondary/5 before:to-transparent before:-z-10"
          >
            <UiCardCardHeader>
              <UiCardCardTitle class="flex items-center gap-2">
                <span class="text-2xl">💾</span>
                <span>Backend API (Elysia)</span>
              </UiCardCardTitle>
            </UiCardCardHeader>
            <UiCardCardContent class="space-y-2">
              <p class="text-sm text-card-foreground/90">
                Building a robust and efficient backend API using ElysiaJS for
                fast performance.
              </p>
              <RdBaseFeatureItem
                icon="✅"
                text="Core authentication endpoints"
              />
              <RdBaseFeatureItem icon="✅" text="Badge data management APIs" />
              <RdBaseFeatureItem icon="⏳" text="Real-time progress updates" />
            </UiCardCardContent>
            <UiCardCardFooter>
              <UiBadgeBadge variant="secondary">In Progress</UiBadgeBadge>
            </UiCardCardFooter>
          </UiCardCard>

          <!-- Item 4: Community Features -->
          <UiCardCard
            class="group overflow-hidden hover:shadow-lg transition-all relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:to-transparent before:-z-10"
          >
            <UiCardCardHeader>
              <UiCardCardTitle class="flex items-center gap-2">
                <span class="text-2xl">💬</span>
                <span>Community & Collaboration</span>
              </UiCardCardTitle>
            </UiCardCardHeader>
            <UiCardCardContent class="space-y-2">
              <p class="text-sm text-card-foreground/90">
                Planning features to foster connection and shared learning
                within the platform.
              </p>
              <RdBaseFeatureItem
                icon="💡"
                text="Shared goal templates (Planned)"
              />
              <RdBaseFeatureItem
                icon="💡"
                text="Peer support forums (Planned)"
              />
              <RdBaseFeatureItem
                icon="💡"
                text="Collaborative projects (Planned)"
              />
            </UiCardCardContent>
            <UiCardCardFooter>
              <UiBadgeBadge variant="outline">Planned</UiBadgeBadge>
            </UiCardCardFooter>
          </UiCardCard>
        </div>

        <p
          class="text-lg text-card-foreground/90 text-center max-w-3xl mx-auto italic"
        >
          Our focus is on building a solid foundation first, then expanding
          features based on community feedback and needs.
        </p>
      </section>

      <UiSeparatorSeparator class="my-12" />

      <!-- 5. "Get Involved" Section -->
      <section class="text-center space-y-8">
        <RdBaseSectionHeader
          title="Get Involved & Shape the Future"
          description="Rollercoaster.dev is an open, community-driven project. Your voice matters!"
        />

        <p class="text-lg max-w-3xl mx-auto text-foreground/90">
          Whether you're neurodivergent, an ally, a developer, a designer, or
          just interested in what we're building, there are many ways to
          contribute:
        </p>

        <div class="grid md:grid-cols-3 gap-6">
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
        </div>

        <p class="text-base text-muted-foreground italic">
          We're excited to build this together!
        </p>
      </section>
    </main>
  </div>
</template>

<style scoped>
/* Scoped styles if needed */
</style>
