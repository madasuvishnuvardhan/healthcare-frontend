# Stage 1: Build the Angular application
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine
# Copy the built application from the correct output directory
COPY --from=build /app/dist/healthcare-frontend /usr/share/nginx/html
# Copy our custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80