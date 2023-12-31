FROM node:18-slim AS deps

RUN apt-get update -y && apt-get install -y openssl libc6

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma/schema.prisma ./prisma/schema.prisma
RUN npm run db:generate

FROM node:18-slim as build

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY src ./src

RUN npm run build

FROM node:18-slim as prod

RUN apt-get update -y && apt-get install -y openssl libc6

ENV NODE_ENV production

WORKDIR /app

COPY package*.json ./
COPY .env ./
COPY prisma ./prisma
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

EXPOSE 8080

ENV PORT 8080

CMD ["sh", "-c", "npm run prod"]

FROM node:18-slim as dev

RUN apt-get update -y && apt-get install -y openssl libc6

ENV NODE_ENV development

COPY --from=deps /app/node_modules ./node_modules

WORKDIR /app

COPY package.json ./

CMD ["sh", "-c", "npm run dev"]
