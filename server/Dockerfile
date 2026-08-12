FROM node:24

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY prisma ./prisma

RUN npx prisma generate

COPY src ./src
COPY scripts ./scripts

EXPOSE 3000

CMD ["npm", "start"]