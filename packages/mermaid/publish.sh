#!/bin/sh

npm version prerelease
pnpm i
pnpm -w build:mermaid
npm run lint:types
npm publish --access public
