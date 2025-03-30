 

 
class ComplexNumber {
  #real;
  #imaginary;

  constructor(real, imaginary) {
    this.#real = real;
    this.#imaginary = imaginary;
  }

  #toPolar() {
    const radius = Math.hypot(this.#real, this.#imaginary);
    const angle = Math.atan2(this.#imaginary, this.#real);
    return { radius, angle };
  }

  toString() {
    const { radius, angle } = this.#toPolar();
    return `Complex Number: (${this.#real} + ${this.#imaginary}i), Polar: { radius: ${radius.toFixed(2)}, angle: ${angle.toFixed(2)} rad }`;
  }

  static add(c1, c2) {
    return new ComplexNumber(c1.#real + c2.#real, c1.#imaginary + c2.#imaginary);
  }

  static *fibonacciComplexSequence(limit) {
    let [a, b] = [new ComplexNumber(0, 0), new ComplexNumber(1, 1)];
    while (limit--) {
      yield a;
      [a, b] = [b, ComplexNumber.add(a, b)];
    }
  }
}

 
async function fetchComplexOperations() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const c1 = new ComplexNumber(3, 4);
      const c2 = new ComplexNumber(1, 2);
      const sum = ComplexNumber.add(c1, c2);
      resolve({ c1, c2, sum });
    }, 1000);
  });
}

 
const handler = {
  get(target, prop, receiver) {
    print(`Accessed property "${prop}" with value: ${target[prop]}`);
    return Reflect.get(target, prop, receiver);
  }
};

 
(async () => {
   
  const proxiedComplex = new Proxy(new ComplexNumber(5, 7), handler);
  print(proxiedComplex.toString());

   
  const { c1, c2, sum } = await fetchComplexOperations();
  print(c1.toString());
  print(c2.toString());
  console.log(`Sum: