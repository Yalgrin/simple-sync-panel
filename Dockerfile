FROM node:26-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY public/ ./public/
COPY scripts/ ./scripts/
COPY src/ ./src/
COPY index.html *.js *.ts *.json ./
RUN npm run build

FROM nginx:stable-alpine

COPY deploy/nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

ENV SIMPLE_SYNC_SERVER_URL=http://localhost:46232
ENV SYNC_SERVER_PANEL_MAX_FILE_SIZE=100m

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]