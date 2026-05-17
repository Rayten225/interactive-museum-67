# 1. Этап сборки React-приложения
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. Этап раздачи статики через Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Заменяем стандартный конфиг Nginx на наш умный прокси
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
