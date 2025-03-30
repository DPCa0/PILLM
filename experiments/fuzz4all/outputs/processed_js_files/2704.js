 
class Complex {
  #privateValue;  
  static instances = 0;  

  constructor(value) {
    this.#privateValue = value;
    Complex.instances++;
  }

   
  get value() {
    return this.#privateValue;
  }

   
  set value(newValue) {
    this.#privateValue = newValue;
  }

   
  static getInstanceCount() {
    return Complex.instances;
  }

   
  static #privateStaticMethod() {
    print('This is a private static method');
  }

   
  callPrivateStatic() {
    Complex.#privateStaticMethod();
  }

   
  async asyncOperation() {
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => resolve(`Async operation completed with value: ${this.#privateValue}`), 1000);
    });
    print(result);
  }
}

 
const handler = {
  get: (target, prop, receiver) => {
    if (typeof target[prop] === 'function') {
      return function (...args) {
        print(`Method called: ${prop}`);
        return target[prop].apply(this, args);
      };
    }
    return Reflect.get(target, prop, receiver);
  }
};

 
const complexInstance = new Complex(42);
const proxiedInstance = new Proxy(complexInstance, handler);

 
proxiedInstance.value = 100;
print(proxiedInstance.value);  

proxiedInstance.callPrivateStatic();  
proxiedInstance.asyncOperation();  

print(Complex.getInstanceCount());  
