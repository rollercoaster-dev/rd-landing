import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ref, nextTick, computed } from "vue";
import { useWebAuthn } from "./useWebAuthn";
import type { WebAuthnCredential } from "./useWebAuthn";
import type { User } from "@shared/types";

// --- Mocks ---

// Use vi.hoisted to define mock functions *before* vi.mock
const mockStartRegistration = vi.hoisted(() => vi.fn());
const mockStartAuthentication = vi.hoisted(() => vi.fn());

// Mock @simplewebauthn/browser using the hoisted variables
vi.mock("@simplewebauthn/browser", () => ({
  startRegistration: mockStartRegistration,
  startAuthentication: mockStartAuthentication,
}));

// Mock useApi
const mockApiFetchData = vi.fn();
const mockApiPostData = vi.fn();
const mockApiDeleteData = vi.fn(); // Added for delete tests
// Mock useApi composable
vi.mock("@/frontend/composables/useApi", () => ({
  useApi: vi.fn(() => {
    // Create fresh refs on each call to ensure state isolation
    const loading = ref(false);
    const error = ref(null);
    return {
      fetchData: mockApiFetchData,
      postData: mockApiPostData,
      deleteData: mockApiDeleteData,
      loading, // Return the fresh refs
      error, // Return the fresh refs
    };
  }),
}));

// Mock useAuth
const mockAuthFetchUser = vi.fn();
const mockUserData: User = {
  // Define a complete mock user
  id: "mock-user-123",
  username: "mockuser",
  email: "mock@example.com",
  name: "Mock User",
  avatarUrl: null,
};
const mockAuthUser = ref<User | null>(null); // Specify type: User or null
vi.mock("@/frontend/composables/useAuth", () => ({
  useAuth: vi.fn(() => ({
    user: mockAuthUser,
    fetchUser: mockAuthFetchUser,
    isAuthenticated: computed(() => mockAuthUser.value !== null),
  })),
}));

// Mock Browser Credential Management API & Feature Detection
const mockCredentialsCreate = vi.fn();
const mockCredentialsGet = vi.fn();
const mockIsUVPAA = vi.fn().mockResolvedValue(true); // Assume supported by default

// Define more complete mock credentials matching the interface
const mockCredential1: WebAuthnCredential = {
  id: "cred-db-id-1",
  userId: "user-123",
  credentialId: "cred-webauthn-id-1", // Use this for deletion target
  publicKey: "pubkey1",
  counter: "1",
  credentialDeviceType: "singleDevice",
  credentialBackedUp: false,
  transports: ["usb"],
  friendlyName: "Test Key 1",
  createdAt: "2023-01-01T00:00:00.000Z",
  updatedAt: "2023-01-01T00:00:00.000Z",
};

const mockCredential2: WebAuthnCredential = {
  id: "cred-db-id-2",
  userId: "user-123",
  credentialId: "cred-webauthn-id-2",
  publicKey: "pubkey2",
  counter: "5",
  credentialDeviceType: "multiDevice",
  credentialBackedUp: true,
  transports: ["internal", "nfc"],
  friendlyName: "Backup Key 2",
  createdAt: "2023-01-02T00:00:00.000Z",
  updatedAt: "2023-01-02T00:00:00.000Z",
};

// --- Test Suite ---

