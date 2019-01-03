FROM node:carbon

WORKDIR /usr/src/app

COPY . .

RUN npm i

RUN npx gulp build:production

RUN npx webpack --config library.webpack.config.js

RUN npx webpack

EXPOSE 3000

CMD [ "npm", "run", "start" ]
