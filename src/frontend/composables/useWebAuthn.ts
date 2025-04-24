/**
 * WebAuthn composable for client-side WebAuthn operations
 * Uses @simplewebauthn/browser for WebAuthn functionality
 */
import { ref } from "vue";
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
  const isWebAuthnSupported = ref<boolean>(false);
  // Track when the check for WebAuthn support is complete
  const webAuthnSupportPromise = ref<Promise<boolean>>(Promise.resolve(false));

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

    // 1. Fetch registration options
    let optionsResponse: PublicKeyCredentialCreationOptionsJSON | null;
    try {
      optionsResponse =
        await api.fetchData<PublicKeyCredentialCreationOptionsJSON>(
          "/auth/webauthn/register/options",
          { method: "POST" },
        );
    } catch (err) {
      console.error("WebAuthn registration error:", err);
      error.value = "Failed to fetch registration options";
      isRegistering.value = false;
      return false;
    }
    if (!optionsResponse) {
      error.value = "Failed to fetch registration options";
      isRegistering.value = false;
      return false;
    }

    // 2. Registration ceremony
    let registrationResponse;
    try {
      registrationResponse = await startRegistration({
        optionsJSON: optionsResponse,
      });
    } catch (err) {
      console.error("WebAuthn registration error:", err);
      error.value = "Registration ceremony failed";
      isRegistering.value = false;
      return false;
    }

    // 3. Verify registration
    let verificationResponse: { success: boolean; message?: string } | null;
    try {
      verificationResponse = await api.fetchData<{
        success: boolean;
        message?: string;
      }>("/auth/webauthn/register/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationResponse, friendlyName }),
      });
    } catch (err) {
      console.error("WebAuthn registration error:", err);
      error.value = "Failed to verify registration";
      isRegistering.value = false;
      return false;
    }
    if (!verificationResponse || !verificationResponse.success) {
      const msg = verificationResponse?.message
        ? `: ${verificationResponse.message}`
        : "";
      error.value = `Failed to verify registration${msg}`;
      isRegistering.value = false;
      return false;
    }

    // 4. Registration completed (credentials refresh handled separately)
    isRegistering.value = false;
    return true;
  }

  /**
   * Start the WebAuthn authentication process
   * @returns Promise resolving to success status
   */
  async function authenticateWithWebAuthn(): Promise<boolean> {
    isAuthenticating.value = true;
    error.value = null;

    // 1. Fetch authentication options
    let optionsResponse: PublicKeyCredentialRequestOptionsJSON | null;
    try {
      optionsResponse =
        await api.fetchData<PublicKeyCredentialRequestOptionsJSON>(
          "/auth/webauthn/login/options",
          { method: "POST" },
        );
    } catch (err) {
      console.error("WebAuthn authentication error:", err);
      error.value = "Failed to fetch authentication options";
      isAuthenticating.value = false;
      return false;
    }
    if (!optionsResponse) {
      error.value = "Failed to fetch authentication options";
      isAuthenticating.value = false;
      return false;
    }

    // 2. Authentication ceremony
    let authenticationResponse;
    try {
      authenticationResponse = await startAuthentication({
        optionsJSON: optionsResponse,
      });
    } catch (err) {
      console.error("WebAuthn authentication error:", err);
      error.value = "Authentication ceremony failed";
      isAuthenticating.value = false;
      return false;
    }

    // 3. Verify authentication
    let verificationResponse: {
      success: boolean;
      user?: User;
      message?: string;
    } | null;
    try {
      verificationResponse = await api.fetchData<{
        success: boolean;
        user?: User;
        message?: string;
      }>("/auth/webauthn/login/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authenticationResponse }),
      });
    } catch (err) {
      console.error("WebAuthn authentication error:", err);
      error.value = "Failed to verify authentication";
      isAuthenticating.value = false;
      return false;
    }
    if (!verificationResponse || !verificationResponse.success) {
      const msg = verificationResponse?.message
        ? `: ${verificationResponse.message}`
        : "";
      error.value = `WebAuthn verification failed on server${msg}`;
      isAuthenticating.value = false;
      return false;
    }

    // 4. Update auth state
    await auth.fetchUser();
    isAuthenticating.value = false;
    return true;
  }

  /**
   * Fetch the user's WebAuthn credentials
   */
  async function fetchCredentials(): Promise<boolean> {
    if (!auth.isAuthenticated) {
      credentials.value = [];
      return false;
    }

    isLoading.value = true;
    error.value = null; // Clear previous errors

    try {
      const response = await api.fetchData<WebAuthnCredential[]>(
        "/auth/webauthn/credentials",
      );
      console.log(
        `[DEBUG fetchCredentials ${auth.user?.id}] Received response:`,
        JSON.stringify(response),
      );

      if (response) {
        credentials.value = response;
        console.log(
          `[DEBUG fetchCredentials ${auth.user?.id}] Credentials after assignment:`,
          JSON.stringify(credentials.value),
        );
      } else {
        credentials.value = [];
        console.log(
          `[DEBUG fetchCredentials ${auth.user?.id}] Response was null/undefined, cleared credentials.`,
        );
      }
      return true;
    } catch (err) {
      console.error("Error fetching WebAuthn credentials:", err);
      error.value =
        err instanceof Error
          ? `Failed to fetch credentials: ${err.message}`
          : "Failed to fetch credentials";
      credentials.value = [];
      return false;
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
      const response = await api.deleteData<{
        success: boolean;
        message?: string;
      }>(`/auth/webauthn/credentials/${credentialId}`, { method: "DELETE" });

      if (!response || !response.success) {
        const serverMessage = response?.message ? `: ${response.message}` : "";
        throw new Error(`Server failed to delete credential${serverMessage}`);
      }

      // Deletion successful, now refresh the list
      const fetchSuccess = await fetchCredentials();
      if (!fetchSuccess) {
        // If fetching fails after a successful delete, the operation overall is problematic.
        console.warn("Credential deleted, but failed to refresh the list.");
        error.value = "Credential deleted, but failed to refresh the list."; // Optionally set an error
        return false; // Return false as the overall operation didn't complete cleanly
      }

      // If delete succeeded AND fetch succeeded
      return true;
    } catch (err: unknown) {
      console.error("Failed to delete credential:", err);

      // Set the error message based on the error type
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = "An unknown error occurred during credential deletion.";
      }

      credentials.value = []; // Clear credentials on error
      return false; // Return false on error
    }
  }

  // Function to check WebAuthn support that returns a promise
  async function checkWebAuthnSupport(): Promise<boolean> {
    if (
      !window?.PublicKeyCredential ||
      typeof window.PublicKeyCredential
        .isUserVerifyingPlatformAuthenticatorAvailable !== "function"
    ) {
      console.warn("WebAuthn is not supported in this browser");
      error.value = "WebAuthn is not supported in this browser";
      return false;
    }

    try {
      const supported =
        await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      isWebAuthnSupported.value = supported;

      if (supported) {
        console.log("WebAuthn is supported in this browser");
      } else {
        console.warn("WebAuthn is not supported in this browser");
        error.value = "WebAuthn is not supported in this browser";
      }

      return supported;
    } catch (err) {
      console.warn("Error checking WebAuthn support:", err);
      error.value = "WebAuthn is not supported in this browser";
      return false;
    }
  }

  // Start the check immediately
  webAuthnSupportPromise.value = checkWebAuthnSupport();

  return {
    // State
    isRegistering,
    isAuthenticating,
    error,
    credentials,
    isLoading,
    isWebAuthnSupported,
    webAuthnSupportPromise, // Expose for testing

    // Methods
    registerWebAuthnDevice,
    authenticateWithWebAuthn,
    fetchCredentials,
    deleteCredential,
  };
}

export type UseWebAuthnReturnType = ReturnType<typeof useWebAuthn>;
