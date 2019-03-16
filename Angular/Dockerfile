# The builder from node image
FROM node:alpine as builder

# build-time variables 
# prod|sandbox its value will be come from outside 

RUN apk update && apk add --no-cache make git

# Move our files into directory name "app"
WORKDIR /Angular
COPY package.json package-lock.json  /Angular/
RUN npm install @angular/cli@6.0.8 -g
RUN cd /Angular && npm install
COPY .  /Angular

RUN cd /Angular && npm run build

