FROM ubuntu:bionic

WORKDIR app
COPY . /app/

# 1. Install node12
RUN apt-get update && apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_12.x | bash - && \
    apt-get install -y nodejs

# 2. Install WebKit dependencies
RUN apt-get install -y libwoff1 \
                       libopus0 \
                       libwebp6 \
                       libwebpdemux2 \
                       libenchant1c2a \
                       libgudev-1.0-0 \
                       libsecret-1-0 \
                       libhyphen0 \
                       libgdk-pixbuf2.0-0 \
                       libegl1 \
                       libnotify4 \
                       libxslt1.1 \
                       libevent-2.1-6 \
                       libgles2 \
                       libvpx5

# 3. Install Chromium dependencies

RUN apt-get install -y libnss3 \
                       libxss1 \
                       libasound2 \
                       libgbm1

# 7. (Optional) Install XVFB if there's a need to run browsers in headful mode
RUN apt-get install -y xvfb

RUN npm install mocha
# Install Allure.
RUN apt-get update && apt-get install -y wget default-jdk && cd /opt && \
    (wget -c https://dl.bintray.com/qameta/generic/io/qameta/allure/allure/2.7.0/allure-2.7.0.tgz -O - | tar -xz && chmod +x allure-2.7.0/bin/allure)
ENV PATH="${PATH}:/opt/allure-2.7.0/bin"
RUN allure --version

RUN npm install mocha-allure-reporter
RUN npm install mocha-multi-reporters
