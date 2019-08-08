#!/bin/sh

deployPath="/data/www/template"
newPath="/data/www/dist"
tmpPath="/tmp/template-old"

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

