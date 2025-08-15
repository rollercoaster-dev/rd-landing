# Rollercoaster.dev Monolith

A monolithic application for Open Badges, built with Vue 3 + TypeScript frontend and Bun + Elysia backend.

## Tech Stack

### Frontend

- Vue 3
- TypeScript
- Vite
- vite-ssg (Static Site Generation)
- Histoire (Component Development)

### Backend

- Bun
- Elysia (TypeScript Framework)

## Documentation

- [Backend Authentication](./docs/backend/authentication.md)

## Prerequisites

- [Bun](https://bun.sh/) (v1.2.10+)
- [Node.js](https://nodejs.org/) (v18+) or Yarn/npm globally installed

## Getting Started

### Installation

1. Install Bun:

```bash
curl -fsSL https://bun.sh/install | bash
```

2. Install dependencies:

```bash
bun install
```

3. Start PostgreSQL with Docker Compose:

```bash
docker-compose up -d
```

### Development

Run the development server:

```bash
bun run dev
```

This will start both the frontend and backend development servers.

### Building for Production

Build the application:

```bash
bun run build
```

### Running in Production

Start the production server:

```bash
bun run start
```

## Component Development with Histoire

Run Histoire to develop and test components in isolation:

```bash
bun run histoire
```

## Testing

Run tests:

```bash
bun run test
```

## Deployment

### Automatic Deployment

The application is configured for automatic deployment to [Fly.io](https://fly.io/) using GitHub Actions:

1. All pull requests and pushes to the `main` branch are automatically tested
2. When a new version is ready for release, create and push a tag with the format `v*` (e.g., `v1.0.0`)
3. The release workflow will automatically deploy the tagged version to production

### Creating a Release

To create a new release:

```bash
# Ensure you're on the main branch with the latest changes
git checkout main
git pull

# Create a new tag (replace 1.0.0 with the appropriate version)
git tag v1.0.0

# Push the tag to GitHub
git push origin v1.0.0
```

### Manual Deployment

If needed, you can also deploy manually:

1. Install the Fly CLI
2. Authenticate with Fly
3. Deploy the application:

```bash
fly deploy
```

## Project Structure

```
rd-monolith/
├── src/
│   ├── frontend/        # Vue 3 + TypeScript frontend
│   │   ├── components/  # Vue components
│   │   ├── pages/       # Vue pages/views
│   │   ├── public/      # Static assets
│   │   ├── App.vue      # Root Vue component
│   │   ├── main.ts      # Frontend entry point
│   │   └── routes.ts    # Vue Router routes
│   │
│   ├── backend/         # Bun + Elysia backend
│   │   ├── api/         # API routes
│   │   ├── services/    # Business logic
│   │   └── index.ts     # Backend entry point
│   │
│   └── shared/          # Shared code between frontend and backend
│       └── types/       # Shared TypeScript types
│

├── Dockerfile           # Docker configuration for the application
├── fly.toml             # Fly.io configuration
├── vite.config.ts       # Vite configuration
├── histoire.config.ts   # Histoire configuration
└── tsconfig.json        # TypeScript configuration
```

## License

MIT
