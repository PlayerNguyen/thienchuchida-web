FROM node:12-slim

# Create app directory
WORKDIR /usr/src/app/client

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

#RUN yarn install --production
RUN yarn install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3001

CMD [ "yarn", "start" ]