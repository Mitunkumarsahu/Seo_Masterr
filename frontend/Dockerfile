FROM node:22

WORKDIR /app

# Step 1: Copy only package.json and package-lock.json
COPY frontend/package*.json ./

# Step 2: Install dependencies (dev included)
RUN npm install --legacy-peer-deps

# Step 3: Copy the rest of your frontend app
COPY frontend/ ./

# Optional: install Vite globally (you don't need this unless you want to run vite directly)
RUN npm install -g vite

# Step 4: Expose Vite's default port
EXPOSE 5173



CMD ["sh", "-c", "npm run dev"]