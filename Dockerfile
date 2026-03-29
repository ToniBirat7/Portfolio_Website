# Multi-stage build for optimized production image

# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Build argument for base path
ARG VITE_BASE_PATH=/
ENV VITE_BASE_PATH=${VITE_BASE_PATH}

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application with custom base path
RUN npm run build -- --base=${VITE_BASE_PATH}

# Stage 2: Serve with nginx (unprivileged — runs as non-root on port 8080)
FROM nginxinc/nginx-unprivileged:1.27-alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080 (nginx-unprivileged default)
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
