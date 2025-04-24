<template>
  <div class="flex items-center justify-center min-h-screen">
    <p class="text-lg text-gray-600">Processing authentication...</p>
    <!-- Optional: Add a spinner here -->
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/frontend/composables/useAuth"; // Adjust path if needed

const router = useRouter();
const authStore = useAuthStore();

onMounted(async () => {
  console.log("Auth Callback Page Mounted");
  try {
    await authStore.fetchUser();

    if (authStore.user) {
      console.log("Auth successful, redirecting to home...");
      router.push("/");
    } else {
      console.error(
        "Auth callback: User not found after fetchUser, redirecting to login.",
      );
      router.push("/login?error=authentication_failed"); // Redirect to login on failure
    }
  } catch (error) {
    console.error("Error during auth callback processing:", error);
    console.log("Redirecting to login after error.");
    router.push("/login?error=authentication_failed"); // Redirect to login on failure
  }
});
</script>

<style scoped>
/* Add any specific styles for this page if needed */
</style>
