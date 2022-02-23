FROM node:16.13-bullseye

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

ENTRYPOINT [ "node", "server.js" ]