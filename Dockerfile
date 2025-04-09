FROM node:20-alpine

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

EXPOSE 8080

# Chạy server production (vite preview)
CMD [ "npm", "run", "dev"]
