FROM node:latest

WORKDIR /app

RUN npm install pm2 -g

copy . .

EXPOSE 8000/TCP

