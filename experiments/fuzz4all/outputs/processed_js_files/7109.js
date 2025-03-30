 

const fetchData = async () => {
  const data = new Map();
  const uniqueResults = new Set();

  const promise1 = new Promise((resolve) => {
    setTimeout(() => {
      data.set('alpha', 1);
      uniqueResults.add(1);
      resolve('alpha');
    }, 1000);
  });

  const promise2 = new Promise((resolve) => {
    setTimeout(() => {
      data.set('beta', 2);
      uniqueResults.add(2);
      resolve('beta');
    }, 500);
  });

  const resultHandler = (result) => {
    print(`Processed result: ${result}`);
    if (uniqueResults.has(data.get(result))) {
      print(`Unique value: ${data.get(result)}`);
    }
  };

  const handler = {
    get: (target, prop) => {
      if (prop in target) {
        print(`Accessing property: ${prop}`);
        return target[prop];
      } else {
        throw new Error(`Property ${prop} doesn't exist`);
      }
    }
  };

  const proxyData = new Proxy(data, handler);

  const results = await Promise.all([promise1, promise2]);
  results.forEach(resultHandler);

  try {
    print(`Proxy access: ${proxyData.get('alpha')}`);
    print(`Non-existent access: ${proxyData.get('gamma')}`);
  } catch (error) {
    console.error(error.message);
  }
};

fetchData();
