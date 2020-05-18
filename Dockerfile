FROM alpine:3.11

RUN apk add --no-cache chromium npm ttf-freefont

ADD package.json /
RUN npm install

# Install Allure.
RUN npm install -g allure-commandline --save-dev

WORKDIR /app