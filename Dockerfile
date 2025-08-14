# Stage 1: Build the Angular application
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/healthcare-frontend/browser /usr/share/nginx/html
EXPOSE 80