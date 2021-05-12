FROM node:16.0.0 as builder
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY . .
USER root
RUN ls
RUN yarn
RUN yarn build
ENV PORT=$PORT
ENV NODE_ENV=$NODE_ENV
ENV MONGO_URL=$MONGO_URL
EXPOSE 30001
RUN echo $(ls -1 .)
CMD [ "node","dist/index" ]
RUN echo "Finished building docker"