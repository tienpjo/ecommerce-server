#build stage
FROM node:18-alpine AS build

WORKDIR /tienpjo/server/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


#prod stage
FROM node:18-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /tienpjo/server/src/app

COPY --from=build /tienpjo/server/src/app/dist ./dist

COPY package*.json ./

RUN npm install --only=production

RUN rm package*.json

EXPOSE 8080

CMD [ "node", "dist/main.js" ]