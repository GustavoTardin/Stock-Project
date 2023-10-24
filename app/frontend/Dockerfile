FROM node:16.14.2

WORKDIR /app

COPY package*.json ./

RUN apt-get update && apt-get install -y lsof

RUN npm install

COPY . /frontend

EXPOSE 3000

ENTRYPOINT [ "npm", "run" ]

CMD [ "dev" ]


