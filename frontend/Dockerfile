FROM node:22

WORKDIR /app

# Copy full package.json and package-lock.json
COPY frontend/package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install --legacy-peer-deps

# Copy rest of the frontend files
COPY frontend/ ./

# Install vite globally (optional if you run it via npm script)
RUN npm install -g vite

# Expose Vite dev server port
EXPOSE 5173

# Start Vite dev server listening on all interfaces


CMD ["sh", "-c", "npm run dev -- --host 0.0.0.0"]