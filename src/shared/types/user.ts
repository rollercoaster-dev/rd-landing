/**
 * Represents a user in the application.
 * Shared between frontend and backend.
 */
export interface User {
  id: string;
  username: string;
  email: string; // Consider if email should be exposed to frontend/JWT
  name: string | null;
  avatarUrl: string | null;
  // Add other fields as needed, e.g., roles, permissions
}
