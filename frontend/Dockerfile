FROM node:22 AS build
WORKDIR /app

# Copy package files first for caching
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy rest of the frontend source code
COPY . .

# Build production files
RUN npm run build

# Copy build output to shared volume for Nginx
CMD ["sh", "-c", "cp -r dist/* /frontend_build && echo 'Frontend build copied' && tail -f /dev/null"]
