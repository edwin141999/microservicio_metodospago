FROM node:16-alpine
WORKDIR /app

RUN apk update
RUN apk add git bash
RUN git clone https://github.com/edwin141999/microservicio_metodospago.git

COPY package*.json microservicio_metodospago/
COPY prisma microservicio_metodospago/prisma
COPY .env microservicio_metodospago/

RUN cd microservicio_metodospago && npm install && npx prisma generate

EXPOSE 5000

RUN apk add psmisc

CMD cd microservicio_metodospago && npm start