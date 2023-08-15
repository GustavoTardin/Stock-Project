FROM node:16-alpine3.11

WORKDIR /

COPY package*.json ./
RUN npm install

COPY . .

RUN chown node:node ./

USER node

EXPOSE 3009

ENTRYPOINT [ "npm", "run" ]
CMD [ "dev" ]

