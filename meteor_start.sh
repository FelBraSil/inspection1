#!/bin/sh

PORT=3000
#OUTPUT=$(hostname)
OUTPUT=$(ip route get 8.8.8.8 | awk -F"src " 'NR==1{split($2,a," ");print a[1]}')
echo "${OUTPUT}"
# Append the domain name
HOSTNAME="${OUTPUT}"
echo "Hostname:      $HOSTNAME"
#HOSTNAME="localhost"
# Start Meteor
ROOT_URL=http://${HOSTNAME}:${PORT}/ meteor run
