# 1. Этап сборки (используем образ с Go 1.24)
FROM golang:1.24-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
# Собираем бинарник
RUN go build -o museum-backend cmd/app/main.go

# 2. Финальный этап (оставляем только собранный файл для легкости)
FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/museum-backend .

EXPOSE 8081
CMD ["./museum-backend"]
