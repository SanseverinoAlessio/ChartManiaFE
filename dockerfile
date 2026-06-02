FROM node:24 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG VITE_API_URL=APP_PREFIX_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

FROM nginx:alpine

RUN apk add --no-cache dos2unix

COPY --from=build /app/dist /usr/share/nginx/html

COPY env.sh /docker-entrypoint.d/40-env.sh
RUN dos2unix /docker-entrypoint.d/40-env.sh
RUN chmod +x /docker-entrypoint.d/40-env.sh

EXPOSE 80