FROM node:16.14.2-alpine

WORKDIR /app

COPY . .

COPY package*.json ./

RUN npm install

ENV MONGO_URI mongodb+srv://hank:escanor77%40@cluster0.n62c5un.mongodb.net/
ENV PORT 5001
ENV JWT_SECRET verysecret

EXPOSE 5001

CMD ["node", "server.js"]
