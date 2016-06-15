#!/bin/bash
cd ../app
meteor build --debug --setting=settings.json --directory ../build
