FROM  node:16-alpine3.11

WORKDIR /app
COPY package.json ./
RUN npm install\ 
    npm install typescript -g
COPY . .
RUN tsc --build
CMD ["node", "./dist/index.js"]