describe("useWebAuthn", () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    mockApiFetchData.mockReset();
    mockApiPostData.mockReset(); // Add reset for postData
    mockApiDeleteData.mockReset(); // Add reset for deleteData
    mockAuthUser.value = null; // Reset mock auth state

    // Stub window and PublicKeyCredential
    // Mock PublicKeyCredential as a function with static properties
    const mockPublicKeyCredential = vi.fn() as unknown as {
      isUserVerifyingPlatformAuthenticatorAvailable: typeof mockIsUVPAA;
      // Add other static props/methods if needed
    };
    mockPublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable =
      mockIsUVPAA;

    vi.stubGlobal("window", {
      PublicKeyCredential: mockPublicKeyCredential,
      // Add other window properties if needed
    });

    // Reset global mocks using stubGlobal
    vi.stubGlobal("navigator", {
      credentials: {
        create: mockCredentialsCreate,
        get: mockCredentialsGet,
      },
    });

    // Default mock implementations (can be overridden in specific tests)
    mockIsUVPAA.mockResolvedValue(true);
    mockApiFetchData.mockResolvedValue(null); // Default mock response
    mockStartRegistration.mockResolvedValue({ id: "reg-response-id" }); // Default mock response
    mockStartAuthentication.mockResolvedValue({ id: "auth-response-id" }); // Default mock response
  });

  afterEach(() => {
    // Restore original globals (automatically handled by vi.stubGlobal)
    vi.unstubAllGlobals(); // Ensure cleanup
  });

  it("should correctly report browser support via isWebAuthnSupported", async () => {
    // Test case for isWebAuthnSupported
    mockIsUVPAA.mockResolvedValueOnce(true);
    const {
      isWebAuthnSupported: supported1,
      webAuthnSupportPromise: promise1,
    } = useWebAuthn();
    // Need to wait for the promise in the computed property
    await promise1.value; // Wait for the actual check
    expect(supported1.value).toBe(true);

    mockIsUVPAA.mockResolvedValueOnce(false);
    const {
      isWebAuthnSupported: supported2,
      webAuthnSupportPromise: promise2,
    } = useWebAuthn();
    await promise2.value; // Wait for the actual check
    expect(supported2.value).toBe(false);

    expect(mockIsUVPAA).toHaveBeenCalledTimes(2);
  });

  describe("registerWebAuthnDevice", () => {
    const friendlyName = "Test Device";
    const mockOptions = { challenge: "mockChallenge", user: { id: "userId" } }; // Simplified mock options
    const mockRegistrationResponse = {
      id: "regId",
      rawId: "rawRegId",
      response: {},
      type: "public-key",
    };

    it("should complete the registration flow successfully", async () => {
      // Arrange
      mockApiFetchData
        .mockResolvedValueOnce(mockOptions) // For options fetch
        .mockResolvedValueOnce({ success: true }); // For verify call
      mockStartRegistration.mockResolvedValue(mockRegistrationResponse);
      const { registerWebAuthnDevice, isRegistering, error } = useWebAuthn();

      // Act
      const promise = registerWebAuthnDevice(friendlyName);

      // Assert intermediate state
      expect(isRegistering.value).toBe(true);
      expect(error.value).toBeNull();

      const result = await promise;

      // Assert final state and calls
      expect(result).toBe(true);
      expect(isRegistering.value).toBe(false);
      expect(error.value).toBeNull();
      expect(mockApiFetchData).toHaveBeenCalledTimes(2);
      expect(mockApiFetchData).toHaveBeenNthCalledWith(
        1,
        "/auth/webauthn/register/options",
        { method: "POST" },
      );
      expect(mockStartRegistration).toHaveBeenCalledWith({
        optionsJSON: mockOptions,
      });
      expect(mockApiFetchData).toHaveBeenNthCalledWith(
        2,
        "/auth/webauthn/register/verify",
        {
          method: "POST",
          body: JSON.stringify({
            registrationResponse: mockRegistrationResponse,
            friendlyName,
          }),
          headers: { "Content-Type": "application/json" },
        },
      );
    });

    it("should handle failure when fetching registration options", async () => {
      // Arrange
      const apiError = new Error("Failed to fetch options");
      mockApiFetchData.mockRejectedValueOnce(apiError);
      const { registerWebAuthnDevice, isRegistering, error } = useWebAuthn();

      // Act
      const result = await registerWebAuthnDevice(friendlyName);

      // Assert
      expect(result).toBe(false);
      expect(isRegistering.value).toBe(false);
      expect(error.value).toContain("Failed to fetch registration options");
      expect(mockApiFetchData).toHaveBeenCalledTimes(1);
      expect(mockApiFetchData).toHaveBeenCalledWith(
        "/auth/webauthn/register/options",
        { method: "POST" },
      );
      expect(mockStartRegistration).not.toHaveBeenCalled();
    });

    it("should handle failure during startRegistration", async () => {
      // Arrange
      const startRegError = new Error("User cancelled");
      mockApiFetchData.mockResolvedValueOnce(mockOptions);
      mockStartRegistration.mockRejectedValue(startRegError);
      const { registerWebAuthnDevice, isRegistering, error } = useWebAuthn();

      // Act
      const result = await registerWebAuthnDevice(friendlyName);

      // Assert
      expect(result).toBe(false);
      expect(isRegistering.value).toBe(false);
      expect(error.value).toContain("Registration ceremony failed");
      expect(mockApiFetchData).toHaveBeenCalledTimes(1);
      expect(mockApiFetchData).toHaveBeenCalledWith(
        "/auth/webauthn/register/options",
        { method: "POST" },
      );
      expect(mockStartRegistration).toHaveBeenCalledWith({
        optionsJSON: mockOptions,
      });
    });

    it("should handle failure during API verification", async () => {
      // Arrange
      const verifyError = new Error("Verification failed on server");
      mockApiFetchData
        .mockResolvedValueOnce(mockOptions) // Options fetch
        .mockRejectedValueOnce(verifyError); // Verify call
      mockStartRegistration.mockResolvedValue(mockRegistrationResponse);
      const { registerWebAuthnDevice, isRegistering, error } = useWebAuthn();

      // Act
      const result = await registerWebAuthnDevice(friendlyName);

      // Assert
      expect(result).toBe(false);
      expect(isRegistering.value).toBe(false);
      expect(error.value).toContain("Failed to verify registration");
      expect(mockApiFetchData).toHaveBeenCalledTimes(2);
      expect(mockApiFetchData).toHaveBeenNthCalledWith(
        1,
        "/auth/webauthn/register/options",
        { method: "POST" },
      );
      expect(mockStartRegistration).toHaveBeenCalledWith({
        optionsJSON: mockOptions,
      });
      expect(mockApiFetchData).toHaveBeenNthCalledWith(
        2,
        "/auth/webauthn/register/verify",
        expect.any(Object),
      ); // Verify call attempted
    });

    it("should update isRegistering state correctly throughout the process", async () => {
      // Arrange
      mockApiFetchData
        .mockResolvedValueOnce(mockOptions) // Options fetch
        .mockResolvedValueOnce({ success: true }); // Verify call
      mockStartRegistration.mockResolvedValue(mockRegistrationResponse);
      const { registerWebAuthnDevice, isRegistering } = useWebAuthn();

      // Act
      expect(isRegistering.value).toBe(false); // Initial state
      const promise = registerWebAuthnDevice(friendlyName);
      expect(isRegistering.value).toBe(true); // State during async operations
      await promise;
      expect(isRegistering.value).toBe(false); // Final state
    });
  });

  describe("authenticateWithWebAuthn", () => {
    const mockLoginOptions = { challenge: "mockLoginChallenge" }; // Simplified mock options
    const mockAuthenticationResponse = {
      id: "authId",
      rawId: "rawAuthId",
      response: {},
      type: "public-key",
    };

    it("should complete the authentication flow successfully and fetch user", async () => {
      // Arrange
      mockApiFetchData
        .mockResolvedValueOnce(mockLoginOptions) // For options fetch
        .mockResolvedValueOnce({ success: true }); // For verify call
      mockStartAuthentication.mockResolvedValue(mockAuthenticationResponse);
      const { authenticateWithWebAuthn, isAuthenticating, error } =
        useWebAuthn();

      // Act
      const promise = authenticateWithWebAuthn();

      // Assert intermediate state
      expect(isAuthenticating.value).toBe(true);
      expect(error.value).toBeNull();

      const result = await promise;

      // Assert final state and calls
      expect(result).toBe(true);
      expect(isAuthenticating.value).toBe(false);
      expect(error.value).toBeNull();
      expect(mockApiFetchData).toHaveBeenCalledTimes(2);
      expect(mockApiFetchData).toHaveBeenNthCalledWith(
        1,
        "/auth/webauthn/login/options",
        { method: "POST" },
      );
      expect(mockStartAuthentication).toHaveBeenCalledWith({
        optionsJSON: mockLoginOptions,
      });
      expect(mockApiFetchData).toHaveBeenNthCalledWith(
        2,
        "/auth/webauthn/login/verify",
        {
          method: "POST",
          body: JSON.stringify({
            authenticationResponse: mockAuthenticationResponse,
          }),
          headers: { "Content-Type": "application/json" },
        },
      );
      expect(mockAuthFetchUser).toHaveBeenCalledTimes(1); // Verify user fetch was called
    });

    it("should handle failure when fetching login options", async () => {
      // Arrange
      const apiError = new Error("Failed to fetch login options");
      mockApiFetchData.mockRejectedValueOnce(apiError);
      const { authenticateWithWebAuthn, isAuthenticating, error } =
        useWebAuthn();

      // Act
      const result = await authenticateWithWebAuthn();

      // Assert
      expect(result).toBe(false);
      expect(isAuthenticating.value).toBe(false);
      expect(error.value).toContain("Failed to fetch authentication options");
      expect(mockApiFetchData).toHaveBeenCalledTimes(1);
      expect(mockApiFetchData).toHaveBeenCalledWith(
        "/auth/webauthn/login/options",
        { method: "POST" },
      );
      expect(mockStartAuthentication).not.toHaveBeenCalled();
      expect(mockAuthFetchUser).not.toHaveBeenCalled();
    });

    it("should handle failure during startAuthentication", async () => {
      // Arrange
      const startAuthError = new Error("User declined");
      mockApiFetchData.mockResolvedValueOnce(mockLoginOptions);
      mockStartAuthentication.mockRejectedValue(startAuthError);
      const { authenticateWithWebAuthn, isAuthenticating, error } =
        useWebAuthn();

      // Act
      const result = await authenticateWithWebAuthn();

      // Assert
      expect(result).toBe(false);
      expect(isAuthenticating.value).toBe(false);
      expect(error.value).toContain("Authentication ceremony failed");
      expect(mockApiFetchData).toHaveBeenCalledTimes(1);
      expect(mockApiFetchData).toHaveBeenCalledWith(
        "/auth/webauthn/login/options",
        { method: "POST" },
      );
      expect(mockStartAuthentication).toHaveBeenCalledWith({
        optionsJSON: mockLoginOptions,
      });
      expect(mockAuthFetchUser).not.toHaveBeenCalled();
    });

    it("should handle failure during API verification", async () => {
      // Arrange
      const verifyError = new Error("Verification failed on server side");
      mockApiFetchData
        .mockResolvedValueOnce(mockLoginOptions) // Options fetch
        .mockRejectedValueOnce(verifyError); // Verify call
      mockStartAuthentication.mockResolvedValue(mockAuthenticationResponse);
      const { authenticateWithWebAuthn, isAuthenticating, error } =
        useWebAuthn();

      // Act
      const result = await authenticateWithWebAuthn();

      // Assert
      expect(result).toBe(false);
      expect(isAuthenticating.value).toBe(false);
      expect(error.value).toContain("Failed to verify authentication");
      expect(mockApiFetchData).toHaveBeenCalledTimes(2);
      expect(mockApiFetchData).toHaveBeenNthCalledWith(
        1,
        "/auth/webauthn/login/options",
        { method: "POST" },
      );
      expect(mockStartAuthentication).toHaveBeenCalledWith({
        optionsJSON: mockLoginOptions,
      });
      expect(mockApiFetchData).toHaveBeenNthCalledWith(
        2,
        "/auth/webauthn/login/verify",
        expect.any(Object),
      ); // Verify call attempted
      expect(mockAuthFetchUser).not.toHaveBeenCalled();
    });

    it("should handle server verification returning success: false", async () => {
      // Arrange
      mockApiFetchData
        .mockResolvedValueOnce(mockLoginOptions) // Options fetch
        .mockResolvedValueOnce({
          success: false,
          message: "Invalid credentials",
        }); // Verify call returns success false
      mockStartAuthentication.mockResolvedValue(mockAuthenticationResponse);
      const { authenticateWithWebAuthn, isAuthenticating, error } =
        useWebAuthn();

      // Act
      const result = await authenticateWithWebAuthn();

      // Assert
      expect(result).toBe(false);
      expect(isAuthenticating.value).toBe(false);
      expect(error.value).toContain(
        "WebAuthn verification failed on server: Invalid credentials",
      );
      expect(mockApiFetchData).toHaveBeenCalledTimes(2);
      expect(mockApiFetchData).toHaveBeenNthCalledWith(
        1,
        "/auth/webauthn/login/options",
        { method: "POST" },
      );
      expect(mockStartAuthentication).toHaveBeenCalledWith({
        optionsJSON: mockLoginOptions,
      });
      expect(mockApiFetchData).toHaveBeenNthCalledWith(
        2,
        "/auth/webauthn/login/verify",
        expect.any(Object),
      );
      expect(mockAuthFetchUser).not.toHaveBeenCalled();
    });

    it("should update isAuthenticating state correctly throughout the process", async () => {
      // Arrange
      mockApiFetchData
        .mockResolvedValueOnce(mockLoginOptions) // Options fetch
        .mockResolvedValueOnce({ success: true }); // Verify call
      mockStartAuthentication.mockResolvedValue(mockAuthenticationResponse);
      const { authenticateWithWebAuthn, isAuthenticating } = useWebAuthn();

      // Act
      expect(isAuthenticating.value).toBe(false); // Initial state
      const promise = authenticateWithWebAuthn();
      expect(isAuthenticating.value).toBe(true); // State during async operations
      await promise;
      expect(isAuthenticating.value).toBe(false); // Final state
    });
  });

  // --- Tests for fetchCredentials ---
  describe("fetchCredentials", () => {
    const mockCredentialsData = [mockCredential1, mockCredential2];

    it("should fetch credentials successfully and update state", async () => {
      mockAuthUser.value = mockUserData; // Set authenticated state
      const { fetchCredentials, credentials, error } = useWebAuthn(); // Keep error, remove isLoading
      mockApiFetchData.mockResolvedValueOnce(mockCredentialsData);

      // Act
      const promise = fetchCredentials();

      // Assert intermediate state
      expect(error.value).toBeNull();

      await promise;

      // Assert final state and calls
      expect(credentials.value).toEqual(mockCredentialsData);
      expect(error.value).toBeNull();
      expect(mockApiFetchData).toHaveBeenCalledTimes(1);
      expect(mockApiFetchData).toHaveBeenCalledWith(
        "/auth/webauthn/credentials",
      );
    });

    it("should handle API error during fetch and update state", async () => {
      mockAuthUser.value = mockUserData; // Set authenticated state
      const { fetchCredentials, credentials, error } = useWebAuthn(); // Keep error
      const initialCredentials = [...credentials.value]; // Capture initial (empty) state
      const fetchError = new Error("Network Error");
      mockApiFetchData.mockRejectedValueOnce(fetchError);

      // Act
      const promise = fetchCredentials();

      // Assert intermediate state
      expect(error.value).toBeNull(); // Error shouldn't be set until promise rejects

      await promise;

      // Assert final state and calls
      expect(credentials.value).toEqual(initialCredentials); // Credentials should not change
      expect(error.value).toContain("Failed to fetch credentials");
      expect(mockApiFetchData).toHaveBeenCalledTimes(1);
      expect(mockApiFetchData).toHaveBeenCalledWith(
        "/auth/webauthn/credentials",
      );
    });

    it("should clear previous error on successful fetch", async () => {
      mockAuthUser.value = mockUserData; // Set authenticated state
      const { fetchCredentials, credentials, error } = useWebAuthn(); // Keep error
      // Set a previous error
      error.value = "Previous error"; // Simulate a previous error
      // Stub successful fetch response
      mockApiFetchData.mockResolvedValueOnce(mockCredentialsData);

      // Act
      console.log(
        "[TEST DEBUG] Before fetchCredentials:",
        JSON.stringify(credentials.value),
      );
      await fetchCredentials();
      await nextTick(); // Wait for state updates
      console.log(
        "[TEST DEBUG] After fetchCredentials + nextTick:",
        JSON.stringify(credentials.value),
      );

      // Assert
      expect(credentials.value).toEqual(mockCredentialsData);
      expect(error.value).toBeNull(); // Error should be cleared
      expect(mockApiFetchData).toHaveBeenCalledTimes(1);
      expect(mockApiFetchData).toHaveBeenCalledWith(
        "/auth/webauthn/credentials",
      );
    });
  });

  // --- Tests for deleteCredential ---
  describe("deleteCredential", () => {
    it("should delete a credential and refresh the list", async () => {
      mockAuthUser.value = mockUserData; // Set authenticated state
      const { credentials, deleteCredential } = useWebAuthn(); // Remove isLoading and error
      credentials.value = [mockCredential1, mockCredential2]; // Initial state for this instance

      // Mock successful DELETE response
      mockApiDeleteData.mockResolvedValueOnce({ success: true });
      // Mock successful GET response for fetchCredentials
      mockApiFetchData.mockResolvedValueOnce([mockCredential2]);

      // Act
      console.log(
        "[TEST DEBUG] Before deleteCredential:",
        JSON.stringify(credentials.value),
      );
      const result = await deleteCredential(mockCredential1.credentialId);
      await nextTick(); // Wait for potential state updates
      console.log(
        "[TEST DEBUG] After deleteCredential + nextTick (before assertion):",
        JSON.stringify(credentials.value),
      );

      // Verify final state
      expect(result).toBe(true);
      await nextTick(); // Wait for state updates from internal fetchCredentials
      expect(credentials.value).toEqual([mockCredential2]);
    });

    it("should handle error during delete API call", async () => {
      mockAuthUser.value = mockUserData; // Set authenticated state
      const { credentials, deleteCredential, error } = useWebAuthn(); // Keep error, remove isLoading
      credentials.value = [mockCredential1, mockCredential2]; // Initial state for this instance
      const deleteError = new Error("Deletion failed");
      mockApiDeleteData.mockRejectedValueOnce(deleteError);

      // Act
      const result = await deleteCredential(mockCredential1.credentialId);

      // Wait for potential state updates
      await nextTick();

      // Verify final state
      expect(result).toBe(false);
      expect(error.value).toBe(deleteError.message);
      expect(mockApiDeleteData).toHaveBeenCalledTimes(1);
      expect(mockApiDeleteData).toHaveBeenCalledWith(
        `/auth/webauthn/credentials/${mockCredential1.credentialId}`,
        { method: "DELETE" },
      );
      expect(credentials.value).toEqual([]);
    });

    it("should handle error during subsequent fetchCredentials call", async () => {
      mockAuthUser.value = mockUserData; // Set authenticated state
      const { credentials, deleteCredential, error } = useWebAuthn(); // Keep error, remove isLoading
      credentials.value = [mockCredential1, mockCredential2]; // Initial state for this instance
      const fetchError = new Error("Fetch after delete failed");
      mockApiDeleteData.mockResolvedValueOnce({ success: true });
      mockApiFetchData.mockRejectedValueOnce(fetchError);

      // Act
      const result = await deleteCredential(mockCredential1.credentialId);

      // Wait for potential state updates
      await nextTick();

      // Verify final state
      expect(result).toBe(false);
      expect(error.value).toBe(
        "Credential deleted, but failed to refresh the list.",
      );
      expect(mockApiDeleteData).toHaveBeenCalledTimes(1);
      expect(mockApiDeleteData).toHaveBeenNthCalledWith(
        1,
        `/auth/webauthn/credentials/${mockCredential1.credentialId}`,
        { method: "DELETE" },
      );
      expect(mockApiFetchData).toHaveBeenCalledTimes(1);
      expect(mockApiFetchData).toHaveBeenNthCalledWith(
        1,
        "/auth/webauthn/credentials",
      );
      expect(credentials.value).toEqual([]);
    });
  });
});
