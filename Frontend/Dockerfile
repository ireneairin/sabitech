FROM node:22 AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM php:8.4-apache-bookworm

RUN a2enmod rewrite

COPY docker/apache/000-default.conf /etc/apache2/sites-available/000-default.conf
COPY --from=build /app/dist /var/www/html/dist

WORKDIR /var/www/html