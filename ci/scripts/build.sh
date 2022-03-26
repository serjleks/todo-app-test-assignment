#!/usr/bin/env bash

echo "----------------------------------"
echo " Build app"
echo "----------------------------------"

set -e -u -x

# Build
yarn build:prod
