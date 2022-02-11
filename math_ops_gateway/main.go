package main

import (
	"io/ioutil"
	"os"

	"google.golang.org/grpc/grpclog"

	"math_ops_gateway.com/math_ops_gateway/boilerplate/gateway"
)

func main() {
	log := grpclog.NewLoggerV2(os.Stdout, ioutil.Discard, ioutil.Discard)
	grpclog.SetLoggerV2(log)

	upstreamHost := os.Getenv("UPSTREAM_HOST")
	if upstreamHost == "" {
		upstreamHost = "0.0.0.0"
	}
	upstreamPort := os.Getenv("UPSTREAM_PORT")
	if upstreamPort == "" {
		upstreamPort = "8051"
	}
	err := gateway.Run("dns:///" + upstreamHost + ":" + upstreamPort)
	log.Fatalln(err)
}
