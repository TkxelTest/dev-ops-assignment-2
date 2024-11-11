# Use official Node.js image as the base image
FROM node:22.11.0

# Set the working directory in the container
WORKDIR /app/backend

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your application will run on (adjust if necessary)
EXPOSE 3000

# Command to start the backend application
CMD ["npm", "start"]
