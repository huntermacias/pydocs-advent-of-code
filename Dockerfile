# Use an official Node runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /project

# Copy package.json and package-lock.json
COPY package*.json ./
# Copy server code into the container
COPY ./server /usr/src/app/server

# Install any needed packages
RUN npm cache clean --force && npm install || cat /root/.npm/_logs/*-debug.log

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Make port 3002 available to the world outside this container
EXPOSE 3002

# Run the app when the container launches
CMD ["node", "server/index.js"]
