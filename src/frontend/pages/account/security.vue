<template>
  <div class="container mx-auto py-8">
    <h1 class="text-2xl font-bold mb-6">Account Security</h1>

    <UiCardCard>
      <UiCardCardHeader>
        <UiCardCardTitle>Passkeys (WebAuthn)</UiCardCardTitle>
        <UiCardCardDescription>
          Passkeys are a more secure alternative to passwords. They use your
          device's biometric sensors or PIN to authenticate you.
        </UiCardCardDescription>
      </UiCardCardHeader>
      <UiCardCardContent>
        <div class="space-y-6">
          <!-- Register new passkey -->
          <div class="border-b pb-6">
            <h3 class="text-lg font-medium mb-4">Register a New Passkey</h3>
            <WebAuthnRegister
              @success="handleRegisterSuccess"
              @error="handleRegisterError"
            />
          </div>

          <!-- Manage existing passkeys -->
          <div>
            <WebAuthnCredentials />
          </div>
        </div>
      </UiCardCardContent>
    </UiCardCard>

    <!-- Success/Error messages -->
    <UiAlertAlert v-if="successMessage" class="mt-4" variant="success">
      <UiAlertAlertTitle>Success</UiAlertAlertTitle>
      <UiAlertAlertDescription>{{ successMessage }}</UiAlertAlertDescription>
    </UiAlertAlert>

    <UiAlertAlert v-if="errorMessage" class="mt-4" variant="destructive">
      <UiAlertAlertTitle>Error</UiAlertAlertTitle>
      <UiAlertAlertDescription>{{ errorMessage }}</UiAlertAlertDescription>
    </UiAlertAlert>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/frontend/composables/useAuth";
import WebAuthnRegister from "@/frontend/components/auth/WebAuthnRegister.vue";
import WebAuthnCredentials from "@/frontend/components/auth/WebAuthnCredentials.vue";

const router = useRouter();
const auth = useAuth();
const successMessage = ref<string | null>(null);
const errorMessage = ref<string | null>(null);

// Check if user is authenticated
onMounted(() => {
  if (!auth.isAuthenticated) {
    router.push("/login?redirect=/account/security");
  }
});

function handleRegisterSuccess() {
  successMessage.value = "Passkey registered successfully!";
  setTimeout(() => {
    successMessage.value = null;
  }, 5000);
}

function handleRegisterError(message: string) {
  errorMessage.value = message;
  setTimeout(() => {
    errorMessage.value = null;
  }, 5000);
}
</script>
