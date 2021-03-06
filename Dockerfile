FROM node:12.6.0

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json /usr/src/app/
RUN npm ci

# Copy App
COPY . /usr/src/app/

CMD [ "npm", "run","start" ]