FROM oven/bun:1-alpine as bun

FROM node:23-alpine AS base

# Copy bun from the official image
COPY --from=bun /usr/local/bin/bun /usr/local/bin/bun

# Enable corepack for pnpm
RUN corepack enable

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies with pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the application
RUN pnpm run build

# Expose the port
EXPOSE 3000

# Start the application with bun
CMD ["bun", "run", "start"]
