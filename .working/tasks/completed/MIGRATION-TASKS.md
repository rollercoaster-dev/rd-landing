# Migration from Elysia to Hono

This document tracks the progress of migrating the backend from Elysia to Hono.

## Overview

The migration involves converting the current Elysia-based backend to use Hono while maintaining all existing functionality. Hono is a lightweight, fast web framework that works well across multiple JavaScript runtimes including Bun.

## Tasks

### 1. Setup and Dependencies

- [x] Install Hono and required dependencies
- [x] Update package.json scripts if needed
- [x] Configure Hono for Bun runtime

### 2. Core Application Structure

- [x] Rewrite main application setup (`src/backend/index.hono.ts`)
- [x] Update error handling
- [x] Configure CORS middleware
- [x] Set up static file serving

### 3. Authentication System

- [x] Rewrite auth middleware (`src/backend/middleware/auth.middleware.hono.ts`)
- [x] Update JWT handling to use Hono's JWT middleware
- [x] Update cookie handling for auth tokens
- [x] Migrate GitHub OAuth routes (`src/backend/api/auth/github.routes.hono.ts`)
- [x] Update logout functionality

### 4. API Routes

- [x] Migrate main API routes (`src/backend/api/routes.hono.ts`)
- [x] Migrate auth routes (`src/backend/api/auth/index.hono.ts`)
- [x] Migrate user routes (`src/backend/api/users/users.routes.hono.ts`)
- [x] Migrate badge routes (`src/backend/api/badges.hono.ts`)
- [x] Update protected routes

### 5. Validation

- [x] Replace Elysia's validation system with Hono's validator or Zod
- [x] Update request validation in all routes

### 6. Testing

- [x] Update test HTTP client (`src/backend/test/httpClient.hono.ts`)
- [ ] Update test setup
- [ ] Ensure all tests pass with Hono

### 7. Documentation

- [ ] Update API documentation
- [ ] Document migration changes
- [ ] Update code comments

## Progress

### Completed

- Install Hono and required dependencies (hono, @hono/zod-validator, zod)
- Update package.json scripts (added dev:backend:hono, build:hono, start:hono)
- Create Hono version of main application setup (src/backend/index.hono.ts)
- Create Hono version of auth middleware (src/backend/middleware/auth.middleware.hono.ts)
- Create Hono version of GitHub OAuth routes (src/backend/api/auth/github.routes.hono.ts)
- Create Hono version of auth routes (src/backend/api/auth/index.hono.ts)
- Create Hono version of API routes (src/backend/api/routes.hono.ts)
- Create Hono version of static files middleware (src/backend/services/static.hono.ts)
- Create Hono version of test HTTP client (src/backend/test/httpClient.hono.ts)
- Successfully run the Hono server and test basic endpoints
- Fix all TypeScript errors and commit changes

### In Progress

- Update test setup for Hono
- Test all routes with Hono implementation

### Blocked

_None yet_

## Notes

- The migration is being done incrementally with parallel implementations using `.hono.ts` extensions
- This approach allows for side-by-side comparison and testing without disrupting the existing Elysia implementation
- Maintain backward compatibility where possible
- Ensure all tests pass after each component is migrated
- The GitHub OAuth flow should be thoroughly tested after migration
- Key differences between Elysia and Hono implementations:
  - Context handling: Elysia uses `set.status`, `set.headers`, etc. while Hono uses `c.status()`, `c.header()`, etc.
  - Middleware: Elysia uses `.use()` and `.derive()` while Hono uses `.use()` with a different middleware structure
  - Validation: Elysia has built-in validation with `t.Object()` while Hono uses Zod with `zValidator()`
  - Cookie handling: Elysia has built-in cookie handling while Hono uses cookie helpers like `setCookie()`, `getCookie()`
  - Routing: Elysia uses `.group()` for route grouping while Hono uses `.route()` for mounting sub-apps
