

FROM node:22 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 用 nginx 部署静态页面
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80