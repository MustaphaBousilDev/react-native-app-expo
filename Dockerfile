FROM node:18-alpine

RUN apk add --no-cache bash git openssh python3 make g++ curl

WORKDIR /app

RUN npm install -g expo-cli eas-cli

COPY package.json package-lock.json* ./

RUN npm ci --force

COPY . .

EXPOSE 19000 19001 19002 19006 8081

ENV NODE_ENV=development

CMD ["npm", "start"]