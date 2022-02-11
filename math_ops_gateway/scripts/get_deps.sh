#!/bin/sh

go get -u github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-grpc-gateway
go get -u github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-openapiv2
go get -u google.golang.org/protobuf/cmd/protoc-gen-go
go get -u google.golang.org/grpc/cmd/protoc-gen-go-grpc

#go get -u github.com/grpc-ecosystem/grpc-gateway/protoc-gen-grpc-gateway
#go get -u github.com/grpc-ecosystem/grpc-gateway/protoc-gen-swagger
#go get -u github.com/protobuf/protoc-gen-go

go get -u github.com/golang/glog
go get -u github.com/grpc-ecosystem/grpc-gateway/v2/runtime
go get -u google.golang.org/grpc
go get -u google.golang.org/grpc/credentials/insecure
