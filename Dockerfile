FROM node:latest

WORKDIR /app

COPY .env ./

RUN npm install pm2 -g

copy . .

RUN pnpm run build


EXPOSE 8000/TCP

