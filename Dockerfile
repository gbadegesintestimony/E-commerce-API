FROM node:22-alpine

# Install OpenSSL (required by Prisma)
RUN apk add --no-cache openssl

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm install --production

# Copy application code
COPY . .

# Use installed Prisma (not npx which downloads Prisma 7)
RUN ./node_modules/.bin/prisma generate

# Expose port (matches docker-compose)
EXPOSE 8000

# Start application
CMD ["npm", "run", "dev"]