export class MathOpsRestClient {
  constructor(url) {
    this.baseUrl = url;
  }

  async add(args, options) {
    const res = await fetch(
      `${this.baseUrl}/api/v1/math_ops/add?a=${encodeURI(args.a)}&b=${encodeURI(args.b)}`
    );
    return res.json();
  }

  async subtract(args, options) {
    const res = await fetch(
      `${this.baseUrl}/api/v1/math_ops/add?a=${encodeURI(args.a)}&b=${encodeURI(args.b)}`
    );
    return res.json();
  }

  async multiply(args, options) {
    const res = await fetch(
      `${this.baseUrl}/api/v1/math_ops/add?a=${encodeURI(args.a)}&b=${encodeURI(args.b)}`
    );
    return res.json();
  }

  async divide(args, options) {
    const res = await fetch(
      `${this.baseUrl}/api/v1/math_ops/add?a=${encodeURI(args.a)}&b=${encodeURI(args.b)}`
    );
    return res.json();
  }

  async remainder(args, options) {
    const res = await fetch(
      `${this.baseUrl}/api/v1/math_ops/add?a=${encodeURI(args.a)}&b=${encodeURI(args.b)}`,
      {
        method: "POST",
        body: JSON.stringify({
          a: args.a,
          b: args.b,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    );
    return res.json();
  }
}
