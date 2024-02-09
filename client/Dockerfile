FROM node:20-alpine AS builder
ENV NODE_ENV production

# Add a work directory
WORKDIR /app

# Cache and Install dependencies
COPY package.json .
RUN npm install --production=false

# Copy app files
COPY . .

# Build the app
RUN npm run build

# Bundle static assets with nginx
FROM nginx:alpine as production
ENV NODE_ENV production

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html
# Expose port
EXPOSE 80