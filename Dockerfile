# FROM node:19.9.0 as build

# ARG environment=docker
# WORKDIR /usr/src/app
# COPY package.json package-lock.json ./
# RUN npm install
# COPY . .
# RUN npm install -g @angular/cli@16.2.6
# RUN ng build --configuration $environment

# FROM nginx:1.17-alpine

# COPY nginx.conf /etc/nginx/nginx.conf
# COPY --from=build /usr/src/app/dist/frontend-tinder /usr/share/nginx/html

FROM --platform=linux/x86_64 nginx:1.17-alpine

EXPOSE 80

VOLUME /tmp

ARG DIST_DIR=dist/frontend-tinder
COPY nginx.conf /etc/nginx/nginx.conf
COPY ${DIST_DIR} /usr/share/nginx/html
