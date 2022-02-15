# syntax=docker/dockerfile:1

FROM node:16-alpine3.15 AS build
ADD https://github.com/grpc/grpc-web/releases/download/1.3.1/protoc-gen-grpc-web-1.3.1-linux-x86_64 /usr/local/bin/protoc-gen-grpc-web
RUN chmod 755 /usr/local/bin/protoc-gen-grpc-web
RUN apk add protoc \
&&  apk add protobuf-dev \
&&  apk add make \
&&  apk add g++ \
&&  apk add python3 \
&&  apk add bash
WORKDIR /usr/local/go
COPY --from=golang:1.17-alpine /usr/local/go ./
ENV GOPATH=/usr/local/go
ENV PATH=/usr/local/go/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
RUN go get -u github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-openapiv2
WORKDIR /app
COPY proto/ proto/
WORKDIR /app/math_ops_ui
COPY math_ops_ui/package.json math_ops_ui/yarn.lock ./
RUN yarn
COPY math_ops_ui/src/ src/
COPY math_ops_ui/public/ public/
RUN yarn build-proto
RUN yarn build

FROM nginx:alpine AS run
RUN apk add bash
WORKDIR /usr/share/nginx/html
COPY --from=build /app/math_ops_ui/build/ ./
COPY math_ops_ui/src/serve.sh /usr/local/bin/
ENV REST_BASE_URL=http://127.0.0.1:8000
ENV GRPC_WEB_URL=http://127.0.0.1:8051
EXPOSE 80
ENTRYPOINT ["/bin/bash", "/usr/local/bin/serve.sh"]
