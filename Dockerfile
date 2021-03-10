FROM node:8.15-alpine

RUN mkdir /app
WORKDIR /app

# install app dependencies
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
RUN yarn install

COPY . /app/

# start app
CMD ["yarn", "server"]
