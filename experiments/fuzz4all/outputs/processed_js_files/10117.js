 
async function* fetchDataGenerator() {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  for (let i = 1; i <= 3; i++) {
    await delay(1000);
    yield `Data chunk ${i}`;
  }
}

 
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const multiplyByTwo = createMultiplier(2);

 
const handler = {
  get: function(target, property) {
    return property in target ? target[property] : `Property ${property} not found`;
  }
};

const dynamicObject = new Proxy({}, handler);
dynamicObject.existingProp = 'I exist';

 
function logMethod(target, propertyKey, descriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function(...args) {
    print(`Call to ${propertyKey} with args: ${args}`);
    return originalMethod.apply(this, args);
  };
}

class Calculator {
  @logMethod
  add(a, b) {
    return a + b;
  }

  @logMethod
  subtract(a, b) {
    return a - b;
  }
}

 
(async () => {
  print('--- Fetching Data with Async Generators ---');
  for await (const data of fetchDataGenerator()) {
    print(data);
  }

  print('\n--- Multiplying using Closures ---');
  print(multiplyByTwo(5));  

  print('\n--- Dynamic Object Access with Proxy ---');
  print(dynamicObject.existingProp);  
  print(dynamicObject.nonExistingProp);  

  print('\n--- Method Logging with Decorators ---');
  const calculator = new Calculator();
  print(calculator.add(4, 3));  
  print(calculator.subtract(10, 5));  
})();
