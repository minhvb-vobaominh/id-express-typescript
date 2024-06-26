FROM debian:11.6-slim

RUN apt update
RUN apt install curl unzip -y

RUN curl https://bun.sh/install | bash

WORKDIR /www

ARG SERVICE_NAME
ARG SERVICE_PORT

COPY node_modules node_modules

COPY dist/apps/${SERVICE_NAME} ./dist/apps

ENV NODE_ENV production

EXPOSE ${SERVICE_PORT}

CMD /root/.bun/bin/bun dist/apps/${SERVICE_NAME}/main.js