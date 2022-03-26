#!/usr/bin/env bash

echo "----------------------------------"
echo " Run app"
echo "----------------------------------"

set -e -u -x

# Run static server
PORT=${STATIC_SERVER_PORT} yarn server
