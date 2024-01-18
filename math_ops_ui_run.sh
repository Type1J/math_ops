#!/bin/bash
ip_address=$(hostname -I | awk '{print $1}')
docker run \
  -it --rm \
  -p 8042:80 \
  -e REST_BASE_URL=http://$ip_address:8000 \
  -e GRPC_WEB_URL=http://$ip_address:8051 \
  math_ops_ui:latest
