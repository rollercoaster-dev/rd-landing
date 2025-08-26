<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useSEO } from "../../composables/useSEO";

const { t } = useI18n();

useSEO({
  title: t("impressum.title"),
  description: t("impressum.meta.description"),
  og: {
    template: "page",
  },
});
</script>

<template>
  <RdLayoutBaseLayout
    :title="$t('impressum.heading')"
    :subtitle="$t('impressum.subtitle')"
  >
    <div class="prose max-w-none space-y-8">
      <!-- Introduction -->
      <p class="text-lg text-muted-foreground">
        {{ $t("impressum.intro") }}
      </p>

      <!-- Website Operator -->
      <section>
        <h2 class="text-xl font-semibold mb-4">
          {{ $t("impressum.operator.title") }}
        </h2>
        <div class="space-y-2 text-muted-foreground">
          <p class="font-medium text-foreground">
            {{ $t("impressum.operator.name") }}
          </p>
          <p>{{ $t("impressum.operator.legalForm") }}</p>
          <div class="mt-3">
            <p>{{ $t("impressum.operator.address.street") }}</p>
            <p>
              {{ $t("impressum.operator.address.postalCode") }}
              {{ $t("impressum.operator.address.city") }}
            </p>
            <p>{{ $t("impressum.operator.address.country") }}</p>
          </div>
        </div>
      </section>

      <!-- Contact Information -->
      <section>
        <h2 class="text-xl font-semibold mb-4">
          {{ $t("impressum.contact.title") }}
        </h2>
        <div class="space-y-2 text-muted-foreground">
          <p>
            <span class="font-medium">Email:</span>
            <a
              href="mailto:dev@rollercoaster.dev"
              class="text-primary hover:underline ml-2"
            >
              {{ $t("impressum.contact.email") }}
            </a>
          </p>
          <p>
            <span class="font-medium">Phone:</span>
            {{ $t("impressum.contact.phone") }}
          </p>
          <p class="text-sm italic">
            {{ $t("impressum.contact.responseTime") }}
          </p>
        </div>
      </section>

      <!-- Legal Information -->
      <section>
        <h2 class="text-xl font-semibold mb-4">
          {{ $t("impressum.legal.title") }}
        </h2>
        <div class="space-y-3 text-muted-foreground">
          <div>
            <p class="font-medium text-foreground">
              {{ $t("impressum.legal.representative") }}
            </p>
          </div>
          <div>
            <p class="font-medium text-foreground">Registration:</p>
            <p>{{ $t("impressum.legal.registration.court") }}</p>
            <p>{{ $t("impressum.legal.registration.number") }}</p>
            <p class="text-sm italic">
              {{ $t("impressum.legal.registration.note") }}
            </p>
          </div>
          <div>
            <p class="font-medium text-foreground">VAT ID:</p>
            <p>{{ $t("impressum.legal.vatId.number") }}</p>
            <p class="text-sm italic">
              {{ $t("impressum.legal.vatId.note") }}
            </p>
          </div>
        </div>
      </section>

      <!-- Content Responsibility -->
      <section>
        <h2 class="text-xl font-semibold mb-4">
          {{ $t("impressum.responsibility.title") }}
        </h2>
        <div class="space-y-2 text-muted-foreground">
          <p>{{ $t("impressum.responsibility.text") }}</p>
          <p class="font-medium text-foreground">
            {{ $t("impressum.responsibility.person") }}
          </p>
          <p>
            <a
              href="mailto:dev@rollercoaster.dev"
              class="text-primary hover:underline"
            >
              {{ $t("impressum.responsibility.contact") }}
            </a>
          </p>
        </div>
      </section>

      <!-- Disclaimer -->
      <section>
        <h2 class="text-xl font-semibold mb-4">
          {{ $t("impressum.disclaimer.title") }}
        </h2>
        <div class="space-y-3 text-muted-foreground">
          <p>{{ $t("impressum.disclaimer.content") }}</p>
          <p>{{ $t("impressum.disclaimer.externalLinks") }}</p>
        </div>
      </section>

      <!-- Updates -->
      <section class="border-t pt-6">
        <h2 class="text-xl font-semibold mb-4">
          {{ $t("impressum.updates.title") }}
        </h2>
        <div class="space-y-2 text-muted-foreground">
          <p>{{ $t("impressum.updates.text") }}</p>
          <p class="text-sm italic">
            {{ $t("impressum.updates.lastUpdated") }}
          </p>
        </div>
      </section>
    </div>
  </RdLayoutBaseLayout>
</template>
