# Build stage
FROM node:20 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-slim

WORKDIR /app

# Copy built assets from the builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json .

# Install only production dependencies
RUN npm ci --omit dev

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "build"]
