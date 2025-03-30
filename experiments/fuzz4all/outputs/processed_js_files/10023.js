 

function* fibonacci(n) {
  let [prev, curr] = [0, 1];
  while (n-- > 0) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

const asyncCalculation = async (num) => {
  const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));
  await timeout(1000);  
  return num * num;
};

const proxyHandler = {
  get(target, property) {
    if (property in target) {
      return target[property];
    } else {
      print(`Property '${property}' not found!`);
      return null;
    }
  },
  set(target, property, value) {
    print(`Setting value ${value} to property '${property}'`);
    target[property] = value;
    return true;
  }
};

const main = async () => {
  print("Fibonacci Sequence:");
  const fib = fibonacci(10);
  for (const num of fib) {
    print(num);
  }

  const result = await asyncCalculation(42);
  print(`Async calculation result: ${result}`);

  const targetObject = { existingProperty: 123 };
  const proxiedObject = new Proxy(targetObject, proxyHandler);

  print(`Accessing existingProperty: ${proxiedObject.existingProperty}`);
  print(`Accessing nonExistentProperty: ${proxiedObject.nonExistentProperty}`);
  
  proxiedObject.newProperty = 456;
  print(`newProperty set via proxy: ${proxiedObject.newProperty}`);
};

main();
