#!/usr/bin/env bash

echo "----------------------------------"
echo " Install Dependencies"
echo "----------------------------------"

set -e -u -x

# Install dependencies (ci mode)
yarn install --immutable;
