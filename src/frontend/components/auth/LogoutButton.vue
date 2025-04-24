<template>
  <UiButtonButton
    :variant="variant"
    :size="size"
    :class="buttonClass"
    :disabled="isLoggingOut"
    @click="handleLogout"
  >
    <template v-if="isLoggingOut">
      <span class="mr-2 h-4 w-4 animate-spin">⟳</span>
      <span v-if="showText">Logging out...</span>
    </template>
    <template v-else>
      <LogOut v-if="showIcon" :class="iconClass" />
      <span v-if="showText">{{ text }}</span>
      <span v-if="!showText" class="sr-only">Logout</span>
    </template>
  </UiButtonButton>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { LogOut } from "lucide-vue-next";
import { useAuth } from "@/frontend/composables/useAuth";
import { useRouter } from "vue-router";

const props = defineProps({
  // Button appearance
  variant: {
    type: String,
    default: "ghost",
  },
  size: {
    type: String,
    default: "default",
  },
  buttonClass: {
    type: String,
    default: "",
  },
  // Content options
  showIcon: {
    type: Boolean,
    default: true,
  },
  showText: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: "Logout",
  },
  iconClass: {
    type: String,
    default: "h-4 w-4 mr-2",
  },
  // Behavior
  redirectTo: {
    type: String,
    default: "/",
  },
});

const emit = defineEmits<{
  (e: "logout:start"): void;
  (e: "logout:success"): void;
  (e: "logout:error", error: Error | string): void;
}>();

const auth = useAuth();
const router = useRouter();
const isLoggingOut = ref(false);

async function handleLogout() {
  isLoggingOut.value = true;
  emit("logout:start");

  try {
    await auth.logout();
    emit("logout:success");

    // Redirect after successful logout
    if (props.redirectTo) {
      router.push(props.redirectTo);
    }
  } catch (error) {
    console.error("Error during logout:", error);
    emit("logout:error", error instanceof Error ? error : String(error));
  } finally {
    isLoggingOut.value = false;
  }
}
</script>
