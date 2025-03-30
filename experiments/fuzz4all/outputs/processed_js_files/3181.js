const asyncOperation = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      id % 2 === 0 ? resolve(`Resolved: ${id}`) : reject(`Rejected: ${id}`);
    }, Math.random() * 1000);
  });
};

const performAsyncOperations = async () => {
  const ids = [1, 2, 3, 4, 5];
  const results = [];
  
  for await (const id of ids.map(asyncOperation)) {
    try {
      const result = await id;
      results.push(result);
    } catch (error) {
      results.push(error);
    }
  }

  return results;
};

const debouncedFunction = (func, delay) => {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => func(...args), delay);
  };
};

const outputResults = async () => {
  const results = await performAsyncOperations();
  print('Operation Results:', results);
};

const debouncedOutput = debouncedFunction(outputResults, 500);
debouncedOutput();

 
const monitoredObject = new Proxy({ message: 'Hello, world!' }, {
  set(target, property, value) {
    print(`Property "${property}" changed from "${target[property]}" to "${value}"`);
    target[property] = value;
    return true;
  }
});

monitoredObject.message = 'Hello, Proxy!';
