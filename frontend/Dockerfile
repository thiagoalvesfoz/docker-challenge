FROM node:15-alpine

WORKDIR /usr/src/app

RUN apk add bash

COPY . .

RUN npm install

CMD ["node", "index.js"]
