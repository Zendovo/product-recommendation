FROM node:20-alpine

# create folder
RUN mkdir -p /home/node/app/node_modules

# set workdir
WORKDIR /home/node/app

# copy package.json and install dependencies
COPY package.json ./
RUN npm install

# copy app files
COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]