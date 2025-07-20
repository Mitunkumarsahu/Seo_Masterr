FROM node:22

WORKDIR /app

COPY frontend/package*.json ./
RUN npm install --legacy-peer-deps

RUN npm install -g vite

COPY frontend/ ./

EXPOSE 5173

CMD ["sh", "-c", "npm run dev -- --host 0.0.0.0"]