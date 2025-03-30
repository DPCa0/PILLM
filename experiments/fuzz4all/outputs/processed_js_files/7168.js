 
class Complex {
  constructor(real, imaginary) {
    this.real = real;
    this.imaginary = imaginary;
  }
  
   
  add({ real, imaginary }) {
    return new Complex(this.real + real, this.imaginary + imaginary);
  }

   
  multiply({ real, imaginary }) {
    const realPart = this.real * real - this.imaginary * imaginary;
    const imaginaryPart = this.real * imaginary + this.imaginary * real;
    return new Complex(realPart, imaginaryPart);
  }

   
  toString() {
    return `${this.real} + ${this.imaginary}i`;
  }

   
  static fibonacci(n) {
    let a = new Complex(0, 0), b = new Complex(1, 1);
    return {
      [Symbol.iterator]: function* () {
        while (n-- > 0) {
          let temp = a;
          a = b;
          b = b.add(temp);
          yield a;
        }
      }
    };
  }
}

 
const handler = {
  get(target, prop) {
    print(`Property '${prop}' was accessed.`);
    return target[prop];
  }
};

 
const num1 = new Complex(3, 2);
const num2 = new Complex(1, 7);

const proxyNum1 = new Proxy(num1, handler);
print(proxyNum1.add(num2).toString());
print(proxyNum1.multiply(num2).toString());

print("Fibonacci sequence of complex numbers:");
for (const num of Complex.fibonacci(5)) {
  print(num.toString());
}
