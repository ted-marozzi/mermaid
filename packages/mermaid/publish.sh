#!/bin/sh

npm version prerelease
pnpm -w build:mermaid
npm publish --access public
