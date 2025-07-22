FROM node:22

WORKDIR /app

COPY frontend/package*.json ./
RUN npm install --legacy-peer-deps

COPY frontend/ ./

EXPOSE 5173

# CMD ["sh", "-c", "npm run dev -- --host 0.0.0.0"]
CMD ["npx", "vite", "--host", "0.0.0.0"]