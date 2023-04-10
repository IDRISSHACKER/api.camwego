FROM node:latest

WORKDIR /app

COPY .env ./

RUN npm install pm2 -g
RUN npm install -g pnpm

COPY package*.json ./
RUN pnpm install

copy . .

RUN pnpm run build

RUN rm -rf src
RUN rm -rf tsconfig.json
RUN rm nest-cli.json

EXPOSE 8000/TCP

CMD pm2 start ecosystem.config.js && pm2 monit
