To build with Docker, use the parent directory as the context root.

To add or remove .protos, you'll need to modify the following files:

* `boilerplate/third_party/OpenAPI/index.html` Switch out the `url` in the `SwaggerUIBundle`.
* `boilerplate/gateway/gateway.go` Add or remove `import`s to your generated code, and `Register...Handler()` lines in `func Run()`.
