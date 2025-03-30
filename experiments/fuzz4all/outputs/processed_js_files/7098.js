 
class Complex {
  #privateField = 42;
  
  #privateMethod() {
    return this.#privateField;
  }
  
  constructor(real, imaginary) {
    this.real = real;
    this.imaginary = imaginary;
  }
  
   
  static fromPolar(magnitude, angle) {
    return new Complex(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
  }
  
   
  get magnitude() {
    return Math.sqrt(this.real ** 2 + this.imaginary ** 2);
  }
  
   
  *getComponents() {
    yield this.real;
    yield this.imaginary;
  }
  
   
  static createProxy(instance) {
    return new Proxy(instance, {
      get(target, prop, receiver) {
        if (prop in target) {
          return Reflect.get(target, prop, receiver);
        } else {
          console.warn(`Property ${prop} does not exist`);
          return undefined;
        }
      }
    });
  }
}

 
const complexNumber = Complex.fromPolar(5, Math.PI / 4);

 
const proxiedComplex = Complex.createProxy(complexNumber);

 
print('Magnitude:', proxiedComplex.magnitude);

 
for (let component of proxiedComplex.getComponents()) {
  print('Component:', component);
}

 
print('Non-existent Property:', proxiedComplex.nonExistent);
