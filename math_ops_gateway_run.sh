#!/bin/bash
ip_address=$(hostname -I | awk '{print $1}')
docker run -it --rm -p 8000:8000 -e UPSTREAM_HOST=$ip_address math_ops_gateway:latest
