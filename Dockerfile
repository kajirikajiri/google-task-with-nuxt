FROM node:latest

WORKDIR /app

RUN apt-get update && \
    npm install -g npm && \
    npm install -g @vue/cli && \
    npm install -g @vue/cli-init

RUN npm i

EXPOSE 3000
CMD npm run dev