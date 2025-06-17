# Dockerfile
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose the app port
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]
