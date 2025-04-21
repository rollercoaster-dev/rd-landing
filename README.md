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
- PostgreSQL (via Docker)

## Prerequisites

- [Bun](https://bun.sh/) (v1.2.10+)
- [Docker](https://www.docker.com/) & Docker Compose (for PostgreSQL)
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

The application is configured for deployment to [Fly.io](https://fly.io/). To deploy:

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
├── docker-compose.yml   # Docker Compose for PostgreSQL
├── Dockerfile           # Docker configuration for the application
├── fly.toml             # Fly.io configuration
├── vite.config.ts       # Vite configuration
├── histoire.config.ts   # Histoire configuration
└── tsconfig.json        # TypeScript configuration
```

## License

MIT
