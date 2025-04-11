# Stage 1: Install dependencies and build the application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install Prisma CLI globally (optional, but can be useful)
# RUN npm install -g prisma

# Copy package.json and lock file
COPY package.json yarn.lock* ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy Prisma schema
COPY prisma ./prisma/

# Generate Prisma client
# Ensure the DATABASE_URL is available during build or use a dummy one if schema generation doesn't require a live connection
# If your `prisma generate` needs the actual DB connection, you might need to adjust this.
# For now, assuming generate works without a live DB connection.
RUN npx prisma generate

# Copy the rest of the application code
COPY . .

# Build the Next.js application
# Pass build-time environment variables if needed, e.g., NEXT_PUBLIC_ variables
# ARG NEXT_PUBLIC_API_URL
# ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN yarn build

# Stage 2: Production image
FROM node:20-alpine

WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
# Add other production environment variables here if needed
# ENV DATABASE_URL=...
# ENV NEXTAUTH_URL=...
# ENV NEXTAUTH_SECRET=...

# Copy necessary files from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma/ 
COPY --from=builder /app/websocket-server.ts /app/websocket-server.ts 
COPY --from=builder /app/tsconfig.json /app/tsconfig.json 

# Expose the port Next.js runs on (default 3000)
EXPOSE 3000
# Expose the port WebSocket server runs on (check websocket-server.ts for the port, assuming 8080 for now)
EXPOSE 8080

# Default command to start the Next.js application
CMD ["npm", "start"]

# Note: To start the WebSocket server, you'll override the command in docker-compose.
# The command will be: ["npx", "ts-node", "websocket-server.ts"]
# This requires ts-node and typescript in node_modules, which are copied from the builder stage.
