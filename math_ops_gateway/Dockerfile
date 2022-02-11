# syntax=docker/dockerfile:1

FROM golang:1.17-alpine AS build
RUN apk add protoc \
&&  apk add protobuf-dev \
&&  go get -u github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-grpc-gateway \
&&  go get -u github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-openapiv2 \
&&  go get -u google.golang.org/protobuf/cmd/protoc-gen-go \
&&  go get -u google.golang.org/grpc/cmd/protoc-gen-go-grpc \
&&  go get -u github.com/golang/glog \
&&  go get -u github.com/grpc-ecosystem/grpc-gateway/v2/runtime \
&&  go get -u google.golang.org/grpc \
&&  go get -u google.golang.org/grpc/credentials/insecure
WORKDIR /app
COPY proto/ proto/
WORKDIR /app/math_ops_gateway
COPY math_ops_gateway/go.mod math_ops_gateway/go.sum ./
RUN go mod download
COPY math_ops_gateway/boilerplate/ boilerplate/
COPY math_ops_gateway/*.go ./
RUN mkdir -p math_ops \
&&  protoc -I../proto --go_out ./math_ops --go_opt paths=source_relative --go-grpc_out ./math_ops --go-grpc_opt paths=source_relative --grpc-gateway_out ./math_ops --grpc-gateway_opt logtostderr=true --grpc-gateway_opt paths=source_relative --openapiv2_out ./boilerplate/third_party/OpenAPI --openapiv2_opt logtostderr=true math_ops.proto
RUN go build

FROM alpine:3.15 AS run
WORKDIR /app
COPY --from=build /app/math_ops_gateway/math_ops_gateway ./
ENV UPSTREAM_HOST=127.0.0.1
ENV UPSTREAM_PORT=8051
ENV PORT=8000
EXPOSE 8000
ENTRYPOINT ["/app/math_ops_gateway"]
