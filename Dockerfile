FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Build production
RUN npm run build

EXPOSE 8000

# Chạy server production (vite preview)
CMD ["npx", "vite", "preview", "--host"]
