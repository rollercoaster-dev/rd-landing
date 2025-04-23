# Backend Authentication

This document outlines the JWT-based authentication system used in the backend. It replaces the previous Lucia-based system.

## Overview

The backend uses JSON Web Tokens (JWT) for managing user authentication. The flow primarily involves GitHub OAuth for initial login, followed by JWT generation and verification for subsequent requests.

## Key Components

- **JWT Service (`src/backend/services/jwt.service.ts`):**
  - Handles JWT generation and verification using the `jose` library.
  - Uses `HS256` algorithm.
  - Relies on `RD_JWT_SECRET` and `RD_JWT_EXPIRY_SECONDS` environment variables.
- **Authentication Middleware (`src/backend/middleware/auth.middleware.ts`):**
  - Applied to protected routes.
  - Extracts the JWT from the `rd_auth_token` cookie.
  - Verifies the token using `JwtService`.
  - Attaches the validated user payload (`AppJwtPayload`) to the request context (`ctx.user`).
- **GitHub OAuth (`src/backend/api/auth/github.routes.ts`):**
  - Uses a custom `GitHubAuthService` to manage the GitHub OAuth2 flow.
  - Handles the `/login/github` redirect and the `/login/github/callback` handler.
  - Upon successful authentication:
    - Retrieves user info from GitHub API (`/user` and `/user/emails`).
    - Finds or creates the user in the database (`src/backend/db/schema.ts`).
    - Generates a JWT using `JwtService`.
    - Sets the JWT as an HttpOnly, Secure cookie (`rd_auth_token`).
- **Configuration (`src/backend/config/auth.config.ts`):**
  - Defines cookie settings (name, path, httpOnly, secure, sameSite).
  - Validates necessary environment variables (`RD_GITHUB_CLIENT_ID`, `RD_GITHUB_CLIENT_SECRET`, `RD_JWT_SECRET`, `RD_JWT_EXPIRY_SECONDS`).
- **Logout (`src/backend/api/auth/index.ts`):**
  - Provides a `/api/auth/logout` endpoint.
  - Clears the `rd_auth_token` cookie.

## Libraries Used

- `jose`: For JWT signing and verification.
- `arctic`: For handling the GitHub OAuth2 flow.
- `elysia`: Web framework used for routing and middleware.
- `drizzle-orm`: Database ORM.

## Database Schema

- The `users` table (`src/backend/db/schema.ts`) includes:
  - `id` (PK)
  - `username` (Unique, Not Null - from GitHub login)
  - `email` (Unique, Not Null - primary verified GitHub email)
  - `name` (Nullable)
  - `avatarUrl` (Nullable)
  - `githubId` (Unique - GitHub user ID)
  - `createdAt`, `updatedAt`

## Environment Variables

- `RD_DATABASE_URL`: PostgreSQL connection string.
- `RD_GITHUB_CLIENT_ID`: GitHub OAuth App Client ID.
- `RD_GITHUB_CLIENT_SECRET`: GitHub OAuth App Client Secret.
- `RD_JWT_SECRET`: A strong, secret string for signing JWTs.
- `RD_JWT_EXPIRY_SECONDS`: Token expiry time in seconds (defaults to 3600).
- `RD_FRONTEND_URL`: Frontend URL for redirects.
- `RD_RP_NAME`: Relying Party Name for WebAuthn (defaults to "Rollercoaster.dev").
- `RD_RP_ID`: Relying Party ID for WebAuthn (defaults to "localhost").
- `RD_ORIGIN`: Expected origin of frontend requests (defaults to "http://{RP_ID}:5173").

## Security Considerations

- JWTs are stored in `HttpOnly` cookies to prevent access via client-side JavaScript (mitigates XSS).
- The `SameSite=Lax` attribute is used for CSRF protection.
- The `Secure` attribute is set (based on `NODE_ENV=production`) to ensure the cookie is only sent over HTTPS.
- The `RD_JWT_SECRET` must be kept confidential.
