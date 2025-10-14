FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

# No copiamos el código fuente aquí porque se montará como volumen
EXPOSE 3000

CMD ["npm", "start"]
