<script setup lang="ts">
import { Github } from "lucide-vue-next";
import { useAuth } from "@/frontend/composables/useAuth";

const auth = useAuth();

function loginWithGitHub() {
  console.log("[DEBUG] login.vue: loginWithGitHub button clicked."); // Add log here
  auth.loginWithGitHub();
}
</script>

<template>
  <div class="flex items-center justify-center min-h-[calc(100vh-10rem)]">
    <UiCardCard class="w-full max-w-sm">
      <UiCardCardHeader class="text-center">
        <UiCardCardTitle class="text-2xl font-bold">Login</UiCardCardTitle>
        <UiCardCardDescription>
          Log in with GitHub to track your progress and connect with the
          community.
        </UiCardCardDescription>
      </UiCardCardHeader>
      <UiCardCardContent class="space-y-4">
        <UiButtonButton
          class="w-full"
          variant="outline"
          @click="loginWithGitHub"
        >
          <Github class="mr-2 h-4 w-4" />
          Login with GitHub
        </UiButtonButton>
      </UiCardCardContent>
    </UiCardCard>
  </div>
</template>
