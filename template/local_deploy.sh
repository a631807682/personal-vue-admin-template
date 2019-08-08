#!/bin/sh

deployPath="/data/www/crack-detection"
newPath="/data/www/dist"
tmpPath="/tmp/crack-detection-old"

if [ -d "${newPath}" ]; then
  if [ -d "${deployPath}" ]; then
     rsync -a $deployPath $tmpPath
     rm -rf $deployPath
  fi
  mv $newPath $deployPath
  echo "success"
else
  echo "${newPath} is empty"
fi

