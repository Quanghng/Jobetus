# Use the official Node.js image for build
FROM node:20 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vue.js application
RUN npm run build

# Use a lightweight web server to serve the application
FROM nginx:alpine

# Copy the built application to the nginx server
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port
EXPOSE 80
