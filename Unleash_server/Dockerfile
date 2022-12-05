FROM node:lts

WORKDIR /modi

COPY package.json ./

RUN npm i 

COPY . .

EXPOSE 5001

CMD ["npm","start"]