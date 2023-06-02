FROM node:16-alpine
WORKDIR /app

ADD package.json .

RUN npm install --legacy-peer-deps

ADD infra /app

RUN npx nx build api

CMD ["npm", "start:dev"]