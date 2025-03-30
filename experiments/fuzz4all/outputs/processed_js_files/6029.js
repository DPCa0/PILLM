 

 
const uniqueKey = Symbol('unique');

class ComplexObject {
  constructor() {
    this[uniqueKey] = 'Sensitive Data';
    this.data = { info: 'Important Info', count: 0 };
  }

  async complexOperation() {
     
    const result = await this.delayedOperation('Operation Complete', 1000);
    print(result);
  }

  delayedOperation(message, delay) {
    return new Promise((resolve) => setTimeout(() => resolve(message), delay));
  }
}

 
const handler = {
  get(target, property) {
    if (property === uniqueKey) {
      return 'Access Denied';
    }
    return Reflect.get(target, property);
  },
  set(target, property, value) {
    if (property === 'count') {
      if (typeof value !== 'number') {
        throw new TypeError('Count must be a number');
      }
      print(`Setting count to ${value}`);
    }
    return Reflect.set(target, property, value);
  }
};

async function main() {
  const obj = new ComplexObject();
  const proxyObj = new Proxy(obj, handler);

   
  print(proxyObj[uniqueKey]);  

   
  proxyObj.data.count = 5;  
  print(proxyObj.data.count);  

   
  await proxyObj.complexOperation();  
}

 
main();
