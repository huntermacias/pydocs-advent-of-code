# Use a base image that includes both Node.js and Python
# You might need to find or create an image that includes both or use a multi-stage build
FROM nikolaik/python-nodejs:latest

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for Node dependencies
COPY package*.json ./

# Install Node dependencies
RUN npm install

# Copy the Python interpreter/executor and any dependencies
# If you have a requirements.txt for Python dependencies, copy and install it here
# COPY requirements.txt ./
# RUN pip install --no-cache-dir -r requirements.txt

# Copy source files
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Set the command to start your Node.js/Express server
CMD [ "node", "dist/index.js" ]
