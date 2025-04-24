<template>
  <div class="flex items-center justify-center min-h-[calc(100vh-10rem)]">
    <UiCardCard class="w-full max-w-sm">
      <UiCardCardHeader class="text-center">
        <UiCardCardTitle class="text-2xl font-bold">Logged Out</UiCardCardTitle>
        <UiCardCardDescription>
          You have been successfully logged out.
        </UiCardCardDescription>
      </UiCardCardHeader>
      <UiCardCardContent class="space-y-4">
        <div v-if="isLoggingOut" class="flex justify-center">
          <div
            class="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"
          ></div>
        </div>

        <div v-else class="flex justify-center">
          <UiButtonButton @click="goToLogin"> Return to Login </UiButtonButton>
        </div>
      </UiCardCardContent>
    </UiCardCard>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/frontend/composables/useAuth";

const router = useRouter();
const auth = useAuth();
const isLoggingOut = ref(true);

// Perform logout when the page is mounted
onMounted(async () => {
  try {
    // Check if already logged out
    if (!auth.isAuthenticated) {
      isLoggingOut.value = false;
      return;
    }

    // Perform logout
    await auth.logout();
    console.log("Logout successful");
  } catch (error) {
    console.error("Error during logout:", error);
  } finally {
    isLoggingOut.value = false;
  }
});

function goToLogin() {
  router.push("/login");
}
</script>
