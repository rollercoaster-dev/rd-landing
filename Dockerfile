FROM node:23-alpine AS base

# Enable corepack for pnpm
RUN corepack enable

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies with pnpm
RUN pnpm install --frozen-lockfile

# Install Bun for backend
RUN npm install -g bun

# Copy the rest of the application
COPY . .

# Build the application (frontend with pnpm, backend with bun)
RUN pnpm run build

# Expose the port
EXPOSE 3000

# Start the application with bun
CMD ["bun", "run", "start"]
