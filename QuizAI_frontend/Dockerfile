FROM node:22

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 构建出的 dist/ 或 build/ 就是 Chrome 插件