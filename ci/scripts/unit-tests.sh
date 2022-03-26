#!/usr/bin/env bash

echo "----------------------------------"
echo " Unit tests"
echo "----------------------------------"

set -e -u -x

# Run unit tests
yarn test:unit;
