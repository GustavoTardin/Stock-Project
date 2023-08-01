FROM node:16-alpine3.11

WORKDIR /app

COPY . .

RUN ["npm", "install"]

RUN chown node:node /app

USER node

EXPOSE 3001

ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]

