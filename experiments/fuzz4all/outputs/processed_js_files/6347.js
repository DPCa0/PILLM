Certainly! Here's a complex JavaScript program that utilizes advanced features such as async/await, Promises, generators, and the Proxy object.

// Async function that returns a Promise
async function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Fetched data from ${url}`);
    }, 1000);
  });
}

// Generator function
function* dataGenerator(urls) {
  for (const url of urls) {
    yield fetchData(url);
  }
}

// Proxy handler to intercept get operations
const handler = {
  get: (target, property) => {
    if (property in target) {
      return target[property];
    } else {
      return `Property ${property} does not exist`;
    }
  }
};

// Target object
const apiData = {
  endpoint1: 'data1',
  endpoint2: 'data2'
};

// Create a Proxy
const proxyApiData = new Proxy(apiData, handler);

// Example usage
(async () => {
  const urls = ['https: 
  const generator = dataGenerator(urls);

  for (let dataPromise of generator) {
    print(await dataPromise);
  }

  print(proxyApiData.endpoint1);  
  print(proxyApiData.endpoint3);  
})();

This code defines an asynchronous function `fetchData` that simulates fetching data from a URL, a generator function `dataGenerator` that yields promises for fetching data from each URL, and a Proxy to intercept property access on an object, providing default behavior for non-existent properties.