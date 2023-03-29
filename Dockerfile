FROM node:latest

WORKDIR /app

COPY .env ./

RUN sed -i "s/PROD=0/PROD=1/g" ./.env


RUN npm install pm2 -g
RUN npm install -g pnpm

COPY package*.json ./
RUN pnpm install

COPY src src
COPY ecosystem.config.js ./
COPY nest-cli.json ./
COPY tsconfig.json ./

RUN pnpm run build

RUN rm -rf src
RUN rm -rf tsconfig.json
RUN rm nest-cli.json

EXPOSE 8000/TCP

CMD pm2 start ecosystem.config.js && pm2 monit
