 

 
async function* fetchNumbers() {
  for (let i = 1; i <= 5; i++) {
    yield new Promise(resolve => setTimeout(() => resolve(i * i), 1000));
  }
}

 
const handler = {
  get(target, prop) {
    if (prop in target) {
      print(`Accessing method: ${prop}`);
      return target[prop];
    }
  }
};

const proxiedFetchNumbers = new Proxy(fetchNumbers(), handler);

 
(async () => {
  try {
    for await (const numPromise of proxiedFetchNumbers) {
      const num = await numPromise;
      print(`Received number: ${num}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
})();
