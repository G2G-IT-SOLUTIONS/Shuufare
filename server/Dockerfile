FROM node:24

WORKDIR /app

COPY package*.json ./
COPY .env ./

RUN npm ci

COPY prisma ./prisma

RUN npx prisma generate

COPY src ./src
COPY scripts ./scripts

RUN mkdir -p uploads

EXPOSE 3000
CMD ["npm", "start"]