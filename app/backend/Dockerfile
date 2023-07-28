FROM node:16-alpine3.11

WORKDIR /app

RUN npm install

COPY . .

RUN chown node:node /app

USER node

EXPOSE 3001

ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]

