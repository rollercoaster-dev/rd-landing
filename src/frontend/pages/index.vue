<script setup lang="ts">
import { onMounted } from "vue";
import { useGitHubProjects } from "../composables/useGitHubProjects";

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

const { projectData, isLoading, error, fetchStatusCards } = useGitHubProjects();

onMounted(async () => {
  // Fetch GitHub data on page load
  await fetchStatusCards();
});
</script>

<template>
  <div class="min-h-screen bg-background text-foreground font-sans">
    <main class="container mx-auto max-w-4xl px-4 py-12 space-y-12">
      <!-- 1. Headline / Hero Section -->
      <RdHeroSection
        :title="$t('home.hero.title')"
        :subtitle="$t('home.hero.subtitle')"
        :actions="[
          {
            text: $t('common.buttons.learnMore'),
            href: '#what-we-build',
            icon: 'arrow-down',
            internal: true,
          },
          {
            text: $t('common.buttons.viewOnGitHub'),
            href: 'https://github.com/rollercoaster-dev',
            variant: 'secondary',
          },
        ]"
      />

      <!-- 2. "What We're Building" Section -->
      <RdSection id="what-we-build" with-separator>
        <RdBaseSectionHeader
          :title="$t('home.whatWeBuild.title')"
          :subtitle="$t('home.whatWeBuild.subtitle')"
        >
          <template #description>
            {{ $t("home.whatWeBuild.description") }}
          </template>
        </RdBaseSectionHeader>

        <RdGrid :cols="2">
          <!-- Feature 1: Track Progress -->
          <RdBaseFeatureCard
            :title="$t('home.features.trackProgress.title')"
            icon="📊"
            :description="$t('home.features.trackProgress.description')"
            :features="$t('home.features.trackProgress.items')"
          />

          <!-- Feature 2: Visualize Journey -->
          <RdBaseFeatureCard
            :title="$t('home.features.visualizeJourney.title')"
            icon="🎨"
            :description="$t('home.features.visualizeJourney.description')"
            :features="$t('home.features.visualizeJourney.items')"
          />

          <!-- Feature 3: Flexibility -->
          <RdBaseFeatureCard
            :title="$t('home.features.pauseRestart.title')"
            icon="🌱"
            :description="$t('home.features.pauseRestart.description')"
            :features="$t('home.features.pauseRestart.items')"
          />

          <!-- Feature 4: Community -->
          <RdBaseFeatureCard
            :title="$t('home.features.connectCommunity.title')"
            icon="🤝"
            :description="$t('home.features.connectCommunity.description')"
            :features="$t('home.features.connectCommunity.items')"
          />
        </RdGrid>

        <p
          class="text-lg text-card-foreground/90 text-center max-w-3xl mx-auto italic"
        >
          {{ $t("home.empowerment.description") }}
        </p>
      </RdSection>

      <!-- 3. "Our Vision & Goals" Section -->
      <RdSection with-separator>
        <RdBaseSectionHeader
          :title="$t('home.vision.title')"
          :description="$t('home.vision.description')"
        />

        <!-- Vision Cards -->
        <RdGrid :cols="2">
          <RdContentBlock
            :title="$t('home.vision.challenge.title')"
            :content="$t('home.vision.challenge.content')"
          />

          <RdContentBlock
            :title="$t('home.vision.solution.title')"
            variant="accent"
            :content="$t('home.vision.solution.content')"
          />
        </RdGrid>

        <!-- Goals Section -->
        <div class="space-y-8">
          <h3 class="text-2xl font-bold text-center">{{ $t("home.vision.goals.title") }}</h3>
          <RdGrid :cols="3">
            <RdBaseGoalCard
              :title="$t('home.vision.goals.empower.title')"
              :description="$t('home.vision.goals.empower.description')"
            />
            <RdBaseGoalCard
              :title="$t('home.vision.goals.flexibility.title')"
              :description="$t('home.vision.goals.flexibility.description')"
            />
            <RdBaseGoalCard
              :title="$t('home.vision.goals.community.title')"
              :description="$t('home.vision.goals.community.description')"
            />
          </RdGrid>
        </div>

        <p
          class="text-lg text-card-foreground/90 text-center max-w-3xl mx-auto italic"
        >
          {{ $t("home.vision.closing") }}
        </p>
      </RdSection>

      <!-- 4. Current State / Roadmap -->
      <RdSection with-separator>
        <RdBaseSectionHeader
          :title="$t('home.currentWork.title')"
          :description="$t('home.currentWork.description')"
        />
        <!-- Live Status Cards -->
        <div v-if="isLoading" class="text-center py-8">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"
          ></div>
          <p class="mt-2 text-muted-foreground">{{ $t("home.currentWork.loading") }}</p>
        </div>

        <div v-else-if="error" class="text-center py-8 text-red-500">
          <p>{{ $t("home.currentWork.error") }} {{ error }}</p>
          <button
            class="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
            @click="fetchStatusCards()"
          >
            {{ $t("home.currentWork.retry") }}
          </button>
        </div>

        <RdGrid v-else :cols="3">
          <!-- Core Badge Engine (openbadges-modular-server) -->
          <RdStatusCard v-bind="projectData.coreEngine" />

          <!-- User Interface (openbadges-ui) -->
          <RdStatusCard v-bind="projectData.userInterface" />

          <!-- Open Badges System - The complete platform (openbadges-system) -->
          <RdStatusCard v-bind="projectData.communityFeatures" />
        </RdGrid>

        <p
          class="text-lg text-card-foreground/90 text-center max-w-3xl mx-auto italic"
        >
          {{ $t("home.currentWork.focusNote") }}
        </p>
      </RdSection>

      <!-- 5. "Join Our Journey" Section -->
      <RdSection with-separator>
        <RdBaseSectionHeader
          :title="$t('home.getInvolved.title')"
          :description="$t('home.getInvolved.description')"
        />

        <RdGrid :cols="2">
          <!-- Interested in Using the Tools -->
          <UiCardCard class="border border-border flex flex-col h-full">
            <UiCardCardHeader>
              <UiCardCardTitle class="text-xl font-semibold">{{
                $t("home.getInvolved.users.title")
              }}</UiCardCardTitle>
            </UiCardCardHeader>
            <UiCardCardContent class="space-y-4 flex-1 flex flex-col">
              <div class="space-y-4 flex-1">
                <p>
                  {{ $t("home.getInvolved.users.description") }}
                </p>
                <RdBaseFeatureList
                  :features="$t('home.getInvolved.users.features')"
                />
              </div>
              <RdBaseLink
                href="https://github.com/rollercoaster-dev"
                variant="primary"
                icon="arrow-up-right"
                class="bg-cyan-500 hover:bg-cyan-600 text-white mt-auto w-fit"
              >
                {{ $t("home.getInvolved.users.action") }}
              </RdBaseLink>
            </UiCardCardContent>
          </UiCardCard>

          <!-- Interested in Contributing -->
          <UiCardCard class="border border-border flex flex-col h-full">
            <UiCardCardHeader>
              <UiCardCardTitle class="text-xl font-semibold">{{
                $t("home.getInvolved.contributors.title")
              }}</UiCardCardTitle>
            </UiCardCardHeader>
            <UiCardCardContent class="space-y-4 flex-1 flex flex-col">
              <div class="space-y-4 flex-1">
                <p>
                  {{ $t("home.getInvolved.contributors.description") }}
                </p>
                <RdBaseFeatureList
                  :features="$t('home.getInvolved.contributors.features')"
                />
              </div>
              <div class="flex gap-3 flex-wrap mt-auto">
                <RdBaseLink
                  href="https://github.com/rollercoaster-dev"
                  variant="primary"
                  icon="arrow-up-right"
                  class="bg-pink-500 hover:bg-pink-600 text-white w-fit"
                >
                  {{ $t("home.getInvolved.contributors.actions.explore") }}
                </RdBaseLink>
                <RdBaseLink
                  href="mailto:dev@rollercoaster.dev"
                  variant="secondary"
                  icon="arrow-up-right"
                  class="w-fit"
                >
                  {{ $t("home.getInvolved.contributors.actions.email") }}
                </RdBaseLink>
              </div>
            </UiCardCardContent>
          </UiCardCard>
        </RdGrid>
      </RdSection>
    </main>
  </div>
</template>

<style scoped>
/* Scoped styles if needed */
</style>
