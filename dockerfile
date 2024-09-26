# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install TypeScript globally (if needed)
RUN npm install -g typescript

# Build the TypeScript files into JavaScript
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Start the app using the compiled JavaScript files
CMD ["node", "dist/app.js"]
