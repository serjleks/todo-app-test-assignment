# ------------------------------------------------------------------------------
# Sources
# ------------------------------------------------------------------------------
FROM node:16-alpine as sources

COPY . /usr/todo-app

# ------------------------------------------------------------------------------
# Dependencies manifest
# ------------------------------------------------------------------------------
FROM node:16 as manifest-dependencies

WORKDIR /usr/todo-app

COPY ci/scripts ./ci/scripts

COPY .yarn .yarn
COPY .yarnrc.yml .
COPY yarn.lock .
COPY package.json .

# ------------------------------------------------------------------------------
# Install builder-dependencies
# ------------------------------------------------------------------------------
FROM manifest-dependencies as builder-dependencies

WORKDIR /usr/todo-app

# Install build dependencies
RUN ci/scripts/install-dependencies.sh

# ------------------------------------------------------------------------------
# Build app
# ------------------------------------------------------------------------------
FROM node:16 as builder

COPY --from=sources /usr/todo-app /usr/todo-app
COPY --from=builder-dependencies /usr/todo-app /usr/todo-app/

WORKDIR /usr/todo-app

# Build production app
RUN ci/scripts/build.sh

WORKDIR /

RUN tar -cvf todo-app.tar \
	--exclude="/usr/todo-app/.yarn/cache" \
	--exclude="/usr/todo-app/node_modules" \
	/usr/todo-app/

# ------------------------------------------------------------------------------
# Install runtime-dependencies
# ------------------------------------------------------------------------------
FROM manifest-dependencies as runtime-dependencies

WORKDIR /usr/todo-app

# Install production dependencies
RUN ci/scripts/install-runtime-dependencies.sh

# ------------------------------------------------------------------------------
# Base
# ------------------------------------------------------------------------------
FROM node:16-alpine as runtime-base

RUN apk add --no-cache bash

# ------------------------------------------------------------------------------
# Server
# ------------------------------------------------------------------------------
FROM runtime-base as runtime-server
MAINTAINER Sergei Aleksandrov <sergei.a.aleks@gmail.com>

ENV STATIC_SERVER_PORT 80

WORKDIR /

# Copy server files
COPY --from=builder todo-app.tar .
RUN tar -xvf todo-app.tar

# Copy runtime dependencies
COPY --from=runtime-dependencies /usr/todo-app /usr/todo-app

WORKDIR /usr/todo-app

EXPOSE ${STATIC_SERVER_PORT}

# Start server
CMD PORT=${STATIC_SERVER_PORT} ci/scripts/run-static-server.sh
