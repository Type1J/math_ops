# syntax=docker/dockerfile:1

FROM docker.io/golang:1.19-alpine AS build
RUN apk add protoc \
&&  apk add protobuf-dev
RUN go install github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-grpc-gateway@latest \
&&  go install github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-openapiv2@latest \
&&  go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest \
&&  go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
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

FROM docker.io/alpine:3.19 AS run
WORKDIR /app
COPY --from=build /app/math_ops_gateway/math_ops_gateway ./
ENV UPSTREAM_HOST=127.0.0.1
ENV UPSTREAM_PORT=8051
ENV PORT=8000
EXPOSE 8000
ENTRYPOINT ["/app/math_ops_gateway"]
