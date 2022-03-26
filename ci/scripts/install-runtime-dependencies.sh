#!/usr/bin/env bash

echo "----------------------------------"
echo " Install runtime dependencies"
echo "----------------------------------"

set -e -u -x

# Install production dependencies
yarn workspaces focus --all --production
