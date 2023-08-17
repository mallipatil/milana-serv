# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory for the application
WORKDIR /app
# Copy the package.json and package-lock.json to the working directory
COPY package*.json .
# Install backend and frontend dependencies
RUN npm install
# Copy the rest of the application code
COPY . . 

# Copy the .env file
COPY .env .

RUN npm build

# Build the React app
#RUN cd frontend && npm run build
# Expose the port on which the backend will run
EXPOSE 6060
# Start the backend server
#CMD ["sh", "-c", "cd front-end && npm start & cd backend && npm start"]
# Start the server
CMD ["npm", "start"]