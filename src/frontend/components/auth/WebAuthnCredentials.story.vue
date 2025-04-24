<script setup lang="ts">
import { logEvent } from "histoire/client";
// import WebAuthnCredentials from './WebAuthnCredentials.vue'; // Auto-imported
import type { App } from "vue";
import type { WebAuthnCredential as WebAuthnCredentialType } from "@/frontend/composables/useWebAuthn";

// Define the structure of the state used in variants
interface VariantState {
  isLoading: boolean;
  error: string | null;
  credentials: WebAuthnCredentialType[];
}

function setupState(state: VariantState) {
  logEvent("Setup function called with state:", state);
}

function setupApp({ app }: { app: App }) {
  logEvent("Setup app function called", { app });
}

const mockCredentialData: Omit<
  WebAuthnCredentialType,
  | "userId"
  | "publicKey"
  | "counter"
  | "credentialDeviceType"
  | "credentialBackedUp"
  | "createdAt"
  | "updatedAt"
>[] = [
  {
    id: "cred-1",
    credentialId: "cred1-laptop",
    friendlyName: "My Laptop",
    transports: ["usb", "nfc"],
  },
  {
    id: "cred-2",
    credentialId: "cred2-phone",
    friendlyName: "Work Phone",
    transports: ["internal"],
  },
];

const initialSharedState: VariantState = {
  isLoading: false,
  error: null,
  credentials: [...mockCredentialData] as WebAuthnCredentialType[],
};

async function handleRegister(state: VariantState) {
  logEvent("Register action triggered in story", null);
  state.isLoading = true;
  state.error = null;

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate adding a new credential (use a simplified mock)
  const newCred: WebAuthnCredentialType = {
    id: `cred-${Date.now()}`,
    userId: "mock-user",
    credentialId: `new-cred-${Date.now().toString().slice(-4)}`,
    publicKey: "mockPublicKey",
    counter: "0",
    credentialDeviceType: "singleDevice",
    credentialBackedUp: false,
    transports: ["internal"],
    friendlyName: `New Credential ${Date.now().toString().slice(-4)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  state.credentials.push(newCred);
  state.isLoading = false;
}

async function handleDelete(state: VariantState, credId: string) {
  logEvent("Delete action triggered in story", { credId });
  // Find the ID associated with the credentialId
  const credentialToDelete = state.credentials.find(
    (c) => c.credentialId === credId,
  );
  if (!credentialToDelete) {
    logEvent("Credential not found for deletion", { credId });
    state.error = `Credential with ID ${credId} not found.`;
    return;
  }

  const internalId = credentialToDelete.id;

  state.isLoading = true;
  state.error = null;

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Simulate success/failure
  const success = Math.random() > 0.2;
  if (success) {
    state.credentials = state.credentials.filter((c) => c.id !== internalId);
    logEvent("Delete successful", { internalId });
  } else {
    state.error = `Failed to delete credential ${credentialToDelete.friendlyName}.`;
    logEvent("Delete failed", { internalId });
  }
  state.isLoading = false;
}
</script>

<template>
  <Story
    title="Auth/WebAuthnCredentials"
    :layout="{ type: 'single', iframe: true }"
    :setup-app="setupApp"
    group="auth-components"
    icon="lucide:key-round"
  >
    <Variant
      title="Default"
      :init-state="
        () => ({
          isLoading: false,
          error: null,
          credentials: [
            {
              id: 'cred-1',
              credentialId: 'cred1-laptop',
              friendlyName: 'My Laptop',
              transports: ['usb', 'nfc'],
            },
            {
              id: 'cred-2',
              credentialId: 'cred2-phone',
              friendlyName: 'Work Phone',
              transports: ['internal'],
            },
          ] as WebAuthnCredentialType[],
        })
      "
      @ready="setupState"
    >
      <template #default="{ state }">
        <WebAuthnCredentials
          :is-loading="state.isLoading"
          :error="state.error"
          :credentials="state.credentials"
          @delete-credential="
            (id: string) => {
              logEvent('delete-credential emitted', { id });
              state.credentials = state.credentials.filter(
                (c: WebAuthnCredentialType) => c.credentialId !== id,
              );
            }
          "
        />
      </template>
      <template #controls="{ state }">
        <HstCheckbox v-model="state.isLoading" title="Is Loading" />
        <HstText v-model="state.error" title="Error Message (null for none)" />
      </template>
    </Variant>

    <Variant
      title="Loading State"
      :init-state="
        () => ({
          isLoading: true,
          error: null,
          credentials: [] as WebAuthnCredentialType[],
        })
      "
      @ready="setupState"
    >
      <template #default="{ state }">
        <WebAuthnCredentials
          :is-loading="state.isLoading"
          :error="state.error"
          :credentials="state.credentials"
          @delete-credential="
            (id: string) => logEvent('delete-credential emitted', { id })
          "
        />
      </template>
    </Variant>

    <Variant
      title="Error State"
      :init-state="
        () => ({
          isLoading: false,
          error: 'Failed to load credentials.',
          credentials: [] as WebAuthnCredentialType[],
        })
      "
      @ready="setupState"
    >
      <template #default="{ state }">
        <WebAuthnCredentials
          :is-loading="state.isLoading"
          :error="state.error"
          :credentials="state.credentials"
          @delete-credential="
            (id: string) => logEvent('delete-credential emitted', { id })
          "
        />
      </template>
      <template #controls="{ state }">
        <HstCheckbox v-model="state.isLoading" title="Is Loading" />
        <HstText v-model="state.error" title="Error Message" />
      </template>
    </Variant>

    <Variant
      title="No Credentials"
      :init-state="
        () => ({
          isLoading: false,
          error: null,
          credentials: [] as WebAuthnCredentialType[],
        })
      "
      @ready="setupState"
    >
      <template #default="{ state }">
        <WebAuthnCredentials
          :is-loading="state.isLoading"
          :error="state.error"
          :credentials="state.credentials"
          @delete-credential="
            (id: string) => logEvent('delete-credential emitted', { id })
          "
        />
      </template>
    </Variant>
  </Story>
</template>

<style scoped>
/* Add component-specific styles here if needed */
</style>
