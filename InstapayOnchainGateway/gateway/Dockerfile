FROM node

MAINTAINER Shain Lafazan

RUN apt-get update
RUN mkdir /app

ADD . ./app

WORKDIR /app

RUN yarn setup
RUN yarn global add nodemon

CMD yarn migrate && yarn start
