# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

COPY portfolio/package*.json ./
RUN npm ci

COPY portfolio/ .
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy built files (change 'dist' to 'build' if using Create React App)
COPY --from=build /app/dist /usr/share/nginx/html

# Custom nginx config for SPA routing
COPY portfolio.conf /etc/nginx/conf.d/default.conf

EXPOSE 80