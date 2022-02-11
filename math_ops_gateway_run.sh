#!/bin/bash
docker run -it --rm -p 8000:8000 -e UPSTREAM_HOST=k8s-local math_ops_gateway:latest
