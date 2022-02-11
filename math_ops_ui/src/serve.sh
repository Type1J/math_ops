#!/bin/bash

echo "{"                               > /usr/share/nginx/html/urls.json
echo "  \"grpc\": \"$GRPC_WEB_URL\"," >> /usr/share/nginx/html/urls.json
echo "  \"rest\": \"$REST_BASE_URL\"" >> /usr/share/nginx/html/urls.json
echo "}"                              >> /usr/share/nginx/html/urls.json

/usr/sbin/nginx -g "daemon off;"
