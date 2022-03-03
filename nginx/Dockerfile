FROM nginx

RUN rm /etc/nginx/conf.d/default.conf

COPY /conf /etc/nginx/conf.d
COPY /ssl/index.cert /etc/ssl/certs/index.cert
COPY /ssl/index.key /etc/ssl/private/index.key