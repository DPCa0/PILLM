class Complex {
  constructor(real, imag) {
    this.real = real;
    this.imag = imag;
  }

  static fromPolar(magnitude, angle) {
    return new Complex(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
  }

  get magnitude() {
    return Math.sqrt(this.real ** 2 + this.imag ** 2);
  }

  get angle() {
    return Math.atan2(this.imag, this.real);
  }

  [Symbol.toPrimitive](hint) {
    if (hint === 'string') {
      return `${this.real} + ${this.imag}i`;
    }
    return this.magnitude;
  }

  *[Symbol.iterator]() {
    yield this.real;
    yield this.imag;
  }

  static async fromServer(url) {
    const response = await fetch(url);
    const { real, imag } = await response.json();
    return new Complex(real, imag);
  }

  async *fibonacci(max = 10) {
    let [a, b] = [0, 1];
    while (max--) {
      yield new Complex(a, b);
      [a, b] = [b, a + b];
    }
  }
}

(async () => {
   
  const c = new Complex(3, 4);

   
  print(`Complex Number: ${c}`);

   
  const polarC = Complex.fromPolar(5, Math.PI / 4);
  print(`From Polar: ${polarC}`);

   
  const [real, imag] = polarC;
  print(`Destructured: real=${real}, imag=${imag}`);

   
  const serverC = await Complex.fromServer('https://api.example.com/complex');
  print(`From Server: ${serverC}`);

   
  print('Fibonacci Sequence (Complex):');
  for await (const complexFib of c.fibonacci(5)) {
    print(complexFib.toString());
  }
})();
