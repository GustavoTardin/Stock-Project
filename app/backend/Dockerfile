FROM node:16.14

WORKDIR /

COPY package*.json ./

RUN apt-get update && apt-get install -y lsof

RUN npm install

COPY  . /backend

EXPOSE 3009

ENTRYPOINT [ "npm", "run" ]
CMD [ "dev" ]

