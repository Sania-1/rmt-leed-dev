#!/bin/bash

#FCGI_PATH="127.0.0.1:9000"
FCGI_PATH="unix:/run/php/php5.6-fpm.sock"

# Which type of access you want to build? d - domain, a - alias
ACCESS_TYPE="d"

# domain name. regex supported. Single domain or multiple domains with space separated.
APP_DOMAIN_NAME="rmt-leed-dev.local"

### DONT EDIT BELOW ###

current_dir=$(pwd)
script_dir=$(dirname $0)

if [ $script_dir = '.' ]
then
script_dir="$current_dir"
fi

if [ $ACCESS_TYPE = "d" ]; then
	CONF_TO_USE="nginx.domain"
else
	CONF_TO_USE="nginx.alias"
fi

APP_FOLDER_PATH=`echo "$script_dir" | sed 's/\/data\/private$//'`
APP_FOLDER_NAME=`echo "$APP_FOLDER_PATH" | sed 's/.*\///'`
APP_ROOT=`echo "$APP_FOLDER_PATH" | sed "s/\/$APP_FOLDER_NAME$//"`

APP_CONF_TEMPLATE="$script_dir/$CONF_TO_USE.template"
APP_CONF_FILE="$script_dir/$CONF_TO_USE.conf"

cat "$APP_CONF_TEMPLATE" | sed -e 's|{APP_ALIAS_NAME}|'$APP_ALIAS_NAME'|g' -e 's|{APP_FOLDER_PATH}|'$APP_FOLDER_PATH'|g' -e 's|{FCGI_PATH}|'$FCGI_PATH'|g' -e 's|{APP_FOLDER_NAME}|'$APP_FOLDER_NAME'|g' -e 's|{APP_ROOT}|'$APP_ROOT'|g' -e 's|{APP_ERRORS}|'$APP_ERRORS'|g' > "$APP_CONF_FILE"

if [ $ACCESS_TYPE = "d" ]; then
	sed -i "s/{APP_DOMAIN_NAME}/$APP_DOMAIN_NAME/g" "$APP_CONF_FILE"
fi

clear

if [ $ACCESS_TYPE = "a" ]; then
echo "Nginx Alias configuration file created successfully.

You need to add the following line into your nginx default site
\"/etc/nginx/sites-enabled/default\" server loop, before the location loop

# $APP_ALIAS_NAME alias
include \"$APP_CONF_FILE\";

"
else
echo "Nginx Domain configuration file created successfully.

You need to create symbolic link to this generated file from your nginx sites-enabled folder.
To do this, execute the following command then test your server configurations. (sudo nginx -t)

sudo ln -s \"$APP_CONF_FILE\" /etc/nginx/sites-enabled/rmt-leed-dev.local.io.conf

"
fi
