FROM node:latest

WORKDIR /var/www/ecommerce-app/auth-service

COPY package.json ./

# RUN npm cache clean --force
RUN npm install
RUN npm audit fix -f

COPY . .

EXPOSE 3000