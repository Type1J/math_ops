# The `math_ops` service

## Purpose
This project was made to serve as a starting point for Rust gRPC services with:

* gRPC Reflection
* gRPC-Web
* JSON over HTTP (REST-like) API
* OpenAPI (Swagger)

All calls are defined in the proto directory in `.proto` files with extensions for the JSON over HTTP part of the API.

For fastest use, use a gRPC client generated for the programming language of your choice. If your app is in a browser, gRPC-Web is your fastest option. Use the JSON over HTTP API only if you must, but the Swagger UI is still a nice way to test.

## Notes
The `math_ops_<something>_run.sh` files assume that a `k8s-local` hostname is either in the `hosts` file for the machine on which it's running (or set through DNS somehow). If running on localhost is desirable, then those files mush be modifed before running them. (Windows WSL2 has a non-localhost network interface (see output of `ipconfig` on Windows, and look for the WSL2 interface's IP) that is used when running Linux Docker containers, but uses the actual localhost loopback interface when running Windows containers.)
