FROM node:18-alpine
WORKDIR /recipewebsite
#COPY package.json package-lock.json ./
COPY package.json ./
RUN apk add vim --update --no-cache --quiet
RUN apk add bash --update --no-cache --quiet
RUN apk add npm --update --no-cache --quiet
RUN apk add python3 --update --no-cache --quiet && ln -sf python3 /usr/bin/python
RUN apk add curl --no-cache --quiet
# RUN npm i -g npm
RUN npm install -g @angular/cli
RUN npm install -g firebase-tools
RUN npm i
#RUN npm uninstall @angular-devkit/build-angular
#RUN npm install --save-dev @angular-devkit/build-angular
EXPOSE 9005
EXPOSE 4200
COPY . .
