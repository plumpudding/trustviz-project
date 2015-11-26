#!/bin/bash
cd $(dirname $0)
rm -rf dump
mkdir dump && cd dump
#download dump
wget -c -r -p -e robots=off --timestamping --level=1 --cut-dirs=3 --no-host-directories http://keyserver.mattrude.com/dump/current/
cd ../
#convert dump to a gzipped json
python2 ./openpgp-python/openpgp.py data/*.pgp | gzip > all.json.gz
