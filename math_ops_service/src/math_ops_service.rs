use tonic::{Request, Response, Status};

use crate::math_ops::{math_ops_server::MathOps, MathOpArgs, MathOpResult};

#[derive(Debug, Default)]
pub struct MathOpsService {}

#[tonic::async_trait]
impl MathOps for MathOpsService {
    async fn add(&self, request: Request<MathOpArgs>) -> Result<Response<MathOpResult>, Status> {
        println!("{:?}", request);

        let args = request.into_inner();
        let output = args.a + args.b;
        let response = Response::new(MathOpResult {
            output,
            reply: format!("{} + {} = {}", args.a, args.b, output),
            error: false,
        });

        println!("{:?}", response);

        Ok(response)
    }

    async fn subtract(
        &self,
        request: Request<MathOpArgs>,
    ) -> Result<Response<MathOpResult>, Status> {
        println!("{:?}", request);

        let args = request.into_inner();
        let output = args.a - args.b;
        let response = Response::new(MathOpResult {
            output,
            reply: format!("{} - {} = {}", args.a, args.b, output),
            error: false,
        });

        println!("{:?}", response);

        Ok(response)
    }

    async fn multiply(
        &self,
        request: Request<MathOpArgs>,
    ) -> Result<Response<MathOpResult>, Status> {
        println!("{:?}", request);

        let args = request.into_inner();
        let output = args.a * args.b;
        let response = Response::new(MathOpResult {
            output,
            reply: format!("{} * {} = {}", args.a, args.b, output),
            error: false,
        });

        println!("{:?}", response);

        Ok(response)
    }

    async fn divide(&self, request: Request<MathOpArgs>) -> Result<Response<MathOpResult>, Status> {
        println!("{:?}", request);

        let args = request.into_inner();
        let output = args.a / args.b;
        let response = Response::new(MathOpResult {
            output,
            reply: format!("{} / {} = {}", args.a, args.b, output),
            error: false,
        });

        println!("{:?}", response);

        Ok(response)
    }

    async fn remainder(
        &self,
        request: Request<MathOpArgs>,
    ) -> Result<Response<MathOpResult>, Status> {
        println!("{:?}", request);

        let args = request.into_inner();
        let output = args.a % args.b;
        let response = Response::new(MathOpResult {
            output,
            reply: format!("{} % {} = {}", args.a, args.b, output),
            error: false,
        });

        println!("{:?}", response);

        Ok(response)
    }
}
