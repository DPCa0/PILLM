 
class AdvancedFeatureDemo {
  #privateField = 'This is a private field';
  
  static #privateStaticField = 'This is a private static field';
  
  constructor(name) {
    this.name = name;
  }
  
  #privateMethod() {
    return `Accessing: ${this.#privateField}`;
  }
  
  static #privateStaticMethod() {
    return `Accessing: ${this.#privateStaticField}`;
  }
  
  getPrivateInfo() {
    return this.#privateMethod();
  }
  
  static getStaticInfo() {
    return this.#privateStaticMethod();
  }
}

 
const handler = {
  get(target, prop) {
    if (prop in target) {
      print(`Property "${prop}" accessed`);
      return Reflect.get(target, prop);
    } else {
      print(`Property "${prop}" not found`);
      return undefined;
    }
  },
  
  set(target, prop, value) {
    print(`Setting "${prop}" to "${value}"`);
    return Reflect.set(target, prop, value);
  }
};

const demoInstance = new AdvancedFeatureDemo('JavaScript');
const proxiedInstance = new Proxy(demoInstance, handler);

print(proxiedInstance.name);   
proxiedInstance.newProp = 'New Value';   

 
const asyncFunction = async () => {
  try {
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => resolve('Async Task Completed'), 1000);
    });
    print(result);
  } catch (error) {
    console.error('Error:', error);
  }
};

asyncFunction();

print(AdvancedFeatureDemo.getStaticInfo());
