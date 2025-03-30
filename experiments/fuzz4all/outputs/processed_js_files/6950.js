 

async function* fetchData(endpoints) {
  for (const endpoint of endpoints) {
    yield fetch(endpoint).then(response => response.json());
  }
}

const endpoints = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2'];

const dataHandler = {
  get: (target, prop) => {
    if (prop in target) {
      return target[prop];
    } else {
      throw new Error(`Property ${prop} does not exist on the data object.`);
    }
  }
};

(async () => {
  const data = {};
  const proxyData = new Proxy(data, dataHandler);
  
  for await (const promise of fetchData(endpoints)) {
    Object.assign(proxyData, await promise);
  }

  try {
    print(proxyData.title);  
    print(proxyData.invalidProp);  
  } catch (error) {
    console.error(error.message);
  }
})();
