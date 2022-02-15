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
      `${this.baseUrl}/api/v1/math_ops/subtract?a=${encodeURI(args.a)}&b=${encodeURI(args.b)}`
    );
    return res.json();
  }

  async multiply(args, options) {
    const res = await fetch(
      `${this.baseUrl}/api/v1/math_ops/multiply?a=${encodeURI(args.a)}&b=${encodeURI(args.b)}`
    );
    return res.json();
  }

  async divide(args, options) {
    const res = await fetch(
      `${this.baseUrl}/api/v1/math_ops/divide?a=${encodeURI(args.a)}&b=${encodeURI(args.b)}`
    );
    return res.json();
  }

  async remainder(args, options) {
    const res = await fetch(
      `${this.baseUrl}/api/v1/math_ops/remainder`,
      {
        method: "POST",
        body: JSON.stringify({
          a: args.a,
          b: args.b,
        }),
        headers: {
          "Accept": "application/json; charset=UTF-8",
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    );
    return res.json();
  }
}
