 
class AdvancedFeatures {
  #privateValue = 42;  
  static #privateStaticValue = 100;  

  constructor() {
    this.publicValue = 'I am public';
  }

   
  #privateMethod() {
    return this.#privateValue;
  }

   
  getClosure() {
    let closureValue = 'Closure Value';
    return () => `${closureValue} and Private Value: ${this.#privateValue}`;
  }

  static #privateStaticMethod() {
    return `Static ${this.#privateStaticValue}`;
  }

   
  static publicStaticMethod() {
    return this.#privateStaticMethod();
  }
}

 
const handler = {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      return `Property ${prop} not found`;
    }
  },
};

const advancedInstance = new AdvancedFeatures();
const proxyInstance = new Proxy(advancedInstance, handler);

 
function* generatorFunction() {
  yield Promise.resolve('First');
  yield Promise.resolve('Second');
}

async function runGenerator() {
  const generator = generatorFunction();
  for await (let value of generator) {
    print(value);
  }
}

 
print(proxyInstance.publicValue);  
print(proxyInstance.nonExistentProperty);  
print(advancedInstance.getClosure()());  
print(AdvancedFeatures.publicStaticMethod());  

runGenerator();  
