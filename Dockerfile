# Stage 1: The Builder Stage
# This stage installs dependencies and builds your Next.js app.
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and the lock file
COPY package*.json ./

# Install dependencies using npm ci for deterministic builds
# This is faster and safer for CI/CD environments
RUN npm ci

# Copy the rest of your application source code
COPY . .

# Set the NEXT_TELEMETRY_DISABLED environment variable to prevent Next.js from collecting telemetry during the build
ENV NEXT_TELEMETRY_DISABLED 1

# Run the build command
RUN npm run build

# ---

# Stage 2: The Production/Runner Stage
# This stage takes only the built artifacts from the builder stage,
# resulting in a much smaller and more secure final image.
FROM node:18-alpine

WORKDIR /app

# Set the environment to production
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create a non-root user for security best practices
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the optimized "standalone" output from the builder stage.
# This requires `output: 'standalone'` in your next.config.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Switch to the non-root user
USER nextjs

# Expose the port the app will run on (default for Next.js is 3000)
EXPOSE 3000

# The command to start the application
# This runs the optimized Node.js server created by the standalone output.
CMD ["node", "server.js"]