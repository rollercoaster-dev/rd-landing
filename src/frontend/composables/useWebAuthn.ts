/**
 * WebAuthn composable for client-side WebAuthn operations
 * Uses @simplewebauthn/browser for WebAuthn functionality
 */
import { ref, computed } from "vue";
import {
  startRegistration,
  startAuthentication,
} from "@simplewebauthn/browser";
import type {
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
  AuthenticatorTransportFuture,
} from "@simplewebauthn/types";

// Define a type for WebAuthn credentials
export interface WebAuthnCredential {
  id: string;
  userId: string;
  credentialId: string;
  publicKey: string;
  counter: string;
  credentialDeviceType: string;
  credentialBackedUp: boolean;
  transports?: AuthenticatorTransportFuture[];
  friendlyName: string;
  createdAt?: string;
  updatedAt?: string;
}
import { useApi } from "./useApi";
import { useAuth } from "./useAuth";
import type { User } from "@shared/types";

export function useWebAuthn() {
  const api = useApi();
  const auth = useAuth();

  const isRegistering = ref(false);
  const isAuthenticating = ref(false);
  const error = ref<string | null>(null);
  const credentials = ref<WebAuthnCredential[]>([]);
  const isLoading = ref(false);

  /**
   * Start the WebAuthn registration process
   * @param friendlyName Optional friendly name for the credential
   * @returns Promise resolving to success status
   */
  async function registerWebAuthnDevice(
    friendlyName?: string,
  ): Promise<boolean> {
    isRegistering.value = true;
    error.value = null;

    try {
      // 1. Request registration options from the server
      const optionsResponse =
        await api.fetchData<PublicKeyCredentialCreationOptionsJSON>(
          "/auth/webauthn/register/options",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ friendlyName }),
          },
        );

      console.log("Registration options response:", optionsResponse);

      if (!optionsResponse) {
        throw new Error("Failed to get registration options");
      }

      // 2. Start the registration process in the browser
      const registrationResponse = await startRegistration({
        optionsJSON: optionsResponse,
      });

      // 3. Send the response to the server for verification
      const verificationResponse = await api.fetchData<{ success: boolean }>(
        "/auth/webauthn/register/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            registrationResponse,
            friendlyName,
          }),
        },
      );

      if (!verificationResponse || !verificationResponse.success) {
        throw new Error("Failed to verify registration");
      }

      // 4. Refresh the credentials list
      await fetchCredentials();

      return true;
    } catch (err) {
      console.error("WebAuthn registration error:", err);
      error.value =
        err instanceof Error ? err.message : "Unknown registration error";
      return false;
    } finally {
      isRegistering.value = false;
    }
  }

  /**
   * Start the WebAuthn authentication process
   * @returns Promise resolving to success status
   */
  async function authenticateWithWebAuthn(): Promise<boolean> {
    isAuthenticating.value = true;
    error.value = null;

    try {
      // 1. Request authentication options from the server
      const optionsResponse =
        await api.fetchData<PublicKeyCredentialRequestOptionsJSON>(
          "/auth/webauthn/login/options",
          {
            method: "POST",
          },
        );

      console.log("Authentication options response:", optionsResponse);

      if (!optionsResponse) {
        throw new Error("Failed to get authentication options");
      }

      // 2. Start the authentication process in the browser
      const authenticationResponse = await startAuthentication({
        optionsJSON: optionsResponse,
      });

      // 3. Send the response to the server for verification
      const verificationResponse = await api.fetchData<{
        success: boolean;
        user?: User;
      }>("/auth/webauthn/login/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authenticationResponse,
        }),
      });

      console.log(
        "Authentication verification response:",
        verificationResponse,
      );

      if (!verificationResponse || !verificationResponse.success) {
        throw new Error("Failed to verify authentication");
      }

      // 4. Update the auth state
      await auth.fetchUser();

      return true;
    } catch (err) {
      console.error("WebAuthn authentication error:", err);
      error.value =
        err instanceof Error ? err.message : "Unknown authentication error";
      return false;
    } finally {
      isAuthenticating.value = false;
    }
  }

  /**
   * Fetch the user's WebAuthn credentials
   */
  async function fetchCredentials() {
    if (!auth.isAuthenticated) {
      credentials.value = [];
      return;
    }

    isLoading.value = true;
    error.value = null; // Clear previous errors

    try {
      const response = await api.fetchData<WebAuthnCredential[]>(
        "/auth/webauthn/credentials",
      );

      if (response) {
        credentials.value = response;
      } else {
        credentials.value = [];
      }
    } catch (err) {
      console.error("Error fetching WebAuthn credentials:", err);
      error.value =
        err instanceof Error
          ? err.message
          : "Unknown error fetching credentials";
      credentials.value = [];
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Delete a specific WebAuthn credential
   * @param credentialId The ID of the credential to delete
   * @returns Promise resolving to success status
   */
  async function deleteCredential(credentialId: string): Promise<boolean> {
    error.value = null; // Clear previous errors

    try {
      // 1. Send DELETE request to the server using api.fetchData
      const response = await api.fetchData<{
        success: boolean;
        message?: string;
      }>(`/auth/webauthn/credentials/${credentialId}`, { method: "DELETE" });

      // console.log(`Delete credential ${credentialId} response:`, response);

      if (!response || !response.success) {
        const serverMessage = response?.message ? `: ${response.message}` : "";
        throw new Error(`Server failed to delete credential${serverMessage}`);
      }

      // 2. Refresh the credentials list on success
      try {
        await fetchCredentials();
        return true; // Explicitly return true on success
      } catch (refreshErr) {
        console.error(
          `Error refreshing credentials after deletion:`,
          refreshErr,
        );
        error.value =
          refreshErr instanceof Error
            ? refreshErr.message
            : "Failed to fetch updated credentials";
        credentials.value = []; // Clear credentials on refresh error
        return false;
      }
    } catch (err) {
      console.error(`Error deleting credential ${credentialId}:`, err);
      error.value =
        err instanceof Error
          ? err.message
          : "Unknown error deleting credential";
      return false;
    }
  }

  /**
   * Check if WebAuthn is supported in the current browser
   */
  const isWebAuthnSupported = computed(() => {
    return (
      window &&
      window.PublicKeyCredential !== undefined &&
      typeof window.PublicKeyCredential === "function"
    );
  });

  // Initialize by checking if WebAuthn is supported
  if (isWebAuthnSupported.value) {
    console.log("WebAuthn is supported in this browser");
  } else {
    console.warn("WebAuthn is not supported in this browser");
    error.value = "WebAuthn is not supported in this browser";
  }

  return {
    // State
    isRegistering,
    isAuthenticating,
    error,
    credentials,
    isLoading,
    isWebAuthnSupported,

    // Methods
    registerWebAuthnDevice,
    authenticateWithWebAuthn,
    fetchCredentials,
    deleteCredential,
  };
}

export type UseWebAuthnReturnType = ReturnType<typeof useWebAuthn>;
