<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useSEO } from "../../composables/useSEO";

const { t } = useI18n();

useSEO({
  title: t("privacy.title"),
  description: t("privacy.meta.description"),
  og: {
    template: "page",
  },
});
</script>

<template>
  <RdLayoutBaseLayout
    :title="$t('privacy.heading')"
    :subtitle="$t('privacy.subtitle')"
  >
    <div class="prose max-w-none space-y-8">
      <!-- Introduction -->
      <section>
        <p class="text-lg text-muted-foreground">
          {{ $t("privacy.intro.text") }}
        </p>
        <p class="text-sm font-medium text-primary mt-3">
          {{ $t("privacy.intro.commitment") }}
        </p>
      </section>

      <!-- Data Controller -->
      <section>
        <h2 class="text-xl font-semibold mb-4">
          {{ $t("privacy.controller.title") }}
        </h2>
        <div class="space-y-2 text-muted-foreground">
          <p>{{ $t("privacy.controller.text") }}</p>
          <div class="ml-4 space-y-1">
            <p class="font-medium text-foreground">
              {{ $t("privacy.controller.name") }}
            </p>
            <p>{{ $t("privacy.controller.address") }}</p>
            <p>
              <a
                href="mailto:dev@rollercoaster.dev"
                class="text-primary hover:underline"
              >
                {{ $t("privacy.controller.email") }}
              </a>
            </p>
          </div>
        </div>
      </section>

      <!-- Data Collection -->
      <section>
        <h2 class="text-xl font-semibold mb-4">
          {{ $t("privacy.dataCollection.title") }}
        </h2>
        <p class="text-muted-foreground mb-6">
          {{ $t("privacy.dataCollection.intro") }}
        </p>

        <!-- Website Usage Data -->
        <div class="mb-6">
          <h3 class="text-lg font-medium mb-3">
            {{ $t("privacy.dataCollection.categories.websiteUsage.title") }}
          </h3>
          <ul
            class="list-disc list-inside space-y-1 text-muted-foreground ml-4"
          >
            <li>
              {{ $t("privacy.dataCollection.categories.websiteUsage.items.0") }}
            </li>
            <li>
              {{ $t("privacy.dataCollection.categories.websiteUsage.items.1") }}
            </li>
          </ul>
          <p class="text-sm text-muted-foreground mt-2 italic">
            {{ $t("privacy.dataCollection.categories.websiteUsage.purpose") }}
          </p>
        </div>

        <!-- Communication Data -->
        <div class="mb-6">
          <h3 class="text-lg font-medium mb-3">
            {{ $t("privacy.dataCollection.categories.communication.title") }}
          </h3>
          <ul
            class="list-disc list-inside space-y-1 text-muted-foreground ml-4"
          >
            <li>
              {{
                $t("privacy.dataCollection.categories.communication.items.0")
              }}
            </li>
            <li>
              {{
                $t("privacy.dataCollection.categories.communication.items.1")
              }}
            </li>
            <li>
              {{
                $t("privacy.dataCollection.categories.communication.items.2")
              }}
            </li>
          </ul>
          <p class="text-sm text-muted-foreground mt-2 italic">
            {{ $t("privacy.dataCollection.categories.communication.purpose") }}
          </p>
        </div>
      </section>

      <!-- Legal Basis -->
      <section>
        <h2 class="text-xl font-semibold mb-4">
          {{ $t("privacy.legalBasis.title") }}
        </h2>
        <p class="text-muted-foreground mb-4">
          {{ $t("privacy.legalBasis.intro") }}
        </p>
        <div class="space-y-4">
          <div class="border-l-4 border-primary pl-4">
            <h4 class="font-medium text-foreground">
              {{ $t("privacy.legalBasis.grounds.0.basis") }}
            </h4>
            <p class="text-sm text-muted-foreground">
              {{ $t("privacy.legalBasis.grounds.0.description") }}
            </p>
          </div>
          <div class="border-l-4 border-primary pl-4">
            <h4 class="font-medium text-foreground">
              {{ $t("privacy.legalBasis.grounds.1.basis") }}
            </h4>
            <p class="text-sm text-muted-foreground">
              {{ $t("privacy.legalBasis.grounds.1.description") }}
            </p>
          </div>
          <div class="border-l-4 border-primary pl-4">
            <h4 class="font-medium text-foreground">
              {{ $t("privacy.legalBasis.grounds.2.basis") }}
            </h4>
            <p class="text-sm text-muted-foreground">
              {{ $t("privacy.legalBasis.grounds.2.description") }}
            </p>
          </div>
        </div>
      </section>

      <!-- Data Use -->
      <section>
        <h2 class="text-xl font-semibold mb-4">
          {{ $t("privacy.dataUse.title") }}
        </h2>
        <p class="text-muted-foreground mb-4">
          {{ $t("privacy.dataUse.intro") }}
        </p>
        <ul
          class="list-disc list-inside space-y-1 text-muted-foreground ml-4 mb-4"
        >
          <li>{{ $t("privacy.dataUse.purposes.0") }}</li>
          <li>{{ $t("privacy.dataUse.purposes.1") }}</li>
          <li>{{ $t("privacy.dataUse.purposes.2") }}</li>
          <li>{{ $t("privacy.dataUse.purposes.3") }}</li>
          <li>{{ $t("privacy.dataUse.purposes.4") }}</li>
        </ul>
        <p class="text-sm font-medium text-primary">
          {{ $t("privacy.dataUse.noSelling") }}
        </p>
      </section>

      <!-- Third-Party Services -->
      <section>
        <h2 class="text-xl font-semibold mb-4">
          {{ $t("privacy.thirdParty.title") }}
        </h2>
        <p class="text-muted-foreground mb-4">
          {{ $t("privacy.thirdParty.intro") }}
        </p>
        <div class="space-y-4">
          <!-- GitHub -->
          <div class="border rounded-lg p-4">
            <h4 class="font-medium text-foreground mb-2">
              {{ $t("privacy.thirdParty.services.github.name") }}
            </h4>
            <div class="space-y-1 text-sm text-muted-foreground">
              <p>
                <span class="font-medium">Purpose:</span>
                {{ $t("privacy.thirdParty.services.github.purpose") }}
              </p>
              <p>
                <span class="font-medium">Data shared:</span>
                {{ $t("privacy.thirdParty.services.github.dataShared") }}
              </p>
              <p>
                <span class="font-medium">Privacy policy:</span>
                <a
                  :href="$t('privacy.thirdParty.services.github.privacy')"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-primary hover:underline"
                >
                  GitHub Privacy Statement
                </a>
              </p>
              <p>
                <span class="font-medium">Location:</span>
                {{ $t("privacy.thirdParty.services.github.location") }}
              </p>
            </div>
          </div>
          <!-- Hosting -->
          <div class="border rounded-lg p-4">
            <h4 class="font-medium text-foreground mb-2">
              {{ $t("privacy.thirdParty.services.hosting.name") }}
            </h4>
            <div class="space-y-1 text-sm text-muted-foreground">
              <p>
                <span class="font-medium">Purpose:</span>
                {{ $t("privacy.thirdParty.services.hosting.purpose") }}
              </p>
              <p>
                <span class="font-medium">Data shared:</span>
                {{ $t("privacy.thirdParty.services.hosting.dataShared") }}
              </p>
              <p class="italic">
                {{ $t("privacy.thirdParty.services.hosting.note") }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Cookies and Local Storage -->
      <section>
        <h2 class="text-xl font-semibold mb-4">
          {{ $t("privacy.cookies.title") }}
        </h2>
        <p class="text-muted-foreground mb-6">
          {{ $t("privacy.cookies.intro") }}
        </p>

        <!-- Local Storage -->
        <div class="mb-6">
          <h3 class="text-lg font-medium mb-3">
            {{ $t("privacy.cookies.localStorage.title") }}
          </h3>
          <p class="text-muted-foreground mb-4">
            {{ $t("privacy.cookies.localStorage.description") }}
          </p>

          <!-- Theme Intensity Storage -->
          <div class="border rounded-lg p-3 mb-3">
            <div class="space-y-1 text-sm">
              <p class="font-medium text-foreground">
                {{ $t("privacy.cookies.localStorage.items.0.name") }}
              </p>
              <p class="text-muted-foreground">
                <span class="font-medium">Purpose:</span>
                {{ $t("privacy.cookies.localStorage.items.0.purpose") }}
              </p>
              <p class="text-muted-foreground">
                <span class="font-medium">Duration:</span>
                {{ $t("privacy.cookies.localStorage.items.0.duration") }}
              </p>
              <p class="text-muted-foreground">
                <span class="font-medium">Type:</span>
                {{ $t("privacy.cookies.localStorage.items.0.type") }}
              </p>
            </div>
          </div>

          <!-- Language Preference Storage -->
          <div class="border rounded-lg p-3 mb-3">
            <div class="space-y-1 text-sm">
              <p class="font-medium text-foreground">
                {{ $t("privacy.cookies.localStorage.items.1.name") }}
              </p>
              <p class="text-muted-foreground">
                <span class="font-medium">Purpose:</span>
                {{ $t("privacy.cookies.localStorage.items.1.purpose") }}
              </p>
              <p class="text-muted-foreground">
                <span class="font-medium">Duration:</span>
                {{ $t("privacy.cookies.localStorage.items.1.duration") }}
              </p>
              <p class="text-muted-foreground">
                <span class="font-medium">Type:</span>
                {{ $t("privacy.cookies.localStorage.items.1.type") }}
              </p>
            </div>
          </div>

          <p class="text-sm text-blue-600 dark:text-blue-400 italic">
            {{ $t("privacy.cookies.localStorage.note") }}
          </p>
        </div>

        <!-- Cookies (Future) -->
        <div class="mb-6">
          <h3 class="text-lg font-medium mb-3">
            {{ $t("privacy.cookies.cookies.title") }}
          </h3>
          <p class="text-muted-foreground mb-3">
            {{ $t("privacy.cookies.cookies.description") }}
          </p>
          <div class="border rounded-lg p-3 mb-2 opacity-60">
            <div class="space-y-1 text-sm">
              <p class="font-medium text-foreground">
                {{ $t("privacy.cookies.cookies.items.0.name") }}
              </p>
              <p class="text-muted-foreground">
                <span class="font-medium">Purpose:</span>
                {{ $t("privacy.cookies.cookies.items.0.purpose") }}
              </p>
              <p class="text-muted-foreground">
                <span class="font-medium">Duration:</span>
                {{ $t("privacy.cookies.cookies.items.0.duration") }}
              </p>
              <p class="text-muted-foreground">
                <span class="font-medium">Type:</span>
                {{ $t("privacy.cookies.cookies.items.0.type") }}
              </p>
            </div>
          </div>
        </div>

        <!-- No Tracking -->
        <div
          class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4"
        >
          <h3
            class="text-lg font-medium mb-3 text-green-800 dark:text-green-200"
          >
            {{ $t("privacy.cookies.noTracking.title") }}
          </h3>
          <ul
            class="list-disc list-inside space-y-1 text-green-700 dark:text-green-300"
          >
            <li>{{ $t("privacy.cookies.noTracking.items.0") }}</li>
            <li>{{ $t("privacy.cookies.noTracking.items.1") }}</li>
            <li>{{ $t("privacy.cookies.noTracking.items.2") }}</li>
            <li>{{ $t("privacy.cookies.noTracking.items.3") }}</li>
          </ul>
        </div>
      </section>

      <!-- Data Retention -->
      <section>
        <h2 class="text-xl font-semibold mb-4">
          {{ $t("privacy.dataRetention.title") }}
        </h2>
        <p class="text-muted-foreground mb-4">
          {{ $t("privacy.dataRetention.intro") }}
        </p>
        <div class="space-y-3">
          <div class="flex justify-between items-center border-b pb-2">
            <span class="font-medium text-foreground">{{
              $t("privacy.dataRetention.periods.0.category")
            }}</span>
            <span class="text-muted-foreground">{{
              $t("privacy.dataRetention.periods.0.duration")
            }}</span>
          </div>
          <div class="flex justify-between items-center border-b pb-2">
            <span class="font-medium text-foreground">{{
              $t("privacy.dataRetention.periods.1.category")
            }}</span>
            <span class="text-muted-foreground">{{
              $t("privacy.dataRetention.periods.1.duration")
            }}</span>
          </div>
        </div>
        <p class="text-sm text-muted-foreground mt-4 italic">
          {{ $t("privacy.dataRetention.deletion") }}
        </p>
      </section>

      <!-- Your Rights -->
      <section>
        <h2 class="text-xl font-semibold mb-4">
          {{ $t("privacy.yourRights.title") }}
        </h2>
        <p class="text-muted-foreground mb-4">
          {{ $t("privacy.yourRights.intro") }}
        </p>
        <div class="space-y-4">
          <div class="border-l-4 border-blue-500 pl-4">
            <h4 class="font-medium text-foreground">
              {{ $t("privacy.yourRights.rights.0.right") }}
            </h4>
            <p class="text-sm text-muted-foreground">
              {{ $t("privacy.yourRights.rights.0.description") }}
            </p>
          </div>
          <div class="border-l-4 border-blue-500 pl-4">
            <h4 class="font-medium text-foreground">
              {{ $t("privacy.yourRights.rights.1.right") }}
            </h4>
            <p class="text-sm text-muted-foreground">
              {{ $t("privacy.yourRights.rights.1.description") }}
            </p>
          </div>
          <div class="border-l-4 border-blue-500 pl-4">
            <h4 class="font-medium text-foreground">
              {{ $t("privacy.yourRights.rights.2.right") }}
            </h4>
            <p class="text-sm text-muted-foreground">
              {{ $t("privacy.yourRights.rights.2.description") }}
            </p>
          </div>
          <div class="border-l-4 border-blue-500 pl-4">
            <h4 class="font-medium text-foreground">
              {{ $t("privacy.yourRights.rights.3.right") }}
            </h4>
            <p class="text-sm text-muted-foreground">
              {{ $t("privacy.yourRights.rights.3.description") }}
            </p>
          </div>
          <div class="border-l-4 border-blue-500 pl-4">
            <h4 class="font-medium text-foreground">
              {{ $t("privacy.yourRights.rights.4.right") }}
            </h4>
            <p class="text-sm text-muted-foreground">
              {{ $t("privacy.yourRights.rights.4.description") }}
            </p>
          </div>
          <div class="border-l-4 border-blue-500 pl-4">
            <h4 class="font-medium text-foreground">
              {{ $t("privacy.yourRights.rights.5.right") }}
            </h4>
            <p class="text-sm text-muted-foreground">
              {{ $t("privacy.yourRights.rights.5.description") }}
            </p>
          </div>
          <div class="border-l-4 border-blue-500 pl-4">
            <h4 class="font-medium text-foreground">
              {{ $t("privacy.yourRights.rights.6.right") }}
            </h4>
            <p class="text-sm text-muted-foreground">
              {{ $t("privacy.yourRights.rights.6.description") }}
            </p>
          </div>
        </div>
        <div
          class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
        >
          <p class="text-blue-800 dark:text-blue-200 mb-2">
            {{ $t("privacy.yourRights.exercise") }}
          </p>
          <p class="text-sm text-blue-700 dark:text-blue-300">
            {{ $t("privacy.yourRights.complaint") }}
          </p>
        </div>
      </section>

      <!-- Security -->
      <section>
        <h2 class="text-xl font-semibold mb-4">
          {{ $t("privacy.security.title") }}
        </h2>
        <p class="text-muted-foreground mb-4">
          {{ $t("privacy.security.intro") }}
        </p>
        <ul
          class="list-disc list-inside space-y-1 text-muted-foreground ml-4 mb-4"
        >
          <li>{{ $t("privacy.security.measures.0") }}</li>
          <li>{{ $t("privacy.security.measures.1") }}</li>
          <li>{{ $t("privacy.security.measures.2") }}</li>
          <li>{{ $t("privacy.security.measures.3") }}</li>
          <li>{{ $t("privacy.security.measures.4") }}</li>
        </ul>
        <p class="text-sm text-muted-foreground italic">
          {{ $t("privacy.security.breach") }}
        </p>
      </section>

      <!-- International Transfers -->
      <section>
        <h2 class="text-xl font-semibold mb-4">
          {{ $t("privacy.international.title") }}
        </h2>
        <p class="text-muted-foreground mb-4">
          {{ $t("privacy.international.text") }}
        </p>
        <ul class="list-disc list-inside space-y-1 text-muted-foreground ml-4">
          <li>{{ $t("privacy.international.safeguards.0") }}</li>
          <li>{{ $t("privacy.international.safeguards.1") }}</li>
          <li>{{ $t("privacy.international.safeguards.2") }}</li>
        </ul>
      </section>

      <!-- Children's Privacy -->
      <section>
        <h2 class="text-xl font-semibold mb-4">
          {{ $t("privacy.children.title") }}
        </h2>
        <p class="text-muted-foreground">
          {{ $t("privacy.children.text") }}
        </p>
      </section>

      <!-- Changes -->
      <section>
        <h2 class="text-xl font-semibold mb-4">
          {{ $t("privacy.changes.title") }}
        </h2>
        <div class="space-y-3 text-muted-foreground">
          <p>{{ $t("privacy.changes.text") }}</p>
          <p class="text-sm">{{ $t("privacy.changes.notification") }}</p>
        </div>
      </section>

      <!-- Contact -->
      <section>
        <h2 class="text-xl font-semibold mb-4">
          {{ $t("privacy.contact.title") }}
        </h2>
        <div class="space-y-3 text-muted-foreground">
          <p>{{ $t("privacy.contact.text") }}</p>
          <p>
            <a
              href="mailto:dev@rollercoaster.dev"
              class="text-primary hover:underline font-medium"
            >
              {{ $t("privacy.contact.email") }}
            </a>
          </p>
          <p class="text-sm italic">{{ $t("privacy.contact.response") }}</p>
        </div>
      </section>

      <!-- Last Updated -->
      <section class="border-t pt-6">
        <p class="text-sm text-muted-foreground italic">
          {{ $t("privacy.lastUpdated") }}
        </p>
      </section>
    </div>
  </RdLayoutBaseLayout>
</template>
