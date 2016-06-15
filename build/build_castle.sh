#!/bin/bash

export NVM_DIR="/root/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm

nvm use v0.10.41
cd ../app
meteor build --debug --directory ../build
cd ../build/bundle/programs/server
npm install
