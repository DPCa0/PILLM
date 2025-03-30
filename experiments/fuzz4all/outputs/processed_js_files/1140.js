 

async function* asyncPipeline(data) {
  for (const item of data) {
     
    await new Promise(res => setTimeout(res, 100));
    yield item * 2;  
  }
}

 
const handler = {
  get: function(target, prop, receiver) {
    print(`Accessing ${prop}`);
    return Reflect.get(...arguments);
  },
  set: function(target, prop, value) {
    print(`Setting ${prop} to ${value}`);
    return Reflect.set(...arguments);
  }
};

 
const dataCollection = [1, 2, 3, 4, 5];
const proxiedCollection = new Proxy(dataCollection, handler);

 
(async () => {
  for await (const item of asyncPipeline(proxiedCollection)) {
    print(`Processed: ${item}`);
  }
})();

 
const uniqueValues = new Set(proxiedCollection);
const valueMap = new Map([...uniqueValues].map((val, idx) => [val, `Value is: ${val * 10}`]));

print(valueMap);

 
function timeLogger(target, propertyKey, descriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function(...args) {
    console.time(propertyKey);
    const result = originalMethod.apply(this, args);
    console.timeEnd(propertyKey);
    return result;
  };
}

class MathOperations {
  @timeLogger
  computeSum(a, b) {
    return a + b;
  }
}

const mathOps = new MathOperations();
print(`Sum is: ${mathOps.computeSum(5, 10)}`);
