# syntax=docker/dockerfile:1

FROM docker.io/node:20 AS build

#RUN apk add bash \
#&&  apk add curl \
#&&  apk add g++ \
#&&  apk add make \
#&&  apk add protoc \
#&&  apk add protobuf-dev \
#&&  apk add python3 \
#&&  apk add tar
RUN apt update
RUN apt install -y \
    build-essential \
    curl \
    protobuf-compiler \
    python3
RUN curl -sLo /usr/local/bin/protoc-gen-grpc-web https://github.com/grpc/grpc-web/releases/download/1.3.1/protoc-gen-grpc-web-1.3.1-linux-x86_64 \
&&  chmod 755 /usr/local/bin/protoc-gen-grpc-web
RUN npm install -g protoc-gen-js
WORKDIR /usr/local/go
COPY --from=docker.io/golang:1.19 /usr/local/go ./
ENV GOBIN=/usr/local/go/bin
ENV PATH=/usr/local/go/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
RUN go install github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-openapiv2@latest
WORKDIR /app
COPY proto/ proto/
WORKDIR /app/math_ops_ui
COPY math_ops_ui/package.json math_ops_ui/yarn.lock math_ops_ui/tsconfig.json ./
RUN yarn
COPY math_ops_ui/src/ src/
COPY math_ops_ui/public/ public/
RUN yarn build-proto
RUN yarn build

FROM docker.io/nginx:alpine AS run
RUN apk add bash
WORKDIR /usr/share/nginx/html
COPY --from=build /app/math_ops_ui/build/ ./
COPY math_ops_ui/src/serve.sh /usr/local/bin/
ENV REST_BASE_URL=http://127.0.0.1:8000
ENV GRPC_WEB_URL=http://127.0.0.1:8051
EXPOSE 80
ENTRYPOINT ["/bin/bash", "/usr/local/bin/serve.sh"]
