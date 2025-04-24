<script setup lang="ts">
import { Github } from "lucide-vue-next";
import { useAuth } from "@/frontend/composables/useAuth";
import { useWebAuthn } from "@/frontend/composables/useWebAuthn";
import WebAuthnLogin from "@/frontend/components/auth/WebAuthnLogin.vue";
import { ref } from "vue";

const auth = useAuth();
const { isWebAuthnSupported } = useWebAuthn();
const error = ref<string | null>(null);

function loginWithGitHub() {
  console.log("[DEBUG] login.vue: loginWithGitHub button clicked.");
  auth.loginWithGitHub();
}

function handleAuthSuccess() {
  console.log("Login page: WebAuthn authentication successful");
  error.value = null;
}

function handleAuthError(message: string) {
  console.error("Login page: WebAuthn authentication error:", message);
  error.value = message;
}
</script>

<template>
  <div class="flex items-center justify-center min-h-[calc(100vh-10rem)]">
    <UiCardCard class="w-full max-w-sm">
      <UiCardCardHeader class="text-center">
        <UiCardCardTitle class="text-2xl font-bold">Login</UiCardCardTitle>
        <UiCardCardDescription>
          Log in to track your progress and connect with the community.
        </UiCardCardDescription>
      </UiCardCardHeader>
      <UiCardCardContent class="space-y-6">
        <!-- WebAuthn Login -->
        <div v-if="isWebAuthnSupported" class="space-y-4">
          <WebAuthnLogin
            @success="handleAuthSuccess"
            @error="handleAuthError"
          />

          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t" />
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-background px-2 text-muted-foreground"
                >Or continue with</span
              >
            </div>
          </div>
        </div>

        <!-- GitHub Login -->
        <UiButtonButton
          class="w-full"
          variant="outline"
          @click="loginWithGitHub"
        >
          <Github class="mr-2 h-4 w-4" />
          Login with GitHub
        </UiButtonButton>

        <!-- Error Display -->
        <div v-if="error" class="text-sm text-red-500 mt-2">
          {{ error }}
        </div>
      </UiCardCardContent>
    </UiCardCard>
  </div>
</template>
