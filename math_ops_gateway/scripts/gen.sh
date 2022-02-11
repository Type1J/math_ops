#!/bin/sh
mkdir math_ops
echo "Generating Reverse Proxy . . ."
protoc -I../proto --go_out ./math_ops --go_opt paths=source_relative --go-grpc_out ./math_ops --go-grpc_opt paths=source_relative --grpc-gateway_out ./math_ops --grpc-gateway_opt logtostderr=true --grpc-gateway_opt paths=source_relative --openapiv2_out ./boilerplate/third_party/OpenAPI --openapiv2_opt logtostderr=true math_ops.proto
echo "Done."
