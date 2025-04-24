<template>
  <div class="space-y-4">
    <div class="flex flex-col space-y-2">
      <UiLabelLabel for="friendlyName">Device Name (Optional)</UiLabelLabel>
      <UiInputInput
        id="friendlyName"
        v-model="friendlyName"
        placeholder="e.g., My Phone, Work Laptop"
      />
      <p class="text-xs text-muted-foreground">
        Give your device a name to help you identify it later.
      </p>
    </div>

    <UiButtonButton
      class="w-full"
      variant="default"
      :disabled="!isWebAuthnSupported || isRegistering"
      @click="handleRegister"
    >
      <template v-if="isRegistering">
        <span class="mr-2 h-4 w-4 animate-spin">⟳</span>
        Registering...
      </template>
      <template v-else>
        <Fingerprint class="mr-2 h-4 w-4" />
        Register Passkey
      </template>
    </UiButtonButton>

    <div v-if="error" class="text-sm text-red-500 mt-2">
      {{ error }}
    </div>

    <div v-if="!isWebAuthnSupported" class="text-sm text-amber-500 mt-2">
      Your browser doesn't support passkeys. Please use a modern browser.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Fingerprint } from "lucide-vue-next";
import { useWebAuthn } from "@/frontend/composables/useWebAuthn";

const emit = defineEmits<{
  (e: "success"): void;
  (e: "error", message: string): void;
}>();

const friendlyName = ref("");
const { registerWebAuthnDevice, isRegistering, error, isWebAuthnSupported } =
  useWebAuthn();

async function handleRegister() {
  try {
    const success = await registerWebAuthnDevice(
      friendlyName.value || undefined,
    );

    if (success) {
      emit("success");
      friendlyName.value = ""; // Reset the form
    } else {
      emit("error", error.value || "Registration failed");
    }
  } catch (err) {
    console.error("Error during WebAuthn registration:", err);
    emit(
      "error",
      err instanceof Error ? err.message : "Unknown registration error",
    );
  }
}
</script>
