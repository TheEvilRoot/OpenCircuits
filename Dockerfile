# Dockerfile

# Use official node.js v8 image
FROM node:8

# Create work directory
WORKDIR /www

# Copy repo to work directory
COPY .babelrc gulpfile.babel.js package.json package-lock.json /www/
COPY site /www/site
COPY tests /www/tests

# Avoid error
RUN sed -i "s/^exit 101$/exit 0/" /usr/sbin/policy-rc.d

# Install dependencies
RUN apt-get update && apt-get install -y php5 php5-sqlite
RUN npm install gulp-cli -g
RUN npm install gulp -D
RUN npm install

# Build gulp
RUN gulp build

# Change work directory for running php
WORKDIR /www/site/public

# Command to run at start of container 
CMD php -S 0.0.0.0:8080
