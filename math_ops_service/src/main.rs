use futures::future::{AbortHandle, Abortable, Aborted};

pub mod math_ops;
pub mod math_ops_service;

use math_ops::math_ops_server::MathOpsServer;
use math_ops_service::MathOpsService;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    tracing_subscriber::fmt::init();

    let addr = {
        let host = match std::env::var("HOST") {
            Ok(host) => host,
            Err(_e) => "0.0.0.0".to_owned(),
        };
        let port = match std::env::var("PORT") {
            Ok(port) => port,
            Err(_e) => "8051".to_owned(),
        };
        format!("{}:{}", host, port).parse()?
    };

    let math_ops_service = MathOpsService::default();
    let math_ops_service = MathOpsServer::new(math_ops_service);
    let math_ops_service = tonic_web::config()
        .allow_all_origins()
        .enable(math_ops_service);

    let reflection_service = tonic_reflection::server::Builder::configure()
        .register_encoded_file_descriptor_set(math_ops::FILE_DESCRIPTOR_SET)
        .build()?;

    println!("MathOps listening on {}", addr);

    let (abort_handle, abort_registration) = AbortHandle::new_pair();
    let server = Abortable::new(
        tonic::transport::Server::builder()
            .accept_http1(true)
            .add_service(reflection_service)
            .add_service(math_ops_service)
            .serve(addr),
        abort_registration,
    );

    ctrlc::set_handler(move || {
        println!("Received Control+C, exiting . . .");
        abort_handle.abort();
    })
    .expect("Error setting Control-C handler");

    match server.await {
        Ok(v) => {
            v?;
            Ok(())
        }
        Err(Aborted) => Ok(()),
    }
}
