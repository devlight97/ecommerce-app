FROM node:lts

# WORKDIR /usr/src/ecommerce-app/auth-service
WORKDIR /usr/src/auth-service

ADD package*.json ./

# RUN npm install -g npm
RUN npm install

ADD . .

# RUN chown -R admin:admin /auth-service
# RUN chmod 755 /auth-service/
# USER root

EXPOSE 3000