# Step 1: Build the React application
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve the app with NGINX
FROM nginx:alpine
# Copy the compiled build from the first step
COPY --from=build /app/dist /usr/share/nginx/html
# Copy custom Nginx configuration template
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Cloud Run sets the PORT env variable dynamically. 8080 is the default.
ENV PORT 8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
