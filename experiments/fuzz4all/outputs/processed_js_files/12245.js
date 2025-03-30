 

 
const asyncIterable = {
  [Symbol.asyncIterator]() {
    let i = 0;
    return {
      next() {
        if (i < 5) {
          return new Promise((resolve) => 
            setTimeout(() => resolve({ value: i++, done: false }), 1000)
          );
        } else {
          return Promise.resolve({ done: true });
        }
      }
    };
  }
};

 
function* chunkProcessor(data, chunkSize) {
  for (let i = 0; i < data.length; i += chunkSize) {
    yield data.slice(i, i + chunkSize);
  }
}

 
class DynamicOperations {
  static operate(operation, ...args) {
    const operations = {
      add: (a, b) => a + b,
      multiply: (a, b) => a * b,
    };
    return operations[operation]?.(...args);
  }
}

const handler = {
  get(target, property) {
    if (property in target) {
      return target[property];
    } else {
      return (...args) => `Operation ${property} not supported`;
    }
  }
};

const operationsProxy = new Proxy(DynamicOperations, handler);

(async function processAndOperate() {
  let data = [];
  for await (const value of asyncIterable) {
    data.push(value);
    print(`Data received: ${value}`);
  }

  print('\nProcessing in chunks...');
  const chunkSize = 2;
  const chunks = chunkProcessor(data, chunkSize);
  for (const chunk of chunks) {
    print(`Chunk: ${chunk}`);
  }

  print('\nPerforming operations...');
  print('3 + 4 =', operationsProxy.operate('add', 3, 4));
  print('3 * 4 =', operationsProxy.operate('multiply', 3, 4));
  print('3 - 4 =', operationsProxy.operate('subtract', 3, 4));
})();
