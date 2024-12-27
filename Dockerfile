# Use the official Node.js image as the base image
FROM node:20

# Instala nano y bash
RUN apt-get update && apt-get install -y nano bash

# Create a directory to hold the application code inside the image
RUN mkdir -p /usr/src/app

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm install resend

RUN npm install body-parser

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:prod"]