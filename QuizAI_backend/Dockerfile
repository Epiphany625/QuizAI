FROM node:22

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# 建议你的 server.js 使用 0.0.0.0
CMD ["node", "server.js"]
EXPOSE 3000