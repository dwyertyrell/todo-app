FROM node:20-alpine AS builder

WORKDIR /app
COPY package.json ./
RUN npm cache clean --force
RUN npm install
RUN npm rebuild esbuild
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80