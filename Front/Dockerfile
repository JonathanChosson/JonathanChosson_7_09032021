FROM vuejs/ci
ADD . /app/
WORKDIR /app
COPY package.json /app

RUN npm install
RUN npm install yarn

COPY . /app

EXPOSE 8080

CMD yarn serve