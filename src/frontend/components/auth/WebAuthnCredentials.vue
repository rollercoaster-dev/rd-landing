<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-medium">Your Passkeys</h3>
      <UiButtonButton
        size="sm"
        variant="outline"
        :disabled="isLoading"
        @click="refreshCredentials"
      >
        <RefreshCw v-if="isLoading" class="h-4 w-4 animate-spin" />
        <RefreshCw v-else class="h-4 w-4" />
        <span class="sr-only">Refresh</span>
      </UiButtonButton>
    </div>

    <div v-if="isLoading" class="flex justify-center py-4">
      <span class="text-sm text-muted-foreground">Loading credentials...</span>
    </div>

    <div
      v-else-if="credentials.length === 0"
      class="text-center py-4 border rounded-md"
    >
      <p class="text-sm text-muted-foreground">
        You don't have any passkeys registered yet.
      </p>
    </div>

    <div v-else class="space-y-2">
      <UiCardCard
        v-for="credential in credentials"
        :key="credential.id"
        class="p-4"
      >
        <div class="flex items-center justify-between">
          <div>
            <h4 class="font-medium">{{ credential.friendlyName }}</h4>
            <p class="text-xs text-muted-foreground">
              Added on {{ formatDate(credential.createdAt) }}
            </p>
          </div>
          <UiButtonButton
            size="sm"
            variant="destructive"
            :disabled="isDeleting"
            @click="deleteCredential(credential.id)"
          >
            <Trash class="h-4 w-4" />
            <span class="sr-only">Delete</span>
          </UiButtonButton>
        </div>
      </UiCardCard>
    </div>

    <div v-if="error" class="text-sm text-red-500 mt-2">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RefreshCw, Trash } from "lucide-vue-next";
import { useWebAuthn } from "@/frontend/composables/useWebAuthn";
import { useApi } from "@/frontend/composables/useApi";

const api = useApi();
const { credentials, fetchCredentials, isLoading, error } = useWebAuthn();

const isDeleting = ref(false);

onMounted(() => {
  fetchCredentials();
});

function refreshCredentials() {
  fetchCredentials();
}

async function deleteCredential(id: string) {
  if (!confirm("Are you sure you want to delete this passkey?")) {
    return;
  }

  isDeleting.value = true;

  try {
    const response = await api.fetchData(`/auth/webauthn/credentials/${id}`, {
      method: "DELETE",
    });

    if (response) {
      await fetchCredentials();
    }
  } catch (err) {
    console.error("Error deleting credential:", err);
  } finally {
    isDeleting.value = false;
  }
}

function formatDate(dateString: string) {
  if (!dateString) return "Unknown date";

  const date = new Date(dateString);
  return date.toLocaleDateString();
}
</script>
