FROM oven/bun:1 AS base

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN bun install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the frontend
RUN bun run build

# Expose the port
EXPOSE 3000

# Start the application
CMD ["bun", "run", "start"]
