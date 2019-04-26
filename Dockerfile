FROM node:10.13-alpine
ENV NODE_ENV production
# WORKDIR specifies the directory our
# application's code will live within
WORKDIR /app
# We copy our package.json file to our
# app directory
COPY package.json /app
# We then run npm install to install
# express for our application
RUN npm install -g yarn
RUN yarn install
# We then copy the rest of our application
# to the app direcoty
COPY . /app
# We start our application by calling
# npm start.
CMD ["npm", "start"]