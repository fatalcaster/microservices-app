FROM  node:latest

WORKDIR /app
COPY package.json ./
RUN npm install\ 
    npm install typescript -g
COPY ./ ./
RUN tsc --build
CMD ["node", "./dist/index.js"]