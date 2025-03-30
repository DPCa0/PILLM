 
class Complex {
  #value;  

  constructor(value) {
    this.#value = value;
  }

   
  static fromString(complexStr) {
    const [real, imag] = complexStr
      .replace(/i$/, '')
      .split('+')
      .map(Number);
    return new Complex([real, imag]);
  }

   
  get magnitude() {
    return Math.hypot(this.#value[0], this.#value[1]);
  }

   
  async *fibonacciAsync(n) {
    let [a, b] = [0, 1];
    for (let i = 0; i < n; i++) {
      yield await new Promise(resolve => setTimeout(() => resolve(a), 100));  
      [a, b] = [b, a + b];
    }
  }

   
  async calculateWithComplexLogic() {
    const result = await Promise.resolve(this.magnitude)
      .then(mag => mag * 2)
      .then(mag => Math.sqrt(mag))
      .catch(err => console.error(err));
    return result;
  }
}

 
const handler = {
  get(target, prop, receiver) {
    if (prop === 'magnitude') {
      print(`Accessed the magnitude: ${target.magnitude}`);
    }
    return Reflect.get(...arguments);
  }
};

(async () => {
  const complex = new Complex([3, 4]);
  const proxiedComplex = new Proxy(complex, handler);

   
  const complexFromString = Complex.fromString('5+12i');
  print(`Magnitude of parsed complex: ${complexFromString.magnitude}`);

   
  print(`Magnitude: ${proxiedComplex.magnitude}`);

   
  print('Fibonacci sequence:');
  for await (const num of proxiedComplex.fibonacciAsync(5)) {
    print(num);
  }

   
  const calculatedValue = await proxiedComplex.calculateWithComplexLogic();
  console.log(`Calculated value: ${calculatedValue