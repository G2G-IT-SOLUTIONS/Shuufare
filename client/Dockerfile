FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

FROM node:24-alpine
WORKDIR /app
COPY --from=builder /app/dist /app/dist
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "80"]