FROM node:16.14.2-alpine

WORKDIR /app

COPY .env ./

COPY package*.json ./

COPY backend ./backend/

COPY frontend ./frontend/

RUN npm install --production && cd frontend && npm install --production && npm run build

EXPOSE 5001

CMD ["node", "backend/server.js"]
