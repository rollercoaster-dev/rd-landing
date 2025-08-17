# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

A monolithic Open Badges application built with Vue 3 + TypeScript frontend and Bun + Hono backend. The project focuses on developer productivity with modern tooling including Histoire for component development, vite-ssg for static site generation, and a comprehensive authentication system.

## Development Commands

### Primary Development

```bash
# Install dependencies
bun install

# Start development servers (both frontend and backend)
bun run dev

# Start only frontend (Vite dev server on port 5173)
bun run dev:frontend

# Start only backend (Bun + Hono on port 3001)
bun run dev:backend
```

### Building & Production

```bash
# Build entire application (frontend + backend)
bun run build

# Start production server
bun run start

# Build alternative Elysia backend version
bun run build:elysia
```

### Component Development

```bash
# Run Histoire for component development/testing
bun run histoire
```

### Testing & Quality

```bash
# Run tests
bun run test

# Watch mode testing
bun run test:watch

# Linting and formatting
bun run lint
bun run lint:fix
bun run format

# Type checking
bun run type-check        # Backend/shared types
bun run type-check:vue    # Vue component types

# Run all checks (format + lint + type-check)
bun run check:all
```

### Single Test Execution

```bash
# Run specific test file
bun run test src/backend/api/routes.test.ts

# Run tests matching pattern
bun run test --grep "authentication"
```

## Architecture Overview

### Monolithic Structure

The application uses a monolithic architecture with clear separation between frontend, backend, and shared code:

- **Frontend**: Vue 3 + TypeScript with file-based routing via `unplugin-vue-router`
- **Backend**: Bun runtime with Hono framework (migrated from Elysia)
- **Shared**: Common TypeScript types and utilities shared between frontend and backend

### Key Architectural Patterns

**Authentication Flow**:

- JWT-based authentication with HttpOnly cookies
- GitHub OAuth integration via `arctic` library
- WebAuthn support for passwordless authentication
- Custom middleware for route protection (`authMiddleware`)

**API Design**:

- RESTful API with Hono framework
- Route-level middleware application
- Zod validation for request/response schemas
- Centralized error handling with specific error types

**Frontend State Management**:

- Pinia for global state with persistence via `pinia-plugin-persistedstate`
- Composables pattern for reusable logic (`useApi`, `useAuth`, `useTheme`)
- File-based routing with automatic imports

**Component Architecture**:

- Reka UI (shadcn-vue) for base components
- Histoire for component documentation and testing
- Auto-import for components and composables
- TailwindCSS with custom design tokens

### Development Patterns

**Path Aliases**:

```typescript
"@/*"; // src/*
"@frontend/*"; // src/frontend/*
"@backend/*"; // src/backend/*
"@shared/*"; // src/shared/*
"~/*"; // src/frontend/* (alternative)
"#components"; // src/frontend/components
"#imports"; // src/frontend/composables
```

**Backend Service Layer**:

- Services in `src/backend/services/` for business logic
- Middleware in `src/backend/middleware/` for cross-cutting concerns
- Routes organized by feature in `src/backend/api/`

**Frontend Organization**:

- Pages use file-based routing in `src/frontend/pages/`
- Reusable logic in composables (`src/frontend/composables/`)
- UI components in `src/frontend/components/ui/`

## Environment Setup

### Required Environment Variables

```bash
# GitHub API for project status cards
GITHUB_TOKEN="ghp_your_personal_access_token_here"

# Site URL for SEO meta tags (absolute URLs for og:url, canonical, etc.)
VITE_SITE_URL="http://localhost:5173"  # Development
# VITE_SITE_URL="https://rollercoaster.dev"  # Production

# Authentication (from docs/backend/authentication.md)
RD_GITHUB_CLIENT_ID="your_github_oauth_client_id"
RD_GITHUB_CLIENT_SECRET="your_github_oauth_client_secret"
RD_JWT_SECRET="your_strong_jwt_secret"
RD_JWT_EXPIRY_SECONDS="3600"
RD_FRONTEND_URL="http://localhost:5173"
RD_RP_NAME="Rollercoaster.dev"
RD_RP_ID="localhost"
RD_ORIGIN="http://localhost:5173"
```

### Development Dependencies

- **Bun** v1.2.10+ (primary runtime)
- **pnpm** (package manager - see package.json packageManager field)
- **Node.js** v18+ (for compatibility)

### Database Note

The project previously used Drizzle ORM but has moved away from database persistence based on migration documentation. Authentication and core functionality work without a database dependency.

## Testing Strategy

The project uses Vitest for testing with a custom HTTP client for backend testing:

```typescript
// Backend testing pattern
import { TestHttpClient } from "@backend/test/httpClient";
import { createApp } from "@backend/index";

const testClient = new TestHttpClient(createApp());
const response = await testClient.get("/api/test");
```

Frontend components should be tested using Vue Testing Utils with Histoire stories serving as living documentation.

## Framework Migration Notes

The backend has been migrated from Elysia to Hono framework. Key differences to be aware of:

- **Context Handling**: Use `c.json()`, `c.redirect()` instead of Elysia's `set` object
- **Middleware**: Hono uses standard middleware pattern with `(c, next) => {}`
- **Route Grouping**: Use `app.route()` for mounting sub-applications
- **Validation**: Zod with `@hono/zod-validator` instead of Elysia's built-in validation

Legacy Elysia implementations may still exist with `.elysia.ts` extensions.

## Deployment

The application is configured for deployment to Fly.io:

**Automatic Deployment**:

- Push to `main` branch triggers testing
- Create git tags with `v*` format (e.g., `v1.0.0`) for production releases
- GitHub Actions handles the deployment pipeline

**Manual Deployment**:

```bash
fly deploy
```

The Dockerfile uses a multi-stage build with Node.js base and Bun binary for optimal production performance.

## Database Preferences

When implementing new features that require data persistence, prefer PostgreSQL as the database solution.

<citations>
<document>
<document_type>RULE</document_type>
<document_id>ETO5QKlpYeYJWk6iyZ1v6K</document_id>
</document>
</citations>
