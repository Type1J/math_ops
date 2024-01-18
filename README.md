# The `math_ops` service

## Purpose
This project was made to serve as a starting point for Rust gRPC services with:

* gRPC Reflection
* gRPC-Web
* JSON over HTTP (REST-like) API
* OpenAPI (Swagger)

All calls are defined in the proto directory in `.proto` files with extensions for the JSON over HTTP part of the API.

For fastest use, use a gRPC client generated for the programming language of your choice. If your app is in a browser, gRPC-Web is your fastest option. Use the JSON over HTTP API only if you must, but the Swagger UI is still a nice way to test.
