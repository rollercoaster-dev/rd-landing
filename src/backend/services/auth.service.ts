import { db } from "@backend/db";
import { users, keys } from "@backend/db/schema";
import { eq } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

// Define the type for a user selected from the DB (same as in githubAuth.service)
type UserSelect = typeof users.$inferSelect;

// Standardized OAuth User Profile Interface
export interface OAuthUserProfile {
  provider: string; // e.g., 'github', 'google'
  providerUserId: string; // The user's ID from the provider
  email: string | null; // Verified email, if available
  username?: string; // Preferred username, if available
  name?: string; // Full name, if available
  avatarUrl?: string | null; // Avatar URL, if available
}

export class AuthService {
  /**
   * Finds an existing user or creates a new one based on the OAuth profile information.
   * Links the OAuth provider account via the 'keys' table.
   *
   * Logic:
   * 1. Check if a key for this provider/providerUserId exists. If yes, return associated user.
   * 2. If no key, check if a user exists with the provided email (if email exists).
   * 3. If user exists by email, create the key linking the provider account and return the user.
   * 4. If no user exists by key or email, create a new user and the associated key, then return the new user.
   *
   * @param profile - The standardized user profile from the OAuth provider.
   * @param dbInstance - The Drizzle database instance.
   * @returns A promise that resolves with the user data (existing or newly created).
   */
  static async findOrCreateUserByOAuthProfile(
    profile: OAuthUserProfile,
    dbInstance: typeof db,
  ): Promise<UserSelect> {
    const keyId = `${profile.provider}:${profile.providerUserId}`;
    console.log(`[AuthService] Finding or creating user for key: ${keyId}`);

    // 1. Check if key already exists
    const existingKeyResult = await dbInstance
      .select({
        user: users,
      })
      .from(keys)
      .innerJoin(users, eq(keys.userId, users.id))
      .where(eq(keys.id, keyId))
      .limit(1);

    if (existingKeyResult.length > 0 && existingKeyResult[0].user) {
      console.log(`[AuthService] Found existing user via key: ${keyId}`);
      return existingKeyResult[0].user;
    }

    console.log(`[AuthService] Key ${keyId} not found. Checking by email.`);

    let userToReturn: UserSelect | null = null;

    // 2. If no key, check if a user exists with this email (if provided)
    if (profile.email) {
      const existingUserByEmail = await dbInstance
        .select()
        .from(users)
        .where(eq(users.email, profile.email))
        .limit(1);

      if (existingUserByEmail.length > 0) {
        userToReturn = existingUserByEmail[0];
        console.log(
          `[AuthService] Found existing user by email: ${profile.email}. Linking key ${keyId}.`,
        );
        // 3. User exists by email, link the key
        await dbInstance.insert(keys).values({
          id: keyId,
          userId: userToReturn.id,
          provider: profile.provider, // Store provider type
          providerUserId: profile.providerUserId, // Store provider user id
          hashedPassword: null, // OAuth keys don't have passwords
        });
        return userToReturn;
      }
    }

    // 4. If no user found by key or email, create a new user
    if (!userToReturn) {
      console.log(
        `[AuthService] No existing user found by key or email. Creating new user for ${profile.provider}.`,
      );
      const newUserId = createId(); // Generate a new CUID for the user

      // Prepare user data, handling potential missing fields
      const newUserValues = {
        id: newUserId,
        // Ensure username is unique - append random suffix if needed, or handle collision
        // For now, use provider username or email prefix or fallback
        username:
          profile.username ||
          profile.email?.split("@")[0] ||
          `user_${newUserId.slice(-6)}`,
        email: profile.email, // Can be null
        emailVerified: profile.email ? new Date() : null, // Assume verified if email provided by OAuth
        name: profile.name || profile.username || null, // Use name, fallback to username
        avatarUrl: profile.avatarUrl || null,
        // Add defaults for other required fields if any (e.g., createdAt, updatedAt handled by db?)
      };

      // Insert the new user
      const newUserResult = await dbInstance
        .insert(users)
        .values(newUserValues)
        .returning();

      if (newUserResult.length === 0) {
        throw new Error("[AuthService] Failed to create new user.");
      }
      userToReturn = newUserResult[0];

      // Link the key to the new user
      await dbInstance.insert(keys).values({
        id: keyId,
        userId: userToReturn.id,
        provider: profile.provider,
        providerUserId: profile.providerUserId,
        hashedPassword: null,
      });
      console.log(
        `[AuthService] New user created (ID: ${userToReturn.id}) and key ${keyId} linked.`,
      );
    }

    // Should always have a user by this point
    if (!userToReturn) {
      // This case should ideally not be reached
      throw new Error("[AuthService] Failed to find or create user.");
    }

    return userToReturn;
  }
}
