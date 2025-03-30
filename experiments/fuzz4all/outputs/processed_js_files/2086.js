 

 
const privateField = Symbol('privateField');

 
async function* fibonacci(n) {
  let [a, b] = [0, 1];
  while (n-- > 0) {
    yield await new Promise(resolve => setTimeout(() => resolve(a), 100));
    [a, b] = [b, a + b];
  }
}

 
class ComplexNumber {
  constructor(real, imaginary) {
    this.real = real;
    this[privateField] = imaginary;  
  }

   
  #formatComplex() {
    const imag = this[privateField];
    return `${this.real} ${imag >= 0 ? '+' : '-'} ${Math.abs(imag)}i`;
  }

   
  toString() {
    return this.#formatComplex();
  }
}

 
const complexProxy = new Proxy(new ComplexNumber(3, 4), {
  get(target, prop, receiver) {
    if (prop === 'real') {
      print(`Accessed real part: ${target.real}`);
    }
    return Reflect.get(target, prop, receiver);
  }
});

 
Promise.allSettled([
  fibonacci(5).next(),
  new Promise((resolve, reject) => setTimeout(() => reject('Error!'), 150))
]).then(results => {
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      print(`Promise ${index} fulfilled:`, result.value.value);
    } else {
      print(`Promise ${index} rejected:`, result.reason);
    }
  });
});

 
print(complexProxy.toString());  
