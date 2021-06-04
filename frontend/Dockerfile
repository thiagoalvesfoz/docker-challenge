FROM node:15-alpine

WORKDIR /usr/src/app

RUN apk add bash

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "index.js"]
