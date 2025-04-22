# Admin Area & AI Project Manager - Task Plan

This document outlines feature branches and PRs for building the Admin area and AI project manager.

---

## Branch: feature/setup-prisma-db

**PR: Setup database**

- Add `prisma/schema.prisma` with PostgreSQL datasource
- Configure `DATABASE_URL` in `.env` and `docker-compose.yml`
- Generate Prisma client and integrate with Elysia
- Create initial migration

## Branch: feature/auth-backend

**PR: Implement backend authentication**

- Define Prisma models: `User`, `WebAuthnCredential`
- Implement OAuth routes (GitHub, Google) using Passport.js or custom handlers
- Integrate WebAuthn server-side via `@simplewebauthn/server`
- Issue JWT tokens and set HttpOnly cookies
- Add middleware for protecting routes
- Write unit tests for auth flows

## Branch: feature/auth-frontend

**PR: Implement frontend authentication**

- Create `Login.vue` and `Register.vue` pages
- Add OAuth buttons and WebAuthn UI flows
- Handle JWT cookies and session persistence in Pinia
- Implement route guards for `/admin` routes
- Add stories/tests for auth components

## Branch: feature/admin-ui

**PR: Scaffold Admin UI**

- Create `AdminLayout.vue` with sidebar and topbar
- Setup Vue Router with `/admin` prefix
- Add theme toggle (reuse `useTheme` composable)
- Configure Pinia modules for admin state
- Add placeholder routes for docs, projects, AI

## Branch: feature/docs-backend

**PR: Docs CRUD backend**

- Define `Doc` model in Prisma (`id, title, slug, content, authorId, updatedAt`)
- Implement REST endpoints: GET `/api/docs`, GET `/api/docs/:slug`, POST, PATCH
- Add validation with Zod or Elysia schema
- (Optional) Integrate Git commit on save
- Write tests for docs API

## Branch: feature/docs-frontend

**PR: Docs UI**

- Create `ListDocs.vue`, `DocViewer.vue`, `DocEditor.vue`
- Integrate Markdown rendering with `markdown-it` or `vite-plugin-md`
- Use TipTap editor in Markdown mode for edit
- Connect to docs API, handle create/update flows
- Add UI tests and Histoire stories

## Branch: feature/projects-backend

**PR: Projects backend & GitHub**

- Define `Project` model in Prisma (`repoOwner, repoName, boardId, config`)
- Integrate with GitHub API via `@octokit/rest`
- Implement sync service to fetch issues/PRs statuses
- Expose endpoints: GET `/api/projects`, GET `/api/projects/:id`, PATCH `/api/projects/:id/issues/:number`
- Write tests with mocked GitHub API

## Branch: feature/projects-frontend

**PR: Projects UI**

- Create `ProjectsOverview.vue` with cards and progress bars
- Create `ProjectDetail.vue` for issue board view
- Implement API service for projects data
- Add stories/tests for project components

## Branch: feature/ai-backend

**PR: AI service backend**

- Integrate OpenAI SDK for summarization and suggestions
- Implement endpoints: POST `/api/ai/summary`, POST `/api/ai/suggest`
- Validate inputs and outputs
- Write tests with mocked OpenAI responses

## Branch: feature/ai-frontend

**PR: AI Assistant UI**

- Create `AiAssistant.vue` chat-style component
- Implement prompt input and response display
- Connect to AI endpoints and handle loading/error states
- Add tooltips and UX polish using Shadcn components

## Branch: feature/infrastructure

**PR: Infrastructure & CI**

- Update CORS origins and allowed headers for production
- Extend `docker-compose.yml` with database service for dev
- Add GitHub Actions: lint, test, migrations, deploy
- Document environment variables and deployment steps

---

_End of task plan._
