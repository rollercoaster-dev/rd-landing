<template>
  <div class="space-y-4">
    <UiButtonButton
      class="w-full"
      variant="default"
      :disabled="!isWebAuthnSupported || isAuthenticating"
      @click="handleAuthenticate"
    >
      <template v-if="isAuthenticating">
        <span class="mr-2 h-4 w-4 animate-spin">⟳</span>
        Authenticating...
      </template>
      <template v-else>
        <Fingerprint class="mr-2 h-4 w-4" />
        Login with Passkey
      </template>
    </UiButtonButton>

    <div v-if="error" class="text-sm text-red-500 mt-2">
      {{ error }}
    </div>

    <div v-if="!isWebAuthnSupported" class="text-sm text-amber-500 mt-2">
      Your browser doesn't support passkeys. Please use a modern browser or try
      another login method.
    </div>
  </div>
</template>

<script setup lang="ts">
import { Fingerprint } from "lucide-vue-next";
import { useWebAuthn } from "@/frontend/composables/useWebAuthn";
import { useRouter } from "vue-router";

const props = defineProps<{
  redirectTo?: string;
}>();

const emit = defineEmits<{
  (e: "success"): void;
  (e: "error", message: string): void;
}>();

const router = useRouter();
const {
  authenticateWithWebAuthn,
  isAuthenticating,
  error,
  isWebAuthnSupported,
} = useWebAuthn();

async function handleAuthenticate() {
  console.log("Starting WebAuthn authentication...");
  try {
    const success = await authenticateWithWebAuthn();
    console.log("Authentication result:", success);

    if (success) {
      console.log("Authentication successful, emitting success event");
      emit("success");

      // Redirect after successful authentication
      if (props.redirectTo) {
        console.log("Redirecting to:", props.redirectTo);
        router.push(props.redirectTo);
      } else {
        console.log("Redirecting to home page");
        router.push("/");
      }
    } else {
      console.error("Authentication failed:", error.value);
      emit("error", error.value || "Authentication failed");
    }
  } catch (err) {
    console.error("Error during WebAuthn authentication:", err);
    emit(
      "error",
      err instanceof Error ? err.message : "Unknown authentication error",
    );
  }
}
</script>
