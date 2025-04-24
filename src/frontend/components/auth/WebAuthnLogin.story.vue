<script setup lang="ts">
import { reactive, provide } from "vue";
import { logEvent } from "histoire/client";
// import WebAuthnLogin from './WebAuthnLogin.vue'; // Auto-imported
import type { App } from "vue";
import type { Router, RouteLocationRaw } from "vue-router";

interface VariantState {
  redirectTo: string;
  mock_isAuthenticating: boolean;
  mock_error: string | null;
  mock_isSupported: boolean;
  componentKey: string;
}

const mockRouter: Partial<Router> = {
  push: (_to: RouteLocationRaw | string) => {
    logEvent("Router push called with:", { _to });
    return Promise.resolve();
  },
};

// Top-level state for Histoire controls. May trigger 'unused' lint warning,
// but seems necessary for Histoire's init-state/control reactivity.
const state = reactive<VariantState>({
  redirectTo: "/app/dashboard",
  mock_isAuthenticating: false,
  mock_error: null,
  mock_isSupported: true,
  componentKey: "default",
});

// Define setupApp function to be passed to the Story
function setupApp({ app }: { app: App }) {
  logEvent("Setup app function called", { app });
  app.provide("router", mockRouter);
}

provide("router", mockRouter);
</script>

<template>
  <Story title="Auth/WebAuthnLogin" :setup-app="setupApp">
    <Variant title="Default">
      <template #default="{ state }">
        <WebAuthnLogin
          :key="state.componentKey"
          :is-authenticating="state.mock_isAuthenticating"
          :is-web-authn-supported="state.mock_isSupported"
          :error="state.mock_error"
          @authenticate="() => logEvent('authenticate emitted', {})"
        />
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.redirectTo" title="Redirect To" />
        <HstCheckbox
          v-model="state.mock_isAuthenticating"
          title="Mock Is Authenticating"
        />
        <HstText
          v-model="state.mock_error"
          title="Mock Error (null for none)"
        />
        <HstCheckbox
          v-model="state.mock_isSupported"
          title="Mock Is Supported"
        />
      </template>
    </Variant>

    <Variant title="Authenticating">
      <template #default="{ state }">
        <WebAuthnLogin
          :key="state.componentKey"
          :is-authenticating="true"
          :is-web-authn-supported="state.mock_isSupported"
          :error="state.mock_error"
          @authenticate="() => logEvent('authenticate emitted', {})"
        />
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.redirectTo" title="Redirect To" />
        <HstCheckbox
          v-model="state.mock_isAuthenticating"
          title="Mock Is Authenticating"
        />
        <HstText
          v-model="state.mock_error"
          title="Mock Error (null for none)"
        />
      </template>
    </Variant>

    <Variant title="Error">
      <template #default="{ state }">
        <WebAuthnLogin
          :key="state.componentKey"
          :is-authenticating="false"
          :is-web-authn-supported="state.mock_isSupported"
          error="Simulated Error Message"
          @authenticate="() => logEvent('authenticate emitted', {})"
        />
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.redirectTo" title="Redirect To" />
        <HstCheckbox
          v-model="state.mock_isAuthenticating"
          title="Mock Is Authenticating"
        />
        <HstText
          v-model="state.mock_error"
          title="Mock Error (null for none)"
        />
      </template>
    </Variant>

    <Variant title="Unsupported">
      <template #default="{ state }">
        <WebAuthnLogin
          :key="state.componentKey"
          :is-authenticating="false"
          :is-web-authn-supported="false"
          :error="state.mock_error"
          @authenticate="() => logEvent('authenticate emitted', {})"
        />
      </template>
    </Variant>
  </Story>
</template>

<docs lang="md">
# WebAuthn Login Component

Provides a UI for logging in with a WebAuthn passkey.

- Uses `useWebAuthn` for logic.
- Uses `useRouter` for redirection on success.

## Props

- `redirectTo` (string, optional): Path to redirect to after login. Defaults to `/`.

## Emits

- `success`: On successful authentication.
- `error (message: string)`: On authentication failure.

## Mocking Notes

- **useRouter:** The story provides a _mocked_ router via Vue's `provide` mechanism using a custom key. It logs `router.push` calls.
- **useWebAuthn:** Direct import makes mocking difficult in Histoire. The story uses controls and conditional rendering in the 'Default' variant to _simulate_ error/unsupported states visually. For actual behavior testing, use Vitest with `vi.mock`.
- **Authenticating State:** Requires manual interaction (clicking the button) in the story unless the component is refactored to accept an `isAuthenticating` prop.
</docs>
