 
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: 'Fetched Data', timestamp: new Date().toISOString() });
    }, 1000);
  });
}

 
function timingDecorator(fn) {
  return async function (...args) {
    console.time('Function execution time');
    const result = await fn(...args);
    console.timeEnd('Function execution time');
    return result;
  };
}

 
const handler = {
  get(target, property, receiver) {
    if (property in target) {
      return target[property];
    }
    console.warn(`Property "${property}" does not exist.`);
    return undefined;
  },
};

 
const complexObject = new Proxy({
  name: 'Complex Object',
  nested: {
    level1: {
      level2: {
        value: 'Deeply nested value',
      },
    },
  },
}, handler);

 
function processObject({ name, nested: { level1: { level2: { value } = {} } = {} } = {} } = {}) {
  return `Name: ${name}, Nested Value: ${value}`;
}

 
(async () => {
  const timedFetchData = timingDecorator(fetchData);

  try {
    const data = await timedFetchData();
    print(`Async Data: ${JSON.stringify(data)}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  print(processObject(complexObject));
  print(complexObject.nonExistentProperty);   
})();
