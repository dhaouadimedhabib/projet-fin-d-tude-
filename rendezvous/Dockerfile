# Stage 1: Build Angular application
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Stage 2: Serve Angular application with Nginx
FROM nginx:alpine
COPY --from=node /app/dist/my-app /usr/share/nginx/html
