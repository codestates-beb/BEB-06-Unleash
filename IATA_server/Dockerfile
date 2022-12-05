FROM node:lts

WORKDIR /modi

COPY package.json ./

RUN npm i 

COPY . .

EXPOSE 5002

CMD ["npm","start"]