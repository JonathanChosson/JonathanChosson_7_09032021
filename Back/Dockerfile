FROM node
ADD . /app/
WORKDIR /app
COPY package.json /app

RUN npm install
RUN npm install nodemon

COPY . /app

EXPOSE 3000

CMD npm start