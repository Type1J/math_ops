# syntax=docker/dockerfile:1

FROM rust:alpine3.15 AS build
RUN apk add musl-dev \
&&  apk add protoc \
&&  apk add protobuf-dev \
&&  rustup component add rustfmt
WORKDIR /app
COPY proto/ ./proto/
RUN USER=root cargo new math_ops_service
WORKDIR /app/math_ops_service
COPY math_ops_service/Cargo.toml math_ops_service/Cargo.lock ./
RUN cargo build --color always --release
COPY math_ops_service/build.rs ./
COPY math_ops_service/src/ ./src/
RUN cargo build --color always --release

FROM alpine:3.15 AS run
WORKDIR /app
COPY --from=build /app/math_ops_service/target/release/math_ops_service ./
ENV PORT=8051
EXPOSE 8051
ENTRYPOINT ["/app/math_ops_service"]
