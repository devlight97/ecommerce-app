FROM node:latest

WORKDIR /var/www/e-commerce-app/streaming

ADD package*.json ./

RUN npm install
RUN npm audit fix

ADD . .

EXPOSE 3030
