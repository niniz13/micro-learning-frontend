FROM node:18-alpine

WORKDIR /opt/micro_learning_front/

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 5173
ENTRYPOINT ["npm", "run", "dev", "--", "--host"]
