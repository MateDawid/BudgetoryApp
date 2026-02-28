FROM node:20-bookworm-slim AS base-image

WORKDIR /app

ENV PATH=/app/node_modules/.bin:$PATH

# Install app dependencies
COPY ../package.json .
COPY ../yarn.lock .
RUN yarn install --production
RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

# Copy app
COPY .. .

FROM base-image AS local-image

EXPOSE 3000
CMD ["yarn", "start"]

FROM base-image AS build-image

ARG REACT_APP_BACKEND_URL
ARG REACT_APP_ACCESS_TOKEN_LIFETIME
ARG REACT_APP_REFRESH_TOKEN_LIFETIME

ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
ENV REACT_APP_ACCESS_TOKEN_LIFETIME=$REACT_APP_ACCESS_TOKEN_LIFETIME
ENV REACT_APP_REFRESH_TOKEN_LIFETIME=$REACT_APP_REFRESH_TOKEN_LIFETIME

RUN yarn build

FROM nginx:stable-alpine AS release-image

COPY --from=build-image /app/build /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]