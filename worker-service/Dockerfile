FROM node:23.0.0-alpine3.20 as build

WORKDIR /app
COPY package*.json ./
RUN npm ci --only-production && npm cache clean --force
COPY . .
RUN npm run build

FROM node:23.0.0-alpine3.20 AS production

WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
CMD ["node", "dist/main"]
