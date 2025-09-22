FROM node:22-alpine3.21 AS build

ARG VITE_REACT_BACKEND_URL

ENV VITE_REACT_BACKEND_URL=$VITE_REACT_BACKEND_URL

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

RUN npm run build

FROM nginx:1.29.1-alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf *

COPY --from=build /app/dist .

EXPOSE 80

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]