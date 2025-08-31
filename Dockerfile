FROM node:24.0.2-alpine 

WORKDIR /app

COPY ./web /app

COPY package*.json .

RUN npm install

CMD ["npm", "run", "dev"]


