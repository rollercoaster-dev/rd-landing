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
- [ ] Migrate user routes
- [ ] Migrate badge routes
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

- Install Hono and required dependencies
- Update package.json scripts
- Create Hono version of main application setup
- Create Hono version of auth middleware
- Create Hono version of GitHub OAuth routes
- Create Hono version of auth routes
- Create Hono version of API routes
- Create Hono version of test HTTP client

### In Progress

- Migrate user routes
- Migrate badge routes

### Blocked

_None yet_

## Notes

- The migration should be done incrementally, focusing on one component at a time
- Maintain backward compatibility where possible
- Ensure all tests pass after each component is migrated
- The GitHub OAuth flow should be thoroughly tested after migration
