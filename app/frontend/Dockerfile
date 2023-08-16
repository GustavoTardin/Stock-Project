FROM node:16.14-alpine

WORKDIR /

COPY package* ./

RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT [ "npm", "run" ]

CMD [ "dev" ]       