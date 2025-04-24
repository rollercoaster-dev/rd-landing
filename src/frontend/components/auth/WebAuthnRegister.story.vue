<script setup lang="ts">
import { logEvent } from "histoire/client";
import WebAuthnRegister from "./WebAuthnRegister.vue";
</script>

<template>
  <Story title="Auth/WebAuthnRegister">
    <Variant title="Default">
      <WebAuthnRegister
        @success="logEvent('success', $event)"
        @error="logEvent('error', $event)"
      />
      <!-- Setup note: Direct composable import makes mocking hard in Histoire. -->
      <!-- Use controls below to simulate states if needed, or rely on visual check -->
    </Variant>

    <Variant title="Registering">
      <WebAuthnRegister
        @success="logEvent('success', $event)"
        @error="logEvent('error', $event)"
      />
      <!-- To test: Manually trigger registration if mocking is difficult -->
      <!-- Or, ideally, refactor component/use Vitest for behavior test -->
    </Variant>

    <Variant title="Error State">
      <WebAuthnRegister
        @success="logEvent('success', $event)"
        @error="logEvent('error', $event)"
      />
      <!-- To test: Need way to inject error state, see notes -->
    </Variant>

    <Variant title="Unsupported Browser">
      <WebAuthnRegister
        @success="logEvent('success', $event)"
        @error="logEvent('error', $event)"
      />
      <!-- To test: Need way to inject unsupported state, see notes -->
    </Variant>
  </Story>
</template>

<docs lang="md">
# WebAuthn Register Component

This component provides a user interface for registering a WebAuthn passkey.

It uses the `useWebAuthn` composable for:

- Initiating the registration flow.
- Displaying loading and error states.
- Checking for browser support.

## Props

None.

## Emits

- `success`: When registration completes successfully.
- `error (message: string)`: When registration fails.

## Mocking Note

Directly importing composables like `useWebAuthn` within a component makes mocking its behavior difficult within Histoire stories. Ideally, for testable components, composable results would be passed as props or provided via Vue's provide/inject with a clear key.

For full behavior testing (including the composable logic), use Vitest with `vi.mock`.
</docs>
