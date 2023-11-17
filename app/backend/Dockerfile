FROM node:16.14-alpine

WORKDIR /

COPY package* ./

RUN npm install

COPY . .

EXPOSE 3009

ENTRYPOINT [ "npm", "run" ]
CMD [ "dev" ]
