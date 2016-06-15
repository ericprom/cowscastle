#!/bin/bash

export NVM_DIR="/root/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm

nvm use v5.5.0
cd ../app
meteor build --release --directory ../build
cd ../build/bundle/programs/server
npm install
