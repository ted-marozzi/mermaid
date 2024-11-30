#!/bin/sh

npm version prerelease
pnpm i
pnpm -w build
npm publish --access public
