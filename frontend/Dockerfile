FROM node:22

# Set working directory
WORKDIR /app

ENV NODE_ENV=development

# Copy package files and install dependencies
# COPY frontend/package*.json ./
COPY frontend/package.json ./

COPY frontend/package-lock.json ./

RUN npm install --legacy-peer-deps

# Copy the rest of the frontend code
COPY frontend/ ./

# Expose Vite's default port
EXPOSE 5173

# Run the development server using local vite from node_modules
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
