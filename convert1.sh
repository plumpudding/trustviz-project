#!/bin/bash
cd $(dirname $0)
rm -rf out
mkdir out
gzip -d all.json.gz | node trustviz1.js
