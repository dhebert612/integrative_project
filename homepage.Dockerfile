FROM node:20-alpine

WORKDIR /app

COPY homepage/package*.json ./
RUN npm ci --omit=dev

COPY homepage/* ./

USER node

EXPOSE 3001

CMD ["node", "server.js"]