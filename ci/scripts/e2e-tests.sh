#!/usr/bin/env bash

echo "----------------------------------"
echo " E2E tests"
echo "----------------------------------"

set -e -u -x

# Run unit tests
yarn test:e2e;
