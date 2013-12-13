#!/bin/bash
./burst.js $1
./configure.sh
./enable.js $1
./listNodes.js