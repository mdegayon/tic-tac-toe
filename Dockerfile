FROM node:20.17.0-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install -g npm@latest && npm install

# Wont' be copyin code src since it will be mount as a volume in docker-compose
EXPOSE 3000

# Replaced by 'command' in docker-compose file
#CMD ["npm", "start"]
