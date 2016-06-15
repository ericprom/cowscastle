#!/bin/bash
cd ../app
meteor build --production --setting=settings.json --directory ../build
