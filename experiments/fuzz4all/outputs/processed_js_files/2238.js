 

 
function* asyncGenerator() {
  const num = yield fetchNumber();
  const square = yield squareNumber(num);
  const cube = yield cubeNumber(square);
  return cube;
}

 
function fetchNumber() {
  return new Promise((resolve) => setTimeout(() => resolve(5), 1000));
}

 
function squareNumber(num) {
  return new Promise((resolve) => setTimeout(() => resolve(num * num), 1000));
}

 
function cubeNumber(num) {
  return new Promise((resolve) => setTimeout(() => resolve(num * num * num), 1000));
}

 
async function runAsyncGenerator(gen) {
  const iterator = gen();
  let result = iterator.next();

  while (!result.done) {
    try {
      const value = await result.value;
      result = iterator.next(value);
    } catch (error) {
      iterator.throw(error);
    }
  }
  print('Final result:', result.value);
}

 
const handler = {
  get(target, prop) {
    if (typeof target[prop] === 'function') {
      return (...args) => {
        print(`Calling ${prop} with arguments:`, args);
        return target[prop](...args);
      };
    }
    return target[prop];
  }
};

 
const mathOperations = {
  add: (a, b) => a + b,
  multiply: (a, b) => a * b
};

const proxiedMathOperations = new Proxy(mathOperations, handler);

 
print('Sum:', proxiedMathOperations.add(2, 3));
print('Product:', proxiedMathOperations.multiply(4, 5));

 
runAsyncGenerator(asyncGenerator);
